import { useLanguage } from '@/i18n/LanguageContext';
import { useEffect, useState } from 'react';

interface DonationProgressProps {
  current: number;
  total: number;
  className?: string;
}

const DonationProgress = ({ current, total, className = '' }: DonationProgressProps) => {
  const { t } = useLanguage();
  const [animated, setAnimated] = useState(0);
  const percentage = Math.round((current / total) * 100);

  useEffect(() => {
    const timer = setTimeout(() => setAnimated(percentage), 300);
    return () => clearTimeout(timer);
  }, [percentage]);

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">{t('progress.title')}</h3>
        <span className="text-sm font-medium text-accent">{animated}% {t('progress.completed')}</span>
      </div>

      <div className="relative h-6 w-full overflow-hidden rounded-full bg-secondary">
        <div
          className="h-full rounded-full transition-all duration-1000 ease-out"
          style={{
            width: `${animated}%`,
            background: 'linear-gradient(90deg, hsl(157, 50%, 24%), hsl(157, 50%, 34%))',
          }}
        />
      </div>

      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>{current} {t('progress.of')} {total} {t('progress.sqft')}</span>
        <span>{t('progress.target')}</span>
      </div>
    </div>
  );
};

export default DonationProgress;
