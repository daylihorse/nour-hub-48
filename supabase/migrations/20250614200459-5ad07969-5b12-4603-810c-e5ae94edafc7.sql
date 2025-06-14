
-- Create comprehensive Horse Department database schema

-- Core horse registry table
CREATE TABLE public.horses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
  
  -- Basic Information
  name TEXT NOT NULL,
  arabic_name TEXT,
  registration_number TEXT UNIQUE,
  passport_number TEXT,
  microchip_id TEXT UNIQUE,
  breed TEXT NOT NULL,
  gender TEXT NOT NULL CHECK (gender IN ('stallion', 'mare', 'gelding')),
  birth_date DATE NOT NULL,
  color TEXT NOT NULL,
  height DECIMAL(5,2), -- in hands
  weight DECIMAL(6,2), -- in kg
  
  -- Pedigree
  sire_id UUID REFERENCES public.horses(id),
  dam_id UUID REFERENCES public.horses(id),
  bloodline_origin TEXT,
  
  -- Ownership
  owner_type TEXT NOT NULL CHECK (owner_type IN ('individual', 'company', 'partnership')),
  owner_name TEXT NOT NULL,
  owner_contact TEXT,
  
  -- Location
  current_location TEXT,
  stall_number TEXT,
  
  -- Status
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'transferred', 'deceased')),
  health_status TEXT NOT NULL DEFAULT 'healthy' CHECK (health_status IN ('healthy', 'under_treatment', 'quarantine')),
  
  -- Insurance
  insured BOOLEAN DEFAULT false,
  insurance_provider TEXT,
  insurance_value DECIMAL(12,2),
  
  -- Financial
  purchase_price DECIMAL(12,2),
  market_value DECIMAL(12,2),
  
  -- Metadata
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by UUID REFERENCES public.profiles(id)
);

-- Health records table
CREATE TABLE public.health_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
  horse_id UUID NOT NULL REFERENCES public.horses(id) ON DELETE CASCADE,
  
  record_type TEXT NOT NULL CHECK (record_type IN ('vaccination', 'medical_exam', 'treatment', 'injury', 'medication', 'dental', 'farrier')),
  title TEXT NOT NULL,
  description TEXT,
  
  -- Medical details
  veterinarian TEXT,
  diagnosis TEXT,
  treatment TEXT,
  medications JSONB,
  
  -- Scheduling
  date_performed DATE NOT NULL,
  next_due_date DATE,
  
  -- Results
  findings TEXT,
  recommendations TEXT,
  
  -- Files and attachments
  attachments JSONB DEFAULT '[]',
  
  -- Status
  status TEXT NOT NULL DEFAULT 'completed' CHECK (status IN ('scheduled', 'in_progress', 'completed', 'cancelled')),
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by UUID REFERENCES public.profiles(id)
);

-- Performance records table
CREATE TABLE public.performance_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
  horse_id UUID NOT NULL REFERENCES public.horses(id) ON DELETE CASCADE,
  
  -- Event details
  event_type TEXT NOT NULL CHECK (event_type IN ('race', 'show', 'competition', 'training', 'trial')),
  event_name TEXT NOT NULL,
  event_date DATE NOT NULL,
  location TEXT,
  
  -- Performance metrics
  discipline TEXT,
  category TEXT,
  level TEXT,
  
  -- Results
  placement INTEGER,
  total_participants INTEGER,
  time_recorded INTERVAL,
  score DECIMAL(10,2),
  points_earned INTEGER,
  
  -- Details
  jockey_rider TEXT,
  trainer TEXT,
  conditions TEXT,
  notes TEXT,
  
  -- Prize money
  prize_money DECIMAL(12,2),
  
  -- Files
  attachments JSONB DEFAULT '[]',
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by UUID REFERENCES public.profiles(id)
);

-- Training records table
CREATE TABLE public.training_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
  horse_id UUID NOT NULL REFERENCES public.horses(id) ON DELETE CASCADE,
  
  -- Training session details
  session_date DATE NOT NULL,
  duration_minutes INTEGER,
  trainer TEXT,
  
  -- Training specifics
  training_type TEXT NOT NULL CHECK (training_type IN ('groundwork', 'riding', 'lunging', 'long_reining', 'free_exercise', 'rehabilitation')),
  discipline TEXT,
  intensity_level TEXT CHECK (intensity_level IN ('light', 'moderate', 'intense')),
  
  -- Goals and progress
  training_goals TEXT,
  exercises_performed TEXT[],
  progress_notes TEXT,
  
  -- Performance metrics
  gait_quality JSONB,
  responsiveness_score INTEGER CHECK (responsiveness_score BETWEEN 1 AND 10),
  energy_level INTEGER CHECK (energy_level BETWEEN 1 AND 10),
  
  -- Conditions
  weather_conditions TEXT,
  surface_conditions TEXT,
  equipment_used TEXT[],
  
  -- Next session planning
  next_session_notes TEXT,
  recommended_exercises TEXT[],
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by UUID REFERENCES public.profiles(id)
);

-- Breeding records table (enhanced)
CREATE TABLE public.breeding_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
  
  -- Breeding participants
  stallion_id UUID NOT NULL REFERENCES public.horses(id) ON DELETE CASCADE,
  mare_id UUID NOT NULL REFERENCES public.horses(id) ON DELETE CASCADE,
  
  -- Breeding details
  breeding_date DATE NOT NULL,
  method TEXT NOT NULL CHECK (method IN ('natural', 'artificial_insemination', 'embryo_transfer')),
  location TEXT,
  
  -- Personnel
  veterinarian TEXT,
  breeding_manager TEXT,
  
  -- Results
  result TEXT CHECK (result IN ('successful', 'unsuccessful', 'pending')),
  pregnancy_confirmed BOOLEAN DEFAULT false,
  pregnancy_confirmation_date DATE,
  
  -- Expected outcomes
  expected_due_date DATE,
  foaling_date DATE,
  foal_id UUID REFERENCES public.horses(id),
  
  -- Financial
  stud_fee DECIMAL(12,2),
  additional_costs DECIMAL(12,2),
  
  -- Documentation
  contract_id TEXT,
  notes TEXT,
  attachments JSONB DEFAULT '[]',
  
  -- Status tracking
  status TEXT NOT NULL DEFAULT 'planned' CHECK (status IN ('planned', 'completed', 'failed', 'aborted')),
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by UUID REFERENCES public.profiles(id)
);

-- Pregnancy monitoring table
CREATE TABLE public.pregnancy_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
  mare_id UUID NOT NULL REFERENCES public.horses(id) ON DELETE CASCADE,
  breeding_record_id UUID REFERENCES public.breeding_records(id),
  
  -- Pregnancy details
  conception_date DATE,
  expected_due_date DATE NOT NULL,
  actual_foaling_date DATE,
  
  -- Monitoring
  pregnancy_stage TEXT CHECK (pregnancy_stage IN ('early', 'mid', 'late', 'overdue')),
  last_ultrasound_date DATE,
  ultrasound_results TEXT,
  
  -- Health monitoring
  mare_condition TEXT,
  weight_tracking JSONB,
  vital_signs JSONB,
  
  -- Veterinary care
  veterinarian TEXT,
  vaccination_schedule JSONB,
  feeding_program TEXT,
  
  -- Outcome
  pregnancy_outcome TEXT CHECK (pregnancy_outcome IN ('live_birth', 'stillbirth', 'abortion', 'ongoing')),
  foal_id UUID REFERENCES public.horses(id),
  complications TEXT,
  
  -- Notes and files
  notes TEXT,
  attachments JSONB DEFAULT '[]',
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by UUID REFERENCES public.profiles(id)
);

-- Document management table
CREATE TABLE public.horse_documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
  horse_id UUID REFERENCES public.horses(id) ON DELETE CASCADE,
  
  -- Document details
  document_type TEXT NOT NULL CHECK (document_type IN ('registration', 'passport', 'health_certificate', 'insurance', 'contract', 'photo', 'video', 'other')),
  title TEXT NOT NULL,
  description TEXT,
  
  -- File information
  file_name TEXT NOT NULL,
  file_size INTEGER,
  file_type TEXT,
  file_url TEXT NOT NULL,
  
  -- Categorization
  category TEXT,
  tags TEXT[],
  
  -- Validity and expiration
  issue_date DATE,
  expiry_date DATE,
  is_active BOOLEAN DEFAULT true,
  
  -- Access control
  visibility TEXT NOT NULL DEFAULT 'private' CHECK (visibility IN ('private', 'shared', 'public')),
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by UUID REFERENCES public.profiles(id)
);

-- Horse movements/transfers table
CREATE TABLE public.horse_movements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
  horse_id UUID NOT NULL REFERENCES public.horses(id) ON DELETE CASCADE,
  
  -- Movement details
  movement_type TEXT NOT NULL CHECK (movement_type IN ('arrival', 'departure', 'transfer', 'temporary_out', 'temporary_return')),
  movement_date DATE NOT NULL,
  
  -- Locations
  from_location TEXT,
  to_location TEXT,
  current_stall TEXT,
  
  -- Transport details
  transport_method TEXT,
  transport_company TEXT,
  driver_name TEXT,
  vehicle_details TEXT,
  
  -- Documentation
  health_certificate TEXT,
  transport_permit TEXT,
  insurance_coverage TEXT,
  
  -- Personnel
  responsible_person TEXT,
  receiving_person TEXT,
  
  -- Status
  status TEXT NOT NULL DEFAULT 'planned' CHECK (status IN ('planned', 'in_transit', 'completed', 'cancelled')),
  
  -- Notes
  notes TEXT,
  attachments JSONB DEFAULT '[]',
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by UUID REFERENCES public.profiles(id)
);

-- Feeding and nutrition table
CREATE TABLE public.nutrition_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
  horse_id UUID NOT NULL REFERENCES public.horses(id) ON DELETE CASCADE,
  
  -- Feeding schedule
  feeding_date DATE NOT NULL,
  meal_type TEXT NOT NULL CHECK (meal_type IN ('morning', 'midday', 'evening', 'night', 'supplement')),
  
  -- Feed details
  feed_type TEXT NOT NULL,
  quantity DECIMAL(8,2),
  unit TEXT NOT NULL CHECK (unit IN ('kg', 'lbs', 'cups', 'scoops')),
  
  -- Nutritional information
  protein_content DECIMAL(5,2),
  fat_content DECIMAL(5,2),
  fiber_content DECIMAL(5,2),
  calories_per_unit DECIMAL(8,2),
  
  -- Supplements
  supplements JSONB DEFAULT '[]',
  
  -- Special instructions
  feeding_instructions TEXT,
  dietary_restrictions TEXT,
  
  -- Monitoring
  appetite_rating INTEGER CHECK (appetite_rating BETWEEN 1 AND 5),
  body_condition_score DECIMAL(3,1) CHECK (body_condition_score BETWEEN 1.0 AND 9.0),
  
  -- Personnel
  fed_by TEXT,
  
  notes TEXT,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by UUID REFERENCES public.profiles(id)
);

-- Financial transactions table for horses
CREATE TABLE public.horse_financials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
  horse_id UUID NOT NULL REFERENCES public.horses(id) ON DELETE CASCADE,
  
  -- Transaction details
  transaction_type TEXT NOT NULL CHECK (transaction_type IN ('purchase', 'sale', 'stud_fee', 'training_fee', 'boarding_fee', 'veterinary', 'farrier', 'transport', 'insurance', 'registration', 'other')),
  transaction_date DATE NOT NULL,
  
  -- Financial details
  amount DECIMAL(12,2) NOT NULL,
  currency TEXT NOT NULL DEFAULT 'USD',
  payment_method TEXT,
  
  -- Parties involved
  payer TEXT,
  payee TEXT,
  
  -- References
  invoice_number TEXT,
  receipt_number TEXT,
  related_record_id UUID,
  
  -- Status
  payment_status TEXT NOT NULL DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'overdue', 'cancelled')),
  
  -- Description
  description TEXT NOT NULL,
  notes TEXT,
  
  -- Attachments
  attachments JSONB DEFAULT '[]',
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by UUID REFERENCES public.profiles(id)
);

-- Create indexes for better performance
CREATE INDEX idx_horses_tenant_id ON public.horses(tenant_id);
CREATE INDEX idx_horses_owner_name ON public.horses(owner_name);
CREATE INDEX idx_horses_breed ON public.horses(breed);
CREATE INDEX idx_horses_status ON public.horses(status);
CREATE INDEX idx_horses_registration_number ON public.horses(registration_number);

CREATE INDEX idx_health_records_horse_id ON public.health_records(horse_id);
CREATE INDEX idx_health_records_tenant_id ON public.health_records(tenant_id);
CREATE INDEX idx_health_records_date ON public.health_records(date_performed);
CREATE INDEX idx_health_records_type ON public.health_records(record_type);

CREATE INDEX idx_performance_records_horse_id ON public.performance_records(horse_id);
CREATE INDEX idx_performance_records_tenant_id ON public.performance_records(tenant_id);
CREATE INDEX idx_performance_records_date ON public.performance_records(event_date);

CREATE INDEX idx_training_records_horse_id ON public.training_records(horse_id);
CREATE INDEX idx_training_records_tenant_id ON public.training_records(tenant_id);
CREATE INDEX idx_training_records_date ON public.training_records(session_date);

CREATE INDEX idx_breeding_records_stallion_id ON public.breeding_records(stallion_id);
CREATE INDEX idx_breeding_records_mare_id ON public.breeding_records(mare_id);
CREATE INDEX idx_breeding_records_tenant_id ON public.breeding_records(tenant_id);

CREATE INDEX idx_pregnancy_records_mare_id ON public.pregnancy_records(mare_id);
CREATE INDEX idx_pregnancy_records_tenant_id ON public.pregnancy_records(tenant_id);

CREATE INDEX idx_horse_documents_horse_id ON public.horse_documents(horse_id);
CREATE INDEX idx_horse_documents_tenant_id ON public.horse_documents(tenant_id);
CREATE INDEX idx_horse_documents_type ON public.horse_documents(document_type);

CREATE INDEX idx_horse_movements_horse_id ON public.horse_movements(horse_id);
CREATE INDEX idx_horse_movements_tenant_id ON public.horse_movements(tenant_id);
CREATE INDEX idx_horse_movements_date ON public.horse_movements(movement_date);

CREATE INDEX idx_nutrition_records_horse_id ON public.nutrition_records(horse_id);
CREATE INDEX idx_nutrition_records_tenant_id ON public.nutrition_records(tenant_id);

CREATE INDEX idx_horse_financials_horse_id ON public.horse_financials(horse_id);
CREATE INDEX idx_horse_financials_tenant_id ON public.horse_financials(tenant_id);

-- Enable Row Level Security on all tables
ALTER TABLE public.horses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.health_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.performance_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.training_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.breeding_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pregnancy_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.horse_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.horse_movements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.nutrition_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.horse_financials ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for tenant-based access
CREATE POLICY "Users can access horses in their tenants" ON public.horses
  FOR ALL USING (
    tenant_id IN (
      SELECT tenant_id FROM public.get_user_tenant_access(auth.uid())
    )
  );

CREATE POLICY "Users can access health records in their tenants" ON public.health_records
  FOR ALL USING (
    tenant_id IN (
      SELECT tenant_id FROM public.get_user_tenant_access(auth.uid())
    )
  );

CREATE POLICY "Users can access performance records in their tenants" ON public.performance_records
  FOR ALL USING (
    tenant_id IN (
      SELECT tenant_id FROM public.get_user_tenant_access(auth.uid())
    )
  );

CREATE POLICY "Users can access training records in their tenants" ON public.training_records
  FOR ALL USING (
    tenant_id IN (
      SELECT tenant_id FROM public.get_user_tenant_access(auth.uid())
    )
  );

CREATE POLICY "Users can access breeding records in their tenants" ON public.breeding_records
  FOR ALL USING (
    tenant_id IN (
      SELECT tenant_id FROM public.get_user_tenant_access(auth.uid())
    )
  );

CREATE POLICY "Users can access pregnancy records in their tenants" ON public.pregnancy_records
  FOR ALL USING (
    tenant_id IN (
      SELECT tenant_id FROM public.get_user_tenant_access(auth.uid())
    )
  );

CREATE POLICY "Users can access horse documents in their tenants" ON public.horse_documents
  FOR ALL USING (
    tenant_id IN (
      SELECT tenant_id FROM public.get_user_tenant_access(auth.uid())
    )
  );

CREATE POLICY "Users can access horse movements in their tenants" ON public.horse_movements
  FOR ALL USING (
    tenant_id IN (
      SELECT tenant_id FROM public.get_user_tenant_access(auth.uid())
    )
  );

CREATE POLICY "Users can access nutrition records in their tenants" ON public.nutrition_records
  FOR ALL USING (
    tenant_id IN (
      SELECT tenant_id FROM public.get_user_tenant_access(auth.uid())
    )
  );

CREATE POLICY "Users can access horse financials in their tenants" ON public.horse_financials
  FOR ALL USING (
    tenant_id IN (
      SELECT tenant_id FROM public.get_user_tenant_access(auth.uid())
    )
  );

-- Create triggers for updated_at timestamps
CREATE TRIGGER update_horses_updated_at
  BEFORE UPDATE ON public.horses
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_health_records_updated_at
  BEFORE UPDATE ON public.health_records
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_performance_records_updated_at
  BEFORE UPDATE ON public.performance_records
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_training_records_updated_at
  BEFORE UPDATE ON public.training_records
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_breeding_records_updated_at
  BEFORE UPDATE ON public.breeding_records
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_pregnancy_records_updated_at
  BEFORE UPDATE ON public.pregnancy_records
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_horse_documents_updated_at
  BEFORE UPDATE ON public.horse_documents
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_horse_movements_updated_at
  BEFORE UPDATE ON public.horse_movements
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_nutrition_records_updated_at
  BEFORE UPDATE ON public.nutrition_records
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_horse_financials_updated_at
  BEFORE UPDATE ON public.horse_financials
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
