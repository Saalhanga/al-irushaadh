import { Globe } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import type { Locale } from '@/i18n/translations';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const languages: { code: Locale; label: string; font?: string }[] = [
  { code: 'en', label: 'English' },
  { code: 'dv', label: '??????', font: "'MV Utheemu', sans-serif" },
  { code: 'ar', label: '???????' },
];

const LanguageSwitcher = () => {
  const { locale, setLocale } = useLanguage();

  return (
    <Select value={locale} onValueChange={(value) => setLocale(value as Locale)}>
      <SelectTrigger className="w-[160px]">
        <Globe className="h-4 w-4 mr-2" />
        <SelectValue placeholder="Language" />
      </SelectTrigger>
      <SelectContent>
        {languages.map((lang) => (
          <SelectItem key={lang.code} value={lang.code}>
            <span style={lang.font ? { fontFamily: lang.font } : undefined}>
              {lang.label}
            </span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default LanguageSwitcher;

