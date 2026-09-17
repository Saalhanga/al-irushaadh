import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { Sheikh, Topic, Collection, Submission, Review, FeaturedItem } from '@/lib/types';
import { queryKeys } from '@/lib/query-keys';
import { useAuth } from '@/hooks/use-auth';

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

export const useContentBySheikh = (sheikhId: string) => {
  return useQuery({
    queryKey: ['content', 'sheikh', sheikhId],
    queryFn: async () => {
      const { data, error } = await supabase.from('content').select('*').eq('sheikh_id', sheikhId).is('soft_deleted_at', null).order('added_at', { ascending: false });
      if (error) throw error;
      return data as any[];
    },
    enabled: !!sheikhId,
  });
};

export const useCreateSheikh = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (sheikh: Partial<Sheikh>) => {
      const { data, error } = await supabase.from('sheikhs').insert(sheikh as any).select().single();
      if (error) throw error;
      return data as Sheikh;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.sheikhs.all });
    },
  });
};

export const useUpdateSheikh = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...updates }: Partial<Sheikh> & { id: string }) => {
      const { data, error } = await supabase.from('sheikhs').update(updates).eq('id', id).select().single();
      if (error) throw error;
      return data as Sheikh;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.sheikhs.all });
    },
  });
};

export const useDeleteSheikh = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('sheikhs').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.sheikhs.all });
    },
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

export const useTopicDetail = (id: string) => {
  return useQuery({
    queryKey: queryKeys.topics.detail(id),
    queryFn: async () => {
      const { data, error } = await supabase.from('topics').select('*').eq('id', id).single();
      if (error) throw error;
      return data as Topic;
    },
    enabled: !!id,
  });
};

export const useCreateTopic = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (topic: Partial<Topic>) => {
      const { data, error } = await supabase.from('topics').insert(topic as any).select().single();
      if (error) throw error;
      return data as Topic;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.topics.all });
    },
  });
};

export const useUpdateTopic = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...updates }: Partial<Topic> & { id: string }) => {
      const { data, error } = await supabase.from('topics').update(updates).eq('id', id).select().single();
      if (error) throw error;
      return data as Topic;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.topics.all });
    },
  });
};

export const useDeleteTopic = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('topics').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.topics.all });
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

export const useCreateCollection = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (collection: Partial<Collection>) => {
      const { data, error } = await supabase.from('collections').insert(collection as any).select().single();
      if (error) throw error;
      return data as Collection;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.collections.all });
    },
  });
};

export const useUpdateCollection = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...updates }: Partial<Collection> & { id: string }) => {
      const { data, error } = await supabase.from('collections').update(updates).eq('id', id).select().single();
      if (error) throw error;
      return data as Collection;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.collections.all });
    },
  });
};

export const useDeleteCollection = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('collections').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.collections.all });
    },
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

export const useCreateSubmission = () => {
  return useMutation({
    mutationFn: async (submission: Partial<Submission>) => {
      const { data, error } = await supabase.from('submissions').insert(submission as any).select().single();
      if (error) throw error;
      return data as Submission;
    },
  });
};

export const useUpdateSubmission = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...updates }: Partial<Submission> & { id: string }) => {
      const { data, error } = await supabase.from('submissions').update(updates).eq('id', id).select().single();
      if (error) throw error;
      return data as Submission;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.submissions.all });
    },
  });
};

export const useReviews = (state?: string) => {
  const { user, isAdmin } = useAuth();
  return useQuery({
    queryKey: queryKeys.reviews.list(state),
    queryFn: async () => {
      if (!isAdmin) return [];
      let query = supabase.from('reviews').select('*').order('created_at', { ascending: false });
      if (state) query = query.eq('state', state);
      const { data, error } = await query;
      if (error) throw error;
      return data as Review[];
    },
    enabled: !!user && isAdmin,
  });
};

export const useFeaturedItems = () => {
  return useQuery({
    queryKey: queryKeys.featured.list(),
    queryFn: async () => {
      const { data, error } = await supabase.from('featured_items').select('*, content(*)').order('sort_order');
      if (error) throw error;
      return data;
    },
  });
};

export const useCreateFeaturedItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (item: Partial<FeaturedItem>) => {
      const { data, error } = await supabase.from('featured_items').insert(item as any).select().single();
      if (error) throw error;
      return data as FeaturedItem;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.featured.all });
    },
  });
};

export const useUpdateFeaturedItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...updates }: Partial<FeaturedItem> & { id: string }) => {
      const { data, error } = await supabase.from('featured_items').update(updates).eq('id', id).select().single();
      if (error) throw error;
      return data as FeaturedItem;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.featured.all });
    },
  });
};

export const useDeleteFeaturedItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('featured_items').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.featured.all });
    },
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
      if (!query.trim()) return { archive: [], external: [] };
      const { data, error } = await supabase.from('content').select('*').or(`title.ilike.%${query}%,description.ilike.%${query}%,tags.cs.{${query}}`).is('soft_deleted_at', null).eq('state', 'published').limit(20);
      if (error) throw error;
      return { archive: data || [], external: [] };
    },
    enabled: query.trim().length > 0,
  });
};

export const useSearchSuggestions = (query: string) => {
  return useQuery({
    queryKey: queryKeys.search.suggestions(query),
    queryFn: async () => {
      if (!query.trim()) return [];
      const { data, error } = await supabase.from('content').select('title').or(`title.ilike.%${query}%`).is('soft_deleted_at', null).eq('state', 'published').limit(8);
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
