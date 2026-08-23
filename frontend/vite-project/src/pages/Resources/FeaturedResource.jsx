import { motion } from 'framer-motion';
import { FiDownload, FiBookOpen, FiGlobe, FiFileText, FiCalendar } from 'react-icons/fi';
import Container from '../../components/Container';
import Section from '../../components/Section';
import Button from '../../components/Button';
import { useFeaturedResource } from '../../hooks/useResourcesSections';
import { useResourceDownload } from '../../hooks/usePublicData';
import { useTranslation } from '../../i18n/LanguageContext';

export default function FeaturedResource() {
  const { t } = useTranslation();
  const incrementDownload = useResourceDownload();
  const featuredResource = useFeaturedResource();
  if (!featuredResource) return null;
  return (
    <Section id="featured" className="bg-surface">
      <Container>
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-20 items-center">
          <motion.div
            className="relative overflow-hidden rounded-xs shadow-lg group order-2 lg:order-1"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <img
              src={featuredResource.image}
              alt={featuredResource.imageAlt}
              className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-700"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            <div className="absolute top-4 left-4 bg-secondary text-white text-xs font-semibold px-3 py-1.5 rounded-xs">
              {featuredResource.category}
            </div>
            <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-sm text-white text-xs font-medium px-3 py-1.5 rounded-xs flex items-center gap-1.5">
              <FiDownload className="w-3.5 h-3.5" />
              {t('pages.resources.downloadsCount', { count: featuredResource.downloads.toLocaleString() })}
            </div>
          </motion.div>

          <motion.div
            className="flex flex-col gap-6 order-1 lg:order-2"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div>
              <span className="text-xs font-semibold tracking-[0.2em] uppercase text-secondary">
                {t('pages.resources.featuredResource')}
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-text mt-4 leading-tight">
                {featuredResource.title}
              </h2>
            </div>

            <p className="text-muted text-base leading-[1.8]">
              {featuredResource.description}
            </p>

            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <div className="flex items-center gap-3 bg-white rounded-xs p-3 sm:p-4 border border-border min-w-0">
                <FiGlobe className="w-5 h-5 text-primary flex-shrink-0" />
                <div className="min-w-0">
                  <p className="text-xs text-muted truncate">{t('pages.resources.language')}</p>
                  <p className="text-sm font-semibold text-text truncate">{featuredResource.language}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-white rounded-xs p-3 sm:p-4 border border-border min-w-0">
                <FiFileText className="w-5 h-5 text-primary flex-shrink-0" />
                <div className="min-w-0">
                  <p className="text-xs text-muted truncate">{t('pages.resources.pages')}</p>
                  <p className="text-sm font-semibold text-text truncate">{featuredResource.pages}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-white rounded-xs p-3 sm:p-4 border border-border min-w-0">
                <FiBookOpen className="w-5 h-5 text-primary flex-shrink-0" />
                <div className="min-w-0">
                  <p className="text-xs text-muted truncate">{t('pages.resources.author')}</p>
                  <p className="text-sm font-semibold text-text truncate">{featuredResource.author}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-white rounded-xs p-3 sm:p-4 border border-border min-w-0">
                <FiCalendar className="w-5 h-5 text-primary flex-shrink-0" />
                <div className="min-w-0">
                  <p className="text-xs text-muted truncate">{t('pages.resources.updated')}</p>
                  <p className="text-sm font-semibold text-text truncate">
                    {new Date(featuredResource.updatedDate).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-start gap-3 sm:gap-4 mt-2">
              {featuredResource.fileUrl && (
                <Button
                  href={featuredResource.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="primary"
                  size="md"
                  className="w-full sm:w-auto justify-center"
                  onClick={() => incrementDownload.mutate(featuredResource.id)}
                >
                  <FiDownload className="text-lg" />
                  {t('pages.resources.downloadPdf')}
                </Button>
              )}
            </div>
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}
