
-- Create vaccinations table for tracking vaccination records
CREATE TABLE public.vaccinations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL,
  horse_id UUID NOT NULL,
  vaccine_name TEXT NOT NULL,
  vaccine_type TEXT NOT NULL CHECK (vaccine_type IN ('core', 'risk_based', 'required', 'optional')),
  manufacturer TEXT,
  batch_number TEXT,
  vaccination_date DATE NOT NULL,
  administered_by TEXT NOT NULL,
  next_due_date DATE,
  site_of_injection TEXT,
  dose_amount TEXT,
  reaction_notes TEXT,
  certificate_number TEXT,
  status TEXT NOT NULL DEFAULT 'completed' CHECK (status IN ('scheduled', 'completed', 'overdue', 'cancelled')),
  cost NUMERIC,
  veterinarian_id UUID,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by UUID,
  CONSTRAINT fk_vaccinations_tenant FOREIGN KEY (tenant_id) REFERENCES public.tenants(id),
  CONSTRAINT fk_vaccinations_horse FOREIGN KEY (horse_id) REFERENCES public.horses(id)
);

-- Create medications table for tracking medication records
CREATE TABLE public.medications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL,
  horse_id UUID NOT NULL,
  medication_name TEXT NOT NULL,
  medication_type TEXT NOT NULL CHECK (medication_type IN ('antibiotic', 'anti_inflammatory', 'pain_reliever', 'supplement', 'dewormer', 'vaccine', 'other')),
  dosage TEXT NOT NULL,
  frequency TEXT NOT NULL,
  route_of_administration TEXT CHECK (route_of_administration IN ('oral', 'injection', 'topical', 'intravenous', 'intramuscular', 'subcutaneous')),
  start_date DATE NOT NULL,
  end_date DATE,
  prescribed_by TEXT NOT NULL,
  reason_for_treatment TEXT,
  instructions TEXT,
  side_effects TEXT,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'completed', 'discontinued', 'paused')),
  cost NUMERIC,
  veterinarian_id UUID,
  health_record_id UUID,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by UUID,
  CONSTRAINT fk_medications_tenant FOREIGN KEY (tenant_id) REFERENCES public.tenants(id),
  CONSTRAINT fk_medications_horse FOREIGN KEY (horse_id) REFERENCES public.horses(id),
  CONSTRAINT fk_medications_health_record FOREIGN KEY (health_record_id) REFERENCES public.health_records(id)
);

-- Create veterinarians table for managing veterinarian contacts
CREATE TABLE public.veterinarians (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL,
  name TEXT NOT NULL,
  license_number TEXT,
  specialty TEXT,
  clinic_name TEXT,
  phone TEXT,
  email TEXT,
  address JSONB DEFAULT '{}',
  emergency_contact BOOLEAN DEFAULT false,
  consultation_fee NUMERIC,
  travel_fee NUMERIC,
  notes TEXT,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by UUID,
  CONSTRAINT fk_veterinarians_tenant FOREIGN KEY (tenant_id) REFERENCES public.tenants(id)
);

-- Create medical_alerts table for health alerts and reminders
CREATE TABLE public.medical_alerts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL,
  horse_id UUID NOT NULL,
  alert_type TEXT NOT NULL CHECK (alert_type IN ('vaccination_due', 'medication_reminder', 'checkup_due', 'emergency', 'follow_up', 'custom')),
  title TEXT NOT NULL,
  description TEXT,
  severity TEXT NOT NULL DEFAULT 'medium' CHECK (severity IN ('low', 'medium', 'high', 'critical')),
  due_date DATE,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'acknowledged', 'resolved', 'dismissed')),
  related_record_type TEXT CHECK (related_record_type IN ('health_record', 'vaccination', 'medication')),
  related_record_id UUID,
  acknowledged_at TIMESTAMP WITH TIME ZONE,
  acknowledged_by UUID,
  resolved_at TIMESTAMP WITH TIME ZONE,
  resolved_by UUID,
  auto_generated BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by UUID,
  CONSTRAINT fk_medical_alerts_tenant FOREIGN KEY (tenant_id) REFERENCES public.tenants(id),
  CONSTRAINT fk_medical_alerts_horse FOREIGN KEY (horse_id) REFERENCES public.horses(id)
);

-- Add foreign key reference for veterinarian_id in existing tables
ALTER TABLE public.vaccinations ADD CONSTRAINT fk_vaccinations_veterinarian FOREIGN KEY (veterinarian_id) REFERENCES public.veterinarians(id);
ALTER TABLE public.medications ADD CONSTRAINT fk_medications_veterinarian FOREIGN KEY (veterinarian_id) REFERENCES public.veterinarians(id);

-- Enable RLS on all new tables
ALTER TABLE public.vaccinations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.medications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.veterinarians ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.medical_alerts ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for all new tables
CREATE POLICY "Users can access vaccinations in their tenants" ON public.vaccinations
  FOR ALL USING (
    tenant_id IN (
      SELECT tenant_id FROM public.get_user_tenant_access(auth.uid())
    )
  );

CREATE POLICY "Users can access medications in their tenants" ON public.medications
  FOR ALL USING (
    tenant_id IN (
      SELECT tenant_id FROM public.get_user_tenant_access(auth.uid())
    )
  );

CREATE POLICY "Users can access veterinarians in their tenants" ON public.veterinarians
  FOR ALL USING (
    tenant_id IN (
      SELECT tenant_id FROM public.get_user_tenant_access(auth.uid())
    )
  );

CREATE POLICY "Users can access medical alerts in their tenants" ON public.medical_alerts
  FOR ALL USING (
    tenant_id IN (
      SELECT tenant_id FROM public.get_user_tenant_access(auth.uid())
    )
  );

-- Create indexes for better performance
CREATE INDEX idx_vaccinations_tenant_id ON public.vaccinations(tenant_id);
CREATE INDEX idx_vaccinations_horse_id ON public.vaccinations(horse_id);
CREATE INDEX idx_vaccinations_next_due_date ON public.vaccinations(next_due_date);
CREATE INDEX idx_vaccinations_status ON public.vaccinations(status);

CREATE INDEX idx_medications_tenant_id ON public.medications(tenant_id);
CREATE INDEX idx_medications_horse_id ON public.medications(horse_id);
CREATE INDEX idx_medications_status ON public.medications(status);
CREATE INDEX idx_medications_end_date ON public.medications(end_date);

CREATE INDEX idx_veterinarians_tenant_id ON public.veterinarians(tenant_id);
CREATE INDEX idx_veterinarians_status ON public.veterinarians(status);

CREATE INDEX idx_medical_alerts_tenant_id ON public.medical_alerts(tenant_id);
CREATE INDEX idx_medical_alerts_horse_id ON public.medical_alerts(horse_id);
CREATE INDEX idx_medical_alerts_status ON public.medical_alerts(status);
CREATE INDEX idx_medical_alerts_due_date ON public.medical_alerts(due_date);
CREATE INDEX idx_medical_alerts_severity ON public.medical_alerts(severity);

-- Create triggers for updated_at columns
CREATE TRIGGER update_vaccinations_updated_at
  BEFORE UPDATE ON public.vaccinations
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_medications_updated_at
  BEFORE UPDATE ON public.medications
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_veterinarians_updated_at
  BEFORE UPDATE ON public.veterinarians
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_medical_alerts_updated_at
  BEFORE UPDATE ON public.medical_alerts
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
