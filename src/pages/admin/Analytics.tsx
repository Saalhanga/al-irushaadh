import { useMemo } from 'react';
import { useAnalyticsOverview } from '@/hooks/use-collections';
import { useContent } from '@/hooks/use-content';
import { useSheikhs } from '@/hooks/use-sheikhs';
import { useTopics } from '@/hooks/use-topics';
import { useLanguage } from '@/i18n/LanguageContext';
import { useAuth } from '@/hooks/use-auth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BarChart3, type LucideIcon } from 'lucide-react';

const StatCard = ({ title, value, icon: Icon }: { title: string; value: number; icon: LucideIcon }) => (
  <Card>
    <CardHeader className="pb-2 flex flex-row items-center justify-between">
      <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
      <Icon size={18} className="text-muted-foreground" />
    </CardHeader>
    <CardContent>
      <p className="text-3xl font-bold">{value}</p>
    </CardContent>
  </Card>
);

const BreakdownSection = ({ title, items, emptyText }: { title: string; items: { label: string; value: number }[]; emptyText: string }) => (
  <Card>
    <CardHeader>
      <CardTitle className="text-lg">{title}</CardTitle>
    </CardHeader>
    <CardContent>
      {items.length === 0 ? (
        <p className="text-sm text-muted-foreground">{emptyText}</p>
      ) : (
        <div className="space-y-2">
          {items.map((item) => (
            <div key={item.label} className="flex items-center justify-between text-sm">
              <span className="truncate">{item.label}</span>
              <Badge variant="secondary">{item.value}</Badge>
            </div>
          ))}
        </div>
      )}
    </CardContent>
  </Card>
);

const Analytics = () => {
  const { t } = useLanguage();
  const { isAdmin } = useAuth();
  const { data: analytics, isLoading } = useAnalyticsOverview();
  const { data: content } = useContent();
  const { data: sheikhs } = useSheikhs();
  const { data: topics } = useTopics();

  if (!isAdmin) return null;

  const stats = useMemo(() => {
    if (!analytics) return { views: 0, plays: 0, downloads: 0, shares: 0 };
    return {
      views: analytics.filter((a: any) => a.event_type === 'view').length,
      plays: analytics.filter((a: any) => a.event_type === 'play').length,
      downloads: analytics.filter((a: any) => a.event_type === 'download').length,
      shares: analytics.filter((a: any) => a.event_type === 'share').length,
    };
  }, [analytics]);

  const byType = useMemo(() => {
    if (!content) return [];
    const counts: Record<string, number> = {};
    content.forEach((c) => {
      counts[c.type] = (counts[c.type] || 0) + 1;
    });
    return Object.entries(counts).map(([label, value]) => ({ label, value }));
  }, [content]);

  const bySheikh = useMemo(() => {
    if (!content || !sheikhs) return [];
    const counts: Record<string, number> = {};
    content.forEach((c) => {
      if (c.sheikh_id) {
        const name = sheikhs.find((s) => s.id === c.sheikh_id)?.name || 'Unknown';
        counts[name] = (counts[name] || 0) + 1;
      }
    });
    return Object.entries(counts).map(([label, value]) => ({ label, value }));
  }, [content, sheikhs]);

  const byTopic = useMemo(() => {
    if (!content) return [];
    const counts: Record<string, number> = {};
    content.forEach((c) => {
      c.topics.forEach((topic) => {
        counts[topic] = (counts[topic] || 0) + 1;
      });
    });
    return Object.entries(counts).map(([label, value]) => ({ label, value }));
  }, [content]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">{t('admin.analytics')}</h1>
        <p className="text-muted-foreground">Analytics overview</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title={t('admin.totalViews')} value={stats.views} icon={BarChart3} />
        <StatCard title={t('admin.totalPlays')} value={stats.plays} icon={BarChart3} />
        <StatCard title={t('admin.totalDownloads')} value={stats.downloads} icon={BarChart3} />
        <StatCard title={t('admin.totalShares')} value={stats.shares} icon={BarChart3} />
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">{t('admin.breakdown')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <BreakdownSection title={t('admin.byType')} items={byType} emptyText={t('admin.noData')} />
          <BreakdownSection title={t('admin.bySheikh')} items={bySheikh} emptyText={t('admin.noData')} />
          <BreakdownSection title={t('admin.byTopic')} items={byTopic} emptyText={t('admin.noData')} />
        </div>
      </div>
    </div>
  );
};

export default Analytics;
