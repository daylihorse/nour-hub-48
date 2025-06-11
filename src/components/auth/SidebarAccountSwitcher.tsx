
import { CheckIcon, ChevronDownIcon, UserCheck, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { publicDemoService } from '@/services/auth/publicDemoService';
import { useAccessMode } from '@/contexts/AccessModeContext';

const SidebarAccountSwitcher = () => {
  const { currentTenant, switchDemoAccount, isLoading } = useAuth();
  const { isDemoMode, isPublicMode, setAccessMode } = useAccessMode();
  const navigate = useNavigate();

  if (!currentTenant) {
    return null;
  }

  const handleAccountSwitch = async (account: any) => {
    console.log('Switching to account:', account);
    
    try {
      // Set to demo mode
      setAccessMode('demo');
      
      // Use the switchDemoAccount function
      if (switchDemoAccount) {
        await switchDemoAccount(account);
        console.log('Successfully switched to:', account.tenantName);
        
        // Navigate to dashboard after successful switch
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Account switch error:', error);
    }
  };

  const handleCreateAccount = () => {
    navigate('/onboarding');
  };

  const renderSwitcher = () => {
    if (isPublicMode) {
      // In public mode, show minimal tenant info with option to switch to demo
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="outline" 
              className="flex items-center gap-3 h-12 px-4 border-muted-foreground/20 hover:bg-muted/50 min-w-[280px] justify-start"
              disabled={isLoading}
            >
              <div className="flex items-center justify-center w-8 h-8 rounded-md bg-primary/10">
                <UserCheck className="h-4 w-4 text-primary" />
              </div>
              <div className="flex flex-col items-start min-w-0 flex-1">
                <span className="text-sm font-medium truncate max-w-[180px]">{currentTenant.name}</span>
                <Badge variant="outline" className="text-xs h-5 px-2 bg-blue-50 text-blue-700 border-blue-200">
                  Public Demo
                </Badge>
              </div>
              <ChevronDownIcon className="h-4 w-4 text-muted-foreground ml-2" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="center" className="w-[320px]">
            <DropdownMenuLabel>Switch to Demo Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {publicDemoService.getDemoAccounts().map((account, index) => (
              <DropdownMenuItem
                key={index}
                className="flex items-center justify-between cursor-pointer p-3"
                onClick={() => handleAccountSwitch(account)}
              >
                <div className="flex flex-col gap-1 max-w-[240px] overflow-hidden">
                  <div className="flex items-center gap-2">
                    <span className="truncate font-medium">{account.tenantName}</span>
                    <Badge variant="outline" className="text-xs capitalize">
                      {account.tenantType}
                    </Badge>
                  </div>
                  <span className="text-xs text-muted-foreground truncate">
                    {account.email}
                  </span>
                </div>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={handleCreateAccount}
              className="cursor-pointer text-primary hover:text-primary"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create new account
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    }
    
    if (isDemoMode) {
      const demoAccounts = publicDemoService.getDemoAccounts();
      
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="outline" 
              className="flex items-center gap-3 h-12 px-4 border-muted-foreground/20 hover:bg-muted/50 min-w-[280px] justify-start"
              disabled={isLoading}
            >
              <div className="flex items-center justify-center w-8 h-8 rounded-md bg-primary/10">
                <UserCheck className="h-4 w-4 text-primary" />
              </div>
              <div className="flex flex-col items-start min-w-0 flex-1">
                <span className="text-sm font-medium truncate max-w-[180px]">{currentTenant.name}</span>
                <Badge variant="outline" className="text-xs h-5 px-2 bg-green-50 text-green-700 border-green-200">
                  {currentTenant.type}
                </Badge>
              </div>
              <ChevronDownIcon className="h-4 w-4 text-muted-foreground ml-2" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="center" className="w-[320px]">
            <DropdownMenuLabel>Switch Demo Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {demoAccounts.map((account, index) => (
              <DropdownMenuItem
                key={index}
                className="flex items-center justify-between cursor-pointer p-3"
                onClick={() => handleAccountSwitch(account)}
              >
                <div className="flex flex-col gap-1 max-w-[240px] overflow-hidden">
                  <div className="flex items-center gap-2">
                    <span className="truncate font-medium">{account.tenantName}</span>
                    <Badge variant="outline" className="text-xs capitalize">
                      {account.tenantType}
                    </Badge>
                  </div>
                  <span className="text-xs text-muted-foreground truncate">
                    {account.email}
                  </span>
                </div>
                {currentTenant.name === account.tenantName && <CheckIcon className="h-4 w-4" />}
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={handleCreateAccount}
              className="cursor-pointer text-primary hover:text-primary"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create new account
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    }
    
    // Regular auth mode - show current tenant info without dropdown
    return (
      <div className="flex items-center gap-3 px-4 py-3 border border-muted-foreground/20 rounded-md bg-muted/30 min-w-[280px]">
        <div className="flex items-center justify-center w-8 h-8 rounded-md bg-primary/10">
          <UserCheck className="h-4 w-4 text-primary" />
        </div>
        <div className="flex flex-col items-start min-w-0 flex-1">
          <span className="text-sm font-medium truncate max-w-[180px]">{currentTenant.name}</span>
          <Badge variant="outline" className="text-xs h-5 px-2">
            {currentTenant.type}
          </Badge>
        </div>
      </div>
    );
  };

  return renderSwitcher();
};

export default SidebarAccountSwitcher;
