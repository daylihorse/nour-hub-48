
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

export interface MedicalAlert {
  id: string;
  tenant_id: string;
  horse_id: string;
  alert_type: 'vaccination_due' | 'medication_reminder' | 'checkup_due' | 'emergency' | 'follow_up' | 'custom';
  title: string;
  description?: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  due_date?: string;
  status: 'active' | 'acknowledged' | 'resolved' | 'dismissed';
  related_record_type?: 'health_record' | 'vaccination' | 'medication';
  related_record_id?: string;
  acknowledged_at?: string;
  acknowledged_by?: string;
  resolved_at?: string;
  resolved_by?: string;
  auto_generated: boolean;
  created_at: string;
  updated_at: string;
  created_by?: string;
}

export const useMedicalAlerts = () => {
  const [alerts, setAlerts] = useState<MedicalAlert[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchAlerts = async () => {
    try {
      const { data, error } = await supabase
        .from('medical_alerts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      setAlerts(data || []);
    } catch (error) {
      console.error('Error fetching medical alerts:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch medical alerts',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const addAlert = async (alert: Omit<MedicalAlert, 'id' | 'tenant_id' | 'created_at' | 'updated_at'>) => {
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
        .from('medical_alerts')
        .insert([{
          ...alert,
          tenant_id: tenantData.tenant_id,
          created_by: user.id,
        }])
        .select()
        .single();

      if (error) throw error;

      setAlerts(prev => [data, ...prev]);
      toast({
        title: 'Success',
        description: 'Medical alert created successfully',
      });

      return data;
    } catch (error) {
      console.error('Error adding medical alert:', error);
      toast({
        title: 'Error',
        description: 'Failed to create medical alert',
        variant: 'destructive',
      });
      throw error;
    }
  };

  const updateAlert = async (id: string, updates: Partial<MedicalAlert>) => {
    try {
      const { data, error } = await supabase
        .from('medical_alerts')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      setAlerts(prev => prev.map(alert => alert.id === id ? data : alert));
      toast({
        title: 'Success',
        description: 'Medical alert updated successfully',
      });

      return data;
    } catch (error) {
      console.error('Error updating medical alert:', error);
      toast({
        title: 'Error',
        description: 'Failed to update medical alert',
        variant: 'destructive',
      });
      throw error;
    }
  };

  const acknowledgeAlert = async (id: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No authenticated user');

      const { data, error } = await supabase
        .from('medical_alerts')
        .update({
          status: 'acknowledged',
          acknowledged_at: new Date().toISOString(),
          acknowledged_by: user.id,
        })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      setAlerts(prev => prev.map(alert => alert.id === id ? data : alert));
      toast({
        title: 'Success',
        description: 'Alert acknowledged',
      });

      return data;
    } catch (error) {
      console.error('Error acknowledging alert:', error);
      toast({
        title: 'Error',
        description: 'Failed to acknowledge alert',
        variant: 'destructive',
      });
      throw error;
    }
  };

  const resolveAlert = async (id: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No authenticated user');

      const { data, error } = await supabase
        .from('medical_alerts')
        .update({
          status: 'resolved',
          resolved_at: new Date().toISOString(),
          resolved_by: user.id,
        })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      setAlerts(prev => prev.map(alert => alert.id === id ? data : alert));
      toast({
        title: 'Success',
        description: 'Alert resolved',
      });

      return data;
    } catch (error) {
      console.error('Error resolving alert:', error);
      toast({
        title: 'Error',
        description: 'Failed to resolve alert',
        variant: 'destructive',
      });
      throw error;
    }
  };

  useEffect(() => {
    fetchAlerts();
  }, []);

  return {
    alerts,
    loading,
    addAlert,
    updateAlert,
    acknowledgeAlert,
    resolveAlert,
    refetch: fetchAlerts,
  };
};
