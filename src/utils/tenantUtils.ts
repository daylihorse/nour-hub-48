
import { v4 as uuidv4 } from 'uuid';

export const validateTenantId = (tenantId: string | null | undefined): string | null => {
  if (!tenantId) {
    console.warn('Tenant ID is missing');
    return null;
  }
  
  // Check if it's a valid UUID format
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  
  if (!uuidRegex.test(tenantId)) {
    console.error(`Invalid tenant ID format: ${tenantId}`);
    return null;
  }
  
  return tenantId;
};

export const getFallbackTenantId = (): string => {
  // Generate a valid UUID for fallback scenarios
  return uuidv4();
};

export const resolveTenantId = (tenantId: string | null | undefined): string => {
  const validTenantId = validateTenantId(tenantId);
  
  if (!validTenantId) {
    console.warn('Using fallback tenant ID due to invalid/missing tenant ID');
    return getFallbackTenantId();
  }
  
  return validTenantId;
};
