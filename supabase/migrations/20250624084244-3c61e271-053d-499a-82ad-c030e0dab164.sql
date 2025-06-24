
-- Create core laboratory tables with proper relationships

-- 1. Laboratory templates table
CREATE TABLE public.laboratory_templates (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  tenant_id UUID NOT NULL,
  name_en TEXT NOT NULL,
  name_ar TEXT,
  category TEXT NOT NULL,
  template_type TEXT NOT NULL CHECK (template_type IN ('service', 'result')),
  parameters JSONB DEFAULT '[]'::jsonb,
  normal_ranges JSONB DEFAULT '{}'::jsonb,
  methodology TEXT,
  sample_type TEXT,
  equipment_required TEXT[],
  estimated_duration_minutes INTEGER,
  cost NUMERIC(10,2),
  is_active BOOLEAN DEFAULT true,
  usage_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  created_by UUID
);

-- 2. Laboratory samples table
CREATE TABLE public.laboratory_samples (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  tenant_id UUID NOT NULL,
  sample_number TEXT NOT NULL,
  horse_id UUID,
  horse_name TEXT NOT NULL,
  sample_type TEXT NOT NULL,
  collection_date DATE NOT NULL,
  collection_time TIME,
  collected_by TEXT NOT NULL,
  person_who_brought TEXT NOT NULL,
  client_name TEXT,
  client_contact JSONB DEFAULT '{}'::jsonb,
  priority TEXT NOT NULL DEFAULT 'routine' CHECK (priority IN ('routine', 'urgent', 'stat')),
  status TEXT NOT NULL DEFAULT 'received' CHECK (status IN ('received', 'processing', 'completed', 'cancelled')),
  storage_location TEXT,
  storage_temperature TEXT,
  volume_amount NUMERIC(8,2),
  volume_unit TEXT DEFAULT 'ml',
  required_analysis TEXT[],
  selected_templates UUID[],
  sample_receipt_date TIMESTAMP WITH TIME ZONE DEFAULT now(),
  processing_started_at TIMESTAMP WITH TIME ZONE,
  completed_at TIMESTAMP WITH TIME ZONE,
  notes TEXT,
  attachments JSONB DEFAULT '[]'::jsonb,
  previous_sample_id UUID,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  created_by UUID,
  UNIQUE(tenant_id, sample_number)
);

-- 3. Laboratory test results table
CREATE TABLE public.laboratory_test_results (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  tenant_id UUID NOT NULL,
  sample_id UUID NOT NULL REFERENCES public.laboratory_samples(id) ON DELETE CASCADE,
  template_id UUID REFERENCES public.laboratory_templates(id),
  result_number TEXT NOT NULL,
  test_type TEXT NOT NULL,
  horse_name TEXT NOT NULL,
  client_name TEXT NOT NULL,
  test_date DATE NOT NULL,
  technician TEXT NOT NULL,
  reviewed_by TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed', 'reviewed', 'cancelled')),
  priority TEXT NOT NULL DEFAULT 'routine' CHECK (priority IN ('routine', 'urgent', 'stat')),
  methodology TEXT,
  equipment_used TEXT[],
  parameters JSONB DEFAULT '{}'::jsonb,
  normal_ranges JSONB DEFAULT '{}'::jsonb,
  interpretation TEXT,
  recommendations TEXT,
  quality_control_passed BOOLEAN DEFAULT true,
  reviewed_at TIMESTAMP WITH TIME ZONE,
  completed_at TIMESTAMP WITH TIME ZONE,
  estimated_completion TIMESTAMP WITH TIME ZONE,
  notes TEXT,
  attachments JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  created_by UUID,
  UNIQUE(tenant_id, result_number)
);

-- 4. Laboratory equipment table
CREATE TABLE public.laboratory_equipment (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  tenant_id UUID NOT NULL,
  equipment_number TEXT NOT NULL,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  manufacturer TEXT,
  model TEXT,
  serial_number TEXT,
  status TEXT NOT NULL DEFAULT 'operational' CHECK (status IN ('operational', 'maintenance', 'out_of_order', 'retired')),
  location TEXT,
  purchase_date DATE,
  warranty_expiry DATE,
  last_maintenance DATE,
  next_maintenance DATE,
  maintenance_interval_days INTEGER DEFAULT 90,
  calibration_due DATE,
  operating_instructions TEXT,
  safety_notes TEXT,
  specifications JSONB DEFAULT '{}'::jsonb,
  maintenance_history JSONB DEFAULT '[]'::jsonb,
  usage_log JSONB DEFAULT '[]'::jsonb,
  attachments JSONB DEFAULT '[]'::jsonb,
  cost NUMERIC(12,2),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  created_by UUID,
  UNIQUE(tenant_id, equipment_number)
);

-- 5. Laboratory quality control table
CREATE TABLE public.laboratory_quality_control (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  tenant_id UUID NOT NULL,
  control_type TEXT NOT NULL CHECK (control_type IN ('internal', 'external', 'proficiency')),
  test_type TEXT NOT NULL,
  control_date DATE NOT NULL,
  operator TEXT NOT NULL,
  equipment_used TEXT[],
  expected_results JSONB NOT NULL,
  actual_results JSONB NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'passed', 'failed', 'investigating')),
  deviation_notes TEXT,
  corrective_actions TEXT,
  reviewed_by TEXT,
  reviewed_at TIMESTAMP WITH TIME ZONE,
  attachments JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  created_by UUID
);

-- 6. Laboratory test requests table
CREATE TABLE public.laboratory_test_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  tenant_id UUID NOT NULL,
  request_number TEXT NOT NULL,
  sample_id UUID NOT NULL REFERENCES public.laboratory_samples(id) ON DELETE CASCADE,
  horse_name TEXT NOT NULL,
  test_type TEXT NOT NULL,
  requested_by TEXT NOT NULL,
  request_date DATE NOT NULL,
  priority TEXT NOT NULL DEFAULT 'routine' CHECK (priority IN ('routine', 'urgent', 'stat')),
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed', 'cancelled')),
  estimated_completion DATE,
  completed_at TIMESTAMP WITH TIME ZONE,
  notes TEXT,
  attachments JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  created_by UUID,
  UNIQUE(tenant_id, request_number)
);

-- Create indexes for better performance
CREATE INDEX idx_laboratory_samples_tenant_horse ON public.laboratory_samples(tenant_id, horse_id);
CREATE INDEX idx_laboratory_samples_status ON public.laboratory_samples(status);
CREATE INDEX idx_laboratory_samples_priority ON public.laboratory_samples(priority);
CREATE INDEX idx_laboratory_samples_collection_date ON public.laboratory_samples(collection_date);

CREATE INDEX idx_laboratory_test_results_tenant_sample ON public.laboratory_test_results(tenant_id, sample_id);
CREATE INDEX idx_laboratory_test_results_status ON public.laboratory_test_results(status);
CREATE INDEX idx_laboratory_test_results_test_date ON public.laboratory_test_results(test_date);

CREATE INDEX idx_laboratory_templates_tenant_category ON public.laboratory_templates(tenant_id, category);
CREATE INDEX idx_laboratory_templates_type ON public.laboratory_templates(template_type);

CREATE INDEX idx_laboratory_equipment_tenant_status ON public.laboratory_equipment(tenant_id, status);
CREATE INDEX idx_laboratory_equipment_maintenance ON public.laboratory_equipment(next_maintenance);

-- Create triggers for updated_at timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_laboratory_templates_updated_at BEFORE UPDATE ON public.laboratory_templates FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_laboratory_samples_updated_at BEFORE UPDATE ON public.laboratory_samples FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_laboratory_test_results_updated_at BEFORE UPDATE ON public.laboratory_test_results FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_laboratory_equipment_updated_at BEFORE UPDATE ON public.laboratory_equipment FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_laboratory_quality_control_updated_at BEFORE UPDATE ON public.laboratory_quality_control FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_laboratory_test_requests_updated_at BEFORE UPDATE ON public.laboratory_test_requests FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE public.laboratory_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.laboratory_samples ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.laboratory_test_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.laboratory_equipment ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.laboratory_quality_control ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.laboratory_test_requests ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for tenant isolation
CREATE POLICY "Users can access laboratory templates for their tenant" ON public.laboratory_templates
  FOR ALL USING (tenant_id IN (SELECT tenant_id FROM public.tenant_users WHERE user_id = auth.uid()));

CREATE POLICY "Users can access laboratory samples for their tenant" ON public.laboratory_samples
  FOR ALL USING (tenant_id IN (SELECT tenant_id FROM public.tenant_users WHERE user_id = auth.uid()));

CREATE POLICY "Users can access laboratory test results for their tenant" ON public.laboratory_test_results
  FOR ALL USING (tenant_id IN (SELECT tenant_id FROM public.tenant_users WHERE user_id = auth.uid()));

CREATE POLICY "Users can access laboratory equipment for their tenant" ON public.laboratory_equipment
  FOR ALL USING (tenant_id IN (SELECT tenant_id FROM public.tenant_users WHERE user_id = auth.uid()));

CREATE POLICY "Users can access laboratory quality control for their tenant" ON public.laboratory_quality_control
  FOR ALL USING (tenant_id IN (SELECT tenant_id FROM public.tenant_users WHERE user_id = auth.uid()));

CREATE POLICY "Users can access laboratory test requests for their tenant" ON public.laboratory_test_requests
  FOR ALL USING (tenant_id IN (SELECT tenant_id FROM public.tenant_users WHERE user_id = auth.uid()));

-- Insert sample data for testing
INSERT INTO public.laboratory_templates (tenant_id, name_en, name_ar, category, template_type, parameters, normal_ranges, methodology, sample_type, equipment_required, estimated_duration_minutes, cost) VALUES
('550e8400-e29b-41d4-a716-446655440001', 'Complete Blood Count', 'تعداد الدم الكامل', 'Hematology', 'result', 
 '[{"name": "WBC", "unit": "cells/μL", "type": "numeric"}, {"name": "RBC", "unit": "cells/μL", "type": "numeric"}, {"name": "Hemoglobin", "unit": "g/dL", "type": "numeric"}]'::jsonb,
 '{"WBC": {"min": 5000, "max": 15000}, "RBC": {"min": 6000000, "max": 10000000}, "Hemoglobin": {"min": 11, "max": 18}}'::jsonb,
 'Automated cell counting', 'Blood', ARRAY['Hematology Analyzer'], 30, 45.00),
('550e8400-e29b-41d4-a716-446655440001', 'Liver Function Panel', 'فحص وظائف الكبد', 'Clinical Chemistry', 'result',
 '[{"name": "ALT", "unit": "U/L", "type": "numeric"}, {"name": "AST", "unit": "U/L", "type": "numeric"}, {"name": "Bilirubin", "unit": "mg/dL", "type": "numeric"}]'::jsonb,
 '{"ALT": {"min": 5, "max": 25}, "AST": {"min": 10, "max": 40}, "Bilirubin": {"min": 0.5, "max": 2.0}}'::jsonb,
 'Enzymatic assay', 'Serum', ARRAY['Chemistry Analyzer'], 45, 75.00),
('550e8400-e29b-41d4-a716-446655440001', 'Basic Health Checkup', 'الفحص الصحي الأساسي', 'General', 'service',
 '[]'::jsonb, '{}'::jsonb, 'Physical examination with basic tests', 'Blood', ARRAY['Basic Equipment'], 60, 120.00);
