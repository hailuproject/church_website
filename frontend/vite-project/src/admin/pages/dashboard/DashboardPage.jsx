import { useQuery } from '@tanstack/react-query';
import { Mic, CalendarDays, BookOpen, Inbox, HeartHandshake, Activity, RefreshCw } from 'lucide-react';
import { dashboardService } from '../../services/system.service';
import { PageHeader } from '../../components/ui/PageHeader';
import { StatCard } from '../../components/ui/StatCard';
import { Card, CardHeader, CardContent } from '../../components/ui/Card';
import { SkeletonCards, Skeleton } from '../../components/ui/Skeleton';
import { EmptyState } from '../../components/ui/EmptyState';
import Button from '../../components/ui/Button';
import { useAuth } from '../../context/AuthContext';
import { usePageMeta } from '../../hooks/usePageMeta';
import { formatNumber, timeAgo } from '../../utils/format';

const STAT_CARDS = [
  { key: 'totalSermons', label: 'Total Sermons', icon: Mic, tone: 'primary', hint: 'published & drafts' },
  { key: 'upcomingEvents', label: 'Upcoming Events', icon: CalendarDays, tone: 'info', hint: 'scheduled events' },
  { key: 'totalResources', label: 'Resources', icon: BookOpen, tone: 'success', hint: 'total documents' },
  { key: 'unreadMessages', label: 'Unread Messages', icon: Inbox, tone: 'warning', hint: 'in contact inbox' },
  { key: 'donationCount', label: 'Donations', icon: HeartHandshake, tone: 'danger', hint: 'all-time' },
];

const RecentActivity = ({ activities, loading }) => {
  if (loading) {
    return (
      <div className="space-y-3 px-5 pb-5">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-12 w-full" />
        ))}
      </div>
    );
  }

  if (!activities?.length) {
    return (
      <div className="px-5 pb-5">
        <EmptyState title="No recent activity" description="Administrative actions will appear here." icon={Activity} />
      </div>
    );
  }

  return (
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
  );
};

export const DashboardPage = () => {
  usePageMeta('Dashboard');
  const { user } = useAuth();

  const { data, isLoading, isFetching, refetch } = useQuery({
    queryKey: ['dashboard', 'overview'],
    queryFn: () => dashboardService.getOverview(),
    refetchInterval: 60 * 1000,
  });

  const overview = data?.overview || data || {};

  return (
    <div>
      <PageHeader
        title={`Welcome back, ${user?.name?.split(' ')[0] || 'Admin'}`}
        subtitle="A quick look at your church's content and communication."
        breadcrumbs={[{ label: 'Dashboard' }]}
        actions={
          <Button variant="secondary" size="sm" onClick={() => refetch()} loading={isFetching}>
            <RefreshCw className="h-4 w-4" />
            Refresh
          </Button>
        }
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {isLoading ? (
          <SkeletonCards count={5} />
        ) : (
          STAT_CARDS.map((card) => (
            <StatCard
              key={card.key}
              title={card.label}
              value={formatNumber(overview[card.key])}
              icon={card.icon}
              tone={card.tone}
              hint={card.hint}
            />
          ))
        )}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader title="Recent Activity" subtitle="Latest administrative actions" />
          <CardContent>
            <RecentActivity activities={data?.recentActivities} loading={isLoading} />
          </CardContent>
        </Card>
      </div>

      {!isLoading && !data && (
        <Card className="mt-6">
          <EmptyState
            title="Could not load dashboard data"
            description="Check that the backend API is running and try again."
            action={
              <Button onClick={() => refetch()}>
                <RefreshCw className="h-4 w-4" />
                Retry
              </Button>
            }
          />
        </Card>
      )}
    </div>
  );
};

export default DashboardPage;
