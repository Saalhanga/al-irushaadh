import { useSheikhs } from '@/hooks/use-sheikhs';
import { useLanguage } from '@/i18n/LanguageContext';
import SheikhCard from '@/components/domain/SheikhCard';
import { Skeleton } from '@/components/ui/skeleton';

const Sheikhs = () => {
  const { t } = useLanguage();
  const { data: sheikhs, isLoading, error } = useSheikhs({ visibility: 'visible' });

  return (
    <div className="min-h-screen">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">{t('sheikhs.title')}</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{t('sheikhs.subtitle')}</p>
        </div>

        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="h-32 w-32 rounded-full mx-auto" />
                <Skeleton className="h-6 w-3/4 mx-auto" />
                <Skeleton className="h-4 w-full mx-auto" />
              </div>
            ))}
          </div>
        )}

        {error && (
          <div className="text-center py-12">
            <p className="text-destructive">{t('common.error')}</p>
          </div>
        )}

        {sheikhs && sheikhs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">{t('empty.noSheikhs')}</p>
          </div>
        )}

        {sheikhs && sheikhs.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {sheikhs.map((sheikh) => (
              <SheikhCard key={sheikh.id} sheikh={sheikh} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Sheikhs;
