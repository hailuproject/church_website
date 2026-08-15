import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiEye } from 'react-icons/fi';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import Container from '../../components/Container';
import Section from '../../components/Section';
import { galleryFilterTabs } from '../../data/galleryData';
import { useMasonryImages } from '../../hooks/useGallerySections';
import { useLanguage } from '../../i18n/LanguageContext';

export default function MasonryGallery() {
  const { t, language } = useLanguage();
  const galleryImages = useMasonryImages();
  const [activeFilter, setActiveFilter] = useState('All');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  if (!galleryImages.length) return null;

  const filteredImages =
    activeFilter === 'All'
      ? galleryImages
      : galleryImages.filter((img) => img.category === activeFilter);

  const slides = filteredImages.map((img) => ({
    src: img.src,
    alt: img.alt,
  }));

  const openLightbox = (index) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  return (
    <Section id="photos" className="bg-white">
      <Container>
        <motion.div
          className="flex flex-col gap-4 max-w-3xl text-center items-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-secondary">
            {t('pages.gallery.visualJourney')}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-text leading-tight">
            {t('pages.gallery.photoGallery')}
          </h2>
          <p className="text-base sm:text-lg leading-relaxed max-w-2xl text-muted">
            {t('pages.gallery.photoDescription')}
          </p>
        </motion.div>

        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {galleryFilterTabs.map((filter) => (
            <motion.button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-5 py-2 rounded-xs text-sm font-medium transition-all duration-300 cursor-pointer ${
                activeFilter === filter.id
                  ? 'bg-primary text-white shadow-md'
                  : 'bg-surface text-muted border border-border hover:border-primary/30 hover:text-primary'
              }`}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              {language === 'am' ? filter.am : filter.en}
            </motion.button>
          ))}
        </div>

        <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          {filteredImages.map((image, i) => (
            <motion.div
              key={image.id}
              className="break-inside-avoid group relative overflow-hidden rounded-xs cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{
                duration: 0.5,
                delay: i * 0.04,
                ease: [0.22, 1, 0.36, 1],
              }}
              onClick={() => openLightbox(i)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  openLightbox(i);
                }
              }}
              tabIndex={0}
              role="button"
              aria-label={t('pages.gallery.viewImage', { alt: image.alt })}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full object-cover rounded-xs group-hover:scale-110 transition-transform duration-700"
                loading="lazy"
                style={{ height: image.height }}
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-500 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform group-hover:scale-100 scale-75">
                  <div className="w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg">
                    <FiEye className="w-5 h-5 text-primary" />
                  </div>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <p className="text-white text-xs font-medium">{image.alt}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <Lightbox
          open={lightboxOpen}
          close={() => setLightboxOpen(false)}
          index={lightboxIndex}
          slides={slides}
          controller={{ closeOnBackdropClick: true }}
        />
      </Container>
    </Section>
  );
}
