import { useEffect, useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useContentDetail, useContentBySheikh, useContentByTopic, useTrackView, useTrackPlay, useTrackDownload, useTrackShare } from '@/hooks/use-content';
import { useLanguage } from '@/i18n/LanguageContext';
import ContentCard from '@/components/domain/ContentCard';
import ShareMenu from '@/components/ShareMenu';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Download, ExternalLink, Play } from 'lucide-react';
import { getContentTypeLabel, formatDuration } from '@/lib/utils';

const ContentDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { t, locale } = useLanguage();
  const [showShare, setShowShare] = useState(false);

  const { data: content, isLoading, error } = useContentDetail(id || '');
  const trackView = useTrackView(id || '');
  const trackPlay = useTrackPlay(id || '');
  const trackDownload = useTrackDownload(id || '');
  const trackShare = useTrackShare(id || '');

  const { data: sheikhContent } = useContentBySheikh(content?.sheikh_id || '');
  const { data: topicContent } = useContentByTopic(content?.topics?.[0] || '');

  useEffect(() => {
    if (id && content?.state === 'published') {
      trackView.mutate();
    }
  }, [id, content?.state]);

  const relatedContent = useMemo(() => {
    const fromSheikh = sheikhContent?.filter((item) => item.id !== id).slice(0, 4) || [];
    const fromTopic = topicContent?.filter((item) => item.id !== id).slice(0, 4) || [];
    return fromSheikh.length > 0 ? fromSheikh : fromTopic;
  }, [sheikhContent, topicContent, id]);

  const handlePlay = () => {
    trackPlay.mutate();
  };

  const handleDownload = () => {
    if (content?.file_path) {
      trackDownload.mutate();
      const link = document.createElement('a');
      link.href = content.file_path;
      link.download = content.title;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleShare = () => {
    trackShare.mutate();
    setShowShare(true);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Skeleton className="h-8 w-32 mb-6" />
          <Skeleton className="h-10 w-3/4 mb-4" />
          <Skeleton className="h-64 w-full mb-6" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-2/3" />
        </section>
      </div>
    );
  }

  if (error || !content) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-destructive mb-4">{t('common.error')}</p>
          <Link to="/explore" className="text-primary underline">{t('common.back') || 'Back to Explore'}</Link>
        </div>
      </div>
    );
  }

  const isAudio = content.type === 'audio';
  const isVideo = content.type === 'video';

  return (
    <div className="min-h-screen">
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Button variant="ghost" asChild className="mb-6">
          <Link to="/explore" className="flex items-center gap-2">
            <ArrowLeft size={16} />
            {t('common.back')}
          </Link>
        </Button>

        <div className="mb-8">
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge variant="secondary">{getContentTypeLabel(content.type, locale)}</Badge>
            {content.language && <Badge variant="outline">{content.language}</Badge>}
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">{content.title}</h1>
          <p className="text-lg text-muted-foreground">{content.description}</p>
        </div>

        {(isAudio || isVideo) && (
          <div className="bg-secondary/30 rounded-xl p-6 mb-8">
            {isAudio && (
              <div className="flex items-center gap-4">
                <Button size="lg" onClick={handlePlay} className="rounded-full w-16 h-16">
                  <Play size={24} />
                </Button>
                <div className="flex-1">
                  {content.duration && <p className="text-sm text-muted-foreground">{formatDuration(content.duration)}</p>}
                  <div className="h-2 bg-border rounded-full mt-2">
                    <div className="h-2 bg-primary rounded-full w-1/3" />
                  </div>
                </div>
              </div>
            )}
            {isVideo && (
              <div className="aspect-video bg-black rounded-lg overflow-hidden">
                {content.file_path ? (
                  <video src={content.file_path} controls className="w-full h-full" onPlay={handlePlay} />
                ) : content.external_url ? (
                  <iframe src={content.external_url} className="w-full h-full" allowFullScreen />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-white">
                    <Play size={48} />
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        <div className="flex flex-wrap gap-3 mb-8">
          {content.file_path && (
            <Button variant="outline" onClick={handleDownload} className="flex items-center gap-2">
              <Download size={16} />
              {t('common.download')}
            </Button>
          )}
          <Button variant="outline" onClick={handleShare} className="flex items-center gap-2">
            {t('common.share')}
          </Button>
          {showShare && (
            <div className="relative">
              <ShareMenu url={window.location.href} title={content.title} onClose={() => setShowShare(false)} />
            </div>
          )}
        </div>

        <div className="bg-secondary/20 rounded-xl p-6 mb-8 space-y-4">
          <h3 className="font-semibold text-foreground">{t('content.originalSource')}</h3>
          {content.source_platform && (
            <div className="flex items-center gap-2 text-sm">
              <span className="text-muted-foreground">{t('content.platform')}:</span>
              <span className="text-foreground">{content.source_platform}</span>
            </div>
          )}
          {content.publisher && (
            <div className="flex items-center gap-2 text-sm">
              <span className="text-muted-foreground">{t('content.publisher')}:</span>
              <span className="text-foreground">{content.publisher}</span>
            </div>
          )}
          {(content.source_url || content.external_url) && (
            <Button variant="link" asChild className="p-0 h-auto">
              <a href={content.source_url || content.external_url || ''} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-primary">
                {t('content.viewOriginal')} <ExternalLink size={14} />
              </a>
            </Button>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4 mb-8">
          {content.date && (
            <div>
              <span className="text-sm text-muted-foreground block">{t('content.dateAdded')}</span>
              <span className="text-sm font-medium">{new Date(content.date).toLocaleDateString()}</span>
            </div>
          )}
          {content.event && (
            <div>
              <span className="text-sm text-muted-foreground block">{t('content.event')}</span>
              <span className="text-sm font-medium">{content.event}</span>
            </div>
          )}
          {content.location && (
            <div>
              <span className="text-sm text-muted-foreground block">{t('content.location')}</span>
              <span className="text-sm font-medium">{content.location}</span>
            </div>
          )}
        </div>

        {content.topics && content.topics.length > 0 && (
          <div className="mb-8">
            <h3 className="text-sm font-medium text-muted-foreground mb-2">{t('content.topics')}</h3>
            <div className="flex flex-wrap gap-2">
              {content.topics.map((topic) => (
                <span key={topic} className="text-xs px-3 py-1 rounded-full bg-secondary text-secondary-foreground">{topic}</span>
              ))}
            </div>
          </div>
        )}

        {content.tags && content.tags.length > 0 && (
          <div className="mb-8">
            <h3 className="text-sm font-medium text-muted-foreground mb-2">{t('content.tags')}</h3>
            <div className="flex flex-wrap gap-2">
              {content.tags.map((tag) => (
                <span key={tag} className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary">{tag}</span>
              ))}
            </div>
          </div>
        )}

        {relatedContent.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-6">{t('content.related')}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedContent.map((item) => (
                <ContentCard key={item.id} content={item} />
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default ContentDetail;
