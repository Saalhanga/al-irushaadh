import { useParams, Link } from 'react-router-dom';
import { useSheikhDetail, useContentBySheikh, useSheikhs } from '@/hooks/use-sheikhs';
import { useCollections } from '@/hooks/use-collections';
import { useLanguage } from '@/i18n/LanguageContext';
import ContentCard from '@/components/domain/ContentCard';
import SheikhCard from '@/components/domain/SheikhCard';
import CollectionCard from '@/components/domain/CollectionCard';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const SheikhProfile = () => {
  const { id } = useParams<{ id: string }>();
  const { t, locale } = useLanguage();
  const { data: sheikh, isLoading: sheikhLoading, error: sheikhError } = useSheikhDetail(id || '');
  const { data: content, isLoading: contentLoading } = useContentBySheikh(id || '');
  const { data: allSheikhs } = useSheikhs({ visibility: 'visible' });
  const { data: collections } = useCollections();

  const popularContent = content?.slice().sort((a: any, b: any) => (b.view_count || 0) - (a.view_count || 0)).slice(0, 6) || [];
  const latestContent = content?.slice().sort((a: any, b: any) => new Date(b.added_at).getTime() - new Date(a.added_at).getTime()).slice(0, 6) || [];

  const sheikhCollections = collections?.filter((c: any) =>
    c.items?.some((item: any) => item.content?.sheikh_id === id)
  ).slice(0, 4) || [];

  const relatedSheikhs = allSheikhs?.filter((s) => s.id !== id && s.topics.some((topic) => sheikh?.topics.includes(topic))).slice(0, 4) || [];

  return (
    <div className="min-h-screen">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Button variant="ghost" asChild className="mb-6">
          <Link to="/sheikhs" className="flex items-center gap-2">
            <ArrowLeft size={16} />
            {t('common.back')}
          </Link>
        </Button>

        {sheikhLoading && (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <Skeleton className="w-32 h-32 rounded-full" />
              <div className="flex-1 space-y-4">
                <Skeleton className="h-8 w-64" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            </div>
          </div>
        )}

        {sheikhError && (
          <div className="text-center py-12">
            <p className="text-destructive">{t('common.error')}</p>
          </div>
        )}

        {sheikh && (
          <>
            <div className="flex flex-col md:flex-row gap-8 items-start mb-16">
              <div className="w-32 h-32 rounded-full bg-secondary flex items-center justify-center overflow-hidden flex-shrink-0 mx-auto md:mx-0">
                {sheikh.photo_url ? (
                  <img src={sheikh.photo_url} alt={sheikh.name} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-4xl text-muted-foreground">{sheikh.name.charAt(0)}</span>
                )}
              </div>
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">{sheikh.name}</h1>
                <p className="text-muted-foreground mb-6 max-w-3xl">{sheikh.short_bio}</p>
                <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                  {sheikh.languages.map((lang) => (
                    <span key={lang} className="text-xs px-3 py-1 rounded-full bg-secondary text-secondary-foreground">{lang}</span>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2 mt-3 justify-center md:justify-start">
                  {sheikh.topics.map((topic) => (
                    <span key={topic} className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary">{topic}</span>
                  ))}
                </div>
              </div>
            </div>

            {latestContent && latestContent.length > 0 && (
              <div className="mb-16">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-foreground">{t('sheikhs.latestContent')}</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {latestContent.map((item: any) => (
                    <ContentCard key={item.id} content={item} />
                  ))}
                </div>
              </div>
            )}

            {popularContent && popularContent.length > 0 && (
              <div className="mb-16">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-foreground">{t('sheikhs.popularContent')}</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {popularContent.map((item: any) => (
                    <ContentCard key={item.id} content={item} />
                  ))}
                </div>
              </div>
            )}

            {sheikhCollections.length > 0 && (
              <div className="mb-16">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-foreground">{t('sheikhs.collections')}</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {sheikhCollections.map((collection: any) => (
                    <CollectionCard key={collection.id} collection={collection} />
                  ))}
                </div>
              </div>
            )}

            {relatedSheikhs.length > 0 && (
              <div className="mb-16">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-foreground">{t('sheikhs.relatedTopics')}</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {relatedSheikhs.map((sheikh) => (
                    <SheikhCard key={sheikh.id} sheikh={sheikh} />
                  ))}
                </div>
              </div>
            )}

            {!latestContent?.length && !popularContent?.length && !sheikhCollections.length && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">{t('empty.noContent')}</p>
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
};

export default SheikhProfile;
