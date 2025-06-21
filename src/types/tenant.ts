
export interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  role?: string;
}

export interface Tenant {
  id: string;
  name: string;
  type: string;
  subscriptionTier?: string;
}

export interface AuthContext {
  user: User | null;
  currentTenant: Tenant | null;
  availableTenants: Tenant[];
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ data: any; error: any }>;
  signUp: (email: string, password: string, firstName?: string, lastName?: string) => Promise<{ data: any; error: any }>;
  logout: () => Promise<void>;
  switchTenant: (tenantId: string) => Promise<void>;
  switchDemoAccount?: (account: any) => Promise<void>;
  hasPermission: (permission: string) => boolean;
  hasRole: (role: string) => boolean;
  isAuthenticated: boolean;
}
