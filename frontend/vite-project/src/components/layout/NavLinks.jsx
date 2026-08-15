import { NavLink } from 'react-router-dom';
import { navigationLinks } from '../../data/navigation';
import { useTranslation } from '../../i18n/LanguageContext';

const linkKeys = {
  Home: 'nav.home',
  About: 'nav.about',
  Sermons: 'nav.sermons',
  Events: 'nav.events',
  Resources: 'nav.resources',
  Gallery: 'nav.gallery',
  Contact: 'nav.contact',
  Donate: 'nav.donate',
};

export default function NavLinks({ vertical = false, onNavigate }) {
  const { t } = useTranslation();
  const base = vertical
    ? 'flex flex-col gap-1'
    : 'flex items-center gap-1';

  return (
    <nav className={base} aria-label={vertical ? t('nav.mobileNav') : t('nav.mainNav')}>
      {navigationLinks.map((link) => (
        <NavLink
          key={link.href}
          to={link.href}
          onClick={onNavigate}
          className={({ isActive }) =>
            `relative px-3 py-2 text-sm font-medium rounded-xs transition-colors duration-200 ${
              isActive
                ? 'text-primary'
                : 'text-text hover:text-primary hover:bg-primary/5'
            }`
          }
        >
          {({ isActive }) => (
            <>
              {t(linkKeys[link.label] || link.label)}
              {isActive && (
                <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-secondary rounded-full" />
              )}
            </>
          )}
        </NavLink>
      ))}
    </nav>
  );
}
