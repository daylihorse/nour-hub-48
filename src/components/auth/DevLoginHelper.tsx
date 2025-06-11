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
        description: error.message || 'Login failed. Please try again.',
        variant: 'destructive',
      });
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
                  onClick={() => quickLogin(account)}
                  disabled={isSettingUpData}
                  className="flex-1"
                >
                  Login
                </Button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
          <h4 className="font-medium text-amber-800 mb-2">Important Notes:</h4>
          <ul className="text-sm text-amber-700 space-y-1">
            <li>• Click "Login" to quickly sign in with any sample account</li>
            <li>• Use "Debug Current User" to see user and tenant information in the console</li>
            <li>• All sample accounts are pre-configured with tenant associations</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default DevLoginHelper;
