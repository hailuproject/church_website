import { X, ShieldCheck } from 'lucide-react';
import Modal from '../../components/ui/Modal';
import { formatDateTime } from '../../utils/format';

const DetailRow = ({ label, value }) => (
  <div className="py-2">
    <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">{label}</p>
    <p className="mt-0.5 break-all text-sm text-gray-800 dark:text-gray-200">{value || '—'}</p>
  </div>
);

const JsonBlock = ({ title, data }) => (
  <div className="mt-2">
    <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">{title}</p>
    <pre className="mt-1 max-h-48 overflow-auto rounded-lg bg-gray-50 p-3 text-xs text-gray-700 dark:bg-gray-900 dark:text-gray-300">
      {data ? JSON.stringify(data, null, 2) : '—'}
    </pre>
  </div>
);

export const AuditLogDetailModal = ({ open, onClose, log }) => {
  if (!open || !log) return null;

  return (
    <Modal open={open} onClose={onClose} maxWidth="md">
      <div className="mb-4 flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-100 text-primary-600 dark:bg-primary-500/10 dark:text-primary-400">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              {log.action} · {log.module}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">{formatDateTime(log.createdAt)}</p>
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
        <DetailRow label="Admin" value={log.adminName} />
        <DetailRow label="Role" value={log.adminRole} />
        <DetailRow label="Module" value={log.module} />
        <DetailRow label="Document ID" value={log.documentId} />
        <DetailRow label="IP address" value={log.ipAddress} />
        <DetailRow label="User agent" value={log.userAgent} />
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <JsonBlock title="Previous data" data={log.oldData} />
        <JsonBlock title="New data" data={log.newData} />
      </div>
    </Modal>
  );
};

export default AuditLogDetailModal;
