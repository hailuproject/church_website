import { useQuery } from '@tanstack/react-query';
import { Users } from 'lucide-react';
import { Modal } from '../../components/ui/Modal';
import { Badge } from '../../components/ui/Badge';
import { Avatar } from '../../components/ui/Avatar';
import { EmptyState } from '../../components/ui/EmptyState';
import { eventService } from '../../services/event.service';
import { formatDate } from '../../utils/format';

export const EventRsvpsModal = ({ open, onClose, event }) => {
  const { data, isLoading } = useQuery({
    queryKey: ['event-rsvps', event?._id],
    queryFn: () => eventService.getRsvps(event._id, { limit: 50 }),
    enabled: Boolean(event?._id),
  });

  const rsvps = data?.items || [];

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Event RSVPs"
      subtitle={event ? `${event.title} · ${rsvps.length} registered` : ''}
      size="lg"
    >
      <div className="space-y-2">
        {isLoading ? (
          <p className="py-8 text-center text-sm text-gray-400">Loading RSVPs…</p>
        ) : rsvps.length === 0 ? (
          <EmptyState icon={Users} title="No RSVPs yet" description="Nobody has registered for this event." />
        ) : (
          rsvps.map((rsvp) => (
            <div
              key={rsvp._id}
              className="flex items-center gap-3 rounded-lg border border-gray-200 p-3 dark:border-gray-700"
            >
              <Avatar name={rsvp.name} size="sm" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-gray-900 dark:text-gray-100">{rsvp.name}</p>
                <p className="truncate text-xs text-gray-400">
                  {rsvp.email || 'No email'} {rsvp.phone ? `· ${rsvp.phone}` : ''}
                </p>
              </div>
              <div className="flex items-center gap-2">
                {rsvp.guests > 0 && (
                  <span className="text-xs text-gray-400">+{rsvp.guests} guests</span>
                )}
                <Badge
                  tone={
                    rsvp.status === 'confirmed'
                      ? 'success'
                      : rsvp.status === 'cancelled'
                        ? 'danger'
                        : 'warning'
                  }
                >
                  {rsvp.status}
                </Badge>
                <span className="hidden text-xs text-gray-400 sm:block">{formatDate(rsvp.createdAt)}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </Modal>
  );
};

export default EventRsvpsModal;
