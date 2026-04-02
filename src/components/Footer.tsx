import { useLanguage } from '@/i18n/LanguageContext';
import { Facebook, Instagram, Youtube, Send } from 'lucide-react';

const TikTokIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.75a8.18 8.18 0 0 0 4.76 1.52V6.84a4.83 4.83 0 0 1-1-.15z" />
  </svg>
);

const ViberIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.8 5.2C17.4 3.8 14.7 2.9 12 2.9s-5.4.9-6.8 2.3C3.8 6.6 3 9.1 3 12c0 2.4.6 4.5 1.8 6.1L3.4 22l4.1-1.3c1.4.8 3 1.2 4.5 1.2 2.9 0 5.4-.9 6.8-2.3 1.4-1.4 2.2-3.9 2.2-6.6 0-2.9-.8-5.4-2.2-7.8zM16.3 15.7c-.3.8-1.5 1.5-2.1 1.6-.6.1-1.1.2-3.5-.7-2.9-1.2-4.8-4.2-4.9-4.4-.1-.2-1.1-1.5-1.1-2.8 0-1.4.7-2 .9-2.3.3-.3.6-.3.8-.3h.6c.2 0 .5 0 .7.5.3.6.9 2.1 1 2.3.1.1.1.3 0 .5-.1.2-.2.3-.3.5-.1.2-.3.3-.4.5-.1.2-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.4 2.4 1.5.3.1.5.1.6-.1.2-.2.7-.8.9-1.1.2-.3.4-.2.7-.1.3.1 1.7.8 2 .9.3.1.5.2.6.3.1.1.1.7-.2 1.3z" />
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
  { href: 'https://invite.viber.com/?g2=AQBdweUQPICtpEgoYccSUekjF67N9gkMytwp7c3EHX5G8BbC40nKVlRHfbSJopeI', icon: ViberIcon, label: 'Viber', custom: true },
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
