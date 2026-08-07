import { useMemo, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { CheckCircle2, ReceiptText, Mail, Download, HeartHandshake } from 'lucide-react';
import { PageHeader } from '../../components/ui/PageHeader';
import { DataTable, ActionMenu } from '../../components/ui/DataTable';
import { SearchInput } from '../../components/ui/SearchInput';
import Button from '../../components/ui/Button';
import { StatusBadge } from '../../components/ui/Badge';
import { FilterSelect, FilterBar } from '../../components/ui/FilterSelect';
import { DonationReceiptModal } from './DonationReceiptModal';
import { donationService } from '../../services/donation.service';
import { useListQuery } from '../../hooks/useListQuery';
import { getErrorMessage } from '../../utils/api';
import { downloadTextFile } from '../../utils/helpers';
import { formatCurrency, timeAgo } from '../../utils/format';
import { DONATION_STATUSES, DONATION_PAYMENT_METHODS } from '../../constants/options';
import { usePageMeta } from '../../hooks/usePageMeta';

export const DonationsPage = () => {
  usePageMeta('Donations');
  const queryClient = useQueryClient();
  const [viewing, setViewing] = useState(null);
  const [exporting, setExporting] = useState(false);

  const list = useListQuery({
    key: 'donations',
    fetcher: (params) => donationService.list(params),
    initialLimit: 10,
  });

  const invalidate = () => queryClient.invalidateQueries({ queryKey: ['donations'] });

  const confirmMutation = useMutation({
    mutationFn: (id) => donationService.confirm(id),
    onSuccess: () => {
      toast.success('Donation confirmed');
      invalidate();
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });

  const statusMutation = useMutation({
    mutationFn: ({ id, status }) => donationService.changeStatus(id, status),
    onSuccess: (_, vars) => {
      toast.success(`Donation marked ${vars.status}`);
      invalidate();
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });

  const resendMutation = useMutation({
    mutationFn: (id) => donationService.resendReceipt(id),
    onSuccess: () => toast.success('Receipt resent'),
    onError: (error) => toast.error(getErrorMessage(error)),
  });

  const handleExport = async () => {
    setExporting(true);
    try {
      const csv = await donationService.exportCsv({ ...list.filters, limit: 1000 });
      downloadTextFile(csv, `donations-${new Date().toISOString().slice(0, 10)}.csv`);
      toast.success('Donations exported');
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setExporting(false);
    }
  };

  const columns = useMemo(
    () => [
      {
        key: 'donorName',
        header: 'Donor',
        render: (row) => (
          <div>
            <p className="font-medium text-gray-900 dark:text-gray-100">
              {row.isAnonymous ? 'Anonymous' : row.donorName || '—'}
            </p>
            {row.isAnonymous ? null : (
              <p className="text-xs text-gray-400">{row.email || row.phone || ''}</p>
            )}
          </div>
        ),
      },
      {
        key: 'campaign',
        header: 'Campaign',
        render: (row) => <span className="text-sm text-gray-600 dark:text-gray-300">{row.campaign || '—'}</span>,
      },
      {
        key: 'amount',
        header: 'Amount',
        render: (row) => (
          <span className="font-semibold text-gray-900 dark:text-gray-100">
            {formatCurrency(row.amount, row.currency)}
          </span>
        ),
      },
      {
        key: 'paymentMethod',
        header: 'Method',
        render: (row) => (
          <span className="text-sm text-gray-600 dark:text-gray-300">{row.paymentMethod || '—'}</span>
        ),
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
                label: 'View receipt',
                icon: ReceiptText,
                onClick: (r) => setViewing(r),
              },
              ...(row.status === 'pending'
                ? [
                    {
                      label: 'Confirm payment',
                      icon: CheckCircle2,
                      onClick: (r) => confirmMutation.mutate(r._id),
                    },
                  ]
                : []),
              ...(row.status === 'completed'
                ? [
                    {
                      label: 'Resend receipt',
                      icon: Mail,
                      onClick: (r) => resendMutation.mutate(r._id),
                    },
                  ]
                : []),
              ...DONATION_STATUSES.filter((s) => s !== row.status).map((s) => ({
                label: `Mark ${s}`,
                onClick: (r) => statusMutation.mutate({ id: r._id, status: s }),
              })),
            ]}
          />
        ),
      },
    ],
    [confirmMutation, statusMutation, resendMutation]
  );

  return (
    <div>
      <PageHeader
        title="Donations"
        subtitle="Track contributions and payment receipts"
        breadcrumbs={[{ label: 'Donations' }]}
        actions={
          <Button variant="secondary" onClick={handleExport} loading={exporting}>
            <Download className="h-4 w-4" />
            Export CSV
          </Button>
        }
      />

      <DataTable
        columns={columns}
        data={list.items}
        loading={list.isLoading}
        pagination={list.pagination}
        onPageChange={list.setPage}
        onLimitChange={list.setLimit}
        toolbar={
          <>
            <SearchInput
              value={list.searchInput}
              onChange={list.setSearchInput}
              placeholder="Search donors, emails, receipts…"
              className="w-full sm:w-72"
            />
            <FilterBar>
              <FilterSelect
                label="Status"
                value={list.filters.status}
                onChange={(v) => list.setFilter('status', v)}
                options={DONATION_STATUSES}
              />
              <FilterSelect
                label="Method"
                value={list.filters.paymentMethod}
                onChange={(v) => list.setFilter('paymentMethod', v)}
                options={DONATION_PAYMENT_METHODS}
              />
            </FilterBar>
          </>
        }
        emptyTitle="No donations found"
        emptyDescription="Donations made through the website will appear here."
        emptyIcon={HeartHandshake}
      />

      <DonationReceiptModal open={Boolean(viewing)} onClose={() => setViewing(null)} donation={viewing} />
    </div>
  );
};

export default DonationsPage;
