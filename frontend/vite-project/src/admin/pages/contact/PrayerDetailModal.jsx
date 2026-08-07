import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { HandHeart, X } from 'lucide-react';
import Modal from '../../components/ui/Modal';
import Button from '../../components/ui/Button';
import { StatusBadge } from '../../components/ui/Badge';
import { FilterSelect } from '../../components/ui/FilterSelect';
import { contactService } from '../../services/donation.service';
import { getErrorMessage } from '../../utils/api';
import { formatDateTime } from '../../utils/format';
import { PRAYER_STATUSES } from '../../constants/options';

export const PrayerDetailModal = ({ open, onClose, prayer }) => {
  const queryClient = useQueryClient();

  const invalidate = () => queryClient.invalidateQueries({ queryKey: ['contact-prayers'] });

  const updateMutation = useMutation({
    mutationFn: ({ id, payload }) => contactService.updatePrayer(id, payload),
    onSuccess: (_, vars) => {
      toast.success(`Prayer request marked ${vars.payload.status}`);
      invalidate();
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });

  if (!open || !prayer) return null;

  return (
    <Modal open={open} onClose={onClose} maxWidth="md">
      <div className="mb-4 flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-100 text-primary-600 dark:bg-primary-500/10 dark:text-primary-400">
            <HandHeart className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Prayer request</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {prayer.prayerType} · {formatDateTime(prayer.createdAt)}
            </p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-800 dark:hover:text-gray-300"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="mb-4 flex flex-wrap items-center justify-between gap-2 rounded-xl bg-gray-50 p-4 dark:bg-gray-800/50">
        <div>
          <p className="font-medium text-gray-900 dark:text-gray-100">{prayer.name || 'Anonymous'}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {prayer.email}
            {prayer.phone ? ` · ${prayer.phone}` : ''}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {prayer.isConfidential ? <StatusBadge status="new" /> : null}
          <StatusBadge status={prayer.status} />
        </div>
      </div>

      <div className="max-h-72 overflow-y-auto rounded-xl border border-gray-100 p-4 text-sm leading-relaxed text-gray-700 dark:border-gray-800 dark:text-gray-300">
        {prayer.request}
      </div>

      <div className="mt-5">
        <p className="mb-1.5 text-sm font-medium text-gray-700 dark:text-gray-300">Update status</p>
        <FilterSelect
          label="Status"
          value={prayer.status}
          onChange={(status) => updateMutation.mutate({ id: prayer._id, payload: { status } })}
          options={PRAYER_STATUSES}
        />
      </div>

      <div className="mt-4 flex justify-end">
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      </div>
    </Modal>
  );
};

export default PrayerDetailModal;
