
-- Create paddocks table
CREATE TABLE public.paddocks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL,
  name TEXT NOT NULL,
  paddock_number TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'available' CHECK (status IN ('available', 'occupied', 'maintenance', 'reserved')),
  paddock_type TEXT NOT NULL DEFAULT 'grazing' CHECK (paddock_type IN ('grazing', 'exercise', 'turnout', 'breeding', 'quarantine', 'rehabilitation')),
  size_length NUMERIC,
  size_width NUMERIC,
  size_unit TEXT DEFAULT 'meters',
  capacity INTEGER NOT NULL DEFAULT 1,
  current_occupancy INTEGER NOT NULL DEFAULT 0,
  location_section TEXT,
  location_coordinates JSONB DEFAULT '{}',
  features JSONB DEFAULT '[]',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by UUID,
  CONSTRAINT unique_paddock_number_per_tenant UNIQUE (tenant_id, paddock_number),
  CONSTRAINT valid_occupancy CHECK (current_occupancy >= 0 AND current_occupancy <= capacity)
);

-- Create paddock_assignments table
CREATE TABLE public.paddock_assignments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL,
  paddock_id UUID NOT NULL REFERENCES public.paddocks(id) ON DELETE CASCADE,
  horse_id UUID NOT NULL,
  horse_name TEXT NOT NULL,
  assigned_date DATE NOT NULL DEFAULT CURRENT_DATE,
  scheduled_end_date DATE,
  actual_end_date DATE,
  assignment_type TEXT DEFAULT 'general' CHECK (assignment_type IN ('grazing', 'exercise', 'turnout', 'breeding', 'quarantine', 'rehabilitation', 'general')),
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'completed', 'scheduled', 'cancelled')),
  assigned_by UUID NOT NULL,
  notes TEXT,
  reason TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  CONSTRAINT valid_assignment_dates CHECK (
    (scheduled_end_date IS NULL OR scheduled_end_date >= assigned_date) AND
    (actual_end_date IS NULL OR actual_end_date >= assigned_date)
  )
);

-- Create paddock_maintenance table
CREATE TABLE public.paddock_maintenance (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL,
  paddock_id UUID NOT NULL REFERENCES public.paddocks(id) ON DELETE CASCADE,
  maintenance_type TEXT NOT NULL CHECK (maintenance_type IN ('fence_repair', 'gate_maintenance', 'drainage', 'grass_maintenance', 'water_system', 'shelter_repair', 'general')),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  scheduled_date DATE NOT NULL,
  completed_date DATE,
  status TEXT NOT NULL DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'in_progress', 'completed', 'cancelled')),
  assigned_to UUID,
  cost NUMERIC,
  notes TEXT,
  next_maintenance_date DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by UUID
);

-- Create paddock_rotation_plans table
CREATE TABLE public.paddock_rotation_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL,
  name TEXT NOT NULL,
  paddock_ids UUID[] NOT NULL,
  rotation_interval INTEGER NOT NULL, -- days
  rest_period INTEGER NOT NULL DEFAULT 0, -- days
  start_date DATE NOT NULL,
  end_date DATE,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'paused', 'completed', 'cancelled')),
  automatic_rotation BOOLEAN DEFAULT FALSE,
  notifications JSONB DEFAULT '{"enabled": false, "days_before": 1, "recipients": []}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by UUID,
  CONSTRAINT valid_rotation_dates CHECK (end_date IS NULL OR end_date > start_date),
  CONSTRAINT valid_intervals CHECK (rotation_interval > 0 AND rest_period >= 0)
);

-- Create horse_groups table for rotation management
CREATE TABLE public.horse_groups (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL,
  rotation_plan_id UUID NOT NULL REFERENCES public.paddock_rotation_plans(id) ON DELETE CASCADE,
  group_name TEXT NOT NULL,
  horse_ids UUID[] NOT NULL,
  current_paddock_id UUID,
  rotation_order INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  CONSTRAINT unique_group_name_per_plan UNIQUE (rotation_plan_id, group_name),
  CONSTRAINT unique_rotation_order_per_plan UNIQUE (rotation_plan_id, rotation_order)
);

-- Enable Row Level Security
ALTER TABLE public.paddocks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.paddock_assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.paddock_maintenance ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.paddock_rotation_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.horse_groups ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for paddocks
CREATE POLICY "Users can view paddocks in their tenant" ON public.paddocks
  FOR SELECT USING (tenant_id IN (
    SELECT tenant_id FROM public.tenant_users WHERE user_id = auth.uid()
  ));

CREATE POLICY "Users can create paddocks in their tenant" ON public.paddocks
  FOR INSERT WITH CHECK (tenant_id IN (
    SELECT tenant_id FROM public.tenant_users WHERE user_id = auth.uid()
  ));

CREATE POLICY "Users can update paddocks in their tenant" ON public.paddocks
  FOR UPDATE USING (tenant_id IN (
    SELECT tenant_id FROM public.tenant_users WHERE user_id = auth.uid()
  ));

CREATE POLICY "Users can delete paddocks in their tenant" ON public.paddocks
  FOR DELETE USING (tenant_id IN (
    SELECT tenant_id FROM public.tenant_users WHERE user_id = auth.uid()
  ));

-- Create RLS policies for paddock_assignments
CREATE POLICY "Users can view assignments in their tenant" ON public.paddock_assignments
  FOR SELECT USING (tenant_id IN (
    SELECT tenant_id FROM public.tenant_users WHERE user_id = auth.uid()
  ));

CREATE POLICY "Users can create assignments in their tenant" ON public.paddock_assignments
  FOR INSERT WITH CHECK (tenant_id IN (
    SELECT tenant_id FROM public.tenant_users WHERE user_id = auth.uid()
  ));

CREATE POLICY "Users can update assignments in their tenant" ON public.paddock_assignments
  FOR UPDATE USING (tenant_id IN (
    SELECT tenant_id FROM public.tenant_users WHERE user_id = auth.uid()
  ));

CREATE POLICY "Users can delete assignments in their tenant" ON public.paddock_assignments
  FOR DELETE USING (tenant_id IN (
    SELECT tenant_id FROM public.tenant_users WHERE user_id = auth.uid()
  ));

-- Create RLS policies for paddock_maintenance
CREATE POLICY "Users can view maintenance in their tenant" ON public.paddock_maintenance
  FOR SELECT USING (tenant_id IN (
    SELECT tenant_id FROM public.tenant_users WHERE user_id = auth.uid()
  ));

CREATE POLICY "Users can create maintenance in their tenant" ON public.paddock_maintenance
  FOR INSERT WITH CHECK (tenant_id IN (
    SELECT tenant_id FROM public.tenant_users WHERE user_id = auth.uid()
  ));

CREATE POLICY "Users can update maintenance in their tenant" ON public.paddock_maintenance
  FOR UPDATE USING (tenant_id IN (
    SELECT tenant_id FROM public.tenant_users WHERE user_id = auth.uid()
  ));

CREATE POLICY "Users can delete maintenance in their tenant" ON public.paddock_maintenance
  FOR DELETE USING (tenant_id IN (
    SELECT tenant_id FROM public.tenant_users WHERE user_id = auth.uid()
  ));

-- Create RLS policies for paddock_rotation_plans
CREATE POLICY "Users can view rotation plans in their tenant" ON public.paddock_rotation_plans
  FOR SELECT USING (tenant_id IN (
    SELECT tenant_id FROM public.tenant_users WHERE user_id = auth.uid()
  ));

CREATE POLICY "Users can create rotation plans in their tenant" ON public.paddock_rotation_plans
  FOR INSERT WITH CHECK (tenant_id IN (
    SELECT tenant_id FROM public.tenant_users WHERE user_id = auth.uid()
  ));

CREATE POLICY "Users can update rotation plans in their tenant" ON public.paddock_rotation_plans
  FOR UPDATE USING (tenant_id IN (
    SELECT tenant_id FROM public.tenant_users WHERE user_id = auth.uid()
  ));

CREATE POLICY "Users can delete rotation plans in their tenant" ON public.paddock_rotation_plans
  FOR DELETE USING (tenant_id IN (
    SELECT tenant_id FROM public.tenant_users WHERE user_id = auth.uid()
  ));

-- Create RLS policies for horse_groups
CREATE POLICY "Users can view horse groups in their tenant" ON public.horse_groups
  FOR SELECT USING (tenant_id IN (
    SELECT tenant_id FROM public.tenant_users WHERE user_id = auth.uid()
  ));

CREATE POLICY "Users can create horse groups in their tenant" ON public.horse_groups
  FOR INSERT WITH CHECK (tenant_id IN (
    SELECT tenant_id FROM public.tenant_users WHERE user_id = auth.uid()
  ));

CREATE POLICY "Users can update horse groups in their tenant" ON public.horse_groups
  FOR UPDATE USING (tenant_id IN (
    SELECT tenant_id FROM public.tenant_users WHERE user_id = auth.uid()
  ));

CREATE POLICY "Users can delete horse groups in their tenant" ON public.horse_groups
  FOR DELETE USING (tenant_id IN (
    SELECT tenant_id FROM public.tenant_users WHERE user_id = auth.uid()
  ));

-- Create indexes for better performance
CREATE INDEX idx_paddocks_tenant_id ON public.paddocks(tenant_id);
CREATE INDEX idx_paddocks_status ON public.paddocks(status);
CREATE INDEX idx_paddocks_type ON public.paddocks(paddock_type);
CREATE INDEX idx_paddock_assignments_tenant_id ON public.paddock_assignments(tenant_id);
CREATE INDEX idx_paddock_assignments_paddock_id ON public.paddock_assignments(paddock_id);
CREATE INDEX idx_paddock_assignments_horse_id ON public.paddock_assignments(horse_id);
CREATE INDEX idx_paddock_assignments_status ON public.paddock_assignments(status);
CREATE INDEX idx_paddock_maintenance_tenant_id ON public.paddock_maintenance(tenant_id);
CREATE INDEX idx_paddock_maintenance_paddock_id ON public.paddock_maintenance(paddock_id);
CREATE INDEX idx_paddock_maintenance_status ON public.paddock_maintenance(status);
CREATE INDEX idx_paddock_rotation_plans_tenant_id ON public.paddock_rotation_plans(tenant_id);
CREATE INDEX idx_horse_groups_tenant_id ON public.horse_groups(tenant_id);
CREATE INDEX idx_horse_groups_rotation_plan_id ON public.horse_groups(rotation_plan_id);

-- Create triggers for updated_at columns
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_paddocks_updated_at BEFORE UPDATE ON public.paddocks
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_paddock_assignments_updated_at BEFORE UPDATE ON public.paddock_assignments
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_paddock_maintenance_updated_at BEFORE UPDATE ON public.paddock_maintenance
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_paddock_rotation_plans_updated_at BEFORE UPDATE ON public.paddock_rotation_plans
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_horse_groups_updated_at BEFORE UPDATE ON public.horse_groups
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert sample data for testing
INSERT INTO public.paddocks (tenant_id, name, paddock_number, status, paddock_type, size_length, size_width, capacity, location_section, features) VALUES
('550e8400-e29b-41d4-a716-446655440001', 'North Pasture A', 'P-001', 'available', 'grazing', 100.0, 80.0, 4, 'North Section', '["water_trough", "shelter", "automatic_gate"]'),
('550e8400-e29b-41d4-a716-446655440001', 'Training Ring 1', 'P-002', 'available', 'exercise', 60.0, 60.0, 2, 'Training Area', '["sand_footing", "lighting", "mirrored_walls"]'),
('550e8400-e29b-41d4-a716-446655440001', 'Breeding Paddock', 'P-003', 'occupied', 'breeding', 50.0, 50.0, 2, 'Breeding Section', '["privacy_screens", "video_monitoring", "specialized_fencing"]'),
('550e8400-e29b-41d4-a716-446655440001', 'Quarantine Area', 'P-004', 'available', 'quarantine', 40.0, 40.0, 1, 'Isolation Wing', '["isolation_protocols", "separate_water", "medical_access"]'),
('550e8400-e29b-41d4-a716-446655440001', 'Recovery Paddock', 'P-005', 'maintenance', 'rehabilitation', 30.0, 30.0, 1, 'Medical Wing', '["soft_footing", "camera_monitoring", "climate_control"]');
