
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

export interface Vaccination {
  id: string;
  tenant_id: string;
  horse_id: string;
  vaccine_name: string;
  vaccine_type: 'core' | 'risk_based' | 'required' | 'optional';
  manufacturer?: string;
  batch_number?: string;
  vaccination_date: string;
  administered_by: string;
  next_due_date?: string;
  site_of_injection?: string;
  dose_amount?: string;
  reaction_notes?: string;
  certificate_number?: string;
  status: 'scheduled' | 'completed' | 'overdue' | 'cancelled';
  cost?: number;
  veterinarian_id?: string;
  created_at: string;
  updated_at: string;
  created_by?: string;
}

export const useVaccinations = () => {
  const [vaccinations, setVaccinations] = useState<Vaccination[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchVaccinations = async () => {
    try {
      const { data, error } = await supabase
        .from('vaccinations')
        .select('*')
        .order('vaccination_date', { ascending: false });

      if (error) throw error;
      
      // Type-safe mapping of the data
      const typedData = (data || []).map(vaccination => ({
        ...vaccination,
        vaccine_type: vaccination.vaccine_type as Vaccination['vaccine_type'],
        status: vaccination.status as Vaccination['status'],
      }));
      
      setVaccinations(typedData);
    } catch (error) {
      console.error('Error fetching vaccinations:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch vaccinations',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const addVaccination = async (vaccination: Omit<Vaccination, 'id' | 'tenant_id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No authenticated user');

      const { data: tenantData } = await supabase
        .from('tenant_users')
        .select('tenant_id')
        .eq('user_id', user.id)
        .single();

      if (!tenantData) throw new Error('No tenant found for user');

      const { data, error } = await supabase
        .from('vaccinations')
        .insert([{
          ...vaccination,
          tenant_id: tenantData.tenant_id,
          created_by: user.id,
        }])
        .select()
        .single();

      if (error) throw error;

      const typedData = {
        ...data,
        vaccine_type: data.vaccine_type as Vaccination['vaccine_type'],
        status: data.status as Vaccination['status'],
      };

      setVaccinations(prev => [typedData, ...prev]);
      toast({
        title: 'Success',
        description: 'Vaccination record added successfully',
      });

      return typedData;
    } catch (error) {
      console.error('Error adding vaccination:', error);
      toast({
        title: 'Error',
        description: 'Failed to add vaccination record',
        variant: 'destructive',
      });
      throw error;
    }
  };

  const updateVaccination = async (id: string, updates: Partial<Vaccination>) => {
    try {
      const { data, error } = await supabase
        .from('vaccinations')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      const typedData = {
        ...data,
        vaccine_type: data.vaccine_type as Vaccination['vaccine_type'],
        status: data.status as Vaccination['status'],
      };

      setVaccinations(prev => prev.map(vacc => vacc.id === id ? typedData : vacc));
      toast({
        title: 'Success',
        description: 'Vaccination record updated successfully',
      });

      return typedData;
    } catch (error) {
      console.error('Error updating vaccination:', error);
      toast({
        title: 'Error',
        description: 'Failed to update vaccination record',
        variant: 'destructive',
      });
      throw error;
    }
  };

  const deleteVaccination = async (id: string) => {
    try {
      const { error } = await supabase
        .from('vaccinations')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setVaccinations(prev => prev.filter(vacc => vacc.id !== id));
      toast({
        title: 'Success',
        description: 'Vaccination record deleted successfully',
      });
    } catch (error) {
      console.error('Error deleting vaccination:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete vaccination record',
        variant: 'destructive',
      });
      throw error;
    }
  };

  useEffect(() => {
    fetchVaccinations();
  }, []);

  return {
    vaccinations,
    loading,
    addVaccination,
    updateVaccination,
    deleteVaccination,
    refetch: fetchVaccinations,
  };
};
