
import { User, Tenant, UserRole } from '@/types/tenant';

export const usePermissions = (user: User | null, currentTenant: Tenant | null) => {
  const hasPermission = (permission: string): boolean => {
    if (!user || !currentTenant) return false;
    
    const tenantUser = user.tenants.find(t => t.tenantId === currentTenant.id);
    if (!tenantUser) return false;
    
    // If user has all permissions (*)
    if (tenantUser.permissions.includes('*')) return true;
    
    // Check specific permission
    return tenantUser.permissions.includes(permission);
  };

  const hasRole = (role: UserRole): boolean => {
    if (!user || !currentTenant) return false;
    
    const tenantUser = user.tenants.find(t => t.tenantId === currentTenant.id);
    if (!tenantUser) return false;
    
    return tenantUser.role === role;
  };

  return {
    hasPermission,
    hasRole,
  };
};
