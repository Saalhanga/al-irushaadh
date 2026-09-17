import { useCollections } from '@/hooks/use-collections';
import { useLanguage } from '@/i18n/LanguageContext';
import CollectionCard from '@/components/domain/CollectionCard';
import { Skeleton } from '@/components/ui/skeleton';

const Collections = () => {
  const { t } = useLanguage();
  const { data: collections, isLoading, error } = useCollections();

  return (
    <div className="min-h-screen">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">{t('collections.title')}</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{t('collections.subtitle')}</p>
        </div>

        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="aspect-video w-full" />
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))}
          </div>
        )}

        {error && (
          <div className="text-center py-12">
            <p className="text-destructive">{t('common.error')}</p>
          </div>
        )}

        {collections && collections.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">{t('empty.noCollections')}</p>
          </div>
        )}

        {collections && collections.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {collections.map((collection) => (
              <CollectionCard key={collection.id} collection={collection} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Collections;
