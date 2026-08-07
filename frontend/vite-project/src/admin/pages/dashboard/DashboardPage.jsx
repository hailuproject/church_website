import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import {
  Users,
  Mic,
  CalendarDays,
  BookOpen,
  Images,
  HeartHandshake,
  Inbox,
  Church,
  Download,
  Megaphone,
  TrendingUp,
  Wallet,
  RefreshCw,
} from 'lucide-react';
import { dashboardService } from '../../services/system.service';
import { PageHeader } from '../../components/ui/PageHeader';
import { StatCard } from '../../components/ui/StatCard';
import { Card, CardHeader, CardContent } from '../../components/ui/Card';
import { SkeletonCards, Skeleton } from '../../components/ui/Skeleton';
import { EmptyState } from '../../components/ui/EmptyState';
import Button from '../../components/ui/Button';
import { useAuth } from '../../context/AuthContext';
import { usePageMeta } from '../../hooks/usePageMeta';
import { formatCurrency, formatNumber } from '../../utils/format';
import {
  DonationAreaChart,
  GrowthAreaChart,
  CategoryPieChart,
  CategoryBarChart,
} from './charts';
import {
  RecentActivitiesWidget,
  RecentMembersWidget,
  RecentSermonsWidget,
  RecentEventsWidget,
  RecentMessagesWidget,
  RecentDonationsWidget,
  RecentAnnouncementsWidget,
} from './widgets';
import { cn } from '../../utils/helpers';

const OVERVIEW_CARDS = [
  { key: 'totalMembers', label: 'Total Members', icon: Users, tone: 'primary', hint: 'total registered' },
  { key: 'totalSermons', label: 'Total Sermons', icon: Mic, tone: 'violet', hint: 'published & drafts' },
  { key: 'upcomingEvents', label: 'Upcoming Events', icon: CalendarDays, tone: 'info', hint: 'scheduled events' },
  { key: 'totalResources', label: 'Resources', icon: BookOpen, tone: 'success', hint: 'total documents' },
  { key: 'galleryImages', label: 'Gallery Images', icon: Images, tone: 'warning', hint: 'across all albums' },
  { key: 'donationCount', label: 'Completed Donations', icon: HeartHandshake, tone: 'danger', hint: 'all-time' },
  { key: 'unreadMessages', label: 'Unread Messages', icon: Inbox, tone: 'info', hint: 'in contact inbox' },
  { key: 'pendingRequests', label: 'Pending Sacrament Requests', icon: Church, tone: 'warning', hint: 'needs attention' },
];

export const DashboardPage = () => {
  usePageMeta('Dashboard');
  const { user } = useAuth();
  const navigate = useNavigate();

  const { data, isLoading, isFetching, refetch } = useQuery({
    queryKey: ['dashboard', 'full'],
    queryFn: () => dashboardService.getFull(6),
    refetchInterval: 60 * 1000,
  });

  const overview = data?.overview || {};
  const charts = data?.charts || {};

  return (
    <div>
      <PageHeader
        title={`Welcome back, ${user?.name?.split(' ')[0] || 'Admin'}`}
        subtitle="Here's what's happening across your church today."
        breadcrumbs={[{ label: 'Dashboard' }]}
        actions={
          <Button variant="secondary" size="sm" onClick={() => refetch()} loading={isFetching}>
            <RefreshCw className="h-4 w-4" />
            Refresh
          </Button>
        }
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {isLoading ? (
          <SkeletonCards count={8} />
        ) : (
          <>
            <StatCard
              title="Total Donations"
              value={formatCurrency(overview.totalDonations)}
              icon={Wallet}
              tone="success"
              hint="completed only"
            />
            <StatCard
              title="Monthly Donations"
              value={formatCurrency(overview.monthlyDonations)}
              icon={TrendingUp}
              tone="primary"
              hint="this month"
            />
            <StatCard
              title="Annual Donations"
              value={formatCurrency(overview.annualDonations)}
              icon={HeartHandshake}
              tone="danger"
              hint="this year"
            />
            <StatCard
              title="Total Downloads"
              value={formatNumber(overview.totalDownloads)}
              icon={Download}
              tone="violet"
              hint="sermons & resources"
            />
            {OVERVIEW_CARDS.map((card) => (
              <StatCard
                key={card.key}
                title={card.label}
                value={formatNumber(overview[card.key])}
                icon={card.icon}
                tone={card.tone}
                hint={card.hint}
              />
            ))}
          </>
        )}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader title="Monthly Donations" subtitle="Completed donations over the current year" />
          <CardContent>
            {isLoading ? <Skeleton className="h-64 w-full" /> : <DonationAreaChart data={charts.donationSeries} />}
          </CardContent>
        </Card>
        <Card>
          <CardHeader title="Member Growth" subtitle="New members per month" />
          <CardContent>
            {isLoading ? <Skeleton className="h-64 w-full" /> : <GrowthAreaChart data={charts.memberStats} label="New members" />}
          </CardContent>
        </Card>
        <Card>
          <CardHeader title="Events by Category" subtitle="Distribution of events" />
          <CardContent>
            {isLoading ? <Skeleton className="h-64 w-full" /> : <CategoryPieChart data={charts.eventsByCategory} name="Events" />}
          </CardContent>
        </Card>
        <Card>
          <CardHeader title="Sermons by Category" subtitle="Content distribution" />
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-64 w-full" />
            ) : (
              <CategoryBarChart data={charts.sermonsByCategory} name="Sermons" />
            )}
          </CardContent>
        </Card>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <RecentActivitiesWidget activities={data?.recentActivities} />
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:col-span-2">
          <RecentMembersWidget members={data?.recentMembers} />
          <RecentSermonsWidget sermons={data?.recentSermons} />
          <RecentEventsWidget events={data?.recentEvents} />
          <RecentMessagesWidget messages={data?.recentMessages} />
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <RecentDonationsWidget donations={data?.recentDonations} />
        <RecentAnnouncementsWidget announcements={data?.recentAnnouncements} />
      </div>

      {!isLoading && !data && (
        <Card className={cn('mt-6')}>
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
