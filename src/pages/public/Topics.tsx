import { useTopics } from '@/hooks/use-topics';
import { useLanguage } from '@/i18n/LanguageContext';
import TopicCard from '@/components/domain/TopicCard';
import { Skeleton } from '@/components/ui/skeleton';

const Topics = () => {
  const { t } = useLanguage();
  const { data: topics, isLoading, error } = useTopics();

  return (
    <div className="min-h-screen">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">{t('topics.title')}</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{t('topics.subtitle')}</p>
        </div>

        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="space-y-4">
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

        {topics && topics.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">{t('empty.noTopics')}</p>
          </div>
        )}

        {topics && topics.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {topics.map((topic) => (
              <TopicCard key={topic.id} topic={topic} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Topics;
