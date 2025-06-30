
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { Client, ClientType, ClientStatus, ClientTypeDisplay, ClientStatusDisplay } from '@/types/client';

export interface DatabaseClient {
  id: string;
  tenant_id: string;
  client_number?: string;
  name: string;
  email?: string;
  phone?: string;
  address?: any;
  client_type: ClientType;
  status: ClientStatus;
  billing_address?: any;
  payment_terms?: string;
  credit_limit?: number;
  tax_id?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
  created_by?: string;
}

// Transform database client to UI client format
const transformDatabaseClient = (dbClient: DatabaseClient): Client => {
  // Map database client_type to UI ClientType
  const typeMapping: Record<ClientType, ClientTypeDisplay> = {
    'horse_owner': 'Horse Owner',
    'veterinarian': 'Veterinarian',
    'supplier': 'Supplier',
    'trainer': 'Trainer',
    'staff': 'Staff',
    'other': 'Other'
  };

  const statusMapping: Record<ClientStatus, ClientStatusDisplay> = {
    'active': 'Active',
    'inactive': 'Inactive'
  };

  return {
    id: dbClient.id,
    tenant_id: dbClient.tenant_id,
    client_number: dbClient.client_number,
    name: dbClient.name,
    email: dbClient.email || '',
    phone: dbClient.phone || '',
    address: typeof dbClient.address === 'object' && dbClient.address ? 
      `${dbClient.address.street || ''}, ${dbClient.address.city || ''}, ${dbClient.address.country || ''}`.trim().replace(/^,\s*|,\s*$/g, '') :
      dbClient.address || '',
    client_type: dbClient.client_type,
    status: dbClient.status,
    type: typeMapping[dbClient.client_type] || 'Other', // For backward compatibility
    statusDisplay: statusMapping[dbClient.status] || 'Active', // For backward compatibility
    billing_address: dbClient.billing_address,
    payment_terms: dbClient.payment_terms,
    credit_limit: dbClient.credit_limit,
    tax_id: dbClient.tax_id,
    notes: dbClient.notes,
    created_at: dbClient.created_at,
    updated_at: dbClient.updated_at,
    created_by: dbClient.created_by,
    lastInteraction: dbClient.updated_at, // Use updated_at as last interaction
    clientNotes: [],
    communication: [],
    files: [],
    tasks: []
  };
};

export const useClients = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchClients = async () => {
    try {
      const { data, error } = await supabase
        .from('clients')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      const transformedClients = (data || []).map((dbClient: any) => 
        transformDatabaseClient(dbClient as DatabaseClient)
      );
      setClients(transformedClients);
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

  const addClient = async (clientData: Omit<Client, 'id' | 'tenant_id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No authenticated user');

      const { data: tenantData } = await supabase
        .from('tenant_users')
        .select('tenant_id')
        .eq('user_id', user.id)
        .single();

      if (!tenantData) throw new Error('No tenant found for user');

      // Transform UI client type back to database format
      const typeMapping: Record<ClientTypeDisplay, ClientType> = {
        'Horse Owner': 'horse_owner',
        'Veterinarian': 'veterinarian',
        'Supplier': 'supplier',
        'Trainer': 'trainer',
        'Staff': 'staff',
        'Other': 'other'
      };

      const statusMapping: Record<ClientStatusDisplay, ClientStatus> = {
        'Active': 'active',
        'Inactive': 'inactive'
      };

      // Parse address string back to JSON if needed
      let addressJson = null;
      if (clientData.address && typeof clientData.address === 'string') {
        const addressParts = clientData.address.split(', ');
        addressJson = {
          street: addressParts[0] || '',
          city: addressParts[1] || '',
          country: addressParts[2] || ''
        };
      }

      const { data, error } = await supabase
        .from('clients')
        .insert([{
          name: clientData.name,
          email: clientData.email,
          phone: clientData.phone,
          address: addressJson,
          client_type: typeMapping[clientData.type || 'Other'] || 'other',
          status: statusMapping[clientData.statusDisplay || 'Active'] || 'active',
          tenant_id: tenantData.tenant_id,
          created_by: user.id,
        }])
        .select()
        .single();

      if (error) throw error;

      const transformedClient = transformDatabaseClient(data as DatabaseClient);
      setClients(prev => [transformedClient, ...prev]);
      
      toast({
        title: 'Success',
        description: 'Client added successfully',
      });

      return transformedClient;
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

  const updateClient = async (id: string, updates: Partial<Client>) => {
    try {
      // Transform UI updates back to database format
      const typeMapping: Record<ClientTypeDisplay, ClientType> = {
        'Horse Owner': 'horse_owner',
        'Veterinarian': 'veterinarian',
        'Supplier': 'supplier',
        'Trainer': 'trainer',
        'Staff': 'staff',
        'Other': 'other'
      };

      const statusMapping: Record<ClientStatusDisplay, ClientStatus> = {
        'Active': 'active',
        'Inactive': 'inactive'
      };

      const dbUpdates: any = {};
      
      if (updates.name) dbUpdates.name = updates.name;
      if (updates.email) dbUpdates.email = updates.email;
      if (updates.phone) dbUpdates.phone = updates.phone;
      if (updates.type) dbUpdates.client_type = typeMapping[updates.type];
      if (updates.statusDisplay) dbUpdates.status = statusMapping[updates.statusDisplay];
      if (updates.notes) dbUpdates.notes = updates.notes;
      
      if (updates.address && typeof updates.address === 'string') {
        const addressParts = updates.address.split(', ');
        dbUpdates.address = {
          street: addressParts[0] || '',
          city: addressParts[1] || '',
          country: addressParts[2] || ''
        };
      }

      const { data, error } = await supabase
        .from('clients')
        .update(dbUpdates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      const transformedClient = transformDatabaseClient(data as DatabaseClient);
      setClients(prev => prev.map(client => client.id === id ? transformedClient : client));
      
      toast({
        title: 'Success',
        description: 'Client updated successfully',
      });

      return transformedClient;
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
