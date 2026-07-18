import { useState, useEffect, memo } from "react";
import { motion } from "framer-motion";
import { FiPlay, FiCalendar, FiClock } from "react-icons/fi";
import ReactPlayer from "react-player";
import Button from "../../../../components/Button";
import { liveStream } from "../../../../data/sermonsData";

const LIVE_THUMB =
  "https://images.unsplash.com/photo-1548013146-72479768bada?w=800&h=600&fit=crop";

function CountdownTimer({ targetDate }) {
  const [timeLeft, setTimeLeft] = useState("");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const target = new Date(targetDate).getTime();

    function update() {
      const now = new Date().getTime();
      const diff = target - now;

      if (diff <= 0) {
        setTimeLeft("Service starting soon");
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      );
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      if (days > 0) {
        setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
      } else {
        setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
      }
    }

    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  if (!isClient) return null;

  return (
    <span className=" text-lg font-bold tracking-wider text-text">
      {timeLeft}
    </span>
  );
}

const LiveStreamCard = memo(function LiveStreamCard() {
  const stream = liveStream;
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section
      id="live"
      className="py-20 md:py-28 bg-surface"
      aria-label="Live stream"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="grid lg:grid-cols-2 gap-0 bg-white rounded-xs border border-border overflow-hidden shadow-lg"
        >
          <div className="relative bg-black aspect-video lg:aspect-auto">
            {stream.isLive && isPlaying ? (
              <ReactPlayer
                url={stream.videoUrl}
                width="100%"
                height="100%"
                playing
                controls
                style={{ position: "absolute", top: 0, left: 0 }}
              />
            ) : (
              <div className="w-full h-full min-h-[280px] flex items-center justify-center relative">
                <img
                  src={LIVE_THUMB}
                  alt="Church interior"
                  className="absolute inset-0 w-full h-full object-cover opacity-50"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/40" />
                {!stream.isLive && (
                  <div className="relative z-10 text-center">
                    <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-xs flex items-center justify-center mx-auto mb-3">
                      <FiClock className="text-3xl text-white/70" />
                    </div>
                    <p className="text-white/60 text-sm font-medium">Offline</p>
                  </div>
                )}
                {stream.isLive && !isPlaying && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsPlaying(true)}
                    className="relative z-10 w-16 h-16 bg-white/90 backdrop-blur-sm rounded-xs flex items-center justify-center shadow-xl hover:bg-white transition-colors"
                    aria-label="Watch live stream"
                  >
                    <FiPlay className="text-2xl text-primary ml-0.5" />
                  </motion.button>
                )}
              </div>
            )}
          </div>

          <div className="p-8 md:p-10 flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-5">
              <span className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 text-xs font-bold px-3 py-1.5 rounded-xs uppercase tracking-wider">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600" />
                </span>
                {stream.isLive ? "LIVE" : "Offline"}
              </span>
              {stream.isLive && (
                <span className="text-xs text-muted font-medium">
                  {stream.startTime}
                </span>
              )}
            </div>

            <h2 className="text-2xl md:text-3xl font-bold text-text mb-3">
              {stream.title}
            </h2>
            <p className="text-muted leading-relaxed mb-6 text-sm">
              {stream.description}
            </p>

            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3 text-sm text-text">
                <FiCalendar className="text-secondary shrink-0" />
                <span className="font-medium">{stream.startTime}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-text">
                <FiClock className="text-secondary shrink-0" />
                <div>
                  <span className="font-medium">{stream.nextService}</span>
                  <div className="mt-1">
                    <CountdownTimer targetDate={stream.nextServiceDate} />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              {stream.isLive && (
                <Button onClick={() => setIsPlaying(true)} variant="primary">
                  <FiPlay className="text-lg" />
                  Watch Live
                </Button>
              )}
              <Button href="/schedule" variant="outline-dark">
                <FiCalendar className="text-lg" />
                {stream.scheduleLabel}
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
});

export default LiveStreamCard;
