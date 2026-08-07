import { motion } from 'framer-motion';
import { FiMapPin, FiPhone, FiMail, FiExternalLink } from 'react-icons/fi';
import Container from '../../components/Container';
import Section from '../../components/Section';
import Button from '../../components/Button';
import { useChurch } from '../../hooks/useHomeSections';

const encodeQuery = (value) => encodeURIComponent(value).replace(/%20/g, '+');

export default function GoogleMapSection() {
  const church = useChurch();
  const address = church.address || '';
  const phone = church.phone || '';
  const email = church.email || '';
  const mapsUrl = address
    ? `https://www.google.com/maps/search/?api=1&query=${encodeQuery(address)}`
    : 'https://www.google.com/maps';

  return (
    <Section id="location" className="bg-surface">
      <Container>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <motion.div
            className="relative overflow-hidden rounded-xs shadow-lg bg-white border border-border flex flex-col"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex flex-col items-center justify-center gap-4 min-h-[320px] p-8 text-center bg-surface/50">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <FiMapPin className="w-7 h-7 text-primary" />
              </div>
              <div className="max-w-md">
                <h3 className="text-lg font-bold text-text mb-1">{church.name || 'Our Church'}</h3>
                <p className="text-sm text-muted leading-relaxed">
                  {address || 'Visit us at our church location. Contact the office for directions.'}
                </p>
              </div>
            </div>
            <div className="p-5 border-t border-border flex justify-center">
              <Button href={mapsUrl} target="_blank" rel="noopener noreferrer" variant="outline-dark" size="md">
                <FiExternalLink className="text-lg" />
                Open in Google Maps
              </Button>
            </div>
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
              {address && (
                <div className="flex items-start gap-4 bg-white rounded-xs p-5 border border-border">
                  <FiMapPin className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-sm font-bold text-text">Full Address</h4>
                    <p className="text-sm text-muted mt-1">{address}</p>
                  </div>
                </div>
              )}

              {phone && (
                <div className="flex items-start gap-4 bg-white rounded-xs p-5 border border-border">
                  <FiPhone className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-sm font-bold text-text">Phone</h4>
                    <a href={`tel:${phone.replace(/\s/g, '')}`} className="text-sm text-muted mt-1 block hover:text-primary">
                      {phone}
                    </a>
                  </div>
                </div>
              )}

              {email && (
                <div className="flex items-start gap-4 bg-white rounded-xs p-5 border border-border">
                  <FiMail className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-sm font-bold text-text">Email</h4>
                    <a href={`mailto:${email}`} className="text-sm text-muted mt-1 block hover:text-primary">
                      {email}
                    </a>
                  </div>
                </div>
              )}

              {!address && !phone && !email && (
                <div className="flex items-start gap-4 bg-white rounded-xs p-5 border border-border">
                  <FiMapPin className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-sm font-bold text-text">Location</h4>
                    <p className="text-sm text-muted mt-1">
                      Contact the church office for our address and contact details.
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row items-start gap-4 mt-2">
              <Button href={mapsUrl} target="_blank" rel="noopener noreferrer" variant="primary" size="md">
                <FiExternalLink className="text-lg" />
                Open in Google Maps
              </Button>
              {phone && (
                <Button href={`tel:${phone.replace(/\s/g, '')}`} variant="outline-dark" size="md">
                  <FiPhone className="text-lg" />
                  Call Church
                </Button>
              )}
            </div>
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}
