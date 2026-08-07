import { motion } from 'framer-motion';
import { FiExternalLink } from 'react-icons/fi';
import {
  FiFacebook,
  FiYoutube,
  FiSend,
  FiInstagram,
  FiTwitter,
} from 'react-icons/fi';

const platformIcons = {
  facebook: FiFacebook,
  twitter: FiTwitter,
  youtube: FiYoutube,
  telegram: FiSend,
  instagram: FiInstagram,
};

const platformColors = {
  facebook: 'from-blue-500 to-blue-600',
  twitter: 'from-sky-400 to-blue-600',
  youtube: 'from-red-500 to-red-600',
  telegram: 'from-blue-400 to-blue-500',
  instagram: 'from-pink-500 to-purple-600',
};

export default function SocialCard({ link, index }) {
  const SocialIcon = platformIcons[link.icon] || FiExternalLink;

  return (
    <motion.div
      className="group relative bg-white rounded-xs overflow-hidden border border-border hover:border-primary/20 transition-all duration-500 hover:shadow-lg"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ y: -4 }}
    >
      <div
        className={`h-2 bg-gradient-to-r ${platformColors[link.icon] || 'from-primary to-primary-dark'}`}
      />

      <div className="p-6 flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xs bg-primary/10 flex items-center justify-center group-hover:bg-primary transition-colors duration-500">
            <SocialIcon className="w-5.5 h-5.5 text-primary group-hover:text-white transition-colors duration-500" />
          </div>
          <h3 className="text-lg font-bold text-text group-hover:text-primary transition-colors duration-300">
            {link.platform}
          </h3>
        </div>

        <p className="text-sm text-muted leading-relaxed">{link.description}</p>

        <a
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-xs font-semibold text-primary hover:text-primary-dark transition-colors duration-300"
        >
          Visit {link.platform}
          <FiExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </motion.div>
  );
}
