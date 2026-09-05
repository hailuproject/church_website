import { memo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import {
  FiHeadphones,
  FiDownload,
  FiUser,
  FiPlay,
  FiPause,
} from 'react-icons/fi';
import { useTranslation } from '../../../../i18n/LanguageContext';

const AudioCard = memo(function AudioCard({ audio, delay = 0 }) {
  const { t } = useTranslation();
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const togglePlayback = () => {
    const el = audioRef.current;
    if (!el) return;
    if (el.paused) {
      el.play();
    } else {
      el.pause();
    }
  };

  const handleTimeUpdate = () => {
    const el = audioRef.current;
    if (el && el.duration) setProgress((el.currentTime / el.duration) * 100);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      className="group bg-white rounded-xs border border-border p-5 hover:shadow-md hover:shadow-black/5 transition-all duration-500"
    >
      <audio
        ref={audioRef}
        src={audio.audioUrl}
        preload="none"
        className="hidden"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => setIsPlaying(false)}
        onTimeUpdate={handleTimeUpdate}
        aria-label={t('pages.sermons.listenTo', { title: audio.title })}
      />

      <div className="flex items-start gap-4">
        <button
          type="button"
          onClick={togglePlayback}
          className="shrink-0 w-11 h-11 bg-primary/10 rounded-xs flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300"
          aria-label={isPlaying ? t('pages.sermons.pauseAudio', { title: audio.title }) : t('pages.sermons.playAudio', { title: audio.title })}
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
                <div
                  className="h-full bg-primary rounded-full transition-[width] duration-300"
                  style={{ width: `${progress}%` }}
                  role="progressbar"
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={Math.round(progress)}
                  aria-label={t('pages.sermons.listenTo', { title: audio.title })}
                />
              </div>
            </motion.div>
          )}

          <div className="flex items-center gap-3 mt-3 pt-3 border-t border-border">
            <a
              href={audio.audioUrl}
              download
              className="flex items-center gap-1.5 text-xs font-medium text-muted hover:text-text transition-colors"
              aria-label={t('pages.resources.downloadItem', { title: audio.title })}
            >
              <FiDownload className="text-xs" />
              {t('pages.resources.download')}
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
});

export default AudioCard;