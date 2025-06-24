
import { supabase } from '@/integrations/supabase/client';

export interface LaboratorySample {
  id: string;
  tenant_id: string;
  sample_number: string;
  horse_id?: string;
  horse_name: string;
  sample_type: string;
  collection_date: string;
  collection_time?: string;
  collected_by: string;
  person_who_brought: string;
  client_name?: string;
  client_contact?: any;
  priority: 'routine' | 'urgent' | 'stat';
  status: 'received' | 'processing' | 'completed' | 'cancelled';
  storage_location?: string;
  storage_temperature?: string;
  volume_amount?: number;
  volume_unit?: string;
  required_analysis?: string[];
  selected_templates?: string[];
  sample_receipt_date: string;
  processing_started_at?: string;
  completed_at?: string;
  notes?: string;
  attachments?: any[];
  previous_sample_id?: string;
  created_at: string;
  updated_at: string;
  created_by?: string;
}

export interface LaboratoryTestResult {
  id: string;
  tenant_id: string;
  sample_id: string;
  template_id?: string;
  result_number: string;
  test_type: string;
  horse_name: string;
  client_name: string;
  test_date: string;
  technician: string;
  reviewed_by?: string;
  status: 'pending' | 'in_progress' | 'completed' | 'reviewed' | 'cancelled';
  priority: 'routine' | 'urgent' | 'stat';
  methodology?: string;
  equipment_used?: string[];
  parameters?: any;
  normal_ranges?: any;
  interpretation?: string;
  recommendations?: string;
  quality_control_passed?: boolean;
  reviewed_at?: string;
  completed_at?: string;
  estimated_completion?: string;
  notes?: string;
  attachments?: any[];
  created_at: string;
  updated_at: string;
  created_by?: string;
}

export interface LaboratoryTemplate {
  id: string;
  tenant_id: string;
  name_en: string;
  name_ar?: string;
  category: string;
  template_type: 'service' | 'result';
  parameters?: any[];
  normal_ranges?: any;
  methodology?: string;
  sample_type?: string;
  equipment_required?: string[];
  estimated_duration_minutes?: number;
  cost?: number;
  is_active?: boolean;
  usage_count?: number;
  created_at: string;
  updated_at: string;
  created_by?: string;
}

export interface LaboratoryEquipment {
  id: string;
  tenant_id: string;
  equipment_number: string;
  name: string;
  category: string;
  manufacturer?: string;
  model?: string;
  serial_number?: string;
  status: 'operational' | 'maintenance' | 'out_of_order' | 'retired';
  location?: string;
  purchase_date?: string;
  warranty_expiry?: string;
  last_maintenance?: string;
  next_maintenance?: string;
  maintenance_interval_days?: number;
  calibration_due?: string;
  operating_instructions?: string;
  safety_notes?: string;
  specifications?: any;
  maintenance_history?: any[];
  usage_log?: any[];
  attachments?: any[];
  cost?: number;
  created_at: string;
  updated_at: string;
  created_by?: string;
}

class LaboratoryService {
  // Sample management
  async getSamples(): Promise<LaboratorySample[]> {
    const { data, error } = await supabase
      .from('laboratory_samples')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching samples:', error);
      throw error;
    }

    return (data || []).map(item => ({
      ...item,
      priority: item.priority as LaboratorySample['priority'],
      status: item.status as LaboratorySample['status']
    }));
  }

  async createSample(sample: Omit<LaboratorySample, 'id' | 'created_at' | 'updated_at'>): Promise<LaboratorySample> {
    // Generate sample number
    const sampleNumber = await this.generateSampleNumber();
    
    const { data, error } = await supabase
      .from('laboratory_samples')
      .insert({
        ...sample,
        sample_number: sampleNumber,
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating sample:', error);
      throw error;
    }

    return {
      ...data,
      priority: data.priority as LaboratorySample['priority'],
      status: data.status as LaboratorySample['status']
    };
  }

  async updateSample(id: string, updates: Partial<LaboratorySample>): Promise<LaboratorySample> {
    const { data, error } = await supabase
      .from('laboratory_samples')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating sample:', error);
      throw error;
    }

    return {
      ...data,
      priority: data.priority as LaboratorySample['priority'],
      status: data.status as LaboratorySample['status']
    };
  }

  // Test results management
  async getTestResults(): Promise<LaboratoryTestResult[]> {
    const { data, error } = await supabase
      .from('laboratory_test_results')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching test results:', error);
      throw error;
    }

    return (data || []).map(item => ({
      ...item,
      status: item.status as LaboratoryTestResult['status'],
      priority: item.priority as LaboratoryTestResult['priority']
    }));
  }

  async createTestResult(result: Omit<LaboratoryTestResult, 'id' | 'created_at' | 'updated_at'>): Promise<LaboratoryTestResult> {
    // Generate result number
    const resultNumber = await this.generateResultNumber();
    
    const { data, error } = await supabase
      .from('laboratory_test_results')
      .insert({
        ...result,
        result_number: resultNumber,
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating test result:', error);
      throw error;
    }

    return {
      ...data,
      status: data.status as LaboratoryTestResult['status'],
      priority: data.priority as LaboratoryTestResult['priority']
    };
  }

  async updateTestResult(id: string, updates: Partial<LaboratoryTestResult>): Promise<LaboratoryTestResult> {
    const { data, error } = await supabase
      .from('laboratory_test_results')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating test result:', error);
      throw error;
    }

    return {
      ...data,
      status: data.status as LaboratoryTestResult['status'],
      priority: data.priority as LaboratoryTestResult['priority']
    };
  }

  // Template management
  async getTemplates(): Promise<LaboratoryTemplate[]> {
    const { data, error } = await supabase
      .from('laboratory_templates')
      .select('*')
      .eq('is_active', true)
      .order('name_en');

    if (error) {
      console.error('Error fetching templates:', error);
      throw error;
    }

    return (data || []).map(item => ({
      ...item,
      template_type: item.template_type as LaboratoryTemplate['template_type']
    }));
  }

  async createTemplate(template: Omit<LaboratoryTemplate, 'id' | 'created_at' | 'updated_at'>): Promise<LaboratoryTemplate> {
    const { data, error } = await supabase
      .from('laboratory_templates')
      .insert(template)
      .select()
      .single();

    if (error) {
      console.error('Error creating template:', error);
      throw error;
    }

    return {
      ...data,
      template_type: data.template_type as LaboratoryTemplate['template_type']
    };
  }

  async updateTemplate(id: string, updates: Partial<LaboratoryTemplate>): Promise<LaboratoryTemplate> {
    const { data, error } = await supabase
      .from('laboratory_templates')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating template:', error);
      throw error;
    }

    return {
      ...data,
      template_type: data.template_type as LaboratoryTemplate['template_type']
    };
  }

  // Equipment management
  async getEquipment(): Promise<LaboratoryEquipment[]> {
    const { data, error } = await supabase
      .from('laboratory_equipment')
      .select('*')
      .order('name');

    if (error) {
      console.error('Error fetching equipment:', error);
      throw error;
    }

    return (data || []).map(item => ({
      ...item,
      status: item.status as LaboratoryEquipment['status']
    }));
  }

  async createEquipment(equipment: Omit<LaboratoryEquipment, 'id' | 'created_at' | 'updated_at'>): Promise<LaboratoryEquipment> {
    const { data, error } = await supabase
      .from('laboratory_equipment')
      .insert(equipment)
      .select()
      .single();

    if (error) {
      console.error('Error creating equipment:', error);
      throw error;
    }

    return {
      ...data,
      status: data.status as LaboratoryEquipment['status']
    };
  }

  async updateEquipment(id: string, updates: Partial<LaboratoryEquipment>): Promise<LaboratoryEquipment> {
    const { data, error } = await supabase
      .from('laboratory_equipment')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating equipment:', error);
      throw error;
    }

    return {
      ...data,
      status: data.status as LaboratoryEquipment['status']
    };
  }

  // Utility methods
  private async generateSampleNumber(): Promise<string> {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    
    // Get count of samples today
    const { count } = await supabase
      .from('laboratory_samples')
      .select('*', { count: 'exact' })
      .gte('created_at', new Date().toISOString().split('T')[0]);

    const sequenceNumber = String((count || 0) + 1).padStart(4, '0');
    return `S${year}${month}${sequenceNumber}`;
  }

  private async generateResultNumber(): Promise<string> {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    
    // Get count of results today
    const { count } = await supabase
      .from('laboratory_test_results')
      .select('*', { count: 'exact' })
      .gte('created_at', new Date().toISOString().split('T')[0]);

    const sequenceNumber = String((count || 0) + 1).padStart(4, '0');
    return `R${year}${month}${sequenceNumber}`;
  }

  // Dashboard metrics
  async getDashboardMetrics() {
    const [samplesCount, pendingResults, equipmentCount, todaysSamples] = await Promise.all([
      supabase.from('laboratory_samples').select('*', { count: 'exact' }),
      supabase.from('laboratory_test_results').select('*', { count: 'exact' }).eq('status', 'pending'),
      supabase.from('laboratory_equipment').select('*', { count: 'exact' }).eq('status', 'operational'),
      supabase.from('laboratory_samples').select('*', { count: 'exact' })
        .gte('created_at', new Date().toISOString().split('T')[0])
    ]);

    return {
      totalSamples: samplesCount.count || 0,
      pendingResults: pendingResults.count || 0,
      operationalEquipment: equipmentCount.count || 0,
      todaysSamples: todaysSamples.count || 0
    };
  }
}

export const laboratoryService = new LaboratoryService();
