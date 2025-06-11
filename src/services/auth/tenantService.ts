
import { Tenant } from '@/types/tenant';

export const tenantService = {
  getCurrentTenant(availableTenants: Tenant[]): Tenant | null {
    const savedTenantId = localStorage.getItem('currentTenantId');
    const defaultTenant = savedTenantId 
      ? availableTenants.find(t => t.id === savedTenantId) || availableTenants[0]
      : availableTenants[0];
    
    return defaultTenant || null;
  },

  setCurrentTenant(tenantId: string): void {
    localStorage.setItem('currentTenantId', tenantId);
  },

  clearCurrentTenant(): void {
    localStorage.removeItem('currentTenantId');
  },
};
