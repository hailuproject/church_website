import { motion } from 'framer-motion';

export default function ImageTextSection({
  title,
  paragraphs,
  image,
  imageAlt,
  imageLabel,
  reversed = false,
  imageId,
}) {
  const textContent = (
    <div className="flex flex-col justify-center gap-6 max-w-xl">
      {title && (
        <h3 className="text-2xl sm:text-3xl font-bold text-text leading-tight">{title}</h3>
      )}
      {paragraphs.map((p, i) => (
        <motion.p
          key={i}
          className="text-muted text-base leading-[1.8] max-w-[65ch]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          {p}
        </motion.p>
      ))}
    </div>
  );

  const imageContent = (
    <motion.div
      className="relative overflow-hidden rounded-xs shadow-lg group"
      initial={{ opacity: 0, x: reversed ? 30 : -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <img
        src={image}
        alt={imageAlt}
        className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-700"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
      {imageLabel && (
        <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-xs px-4 py-2">
          <span className="text-sm font-semibold text-primary">{imageLabel}</span>
        </div>
      )}
    </motion.div>
  );

  return (
    <div
      id={imageId}
      className={`grid lg:grid-cols-2 gap-12 lg:gap-20 items-center ${reversed ? '' : ''}`}
    >
      {reversed ? (
        <>
          {imageContent}
          {textContent}
        </>
      ) : (
        <>
          {textContent}
          {imageContent}
        </>
      )}
    </div>
  );
}
