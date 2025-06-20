
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

export interface Medication {
  id: string;
  tenant_id: string;
  horse_id: string;
  medication_name: string;
  medication_type: 'antibiotic' | 'anti_inflammatory' | 'pain_reliever' | 'supplement' | 'dewormer' | 'vaccine' | 'other';
  dosage: string;
  frequency: string;
  route_of_administration?: 'oral' | 'injection' | 'topical' | 'intravenous' | 'intramuscular' | 'subcutaneous';
  start_date: string;
  end_date?: string;
  prescribed_by: string;
  reason_for_treatment?: string;
  instructions?: string;
  side_effects?: string;
  status: 'active' | 'completed' | 'discontinued' | 'paused';
  cost?: number;
  veterinarian_id?: string;
  health_record_id?: string;
  created_at: string;
  updated_at: string;
  created_by?: string;
}

export const useMedications = () => {
  const [medications, setMedications] = useState<Medication[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchMedications = async () => {
    try {
      const { data, error } = await supabase
        .from('medications')
        .select('*')
        .order('start_date', { ascending: false });

      if (error) throw error;
      
      // Type-safe mapping of the data
      const typedData = (data || []).map(medication => ({
        ...medication,
        medication_type: medication.medication_type as Medication['medication_type'],
        route_of_administration: medication.route_of_administration as Medication['route_of_administration'],
        status: medication.status as Medication['status'],
      }));
      
      setMedications(typedData);
    } catch (error) {
      console.error('Error fetching medications:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch medications',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const addMedication = async (medication: Omit<Medication, 'id' | 'tenant_id' | 'created_at' | 'updated_at'>) => {
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
        .from('medications')
        .insert([{
          ...medication,
          tenant_id: tenantData.tenant_id,
          created_by: user.id,
        }])
        .select()
        .single();

      if (error) throw error;

      const typedData = {
        ...data,
        medication_type: data.medication_type as Medication['medication_type'],
        route_of_administration: data.route_of_administration as Medication['route_of_administration'],
        status: data.status as Medication['status'],
      };

      setMedications(prev => [typedData, ...prev]);
      toast({
        title: 'Success',
        description: 'Medication record added successfully',
      });

      return typedData;
    } catch (error) {
      console.error('Error adding medication:', error);
      toast({
        title: 'Error',
        description: 'Failed to add medication record',
        variant: 'destructive',
      });
      throw error;
    }
  };

  const updateMedication = async (id: string, updates: Partial<Medication>) => {
    try {
      const { data, error } = await supabase
        .from('medications')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      const typedData = {
        ...data,
        medication_type: data.medication_type as Medication['medication_type'],
        route_of_administration: data.route_of_administration as Medication['route_of_administration'],
        status: data.status as Medication['status'],
      };

      setMedications(prev => prev.map(med => med.id === id ? typedData : med));
      toast({
        title: 'Success',
        description: 'Medication record updated successfully',
      });

      return typedData;
    } catch (error) {
      console.error('Error updating medication:', error);
      toast({
        title: 'Error',
        description: 'Failed to update medication record',
        variant: 'destructive',
      });
      throw error;
    }
  };

  const deleteMedication = async (id: string) => {
    try {
      const { error } = await supabase
        .from('medications')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setMedications(prev => prev.filter(med => med.id !== id));
      toast({
        title: 'Success',
        description: 'Medication record deleted successfully',
      });
    } catch (error) {
      console.error('Error deleting medication:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete medication record',
        variant: 'destructive',
      });
      throw error;
    }
  };

  useEffect(() => {
    fetchMedications();
  }, []);

  return {
    medications,
    loading,
    addMedication,
    updateMedication,
    deleteMedication,
    refetch: fetchMedications,
  };
};
