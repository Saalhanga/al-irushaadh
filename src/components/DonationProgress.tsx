import { useLanguage } from '@/i18n/LanguageContext';
import { useEffect, useState } from 'react';

interface DonationProgressProps {
  currentAmount: number;
  totalAmount: number;
  className?: string;
}

const formatMVR = (amount: number) => {
  return `MVR ${amount.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
};

const DonationProgress = ({ currentAmount, totalAmount, className = '' }: DonationProgressProps) => {
  const { t } = useLanguage();
  const [animated, setAnimated] = useState(0);
  const rawPercentage = totalAmount > 0 ? (currentAmount / totalAmount) * 100 : 0;
  const displayPercentage = Math.round(rawPercentage);
  const barPercentage = Math.min(rawPercentage, 100);

  useEffect(() => {
    const timer = setTimeout(() => setAnimated(barPercentage), 300);
    return () => clearTimeout(timer);
  }, [barPercentage]);

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">{t('progress.title')}</h3>
        <span className="text-sm font-medium text-accent">{displayPercentage}% {t('progress.completed')}</span>
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
        <span>{formatMVR(currentAmount)} {t('progress.goal')}</span>
        {currentAmount > totalAmount && (
          <span className="text-accent font-medium">{formatMVR(currentAmount - totalAmount)} {t('progress.extra')}</span>
        )}
        {currentAmount <= totalAmount && (
          <span>{t('progress.target')}</span>
        )}
      </div>
    </div>
  );
};

export default DonationProgress;
