
import { useState, useEffect } from 'react';
import { Client } from '@/types/client';
import { getClientById } from '@/utils/clientUtils';

export const useClient = (clientId: string | undefined) => {
  const [client, setClient] = useState<Client | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchClient = async () => {
      if (!clientId) {
        setClient(null);
        setLoading(false);
        setError('No client ID provided');
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const clientData = await getClientById(clientId);
        setClient(clientData);
      } catch (err) {
        console.error('Error fetching client:', err);
        setError('Failed to fetch client');
        setClient(null);
      } finally {
        setLoading(false);
      }
    };

    fetchClient();
  }, [clientId]);

  return { client, loading, error, refetch: fetchClient };
};
