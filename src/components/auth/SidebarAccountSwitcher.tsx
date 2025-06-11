
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
import { useSidebar } from '@/components/ui/sidebar';

const SidebarAccountSwitcher = () => {
  const { currentTenant } = useAuth();
  const { isDemoMode, isPublicMode } = useAccessMode();
  const navigate = useNavigate();
  const { state } = useSidebar();
  const collapsed = state === "collapsed";

  if (!currentTenant) {
    return null;
  }

  const handleAccountSwitch = (account: any) => {
    // Navigate to login with the selected account credentials
    navigate('/login', {
      state: {
        email: account.email,
        password: account.password,
        autoLogin: true
      }
    });
  };

  const renderSwitcher = () => {
    if (isPublicMode) {
      // In public mode, show minimal tenant info
      return (
        <div className={`flex items-center gap-2 p-2 ${collapsed ? 'justify-center' : ''}`}>
          <div className="flex items-center justify-center w-8 h-8 rounded-md bg-primary/10">
            <UserCheck className="h-4 w-4 text-primary" />
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{currentTenant.name}</p>
              <Badge variant="outline" className="text-xs">
                Public Demo
              </Badge>
            </div>
          )}
        </div>
      );
    }
    
    if (isDemoMode) {
      const demoAccounts = publicDemoService.getDemoAccounts();
      
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="ghost" 
              className={`w-full justify-start gap-2 p-2 ${collapsed ? 'px-1' : ''}`}
            >
              <div className="flex items-center justify-center w-8 h-8 rounded-md bg-primary/10">
                <UserCheck className="h-4 w-4 text-primary" />
              </div>
              {!collapsed && (
                <>
                  <div className="flex-1 min-w-0 text-left">
                    <p className="text-sm font-medium truncate">{currentTenant.name}</p>
                    <Badge variant="outline" className="text-xs">
                      {currentTenant.type}
                    </Badge>
                  </div>
                  <ChevronDownIcon className="h-4 w-4 text-muted-foreground" />
                </>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-[280px]">
            <DropdownMenuLabel>Switch Demo Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {demoAccounts.map((account, index) => (
              <DropdownMenuItem
                key={index}
                className="flex items-center justify-between cursor-pointer p-3"
                onClick={() => handleAccountSwitch(account)}
              >
                <div className="flex flex-col gap-1 max-w-[200px] overflow-hidden">
                  <div className="flex items-center gap-2">
                    <span className="truncate font-medium">{account.tenantName}</span>
                    <Badge variant="outline" className="text-xs">
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
              onClick={() => navigate('/onboarding')}
              className="cursor-pointer text-primary hover:text-primary"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create new account
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    }
    
    // Regular auth mode - show current tenant info
    return (
      <div className={`flex items-center gap-2 p-2 ${collapsed ? 'justify-center' : ''}`}>
        <div className="flex items-center justify-center w-8 h-8 rounded-md bg-primary/10">
          <UserCheck className="h-4 w-4 text-primary" />
        </div>
        {!collapsed && (
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{currentTenant.name}</p>
            <Badge variant="outline" className="text-xs">
              {currentTenant.type}
            </Badge>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="border-b border-sidebar-border">
      {renderSwitcher()}
    </div>
  );
};

export default SidebarAccountSwitcher;
