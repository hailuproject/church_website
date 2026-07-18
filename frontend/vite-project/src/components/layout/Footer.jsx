import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMapPin, FiPhone, FiMail, FiClock, FiArrowRight } from 'react-icons/fi';
import Logo from './Logo';
import { footerQuickLinks, footerServices, socialLinks } from '../../data/navigation';

const contactItems = [
  { icon: FiMapPin, label: 'Address', value: '123 Orthodox Way, Faith City, ST 12345' },
  { icon: FiPhone, label: 'Phone', value: '(555) 123-4567' },
  { icon: FiMail, label: 'Email', value: 'info@ethiopianorthodox.org' },
  { icon: FiClock, label: 'Office Hours', value: 'Mon–Fri: 9:00 AM – 5:00 PM' },
];

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState('');

  const handleSubscribe = (e) => {
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
    <footer className="bg-stone-900 text-white" role="contentinfo">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-20 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          {/* Column 1 - About */}
          <div className="lg:col-span-4">
            <div className="mb-5">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xs bg-primary flex items-center justify-center shadow-md">
                  <span className="text-2xl leading-none font-bold">☦</span>
                </div>
                <div className="flex flex-col leading-none">
                  <span className="text-sm font-bold text-white tracking-tight">
                    Ethiopian Orthodox
                  </span>
                  <span className="text-[11px] font-medium text-secondary tracking-wide">
                    Tewahedo Church
                  </span>
                </div>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-xs">
              Serving God and His people through faith, tradition, and love. Join our community
              and experience the beauty of the Ethiopian Orthodox heritage.
            </p>

            {/* Social */}
            <div className="flex items-center gap-3">
              {socialLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 flex items-center justify-center rounded-xs bg-white/5 hover:bg-primary/20 text-gray-400 hover:text-primary transition-all duration-300"
                    aria-label={link.label}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon className="text-lg" />
                  </motion.a>
                );
              })}
            </div>
          </div>

          {/* Column 2 - Quick Links */}
          <div className="lg:col-span-2">
            <h3 className="text-sm font-bold text-white tracking-wide uppercase mb-5">
              Quick Links
            </h3>
            <ul className="flex flex-col gap-3">
              {footerQuickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-secondary transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-0 group-hover:w-2 h-px bg-secondary transition-all duration-200" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 - Services */}
          <div className="lg:col-span-3">
            <h3 className="text-sm font-bold text-white tracking-wide uppercase mb-5">
              Church Services
            </h3>
            <ul className="flex flex-col gap-3">
              {footerServices.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-secondary transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-0 group-hover:w-2 h-px bg-secondary transition-all duration-200" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 - Contact */}
          <div className="lg:col-span-3">
            <h3 className="text-sm font-bold text-white tracking-wide uppercase mb-5">
              Contact
            </h3>
            <div className="flex flex-col gap-4 mb-6">
              {contactItems.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-xs bg-white/5 flex items-center justify-center shrink-0 mt-0.5">
                      <Icon className="text-secondary text-sm" />
                    </div>
                    <div>
                      <p className="text-[11px] font-medium text-gray-500 uppercase tracking-wider">
                        {item.label}
                      </p>
                      <p className="text-sm text-gray-300">{item.value}</p>
                    </div>
                  </div>
                );
              })}
            </div>
            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-secondary hover:text-secondary-light transition-colors duration-200"
            >
              View on Google Maps
              <FiArrowRight className="text-sm" />
            </a>
          </div>
        </div>

        {/* Newsletter */}
        <div className="mt-16 pt-12 border-t border-white/10">
          <div className="max-w-xl mx-auto text-center">
            <h3 className="text-xl font-bold text-white mb-2">Stay Connected</h3>
            <p className="text-sm text-gray-400 mb-6">
              Subscribe to our newsletter for the latest updates, events, and spiritual reflections.
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
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1 relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setError('');
                    }}
                    placeholder="Enter your email address"
                    className={`w-full px-5 py-3.5 rounded-xs bg-white/5 border ${
                      error ? 'border-red-500/50' : 'border-white/10'
                    } text-white placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary/50 transition-all duration-200`}
                    aria-label="Email address for newsletter"
                  />
                  {error && (
                    <p className="text-red-400 text-xs mt-1.5 text-left">{error}</p>
                  )}
                </div>
                <motion.button
                  type="submit"
                  className="px-7 py-3.5 bg-secondary hover:bg-secondary-dark text-stone-900 font-medium rounded-xs text-sm transition-colors duration-300 shadow-sm hover:shadow-md whitespace-nowrap"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Subscribe
                </motion.button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Ethiopian Orthodox Tewahedo Church. All rights reserved.
          </p>
          <div className="flex items-center gap-1 text-sm text-gray-500">
            Built with <span className="text-primary mx-1">&hearts;</span> for the Church
          </div>
          <div className="flex items-center gap-5">
            <a href="/privacy" className="text-sm text-gray-500 hover:text-gray-300 transition-colors duration-200">
              Privacy Policy
            </a>
            <a href="/terms" className="text-sm text-gray-500 hover:text-gray-300 transition-colors duration-200">
              Terms
            </a>
            <a href="/accessibility" className="text-sm text-gray-500 hover:text-gray-300 transition-colors duration-200">
              Accessibility
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
