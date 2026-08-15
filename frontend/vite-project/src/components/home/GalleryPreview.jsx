import { motion } from 'framer-motion';
import Container from '../Container';
import Section from '../Section';
import SectionHeader from '../SectionHeader';
import Button from '../Button';
import { useGalleryPreview } from '../../hooks/useHomeSections';
import { useTranslation } from '../../i18n/LanguageContext';

export default function GalleryPreview() {
  const { t } = useTranslation();
  const galleryPreview = useGalleryPreview();
  if (!galleryPreview?.length) return null;
  return (
    <Section id="gallery" className="bg-white">
      <Container>
        <SectionHeader
          subtitle={t('nav.gallery')}
          title={t('pages.home.sacredMoments')}
          description={t('pages.home.galleryDescription')}
        />
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {galleryPreview.map((item, i) => (
            <motion.div
              key={item.id}
              className={`group relative overflow-hidden rounded-xs ${
                i === 0 || i === 3 ? 'row-span-2 h-[300px] md:h-[420px]' : 'h-[200px] md:h-[200px]'
              }`}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ scale: 1.02 }}
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <h4 className="text-sm font-bold text-white">{item.title}</h4>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-12">
          <Button href="/gallery" variant="outline-dark">
            {t('common.viewGallery')}
          </Button>
        </div>
      </Container>
    </Section>
  );
}
