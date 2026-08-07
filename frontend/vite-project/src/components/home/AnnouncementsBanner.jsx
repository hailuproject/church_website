import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FiBell, FiX } from 'react-icons/fi';
import { useAnnouncements } from '../../hooks/useHomeSections';
import { useAnnouncementsRealtime } from '../../hooks/useAnnouncementsRealtime';

export default function AnnouncementsBanner() {
  const announcements = useAnnouncements();
  useAnnouncementsRealtime(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    setActiveIndex(0);
  }, [announcements.length]);

  useEffect(() => {
    if (announcements.length <= 1) return undefined;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % announcements.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [announcements.length]);

  if (!announcements.length || dismissed) return null;

  const announcement = announcements[activeIndex];

  return (
    <div className="bg-primary text-white relative" role="status" aria-label="Announcements">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-4">
        <FiBell className="shrink-0 text-secondary" />
        <div className="flex-1 min-w-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={announcement.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4 }}
              className="text-sm"
            >
              <span className="font-semibold">{announcement.title}: </span>
              <span className="text-white/90">{announcement.description}</span>
            </motion.div>
          </AnimatePresence>
        </div>
        {announcements.length > 1 && (
          <span className="hidden sm:flex items-center gap-1 text-xs text-white/70">
            {announcements.map((a, i) => (
              <span
                key={a.id}
                className={`w-1.5 h-1.5 rounded-full transition-colors ${
                  i === activeIndex ? 'bg-secondary' : 'bg-white/40'
                }`}
              />
            ))}
          </span>
        )}
        <button
          onClick={() => setDismissed(true)}
          className="shrink-0 text-white/70 hover:text-white transition-colors cursor-pointer"
          aria-label="Dismiss announcements"
        >
          <FiX />
        </button>
      </div>
    </div>
  );
}
