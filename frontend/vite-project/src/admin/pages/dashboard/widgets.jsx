import { useNavigate } from 'react-router-dom';
import {
  UserPlus,
  Mic,
  HeartHandshake,
  Inbox,
  CalendarDays,
  Megaphone,
  ArrowRight,
  Activity,
} from 'lucide-react';
import { Avatar } from '../../components/ui/Avatar';
import { Badge, StatusBadge } from '../../components/ui/Badge';
import { formatCurrency, formatDate, timeAgo } from '../../utils/format';
import { getMediaUrl } from '../../utils/helpers';

const SectionHeader = ({ icon: Icon, title, linkTo, linkLabel = 'View all' }) => {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-between px-5 pt-5 pb-3">
      <div className="flex items-center gap-2">
        <Icon className="h-4 w-4 text-primary-500" />
        <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">{title}</h3>
      </div>
      {linkTo && (
        <button
          type="button"
          onClick={() => navigate(linkTo)}
          className="inline-flex items-center gap-1 text-xs font-medium text-primary-600 hover:text-primary-700 dark:text-primary-400"
        >
          {linkLabel} <ArrowRight className="h-3.5 w-3.5" />
        </button>
      )}
    </div>
  );
};

export const RecentActivitiesWidget = ({ activities }) => {
  if (!activities?.length) return null;
  return (
    <div className="rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
      <SectionHeader icon={Activity} title="Recent Activities" />
      <ol className="px-5 pb-5">
        {activities.map((activity, index) => (
          <li key={activity._id || index} className="flex gap-3 py-2.5">
            <div className="flex flex-col items-center">
              <div className="h-2.5 w-2.5 rounded-full bg-primary-500 ring-4 ring-primary-100 dark:ring-primary-500/20" />
              {index < activities.length - 1 && <div className="h-full w-px bg-gray-200 dark:bg-gray-700" />}
            </div>
            <div className="min-w-0 flex-1 pb-1">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                <span className="font-medium capitalize">{activity.action}</span>{' '}
                <span className="text-gray-500 dark:text-gray-400">on {activity.module}</span>
              </p>
              <p className="mt-0.5 truncate text-xs text-gray-400">
                {activity.adminName || activity.admin?.name || 'System'} · {timeAgo(activity.createdAt)}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
};

export const RecentMembersWidget = ({ members, linkTo = '/admin/membership' }) => {
  if (!members?.length) return null;
  return (
    <div className="rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
      <SectionHeader icon={UserPlus} title="Latest Members" linkTo={linkTo} />
      <ul className="divide-y divide-gray-100 px-5 pb-3 dark:divide-gray-700">
        {members.map((member) => (
          <li key={member._id} className="flex items-center gap-3 py-2.5">
            <Avatar name={member.fullName} size="sm" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-gray-900 dark:text-gray-100">{member.fullName}</p>
              <p className="truncate text-xs text-gray-400">
                {member.email || member.phone || 'No contact'} · {timeAgo(member.createdAt)}
              </p>
            </div>
            <StatusBadge status={member.status} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export const RecentSermonsWidget = ({ sermons, linkTo = '/admin/sermons' }) => {
  if (!sermons?.length) return null;
  return (
    <div className="rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
      <SectionHeader icon={Mic} title="Latest Sermons" linkTo={linkTo} />
      <ul className="divide-y divide-gray-100 px-5 pb-3 dark:divide-gray-700">
        {sermons.map((sermon) => (
          <li key={sermon._id} className="flex items-center gap-3 py-2.5">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-primary-50 dark:bg-primary-500/10">
              {sermon.thumbnail?.url ? (
                <img src={sermon.thumbnail.url} alt="" className="h-full w-full object-cover" loading="lazy" />
              ) : (
                <Mic className="h-4 w-4 text-primary-500" />
              )}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-gray-900 dark:text-gray-100">{sermon.title}</p>
              <p className="truncate text-xs text-gray-400">
                {sermon.speaker || 'Unknown speaker'} · {sermon.category}
              </p>
            </div>
            <Badge tone={sermon.isPublished ? 'success' : 'neutral'}>{sermon.isPublished ? 'Published' : 'Draft'}</Badge>
          </li>
        ))}
      </ul>
    </div>
  );
};

export const RecentEventsWidget = ({ events, linkTo = '/admin/events' }) => {
  if (!events?.length) return null;
  return (
    <div className="rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
      <SectionHeader icon={CalendarDays} title="Upcoming Events" linkTo={linkTo} />
      <ul className="divide-y divide-gray-100 px-5 pb-3 dark:divide-gray-700">
        {events.map((event) => (
          <li key={event._id} className="flex items-center gap-3 py-2.5">
            <div className="flex h-10 w-10 shrink-0 flex-col items-center justify-center rounded-lg bg-primary-50 dark:bg-primary-500/10">
              <span className="text-sm font-bold leading-none text-primary-600 dark:text-primary-300">
                {formatDate(event.date, 'd')}
              </span>
              <span className="text-[10px] font-medium uppercase text-primary-500">{formatDate(event.date, 'MMM')}</span>
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-gray-900 dark:text-gray-100">{event.title}</p>
              <p className="truncate text-xs text-gray-400">
                {event.location || 'Location TBA'} · {event.category}
              </p>
            </div>
            <StatusBadge status={event.status} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export const RecentMessagesWidget = ({ messages, linkTo = '/admin/contact-inbox' }) => {
  if (!messages?.length) return null;
  return (
    <div className="rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
      <SectionHeader icon={Inbox} title="Latest Messages" linkTo={linkTo} />
      <ul className="divide-y divide-gray-100 px-5 pb-3 dark:divide-gray-700">
        {messages.map((message) => (
          <li key={message._id} className="flex items-center gap-3 py-2.5">
            <Avatar name={message.name} size="sm" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-gray-900 dark:text-gray-100">
                {message.subject || message.name}
              </p>
              <p className="truncate text-xs text-gray-400">
                {message.name} · {message.email}
              </p>
            </div>
            {!message.isRead && <span className="h-2 w-2 rounded-full bg-red-500" title="Unread" />}
          </li>
        ))}
      </ul>
    </div>
  );
};

export const RecentDonationsWidget = ({ donations, linkTo = '/admin/donations' }) => {
  if (!donations?.length) return null;
  return (
    <div className="rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
      <SectionHeader icon={HeartHandshake} title="Latest Donations" linkTo={linkTo} />
      <ul className="divide-y divide-gray-100 px-5 pb-3 dark:divide-gray-700">
        {donations.map((donation) => (
          <li key={donation._id} className="flex items-center gap-3 py-2.5">
            <Avatar name={donation.donorName || 'Anonymous'} size="sm" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-gray-900 dark:text-gray-100">
                {donation.isAnonymous ? 'Anonymous' : donation.donorName || 'Unknown donor'}
              </p>
              <p className="truncate text-xs text-gray-400">
                {donation.paymentMethod} · {timeAgo(donation.createdAt)}
              </p>
            </div>
            <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">
              {formatCurrency(donation.amount, donation.currency)}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export const RecentAnnouncementsWidget = ({ announcements, linkTo = '/admin/announcements' }) => {
  if (!announcements?.length) return null;
  return (
    <div className="rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
      <SectionHeader icon={Megaphone} title="Recent Announcements" linkTo={linkTo} />
      <ul className="divide-y divide-gray-100 px-5 pb-3 dark:divide-gray-700">
        {announcements.map((announcement) => (
          <li key={announcement._id} className="flex items-center gap-3 py-2.5">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-50 dark:bg-primary-500/10">
              <Megaphone className="h-4 w-4 text-primary-500" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-gray-900 dark:text-gray-100">{announcement.title}</p>
              <p className="truncate text-xs text-gray-400">{timeAgo(announcement.createdAt)}</p>
            </div>
            <Badge tone={announcement.isPublished ? 'success' : 'neutral'}>
              {announcement.isPublished ? 'Live' : 'Draft'}
            </Badge>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default {
  RecentActivitiesWidget,
  RecentMembersWidget,
  RecentSermonsWidget,
  RecentEventsWidget,
  RecentMessagesWidget,
  RecentDonationsWidget,
  RecentAnnouncementsWidget,
};
