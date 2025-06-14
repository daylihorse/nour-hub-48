
import React from 'react';
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAccessMode } from '@/contexts/AccessModeContext';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { publicDemoService } from '@/services/auth/publicDemoService';

export const AccessModeToggle = () => {
  const { accessMode, setAccessMode } = useAccessMode();
  const { switchDemoAccount, isLoading } = useAuth();
  const { toast } = useToast();
  const [selectedDemoAccount, setSelectedDemoAccount] = React.useState<string>('');

  const demoAccounts = publicDemoService.getDemoAccounts();

  const handleModeChange = (checked: boolean) => {
    const newMode = checked ? 'demo' : 'public';
    setAccessMode(newMode);
    
    toast({
      title: newMode === 'demo' ? 'Demo Mode Enabled' : 'Public Mode Enabled',
      description: newMode === 'demo' 
        ? 'You can now explore the marketplace with sample accounts'
        : 'You are viewing the marketplace in public mode',
    });
  };

  const handleDemoAccountSwitch = async () => {
    if (!selectedDemoAccount || !switchDemoAccount) return;
    
    const account = demoAccounts.find(acc => acc.id === selectedDemoAccount);
    if (account) {
      try {
        await switchDemoAccount(account);
        toast({
          title: 'Demo Account Switched',
          description: `Now viewing as ${account.tenantName}`,
        });
      } catch (error) {
        console.error('Failed to switch demo account:', error);
        toast({
          title: 'Switch Failed',
          description: 'Failed to switch demo account. Please try again.',
          variant: 'destructive',
        });
      }
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Access Mode
        </CardTitle>
        <CardDescription>
          Toggle between public and demo mode
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-2">
          <Switch
            id="access-mode"
            checked={accessMode === 'demo'}
            onCheckedChange={handleModeChange}
          />
          <Label htmlFor="access-mode">
            {accessMode === 'demo' ? 'Demo Mode' : 'Public Mode'}
          </Label>
        </div>
        
        <div className="text-sm text-muted-foreground">
          {accessMode === 'demo' 
            ? 'Explore marketplace features with sample accounts and data'
            : 'Browse marketplace products and services publicly'
          }
        </div>

        {accessMode === 'demo' && (
          <div className="space-y-3 pt-2 border-t">
            <Label className="text-sm font-medium">Switch Demo Account</Label>
            <div className="space-y-2">
              <Select
                value={selectedDemoAccount}
                onValueChange={setSelectedDemoAccount}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select demo account" />
                </SelectTrigger>
                <SelectContent>
                  {demoAccounts.map((account) => (
                    <SelectItem key={account.id} value={account.id}>
                      <div className="flex flex-col items-start">
                        <span className="font-medium">{account.tenantName}</span>
                        <span className="text-xs text-muted-foreground">
                          {account.firstName} {account.lastName} - {account.tenantType}
                        </span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Button 
                onClick={handleDemoAccountSwitch}
                disabled={!selectedDemoAccount || isLoading}
                className="w-full"
                size="sm"
              >
                {isLoading ? 'Switching...' : 'Switch Account'}
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
