import { useState } from 'react';
import { motion } from 'framer-motion';
import Container from '../../components/Container';
import AnimatedSection from '../../components/AnimatedSection';

export default function NewsletterSection() {
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
    <section className="relative py-24 md:py-32 overflow-hidden" aria-label="Newsletter">
      <div className="absolute inset-0 bg-linear-to-br from-stone-900 via-primary-dark to-stone-900" />
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <Container className="relative z-10">
        <AnimatedSection>
          <div className="max-w-xl mx-auto text-center">
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-secondary mb-4 block">
              Newsletter
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Stay Connected
            </h2>
            <p className="text-gray-300 mb-8 leading-relaxed">
              Receive church announcements, feast day reminders, and upcoming events
              delivered to your inbox.
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
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1 relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setError('');
                    }}
                    placeholder="Enter your email address"
                    className={`w-full px-5 py-3.5 rounded-xs bg-white/10 border ${
                      error ? 'border-red-500/50' : 'border-white/20'
                    } text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary/50 transition-all duration-200`}
                    aria-label="Email address for newsletter"
                  />
                  {error && (
                    <p className="text-red-400 text-xs mt-1.5 text-left">{error}</p>
                  )}
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
      </Container>
    </section>
  );
}
