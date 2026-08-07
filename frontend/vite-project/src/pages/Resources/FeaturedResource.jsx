import { motion } from 'framer-motion';
import { FiDownload, FiBookOpen, FiGlobe, FiFileText, FiCalendar } from 'react-icons/fi';
import Container from '../../components/Container';
import Section from '../../components/Section';
import Button from '../../components/Button';
import { useFeaturedResource } from '../../hooks/useResourcesSections';

export default function FeaturedResource() {
  const featuredResource = useFeaturedResource();
  if (!featuredResource) return null;
  return (
    <Section id="featured" className="bg-surface">
      <Container>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
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
              {featuredResource.downloads.toLocaleString()} downloads
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
                Featured Resource
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-text mt-4 leading-tight">
                {featuredResource.title}
              </h2>
            </div>

            <p className="text-muted text-base leading-[1.8]">
              {featuredResource.description}
            </p>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3 bg-white rounded-xs p-4 border border-border">
                <FiGlobe className="w-5 h-5 text-primary flex-shrink-0" />
                <div>
                  <p className="text-xs text-muted">Language</p>
                  <p className="text-sm font-semibold text-text">{featuredResource.language}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-white rounded-xs p-4 border border-border">
                <FiFileText className="w-5 h-5 text-primary flex-shrink-0" />
                <div>
                  <p className="text-xs text-muted">Pages</p>
                  <p className="text-sm font-semibold text-text">{featuredResource.pages}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-white rounded-xs p-4 border border-border">
                <FiBookOpen className="w-5 h-5 text-primary flex-shrink-0" />
                <div>
                  <p className="text-xs text-muted">Author</p>
                  <p className="text-sm font-semibold text-text">{featuredResource.author}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-white rounded-xs p-4 border border-border">
                <FiCalendar className="w-5 h-5 text-primary flex-shrink-0" />
                <div>
                  <p className="text-xs text-muted">Updated</p>
                  <p className="text-sm font-semibold text-text">
                    {new Date(featuredResource.updatedDate).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-start gap-4 mt-2">
              <Button href="#" variant="primary" size="md">
                <FiBookOpen className="text-lg" />
                Read Online
              </Button>
              <Button href="#" variant="outline-dark" size="md">
                <FiDownload className="text-lg" />
                Download PDF
              </Button>
            </div>
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}
