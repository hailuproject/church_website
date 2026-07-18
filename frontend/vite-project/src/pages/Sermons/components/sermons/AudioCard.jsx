import { memo, useState } from 'react';
import { motion } from 'framer-motion';
import {
  FiHeadphones,
  FiDownload,
  FiUser,
  FiPlay,
  FiPause,
} from 'react-icons/fi';

const AudioCard = memo(function AudioCard({ audio, delay = 0 }) {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      className="group bg-white rounded-xs border border-border p-5 hover:shadow-md hover:shadow-black/5 transition-all duration-500"
    >
      <div className="flex items-start gap-4">
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="shrink-0 w-11 h-11 bg-primary/10 rounded-xs flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300"
          aria-label={isPlaying ? `Pause ${audio.title}` : `Play ${audio.title}`}
        >
          {isPlaying ? (
            <FiPause className="text-lg text-primary group-hover:text-white transition-colors" />
          ) : (
            <FiPlay className="text-lg text-primary group-hover:text-white transition-colors ml-0.5" />
          )}
        </button>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 text-xs text-muted mb-1">
            <FiHeadphones className="text-xs shrink-0" />
            <span>{audio.duration}</span>
          </div>
          <h3 className="text-sm font-semibold text-text leading-snug line-clamp-1 group-hover:text-primary transition-colors duration-300">
            {audio.title}
          </h3>
          <div className="flex items-center gap-1.5 text-xs text-muted mt-1">
            <FiUser className="text-xs shrink-0" />
            <span>{audio.priest}</span>
          </div>

          {isPlaying && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mt-3"
            >
              <div className="w-full h-1 bg-border rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-primary rounded-full"
                  animate={{ width: ['0%', '100%'] }}
                  transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                />
              </div>
            </motion.div>
          )}

          <div className="flex items-center gap-3 mt-3 pt-3 border-t border-border">
            <button
              className="flex items-center gap-1.5 text-xs font-medium text-muted hover:text-text transition-colors"
              aria-label={`Download ${audio.title}`}
            >
              <FiDownload className="text-xs" />
              Download
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
});

export default AudioCard;
