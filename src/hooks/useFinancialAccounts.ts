
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

export interface FinancialAccount {
  id: string;
  tenant_id: string;
  account_code: string;
  account_name: string;
  account_type: string;
  parent_account_id?: string;
  balance: number;
  is_active: boolean;
  description?: string;
  created_at: string;
  updated_at: string;
  created_by?: string;
}

export const useFinancialAccounts = () => {
  const [accounts, setAccounts] = useState<FinancialAccount[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchAccounts = async () => {
    try {
      const { data, error } = await supabase
        .from('financial_accounts')
        .select('*')
        .eq('is_active', true)
        .order('account_code');

      if (error) throw error;
      setAccounts(data as FinancialAccount[] || []);
    } catch (error) {
      console.error('Error fetching financial accounts:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch financial accounts',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const addAccount = async (account: Omit<FinancialAccount, 'id' | 'tenant_id' | 'created_at' | 'updated_at'>) => {
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
        .from('financial_accounts')
        .insert([{
          ...account,
          tenant_id: tenantData.tenant_id,
          created_by: user.id,
        }])
        .select()
        .single();

      if (error) throw error;

      setAccounts(prev => [...prev, data as FinancialAccount]);
      toast({
        title: 'Success',
        description: 'Financial account added successfully',
      });

      return data;
    } catch (error) {
      console.error('Error adding financial account:', error);
      toast({
        title: 'Error',
        description: 'Failed to add financial account',
        variant: 'destructive',
      });
      throw error;
    }
  };

  const updateAccount = async (id: string, updates: Partial<FinancialAccount>) => {
    try {
      const { data, error } = await supabase
        .from('financial_accounts')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      setAccounts(prev => prev.map(acc => acc.id === id ? data as FinancialAccount : acc));
      toast({
        title: 'Success',
        description: 'Financial account updated successfully',
      });

      return data;
    } catch (error) {
      console.error('Error updating financial account:', error);
      toast({
        title: 'Error',
        description: 'Failed to update financial account',
        variant: 'destructive',
      });
      throw error;
    }
  };

  useEffect(() => {
    fetchAccounts();
  }, []);

  return {
    accounts,
    loading,
    addAccount,
    updateAccount,
    refetch: fetchAccounts,
  };
};
