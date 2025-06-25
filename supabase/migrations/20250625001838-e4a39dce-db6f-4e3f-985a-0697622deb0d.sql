
-- First, let's add Row Level Security policies for the clients table
-- Enable RLS if not already enabled
ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;

-- Create policies for clients table
CREATE POLICY "Users can view clients in their tenant" ON public.clients
  FOR SELECT USING (
    tenant_id IN (
      SELECT tenant_id FROM public.tenant_users 
      WHERE user_id = auth.uid() AND status = 'active'
    )
  );

CREATE POLICY "Users can insert clients in their tenant" ON public.clients
  FOR INSERT WITH CHECK (
    tenant_id IN (
      SELECT tenant_id FROM public.tenant_users 
      WHERE user_id = auth.uid() AND status = 'active'
    )
  );

CREATE POLICY "Users can update clients in their tenant" ON public.clients
  FOR UPDATE USING (
    tenant_id IN (
      SELECT tenant_id FROM public.tenant_users 
      WHERE user_id = auth.uid() AND status = 'active'
    )
  );

CREATE POLICY "Users can delete clients in their tenant" ON public.clients
  FOR DELETE USING (
    tenant_id IN (
      SELECT tenant_id FROM public.tenant_users 
      WHERE user_id = auth.uid() AND status = 'active'
    )
  );

-- Create client_notes table for storing client notes
CREATE TABLE IF NOT EXISTS public.client_notes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  client_id UUID NOT NULL REFERENCES public.clients(id) ON DELETE CASCADE,
  tenant_id UUID NOT NULL,
  content TEXT NOT NULL,
  priority TEXT NOT NULL DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high')),
  category TEXT NOT NULL,
  is_private BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_by UUID REFERENCES auth.users(id)
);

-- Enable RLS for client_notes
ALTER TABLE public.client_notes ENABLE ROW LEVEL SECURITY;

-- Create policies for client_notes
CREATE POLICY "Users can view client notes in their tenant" ON public.client_notes
  FOR SELECT USING (
    tenant_id IN (
      SELECT tenant_id FROM public.tenant_users 
      WHERE user_id = auth.uid() AND status = 'active'
    )
  );

CREATE POLICY "Users can insert client notes in their tenant" ON public.client_notes
  FOR INSERT WITH CHECK (
    tenant_id IN (
      SELECT tenant_id FROM public.tenant_users 
      WHERE user_id = auth.uid() AND status = 'active'
    )
  );

CREATE POLICY "Users can update client notes in their tenant" ON public.client_notes
  FOR UPDATE USING (
    tenant_id IN (
      SELECT tenant_id FROM public.tenant_users 
      WHERE user_id = auth.uid() AND status = 'active'
    )
  );

-- Create client_tasks table for storing client tasks
CREATE TABLE IF NOT EXISTS public.client_tasks (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  client_id UUID NOT NULL REFERENCES public.clients(id) ON DELETE CASCADE,
  tenant_id UUID NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed')),
  priority TEXT NOT NULL DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high')),
  due_date DATE,
  assigned_to TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_by UUID REFERENCES auth.users(id)
);

-- Enable RLS for client_tasks
ALTER TABLE public.client_tasks ENABLE ROW LEVEL SECURITY;

-- Create policies for client_tasks
CREATE POLICY "Users can view client tasks in their tenant" ON public.client_tasks
  FOR SELECT USING (
    tenant_id IN (
      SELECT tenant_id FROM public.tenant_users 
      WHERE user_id = auth.uid() AND status = 'active'
    )
  );

CREATE POLICY "Users can insert client tasks in their tenant" ON public.client_tasks
  FOR INSERT WITH CHECK (
    tenant_id IN (
      SELECT tenant_id FROM public.tenant_users 
      WHERE user_id = auth.uid() AND status = 'active'
    )
  );

CREATE POLICY "Users can update client tasks in their tenant" ON public.client_tasks
  FOR UPDATE USING (
    tenant_id IN (
      SELECT tenant_id FROM public.tenant_users 
      WHERE user_id = auth.uid() AND status = 'active'
    )
  );

-- Create client_files table for storing client documents
CREATE TABLE IF NOT EXISTS public.client_files (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  client_id UUID NOT NULL REFERENCES public.clients(id) ON DELETE CASCADE,
  tenant_id UUID NOT NULL,
  name TEXT NOT NULL,
  file_type TEXT NOT NULL,
  file_size INTEGER,
  file_url TEXT NOT NULL,
  upload_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_by UUID REFERENCES auth.users(id)
);

-- Enable RLS for client_files
ALTER TABLE public.client_files ENABLE ROW LEVEL SECURITY;

-- Create policies for client_files
CREATE POLICY "Users can view client files in their tenant" ON public.client_files
  FOR SELECT USING (
    tenant_id IN (
      SELECT tenant_id FROM public.tenant_users 
      WHERE user_id = auth.uid() AND status = 'active'
    )
  );

CREATE POLICY "Users can insert client files in their tenant" ON public.client_files
  FOR INSERT WITH CHECK (
    tenant_id IN (
      SELECT tenant_id FROM public.tenant_users 
      WHERE user_id = auth.uid() AND status = 'active'
    )
  );

-- Add updated_at trigger for client_notes
CREATE TRIGGER update_client_notes_updated_at
  BEFORE UPDATE ON public.client_notes
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Add updated_at trigger for client_tasks
CREATE TRIGGER update_client_tasks_updated_at
  BEFORE UPDATE ON public.client_tasks
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Insert some sample clients for testing
INSERT INTO public.clients (
  tenant_id, 
  name, 
  email, 
  phone, 
  address, 
  client_type, 
  status,
  client_number,
  created_by
) VALUES 
(
  '550e8400-e29b-41d4-a716-446655440001',
  'Ahmed Al-Rashid',
  'ahmed@example.com',
  '+971 50 123 4567',
  '{"street": "Al Wasl Road", "city": "Dubai", "country": "UAE"}',
  'horse_owner',
  'active',
  'CL001',
  (SELECT id FROM auth.users LIMIT 1)
),
(
  '550e8400-e29b-41d4-a716-446655440001',
  'Sarah Johnson',
  'sarah@email.com',
  '+1-555-0127',
  '{"street": "Main Street 123", "city": "New York", "country": "USA"}',
  'veterinarian',
  'active',
  'CL002',
  (SELECT id FROM auth.users LIMIT 1)
),
(
  '550e8400-e29b-41d4-a716-446655440001',
  'Elite Feed Supplies',
  'info@elitefeed.com',
  '+971 4 567 8901',
  '{"street": "Industrial Area", "city": "Abu Dhabi", "country": "UAE"}',
  'supplier',
  'active',
  'CL003',
  (SELECT id FROM auth.users LIMIT 1)
);
