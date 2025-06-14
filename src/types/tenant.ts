
export interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  avatar?: string | null;
  created_at: string;
  updated_at: string;
}

export interface Tenant {
  id: string;
  name: string;
  type: 'stable' | 'clinic' | 'marketplace' | 'enterprise' | 'hospital' | 'laboratory';
  subscription_tier: 'basic' | 'professional' | 'premium' | 'enterprise';
  status: 'active' | 'suspended' | 'trial' | 'expired';
  settings: {
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
  };
  metadata: Record<string, any>;
  user_role?: string;
  user_permissions?: string[];
}

export interface TenantUser {
  id: string;
  tenant_id: string;
  user_id: string;
  role: 'owner' | 'admin' | 'manager' | 'employee' | 'viewer';
  permissions: string[];
  status: 'active' | 'inactive' | 'pending';
  joined_at: string;
  last_login_at?: string;
}
