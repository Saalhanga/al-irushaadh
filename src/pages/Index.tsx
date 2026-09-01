import { Link } from 'react-router-dom';
import { useLanguage } from '@/i18n/LanguageContext';
import { useDonationProgress } from '@/hooks/use-site-data';
import DonationProgress from '@/components/DonationProgress';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Building2, Heart, Users } from 'lucide-react';

const Index = () => {
  const { t } = useLanguage();
  const { data: progress } = useDonationProgress();

  const currentAmount = progress?.current_amount ?? 0;
  const totalAmount = progress?.total_amount ?? 1700000;

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-primary">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 lg:py-40 text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary-foreground leading-tight mb-6 max-w-4xl mx-auto">
            {t('hero.title')}
          </h1>
          <p className="text-lg sm:text-xl text-primary-foreground/85 max-w-2xl mx-auto mb-10 leading-relaxed">
            {t('hero.subtitle')}
          </p>
          <Link to="/sponsor">
            <Button size="lg" className="text-base px-8 py-6 rounded-lg bg-accent text-accent-foreground hover:bg-accent/90 transition-all duration-200 shadow-lg">
              {t('hero.cta')}
            </Button>
          </Link>
        </div>
      </section>

      {/* Progress */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        <Card className="shadow-lg border-0">
          <CardContent className="p-8">
            <DonationProgress currentAmount={currentAmount} totalAmount={totalAmount} />
          </CardContent>
        </Card>
      </section>

      {/* About */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">{t('about.title')}</h2>
          <p className="text-muted-foreground max-w-3xl mx-auto leading-relaxed text-lg">{t('about.description')}</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { icon: Building2, title: 'Community Hub', desc: 'A central office for organizing community services and programs.' },
            { icon: Users, title: 'Unity & Support', desc: 'Strengthening bonds through counseling, education, and gatherings.' },
            { icon: Heart, title: 'Lasting Impact', desc: 'Your contribution builds a space that serves generations to come.' },
          ].map(({ icon: Icon, title, desc }) => (
            <Card key={title} className="border-0 shadow-sm hover:shadow-md transition-shadow duration-200">
              <CardContent className="p-8 text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                  <Icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">{title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Why It Matters */}
      <section className="bg-secondary/50 py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">{t('about.why')}</h2>
              <p className="text-muted-foreground leading-relaxed text-lg mb-8">{t('about.why.text')}</p>
              <Link to="/project">
                <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                  {t('common.learnMore')}
                </Button>
              </Link>
            </div>
            <div className="rounded-xl overflow-hidden shadow-lg">
              <img src="/images/building-render-2.jpg" alt="Al Irushaadh Office Building Design" className="w-full h-80 object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">{t('hero.title')}</h2>
        <p className="text-muted-foreground mb-8 text-lg">{t('hero.subtitle')}</p>
        <Link to="/sponsor">
          <Button size="lg" className="text-base px-8 py-6 bg-primary text-primary-foreground hover:bg-primary/90">
            {t('common.donate')}
          </Button>
        </Link>
      </section>
    </div>
  );
};

export default Index;
