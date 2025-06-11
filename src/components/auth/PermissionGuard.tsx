
import { ReactNode } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { UserRole } from '@/types/tenant';

interface PermissionGuardProps {
  children: ReactNode;
  permission?: string;
  role?: UserRole;
  fallback?: ReactNode;
  requireAll?: boolean;
}

const PermissionGuard = ({ 
  children, 
  permission, 
  role, 
  fallback = null,
  requireAll = false 
}: PermissionGuardProps) => {
  const { hasPermission, hasRole } = useAuth();

  const hasPermissionAccess = permission ? hasPermission(permission) : true;
  const hasRoleAccess = role ? hasRole(role) : true;

  const hasAccess = requireAll 
    ? hasPermissionAccess && hasRoleAccess
    : hasPermissionAccess || hasRoleAccess;

  if (!hasAccess) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
};

export default PermissionGuard;
