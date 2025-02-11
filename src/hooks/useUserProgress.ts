
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useUser } from "@supabase/auth-helpers-react";

export interface UserProgress {
  id: string;
  user_id: string;
  item_key: string;
  completed: boolean;
  completed_at: string | null;
  created_at: string;
}

export function useUserProgress() {
  const user = useUser();
  const queryClient = useQueryClient();

  const { data: progress, isLoading } = useQuery({
    queryKey: ['userProgress', user?.id],
    queryFn: async (): Promise<UserProgress[]> => {
      if (!user) throw new Error("User not authenticated");

      const { data, error } = await supabase
        .from('user_progress')
        .select('*')
        .order('created_at', { ascending: true });

      if (error) throw error;
      return data;
    },
    enabled: !!user
  });

  const updateProgress = useMutation({
    mutationFn: async (itemKey: string) => {
      if (!user) throw new Error("User not authenticated");

      const { data, error } = await supabase
        .from('user_progress')
        .upsert({
          user_id: user.id,
          item_key: itemKey,
          completed: true,
          completed_at: new Date().toISOString()
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userProgress'] });
    }
  });

  return {
    progress,
    isLoading,
    updateProgress: updateProgress.mutate
  };
}
