import { useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, dateFnsLocalizer, Views } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import { FiX, FiCalendar, FiClock, FiMapPin, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Container from '../../components/Container';
import Section from '../../components/Section';
import { useCalendarEvents } from '../../hooks/useEventsSections';

const locales = {
  'en-US': {
    format,
    parse,
    startOfWeek,
    getDay,
    formats: {
      monthHeaderFormat: 'MMMM yyyy',
      dayHeaderFormat: 'EEEE, MMMM d',
      dayRangeHeaderFormat: ({ start, end }) =>
        `${format(start, 'MMM d')} – ${format(end, 'MMM d, yyyy')}`,
    },
  },
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 0 }),
  getDay,
  locales,
});

export default function CalendarSection() {
  const calendarEvents = useCalendarEvents();
  const [currentView, setCurrentView] = useState(Views.MONTH);
  const [currentDate, setCurrentDate] = useState(new Date(2026, 0, 1));
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleSelectEvent = useCallback((event) => {
    setSelectedEvent(event);
    setShowModal(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setShowModal(false);
    setSelectedEvent(null);
  }, []);

  const formats = useMemo(() => ({
    monthHeaderFormat: 'MMMM yyyy',
    dayHeaderFormat: 'EEE d',
    dayRangeHeaderFormat: ({ start, end }) =>
      `${format(start, 'MMM d')} – ${format(end, 'MMM d, yyyy')}`,
  }), []);

  return (
    <Section id="calendar" className="bg-white">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 text-center max-w-3xl mx-auto"
        >
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-secondary">
            Liturgical Calendar
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-text mt-4 leading-tight">
            Church Calendar
          </h2>
          <p className="text-muted text-base sm:text-lg mt-4 leading-relaxed">
            View all upcoming services, feast days, and community events at a glance.
          </p>
        </motion.div>

        <motion.div
          className="bg-white rounded-xs border border-border shadow-sm overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="calendar-container p-4 sm:p-6">
            <Calendar
              localizer={localizer}
              events={calendarEvents}
              startAccessor="start"
              endAccessor="end"
              titleAccessor="title"
              view={currentView}
              views={[Views.MONTH, Views.WEEK, Views.DAY]}
              date={currentDate}
              onNavigate={(date) => setCurrentDate(date)}
              onView={(view) => setCurrentView(view)}
              onSelectEvent={handleSelectEvent}
              formats={formats}
              popup
              style={{ height: 600 }}
              className="events-calendar"
              components={{
                toolbar: ({ onNavigate, view, views: viewList, onView }) => (
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-border">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => onNavigate('PREV')}
                        className="w-9 h-9 rounded-xs border border-border flex items-center justify-center hover:bg-surface hover:border-secondary/30 transition-all duration-300 cursor-pointer"
                        aria-label="Previous month"
                      >
                        <FiChevronLeft className="text-text" />
                      </button>
                      <button
                        onClick={() => onNavigate('TODAY')}
                        className="px-4 py-2 rounded-xs text-sm font-medium bg-primary text-white hover:bg-primary-dark transition-colors duration-300 cursor-pointer"
                      >
                        Today
                      </button>
                      <button
                        onClick={() => onNavigate('NEXT')}
                        className="w-9 h-9 rounded-xs border border-border flex items-center justify-center hover:bg-surface hover:border-secondary/30 transition-all duration-300 cursor-pointer"
                        aria-label="Next month"
                      >
                        <FiChevronRight className="text-text" />
                      </button>
                    </div>

                    <h3 className="text-lg sm:text-xl font-bold text-text">
                      {format(currentDate, 'MMMM yyyy')}
                    </h3>

                    <div className="flex items-center gap-1 bg-surface rounded-xs p-1">
                      {viewList.map((v) => (
                        <button
                          key={v}
                          onClick={() => onView(v)}
                          className={`px-3 py-1.5 rounded-xs text-sm font-medium transition-all duration-300 cursor-pointer ${
                            view === v
                              ? 'bg-primary text-white shadow-sm'
                              : 'text-muted hover:text-text hover:bg-white'
                          }`}
                        >
                          {v.charAt(0).toUpperCase() + v.slice(1)}
                        </button>
                      ))}
                    </div>
                  </div>
                ),
              }}
            />
          </div>
        </motion.div>

        <AnimatePresence>
          {showModal && selectedEvent && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={handleCloseModal}
                aria-hidden="true"
              />
              <motion.div
                className="relative bg-white rounded-xs shadow-2xl max-w-md w-full p-8 z-10"
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                role="dialog"
                aria-modal="true"
                aria-label={`Event details: ${selectedEvent.title}`}
              >
                <button
                  onClick={handleCloseModal}
                  className="absolute top-4 right-4 w-9 h-9 rounded-xs border border-border flex items-center justify-center hover:bg-surface transition-colors duration-300 cursor-pointer"
                  aria-label="Close event details"
                >
                  <FiX className="text-muted" />
                </button>

                <div className="w-12 h-12 rounded-xs bg-primary/10 flex items-center justify-center mb-5">
                  <FiCalendar className="text-xl text-primary" />
                </div>

                <h3 className="text-xl font-bold text-text mb-4 pr-10">
                  {selectedEvent.title}
                </h3>

                <div className="flex flex-col gap-3 mb-6">
                  <div className="flex items-center gap-3 text-sm text-muted">
                    <FiCalendar className="text-secondary flex-shrink-0" />
                    <span>{format(selectedEvent.start, 'EEEE, MMMM d, yyyy')}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-muted">
                    <FiClock className="text-secondary flex-shrink-0" />
                    <span>
                      {format(selectedEvent.start, 'h:mm a')} — {format(selectedEvent.end, 'h:mm a')}
                    </span>
                  </div>
                  {selectedEvent.location && (
                    <div className="flex items-center gap-3 text-sm text-muted">
                      <FiMapPin className="text-secondary flex-shrink-0" />
                      <span>{selectedEvent.location}</span>
                    </div>
                  )}
                </div>

                {selectedEvent.description && (
                  <p className="text-muted text-sm leading-relaxed border-t border-border pt-4">
                    {selectedEvent.description}
                  </p>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </Section>
  );
}
