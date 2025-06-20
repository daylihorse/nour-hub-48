
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

export interface InvoiceItem {
  id: string;
  invoice_id: string;
  item_type: string;
  description: string;
  quantity: number;
  unit_price: number;
  line_total: number;
  horse_id?: string;
  service_date?: string;
  created_at: string;
}

export interface Invoice {
  id: string;
  tenant_id: string;
  invoice_number: string;
  client_id?: string;
  invoice_date: string;
  due_date: string;
  subtotal: number;
  tax_amount: number;
  discount_amount: number;
  total_amount: number;
  paid_amount: number;
  status: string;
  payment_terms?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
  created_by?: string;
  invoice_items?: InvoiceItem[];
}

export const useInvoices = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchInvoices = async () => {
    try {
      const { data, error } = await supabase
        .from('invoices')
        .select(`
          *,
          invoice_items (*)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setInvoices(data as Invoice[] || []);
    } catch (error) {
      console.error('Error fetching invoices:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch invoices',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const addInvoice = async (invoice: Omit<Invoice, 'id' | 'tenant_id' | 'created_at' | 'updated_at'>) => {
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
        .from('invoices')
        .insert([{
          ...invoice,
          tenant_id: tenantData.tenant_id,
          created_by: user.id,
        }])
        .select()
        .single();

      if (error) throw error;

      setInvoices(prev => [data as Invoice, ...prev]);
      toast({
        title: 'Success',
        description: 'Invoice created successfully',
      });

      return data;
    } catch (error) {
      console.error('Error adding invoice:', error);
      toast({
        title: 'Error',
        description: 'Failed to create invoice',
        variant: 'destructive',
      });
      throw error;
    }
  };

  const updateInvoice = async (id: string, updates: Partial<Invoice>) => {
    try {
      const { data, error } = await supabase
        .from('invoices')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      setInvoices(prev => prev.map(inv => inv.id === id ? data as Invoice : inv));
      toast({
        title: 'Success',
        description: 'Invoice updated successfully',
      });

      return data;
    } catch (error) {
      console.error('Error updating invoice:', error);
      toast({
        title: 'Error',
        description: 'Failed to update invoice',
        variant: 'destructive',
      });
      throw error;
    }
  };

  useEffect(() => {
    fetchInvoices();
  }, []);

  return {
    invoices,
    loading,
    addInvoice,
    updateInvoice,
    refetch: fetchInvoices,
  };
};
