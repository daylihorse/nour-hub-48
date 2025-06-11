
import { User, Tenant } from '@/types/tenant';

export const usePermissions = (user: User | null, currentTenant: Tenant | null) => {
  const hasPermission = (permission: string): boolean => {
    if (!user || !currentTenant) return false;
    const tenantUser = user.tenants.find(tu => tu.tenantId === currentTenant.id);
    return tenantUser?.permissions.includes('*') || tenantUser?.permissions.includes(permission) || false;
  };

  const hasRole = (role: string): boolean => {
    if (!user || !currentTenant) return false;
    const tenantUser = user.tenants.find(tu => tu.tenantId === currentTenant.id);
    return tenantUser?.role === role;
  };

  return {
    hasPermission,
    hasRole,
  };
};
