import { useParams, Link } from 'react-router-dom';
import { useTopicDetail, useContentByTopic } from '@/hooks/use-topics';
import { useLanguage } from '@/i18n/LanguageContext';
import ContentCard from '@/components/domain/ContentCard';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const TopicDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { t } = useLanguage();
  const { data: topic, isLoading: topicLoading, error: topicError } = useTopicDetail(id || '');
  const { data: content, isLoading: contentLoading } = useContentByTopic(id || '');

  return (
    <div className="min-h-screen">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Button variant="ghost" asChild className="mb-6">
          <Link to="/topics" className="flex items-center gap-2">
            <ArrowLeft size={16} />
            {t('common.back')}
          </Link>
        </Button>

        {topicLoading && (
          <div className="space-y-4">
            <Skeleton className="h-10 w-64" />
            <Skeleton className="h-4 w-full max-w-2xl" />
          </div>
        )}

        {topicError && (
          <div className="text-center py-12">
            <p className="text-destructive">{t('common.error')}</p>
          </div>
        )}

        {topic && (
          <>
            <div className="mb-12">
              <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">{topic.name}</h1>
              {topic.description && <p className="text-lg text-muted-foreground max-w-3xl">{topic.description}</p>}
            </div>

            {contentLoading && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="space-y-4">
                    <Skeleton className="h-32 w-full" />
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                ))}
              </div>
            )}

            {!contentLoading && content && content.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">{t('empty.noContent')}</p>
              </div>
            )}

            {content && content.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {content.map((item) => (
                  <ContentCard key={item.id} content={item} />
                ))}
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
};

export default TopicDetail;
