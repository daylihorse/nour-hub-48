
import { User, Tenant, TenantUser, TenantSettings, TenantMetadata } from '@/types/tenant';
import { mockTenantService } from './mockTenantService';

export const userDataService = {
  async loadUserData(mockUser: any): Promise<{
    user: User;
    tenants: Tenant[];
  }> {
    console.log('Loading user data for user:', mockUser.email);

    try {
      // Get user's tenant memberships using mock service
      const { tenants, tenantUsers } = await mockTenantService.getUserTenants(mockUser.email);
      console.log('Tenants loaded:', tenants);
      console.log('Tenant users loaded:', tenantUsers);

      // Transform user data
      const transformedUser: User = {
        id: mockUser.id,
        email: mockUser.email,
        firstName: mockUser.user_metadata?.first_name || '',
        lastName: mockUser.user_metadata?.last_name || '',
        avatar: undefined,
        createdAt: new Date(),
        updatedAt: new Date(),
        tenants: tenantUsers,
      };

      console.log('User data transformation complete:', {
        user: transformedUser,
        tenants: tenants
      });

      return {
        user: transformedUser,
        tenants: tenants
      };
    } catch (error) {
      console.error('Error in loadUserData:', error);
      throw error;
    }
  }
};
