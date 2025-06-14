
-- Create tenants table
CREATE TABLE public.tenants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('stable', 'clinic', 'marketplace', 'enterprise', 'hospital', 'laboratory')),
  subscription_tier TEXT NOT NULL CHECK (subscription_tier IN ('basic', 'professional', 'premium', 'enterprise')),
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'suspended', 'trial', 'expired')),
  settings JSONB DEFAULT '{}',
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create user profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  avatar TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create tenant_users junction table for many-to-many relationship
CREATE TABLE public.tenant_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('owner', 'admin', 'manager', 'employee', 'viewer')),
  permissions TEXT[] DEFAULT '{}',
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'pending')),
  joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_login_at TIMESTAMP WITH TIME ZONE,
  UNIQUE(tenant_id, user_id)
);

-- Create function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, first_name, last_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'first_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'last_name', '')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_tenants_updated_at
  BEFORE UPDATE ON public.tenants
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Enable Row Level Security
ALTER TABLE public.tenants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tenant_users ENABLE ROW LEVEL SECURITY;

-- Security definer function to get user's tenant access
CREATE OR REPLACE FUNCTION public.get_user_tenant_access(user_id UUID)
RETURNS TABLE(tenant_id UUID, role TEXT, permissions TEXT[])
LANGUAGE SQL
SECURITY DEFINER
STABLE
AS $$
  SELECT tu.tenant_id, tu.role, tu.permissions
  FROM public.tenant_users tu
  WHERE tu.user_id = get_user_tenant_access.user_id 
    AND tu.status = 'active';
$$;

-- RLS Policies for tenants
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
      WHERE role = 'owner'
    )
  );

CREATE POLICY "Owners can insert tenants" ON public.tenants
  FOR INSERT WITH CHECK (true);

-- RLS Policies for profiles
CREATE POLICY "Users can view all profiles" ON public.profiles
  FOR SELECT USING (true);

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- RLS Policies for tenant_users
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

-- Create indexes for performance
CREATE INDEX idx_tenant_users_tenant_id ON public.tenant_users(tenant_id);
CREATE INDEX idx_tenant_users_user_id ON public.tenant_users(user_id);
CREATE INDEX idx_tenants_type ON public.tenants(type);
CREATE INDEX idx_tenants_status ON public.tenants(status);
