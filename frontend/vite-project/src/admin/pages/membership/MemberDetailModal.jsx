import { Modal } from '../../components/ui/Modal';
import { Badge } from '../../components/ui/Badge';
import { formatDate } from '../../utils/format';

const Row = ({ label, value }) => (
  <div className="flex items-start justify-between gap-4 border-b border-gray-100 py-2.5 last:border-0 dark:border-gray-700">
    <span className="text-sm text-gray-500 dark:text-gray-400">{label}</span>
    <span className="text-right text-sm font-medium text-gray-900 dark:text-gray-100">{value || '—'}</span>
  </div>
);

export const MemberDetailModal = ({ open, onClose, member }) => {
  const address = member?.address;

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={member?.fullName || 'Member details'}
      subtitle={member ? `Member · ${member.status}` : ''}
      size="lg"
    >
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <p className="mb-2 text-sm font-semibold text-gray-900 dark:text-gray-100">Personal</p>
          <div className="rounded-lg border border-gray-200 dark:border-gray-700">
            <Row label="Full name" value={member?.fullName} />
            <Row label="አማርኛ ስም" value={member?.amharicName} />
            <Row label="Baptism name" value={member?.baptismName} />
            <Row label="Email" value={member?.email} />
            <Row label="Phone" value={member?.phone} />
            <Row label="Status" value={<Badge tone="info">{member?.status}</Badge>} />
            <Row label="Registered on" value={formatDate(member?.createdAt, 'MMM d, yyyy')} />
          </div>
        </div>

        <div>
          <p className="mb-2 text-sm font-semibold text-gray-900 dark:text-gray-100">Address</p>
          <div className="rounded-lg border border-gray-200 dark:border-gray-700">
            <Row label="Street" value={address?.street} />
            <Row label="City" value={address?.city} />
            <Row label="Sub city" value={address?.subcity} />
            <Row label="Woreda" value={address?.woreda} />
            <Row label="Country" value={address?.country} />
          </div>
        </div>
      </div>

      {(member?.family?.length > 0 || member?.documents?.length > 0 || member?.notes) && (
        <div className="mt-6 space-y-6">
          {member?.family?.length > 0 && (
            <div>
              <p className="mb-2 text-sm font-semibold text-gray-900 dark:text-gray-100">Family members</p>
              <div className="space-y-1.5">
                {member.family.map((f, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between rounded-lg border border-gray-200 px-3 py-2 text-sm dark:border-gray-700"
                  >
                    <span className="text-gray-800 dark:text-gray-200">{f.fullName}</span>
                    <span className="text-xs text-gray-400">
                      {f.relationship || ''}{f.age ? ` · ${f.age} yrs` : ''}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {member?.documents?.length > 0 && (
            <div>
              <p className="mb-2 text-sm font-semibold text-gray-900 dark:text-gray-100">Documents</p>
              <div className="flex flex-wrap gap-2">
                {member.documents.map((doc, index) => (
                  <a
                    key={doc.publicId || index}
                    href={doc.url}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-lg border border-primary-300 px-3 py-1.5 text-xs font-medium text-primary-600 hover:bg-primary-50 dark:border-primary-700 dark:text-primary-400 dark:hover:bg-primary-500/10"
                  >
                    {doc.format || 'Document'} #{index + 1}
                  </a>
                ))}
              </div>
            </div>
          )}

          {member?.notes && (
            <div>
              <p className="mb-2 text-sm font-semibold text-gray-900 dark:text-gray-100">Notes</p>
              <p className="rounded-lg border border-gray-200 p-3 text-sm text-gray-600 dark:border-gray-700 dark:text-gray-300">
                {member.notes}
              </p>
            </div>
          )}
        </div>
      )}
    </Modal>
  );
};

export default MemberDetailModal;
