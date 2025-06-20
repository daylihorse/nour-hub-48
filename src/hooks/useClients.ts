
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

export interface DatabaseClient {
  id: string;
  tenant_id: string;
  client_number?: string;
  name: string;
  email?: string;
  phone?: string;
  address?: any;
  client_type: 'horse_owner' | 'veterinarian' | 'supplier' | 'trainer' | 'staff' | 'other';
  status: 'active' | 'inactive';
  billing_address?: any;
  payment_terms?: string;
  credit_limit?: number;
  tax_id?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
  created_by?: string;
}

export const useClients = () => {
  const [clients, setClients] = useState<DatabaseClient[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchClients = async () => {
    try {
      const { data, error } = await supabase
        .from('clients')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      // Type cast the data to ensure proper typing
      const typedData = (data || []).map(client => ({
        ...client,
        client_type: client.client_type as 'horse_owner' | 'veterinarian' | 'supplier' | 'trainer' | 'staff' | 'other',
        status: client.status as 'active' | 'inactive'
      })) as DatabaseClient[];
      
      setClients(typedData);
    } catch (error) {
      console.error('Error fetching clients:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch clients',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const addClient = async (client: Omit<DatabaseClient, 'id' | 'tenant_id' | 'created_at' | 'updated_at'>) => {
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
        .from('clients')
        .insert([{
          ...client,
          tenant_id: tenantData.tenant_id,
          created_by: user.id,
        }])
        .select()
        .single();

      if (error) throw error;

      // Type cast the returned data
      const typedClient = {
        ...data,
        client_type: data.client_type as 'horse_owner' | 'veterinarian' | 'supplier' | 'trainer' | 'staff' | 'other',
        status: data.status as 'active' | 'inactive'
      } as DatabaseClient;

      setClients(prev => [typedClient, ...prev]);
      toast({
        title: 'Success',
        description: 'Client added successfully',
      });

      return typedClient;
    } catch (error) {
      console.error('Error adding client:', error);
      toast({
        title: 'Error',
        description: 'Failed to add client',
        variant: 'destructive',
      });
      throw error;
    }
  };

  const updateClient = async (id: string, updates: Partial<DatabaseClient>) => {
    try {
      const { data, error } = await supabase
        .from('clients')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      // Type cast the returned data
      const typedClient = {
        ...data,
        client_type: data.client_type as 'horse_owner' | 'veterinarian' | 'supplier' | 'trainer' | 'staff' | 'other',
        status: data.status as 'active' | 'inactive'
      } as DatabaseClient;

      setClients(prev => prev.map(client => client.id === id ? typedClient : client));
      toast({
        title: 'Success',
        description: 'Client updated successfully',
      });

      return typedClient;
    } catch (error) {
      console.error('Error updating client:', error);
      toast({
        title: 'Error',
        description: 'Failed to update client',
        variant: 'destructive',
      });
      throw error;
    }
  };

  const deleteClient = async (id: string) => {
    try {
      const { error } = await supabase
        .from('clients')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setClients(prev => prev.filter(client => client.id !== id));
      toast({
        title: 'Success',
        description: 'Client deleted successfully',
      });
    } catch (error) {
      console.error('Error deleting client:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete client',
        variant: 'destructive',
      });
      throw error;
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  return {
    clients,
    loading,
    addClient,
    updateClient,
    deleteClient,
    refetch: fetchClients,
  };
};
