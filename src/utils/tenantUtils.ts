
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
  
  console.log(`✓ Valid tenant ID: ${tenantId}`);
  return tenantId;
};

export const getFallbackTenantId = (): string => {
  // Generate a valid UUID for fallback scenarios
  const fallbackId = uuidv4();
  console.warn(`Using generated fallback tenant ID: ${fallbackId}`);
  return fallbackId;
};

export const resolveTenantId = (tenantId: string | null | undefined): string => {
  console.log(`Resolving tenant ID: ${tenantId}`);
  
  const validTenantId = validateTenantId(tenantId);
  
  if (!validTenantId) {
    console.warn('Using fallback tenant ID due to invalid/missing tenant ID');
    return getFallbackTenantId();
  }
  
  console.log(`✓ Resolved tenant ID: ${validTenantId}`);
  return validTenantId;
};

export const debugTenantInfo = (context: string, tenant: any) => {
  console.group(`🏢 Tenant Debug - ${context}`);
  console.log('Tenant object:', tenant);
  console.log('Tenant ID:', tenant?.id);
  console.log('Tenant name:', tenant?.name);
  console.log('Tenant type:', tenant?.type);
  console.groupEnd();
};
