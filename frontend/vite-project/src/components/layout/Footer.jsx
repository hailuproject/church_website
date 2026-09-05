import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiMapPin, FiPhone, FiMail, FiArrowRight } from 'react-icons/fi';
import { FiFacebook, FiYoutube, FiSend, FiInstagram, FiTwitter } from 'react-icons/fi';
import { footerQuickLinks, footerServices } from '../../data/navigation';
import { useChurch } from '../../hooks/useHomeSections';
import { publicService } from '../../services/publicService';
import { useTranslation } from '../../i18n/LanguageContext';

const socialIcons = {
  facebook: FiFacebook,
  twitter: FiTwitter,
  youtube: FiYoutube,
  telegram: FiSend,
  instagram: FiInstagram,
  tiktok: null,
};

const socialNames = {
  facebook: 'Facebook',
  twitter: 'Twitter',
  youtube: 'YouTube',
  telegram: 'Telegram',
  instagram: 'Instagram',
};

const quickLinkKeys = {
  Home: 'nav.home',
  About: 'nav.about',
  Visit: 'nav.visit',
  Events: 'nav.events',
  Sermons: 'nav.sermons',
  Resources: 'nav.resources',
  Gallery: 'nav.gallery',
  Contact: 'nav.contact',
  Donate: 'nav.donate',
};

const serviceKeys = {
  'Sunday Liturgy': 'footer.sundayLiturgy',
  'Prayer Requests': 'footer.prayerRequests',
  'Bible Study': 'footer.bibleStudy',
};

export default function Footer() {
  const { t } = useTranslation();
  const church = useChurch();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [subscribing, setSubscribing] = useState(false);
  const [error, setError] = useState('');

  const contactItems = [
    { icon: FiMapPin, label: t('footer.address'), value: church.address },
    { icon: FiPhone, label: t('footer.phone'), value: church.phone },
    { icon: FiMail, label: t('footer.email'), value: church.email },
  ].filter((item) => item.value);

  const socialLinks = Object.entries(church.socialLinks || {})
    .filter(([, href]) => href)
    .map(([key, href]) => ({ key, icon: socialIcons[key], href }))
    .filter((link) => link.icon);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    setError('');
    if (!email.trim()) {
      setError(t('footer.emailError'));
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError(t('footer.emailInvalid'));
      return;
    }
    setSubscribing(true);
    try {
      await publicService.submitContact({
        name: 'Newsletter Subscriber',
        email,
        category: 'General',
        subject: 'Newsletter subscription request',
        message: `Please add ${email} to the church newsletter mailing list.`,
      });
      setSubscribed(true);
      setEmail('');
    } catch (err) {
      setError(err?.message || t('footer.subscribeError'));
    } finally {
      setSubscribing(false);
    }
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
                {church.logo ? (
                  <img
                    src={church.logo}
                    alt={`${church.name} logo`}
                    className="w-9 h-9 object-contain"
                  />
                ) : (
                  <div className="w-9 h-9 rounded-xs bg-primary flex items-center justify-center shadow-md">
                    <span className="text-2xl leading-none font-bold">☦</span>
                  </div>
                )}
                <div className="flex flex-col leading-none">
                  <span className="text-sm font-bold text-white tracking-tight">
                    {church.name}
                  </span>
                  <span className="text-[11px] font-medium text-secondary tracking-wide">
                    {church.tagline}
                  </span>
                </div>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-xs">
              {church.footerText || t('footer.aboutText')}
            </p>

            {/* Social */}
            <div className="flex items-center gap-3">
              {socialLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <motion.a
                    key={link.key}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 flex items-center justify-center rounded-xs bg-white/5 hover:bg-primary/20 text-gray-400 hover:text-primary transition-all duration-300"
                    aria-label={`${t('footer.followUs')} ${socialNames[link.key] || link.key}`}
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
              {t('footer.quickLinks')}
            </h3>
            <ul className="flex flex-col gap-3">
              {footerQuickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-gray-400 hover:text-secondary transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-0 group-hover:w-2 h-px bg-secondary transition-all duration-200" />
                    {t(quickLinkKeys[link.label] || link.label)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 - Services */}
          <div className="lg:col-span-3">
            <h3 className="text-sm font-bold text-white tracking-wide uppercase mb-5">
              {t('footer.services')}
            </h3>
            <ul className="flex flex-col gap-3">
              {footerServices.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-sm text-gray-400 hover:text-secondary transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-0 group-hover:w-2 h-px bg-secondary transition-all duration-200" />
                    {t(serviceKeys[link.label] || link.label)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 - Contact */}
          <div className="lg:col-span-3">
            <h3 className="text-sm font-bold text-white tracking-wide uppercase mb-5">
              {t('footer.contact')}
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
            {church.address && (
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(church.address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-secondary hover:text-secondary-light transition-colors duration-200"
              >
                {t('common.viewOnMap')}
                <FiArrowRight className="text-sm" />
              </a>
            )}
          </div>
        </div>

        {/* Newsletter */}
        <div className="mt-16 pt-12 border-t border-white/10">
          <div className="max-w-xl mx-auto text-center">
            <h3 className="text-xl font-bold text-white mb-2">{t('common.stayConnected')}</h3>
            <p className="text-sm text-gray-400 mb-6">
              {t('common.newsletterDescription')}
            </p>

            {subscribed ? (
              <motion.div
                className="bg-green-500/10 border border-green-500/20 rounded-xs px-6 py-4 text-green-400 text-sm"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {t('common.thankYouSubscribe')}
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
                    placeholder={t('footer.emailPlaceholder')}
                    className={`w-full px-5 py-3.5 rounded-xs bg-white/5 border ${
                      error ? 'border-red-500/50' : 'border-white/10'
                    } text-white placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary/50 transition-all duration-200`}
                    aria-label={t('footer.emailPlaceholder')}
                  />
                  {error && (
                    <p className="text-red-400 text-xs mt-1.5 text-left">{error}</p>
                  )}
                </div>
                <motion.button
                  type="submit"
                  disabled={subscribing}
                  className="px-7 py-3.5 bg-secondary hover:bg-secondary-dark text-stone-900 font-medium rounded-xs text-sm transition-colors duration-300 shadow-sm hover:shadow-md whitespace-nowrap disabled:opacity-60"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  {subscribing ? t('footer.subscribing') : t('footer.subscribe')}
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
            &copy; {new Date().getFullYear()} {church.name} {church.tagline ? `(${church.tagline})` : 'Church'}. {t('footer.allRightsReserved')}.
          </p>
          <div className="flex items-center gap-1 text-sm text-gray-500">
            {t('footer.builtWith')}
          </div>
          <div className="flex items-center gap-5">
            <span className="text-gray-600" aria-hidden="true">|</span>
            <Link to="/admin/login" className="text-sm text-gray-500 hover:text-secondary transition-colors duration-200">
              {t('nav.adminLogin')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
