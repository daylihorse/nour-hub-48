
-- Create trainers table
CREATE TABLE public.trainers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  tenant_id UUID NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  specializations TEXT[] DEFAULT '{}',
  certifications TEXT[] DEFAULT '{}',
  experience_years INTEGER,
  hourly_rate NUMERIC,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'on_leave')),
  emergency_contact JSONB DEFAULT '{}',
  availability_schedule JSONB DEFAULT '{}',
  bio TEXT,
  profile_image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  created_by UUID
);

-- Create training_programs table
CREATE TABLE public.training_programs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  tenant_id UUID NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  program_type TEXT NOT NULL CHECK (program_type IN ('basic', 'intermediate', 'advanced', 'specialized', 'rehabilitation', 'competition_prep')),
  discipline TEXT NOT NULL,
  duration_weeks INTEGER NOT NULL DEFAULT 1,
  intensity_level TEXT NOT NULL DEFAULT 'medium' CHECK (intensity_level IN ('low', 'medium', 'high')),
  max_participants INTEGER DEFAULT 1,
  prerequisites TEXT[],
  objectives TEXT[],
  pricing JSONB DEFAULT '{}',
  schedule_template JSONB DEFAULT '{}',
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'draft')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  created_by UUID
);

-- Create training_facilities table
CREATE TABLE public.training_facilities (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  tenant_id UUID NOT NULL,
  name TEXT NOT NULL,
  facility_type TEXT NOT NULL CHECK (facility_type IN ('arena', 'paddock', 'track', 'jumps', 'dressage', 'cross_country', 'round_pen')),
  capacity INTEGER NOT NULL DEFAULT 1,
  dimensions TEXT,
  surface_type TEXT,
  equipment_available TEXT[] DEFAULT '{}',
  features TEXT[] DEFAULT '{}',
  status TEXT NOT NULL DEFAULT 'available' CHECK (status IN ('available', 'occupied', 'maintenance', 'reserved')),
  location_details TEXT,
  maintenance_schedule JSONB DEFAULT '{}',
  booking_rules JSONB DEFAULT '{}',
  hourly_rate NUMERIC,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  created_by UUID
);

-- Create competitions table
CREATE TABLE public.competitions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  tenant_id UUID NOT NULL,
  name TEXT NOT NULL,
  competition_type TEXT NOT NULL,
  discipline TEXT NOT NULL,
  level TEXT,
  location TEXT NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  registration_deadline DATE,
  entry_fee NUMERIC,
  prize_pool NUMERIC,
  max_participants INTEGER,
  current_participants INTEGER DEFAULT 0,
  organizer TEXT,
  contact_info JSONB DEFAULT '{}',
  rules_regulations TEXT,
  categories TEXT[] DEFAULT '{}',
  status TEXT NOT NULL DEFAULT 'upcoming' CHECK (status IN ('upcoming', 'ongoing', 'completed', 'cancelled')),
  results JSONB DEFAULT '{}',
  attachments JSONB DEFAULT '[]',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  created_by UUID
);

-- Create achievements table
CREATE TABLE public.achievements (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  tenant_id UUID NOT NULL,
  horse_id UUID NOT NULL,
  competition_id UUID,
  achievement_type TEXT NOT NULL CHECK (achievement_type IN ('competition', 'training_milestone', 'certification', 'record', 'award')),
  title TEXT NOT NULL,
  description TEXT,
  date_achieved DATE NOT NULL,
  level TEXT,
  ranking INTEGER,
  score NUMERIC,
  time_recorded INTERVAL,
  judge_notes TEXT,
  trainer_id UUID,
  verified BOOLEAN DEFAULT false,
  verification_date DATE,
  certificate_url TEXT,
  attachments JSONB DEFAULT '[]',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  created_by UUID
);

-- Create training_assessments table
CREATE TABLE public.training_assessments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  tenant_id UUID NOT NULL,
  horse_id UUID NOT NULL,
  trainer_id UUID,
  assessment_type TEXT NOT NULL CHECK (assessment_type IN ('initial', 'progress', 'final', 'monthly', 'quarterly')),
  assessment_date DATE NOT NULL,
  program_id UUID,
  session_count INTEGER DEFAULT 0,
  overall_score NUMERIC,
  categories JSONB NOT NULL DEFAULT '{}',
  strengths TEXT[],
  areas_for_improvement TEXT[],
  recommendations TEXT[],
  next_assessment_date DATE,
  goals_met BOOLEAN DEFAULT false,
  notes TEXT,
  attachments JSONB DEFAULT '[]',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  created_by UUID
);

-- Add foreign key constraints
ALTER TABLE public.achievements ADD CONSTRAINT fk_achievements_horse FOREIGN KEY (horse_id) REFERENCES public.horses(id);
ALTER TABLE public.achievements ADD CONSTRAINT fk_achievements_competition FOREIGN KEY (competition_id) REFERENCES public.competitions(id);
ALTER TABLE public.achievements ADD CONSTRAINT fk_achievements_trainer FOREIGN KEY (trainer_id) REFERENCES public.trainers(id);

ALTER TABLE public.training_assessments ADD CONSTRAINT fk_assessments_horse FOREIGN KEY (horse_id) REFERENCES public.horses(id);
ALTER TABLE public.training_assessments ADD CONSTRAINT fk_assessments_trainer FOREIGN KEY (trainer_id) REFERENCES public.trainers(id);
ALTER TABLE public.training_assessments ADD CONSTRAINT fk_assessments_program FOREIGN KEY (program_id) REFERENCES public.training_programs(id);

-- Add triggers for updated_at columns
CREATE TRIGGER update_trainers_updated_at BEFORE UPDATE ON public.trainers FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_training_programs_updated_at BEFORE UPDATE ON public.training_programs FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_training_facilities_updated_at BEFORE UPDATE ON public.training_facilities FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_competitions_updated_at BEFORE UPDATE ON public.competitions FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_achievements_updated_at BEFORE UPDATE ON public.achievements FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_training_assessments_updated_at BEFORE UPDATE ON public.training_assessments FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Create indexes for better performance
CREATE INDEX idx_trainers_tenant_id ON public.trainers(tenant_id);
CREATE INDEX idx_trainers_status ON public.trainers(status);
CREATE INDEX idx_training_programs_tenant_id ON public.training_programs(tenant_id);
CREATE INDEX idx_training_programs_type ON public.training_programs(program_type);
CREATE INDEX idx_training_facilities_tenant_id ON public.training_facilities(tenant_id);
CREATE INDEX idx_training_facilities_type ON public.training_facilities(facility_type);
CREATE INDEX idx_competitions_tenant_id ON public.competitions(tenant_id);
CREATE INDEX idx_competitions_date ON public.competitions(start_date);
CREATE INDEX idx_achievements_horse_id ON public.achievements(horse_id);
CREATE INDEX idx_achievements_competition_id ON public.achievements(competition_id);
CREATE INDEX idx_training_assessments_horse_id ON public.training_assessments(horse_id);
CREATE INDEX idx_training_assessments_date ON public.training_assessments(assessment_date);
