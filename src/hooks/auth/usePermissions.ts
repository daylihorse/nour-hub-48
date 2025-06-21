
import { User, Tenant } from '@/types/tenant';

export const usePermissions = (user: User | null, tenant: Tenant | null) => {
  const hasPermission = (permission: string) => {
    // In demo mode, allow all permissions
    return true;
  };

  const hasRole = (role: string) => {
    // In demo mode, allow all roles
    return true;
  };

  return {
    hasPermission,
    hasRole
  };
};
