
-- Phase 2: Enhanced Financial Management & Advanced Features

-- Financial Accounts for enhanced accounting
CREATE TABLE public.financial_accounts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL,
  account_code TEXT NOT NULL,
  account_name TEXT NOT NULL,
  account_type TEXT NOT NULL CHECK (account_type IN ('asset', 'liability', 'equity', 'revenue', 'expense')),
  parent_account_id UUID,
  balance NUMERIC DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by UUID,
  UNIQUE(tenant_id, account_code)
);

-- Invoices for billing management
CREATE TABLE public.invoices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL,
  invoice_number TEXT NOT NULL,
  client_id UUID,
  invoice_date DATE NOT NULL DEFAULT CURRENT_DATE,
  due_date DATE NOT NULL,
  subtotal NUMERIC NOT NULL DEFAULT 0,
  tax_amount NUMERIC DEFAULT 0,
  discount_amount NUMERIC DEFAULT 0,
  total_amount NUMERIC NOT NULL DEFAULT 0,
  paid_amount NUMERIC DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'sent', 'paid', 'overdue', 'cancelled')),
  payment_terms TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by UUID,
  UNIQUE(tenant_id, invoice_number)
);

-- Invoice line items
CREATE TABLE public.invoice_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  invoice_id UUID NOT NULL,
  item_type TEXT NOT NULL CHECK (item_type IN ('service', 'product', 'board', 'training', 'veterinary', 'other')),
  description TEXT NOT NULL,
  quantity NUMERIC NOT NULL DEFAULT 1,
  unit_price NUMERIC NOT NULL,
  line_total NUMERIC NOT NULL,
  horse_id UUID,
  service_date DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Purchase orders for procurement
CREATE TABLE public.purchase_orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL,
  po_number TEXT NOT NULL,
  supplier_name TEXT NOT NULL,
  supplier_contact JSONB DEFAULT '{}',
  order_date DATE NOT NULL DEFAULT CURRENT_DATE,
  expected_delivery_date DATE,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'ordered', 'received', 'cancelled')),
  subtotal NUMERIC NOT NULL DEFAULT 0,
  tax_amount NUMERIC DEFAULT 0,
  total_amount NUMERIC NOT NULL DEFAULT 0,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by UUID,
  UNIQUE(tenant_id, po_number)
);

-- Purchase order items
CREATE TABLE public.purchase_order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  purchase_order_id UUID NOT NULL,
  item_id UUID,
  description TEXT NOT NULL,
  quantity INTEGER NOT NULL,
  unit_cost NUMERIC NOT NULL,
  line_total NUMERIC NOT NULL,
  received_quantity INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enhanced scheduling system
CREATE TABLE public.recurring_schedules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  schedule_type TEXT NOT NULL CHECK (schedule_type IN ('feeding', 'exercise', 'medical', 'grooming', 'maintenance')),
  recurrence_pattern TEXT NOT NULL CHECK (recurrence_pattern IN ('daily', 'weekly', 'monthly', 'custom')),
  recurrence_data JSONB DEFAULT '{}',
  start_date DATE NOT NULL,
  end_date DATE,
  is_active BOOLEAN DEFAULT true,
  assigned_to UUID,
  horse_id UUID,
  location TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by UUID
);

-- Communication logs
CREATE TABLE public.communications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL,
  communication_type TEXT NOT NULL CHECK (communication_type IN ('call', 'email', 'sms', 'meeting', 'note')),
  subject TEXT,
  content TEXT NOT NULL,
  direction TEXT NOT NULL CHECK (direction IN ('inbound', 'outbound')),
  contact_person TEXT,
  contact_info JSONB DEFAULT '{}',
  client_id UUID,
  horse_id UUID,
  employee_id UUID,
  status TEXT DEFAULT 'completed' CHECK (status IN ('pending', 'completed', 'failed')),
  scheduled_at TIMESTAMP WITH TIME ZONE,
  completed_at TIMESTAMP WITH TIME ZONE,
  attachments JSONB DEFAULT '[]',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by UUID
);

-- Tasks and follow-ups
CREATE TABLE public.tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  task_type TEXT NOT NULL CHECK (task_type IN ('follow_up', 'reminder', 'maintenance', 'medical', 'administrative', 'other')),
  priority TEXT NOT NULL DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed', 'cancelled')),
  assigned_to UUID,
  due_date DATE,
  completed_date DATE,
  related_entity_type TEXT,
  related_entity_id UUID,
  estimated_duration INTEGER,
  actual_duration INTEGER,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by UUID
);

-- Reports configuration
CREATE TABLE public.report_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  report_type TEXT NOT NULL CHECK (report_type IN ('financial', 'operational', 'health', 'performance', 'inventory')),
  template_data JSONB NOT NULL DEFAULT '{}',
  parameters JSONB DEFAULT '{}',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by UUID
);

-- Add foreign key constraints
ALTER TABLE public.financial_accounts ADD CONSTRAINT fk_financial_accounts_tenant FOREIGN KEY (tenant_id) REFERENCES public.tenants(id);
ALTER TABLE public.financial_accounts ADD CONSTRAINT fk_financial_accounts_parent FOREIGN KEY (parent_account_id) REFERENCES public.financial_accounts(id);

ALTER TABLE public.invoices ADD CONSTRAINT fk_invoices_tenant FOREIGN KEY (tenant_id) REFERENCES public.tenants(id);
ALTER TABLE public.invoices ADD CONSTRAINT fk_invoices_client FOREIGN KEY (client_id) REFERENCES public.clients(id);

ALTER TABLE public.invoice_items ADD CONSTRAINT fk_invoice_items_invoice FOREIGN KEY (invoice_id) REFERENCES public.invoices(id) ON DELETE CASCADE;
ALTER TABLE public.invoice_items ADD CONSTRAINT fk_invoice_items_horse FOREIGN KEY (horse_id) REFERENCES public.horses(id);

ALTER TABLE public.purchase_orders ADD CONSTRAINT fk_purchase_orders_tenant FOREIGN KEY (tenant_id) REFERENCES public.tenants(id);

ALTER TABLE public.purchase_order_items ADD CONSTRAINT fk_purchase_order_items_po FOREIGN KEY (purchase_order_id) REFERENCES public.purchase_orders(id) ON DELETE CASCADE;
ALTER TABLE public.purchase_order_items ADD CONSTRAINT fk_purchase_order_items_item FOREIGN KEY (item_id) REFERENCES public.inventory_items(id);

ALTER TABLE public.recurring_schedules ADD CONSTRAINT fk_recurring_schedules_tenant FOREIGN KEY (tenant_id) REFERENCES public.tenants(id);
ALTER TABLE public.recurring_schedules ADD CONSTRAINT fk_recurring_schedules_employee FOREIGN KEY (assigned_to) REFERENCES public.employees(id);
ALTER TABLE public.recurring_schedules ADD CONSTRAINT fk_recurring_schedules_horse FOREIGN KEY (horse_id) REFERENCES public.horses(id);

ALTER TABLE public.communications ADD CONSTRAINT fk_communications_tenant FOREIGN KEY (tenant_id) REFERENCES public.tenants(id);
ALTER TABLE public.communications ADD CONSTRAINT fk_communications_client FOREIGN KEY (client_id) REFERENCES public.clients(id);
ALTER TABLE public.communications ADD CONSTRAINT fk_communications_horse FOREIGN KEY (horse_id) REFERENCES public.horses(id);
ALTER TABLE public.communications ADD CONSTRAINT fk_communications_employee FOREIGN KEY (employee_id) REFERENCES public.employees(id);

ALTER TABLE public.tasks ADD CONSTRAINT fk_tasks_tenant FOREIGN KEY (tenant_id) REFERENCES public.tenants(id);
ALTER TABLE public.tasks ADD CONSTRAINT fk_tasks_employee FOREIGN KEY (assigned_to) REFERENCES public.employees(id);

ALTER TABLE public.report_templates ADD CONSTRAINT fk_report_templates_tenant FOREIGN KEY (tenant_id) REFERENCES public.tenants(id);

-- Enable RLS on all new tables
ALTER TABLE public.financial_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.invoice_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.purchase_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.purchase_order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.recurring_schedules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.communications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.report_templates ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for all new tables
CREATE POLICY "Users can access financial accounts in their tenants" ON public.financial_accounts
  FOR ALL USING (
    tenant_id IN (
      SELECT tenant_id FROM public.get_user_tenant_access(auth.uid())
    )
  );

CREATE POLICY "Users can access invoices in their tenants" ON public.invoices
  FOR ALL USING (
    tenant_id IN (
      SELECT tenant_id FROM public.get_user_tenant_access(auth.uid())
    )
  );

CREATE POLICY "Users can access invoice items through invoices" ON public.invoice_items
  FOR ALL USING (
    invoice_id IN (
      SELECT id FROM public.invoices WHERE tenant_id IN (
        SELECT tenant_id FROM public.get_user_tenant_access(auth.uid())
      )
    )
  );

CREATE POLICY "Users can access purchase orders in their tenants" ON public.purchase_orders
  FOR ALL USING (
    tenant_id IN (
      SELECT tenant_id FROM public.get_user_tenant_access(auth.uid())
    )
  );

CREATE POLICY "Users can access purchase order items through purchase orders" ON public.purchase_order_items
  FOR ALL USING (
    purchase_order_id IN (
      SELECT id FROM public.purchase_orders WHERE tenant_id IN (
        SELECT tenant_id FROM public.get_user_tenant_access(auth.uid())
      )
    )
  );

CREATE POLICY "Users can access recurring schedules in their tenants" ON public.recurring_schedules
  FOR ALL USING (
    tenant_id IN (
      SELECT tenant_id FROM public.get_user_tenant_access(auth.uid())
    )
  );

CREATE POLICY "Users can access communications in their tenants" ON public.communications
  FOR ALL USING (
    tenant_id IN (
      SELECT tenant_id FROM public.get_user_tenant_access(auth.uid())
    )
  );

CREATE POLICY "Users can access tasks in their tenants" ON public.tasks
  FOR ALL USING (
    tenant_id IN (
      SELECT tenant_id FROM public.get_user_tenant_access(auth.uid())
    )
  );

CREATE POLICY "Users can access report templates in their tenants" ON public.report_templates
  FOR ALL USING (
    tenant_id IN (
      SELECT tenant_id FROM public.get_user_tenant_access(auth.uid())
    )
  );

-- Create indexes for better performance
CREATE INDEX idx_financial_accounts_tenant_id ON public.financial_accounts(tenant_id);
CREATE INDEX idx_financial_accounts_type ON public.financial_accounts(account_type);
CREATE INDEX idx_invoices_tenant_id ON public.invoices(tenant_id);
CREATE INDEX idx_invoices_client_id ON public.invoices(client_id);
CREATE INDEX idx_invoices_status ON public.invoices(status);
CREATE INDEX idx_invoices_due_date ON public.invoices(due_date);
CREATE INDEX idx_purchase_orders_tenant_id ON public.purchase_orders(tenant_id);
CREATE INDEX idx_purchase_orders_status ON public.purchase_orders(status);
CREATE INDEX idx_recurring_schedules_tenant_id ON public.recurring_schedules(tenant_id);
CREATE INDEX idx_recurring_schedules_type ON public.recurring_schedules(schedule_type);
CREATE INDEX idx_communications_tenant_id ON public.communications(tenant_id);
CREATE INDEX idx_communications_type ON public.communications(communication_type);
CREATE INDEX idx_tasks_tenant_id ON public.tasks(tenant_id);
CREATE INDEX idx_tasks_assigned_to ON public.tasks(assigned_to);
CREATE INDEX idx_tasks_status ON public.tasks(status);
CREATE INDEX idx_tasks_due_date ON public.tasks(due_date);

-- Create triggers for updated_at columns
CREATE TRIGGER update_financial_accounts_updated_at
  BEFORE UPDATE ON public.financial_accounts
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_invoices_updated_at
  BEFORE UPDATE ON public.invoices
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_purchase_orders_updated_at
  BEFORE UPDATE ON public.purchase_orders
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_recurring_schedules_updated_at
  BEFORE UPDATE ON public.recurring_schedules
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_communications_updated_at
  BEFORE UPDATE ON public.communications
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_tasks_updated_at
  BEFORE UPDATE ON public.tasks
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_report_templates_updated_at
  BEFORE UPDATE ON public.report_templates
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
