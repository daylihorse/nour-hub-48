
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

export interface Task {
  id: string;
  tenant_id: string;
  title: string;
  description?: string;
  task_type: 'follow_up' | 'reminder' | 'maintenance' | 'medical' | 'administrative' | 'other';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  assigned_to?: string;
  due_date?: string;
  completed_date?: string;
  related_entity_type?: string;
  related_entity_id?: string;
  estimated_duration?: number;
  actual_duration?: number;
  notes?: string;
  created_at: string;
  updated_at: string;
  created_by?: string;
}

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTasks = async () => {
    try {
      const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTasks(data || []);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch tasks',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const addTask = async (task: Omit<Task, 'id' | 'tenant_id' | 'created_at' | 'updated_at'>) => {
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
        .from('tasks')
        .insert([{
          ...task,
          tenant_id: tenantData.tenant_id,
          created_by: user.id,
        }])
        .select()
        .single();

      if (error) throw error;

      setTasks(prev => [data, ...prev]);
      toast({
        title: 'Success',
        description: 'Task created successfully',
      });

      return data;
    } catch (error) {
      console.error('Error adding task:', error);
      toast({
        title: 'Error',
        description: 'Failed to create task',
        variant: 'destructive',
      });
      throw error;
    }
  };

  const updateTask = async (id: string, updates: Partial<Task>) => {
    try {
      const { data, error } = await supabase
        .from('tasks')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      setTasks(prev => prev.map(task => task.id === id ? data : task));
      toast({
        title: 'Success',
        description: 'Task updated successfully',
      });

      return data;
    } catch (error) {
      console.error('Error updating task:', error);
      toast({
        title: 'Error',
        description: 'Failed to update task',
        variant: 'destructive',
      });
      throw error;
    }
  };

  const deleteTask = async (id: string) => {
    try {
      const { error } = await supabase
        .from('tasks')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setTasks(prev => prev.filter(task => task.id !== id));
      toast({
        title: 'Success',
        description: 'Task deleted successfully',
      });
    } catch (error) {
      console.error('Error deleting task:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete task',
        variant: 'destructive',
      });
      throw error;
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return {
    tasks,
    loading,
    addTask,
    updateTask,
    deleteTask,
    refetch: fetchTasks,
  };
};
