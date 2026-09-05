import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  FiCalendar,
  FiClock,
  FiArrowRight,
  FiHeart,
  FiUser,
  FiTrendingUp,
} from 'react-icons/fi';
import { sidebarContent } from '../../../../data/sermonsData';
import { useTranslation } from '../../../../i18n/LanguageContext';

const MotionLink = motion(Link);

function SectionHeading({ icon: Icon, title }) {
  return (
    <div className="flex items-center gap-2.5 mb-4">
      <div className="w-8 h-8 bg-primary/5 rounded-xs flex items-center justify-center">
        <Icon className="text-primary text-sm" />
      </div>
      <h3 className="text-sm font-semibold text-text">{title}</h3>
    </div>
  );
}

function UpcomingServices() {
  const { t } = useTranslation();
  const { upcomingServices } = sidebarContent;
  if (!upcomingServices.length) return null;
  return (
    <div className="bg-white border border-border rounded-xs p-5">
      <SectionHeading icon={FiCalendar} title={t('pages.sermons.upcomingServices')} />
      <div className="space-y-3">
        {upcomingServices.map((s) => (
          <div
            key={`${s.day}-${s.service}`}
            className="flex items-start gap-3 pb-3 border-b border-border last:border-0 last:pb-0"
          >
            <div className="w-10 h-10 bg-primary/5 rounded-xs flex flex-col items-center justify-center shrink-0">
              <span className="text-xs font-bold text-primary leading-tight">
                {s.day.slice(0, 3)}
              </span>
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-text">{s.service}</p>
              <p className="text-xs text-muted flex items-center gap-1 mt-0.5">
                <FiClock className="text-xs" />
                {s.time}
              </p>
            </div>
          </div>
        ))}
      </div>
      <Link
        to="/contact#schedule"
        className="flex items-center justify-center gap-1.5 text-xs font-medium text-primary hover:text-primary-dark mt-4 pt-3 border-t border-border transition-colors"
      >
        {t('pages.sermons.fullSchedule')}
        <FiArrowRight />
      </Link>
    </div>
  );
}

function PopularSermons() {
  const { t } = useTranslation();
  const { popularSermons } = sidebarContent;
  if (!popularSermons.length) return null;
  return (
    <div className="bg-white border border-border rounded-xs p-5">
      <SectionHeading icon={FiTrendingUp} title={t('pages.sermons.popularSermons')} />
      <div className="space-y-3">
        {popularSermons.map((s) => (
          <a
            key={s.title}
            href={s.href}
            className="block pb-3 border-b border-border last:border-0 last:pb-0 group"
          >
            <p className="text-sm font-medium text-text group-hover:text-primary transition-colors leading-snug">
              {s.title}
            </p>
            <div className="flex items-center gap-3 text-xs text-muted mt-1">
              <span className="flex items-center gap-1">
                <FiUser className="text-xs" />
                {s.priest}
              </span>
              <span>{t('pages.sermons.viewsCount', { count: s.views.toLocaleString() })}</span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

function PrayerRequestButton() {
  const { t } = useTranslation();
  return (
    <MotionLink
      to="/contact#form"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="flex items-center justify-center gap-2.5 bg-primary/5 border border-primary/20 text-primary font-semibold text-sm px-6 py-4 rounded-xs hover:bg-primary hover:text-white transition-all duration-300"
    >
      <FiHeart className="text-lg" />
      {t('pages.sermons.prayerRequest')}
    </MotionLink>
  );
}

export default function Sidebar() {
  const { t } = useTranslation();
  return (
    <aside className="lg:sticky lg:top-28 space-y-6" aria-label={t('pages.sermons.sidebar')}>
      <UpcomingServices />
      <PopularSermons />
      <PrayerRequestButton />
    </aside>
  );
}
