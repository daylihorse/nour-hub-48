
-- Phase 1: Foundation & Core Management Enhancements

-- First, let's create an employees table for HR management
CREATE TABLE public.employees (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL,
  employee_number TEXT UNIQUE,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT UNIQUE,
  phone TEXT,
  hire_date DATE NOT NULL,
  position TEXT NOT NULL,
  department TEXT NOT NULL,
  salary NUMERIC,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'terminated')),
  emergency_contact JSONB DEFAULT '{}',
  address JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by UUID
);

-- Create stalls/facilities table for better facility management
CREATE TABLE public.stalls (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL,
  stall_number TEXT NOT NULL,
  stall_type TEXT NOT NULL CHECK (stall_type IN ('regular', 'foaling', 'quarantine', 'medical', 'breeding')),
  capacity INTEGER DEFAULT 1,
  status TEXT NOT NULL DEFAULT 'available' CHECK (status IN ('available', 'occupied', 'maintenance', 'reserved')),
  location TEXT,
  dimensions TEXT,
  features JSONB DEFAULT '[]',
  current_occupant_id UUID,
  rent_amount NUMERIC,
  utilities_included BOOLEAN DEFAULT false,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by UUID
);

-- Create inventory categories table
CREATE TABLE public.inventory_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  parent_category_id UUID,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create inventory items table
CREATE TABLE public.inventory_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  category_id UUID,
  sku TEXT,
  barcode TEXT,
  unit_of_measure TEXT NOT NULL,
  reorder_level INTEGER DEFAULT 0,
  current_stock INTEGER DEFAULT 0,
  unit_cost NUMERIC,
  supplier_info JSONB DEFAULT '{}',
  storage_location TEXT,
  expiry_date DATE,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'discontinued', 'out_of_stock')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by UUID
);

-- Create inventory transactions table for stock movements
CREATE TABLE public.inventory_transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL,
  item_id UUID NOT NULL,
  transaction_type TEXT NOT NULL CHECK (transaction_type IN ('purchase', 'sale', 'adjustment', 'transfer', 'return')),
  quantity INTEGER NOT NULL,
  unit_cost NUMERIC,
  total_cost NUMERIC,
  reference_number TEXT,
  notes TEXT,
  transaction_date DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by UUID
);

-- Create clients table for customer/owner management
CREATE TABLE public.clients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL,
  client_number TEXT UNIQUE,
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  address JSONB DEFAULT '{}',
  client_type TEXT NOT NULL CHECK (client_type IN ('horse_owner', 'veterinarian', 'supplier', 'trainer', 'staff', 'other')),
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
  billing_address JSONB DEFAULT '{}',
  payment_terms TEXT,
  credit_limit NUMERIC,
  tax_id TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by UUID
);

-- Create appointments table for scheduling
CREATE TABLE public.appointments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  appointment_type TEXT NOT NULL CHECK (appointment_type IN ('veterinary', 'training', 'breeding', 'grooming', 'farrier', 'dental', 'other')),
  horse_id UUID,
  client_id UUID,
  employee_id UUID,
  appointment_date TIMESTAMP WITH TIME ZONE NOT NULL,
  duration_minutes INTEGER DEFAULT 60,
  status TEXT NOT NULL DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'confirmed', 'in_progress', 'completed', 'cancelled', 'no_show')),
  location TEXT,
  notes TEXT,
  reminder_sent BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by UUID
);

-- Add foreign key constraints
ALTER TABLE public.employees ADD CONSTRAINT fk_employees_tenant FOREIGN KEY (tenant_id) REFERENCES public.tenants(id);
ALTER TABLE public.stalls ADD CONSTRAINT fk_stalls_tenant FOREIGN KEY (tenant_id) REFERENCES public.tenants(id);
ALTER TABLE public.inventory_categories ADD CONSTRAINT fk_inventory_categories_tenant FOREIGN KEY (tenant_id) REFERENCES public.tenants(id);
ALTER TABLE public.inventory_items ADD CONSTRAINT fk_inventory_items_tenant FOREIGN KEY (tenant_id) REFERENCES public.tenants(id);
ALTER TABLE public.inventory_items ADD CONSTRAINT fk_inventory_items_category FOREIGN KEY (category_id) REFERENCES public.inventory_categories(id);
ALTER TABLE public.inventory_transactions ADD CONSTRAINT fk_inventory_transactions_tenant FOREIGN KEY (tenant_id) REFERENCES public.tenants(id);
ALTER TABLE public.inventory_transactions ADD CONSTRAINT fk_inventory_transactions_item FOREIGN KEY (item_id) REFERENCES public.inventory_items(id);
ALTER TABLE public.clients ADD CONSTRAINT fk_clients_tenant FOREIGN KEY (tenant_id) REFERENCES public.tenants(id);
ALTER TABLE public.appointments ADD CONSTRAINT fk_appointments_tenant FOREIGN KEY (tenant_id) REFERENCES public.tenants(id);
ALTER TABLE public.appointments ADD CONSTRAINT fk_appointments_horse FOREIGN KEY (horse_id) REFERENCES public.horses(id);
ALTER TABLE public.appointments ADD CONSTRAINT fk_appointments_client FOREIGN KEY (client_id) REFERENCES public.clients(id);
ALTER TABLE public.appointments ADD CONSTRAINT fk_appointments_employee FOREIGN KEY (employee_id) REFERENCES public.employees(id);

-- Enable RLS on all new tables
ALTER TABLE public.employees ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.stalls ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inventory_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inventory_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inventory_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for all new tables
CREATE POLICY "Users can access employees in their tenants" ON public.employees
  FOR ALL USING (
    tenant_id IN (
      SELECT tenant_id FROM public.get_user_tenant_access(auth.uid())
    )
  );

CREATE POLICY "Users can access stalls in their tenants" ON public.stalls
  FOR ALL USING (
    tenant_id IN (
      SELECT tenant_id FROM public.get_user_tenant_access(auth.uid())
    )
  );

CREATE POLICY "Users can access inventory categories in their tenants" ON public.inventory_categories
  FOR ALL USING (
    tenant_id IN (
      SELECT tenant_id FROM public.get_user_tenant_access(auth.uid())
    )
  );

CREATE POLICY "Users can access inventory items in their tenants" ON public.inventory_items
  FOR ALL USING (
    tenant_id IN (
      SELECT tenant_id FROM public.get_user_tenant_access(auth.uid())
    )
  );

CREATE POLICY "Users can access inventory transactions in their tenants" ON public.inventory_transactions
  FOR ALL USING (
    tenant_id IN (
      SELECT tenant_id FROM public.get_user_tenant_access(auth.uid())
    )
  );

CREATE POLICY "Users can access clients in their tenants" ON public.clients
  FOR ALL USING (
    tenant_id IN (
      SELECT tenant_id FROM public.get_user_tenant_access(auth.uid())
    )
  );

CREATE POLICY "Users can access appointments in their tenants" ON public.appointments
  FOR ALL USING (
    tenant_id IN (
      SELECT tenant_id FROM public.get_user_tenant_access(auth.uid())
    )
  );

-- Create indexes for better performance
CREATE INDEX idx_employees_tenant_id ON public.employees(tenant_id);
CREATE INDEX idx_employees_department ON public.employees(department);
CREATE INDEX idx_stalls_tenant_id ON public.stalls(tenant_id);
CREATE INDEX idx_stalls_status ON public.stalls(status);
CREATE INDEX idx_inventory_categories_tenant_id ON public.inventory_categories(tenant_id);
CREATE INDEX idx_inventory_items_tenant_id ON public.inventory_items(tenant_id);
CREATE INDEX idx_inventory_items_category_id ON public.inventory_items(category_id);
CREATE INDEX idx_inventory_transactions_tenant_id ON public.inventory_transactions(tenant_id);
CREATE INDEX idx_inventory_transactions_item_id ON public.inventory_transactions(item_id);
CREATE INDEX idx_clients_tenant_id ON public.clients(tenant_id);
CREATE INDEX idx_clients_type ON public.clients(client_type);
CREATE INDEX idx_appointments_tenant_id ON public.appointments(tenant_id);
CREATE INDEX idx_appointments_date ON public.appointments(appointment_date);
CREATE INDEX idx_appointments_horse_id ON public.appointments(horse_id);

-- Create triggers for updated_at columns
CREATE TRIGGER update_employees_updated_at
  BEFORE UPDATE ON public.employees
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_stalls_updated_at
  BEFORE UPDATE ON public.stalls
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_inventory_categories_updated_at
  BEFORE UPDATE ON public.inventory_categories
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_inventory_items_updated_at
  BEFORE UPDATE ON public.inventory_items
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_clients_updated_at
  BEFORE UPDATE ON public.clients
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_appointments_updated_at
  BEFORE UPDATE ON public.appointments
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
