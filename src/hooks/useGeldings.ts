
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Horse } from "@/types/horse-unified";

export const useGeldings = () => {
  return useQuery({
    queryKey: ['geldings'],
    queryFn: async (): Promise<Horse[]> => {
      const { data, error } = await supabase
        .from('horses')
        .select('*')
        .eq('gender', 'gelding')
        .eq('status', 'active');

      if (error) {
        console.error('Error fetching geldings:', error);
        throw error;
      }

      return data || [];
    },
  });
};
