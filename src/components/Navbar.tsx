import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '@/i18n/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';
import { useState } from 'react';
import { Menu, X, Search } from 'lucide-react';
import logo from '@/assets/logo.jpg';

const Navbar = () => {
  const { t, dir } = useLanguage();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const links = [
    { to: '/', label: t('nav.home') },
    { to: '/explore', label: t('nav.explore') },
    { to: '/sheikhs', label: t('nav.sheikhs') },
    { to: '/topics', label: t('nav.topics') },
    { to: '/collections', label: t('nav.collections') },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="AL IRUSHAADH Logo" className="h-10 w-auto object-contain" />
            <span className="font-semibold text-foreground text-lg hidden sm:block">AL IRUSHAADH</span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`text-sm transition-colors duration-200 ${
                  isActive(link.to)
                    ? 'text-primary font-medium'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <Link to="/explore" className="hidden sm:flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
              <Search size={16} />
              <span className="sr-only">{t('common.search')}</span>
            </Link>
            <LanguageSwitcher />
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 text-foreground"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="md:hidden pb-4 space-y-2">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className={`block px-3 py-2 rounded-md text-sm transition-colors ${
                  isActive(link.to)
                    ? 'bg-primary/10 text-primary font-medium'
                    : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link to="/explore" onClick={() => setMobileOpen(false)} className="block px-3 py-2 rounded-md text-sm text-muted-foreground hover:text-foreground hover:bg-secondary">
              {t('common.search')}
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
