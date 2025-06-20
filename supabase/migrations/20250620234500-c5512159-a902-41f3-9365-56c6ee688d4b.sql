
-- First, let's check which tables already exist and create only the missing ones

-- Create transaction entries table (double-entry bookkeeping) - if it doesn't exist
CREATE TABLE IF NOT EXISTS public.transaction_entries (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  transaction_id UUID NOT NULL REFERENCES public.financial_transactions(id) ON DELETE CASCADE,
  account_id UUID NOT NULL REFERENCES public.financial_accounts(id),
  debit_amount NUMERIC DEFAULT 0,
  credit_amount NUMERIC DEFAULT 0,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Add missing indexes if they don't exist
CREATE INDEX IF NOT EXISTS idx_financial_accounts_tenant_type ON public.financial_accounts(tenant_id, account_type);
CREATE INDEX IF NOT EXISTS idx_financial_transactions_tenant_date ON public.financial_transactions(tenant_id, transaction_date);
CREATE INDEX IF NOT EXISTS idx_transaction_entries_transaction ON public.transaction_entries(transaction_id);
CREATE INDEX IF NOT EXISTS idx_transaction_entries_account ON public.transaction_entries(account_id);
CREATE INDEX IF NOT EXISTS idx_invoices_tenant_status ON public.invoices(tenant_id, status);
CREATE INDEX IF NOT EXISTS idx_invoices_client ON public.invoices(client_id);
CREATE INDEX IF NOT EXISTS idx_payments_invoice ON public.payments(invoice_id);
CREATE INDEX IF NOT EXISTS idx_expenses_tenant_date ON public.expenses(tenant_id, date);
CREATE INDEX IF NOT EXISTS idx_expenses_category ON public.expenses(category_id);

-- Add any missing triggers for updated_at columns
CREATE OR REPLACE FUNCTION add_missing_triggers() RETURNS VOID AS $$
BEGIN
  -- Only add triggers if the table exists and trigger doesn't exist
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'financial_accounts' AND table_schema = 'public') THEN
    IF NOT EXISTS (SELECT 1 FROM information_schema.triggers WHERE trigger_name = 'update_financial_accounts_updated_at') THEN
      CREATE TRIGGER update_financial_accounts_updated_at
        BEFORE UPDATE ON public.financial_accounts
        FOR EACH ROW
        EXECUTE FUNCTION public.update_updated_at_column();
    END IF;
  END IF;

  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'financial_transactions' AND table_schema = 'public') THEN
    IF NOT EXISTS (SELECT 1 FROM information_schema.triggers WHERE trigger_name = 'update_financial_transactions_updated_at') THEN
      CREATE TRIGGER update_financial_transactions_updated_at
        BEFORE UPDATE ON public.financial_transactions
        FOR EACH ROW
        EXECUTE FUNCTION public.update_updated_at_column();
    END IF;
  END IF;

  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'invoices' AND table_schema = 'public') THEN
    IF NOT EXISTS (SELECT 1 FROM information_schema.triggers WHERE trigger_name = 'update_invoices_updated_at') THEN
      CREATE TRIGGER update_invoices_updated_at
        BEFORE UPDATE ON public.invoices
        FOR EACH ROW
        EXECUTE FUNCTION public.update_updated_at_column();
    END IF;
  END IF;

  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'payments' AND table_schema = 'public') THEN
    IF NOT EXISTS (SELECT 1 FROM information_schema.triggers WHERE trigger_name = 'update_payments_updated_at') THEN
      CREATE TRIGGER update_payments_updated_at
        BEFORE UPDATE ON public.payments
        FOR EACH ROW
        EXECUTE FUNCTION public.update_updated_at_column();
    END IF;
  END IF;

  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'payment_methods' AND table_schema = 'public') THEN
    IF NOT EXISTS (SELECT 1 FROM information_schema.triggers WHERE trigger_name = 'update_payment_methods_updated_at') THEN
      CREATE TRIGGER update_payment_methods_updated_at
        BEFORE UPDATE ON public.payment_methods
        FOR EACH ROW
        EXECUTE FUNCTION public.update_updated_at_column();
    END IF;
  END IF;

  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'expense_categories' AND table_schema = 'public') THEN
    IF NOT EXISTS (SELECT 1 FROM information_schema.triggers WHERE trigger_name = 'update_expense_categories_updated_at') THEN
      CREATE TRIGGER update_expense_categories_updated_at
        BEFORE UPDATE ON public.expense_categories
        FOR EACH ROW
        EXECUTE FUNCTION public.update_updated_at_column();
    END IF;
  END IF;

  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'expenses' AND table_schema = 'public') THEN
    IF NOT EXISTS (SELECT 1 FROM information_schema.triggers WHERE trigger_name = 'update_expenses_updated_at') THEN
      CREATE TRIGGER update_expenses_updated_at
        BEFORE UPDATE ON public.expenses
        FOR EACH ROW
        EXECUTE FUNCTION public.update_updated_at_column();
    END IF;
  END IF;

  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'budgets' AND table_schema = 'public') THEN
    IF NOT EXISTS (SELECT 1 FROM information_schema.triggers WHERE trigger_name = 'update_budgets_updated_at') THEN
      CREATE TRIGGER update_budgets_updated_at
        BEFORE UPDATE ON public.budgets
        FOR EACH ROW
        EXECUTE FUNCTION public.update_updated_at_column();
    END IF;
  END IF;

  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'recurring_transactions' AND table_schema = 'public') THEN
    IF NOT EXISTS (SELECT 1 FROM information_schema.triggers WHERE trigger_name = 'update_recurring_transactions_updated_at') THEN
      CREATE TRIGGER update_recurring_transactions_updated_at
        BEFORE UPDATE ON public.recurring_transactions
        FOR EACH ROW
        EXECUTE FUNCTION public.update_updated_at_column();
    END IF;
  END IF;

  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'report_templates' AND table_schema = 'public') THEN
    IF NOT EXISTS (SELECT 1 FROM information_schema.triggers WHERE trigger_name = 'update_report_templates_updated_at') THEN
      CREATE TRIGGER update_report_templates_updated_at
        BEFORE UPDATE ON public.report_templates
        FOR EACH ROW
        EXECUTE FUNCTION public.update_updated_at_column();
    END IF;
  END IF;
END;
$$ LANGUAGE plpgsql;

-- Execute the function to add missing triggers
SELECT add_missing_triggers();

-- Clean up the function
DROP FUNCTION add_missing_triggers();
