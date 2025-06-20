
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface Trainer {
  id: string;
  tenant_id: string;
  first_name: string;
  last_name: string;
  email?: string;
  phone?: string;
  specializations: string[];
  certifications: string[];
  experience_years?: number;
  hourly_rate?: number;
  status: 'active' | 'inactive' | 'on_leave';
  emergency_contact?: any;
  availability_schedule?: any;
  bio?: string;
  profile_image_url?: string;
  created_at: string;
  updated_at: string;
  created_by?: string;
}

export const useTrainers = () => {
  const [trainers, setTrainers] = useState<Trainer[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTrainers = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('trainers')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching trainers:', error);
        return;
      }

      // Type cast the data to match our Trainer interface
      setTrainers((data || []) as Trainer[]);
    } catch (error) {
      console.error('Error fetching trainers:', error);
    } finally {
      setLoading(false);
    }
  };

  const addTrainer = async (trainerData: Omit<Trainer, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await supabase
        .from('trainers')
        .insert([trainerData])
        .select()
        .single();

      if (error) {
        console.error('Error adding trainer:', error);
        return null;
      }

      // Type cast the returned data
      const newTrainer = data as Trainer;
      setTrainers(prev => [newTrainer, ...prev]);
      return newTrainer;
    } catch (error) {
      console.error('Error adding trainer:', error);
      return null;
    }
  };

  const updateTrainer = async (id: string, updates: Partial<Trainer>) => {
    try {
      const { data, error } = await supabase
        .from('trainers')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error('Error updating trainer:', error);
        return null;
      }

      // Type cast the returned data
      const updatedTrainer = data as Trainer;
      setTrainers(prev => prev.map(trainer => 
        trainer.id === id ? { ...trainer, ...updatedTrainer } : trainer
      ));
      return updatedTrainer;
    } catch (error) {
      console.error('Error updating trainer:', error);
      return null;
    }
  };

  const deleteTrainer = async (id: string) => {
    try {
      const { error } = await supabase
        .from('trainers')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting trainer:', error);
        return false;
      }

      setTrainers(prev => prev.filter(trainer => trainer.id !== id));
      return true;
    } catch (error) {
      console.error('Error deleting trainer:', error);
      return false;
    }
  };

  useEffect(() => {
    fetchTrainers();
  }, []);

  return {
    trainers,
    loading,
    addTrainer,
    updateTrainer,
    deleteTrainer,
    refetch: fetchTrainers
  };
};
