
import { supabase } from '@/integrations/supabase/client';
import { Client, ClientType, ClientStatus, ClientTypeDisplay, ClientStatusDisplay } from '@/types/client';

// Transform database client to UI client format
const transformDatabaseClient = (dbClient: any): Client => {
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
    type: typeMapping[dbClient.client_type] || 'Other',
    statusDisplay: statusMapping[dbClient.status] || 'Active',
    billing_address: dbClient.billing_address,
    payment_terms: dbClient.payment_terms,
    credit_limit: dbClient.credit_limit,
    tax_id: dbClient.tax_id,
    notes: dbClient.notes,
    created_at: dbClient.created_at,
    updated_at: dbClient.updated_at,
    created_by: dbClient.created_by,
    lastInteraction: dbClient.updated_at,
    clientNotes: [],
    communication: [],
    files: [],
    tasks: []
  };
};

export const getClientById = async (id: string): Promise<Client | null> => {
  try {
    const { data, error } = await supabase
      .from('clients')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching client:', error);
      return null;
    }

    return transformDatabaseClient(data);
  } catch (error) {
    console.error('Error fetching client by ID:', error);
    return null;
  }
};
