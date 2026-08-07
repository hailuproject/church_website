import { Modal } from '../../components/ui/Modal';
import { Badge } from '../../components/ui/Badge';
import { formatDate } from '../../utils/format';

const Row = ({ label, value }) => (
  <div className="flex items-start justify-between gap-4 border-b border-gray-100 py-2.5 last:border-0 dark:border-gray-700">
    <span className="text-sm text-gray-500 dark:text-gray-400">{label}</span>
    <span className="text-right text-sm font-medium text-gray-900 dark:text-gray-100">{value || '—'}</span>
  </div>
);

export const SacramentDetailModal = ({ open, onClose, request }) => {
  const priest = request?.assignedPriest;
  const priestLabel = priest
    ? typeof priest === 'string'
      ? priest
      : priest.name || priest.role || 'Assigned'
    : 'Unassigned';

  const member = request?.member;

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Sacrament request details"
      subtitle={request ? `${request.type} · ${request.status}` : ''}
      size="md"
    >
      <div className="space-y-4">
        <div>
          <p className="mb-2 text-sm font-semibold text-gray-900 dark:text-gray-100">Applicant</p>
          <div className="rounded-lg border border-gray-200 dark:border-gray-700">
            <Row label="Name" value={request?.memberName} />
            <Row label="Phone" value={request?.phone} />
            <Row label="Email" value={request?.email} />
            {member && <Row label="Member" value={`${member.fullName || member.amharicName || member._id}`} />}
          </div>
        </div>

        <div>
          <p className="mb-2 text-sm font-semibold text-gray-900 dark:text-gray-100">Schedule</p>
          <div className="rounded-lg border border-gray-200 dark:border-gray-700">
            <Row label="Preferred date" value={formatDate(request?.preferredDate)} />
            <Row label="Assigned priest" value={priestLabel} />
            <Row label="Status" value={<Badge tone="info">{request?.status}</Badge>} />
            <Row label="Requested on" value={formatDate(request?.createdAt, 'MMM d, yyyy · h:mm a')} />
          </div>
        </div>

        {request?.notes && (
          <div>
            <p className="mb-2 text-sm font-semibold text-gray-900 dark:text-gray-100">Notes</p>
            <p className="rounded-lg border border-gray-200 p-3 text-sm text-gray-600 dark:border-gray-700 dark:text-gray-300">
              {request.notes}
            </p>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default SacramentDetailModal;
