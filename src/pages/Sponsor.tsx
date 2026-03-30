import { useLanguage } from '@/i18n/LanguageContext';
import DonationProgress from '@/components/DonationProgress';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Banknote, Copy, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';

const Sponsor = () => {
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);

  const currentSqft = 320;
  const totalSqft = 1320;
  const accountNumber = '7770000012345';

  const copyAccount = () => {
    navigator.clipboard.writeText(accountNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const steps = [
    t('sponsor.step1'),
    t('sponsor.step2'),
    t('sponsor.step3'),
    t('sponsor.step4'),
  ];

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground">{t('sponsor.title')}</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            {t('sponsor.subtitle')}
          </p>
        </div>

        {/* Progress */}
        <Card className="border-0 shadow-lg">
          <CardContent className="p-8">
            <DonationProgress current={currentSqft} total={totalSqft} />
          </CardContent>
        </Card>

        {/* Price Card */}
        <Card className="border-0 shadow-lg bg-primary text-primary-foreground">
          <CardContent className="p-10 text-center space-y-2">
            <Banknote className="w-12 h-12 mx-auto opacity-80 mb-4" />
            <div className="text-4xl font-bold">{t('sponsor.price')}</div>
            <div className="text-lg opacity-80">{t('sponsor.per')}</div>
          </CardContent>
        </Card>

        {/* Bank Details */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="text-xl">{t('sponsor.bank.title')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-secondary/50 rounded-lg p-6 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground text-sm">{t('sponsor.bank.name')}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">{t('sponsor.bank.account')}</span>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-semibold text-foreground">{accountNumber}</span>
                  <button
                    onClick={copyAccount}
                    className="p-1.5 rounded hover:bg-secondary transition-colors"
                    aria-label="Copy account number"
                  >
                    {copied ? <CheckCircle2 className="w-4 h-4 text-primary" /> : <Copy className="w-4 h-4 text-muted-foreground" />}
                  </button>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">{t('sponsor.bank.holder')}</span>
                <span className="font-semibold text-foreground">{t('sponsor.bank.holder.value')}</span>
              </div>
            </div>
            <p className="text-sm text-accent font-medium">{t('sponsor.bank.note')}</p>
          </CardContent>
        </Card>

        {/* How to Sponsor */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="text-xl">{t('sponsor.howto')}</CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="space-y-4">
              {steps.map((step, i) => (
                <li key={i} className="flex items-start gap-4">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary font-semibold flex items-center justify-center text-sm">
                    {i + 1}
                  </span>
                  <span className="text-foreground pt-1">{step}</span>
                </li>
              ))}
            </ol>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Sponsor;
