import { useLanguage } from '@/i18n/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';

const ProjectDetails = () => {
  const { t } = useLanguage();

  const purposes = [
    t('project.purpose.item1'),
    t('project.purpose.item2'),
    t('project.purpose.item3'),
    t('project.purpose.item4'),
    t('project.purpose.item5'),
  ];

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground">{t('project.title')}</h1>
        </div>

        {/* Building Section */}
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div className="rounded-xl overflow-hidden shadow-lg">
            <img
              src="/images/building-render-1.jpg"
              alt="UIS Office Building"
              className="w-full h-80 object-cover"
            />
          </div>
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">{t('project.building.title')}</h2>
            <p className="text-muted-foreground leading-relaxed text-lg">{t('project.building.desc')}</p>
          </div>
        </div>

        {/* Purpose */}
        <Card className="border-0 shadow-md">
          <CardContent className="p-8 space-y-6">
            <h2 className="text-2xl font-bold text-foreground">{t('project.purpose.title')}</h2>
            <ul className="space-y-4">
              {purposes.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Square Foot Concept */}
        <section className="bg-secondary/50 rounded-xl p-8 sm:p-12">
          <h2 className="text-2xl font-bold text-foreground mb-4">{t('project.sqft.title')}</h2>
          <p className="text-muted-foreground leading-relaxed text-lg mb-8">{t('project.sqft.desc')}</p>
          <Link to="/sponsor">
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
              {t('hero.cta')}
            </Button>
          </Link>
        </section>

        {/* Gallery */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-foreground text-center">{t('project.gallery.title')}</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="rounded-xl overflow-hidden shadow-md">
              <img src="/images/building-render-1.jpg" alt="Building Design 1" className="w-full h-64 object-cover" />
            </div>
            <div className="rounded-xl overflow-hidden shadow-md">
              <img src="/images/building-render-2.jpg" alt="Building Design 2" className="w-full h-64 object-cover" />
            </div>
          </div>
        </section>

        {/* CTA */}
        <div className="text-center py-8">
          <Link to="/sponsor">
            <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 px-8 py-6 text-base">
              {t('common.donate')}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
