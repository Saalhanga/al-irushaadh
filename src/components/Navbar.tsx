import { Link, useLocation } from 'react-router-dom';
import logo from '@/assets/logo.jpg';
import { useLanguage } from '@/i18n/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const { t } = useLanguage();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const links = [
    { to: '/', label: t('nav.home') },
    { to: '/sponsor', label: t('nav.sponsor') },
    { to: '/project', label: t('nav.project') },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
<img src={logo} alt="Al Irushaadh Logo" className="h-10 w-auto object-contain" />
            <span className="font-semibold text-foreground text-lg hidden sm:block">Al Irushaadh</span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`text-sm transition-colors duration-200 ${
                  location.pathname === link.to
                    ? 'text-primary font-medium'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3">
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
                  location.pathname === link.to
                    ? 'bg-primary/10 text-primary font-medium'
                    : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
