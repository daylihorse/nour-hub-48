
-- First, ensure all sample tenants exist in the database
INSERT INTO public.tenants (id, name, type, subscription_tier, status, settings, metadata) VALUES
('550e8400-e29b-41d4-a716-446655440001', 'Elite Equestrian Center', 'stable', 'premium', 'active', '{"timezone": "UTC", "currency": "USD", "language": "en", "features": {"horses": true, "laboratory": true, "clinic": true, "pharmacy": true, "marketplace": true, "finance": true, "hr": true, "inventory": true, "training": true, "rooms": true, "maintenance": true, "messages": true}}', '{}'),
('550e8400-e29b-41d4-a716-446655440002', 'Sunset Stables', 'stable', 'basic', 'active', '{"timezone": "UTC", "currency": "USD", "language": "en", "features": {"horses": true, "laboratory": false, "clinic": false, "pharmacy": false, "marketplace": false, "finance": true, "hr": false, "inventory": true, "training": false, "rooms": true, "maintenance": false, "messages": true}}', '{}'),
('550e8400-e29b-41d4-a716-446655440003', 'Advanced Veterinary Clinic', 'clinic', 'professional', 'active', '{"timezone": "UTC", "currency": "USD", "language": "en", "features": {"horses": true, "laboratory": true, "clinic": true, "pharmacy": true, "marketplace": false, "finance": true, "hr": true, "inventory": true, "training": false, "rooms": false, "maintenance": true, "messages": true}}', '{}'),
('550e8400-e29b-41d4-a716-446655440004', 'Equine Diagnostics Lab', 'laboratory', 'professional', 'active', '{"timezone": "UTC", "currency": "USD", "language": "en", "features": {"horses": true, "laboratory": true, "clinic": false, "pharmacy": false, "marketplace": false, "finance": true, "hr": true, "inventory": true, "training": false, "rooms": false, "maintenance": true, "messages": true}}', '{}'),
('550e8400-e29b-41d4-a716-446655440005', 'Regional Equine Hospital', 'hospital', 'enterprise', 'active', '{"timezone": "UTC", "currency": "USD", "language": "en", "features": {"horses": true, "laboratory": true, "clinic": true, "pharmacy": true, "marketplace": true, "finance": true, "hr": true, "inventory": true, "training": true, "rooms": true, "maintenance": true, "messages": true}}', '{}'),
('550e8400-e29b-41d4-a716-446655440006', 'HorseTrader Marketplace', 'marketplace', 'premium', 'active', '{"timezone": "UTC", "currency": "USD", "language": "en", "features": {"horses": true, "laboratory": false, "clinic": false, "pharmacy": false, "marketplace": true, "finance": true, "hr": true, "inventory": true, "training": false, "rooms": false, "maintenance": false, "messages": true}}', '{}'),
('550e8400-e29b-41d4-a716-446655440007', 'Global Equine Solutions', 'enterprise', 'enterprise', 'active', '{"timezone": "UTC", "currency": "USD", "language": "en", "features": {"horses": true, "laboratory": true, "clinic": true, "pharmacy": true, "marketplace": true, "finance": true, "hr": true, "inventory": true, "training": true, "rooms": true, "maintenance": true, "messages": true}}', '{}')
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  type = EXCLUDED.type,
  subscription_tier = EXCLUDED.subscription_tier,
  status = EXCLUDED.status,
  settings = EXCLUDED.settings,
  metadata = EXCLUDED.metadata,
  updated_at = now();

-- Update the insert_tenant_user_if_exists function to be more robust
CREATE OR REPLACE FUNCTION insert_tenant_user_if_exists(
  p_user_email TEXT,
  p_tenant_id UUID,
  p_role TEXT,
  p_permissions TEXT[] DEFAULT '{}'
)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  user_profile_id UUID;
BEGIN
  -- Get user ID from profiles table based on email
  SELECT id INTO user_profile_id
  FROM public.profiles
  WHERE email = p_user_email;
  
  -- Only insert if user exists and association doesn't already exist
  IF user_profile_id IS NOT NULL THEN
    INSERT INTO public.tenant_users (tenant_id, user_id, role, permissions, status, joined_at)
    VALUES (p_tenant_id, user_profile_id, p_role, p_permissions, 'active', now())
    ON CONFLICT (tenant_id, user_id) DO UPDATE SET
      role = EXCLUDED.role,
      permissions = EXCLUDED.permissions,
      status = EXCLUDED.status;
  END IF;
END;
$$;

-- Create a function to ensure all sample tenant associations exist
CREATE OR REPLACE FUNCTION ensure_all_sample_tenant_associations()
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Ensure all sample tenant-user associations exist
  PERFORM insert_tenant_user_if_exists('owner@eliteequestrian.com', '550e8400-e29b-41d4-a716-446655440001', 'owner', ARRAY['*']);
  PERFORM insert_tenant_user_if_exists('manager@eliteequestrian.com', '550e8400-e29b-41d4-a716-446655440001', 'manager', ARRAY['horses:read', 'horses:write', 'inventory:read', 'inventory:write', 'finance:read']);
  PERFORM insert_tenant_user_if_exists('owner@sunsetstables.com', '550e8400-e29b-41d4-a716-446655440002', 'owner', ARRAY['*']);
  PERFORM insert_tenant_user_if_exists('director@advancedvetclinic.com', '550e8400-e29b-41d4-a716-446655440003', 'owner', ARRAY['*']);
  PERFORM insert_tenant_user_if_exists('director@equinediagnostics.com', '550e8400-e29b-41d4-a716-446655440004', 'owner', ARRAY['*']);
  PERFORM insert_tenant_user_if_exists('admin@regionalequinehospital.com', '550e8400-e29b-41d4-a716-446655440005', 'owner', ARRAY['*']);
  PERFORM insert_tenant_user_if_exists('admin@horsetrader.com', '550e8400-e29b-41d4-a716-446655440006', 'owner', ARRAY['*']);
  PERFORM insert_tenant_user_if_exists('ceo@globalequinesolutions.com', '550e8400-e29b-41d4-a716-446655440007', 'owner', ARRAY['*']);
END;
$$;

-- Run the function to ensure all associations exist
SELECT ensure_all_sample_tenant_associations();

-- Add proper RLS policies for tenant_users table
DROP POLICY IF EXISTS "Users can view tenant memberships they have access to" ON public.tenant_users;
DROP POLICY IF EXISTS "Owners and admins can manage tenant users" ON public.tenant_users;
DROP POLICY IF EXISTS "Users can insert themselves into tenants" ON public.tenant_users;

CREATE POLICY "Users can view tenant memberships they have access to" ON public.tenant_users
  FOR SELECT USING (
    tenant_id IN (
      SELECT tenant_id FROM public.get_user_tenant_access(auth.uid())
    ) OR user_id = auth.uid()
  );

CREATE POLICY "Owners and admins can manage tenant users" ON public.tenant_users
  FOR ALL USING (
    tenant_id IN (
      SELECT tenant_id FROM public.get_user_tenant_access(auth.uid()) 
      WHERE role IN ('owner', 'admin')
    )
  );

CREATE POLICY "Users can insert themselves into tenants" ON public.tenant_users
  FOR INSERT WITH CHECK (user_id = auth.uid());

-- Add proper RLS policies for tenants table
DROP POLICY IF EXISTS "Users can view their tenants" ON public.tenants;
DROP POLICY IF EXISTS "Owners can update their tenants" ON public.tenants;

CREATE POLICY "Users can view their tenants" ON public.tenants
  FOR SELECT USING (
    id IN (
      SELECT tenant_id FROM public.get_user_tenant_access(auth.uid())
    )
  );

CREATE POLICY "Owners can update their tenants" ON public.tenants
  FOR UPDATE USING (
    id IN (
      SELECT tenant_id FROM public.get_user_tenant_access(auth.uid()) 
      WHERE role IN ('owner', 'admin')
    )
  );

-- Add proper RLS policies for profiles table
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;

CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);
