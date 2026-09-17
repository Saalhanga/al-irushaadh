import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { Event } from '@/lib/types';
import { queryKeys } from '@/lib/query-keys';

export const useEvents = () => {
  return useQuery({
    queryKey: queryKeys.events.list(),
    queryFn: async () => {
      const { data, error } = await supabase.from('events').select('*').order('date', { ascending: true });
      if (error) throw error;
      return data as Event[];
    },
  });
};

export const useCreateEvent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (event: Partial<Event>) => {
      const { data, error } = await supabase.from('events').insert(event).select().single();
      if (error) throw error;
      return data as Event;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.events.all });
    },
  });
};

export const useUpdateEvent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...updates }: Partial<Event> & { id: string }) => {
      const { data, error } = await supabase.from('events').update(updates).eq('id', id).select().single();
      if (error) throw error;
      return data as Event;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.events.all });
    },
  });
};

export const useDeleteEvent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('events').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.events.all });
    },
  });
};
