import { useLanguage } from '@/i18n/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-primary text-primary-foreground py-12 mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
        <p className="text-lg opacity-90">{t('footer.dua')}</p>
        <p className="text-sm opacity-70">{t('footer.rights')}</p>
      </div>
    </footer>
  );
};

export default Footer;
