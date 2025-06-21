
import { User, Tenant } from '@/types/tenant';

export const usePermissions = (user: User | null, currentTenant: Tenant | null) => {
  const hasPermission = (permission: string): boolean => {
    if (!user || !currentTenant) return false;
    
    // Find user's role in current tenant
    const tenantUser = user.tenants.find(t => t.tenantId === currentTenant.id);
    if (!tenantUser) return false;

    // Owner has all permissions
    if (tenantUser.role === 'owner') return true;
    
    // Check if user has wildcard permission
    if (tenantUser.permissions.includes('*')) return true;
    
    // Check specific permission
    return tenantUser.permissions.includes(permission);
  };

  const hasRole = (role: string): boolean => {
    if (!user || !currentTenant) return false;
    
    const tenantUser = user.tenants.find(t => t.tenantId === currentTenant.id);
    return tenantUser?.role === role;
  };

  return {
    hasPermission,
    hasRole,
  };
};
