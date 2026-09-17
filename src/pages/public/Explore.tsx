import { useState, useMemo } from 'react';
import { useSearch, useSearchSuggestions, useSheikhs, useTopics } from '@/hooks/use-content';
import { useLanguage } from '@/i18n/LanguageContext';
import ContentCard from '@/components/domain/ContentCard';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, SlidersHorizontal } from 'lucide-react';

const CONTENT_TYPES = [
  { value: 'audio', label: 'Audio' },
  { value: 'video', label: 'Video' },
  { value: 'article', label: 'Article' },
  { value: 'pdf', label: 'PDF' },
  { value: 'image', label: 'Image' },
  { value: 'qna', label: 'Q&A' },
  { value: 'quran', label: 'Quran' },
  { value: 'dua', label: 'Dua' },
  { value: 'interview', label: 'Interview' },
  { value: 'discussion', label: 'Discussion' },
  { value: 'short_clip', label: 'Short Clip' },
  { value: 'lecture_series', label: 'Lecture Series' },
  { value: 'course', label: 'Course' },
];

const Explore = () => {
  const { t, locale } = useLanguage();
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState('latest');
  const [typeFilter, setTypeFilter] = useState<string | null>(null);
  const [sheikhFilter, setSheikhFilter] = useState<string | null>(null);
  const [topicFilter, setTopicFilter] = useState<string | null>(null);

  const { data: suggestions } = useSearchSuggestions(query);
  const { data: archiveResults, isLoading: archiveLoading } = useSearch(query);
  const { data: sheikhs } = useSheikhs({ visibility: 'visible' });
  const { data: topics } = useTopics();

  const filteredArchive = useMemo(() => {
    let results = archiveResults?.archive || [];
    if (typeFilter) results = results.filter((item: any) => item.type === typeFilter);
    if (sheikhFilter) results = results.filter((item: any) => item.sheikh_id === sheikhFilter);
    if (topicFilter) results = results.filter((item: any) => item.topics.includes(topicFilter));
    switch (sort) {
      case 'latest': results = [...results].sort((a: any, b: any) => new Date(b.added_at).getTime() - new Date(a.added_at).getTime()); break;
      case 'popular': results = [...results].sort((a: any, b: any) => (b.view_count || 0) - (a.view_count || 0)); break;
      case 'mostPlayed': results = [...results].sort((a: any, b: any) => (b.play_count || 0) - (a.play_count || 0)); break;
      case 'mostDownloaded': results = [...results].sort((a: any, b: any) => (b.download_count || 0) - (a.download_count || 0)); break;
      default: break;
    }
    return results;
  }, [archiveResults, sort, typeFilter, sheikhFilter, topicFilter]);

  const clearFilters = () => {
    setTypeFilter(null);
    setSheikhFilter(null);
    setTopicFilter(null);
  };

  return (
    <div className="min-h-screen">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">{t('explore.title')}</h1>
        </div>

        <div className="max-w-2xl mx-auto mb-8 relative">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
            <Input
              type="text"
              placeholder={t('common.searchPlaceholder')}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-10 pr-4 py-3 w-full"
            />
          </div>
          {suggestions && suggestions.length > 0 && (
            <div className="absolute z-50 w-full bg-background border border-border rounded-md mt-1 shadow-lg">
              {suggestions.map((suggestion, i) => (
                <button
                  key={i}
                  className="w-full text-left px-4 py-2 text-sm hover:bg-secondary transition-colors"
                  onClick={() => setQuery(suggestion)}
                >
                  {suggestion}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="w-full lg:w-64 flex-shrink-0 space-y-6">
            <div className="bg-secondary/20 rounded-xl p-4 space-y-4">
              <h3 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">{t('explore.filters')}</h3>

              <div>
                <label className="text-xs font-medium text-muted-foreground block mb-2">{t('explore.filterType')}</label>
                <div className="flex flex-wrap gap-1">
                  {CONTENT_TYPES.map((ct) => (
                    <button
                      key={ct.value}
                      onClick={() => setTypeFilter(typeFilter === ct.value ? null : ct.value)}
                      className={`text-xs px-2 py-1 rounded-full border transition-colors ${typeFilter === ct.value ? 'bg-primary text-primary-foreground border-primary' : 'border-border hover:border-primary'}`}
                    >
                      {ct.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-muted-foreground block mb-2">{t('explore.filterSheikh')}</label>
                <select
                  value={sheikhFilter || ''}
                  onChange={(e) => setSheikhFilter(e.target.value || null)}
                  className="w-full text-sm bg-background border border-border rounded-md px-3 py-2"
                >
                  <option value="">All</option>
                  {sheikhs?.map((s) => (
                    <option key={s.id} value={s.id}>{s.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-medium text-muted-foreground block mb-2">{t('explore.filterTopic')}</label>
                <select
                  value={topicFilter || ''}
                  onChange={(e) => setTopicFilter(e.target.value || null)}
                  className="w-full text-sm bg-background border border-border rounded-md px-3 py-2"
                >
                  <option value="">All</option>
                  {topics?.map((topic) => (
                    <option key={topic.id} value={topic.id}>{topic.name}</option>
                  ))}
                </select>
              </div>

              <Button variant="outline" size="sm" onClick={clearFilters} className="w-full">{t('explore.clearFilters')}</Button>
            </div>
          </aside>

          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-muted-foreground">{filteredArchive.length} results</p>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="text-sm bg-background border border-border rounded-md px-3 py-2"
              >
                <option value="relevance">Relevance</option>
                <option value="latest">Latest</option>
                <option value="popular">Popular</option>
                <option value="mostPlayed">Most Played</option>
                <option value="mostDownloaded">Most Downloaded</option>
              </select>
            </div>

            {archiveLoading && (
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

            {!archiveLoading && filteredArchive.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">{t('empty.noResults')}</p>
              </div>
            )}

            {!archiveLoading && filteredArchive.length > 0 && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-xl font-semibold text-foreground mb-4">{t('explore.resultsArchive')}</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredArchive.map((item: any) => (
                      <ContentCard key={item.id} content={item} />
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Explore;
