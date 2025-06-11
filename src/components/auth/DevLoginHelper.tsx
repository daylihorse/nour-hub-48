
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
  tenantName: string;
  description: string;
}

const DevLoginHelper = () => {
  const [isCreating, setIsCreating] = useState(false);
  const { login } = useAuth();
  const { toast } = useToast();

  const sampleAccounts: SampleAccount[] = [
    {
      email: 'owner@eliteequestrian.com',
      password: 'password123',
      tenantType: 'stable',
      role: 'owner',
      tenantName: 'Elite Equestrian Center',
      description: 'Premium stable with full features enabled'
    },
    {
      email: 'manager@eliteequestrian.com',
      password: 'password123',
      tenantType: 'stable',
      role: 'manager',
      tenantName: 'Elite Equestrian Center',
      description: 'Manager with limited permissions'
    },
    {
      email: 'owner@sunsetstables.com',
      password: 'password123',
      tenantType: 'stable',
      role: 'owner',
      tenantName: 'Sunset Stables',
      description: 'Basic stable with essential features only'
    },
    {
      email: 'director@advancedvetclinic.com',
      password: 'password123',
      tenantType: 'clinic',
      role: 'owner',
      tenantName: 'Advanced Veterinary Clinic',
      description: 'Professional clinic with medical features'
    },
    {
      email: 'director@equinediagnostics.com',
      password: 'password123',
      tenantType: 'laboratory',
      role: 'owner',
      tenantName: 'Equine Diagnostics Lab',
      description: 'Professional laboratory with diagnostic tools'
    },
    {
      email: 'admin@regionalequinehospital.com',
      password: 'password123',
      tenantType: 'hospital',
      role: 'owner',
      tenantName: 'Regional Equine Hospital',
      description: 'Enterprise hospital with all features'
    },
    {
      email: 'admin@horsetrader.com',
      password: 'password123',
      tenantType: 'marketplace',
      role: 'owner',
      tenantName: 'HorseTrader Marketplace',
      description: 'Premium marketplace platform'
    },
    {
      email: 'ceo@globalequinesolutions.com',
      password: 'password123',
      tenantType: 'enterprise',
      role: 'owner',
      tenantName: 'Global Equine Solutions',
      description: 'Enterprise solution with complete feature set'
    }
  ];

  const createSampleAccount = async (account: SampleAccount) => {
    setIsCreating(true);
    try {
      // Sign up the user
      const { data, error } = await supabase.auth.signUp({
        email: account.email,
        password: account.password,
        options: {
          data: {
            first_name: account.email.split('@')[0].split('.')[0],
            last_name: account.role.charAt(0).toUpperCase() + account.role.slice(1),
          }
        }
      });

      if (error) {
        // If user already exists, try to sign in instead
        if (error.message.includes('already registered')) {
          await login(account.email, account.password);
          toast({
            title: 'Logged in',
            description: `Logged in as ${account.email}`,
          });
        } else {
          throw error;
        }
      } else {
        toast({
          title: 'Account created',
          description: `Created and logged in as ${account.email}`,
        });
      }
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setIsCreating(false);
    }
  };

  const quickLogin = async (account: SampleAccount) => {
    try {
      await login(account.email, account.password);
      toast({
        title: 'Logged in',
        description: `Logged in as ${account.email}`,
      });
    } catch (error: any) {
      toast({
        title: 'Login failed',
        description: 'Account may not exist. Try creating it first.',
        variant: 'destructive',
      });
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
                  disabled={isCreating}
                  className="flex-1"
                >
                  Create & Login
                </Button>
                <Button
                  size="sm"
                  onClick={() => quickLogin(account)}
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
            <li>• These accounts are for development and testing purposes only</li>
            <li>• "Create & Login" will create a new user account if it doesn't exist</li>
            <li>• "Quick Login" assumes the account already exists</li>
            <li>• After logging in, you'll need to manually link users to tenants in the database</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default DevLoginHelper;
