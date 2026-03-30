import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export const useDonationProgress = () => {
  return useQuery({
    queryKey: ['donation-progress'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('donation_progress')
        .select('*')
        .limit(1)
        .single();
      if (error) throw error;
      return data;
    },
  });
};

export const useBankAccounts = () => {
  return useQuery({
    queryKey: ['bank-accounts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('bank_accounts')
        .select('*')
        .eq('is_active', true);
      if (error) throw error;
      return data;
    },
  });
};

export const useProjectImages = () => {
  return useQuery({
    queryKey: ['project-images'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('project_images')
        .select('*')
        .order('sort_order');
      if (error) throw error;
      return data;
    },
  });
};
