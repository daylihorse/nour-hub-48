
-- Complete the ensure_user_profile_exists function
CREATE OR REPLACE FUNCTION public.ensure_user_profile_exists(
  p_user_id UUID,
  p_email TEXT,
  p_first_name TEXT DEFAULT '',
  p_last_name TEXT DEFAULT ''
)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, first_name, last_name, created_at, updated_at)
  VALUES (p_user_id, p_email, p_first_name, p_last_name, now(), now())
  ON CONFLICT (id) DO UPDATE SET
    email = EXCLUDED.email,
    first_name = CASE 
      WHEN EXCLUDED.first_name != '' THEN EXCLUDED.first_name 
      ELSE profiles.first_name 
    END,
    last_name = CASE 
      WHEN EXCLUDED.last_name != '' THEN EXCLUDED.last_name 
      ELSE profiles.last_name 
    END,
    updated_at = now();
END;
$$;

-- Update the handle_new_user function to be more robust
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, first_name, last_name, created_at, updated_at)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'first_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'last_name', ''),
    now(),
    now()
  )
  ON CONFLICT (id) DO UPDATE SET
    email = EXCLUDED.email,
    first_name = CASE 
      WHEN EXCLUDED.first_name != '' THEN EXCLUDED.first_name 
      ELSE profiles.first_name 
    END,
    last_name = CASE 
      WHEN EXCLUDED.last_name != '' THEN EXCLUDED.last_name 
      ELSE profiles.last_name 
    END,
    updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Ensure the trigger exists (recreate if needed)
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Add RLS policies for horse-related tables, dropping existing ones first
DROP POLICY IF EXISTS "Users can access horses in their tenants" ON public.horses;
DROP POLICY IF EXISTS "Users can access health records in their tenants" ON public.health_records;
DROP POLICY IF EXISTS "Users can access performance records in their tenants" ON public.performance_records;
DROP POLICY IF EXISTS "Users can access training records in their tenants" ON public.training_records;
DROP POLICY IF EXISTS "Users can access breeding records in their tenants" ON public.breeding_records;
DROP POLICY IF EXISTS "Users can access pregnancy records in their tenants" ON public.pregnancy_records;
DROP POLICY IF EXISTS "Users can access horse documents in their tenants" ON public.horse_documents;
DROP POLICY IF EXISTS "Users can access horse movements in their tenants" ON public.horse_movements;
DROP POLICY IF EXISTS "Users can access nutrition records in their tenants" ON public.nutrition_records;
DROP POLICY IF EXISTS "Users can access horse financials in their tenants" ON public.horse_financials;

-- Create the RLS policies
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

-- Add sample data for testing (this will not insert duplicates due to ON CONFLICT)
INSERT INTO public.tenants (id, name, type, subscription_tier, status, settings, metadata) VALUES
('550e8400-e29b-41d4-a716-446655440001', 'Elite Equestrian Center', 'stable', 'premium', 'active', '{"features": {"horses": true, "clinic": true, "training": true}}', '{"address": {"city": "Lexington", "state": "KY"}}'),
('550e8400-e29b-41d4-a716-446655440002', 'Sunset Stables', 'stable', 'professional', 'active', '{"features": {"horses": true, "marketplace": true}}', '{"address": {"city": "Wellington", "state": "FL"}}'),
('550e8400-e29b-41d4-a716-446655440003', 'Advanced Veterinary Clinic', 'clinic', 'premium', 'active', '{"features": {"clinic": true, "laboratory": true, "pharmacy": true}}', '{"address": {"city": "Ocala", "state": "FL"}}'),
('550e8400-e29b-41d4-a716-446655440004', 'Equine Diagnostics Lab', 'laboratory', 'enterprise', 'active', '{"features": {"laboratory": true, "clinic": true}}', '{"address": {"city": "Newmarket", "state": "UK"}}'),
('550e8400-e29b-41d4-a716-446655440005', 'Regional Equine Hospital', 'hospital', 'enterprise', 'active', '{"features": {"clinic": true, "laboratory": true, "pharmacy": true, "horses": true}}', '{"address": {"city": "Aiken", "state": "SC"}}'),
('550e8400-e29b-41d4-a716-446655440006', 'Horse Trader Marketplace', 'marketplace', 'professional', 'active', '{"features": {"marketplace": true, "horses": true}}', '{"address": {"city": "Louisville", "state": "KY"}}'),
('550e8400-e29b-41d4-a716-446655440007', 'Global Equine Solutions', 'enterprise', 'enterprise', 'active', '{"features": {"horses": true, "clinic": true, "laboratory": true, "marketplace": true, "finance": true, "hr": true}}', '{"address": {"city": "Dubai", "state": "UAE"}}')
ON CONFLICT (id) DO NOTHING;
