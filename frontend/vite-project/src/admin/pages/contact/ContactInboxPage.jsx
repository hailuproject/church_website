import { useMemo, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { CheckCheck, Eye, Trash2, HandHeart, Inbox } from 'lucide-react';
import { PageHeader } from '../../components/ui/PageHeader';
import { DataTable, ActionMenu } from '../../components/ui/DataTable';
import { SearchInput } from '../../components/ui/SearchInput';
import Button from '../../components/ui/Button';
import { StatusBadge, Badge } from '../../components/ui/Badge';
import { FilterSelect, FilterBar } from '../../components/ui/FilterSelect';
import { Tabs } from '../../components/ui/Tabs';
import { ConfirmDialog } from '../../components/ui/ConfirmDialog';
import { MessageDetailModal } from './MessageDetailModal';
import { PrayerDetailModal } from './PrayerDetailModal';
import { contactService } from '../../services/donation.service';
import { useListQuery } from '../../hooks/useListQuery';
import { getErrorMessage } from '../../utils/api';
import { timeAgo, truncate } from '../../utils/format';
import { CONTACT_CATEGORIES, CONTACT_STATUSES, PRAYER_STATUSES } from '../../constants/options';
import { usePageMeta } from '../../hooks/usePageMeta';

export const ContactInboxPage = () => {
  usePageMeta('Contact');
  const queryClient = useQueryClient();
  const [tab, setTab] = useState('messages');
  const [viewing, setViewing] = useState(null);
  const [deleting, setDeleting] = useState(null);
  const [prayerViewing, setPrayerViewing] = useState(null);
  const [prayerDeleting, setPrayerDeleting] = useState(null);

  const messages = useListQuery({
    key: 'contact-messages',
    fetcher: (params) => contactService.listMessages(params),
    initialLimit: 10,
  });

  const prayers = useListQuery({
    key: 'contact-prayers',
    fetcher: (params) => contactService.listPrayers(params),
    initialLimit: 10,
  });

  const invalidateMessages = () => queryClient.invalidateQueries({ queryKey: ['contact-messages'] });
  const invalidatePrayers = () => queryClient.invalidateQueries({ queryKey: ['contact-prayers'] });

  const readMutation = useMutation({
    mutationFn: (id) => contactService.markRead(id),
    onSuccess: () => invalidateMessages(),
    onError: (error) => toast.error(getErrorMessage(error)),
  });

  const readAllMutation = useMutation({
    mutationFn: () => contactService.markAllRead(),
    onSuccess: () => {
      toast.success('All messages marked as read');
      invalidateMessages();
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => contactService.deleteMessage(id),
    onSuccess: () => {
      toast.success('Message deleted');
      invalidateMessages();
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });

  const deletePrayerMutation = useMutation({
    mutationFn: (id) => contactService.deletePrayer(id),
    onSuccess: () => {
      toast.success('Prayer request deleted');
      invalidatePrayers();
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });

  const messageColumns = useMemo(
    () => [
      {
        key: 'name',
        header: 'Sender',
        render: (row) => (
          <div className="flex items-center gap-3">
            <div
              className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${
                row.isRead
                  ? 'bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400'
                  : 'bg-primary-100 text-primary-600 dark:bg-primary-500/20 dark:text-primary-300'
              }`}
            >
              {row.name
                .split(/\s+/)
                .map((p) => p[0])
                .slice(0, 2)
                .join('')
                .toUpperCase()}
            </div>
            <div>
              <p className={`text-sm ${row.isRead ? 'text-gray-600 dark:text-gray-300' : 'font-semibold text-gray-900 dark:text-gray-100'}`}>
                {row.name}
              </p>
              <p className="text-xs text-gray-400">{row.email}</p>
            </div>
          </div>
        ),
      },
      {
        key: 'subject',
        header: 'Subject',
        render: (row) => (
          <span className={`text-sm ${row.isRead ? 'text-gray-600 dark:text-gray-300' : 'font-medium text-gray-900 dark:text-gray-100'}`}>
            {row.subject || '—'}
          </span>
        ),
      },
      {
        key: 'category',
        header: 'Category',
        render: (row) => <Badge>{row.category}</Badge>,
      },
      {
        key: 'status',
        header: 'Status',
        render: (row) => <StatusBadge status={row.isRead ? row.status : 'new'} />,
      },
      {
        key: 'createdAt',
        header: 'Received',
        sortable: true,
        render: (row) => <span className="text-xs text-gray-500 dark:text-gray-400">{timeAgo(row.createdAt)}</span>,
      },
      {
        key: 'actions',
        header: '',
        align: 'right',
        render: (row) => (
          <ActionMenu
            row={row}
            items={[
              {
                label: 'View message',
                icon: Eye,
                onClick: (r) => setViewing(r),
              },
              ...(row.isRead
                ? []
                : [
                    {
                      label: 'Mark as read',
                      icon: CheckCheck,
                      onClick: (r) => readMutation.mutate(r._id),
                    },
                  ]),
              {
                label: 'Delete',
                icon: Trash2,
                danger: true,
                onClick: (r) => setDeleting(r),
              },
            ]}
          />
        ),
      },
    ],
    [readMutation]
  );

  const prayerColumns = useMemo(
    () => [
      {
        key: 'name',
        header: 'From',
        render: (row) => (
          <div>
            <p className="font-medium text-gray-900 dark:text-gray-100">{row.name || 'Anonymous'}</p>
            <p className="text-xs text-gray-400">{row.email || ''}</p>
          </div>
        ),
      },
      {
        key: 'request',
        header: 'Request',
        render: (row) => (
          <span className="text-sm text-gray-600 dark:text-gray-300">{truncate(row.request, 60)}</span>
        ),
      },
      {
        key: 'prayerType',
        header: 'Type',
        render: (row) => <Badge>{row.prayerType}</Badge>,
      },
      {
        key: 'confidential',
        header: '',
        render: (row) =>
          row.isConfidential ? <StatusBadge status="new" /> : null,
      },
      {
        key: 'status',
        header: 'Status',
        render: (row) => <StatusBadge status={row.status} />,
      },
      {
        key: 'createdAt',
        header: 'Received',
        sortable: true,
        render: (row) => <span className="text-xs text-gray-500 dark:text-gray-400">{timeAgo(row.createdAt)}</span>,
      },
      {
        key: 'actions',
        header: '',
        align: 'right',
        render: (row) => (
          <ActionMenu
            row={row}
            items={[
              {
                label: 'View request',
                icon: Eye,
                onClick: (r) => setPrayerViewing(r),
              },
              {
                label: 'Delete',
                icon: Trash2,
                danger: true,
                onClick: (r) => setPrayerDeleting(r),
              },
            ]}
          />
        ),
      },
    ],
    []
  );

  return (
    <div>
      <PageHeader
        title="Contact Inbox"
        subtitle="Manage contact messages and prayer requests"
        breadcrumbs={[{ label: 'Contact' }]}
        actions={
          tab === 'messages' ? (
            <Button variant="secondary" onClick={() => readAllMutation.mutate()} loading={readAllMutation.isPending}>
              <CheckCheck className="h-4 w-4" />
              Mark all read
            </Button>
          ) : null
        }
      />

      <div className="mb-4">
        <Tabs
          tabs={[
            { key: 'messages', label: 'Messages' },
            { key: 'prayers', label: 'Prayer Requests' },
          ]}
          onChange={setTab}
        />
      </div>

      {tab === 'messages' ? (
        <DataTable
          columns={messageColumns}
          data={messages.items}
          loading={messages.isLoading}
          pagination={messages.pagination}
          onPageChange={messages.setPage}
          onLimitChange={messages.setLimit}
          toolbar={
            <>
              <SearchInput
                value={messages.searchInput}
                onChange={messages.setSearchInput}
                placeholder="Search messages…"
                className="w-full sm:w-72"
              />
              <FilterBar>
                <FilterSelect
                  label="Status"
                  value={messages.filters.status}
                  onChange={(v) => messages.setFilter('status', v)}
                  options={CONTACT_STATUSES}
                />
                <FilterSelect
                  label="Category"
                  value={messages.filters.category}
                  onChange={(v) => messages.setFilter('category', v)}
                  options={CONTACT_CATEGORIES}
                />
              </FilterBar>
            </>
          }
          emptyTitle="No messages found"
          emptyDescription="Contact form submissions will appear here."
          emptyIcon={Inbox}
        />
      ) : (
        <DataTable
          columns={prayerColumns}
          data={prayers.items}
          loading={prayers.isLoading}
          pagination={prayers.pagination}
          onPageChange={prayers.setPage}
          onLimitChange={prayers.setLimit}
          toolbar={
            <>
              <SearchInput
                value={prayers.searchInput}
                onChange={prayers.setSearchInput}
                placeholder="Search prayer requests…"
                className="w-full sm:w-72"
              />
              <FilterBar>
                <FilterSelect
                  label="Status"
                  value={prayers.filters.status}
                  onChange={(v) => prayers.setFilter('status', v)}
                  options={PRAYER_STATUSES}
                />
              </FilterBar>
            </>
          }
          emptyTitle="No prayer requests found"
          emptyDescription="Prayer requests submitted through the website will appear here."
          emptyIcon={HandHeart}
        />
      )}

      <MessageDetailModal open={Boolean(viewing)} onClose={() => setViewing(null)} message={viewing} />
      <PrayerDetailModal open={Boolean(prayerViewing)} onClose={() => setPrayerViewing(null)} prayer={prayerViewing} />

      <ConfirmDialog
        open={Boolean(deleting)}
        onClose={() => setDeleting(null)}
        onConfirm={() => deleting && deleteMutation.mutate(deleting._id)}
        title="Delete message"
        description={`Delete the message from ${deleting?.name}? This action cannot be undone.`}
        confirmLabel="Delete"
        loading={deleteMutation.isPending}
      />

      <ConfirmDialog
        open={Boolean(prayerDeleting)}
        onClose={() => setPrayerDeleting(null)}
        onConfirm={() => prayerDeleting && deletePrayerMutation.mutate(prayerDeleting._id)}
        title="Delete prayer request"
        description="Delete this prayer request? This action cannot be undone."
        confirmLabel="Delete"
        loading={deletePrayerMutation.isPending}
      />
    </div>
  );
};

export default ContactInboxPage;
