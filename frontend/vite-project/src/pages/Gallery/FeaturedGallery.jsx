import { motion } from 'framer-motion';
import { FiCalendar, FiMapPin, FiImage, FiVideo } from 'react-icons/fi';
import Container from '../../components/Container';
import Section from '../../components/Section';
import Button from '../../components/Button';
import { featuredGallery } from '../../data/galleryData';

export default function FeaturedGallery() {
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
              src={featuredGallery.image}
              alt={featuredGallery.imageAlt}
              className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-700"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            <div className="absolute top-4 left-4 bg-secondary text-white text-xs font-semibold px-3 py-1.5 rounded-xs">
              {featuredGallery.category}
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
                Featured Album
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-text mt-4 leading-tight">
                {featuredGallery.title}
              </h2>
            </div>

            <p className="text-muted text-base leading-[1.8]">
              {featuredGallery.description}
            </p>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3 bg-white rounded-xs p-4 border border-border">
                <FiCalendar className="w-5 h-5 text-primary flex-shrink-0" />
                <div>
                  <p className="text-xs text-muted">Event Date</p>
                  <p className="text-sm font-semibold text-text">{featuredGallery.eventDate}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-white rounded-xs p-4 border border-border">
                <FiMapPin className="w-5 h-5 text-primary flex-shrink-0" />
                <div>
                  <p className="text-xs text-muted">Location</p>
                  <p className="text-sm font-semibold text-text line-clamp-1">{featuredGallery.location}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-white rounded-xs p-4 border border-border">
                <FiImage className="w-5 h-5 text-primary flex-shrink-0" />
                <div>
                  <p className="text-xs text-muted">Photos</p>
                  <p className="text-sm font-semibold text-text">{featuredGallery.photos}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-white rounded-xs p-4 border border-border">
                <FiVideo className="w-5 h-5 text-primary flex-shrink-0" />
                <div>
                  <p className="text-xs text-muted">Videos</p>
                  <p className="text-sm font-semibold text-text">{featuredGallery.videos}</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-start gap-4 mt-2">
              <Button href="#photos" variant="primary" size="md">
                <FiImage className="text-lg" />
                Open Album
              </Button>
              <Button href="#photos" variant="outline-dark" size="md">
                View Slideshow
              </Button>
            </div>
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}
