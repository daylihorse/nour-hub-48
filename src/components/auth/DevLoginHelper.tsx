
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface SampleAccount {
  email: string;
  password: string;
  tenantType: string;
  role: string;
  tenantId: string;
  tenantName: string;
  description: string;
}

const DevLoginHelper = () => {
  const [isCreating, setIsCreating] = useState(false);
  const [isSettingUpData, setIsSettingUpData] = useState(false);
  const { login } = useAuth();
  const { toast } = useToast();

  const sampleAccounts: SampleAccount[] = [
    {
      email: 'owner@eliteequestrian.com',
      password: 'password123',
      tenantType: 'stable',
      role: 'owner',
      tenantId: '550e8400-e29b-41d4-a716-446655440001',
      tenantName: 'Elite Equestrian Center',
      description: 'Premium stable with full features enabled'
    },
    {
      email: 'manager@eliteequestrian.com',
      password: 'password123',
      tenantType: 'stable',
      role: 'manager',
      tenantId: '550e8400-e29b-41d4-a716-446655440001',
      tenantName: 'Elite Equestrian Center',
      description: 'Manager with limited permissions'
    },
    {
      email: 'owner@sunsetstables.com',
      password: 'password123',
      tenantType: 'stable',
      role: 'owner',
      tenantId: '550e8400-e29b-41d4-a716-446655440002',
      tenantName: 'Sunset Stables',
      description: 'Basic stable with essential features only'
    },
    {
      email: 'director@advancedvetclinic.com',
      password: 'password123',
      tenantType: 'clinic',
      role: 'owner',
      tenantId: '550e8400-e29b-41d4-a716-446655440003',
      tenantName: 'Advanced Veterinary Clinic',
      description: 'Professional clinic with medical features'
    },
    {
      email: 'director@equinediagnostics.com',
      password: 'password123',
      tenantType: 'laboratory',
      role: 'owner',
      tenantId: '550e8400-e29b-41d4-a716-446655440004',
      tenantName: 'Equine Diagnostics Lab',
      description: 'Professional laboratory with diagnostic tools'
    },
    {
      email: 'admin@regionalequinehospital.com',
      password: 'password123',
      tenantType: 'hospital',
      role: 'owner',
      tenantId: '550e8400-e29b-41d4-a716-446655440005',
      tenantName: 'Regional Equine Hospital',
      description: 'Enterprise hospital with all features'
    },
    {
      email: 'admin@horsetrader.com',
      password: 'password123',
      tenantType: 'marketplace',
      role: 'owner',
      tenantId: '550e8400-e29b-41d4-a716-446655440006',
      tenantName: 'HorseTrader Marketplace',
      description: 'Premium marketplace platform'
    },
    {
      email: 'ceo@globalequinesolutions.com',
      password: 'password123',
      tenantType: 'enterprise',
      role: 'owner',
      tenantId: '550e8400-e29b-41d4-a716-446655440007',
      tenantName: 'Global Equine Solutions',
      description: 'Enterprise solution with complete feature set'
    }
  ];

  const createTenantAssociation = async (userId: string, account: SampleAccount) => {
    console.log('Creating tenant association for user:', userId, 'account:', account.email);
    
    const permissions = account.role === 'owner' ? ['*'] : 
      account.role === 'manager' ? ['horses:read', 'horses:write', 'inventory:read', 'inventory:write', 'finance:read'] :
      ['horses:read'];

    const { data, error } = await supabase
      .from('tenant_users')
      .insert({
        tenant_id: account.tenantId,
        user_id: userId,
        role: account.role,
        permissions: permissions,
        status: 'active'
      })
      .select();

    if (error) {
      console.error('Error creating tenant association:', error);
      throw error;
    }

    console.log('Tenant association created successfully:', data);
    return data;
  };

  const createSampleAccount = async (account: SampleAccount) => {
    setIsCreating(true);
    try {
      console.log('Creating account for:', account.email);
      
      // First, try to sign up the user
      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email: account.email,
        password: account.password,
        options: {
          data: {
            first_name: account.email.split('@')[0].split('.')[0],
            last_name: account.role.charAt(0).toUpperCase() + account.role.slice(1),
          },
          emailRedirectTo: undefined // Disable email confirmation
        }
      });

      console.log('Sign up response:', signUpData, signUpError);

      if (signUpError) {
        // If user already exists, try to sign in instead
        if (signUpError.message.includes('already registered') || signUpError.message.includes('already been registered')) {
          console.log('User already exists, attempting login...');
          await login(account.email, account.password);
          
          // Get current user to create tenant association
          const { data: { user } } = await supabase.auth.getUser();
          if (user) {
            await createTenantAssociation(user.id, account);
          }
          
          toast({
            title: 'Logged in',
            description: `Logged in as ${account.email} and associated with ${account.tenantName}`,
          });
        } else {
          throw signUpError;
        }
      } else {
        // User was created successfully, create tenant association
        if (signUpData.user) {
          console.log('New user created:', signUpData.user.id);
          await createTenantAssociation(signUpData.user.id, account);
          
          // Now sign in the user
          const { error: signInError } = await supabase.auth.signInWithPassword({
            email: account.email,
            password: account.password,
          });

          if (signInError) {
            console.error('Sign in error after creation:', signInError);
            throw signInError;
          }

          toast({
            title: 'Account created and logged in',
            description: `Created ${account.email} and associated with ${account.tenantName}`,
          });
        }
      }
    } catch (error: any) {
      console.error('Error in createSampleAccount:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to create account',
        variant: 'destructive',
      });
    } finally {
      setIsCreating(false);
    }
  };

  const quickLogin = async (account: SampleAccount) => {
    try {
      console.log('Quick login for:', account.email);
      await login(account.email, account.password);
      toast({
        title: 'Logged in',
        description: `Logged in as ${account.email}`,
      });
    } catch (error: any) {
      console.error('Quick login error:', error);
      toast({
        title: 'Login failed',
        description: 'Account may not exist. Try creating it first.',
        variant: 'destructive',
      });
    }
  };

  const setupAllSampleData = async () => {
    setIsSettingUpData(true);
    try {
      let successCount = 0;
      let errorCount = 0;

      for (const account of sampleAccounts) {
        try {
          console.log(`Setting up account ${successCount + errorCount + 1}/${sampleAccounts.length}: ${account.email}`);
          
          // Try to create the account
          const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
            email: account.email,
            password: account.password,
            options: {
              data: {
                first_name: account.email.split('@')[0].split('.')[0],
                last_name: account.role.charAt(0).toUpperCase() + account.role.slice(1),
              },
              emailRedirectTo: undefined
            }
          });

          if (signUpError && !signUpError.message.includes('already registered')) {
            throw signUpError;
          }

          // If user was created or already exists, ensure tenant association
          let userId = signUpData?.user?.id;
          
          if (!userId) {
            // User already exists, get their ID from profiles
            const { data: profile } = await supabase
              .from('profiles')
              .select('id')
              .eq('email', account.email)
              .single();
            
            userId = profile?.id;
          }

          if (userId) {
            await createTenantAssociation(userId, account);
            successCount++;
          } else {
            errorCount++;
          }

          // Small delay to avoid rate limiting
          await new Promise(resolve => setTimeout(resolve, 100));
        } catch (error) {
          console.error(`Error setting up ${account.email}:`, error);
          errorCount++;
        }
      }

      toast({
        title: 'Sample data setup complete',
        description: `Successfully set up ${successCount} accounts. ${errorCount > 0 ? `${errorCount} errors occurred.` : ''}`,
        variant: errorCount > 0 ? 'destructive' : 'default',
      });
    } catch (error: any) {
      console.error('Error in setupAllSampleData:', error);
      toast({
        title: 'Setup failed',
        description: error.message || 'Failed to setup sample data',
        variant: 'destructive',
      });
    } finally {
      setIsSettingUpData(false);
    }
  };

  const debugCurrentUser = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      console.log('Current user:', user);
      
      if (user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();
        console.log('User profile:', profile);

        const { data: tenantUsers } = await supabase
          .from('tenant_users')
          .select('*, tenants(*)')
          .eq('user_id', user.id);
        console.log('User tenant associations:', tenantUsers);
      }

      toast({
        title: 'Debug info logged',
        description: 'Check the browser console for detailed user information',
      });
    } catch (error) {
      console.error('Debug error:', error);
    }
  };

  const getTenantTypeColor = (type: string) => {
    switch (type) {
      case 'stable': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'clinic': return 'bg-green-100 text-green-800 border-green-200';
      case 'laboratory': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'hospital': return 'bg-red-100 text-red-800 border-red-200';
      case 'marketplace': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'enterprise': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'owner': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'admin': return 'bg-red-100 text-red-800 border-red-200';
      case 'manager': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'employee': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Development Login Helper</CardTitle>
        <p className="text-sm text-muted-foreground">
          Quick access to sample accounts for testing different tenant types and roles.
        </p>
        <div className="flex gap-2 mt-4">
          <Button
            onClick={setupAllSampleData}
            disabled={isSettingUpData}
            variant="outline"
            className="bg-green-50 hover:bg-green-100 border-green-200"
          >
            {isSettingUpData ? 'Setting Up...' : 'Setup All Sample Data'}
          </Button>
          <Button
            onClick={debugCurrentUser}
            variant="outline"
            size="sm"
            className="bg-gray-50 hover:bg-gray-100"
          >
            Debug Current User
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {sampleAccounts.map((account, index) => (
            <div key={index} className="border rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-sm">{account.tenantName}</h3>
                <div className="flex gap-1">
                  <Badge className={`text-xs ${getTenantTypeColor(account.tenantType)}`}>
                    {account.tenantType}
                  </Badge>
                  <Badge className={`text-xs ${getRoleColor(account.role)}`}>
                    {account.role}
                  </Badge>
                </div>
              </div>
              
              <p className="text-xs text-muted-foreground">{account.description}</p>
              
              <div className="space-y-1">
                <p className="text-xs"><strong>Email:</strong> {account.email}</p>
                <p className="text-xs"><strong>Password:</strong> {account.password}</p>
              </div>
              
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => createSampleAccount(account)}
                  disabled={isCreating || isSettingUpData}
                  className="flex-1"
                >
                  Create & Login
                </Button>
                <Button
                  size="sm"
                  onClick={() => quickLogin(account)}
                  disabled={isSettingUpData}
                  className="flex-1"
                >
                  Quick Login
                </Button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
          <h4 className="font-medium text-amber-800 mb-2">Important Notes:</h4>
          <ul className="text-sm text-amber-700 space-y-1">
            <li>• Use "Setup All Sample Data" to create all accounts and tenant associations at once</li>
            <li>• "Create & Login" will create a new user account and automatically associate it with the correct tenant</li>
            <li>• "Quick Login" assumes the account already exists and has tenant associations</li>
            <li>• Use "Debug Current User" to see user and tenant information in the console</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default DevLoginHelper;
