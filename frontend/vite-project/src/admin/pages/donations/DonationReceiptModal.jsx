import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { Mail, ReceiptText, X } from 'lucide-react';
import Modal from '../../components/ui/Modal';
import Button from '../../components/ui/Button';
import { formatDate, formatCurrency } from '../../utils/format';
import { donationService } from '../../services/donation.service';
import { getErrorMessage } from '../../utils/api';
import { useQueryClient } from '@tanstack/react-query';

const ReceiptRow = ({ label, value }) => (
  <div className="flex items-start justify-between gap-4 py-2">
    <span className="text-sm text-gray-500 dark:text-gray-400">{label}</span>
    <span className="text-sm font-medium text-gray-900 dark:text-gray-100 text-right">{value}</span>
  </div>
);

export const DonationReceiptModal = ({ open, onClose, donation }) => {
  const queryClient = useQueryClient();

  const resendMutation = useMutation({
    mutationFn: (id) => donationService.resendReceipt(id),
    onSuccess: () => {
      toast.success('Receipt resent to donor');
      queryClient.invalidateQueries({ queryKey: ['donations'] });
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });

  if (!open || !donation) return null;

  return (
    <Modal open={open} onClose={onClose} maxWidth="sm">
      <div className="mb-4 flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-100 text-primary-600 dark:bg-primary-500/10 dark:text-primary-400">
            <ReceiptText className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Donation receipt</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">{donation.receiptNumber || 'No receipt number'}</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-800 dark:hover:text-gray-300"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="divide-y divide-gray-100 dark:divide-gray-800">
        <ReceiptRow label="Donor" value={donation.donorName || 'Anonymous'} />
        <ReceiptRow label="Email" value={donation.email || '—'} />
        <ReceiptRow label="Amount" value={formatCurrency(donation.amount, donation.currency)} />
        {donation.campaign ? <ReceiptRow label="Campaign" value={donation.campaign} /> : null}
        <ReceiptRow label="Payment method" value={donation.paymentMethod} />
        <ReceiptRow label="Date" value={formatDate(donation.date || donation.createdAt, 'MMM d, yyyy · h:mm a')} />
      </div>

      {donation.status === 'completed' && (
        <div className="mt-5">
          <Button
            variant="secondary"
            className="w-full"
            onClick={() => resendMutation.mutate(donation._id)}
            loading={resendMutation.isPending}
          >
            <Mail className="h-4 w-4" />
            Resend receipt
          </Button>
        </div>
      )}
    </Modal>
  );
};

export default DonationReceiptModal;
