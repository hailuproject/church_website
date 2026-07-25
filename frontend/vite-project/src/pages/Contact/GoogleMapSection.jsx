import { motion } from 'framer-motion';
import { FiMapPin, FiPhone, FiGlobe, FiExternalLink } from 'react-icons/fi';
import Container from '../../components/Container';
import Section from '../../components/Section';
import Button from '../../components/Button';
import { mapData } from '../../data/contactData';

export default function GoogleMapSection() {
  return (
    <Section id="location" className="bg-surface">
      <Container>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <motion.div
            className="relative overflow-hidden rounded-xs shadow-lg"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <iframe
              src={mapData.embedUrl}
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Church location on Google Maps"
              className="w-full rounded-xs"
            />
          </motion.div>

          <motion.div
            className="flex flex-col gap-6"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div>
              <span className="text-xs font-semibold tracking-[0.2em] uppercase text-secondary">
                Find Us
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-text mt-4 leading-tight">
                Church Location
              </h2>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex items-start gap-4 bg-white rounded-xs p-5 border border-border">
                <FiMapPin className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-sm font-bold text-text">Full Address</h4>
                  <p className="text-sm text-muted mt-1">{mapData.address}</p>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-white rounded-xs p-5 border border-border">
                <FiPhone className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-sm font-bold text-text">Phone</h4>
                  <p className="text-sm text-muted mt-1">{mapData.phone}</p>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-white rounded-xs p-5 border border-border">
                <FiGlobe className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-sm font-bold text-text">Website</h4>
                  <p className="text-sm text-muted mt-1">{mapData.website}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xs p-5 border border-border">
              <h4 className="text-sm font-bold text-text uppercase tracking-wider mb-3">
                Directions
              </h4>
              <div className="flex flex-col gap-3">
                <div>
                  <span className="text-xs font-semibold text-secondary">Parking</span>
                  <p className="text-sm text-muted mt-0.5">{mapData.parking}</p>
                </div>
                <div>
                  <span className="text-xs font-semibold text-secondary">Public Transit</span>
                  <p className="text-sm text-muted mt-0.5">{mapData.transit}</p>
                </div>
                <div>
                  <span className="text-xs font-semibold text-secondary">Landmark</span>
                  <p className="text-sm text-muted mt-0.5">{mapData.landmark}</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-start gap-4 mt-2">
              <Button
                href="https://maps.google.com"
                variant="primary"
                size="md"
              >
                <FiExternalLink className="text-lg" />
                Open in Google Maps
              </Button>
              <Button href="tel:+15551234567" variant="outline-dark" size="md">
                <FiPhone className="text-lg" />
                Call Church
              </Button>
            </div>
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}
