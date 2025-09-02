import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';

type Briefing = {
  id: string;
  user_id: string;
  title: string;
  content: any;
  status: string;
  priority: string | null;
  created_at: string;
  updated_at: string;
};

type BriefingInsert = Omit<Briefing, 'id' | 'user_id' | 'created_at' | 'updated_at'>;
type BriefingUpdate = Partial<Omit<Briefing, 'id' | 'user_id' | 'created_at'>>;

export const useBriefings = () => {
  const [briefings, setBriefings] = useState<Briefing[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  // Fetch all briefings for the current user
  const fetchBriefings = async () => {
    if (!user) return;

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('betihub_briefings')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setBriefings(data || []);
    } catch (error: any) {
      toast({
        title: "Erro ao carregar briefings",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Create a new briefing
  const createBriefing = async (briefingData: Omit<BriefingInsert, 'user_id'>) => {
    if (!user) return null;

    try {
      const { data, error } = await supabase
        .from('betihub_briefings')
        .insert([{
          ...briefingData,
          user_id: user.id,
        }])
        .select()
        .single();

      if (error) throw error;

      setBriefings(prev => [data, ...prev]);
      toast({
        title: "Briefing criado com sucesso",
        description: "Seu briefing foi salvo no sistema.",
      });

      return data;
    } catch (error: any) {
      toast({
        title: "Erro ao criar briefing",
        description: error.message,
        variant: "destructive",
      });
      return null;
    }
  };

  // Update an existing briefing
  const updateBriefing = async (id: string, updates: BriefingUpdate) => {
    if (!user) return null;

    try {
      const { data, error } = await supabase
        .from('betihub_briefings')
        .update(updates)
        .eq('id', id)
        .eq('user_id', user.id)
        .select()
        .single();

      if (error) throw error;

      setBriefings(prev =>
        prev.map(briefing =>
          briefing.id === id ? data : briefing
        )
      );

      toast({
        title: "Briefing atualizado",
        description: "As alterações foram salvas com sucesso.",
      });

      return data;
    } catch (error: any) {
      toast({
        title: "Erro ao atualizar briefing",
        description: error.message,
        variant: "destructive",
      });
      return null;
    }
  };

  // Delete a briefing
  const deleteBriefing = async (id: string) => {
    if (!user) return false;

    try {
      const { error } = await supabase
        .from('betihub_briefings')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);

      if (error) throw error;

      setBriefings(prev => prev.filter(briefing => briefing.id !== id));
      toast({
        title: "Briefing excluído",
        description: "O briefing foi removido com sucesso.",
      });

      return true;
    } catch (error: any) {
      toast({
        title: "Erro ao excluir briefing",
        description: error.message,
        variant: "destructive",
      });
      return false;
    }
  };

  // Get a single briefing by ID
  const getBriefing = async (id: string) => {
    if (!user) return null;

    try {
      const { data, error } = await supabase
        .from('betihub_briefings')
        .select('*')
        .eq('id', id)
        .eq('user_id', user.id)
        .single();

      if (error) throw error;
      return data;
    } catch (error: any) {
      toast({
        title: "Erro ao carregar briefing",
        description: error.message,
        variant: "destructive",
      });
      return null;
    }
  };

  useEffect(() => {
    if (user) {
      fetchBriefings();
    }
  }, [user]);

  return {
    briefings,
    loading,
    createBriefing,
    updateBriefing,
    deleteBriefing,
    getBriefing,
    refetch: fetchBriefings,
  };
};