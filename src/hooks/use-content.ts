import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { Content, ContentState, Sheikh, Topic, Collection, Submission } from '@/lib/types';
import { queryKeys } from '@/lib/query-keys';
import { useAuth } from '@/hooks/use-auth';

export const useContent = (filters?: Record<string, any>) => {
  return useQuery({
    queryKey: queryKeys.content.list(filters),
    queryFn: async () => {
      let query = supabase.from('content').select('*').is('soft_deleted_at', null).order('added_at', { ascending: false });
      if (filters?.type) query = query.eq('type', filters.type);
      if (filters?.sheikh_id) query = query.eq('sheikh_id', filters.sheikh_id);
      if (filters?.topic) query = query.contains('topics', [filters.topic]);
      if (filters?.language) query = query.eq('language', filters.language);
      if (filters?.state) query = query.eq('state', filters.state);
      if (filters?.search) {
        query = query.or(`title.ilike.%${filters.search}%,description.ilike.%${filters.search}%`);
      }
      const { data, error } = await query;
      if (error) throw error;
      return data as Content[];
    },
  });
};

export const useContentDetail = (id: string) => {
  return useQuery({
    queryKey: queryKeys.content.detail(id),
    queryFn: async () => {
      const { data, error } = await supabase.from('content').select('*').eq('id', id).single();
      if (error) throw error;
      return data as Content;
    },
    enabled: !!id,
  });
};

export const useContentByType = (type: string) => {
  return useQuery({
    queryKey: queryKeys.content.byType(type),
    queryFn: async () => {
      const { data, error } = await supabase.from('content').select('*').eq('type', type).is('soft_deleted_at', null).order('added_at', { ascending: false });
      if (error) throw error;
      return data as Content[];
    },
    enabled: !!type,
  });
};

export const useContentBySheikh = (sheikhId: string) => {
  return useQuery({
    queryKey: queryKeys.content.bySheikh(sheikhId),
    queryFn: async () => {
      const { data, error } = await supabase.from('content').select('*').eq('sheikh_id', sheikhId).is('soft_deleted_at', null).order('added_at', { ascending: false });
      if (error) throw error;
      return data as Content[];
    },
    enabled: !!sheikhId,
  });
};

export const useContentByTopic = (topicId: string) => {
  return useQuery({
    queryKey: queryKeys.content.byTopic(topicId),
    queryFn: async () => {
      const { data, error } = await supabase.from('content').select('*').contains('topics', [topicId]).is('soft_deleted_at', null).order('added_at', { ascending: false });
      if (error) throw error;
      return data as Content[];
    },
    enabled: !!topicId,
  });
};

export const useFeaturedContent = () => {
  return useQuery({
    queryKey: queryKeys.content.featured(),
    queryFn: async () => {
      const { data, error } = await supabase.from('featured_items').select('*, content(*)').eq('enabled', true).order('sort_order');
      if (error) throw error;
      return data;
    },
  });
};

export const usePopularContent = () => {
  return useQuery({
    queryKey: queryKeys.content.popular(),
    queryFn: async () => {
      const { data, error } = await supabase.from('content').select('*').is('soft_deleted_at', null).eq('state', 'published').order('added_at', { ascending: false }).limit(10);
      if (error) throw error;
      return data as Content[];
    },
  });
};

export const useTrendingContent = () => {
  return useQuery({
    queryKey: queryKeys.content.trending(),
    queryFn: async () => {
      const { data, error } = await supabase.from('content').select('*').is('soft_deleted_at', null).eq('state', 'published').order('added_at', { ascending: false }).limit(10);
      if (error) throw error;
      return data as Content[];
    },
  });
};

export const useLatestContent = () => {
  return useQuery({
    queryKey: queryKeys.content.latest(),
    queryFn: async () => {
      const { data, error } = await supabase.from('content').select('*').is('soft_deleted_at', null).eq('state', 'published').order('added_at', { ascending: false }).limit(20);
      if (error) throw error;
      return data as Content[];
    },
  });
};

export const useCreateContent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (newContent: Partial<Content>) => {
      const { data, error } = await supabase.from('content').insert(newContent as any).select().single();
      if (error) throw error;
      return data as Content;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.content.all });
    },
  });
};

export const useUpdateContent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...updates }: Partial<Content> & { id: string }) => {
      const { data, error } = await supabase.from('content').update(updates).eq('id', id).select().single();
      if (error) throw error;
      return data as Content;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.content.all });
    },
  });
};

export const useDeleteContent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('content').update({ soft_deleted_at: new Date().toISOString() }).eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.content.all });
    },
  });
};

export const useSheikhs = (filters?: Record<string, any>) => {
  return useQuery({
    queryKey: queryKeys.sheikhs.list(filters),
    queryFn: async () => {
      let query = supabase.from('sheikhs').select('*').order('name');
      if (filters?.visibility) query = query.eq('visibility', filters.visibility);
      const { data, error } = await query;
      if (error) throw error;
      return data as Sheikh[];
    },
  });
};

export const useSheikhDetail = (id: string) => {
  return useQuery({
    queryKey: queryKeys.sheikhs.detail(id),
    queryFn: async () => {
      const { data, error } = await supabase.from('sheikhs').select('*').eq('id', id).single();
      if (error) throw error;
      return data as Sheikh;
    },
    enabled: !!id,
  });
};

export const useTopics = () => {
  return useQuery({
    queryKey: queryKeys.topics.list(),
    queryFn: async () => {
      const { data, error } = await supabase.from('topics').select('*').order('name');
      if (error) throw error;
      return data as Topic[];
    },
  });
};

export const useCollections = () => {
  return useQuery({
    queryKey: queryKeys.collections.list(),
    queryFn: async () => {
      const { data, error } = await supabase.from('collections').select('*').order('sort_order');
      if (error) throw error;
      return data as Collection[];
    },
  });
};

export const useCollectionDetail = (id: string) => {
  return useQuery({
    queryKey: queryKeys.collections.detail(id),
    queryFn: async () => {
      const { data, error } = await supabase.from('collections').select('*, collection_items(*)').eq('id', id).single();
      if (error) throw error;
      return data;
    },
    enabled: !!id,
  });
};

export const useSubmissions = (state?: string) => {
  const { user, isAdmin } = useAuth();
  return useQuery({
    queryKey: queryKeys.submissions.list(state),
    queryFn: async () => {
      if (!isAdmin) return [];
      let query = supabase.from('submissions').select('*').order('created_at', { ascending: false });
      if (state) query = query.eq('state', state);
      const { data, error } = await query;
      if (error) throw error;
      return data as Submission[];
    },
    enabled: !!user && isAdmin,
  });
};

export const useAnalyticsOverview = () => {
  return useQuery({
    queryKey: queryKeys.analytics.overview,
    queryFn: async () => {
      const { data, error } = await supabase.from('analytics').select('*');
      if (error) throw error;
      return data;
    },
  });
};

export const useSearch = (query: string) => {
  return useQuery({
    queryKey: queryKeys.search.results(query),
    queryFn: async () => {
      if (!query.trim()) {
        const { data, error } = await supabase.from('content').select('*').is('soft_deleted_at', null).eq('state', 'published').order('added_at', { ascending: false }).limit(20);
        if (error) throw error;
        return { archive: data || [], external: [] };
      }
      const { data, error } = await supabase.from('content').select('*').or(`title.ilike.%` + query + `%,description.ilike.%` + query + `%`).is('soft_deleted_at', null).eq('state', 'published').limit(20);
      if (error) throw error;
      return { archive: data || [], external: [] };
    },
  });
};

export const useSearchSuggestions = (query: string) => {
  return useQuery({
    queryKey: queryKeys.search.suggestions(query),
    queryFn: async () => {
      if (!query.trim()) return [];
      const { data, error } = await supabase.from('content').select('title').or(`title.ilike.%${query}%,description.ilike.%${query}%`).is('soft_deleted_at', null).eq('state', 'published').limit(8);
      if (error) throw error;
      return data?.map((item: any) => item.title) || [];
    },
    enabled: query.trim().length > 0,
  });
};

export const useTrackView = (contentId: string) => {
  return useMutation({
    mutationFn: async () => {
      await supabase.from('analytics').insert({
        content_id: contentId,
        event_type: 'view',
        device_type: /Mobi|Android/i.test(navigator.userAgent) ? 'mobile' : 'desktop',
        browser: navigator.userAgent,
        date_time: new Date().toISOString(),
      });
    },
  });
};

export const useTrackPlay = (contentId: string) => {
  return useMutation({
    mutationFn: async (durationSeconds?: number) => {
      await supabase.from('analytics').insert({
        content_id: contentId,
        event_type: 'play',
        duration_seconds: durationSeconds || 0,
        device_type: /Mobi|Android/i.test(navigator.userAgent) ? 'mobile' : 'desktop',
        browser: navigator.userAgent,
        date_time: new Date().toISOString(),
      });
    },
  });
};

export const useTrackDownload = (contentId: string) => {
  return useMutation({
    mutationFn: async () => {
      await supabase.from('analytics').insert({
        content_id: contentId,
        event_type: 'download',
        date_time: new Date().toISOString(),
      });
    },
  });
};

export const useTrackShare = (contentId: string) => {
  return useMutation({
    mutationFn: async () => {
      await supabase.from('analytics').insert({
        content_id: contentId,
        event_type: 'share',
        date_time: new Date().toISOString(),
      });
    },
  });
};
