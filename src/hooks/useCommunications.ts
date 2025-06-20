
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

export interface Communication {
  id: string;
  tenant_id: string;
  communication_type: string;
  subject?: string;
  content: string;
  direction: string;
  contact_person?: string;
  contact_info?: any;
  client_id?: string;
  horse_id?: string;
  employee_id?: string;
  status: string;
  scheduled_at?: string;
  completed_at?: string;
  attachments?: any[];
  created_at: string;
  updated_at: string;
  created_by?: string;
}

export const useCommunications = () => {
  const [communications, setCommunications] = useState<Communication[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCommunications = async () => {
    try {
      const { data, error } = await supabase
        .from('communications')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      // Transform the data to match our interface
      const transformedData: Communication[] = (data || []).map(item => ({
        ...item,
        contact_info: item.contact_info || {},
        attachments: Array.isArray(item.attachments) ? item.attachments : []
      }));
      
      setCommunications(transformedData);
    } catch (error) {
      console.error('Error fetching communications:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch communications',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const addCommunication = async (communication: Omit<Communication, 'id' | 'tenant_id' | 'created_at' | 'updated_at'>) => {
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
        .from('communications')
        .insert([{
          ...communication,
          tenant_id: tenantData.tenant_id,
          created_by: user.id,
        }])
        .select()
        .single();

      if (error) throw error;

      const transformedData: Communication = {
        ...data,
        contact_info: data.contact_info || {},
        attachments: Array.isArray(data.attachments) ? data.attachments : []
      };

      setCommunications(prev => [transformedData, ...prev]);
      toast({
        title: 'Success',
        description: 'Communication logged successfully',
      });

      return transformedData;
    } catch (error) {
      console.error('Error adding communication:', error);
      toast({
        title: 'Error',
        description: 'Failed to log communication',
        variant: 'destructive',
      });
      throw error;
    }
  };

  const updateCommunication = async (id: string, updates: Partial<Communication>) => {
    try {
      const { data, error } = await supabase
        .from('communications')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      const transformedData: Communication = {
        ...data,
        contact_info: data.contact_info || {},
        attachments: Array.isArray(data.attachments) ? data.attachments : []
      };

      setCommunications(prev => prev.map(comm => comm.id === id ? transformedData : comm));
      toast({
        title: 'Success',
        description: 'Communication updated successfully',
      });

      return transformedData;
    } catch (error) {
      console.error('Error updating communication:', error);
      toast({
        title: 'Error',
        description: 'Failed to update communication',
        variant: 'destructive',
      });
      throw error;
    }
  };

  useEffect(() => {
    fetchCommunications();
  }, []);

  return {
    communications,
    loading,
    addCommunication,
    updateCommunication,
    refetch: fetchCommunications,
  };
};
