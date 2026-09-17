import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useContent } from '@/hooks/use-content';
import { useSheikhs } from '@/hooks/use-sheikhs';
import { useCollections } from '@/hooks/use-collections';
import { useTopics } from '@/hooks/use-topics';
import { useSubmissions } from '@/hooks/use-collections';
import { useLanguage } from '@/i18n/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const StatCard = ({ title, value, to }: { title: string; value: number; to?: string }) => {
  const content = (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-3xl font-bold">{value}</p>
      </CardContent>
    </Card>
  );

  if (to) {
    return (
      <Link to={to} className="block hover:scale-[1.02] transition-transform">
        {content}
      </Link>
    );
  }

  return content;
};

const Dashboard = () => {
  const { t } = useLanguage();
  const { data: content } = useContent();
  const { data: sheikhs } = useSheikhs();
  const { data: collections } = useCollections();
  const { data: topics } = useTopics();
  const { data: submissions } = useSubmissions();

  const stats = useMemo(() => {
    if (!content) return { total: 0, published: 0, pending: 0, drafts: 0 };
    return {
      total: content.length,
      published: content.filter((c) => c.state === 'published').length,
      pending: content.filter((c) => c.state === 'pending_review').length,
      drafts: content.filter((c) => c.state === 'draft').length,
    };
  }, [content]);

  const attentionItems = useMemo(() => {
    if (!submissions) return { pendingSubmissions: 0, brokenSources: 0, missingMetadata: 0 };
    const pendingSubmissions = submissions.filter((s) => s.state === 'new' || s.state === 'needs_review').length;
    const brokenSources = content?.filter((c) => c.source_url && c.state === 'unavailable').length || 0;
    const missingMetadata = content?.filter((c) => !c.description || !c.title).length || 0;
    return { pendingSubmissions, brokenSources, missingMetadata };
  }, [submissions, content]);

  const totalAttention = attentionItems.pendingSubmissions + attentionItems.brokenSources + attentionItems.missingMetadata;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">{t('admin.dashboard')}</h1>
        <p className="text-muted-foreground">{t('admin.overview')}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title={t('admin.totalContent')} value={stats.total} to="/admin/content" />
        <StatCard title={t('admin.published')} value={stats.published} to="/admin/content" />
        <StatCard title={t('admin.pending')} value={stats.pending} to="/admin/content" />
        <StatCard title={t('admin.drafts')} value={stats.drafts} to="/admin/content" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title={t('admin.sheikhsCount')} value={sheikhs?.length || 0} to="/admin/sheikhs" />
        <StatCard title={t('admin.collectionsCount')} value={collections?.length || 0} to="/admin/collections" />
        <StatCard title={t('admin.topicsCount')} value={topics?.length || 0} to="/admin/topics" />
        <StatCard title={t('admin.submissionsCount')} value={submissions?.length || 0} to="/admin/submissions" />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-orange-500" />
            {t('admin.attention')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {totalAttention === 0 ? (
            <p className="text-muted-foreground">{t('admin.noAttentionItems')}</p>
          ) : (
            <div className="space-y-3">
              {attentionItems.pendingSubmissions > 0 && (
                <Link to="/admin/submissions" className="flex items-center justify-between p-3 rounded-md bg-muted/50 hover:bg-muted transition-colors">
                  <div>
                    <p className="font-medium">{t('admin.submissionsCount')}</p>
                    <p className="text-sm text-muted-foreground">{attentionItems.pendingSubmissions} pending</p>
                  </div>
                  <Badge variant="secondary">{attentionItems.pendingSubmissions}</Badge>
                </Link>
              )}
              {attentionItems.brokenSources > 0 && (
                <div className="flex items-center justify-between p-3 rounded-md bg-muted/50">
                  <div>
                    <p className="font-medium">{t('admin.brokenSources')}</p>
                    <p className="text-sm text-muted-foreground">{attentionItems.brokenSources} items</p>
                  </div>
                  <Badge variant="destructive">{attentionItems.brokenSources}</Badge>
                </div>
              )}
              {attentionItems.missingMetadata > 0 && (
                <div className="flex items-center justify-between p-3 rounded-md bg-muted/50">
                  <div>
                    <p className="font-medium">{t('admin.missingMetadata')}</p>
                    <p className="text-sm text-muted-foreground">{attentionItems.missingMetadata} items</p>
                  </div>
                  <Badge variant="destructive">{attentionItems.missingMetadata}</Badge>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>{t('admin.quickActions')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Link to="/admin/content" className="flex items-center gap-2 text-sm hover:text-primary">
              <ChevronRight size={16} /> {t('admin.manageContent')}
            </Link>
            <Link to="/admin/sheikhs" className="flex items-center gap-2 text-sm hover:text-primary">
              <ChevronRight size={16} /> {t('admin.manageSheikhs')}
            </Link>
            <Link to="/admin/collections" className="flex items-center gap-2 text-sm hover:text-primary">
              <ChevronRight size={16} /> {t('admin.manageCollections')}
            </Link>
            <Link to="/admin/analytics" className="flex items-center gap-2 text-sm hover:text-primary">
              <ChevronRight size={16} /> {t('admin.viewAnalytics')}
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t('admin.recentActivity')}</CardTitle>
          </CardHeader>
          <CardContent>
            {!content || content.length === 0 ? (
              <p className="text-sm text-muted-foreground">{t('admin.noData')}</p>
            ) : (
              <div className="space-y-2">
                {content.slice(0, 5).map((item) => (
                  <div key={item.id} className="flex items-center justify-between text-sm">
                    <span className="truncate">{item.title}</span>
                    <Badge variant="outline">{item.state}</Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
