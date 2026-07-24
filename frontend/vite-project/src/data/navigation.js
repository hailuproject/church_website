import {
  FiHome,
  FiBookOpen,
  FiMic,
  FiDroplet,
  FiCalendar,
  FiBook,
  FiImage,
  FiPhone,
  FiHeart,
  FiFacebook,
  FiYoutube,
  FiSend,
  FiInstagram,
} from 'react-icons/fi';

export const navigationLinks = [
  { label: 'Home', href: '/', icon: FiHome },
  { label: 'About', href: '/about', icon: FiBookOpen },
  { label: 'Sermons', href: '/sermons', icon: FiMic },
  { label: 'Sacraments', href: '/sacraments', icon: FiDroplet },
  { label: 'Events', href: '/events', icon: FiCalendar },
  { label: 'Resources', href: '/resources', icon: FiBook },
  { label: 'Gallery', href: '/gallery', icon: FiImage },
  { label: 'Contact', href: '/contact', icon: FiPhone },
  { label: 'Donate', href: '/donate', icon: FiHeart },
];

export const footerQuickLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Events', href: '/events' },
  { label: 'Sermons', href: '/sermons' },
  { label: 'Resources', href: '/resources' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Contact', href: '/contact' },
  { label: 'Donate', href: '/donate' },
];

export const footerServices = [
  { label: 'Sunday Liturgy', href: '/sacraments' },
  { label: 'Prayer Requests', href: '/contact' },
  { label: 'Confession', href: '/sacraments' },
  { label: 'Baptism', href: '/sacraments' },
  { label: 'Marriage', href: '/sacraments' },
  { label: 'Bible Study', href: '/resources' },
  { label: 'Youth Ministry', href: '/about' },
];

export const socialLinks = [
  { label: 'Facebook', href: 'https://facebook.com', icon: FiFacebook },
  { label: 'YouTube', href: 'https://youtube.com', icon: FiYoutube },
  { label: 'Telegram', href: 'https://telegram.org', icon: FiSend },
  { label: 'Instagram', href: 'https://instagram.com', icon: FiInstagram },
];

export const languages = [
  { code: 'en', label: 'English', native: 'English' },
  { code: 'am', label: 'Amharic', native: '\u12A0\u12CD\u1295\u129B' },
];
