import { useParams, Link } from 'react-router-dom';
import { useCollectionDetail } from '@/hooks/use-collections';
import { useLanguage } from '@/i18n/LanguageContext';
import ContentCard from '@/components/domain/ContentCard';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const CollectionDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { t } = useLanguage();
  const { data: collection, isLoading, error } = useCollectionDetail(id || '');

  const items = collection?.collection_items?.filter((item: any) => !item.content?.soft_deleted_at).sort((a: any, b: any) => a.sort_order - b.sort_order) || [];

  return (
    <div className="min-h-screen">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Button variant="ghost" asChild className="mb-6">
          <Link to="/collections" className="flex items-center gap-2">
            <ArrowLeft size={16} />
            {t('common.back')}
          </Link>
        </Button>

        {isLoading && (
          <div className="space-y-6">
            <Skeleton className="aspect-video w-full max-w-2xl" />
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-4 w-full" />
          </div>
        )}

        {error && (
          <div className="text-center py-12">
            <p className="text-destructive">{t('common.error')}</p>
          </div>
        )}

        {collection && (
          <>
            <div className="mb-12">
              <div className="aspect-video bg-secondary rounded-xl overflow-hidden mb-6 max-w-2xl">
                {collection.cover_image ? (
                  <img src={collection.cover_image} alt={collection.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-4xl">📚</div>
                )}
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">{collection.title}</h1>
              {collection.description && <p className="text-lg text-muted-foreground max-w-3xl mb-4">{collection.description}</p>}
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                {items.length > 0 && <span>{items.length} items</span>}
                {collection.date_range && <span>{collection.date_range}</span>}
              </div>
            </div>

            {items.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">{t('empty.noContent')}</p>
              </div>
            )}

            {items.length > 0 && (
              <div className="space-y-4">
                {items.map((item: any) => (
                  <ContentCard key={item.id} content={item.content} />
                ))}
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
};

export default CollectionDetail;
