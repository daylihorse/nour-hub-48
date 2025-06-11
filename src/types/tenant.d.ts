
export type TenantType = 'stable' | 'clinic' | 'marketplace' | 'enterprise';
export type SubscriptionTier = 'basic' | 'professional' | 'premium' | 'enterprise';
export type UserRole = 'owner' | 'admin' | 'manager' | 'employee' | 'viewer';

export interface Tenant {
  id: string;
  name: string;
  type: TenantType;
  subscriptionTier: SubscriptionTier;
  status: 'active' | 'suspended' | 'trial' | 'expired';
  createdAt: Date;
  updatedAt: Date;
  settings: TenantSettings;
  metadata: TenantMetadata;
}

export interface TenantSettings {
  timezone: string;
  currency: string;
  language: string;
  customBranding?: {
    logo?: string;
    primaryColor?: string;
    secondaryColor?: string;
  };
  features: {
    horses: boolean;
    laboratory: boolean;
    clinic: boolean;
    pharmacy: boolean;
    marketplace: boolean;
    finance: boolean;
    hr: boolean;
    inventory: boolean;
    training: boolean;
    rooms: boolean;
    maintenance: boolean;
    messages: boolean;
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

export interface TenantUser {
  id: string;
  tenantId: string;
  userId: string;
  role: UserRole;
  permissions: string[];
  status: 'active' | 'inactive' | 'pending';
  joinedAt: Date;
  lastLoginAt?: Date;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
  tenants: TenantUser[];
}

export interface AuthContext {
  user: User | null;
  currentTenant: Tenant | null;
  availableTenants: Tenant[];
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  switchTenant: (tenantId: string) => Promise<void>;
  hasPermission: (permission: string) => boolean;
  hasRole: (role: UserRole) => boolean;
}
