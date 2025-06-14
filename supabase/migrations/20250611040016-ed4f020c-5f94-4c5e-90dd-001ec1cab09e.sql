
-- Insert sample tenants
INSERT INTO public.tenants (id, name, type, subscription_tier, status, settings, metadata) VALUES
(
  '550e8400-e29b-41d4-a716-446655440001',
  'Elite Equestrian Center',
  'stable',
  'premium',
  'active',
  '{
    "timezone": "America/New_York",
    "currency": "USD",
    "language": "en",
    "features": {
      "horses": true,
      "laboratory": true,
      "clinic": true,
      "pharmacy": true,
      "marketplace": true,
      "finance": true,
      "hr": true,
      "inventory": true,
      "training": true,
      "rooms": true,
      "maintenance": true,
      "messages": true
    }
  }',
  '{
    "address": {
      "street": "123 Horse Lane",
      "city": "Lexington",
      "state": "KY",
      "zipCode": "40502",
      "country": "USA"
    },
    "contact": {
      "phone": "+1-555-0123",
      "email": "info@eliteequestrian.com",
      "website": "https://eliteequestrian.com"
    }
  }'
),
(
  '550e8400-e29b-41d4-a716-446655440002',
  'Sunset Stables',
  'stable',
  'basic',
  'active',
  '{
    "timezone": "America/Los_Angeles",
    "currency": "USD",
    "language": "en",
    "features": {
      "horses": true,
      "laboratory": false,
      "clinic": false,
      "pharmacy": false,
      "marketplace": false,
      "finance": true,
      "hr": false,
      "inventory": true,
      "training": false,
      "rooms": true,
      "maintenance": false,
      "messages": true
    }
  }',
  '{
    "address": {
      "street": "456 Sunset Blvd",
      "city": "Los Angeles",
      "state": "CA",
      "zipCode": "90210",
      "country": "USA"
    },
    "contact": {
      "phone": "+1-555-0456",
      "email": "info@sunsetstables.com"
    }
  }'
),
(
  '550e8400-e29b-41d4-a716-446655440003',
  'Advanced Veterinary Clinic',
  'clinic',
  'professional',
  'active',
  '{
    "timezone": "America/Chicago",
    "currency": "USD",
    "language": "en",
    "features": {
      "horses": true,
      "laboratory": true,
      "clinic": true,
      "pharmacy": true,
      "marketplace": false,
      "finance": true,
      "hr": true,
      "inventory": true,
      "training": false,
      "rooms": false,
      "maintenance": true,
      "messages": true
    }
  }',
  '{
    "address": {
      "street": "789 Medical Center Dr",
      "city": "Dallas",
      "state": "TX",
      "zipCode": "75201",
      "country": "USA"
    },
    "contact": {
      "phone": "+1-555-0789",
      "email": "info@advancedvetclinic.com"
    }
  }'
),
(
  '550e8400-e29b-41d4-a716-446655440004',
  'Equine Diagnostics Lab',
  'laboratory',
  'professional',
  'active',
  '{
    "timezone": "America/New_York",
    "currency": "USD",
    "language": "en",
    "features": {
      "horses": true,
      "laboratory": true,
      "clinic": false,
      "pharmacy": false,
      "marketplace": false,
      "finance": true,
      "hr": true,
      "inventory": true,
      "training": false,
      "rooms": false,
      "maintenance": true,
      "messages": true
    }
  }',
  '{
    "address": {
      "street": "321 Lab Way",
      "city": "Boston",
      "state": "MA",
      "zipCode": "02101",
      "country": "USA"
    },
    "contact": {
      "phone": "+1-555-0321",
      "email": "info@equinediagnostics.com"
    }
  }'
),
(
  '550e8400-e29b-41d4-a716-446655440005',
  'Regional Equine Hospital',
  'hospital',
  'enterprise',
  'active',
  '{
    "timezone": "America/Denver",
    "currency": "USD",
    "language": "en",
    "features": {
      "horses": true,
      "laboratory": true,
      "clinic": true,
      "pharmacy": true,
      "marketplace": true,
      "finance": true,
      "hr": true,
      "inventory": true,
      "training": true,
      "rooms": true,
      "maintenance": true,
      "messages": true
    }
  }',
  '{
    "address": {
      "street": "654 Hospital Rd",
      "city": "Denver",
      "state": "CO",
      "zipCode": "80202",
      "country": "USA"
    },
    "contact": {
      "phone": "+1-555-0654",
      "email": "info@regionalequinehospital.com"
    }
  }'
),
(
  '550e8400-e29b-41d4-a716-446655440006',
  'HorseTrader Marketplace',
  'marketplace',
  'premium',
  'active',
  '{
    "timezone": "America/New_York",
    "currency": "USD",
    "language": "en",
    "features": {
      "horses": true,
      "laboratory": false,
      "clinic": false,
      "pharmacy": false,
      "marketplace": true,
      "finance": true,
      "hr": true,
      "inventory": true,
      "training": false,
      "rooms": false,
      "maintenance": false,
      "messages": true
    }
  }',
  '{
    "address": {
      "street": "987 Commerce St",
      "city": "New York",
      "state": "NY",
      "zipCode": "10001",
      "country": "USA"
    },
    "contact": {
      "phone": "+1-555-0987",
      "email": "info@horsetrader.com"
    }
  }'
),
(
  '550e8400-e29b-41d4-a716-446655440007',
  'Global Equine Solutions',
  'enterprise',
  'enterprise',
  'active',
  '{
    "timezone": "America/New_York",
    "currency": "USD",
    "language": "en",
    "features": {
      "horses": true,
      "laboratory": true,
      "clinic": true,
      "pharmacy": true,
      "marketplace": true,
      "finance": true,
      "hr": true,
      "inventory": true,
      "training": true,
      "rooms": true,
      "maintenance": true,
      "messages": true
    }
  }',
  '{
    "address": {
      "street": "1234 Enterprise Blvd",
      "city": "Miami",
      "state": "FL",
      "zipCode": "33101",
      "country": "USA"
    },
    "contact": {
      "phone": "+1-555-1234",
      "email": "info@globalequinesolutions.com"
    }
  }'
);

-- Insert tenant-user associations for the sample accounts
-- Note: These user IDs will be created when users sign up through the DevLoginHelper

-- Create a function to safely insert tenant_users if the user exists
CREATE OR REPLACE FUNCTION insert_tenant_user_if_exists(
  p_user_email TEXT,
  p_tenant_id UUID,
  p_role TEXT,
  p_permissions TEXT[] DEFAULT '{}'
)
RETURNS VOID
LANGUAGE plpgsql
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

-- Add sample tenant-user associations
-- These will be executed when the users are created via the DevLoginHelper
SELECT insert_tenant_user_if_exists('owner@eliteequestrian.com', '550e8400-e29b-41d4-a716-446655440001', 'owner', ARRAY['*']);
SELECT insert_tenant_user_if_exists('manager@eliteequestrian.com', '550e8400-e29b-41d4-a716-446655440001', 'manager', ARRAY['horses:read', 'horses:write', 'inventory:read', 'inventory:write', 'finance:read']);
SELECT insert_tenant_user_if_exists('owner@sunsetstables.com', '550e8400-e29b-41d4-a716-446655440002', 'owner', ARRAY['*']);
SELECT insert_tenant_user_if_exists('director@advancedvetclinic.com', '550e8400-e29b-41d4-a716-446655440003', 'owner', ARRAY['*']);
SELECT insert_tenant_user_if_exists('director@equinediagnostics.com', '550e8400-e29b-41d4-a716-446655440004', 'owner', ARRAY['*']);
SELECT insert_tenant_user_if_exists('admin@regionalequinehospital.com', '550e8400-e29b-41d4-a716-446655440005', 'owner', ARRAY['*']);
SELECT insert_tenant_user_if_exists('admin@horsetrader.com', '550e8400-e29b-41d4-a716-446655440006', 'owner', ARRAY['*']);
SELECT insert_tenant_user_if_exists('ceo@globalequinesolutions.com', '550e8400-e29b-41d4-a716-446655440007', 'owner', ARRAY['*']);

-- Update RLS policies to ensure proper access
-- Policy for tenants table
DROP POLICY IF EXISTS "Users can view their tenants" ON public.tenants;
CREATE POLICY "Users can view their tenants" ON public.tenants
  FOR SELECT USING (
    id IN (
      SELECT tenant_id FROM public.get_user_tenant_access(auth.uid())
    )
  );

DROP POLICY IF EXISTS "Owners can update their tenants" ON public.tenants;
CREATE POLICY "Owners can update their tenants" ON public.tenants
  FOR UPDATE USING (
    id IN (
      SELECT tenant_id FROM public.get_user_tenant_access(auth.uid()) 
      WHERE role IN ('owner', 'admin')
    )
  );

-- Policy for tenant_users table
DROP POLICY IF EXISTS "Users can view tenant memberships they have access to" ON public.tenant_users;
CREATE POLICY "Users can view tenant memberships they have access to" ON public.tenant_users
  FOR SELECT USING (
    tenant_id IN (
      SELECT tenant_id FROM public.get_user_tenant_access(auth.uid())
    )
  );

DROP POLICY IF EXISTS "Owners and admins can manage tenant users" ON public.tenant_users;
CREATE POLICY "Owners and admins can manage tenant users" ON public.tenant_users
  FOR ALL USING (
    tenant_id IN (
      SELECT tenant_id FROM public.get_user_tenant_access(auth.uid()) 
      WHERE role IN ('owner', 'admin')
    )
  );

DROP POLICY IF EXISTS "Users can insert themselves into tenants" ON public.tenant_users;
CREATE POLICY "Users can insert themselves into tenants" ON public.tenant_users
  FOR INSERT WITH CHECK (user_id = auth.uid());
