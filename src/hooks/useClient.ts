
import { useState, useEffect } from 'react';
import { Client } from '@/types/client';
import { getClientById } from '@/utils/clientUtils';

export const useClient = (clientId: string | undefined) => {
  const [client, setClient] = useState<Client | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchClientData = async () => {
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

    fetchClientData();
  }, [clientId]);

  const refetch = async () => {
    if (!clientId) return;
    
    try {
      setLoading(true);
      setError(null);
      const clientData = await getClientById(clientId);
      setClient(clientData);
    } catch (err) {
      console.error('Error refetching client:', err);
      setError('Failed to fetch client');
      setClient(null);
    } finally {
      setLoading(false);
    }
  };

  return { client, loading, error, refetch };
};
