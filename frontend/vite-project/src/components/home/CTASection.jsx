import { useState } from 'react';
import { motion } from 'framer-motion';
import Container from '../Container';
import AnimatedSection from '../AnimatedSection';
import Button from '../Button';

export default function CTASection() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (!email.trim()) {
      setError('Please enter your email address.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    setSubscribed(true);
    setEmail('');
  };

  return (
    <section className="relative py-24 md:py-32 overflow-hidden" aria-label="Call to action">
      <img
        src="https://images.unsplash.com/photo-1597466599360-3b9775841aec?w=1920&h=800&fit=crop"
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />

      <Container className="relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <AnimatedSection>
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-secondary mb-6 block">
              Join Us
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Join Our Church Family
            </h2>
            <p className="text-lg text-gray-300 mb-10 leading-relaxed max-w-2xl mx-auto">
              Whether you&apos;re seeking spiritual growth, worship, or fellowship, we welcome
              you with open hearts.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <Button href="/contact" variant="primary" size="lg">
                Plan Your Visit
              </Button>
              <Button href="/contact" variant="outline" size="lg">
                Contact Us
              </Button>
            </div>

            {/* Newsletter */}
            <div className="border-t border-white/10 pt-12">
              <span className="text-xs font-semibold tracking-[0.2em] uppercase text-secondary mb-4 block">
                Newsletter
              </span>
              <h3 className="text-2xl font-bold text-white mb-3">Stay Connected</h3>
              <p className="text-gray-300 mb-6 text-sm">
                Receive announcements, feast day reminders, and upcoming events.
              </p>

              {subscribed ? (
                <motion.div
                  className="bg-green-500/10 border border-green-500/20 rounded-xs px-6 py-4 text-green-400 text-sm"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  Thank you for subscribing! God bless you.
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                  <div className="flex-1 relative">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => { setEmail(e.target.value); setError(''); }}
                      placeholder="Enter your email"
                      className={`w-full px-5 py-3.5 rounded-xs bg-white/10 border ${
                        error ? 'border-red-500/50' : 'border-white/20'
                      } text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary/50 transition-all duration-200`}
                      aria-label="Email address for newsletter"
                    />
                    {error && <p className="text-red-400 text-xs mt-1.5 text-left">{error}</p>}
                  </div>
                  <motion.button
                    type="submit"
                    className="px-7 py-3.5 bg-secondary hover:bg-secondary-dark text-stone-900 font-medium rounded-xs text-sm transition-colors duration-300 shadow-sm hover:shadow-md whitespace-nowrap cursor-pointer"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    Subscribe
                  </motion.button>
                </form>
              )}
            </div>
          </AnimatedSection>
        </div>
      </Container>
    </section>
  );
}
