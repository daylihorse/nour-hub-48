
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

export interface Veterinarian {
  id: string;
  tenant_id: string;
  name: string;
  license_number?: string;
  specialty?: string;
  clinic_name?: string;
  phone?: string;
  email?: string;
  address?: any;
  emergency_contact: boolean;
  consultation_fee?: number;
  travel_fee?: number;
  notes?: string;
  status: 'active' | 'inactive';
  created_at: string;
  updated_at: string;
  created_by?: string;
}

export const useVeterinarians = () => {
  const [veterinarians, setVeterinarians] = useState<Veterinarian[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchVeterinarians = async () => {
    try {
      const { data, error } = await supabase
        .from('veterinarians')
        .select('*')
        .order('name');

      if (error) throw error;
      
      // Type-safe mapping of the data
      const typedData = (data || []).map(vet => ({
        ...vet,
        status: vet.status as Veterinarian['status'],
      }));
      
      setVeterinarians(typedData);
    } catch (error) {
      console.error('Error fetching veterinarians:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch veterinarians',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const addVeterinarian = async (veterinarian: Omit<Veterinarian, 'id' | 'tenant_id' | 'created_at' | 'updated_at'>) => {
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
        .from('veterinarians')
        .insert([{
          ...veterinarian,
          tenant_id: tenantData.tenant_id,
          created_by: user.id,
        }])
        .select()
        .single();

      if (error) throw error;

      const typedData = {
        ...data,
        status: data.status as Veterinarian['status'],
      };

      setVeterinarians(prev => [typedData, ...prev]);
      toast({
        title: 'Success',
        description: 'Veterinarian added successfully',
      });

      return typedData;
    } catch (error) {
      console.error('Error adding veterinarian:', error);
      toast({
        title: 'Error',
        description: 'Failed to add veterinarian',
        variant: 'destructive',
      });
      throw error;
    }
  };

  const updateVeterinarian = async (id: string, updates: Partial<Veterinarian>) => {
    try {
      const { data, error } = await supabase
        .from('veterinarians')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      const typedData = {
        ...data,
        status: data.status as Veterinarian['status'],
      };

      setVeterinarians(prev => prev.map(vet => vet.id === id ? typedData : vet));
      toast({
        title: 'Success',
        description: 'Veterinarian updated successfully',
      });

      return typedData;
    } catch (error) {
      console.error('Error updating veterinarian:', error);
      toast({
        title: 'Error',
        description: 'Failed to update veterinarian',
        variant: 'destructive',
      });
      throw error;
    }
  };

  const deleteVeterinarian = async (id: string) => {
    try {
      const { error } = await supabase
        .from('veterinarians')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setVeterinarians(prev => prev.filter(vet => vet.id !== id));
      toast({
        title: 'Success',
        description: 'Veterinarian deleted successfully',
      });
    } catch (error) {
      console.error('Error deleting veterinarian:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete veterinarian',
        variant: 'destructive',
      });
      throw error;
    }
  };

  useEffect(() => {
    fetchVeterinarians();
  }, []);

  return {
    veterinarians,
    loading,
    addVeterinarian,
    updateVeterinarian,
    deleteVeterinarian,
    refetch: fetchVeterinarians,
  };
};
