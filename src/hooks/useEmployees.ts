
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

export interface DatabaseEmployee {
  id: string;
  tenant_id: string;
  employee_number?: string;
  first_name: string;
  last_name: string;
  email?: string;
  phone?: string;
  hire_date: string;
  position: string;
  department: string;
  salary?: number;
  status: 'active' | 'inactive' | 'terminated';
  emergency_contact?: any;
  address?: any;
  created_at: string;
  updated_at: string;
  created_by?: string;
}

export const useEmployees = () => {
  const [employees, setEmployees] = useState<DatabaseEmployee[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchEmployees = async () => {
    try {
      const { data, error } = await supabase
        .from('employees')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      // Type cast the data to ensure proper typing
      const typedData = (data || []).map(employee => ({
        ...employee,
        status: employee.status as 'active' | 'inactive' | 'terminated'
      })) as DatabaseEmployee[];
      
      setEmployees(typedData);
    } catch (error) {
      console.error('Error fetching employees:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch employees',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const addEmployee = async (employee: Omit<DatabaseEmployee, 'id' | 'tenant_id' | 'created_at' | 'updated_at'>) => {
    try {
      // Get current user's tenant
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No authenticated user');

      const { data: tenantData } = await supabase
        .from('tenant_users')
        .select('tenant_id')
        .eq('user_id', user.id)
        .single();

      if (!tenantData) throw new Error('No tenant found for user');

      const { data, error } = await supabase
        .from('employees')
        .insert([{
          ...employee,
          tenant_id: tenantData.tenant_id,
          created_by: user.id,
        }])
        .select()
        .single();

      if (error) throw error;

      // Type cast the returned data
      const typedEmployee = {
        ...data,
        status: data.status as 'active' | 'inactive' | 'terminated'
      } as DatabaseEmployee;

      setEmployees(prev => [typedEmployee, ...prev]);
      toast({
        title: 'Success',
        description: 'Employee added successfully',
      });

      return typedEmployee;
    } catch (error) {
      console.error('Error adding employee:', error);
      toast({
        title: 'Error',
        description: 'Failed to add employee',
        variant: 'destructive',
      });
      throw error;
    }
  };

  const updateEmployee = async (id: string, updates: Partial<DatabaseEmployee>) => {
    try {
      const { data, error } = await supabase
        .from('employees')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      // Type cast the returned data
      const typedEmployee = {
        ...data,
        status: data.status as 'active' | 'inactive' | 'terminated'
      } as DatabaseEmployee;

      setEmployees(prev => prev.map(emp => emp.id === id ? typedEmployee : emp));
      toast({
        title: 'Success',
        description: 'Employee updated successfully',
      });

      return typedEmployee;
    } catch (error) {
      console.error('Error updating employee:', error);
      toast({
        title: 'Error',
        description: 'Failed to update employee',
        variant: 'destructive',
      });
      throw error;
    }
  };

  const deleteEmployee = async (id: string) => {
    try {
      const { error } = await supabase
        .from('employees')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setEmployees(prev => prev.filter(emp => emp.id !== id));
      toast({
        title: 'Success',
        description: 'Employee deleted successfully',
      });
    } catch (error) {
      console.error('Error deleting employee:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete employee',
        variant: 'destructive',
      });
      throw error;
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  return {
    employees,
    loading,
    addEmployee,
    updateEmployee,
    deleteEmployee,
    refetch: fetchEmployees,
  };
};
