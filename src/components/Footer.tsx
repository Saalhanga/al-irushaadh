import { useLanguage } from '@/i18n/LanguageContext';
import { Facebook, Instagram, Youtube, Send } from 'lucide-react';

const socialLinks = [
  { href: 'https://web.facebook.com/alirushaadh', icon: Facebook, label: 'Facebook' },
  { href: 'https://www.instagram.com/alirushaadh', icon: Instagram, label: 'Instagram' },
  { href: 'https://t.me/alirushaadh', icon: Send, label: 'Telegram' },
  { href: 'https://www.youtube.com/@alirushaadh', icon: Youtube, label: 'YouTube' },
];

const Footer = () => {
  const { t, locale } = useLanguage();

  return (
    <footer className="bg-primary text-primary-foreground py-12 mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <p className="text-lg opacity-90 font-medium">AL IRUSHAADH</p>
        <p className="text-sm opacity-70">{t('footer.dua')}</p>
        <div className="flex justify-center gap-4">
          {socialLinks.map(({ href, icon: Icon, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="opacity-70 hover:opacity-100 transition-opacity"
            >
              <Icon size={20} />
            </a>
          ))}
        </div>
        <p className="text-sm opacity-70">{t('footer.rights')}</p>
      </div>
    </footer>
  );
};

export default Footer;
