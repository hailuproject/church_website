import { useQuery } from '@tanstack/react-query';
import { UserRound } from 'lucide-react';
import Button from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { Avatar } from '../../components/ui/Avatar';
import { userService } from '../../services/system.service';

export const AssignPriestModal = ({ open, onClose, request, onAssign, submitting }) => {
  const { data, isLoading } = useQuery({
    queryKey: ['priests'],
    queryFn: () => userService.list({ role: 'Priest', limit: 50 }),
    enabled: open,
    select: (response) => response.items,
  });

  const priests = data || [];
  const current = request?.assignedPriest?._id || request?.assignedPriest || '';

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Assign priest"
      subtitle={request ? `${request.type} for ${request.memberName}` : ''}
      size="md"
      footer={
        <>
          <Button variant="secondary" onClick={onClose} type="button">
            Cancel
          </Button>
          <Button
            type="submit"
            form="assign-priest-form"
            loading={submitting}
          >
            Assign priest
          </Button>
        </>
      }
    >
      <form
        id="assign-priest-form"
        onSubmit={(e) => {
          e.preventDefault();
          const form = new FormData(e.currentTarget);
          const priestId = form.get('priestId');
          if (priestId) onAssign(priestId);
        }}
      >
        <div className="space-y-4">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Assigning a priest schedules the request. The request status will change to <strong>scheduled</strong>.
          </p>
          {isLoading ? (
            <p className="py-4 text-sm text-gray-400">Loading priests…</p>
          ) : priests.length === 0 ? (
            <div className="flex items-center gap-2 rounded-lg bg-amber-50 p-3 text-sm text-amber-700 dark:bg-amber-500/10 dark:text-amber-400">
              <UserRound className="h-4 w-4" />
              No priest accounts found. Create a priest user in the Users section first.
            </div>
          ) : (
            <div className="space-y-2">
              {priests.map((priest) => (
                <label
                  key={priest._id}
                  className="flex cursor-pointer items-center gap-3 rounded-lg border border-gray-200 p-3 has-[:checked]:border-primary-400 has-[:checked]:bg-primary-50/50 dark:border-gray-700 dark:has-[:checked]:bg-primary-500/5"
                >
                  <input
                    type="radio"
                    name="priestId"
                    value={priest._id}
                    defaultChecked={priest._id === current}
                    className="accent-primary-500"
                  />
                  <Avatar name={priest.name} src={priest.avatar?.url} size="sm" />
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{priest.name}</p>
                    <p className="text-xs text-gray-400">{priest.email}</p>
                  </div>
                </label>
              ))}
            </div>
          )}
        </div>
      </form>
    </Modal>
  );
};

export default AssignPriestModal;
