import { NavLink } from 'react-router-dom';
import { navigationLinks } from '../../data/navigation';

export default function NavLinks({ vertical = false, onNavigate }) {
  const base = vertical
    ? 'flex flex-col gap-1'
    : 'flex items-center gap-1';

  return (
    <nav className={base} aria-label={vertical ? 'Mobile navigation' : 'Main navigation'}>
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
              {link.label}
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
