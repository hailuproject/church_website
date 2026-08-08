import { motion } from "framer-motion";
import { FiPlay, FiClock, FiUser, FiCalendar } from "react-icons/fi";
import { featuredTeaching } from "../../../../data/sermonsData";
import Button from "../../../../components/Button";

export default function FeaturedTeaching() {
  const sermon = featuredTeaching;
  if (!sermon) return null;
  return (
    <section className="py-20 md:py-28 bg-white" aria-label="Featured teaching">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="grid lg:grid-cols-2 gap-0 bg-surface rounded-xs border border-border overflow-hidden shadow-lg"
        >
          <div className="p-8 md:p-12 flex flex-col justify-center">
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-secondary mb-4">
              Featured Teaching
            </span>

            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-text mb-4">
              {sermon.title}
            </h2>

            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted mb-5">
              <span className="flex items-center gap-2">
                <FiUser className="shrink-0" />
                {sermon.priest}
              </span>
              <span className="flex items-center gap-2">
                <FiCalendar className="shrink-0" />
                {sermon.date}
              </span>
              {sermon.bibleVerse && (
                <span className="inline-flex items-center text-xs font-medium text-secondary bg-secondary/5 px-3 py-1 rounded-xs">
                  {sermon.bibleVerse}
                </span>
              )}
            </div>

            <p className="text-muted leading-relaxed mb-8 text-sm">
              {sermon.description}
            </p>

            <div>
              <Button variant="primary">
                <FiPlay className="text-lg" />
                Watch Now
              </Button>
            </div>
          </div>
          <div className="relative aspect-video lg:aspect-auto overflow-hidden group">
            <img
              src={sermon.thumbnail}
              alt={sermon.title}
              className="w-full h-full object-cover lg:absolute lg:inset-0 group-hover:scale-105 transition-transform duration-700"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="w-16 h-16 bg-white/90 backdrop-blur-sm rounded-xs flex items-center justify-center shadow-lg"
                aria-label={`Play featured teaching: ${sermon.title}`}
              >
                <FiPlay className="text-2xl text-primary ml-0.5" />
              </motion.button>
            </div>
            <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-black/60 backdrop-blur-sm text-white text-sm px-3 py-1.5 rounded-xs">
              <FiClock className="text-sm" />
              {sermon.duration}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
