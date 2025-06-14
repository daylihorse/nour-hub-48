
import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { authService } from '@/services/auth/authService';
import { SampleAccount, sampleAccounts } from './SampleAccount';

export const useDevLogin = () => {
  const [isCreating, setIsCreating] = useState(false);
  const [creatingEmail, setCreatingEmail] = useState<string | null>(null);
  const [operationStatus, setOperationStatus] = useState<Record<string, 'pending' | 'success' | 'error'>>({});
  const { login } = useAuth();
  const { toast } = useToast();

  const quickLogin = async (account: SampleAccount) => {
    try {
      console.log('Quick login for:', account.email);
      setCreatingEmail(account.email);
      setOperationStatus(prev => ({ ...prev, [account.email]: 'pending' }));
      
      await authService.createSampleUserIfNotExists(
        account.email, 
        account.password, 
        account.firstName, 
        account.lastName
      );
      
      await login(account.email, account.password);
      
      setOperationStatus(prev => ({ ...prev, [account.email]: 'success' }));
      
      toast({
        title: 'Logged in successfully',
        description: `Logged in as ${account.email}`,
      });
    } catch (error: any) {
      console.error('Quick login error:', error);
      setOperationStatus(prev => ({ ...prev, [account.email]: 'error' }));
      
      toast({
        title: 'Login failed',
        description: error.message || 'Login failed. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setCreatingEmail(null);
    }
  };

  const createAllSampleUsers = async () => {
    setIsCreating(true);
    setOperationStatus({});
    
    try {
      console.log('Creating all sample users...');
      
      for (const account of sampleAccounts) {
        setCreatingEmail(account.email);
        setOperationStatus(prev => ({ ...prev, [account.email]: 'pending' }));
        
        try {
          await authService.createSampleUserIfNotExists(
            account.email,
            account.password,
            account.firstName,
            account.lastName
          );
          console.log(`Created/verified user: ${account.email}`);
          setOperationStatus(prev => ({ ...prev, [account.email]: 'success' }));
        } catch (error) {
          console.error(`Failed to create user ${account.email}:`, error);
          setOperationStatus(prev => ({ ...prev, [account.email]: 'error' }));
        }
      }
      
      toast({
        title: 'Sample users ready',
        description: 'All sample user accounts have been created and are ready to use.',
      });
    } catch (error: any) {
      console.error('Error creating sample users:', error);
      toast({
        title: 'Creation failed',
        description: 'Some sample users could not be created. Check console for details.',
        variant: 'destructive',
      });
    } finally {
      setIsCreating(false);
      setCreatingEmail(null);
    }
  };

  const debugCurrentUser = async () => {
    try {
      const user = await authService.getCurrentUser();
      console.log('Current user:', user);
      
      toast({
        title: 'Debug info logged',
        description: 'Check the browser console for detailed user information',
      });
    } catch (error) {
      console.error('Debug error:', error);
    }
  };

  return {
    isCreating,
    creatingEmail,
    operationStatus,
    quickLogin,
    createAllSampleUsers,
    debugCurrentUser
  };
};
