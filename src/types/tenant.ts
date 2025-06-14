
export interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  avatar?: string | null;
  created_at: string;
  updated_at: string;
  tenants: TenantUser[];
}

export interface Tenant {
  id: string;
  name: string;
  type: TenantType;
  subscription_tier: SubscriptionTier;
  status: 'active' | 'suspended' | 'trial' | 'expired';
  settings: TenantSettings;
  metadata: Record<string, any>;
  user_role?: string;
  user_permissions?: string[];
  created_at: string;
  updated_at: string;
}

export interface TenantUser {
  id: string;
  tenant_id: string;
  user_id: string;
  role: UserRole;
  permissions: string[];
  status: 'active' | 'inactive' | 'pending';
  joined_at: string;
  last_login_at?: string;
  tenantId: string; // Alias for compatibility
}

export interface TenantSettings {
  timezone?: string;
  currency?: string;
  language?: string;
  features?: {
    horses?: boolean;
    laboratory?: boolean;
    clinic?: boolean;
    pharmacy?: boolean;
    marketplace?: boolean;
    finance?: boolean;
    hr?: boolean;
    inventory?: boolean;
    training?: boolean;
    rooms?: boolean;
    maintenance?: boolean;
    messages?: boolean;
  };
}

export interface TenantMetadata {
  address?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  contact?: {
    phone: string;
    email: string;
    website?: string;
  };
  businessInfo?: {
    registrationNumber?: string;
    taxId?: string;
    industry?: string;
  };
}

export interface AuthContext {
  user: User | null;
  currentTenant: Tenant | null;
  availableTenants: Tenant[];
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  switchTenant: (tenantId: string) => Promise<void>;
  switchDemoAccount?: (account: any) => Promise<void>;
  hasPermission: (permission: string) => boolean;
  hasRole: (role: string) => boolean;
}

export type TenantType = 'stable' | 'clinic' | 'marketplace' | 'enterprise' | 'hospital' | 'laboratory';
export type SubscriptionTier = 'basic' | 'professional' | 'premium' | 'enterprise';
export type UserRole = 'owner' | 'admin' | 'manager' | 'employee' | 'viewer';
