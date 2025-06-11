
-- Fix the database functions to handle sample user creation and tenant associations properly

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

-- Add a function to create or update user profiles from auth metadata
CREATE OR REPLACE FUNCTION ensure_user_profile_exists(
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

-- Update the ensure_all_sample_tenant_associations function to be more reliable
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

-- Add updated_at column to tenant_users if it doesn't exist
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'tenant_users' 
                   AND column_name = 'updated_at' 
                   AND table_schema = 'public') THEN
        ALTER TABLE public.tenant_users 
        ADD COLUMN updated_at TIMESTAMP WITH TIME ZONE DEFAULT now();
    END IF;
END $$;

-- Create trigger to update updated_at column if it doesn't exist
DROP TRIGGER IF EXISTS update_tenant_users_updated_at ON public.tenant_users;
CREATE TRIGGER update_tenant_users_updated_at
  BEFORE UPDATE ON public.tenant_users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
