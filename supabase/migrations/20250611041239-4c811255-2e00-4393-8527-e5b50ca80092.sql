
-- First, let's check what policies already exist
-- Add RLS policies only if they don't exist

-- For profiles table - check if RLS is enabled and add missing policies
DO $$
BEGIN
    -- Enable RLS if not already enabled
    IF NOT EXISTS (
        SELECT 1 FROM pg_tables 
        WHERE schemaname = 'public' 
        AND tablename = 'profiles' 
        AND rowsecurity = true
    ) THEN
        ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
    END IF;
    
    -- Add update policy if it doesn't exist
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE schemaname = 'public' 
        AND tablename = 'profiles' 
        AND policyname = 'Users can update their own profile'
    ) THEN
        CREATE POLICY "Users can update their own profile" ON public.profiles
          FOR UPDATE USING (auth.uid() = id);
    END IF;
END
$$;

-- For tenants table
DO $$
BEGIN
    -- Enable RLS if not already enabled
    IF NOT EXISTS (
        SELECT 1 FROM pg_tables 
        WHERE schemaname = 'public' 
        AND tablename = 'tenants' 
        AND rowsecurity = true
    ) THEN
        ALTER TABLE public.tenants ENABLE ROW LEVEL SECURITY;
    END IF;
    
    -- Drop existing policies if they exist and recreate them
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
END
$$;

-- For tenant_users table
DO $$
BEGIN
    -- Enable RLS if not already enabled
    IF NOT EXISTS (
        SELECT 1 FROM pg_tables 
        WHERE schemaname = 'public' 
        AND tablename = 'tenant_users' 
        AND rowsecurity = true
    ) THEN
        ALTER TABLE public.tenant_users ENABLE ROW LEVEL SECURITY;
    END IF;
    
    -- Drop existing policies if they exist and recreate them
    DROP POLICY IF EXISTS "Users can view tenant memberships they have access to" ON public.tenant_users;
    DROP POLICY IF EXISTS "Owners and admins can manage tenant users" ON public.tenant_users;
    DROP POLICY IF EXISTS "Users can insert themselves into tenants" ON public.tenant_users;
    
    CREATE POLICY "Users can view tenant memberships they have access to" ON public.tenant_users
      FOR SELECT USING (
        tenant_id IN (
          SELECT tenant_id FROM public.get_user_tenant_access(auth.uid())
        )
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
END
$$;

-- Update the insert_tenant_user_if_exists function to handle RLS better
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
    INSERT INTO public.tenant_users (tenant_id, user_id, role, permissions, status)
    VALUES (p_tenant_id, user_profile_id, p_role, p_permissions, 'active')
    ON CONFLICT (tenant_id, user_id) DO NOTHING;
  END IF;
END;
$$;

-- Ensure all sample tenant-user associations exist
SELECT insert_tenant_user_if_exists('owner@eliteequestrian.com', '550e8400-e29b-41d4-a716-446655440001', 'owner', ARRAY['*']);
SELECT insert_tenant_user_if_exists('manager@eliteequestrian.com', '550e8400-e29b-41d4-a716-446655440001', 'manager', ARRAY['horses:read', 'horses:write', 'inventory:read', 'inventory:write', 'finance:read']);
SELECT insert_tenant_user_if_exists('owner@sunsetstables.com', '550e8400-e29b-41d4-a716-446655440002', 'owner', ARRAY['*']);
SELECT insert_tenant_user_if_exists('director@advancedvetclinic.com', '550e8400-e29b-41d4-a716-446655440003', 'owner', ARRAY['*']);
SELECT insert_tenant_user_if_exists('director@equinediagnostics.com', '550e8400-e29b-41d4-a716-446655440004', 'owner', ARRAY['*']);
SELECT insert_tenant_user_if_exists('admin@regionalequinehospital.com', '550e8400-e29b-41d4-a716-446655440005', 'owner', ARRAY['*']);
SELECT insert_tenant_user_if_exists('admin@horsetrader.com', '550e8400-e29b-41d4-a716-446655440006', 'owner', ARRAY['*']);
SELECT insert_tenant_user_if_exists('ceo@globalequinesolutions.com', '550e8400-e29b-41d4-a716-446655440007', 'owner', ARRAY['*']);
