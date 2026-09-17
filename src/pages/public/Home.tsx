import { Link } from 'react-router-dom';
import { useFeaturedContent, useLatestContent, useContentByType, usePopularContent, useTrendingContent, useSheikhs, useTopics, useCollections } from '@/hooks/use-content';
import { useLanguage } from '@/i18n/LanguageContext';
import ContentCard from '@/components/domain/ContentCard';
import SheikhCard from '@/components/domain/SheikhCard';
import TopicCard from '@/components/domain/TopicCard';
import CollectionCard from '@/components/domain/CollectionCard';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChevronRight } from 'lucide-react';

const SectionSkeleton = ({ count = 6 }: { count?: number }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
    {Array.from({ length: count }).map((_, i) => (
      <div key={i} className="space-y-4">
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </div>
    ))}
  </div>
);

const Home = () => {
  const { t } = useLanguage();
  const { data: featured, isLoading: featuredLoading } = useFeaturedContent();
  const { data: latest, isLoading: latestLoading } = useLatestContent();
  const { data: audio, isLoading: audioLoading } = useContentByType('audio');
  const { data: video, isLoading: videoLoading } = useContentByType('video');
  const { data: popular, isLoading: popularLoading } = usePopularContent();
  const { data: trending, isLoading: trendingLoading } = useTrendingContent();
  const { data: sheikhs, isLoading: sheikhsLoading } = useSheikhs({ visibility: 'visible' });
  const { data: topics, isLoading: topicsLoading } = useTopics();
  const { data: collections, isLoading: collectionsLoading } = useCollections();

  const primaryFeatured = featured?.find((item: any) => item.slot === 'primary' && item.enabled);
  const supportingFeatured = featured?.filter((item: any) => item.slot === 'supporting' && item.enabled);

  const renderSectionHeader = (title: string, viewAllLink: string) => (
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-2xl font-bold text-foreground">{title}</h2>
      <Button variant="ghost" asChild className="text-primary">
        <Link to={viewAllLink} className="flex items-center gap-1">
          {t('common.viewAll')} <ChevronRight size={16} />
        </Link>
      </Button>
    </div>
  );

  return (
    <div className="min-h-screen">
      {featuredLoading ? (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Skeleton className="h-96 w-full mb-12" />
          <SectionSkeleton count={4} />
        </div>
      ) : primaryFeatured ? (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-gradient-to-br from-primary/5 to-secondary/10 rounded-2xl p-8 sm:p-12 mb-16">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <Badge variant="secondary" className="text-xs uppercase tracking-wider">{t('home.featured')}</Badge>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
                  {primaryFeatured.content?.title}
                </h1>
                <p className="text-lg text-muted-foreground line-clamp-3">
                  {primaryFeatured.content?.description}
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button asChild size="lg">
                    <Link to={`/${primaryFeatured.content?.type}/${primaryFeatured.content?.id}`}>
                      {primaryFeatured.content?.type === 'audio' ? t('common.listen') : primaryFeatured.content?.type === 'video' ? t('common.watch') : t('common.read')}
                    </Link>
                  </Button>
                </div>
              </div>
              <div className="hidden lg:block">
                {primaryFeatured.content?.file_path && (
                  <div className="aspect-video bg-secondary rounded-xl overflow-hidden">
                    {primaryFeatured.content.type === 'audio' ? (
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                          <Play size={32} />
                        </div>
                      </div>
                    ) : (
                      <img src={primaryFeatured.content.file_path} alt={primaryFeatured.content.title} className="w-full h-full object-cover" />
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {supportingFeatured && supportingFeatured.length > 0 && (
            <div className="mb-16">
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {supportingFeatured.map((item: any) => (
                  <ContentCard key={item.id} content={item.content} />
                ))}
              </div>
            </div>
          )}
        </section>
      ) : null}

      {latest && latest.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {renderSectionHeader(t('home.latest'), '/explore')}
          {latestLoading ? <SectionSkeleton /> : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {latest.slice(0, 8).map((item) => (
                <ContentCard key={item.id} content={item} />
              ))}
            </div>
          )}
        </section>
      )}

      {audio && audio.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {renderSectionHeader(t('home.latestAudio'), '/explore')}
          {audioLoading ? <SectionSkeleton count={4} /> : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {audio.slice(0, 8).map((item) => (
                <ContentCard key={item.id} content={item} variant="audio" />
              ))}
            </div>
          )}
        </section>
      )}

      {video && video.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {renderSectionHeader(t('home.latestVideo'), '/explore')}
          {videoLoading ? <SectionSkeleton count={4} /> : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {video.slice(0, 8).map((item) => (
                <ContentCard key={item.id} content={item} variant="video" />
              ))}
            </div>
          )}
        </section>
      )}

      {popular && popular.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {renderSectionHeader(t('home.popular'), '/explore')}
          {popularLoading ? <SectionSkeleton /> : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {popular.slice(0, 8).map((item) => (
                <ContentCard key={item.id} content={item} />
              ))}
            </div>
          )}
        </section>
      )}

      {trending && trending.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {renderSectionHeader(t('home.trending'), '/explore')}
          {trendingLoading ? <SectionSkeleton /> : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {trending.slice(0, 8).map((item) => (
                <ContentCard key={item.id} content={item} />
              ))}
            </div>
          )}
        </section>
      )}

      {sheikhs && sheikhs.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {renderSectionHeader(t('home.featuredSheikhs'), '/sheikhs')}
          {sheikhsLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="space-y-4">
                  <Skeleton className="h-32 w-32 rounded-full mx-auto" />
                  <Skeleton className="h-6 w-3/4 mx-auto" />
                  <Skeleton className="h-4 w-full mx-auto" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {sheikhs.slice(0, 8).map((sheikh) => (
                <SheikhCard key={sheikh.id} sheikh={sheikh} />
              ))}
            </div>
          )}
        </section>
      )}

      {topics && topics.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {renderSectionHeader(t('home.topics'), '/topics')}
          {topicsLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="space-y-4">
                  <Skeleton className="h-6 w-3/4 mx-auto" />
                  <Skeleton className="h-4 w-full mx-auto" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {topics.slice(0, 8).map((topic) => (
                <TopicCard key={topic.id} topic={topic} />
              ))}
            </div>
          )}
        </section>
      )}

      {collections && collections.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {renderSectionHeader(t('home.collections'), '/collections')}
          {collectionsLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="space-y-4">
                  <Skeleton className="aspect-video w-full" />
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {collections.slice(0, 6).map((collection) => (
                <CollectionCard key={collection.id} collection={collection} />
              ))}
            </div>
          )}
        </section>
      )}
    </div>
  );
};

export default Home;
