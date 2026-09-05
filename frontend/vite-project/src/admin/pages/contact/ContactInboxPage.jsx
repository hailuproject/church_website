import { useMemo, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { CheckCheck, Eye, Trash2, Inbox } from 'lucide-react';
import { PageHeader } from '../../components/ui/PageHeader';
import { DataTable, ActionMenu } from '../../components/ui/DataTable';
import { SearchInput } from '../../components/ui/SearchInput';
import Button from '../../components/ui/Button';
import { StatusBadge, Badge } from '../../components/ui/Badge';
import { FilterSelect, FilterBar } from '../../components/ui/FilterSelect';
import { ConfirmDialog } from '../../components/ui/ConfirmDialog';
import { MessageDetailModal } from './MessageDetailModal';
import { contactService } from '../../services/contact.service';
import { useListQuery } from '../../hooks/useListQuery';
import { getErrorMessage } from '../../utils/api';
import { timeAgo } from '../../utils/format';
import { CONTACT_CATEGORIES, CONTACT_STATUSES } from '../../constants/options';
import { usePageMeta } from '../../hooks/usePageMeta';

export const ContactInboxPage = () => {
  usePageMeta('Messages');
  const queryClient = useQueryClient();
  const [viewing, setViewing] = useState(null);
  const [deleting, setDeleting] = useState(null);

  const messages = useListQuery({
    key: 'contact-messages',
    fetcher: (params) => contactService.listMessages(params),
    initialLimit: 10,
  });

  const invalidate = () => {
    queryClient.invalidateQueries({ queryKey: ['contact-messages'] });
    queryClient.invalidateQueries({ queryKey: ['inbox', 'unread'] });
  };

  const readMutation = useMutation({
    mutationFn: (id) => contactService.markRead(id),
    onSuccess: () => invalidate(),
    onError: (error) => toast.error(getErrorMessage(error)),
  });

  const readAllMutation = useMutation({
    mutationFn: () => contactService.markAllRead(),
    onSuccess: () => {
      toast.success('All messages marked as read');
      invalidate();
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => contactService.deleteMessage(id),
    onSuccess: () => {
      toast.success('Message deleted');
      invalidate();
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });

  const columns = useMemo(
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

  return (
    <div>
      <PageHeader
        title="Messages"
        subtitle="Contact form submissions from the public website"
        breadcrumbs={[{ label: 'Messages' }]}
        actions={
          <Button variant="secondary" onClick={() => readAllMutation.mutate()} loading={readAllMutation.isPending}>
            <CheckCheck className="h-4 w-4" />
            Mark all read
          </Button>
        }
      />

      <DataTable
        columns={columns}
        data={messages.items}
        loading={messages.isLoading}
        error={messages.error}
        onRetry={messages.refetch}
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

      <MessageDetailModal open={Boolean(viewing)} onClose={() => setViewing(null)} message={viewing} />

      <ConfirmDialog
        open={Boolean(deleting)}
        onClose={() => setDeleting(null)}
        onConfirm={() => deleting && deleteMutation.mutate(deleting._id)}
        title="Delete message"
        description={`Delete the message from ${deleting?.name}? This action cannot be undone.`}
        confirmLabel="Delete"
        loading={deleteMutation.isPending}
      />
    </div>
  );
};

export default ContactInboxPage;
