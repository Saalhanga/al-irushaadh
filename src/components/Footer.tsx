import { useLanguage } from '@/i18n/LanguageContext';
import { Facebook, Instagram, Youtube, Send } from 'lucide-react';

const TikTokIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.75a8.18 8.18 0 0 0 4.76 1.52V6.84a4.83 4.83 0 0 1-1-.15z" />
  </svg>
);

const XIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const socialLinks = [
  { href: 'https://web.facebook.com/uis.org', icon: Facebook, label: 'Facebook' },
  { href: 'https://www.instagram.com/uis_org', icon: Instagram, label: 'Instagram' },
  { href: 'https://x.com/uis_org', icon: XIcon, label: 'X', custom: true },
  { href: 'https://www.tiktok.com/@uis.org', icon: TikTokIcon, label: 'TikTok', custom: true },
  { href: 'https://t.me/uismv', icon: Send, label: 'Telegram' },
  { href: 'https://www.youtube.com/@UISMedia', icon: Youtube, label: 'YouTube' },
];

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-primary text-primary-foreground py-12 mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <p className="text-lg opacity-90">{t('footer.dua')}</p>
        <div className="flex justify-center gap-4">
          {socialLinks.map(({ href, icon: Icon, label, custom }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="opacity-70 hover:opacity-100 transition-opacity"
            >
              {custom ? <Icon size={20} /> : <Icon size={20} />}
            </a>
          ))}
        </div>
        <p className="text-sm opacity-70">{t('footer.rights')}</p>
      </div>
    </footer>
  );
};

export default Footer;
