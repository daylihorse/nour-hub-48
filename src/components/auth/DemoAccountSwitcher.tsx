
import { CheckIcon, ChevronDownIcon, UserCheck } from 'lucide-react';
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

const DemoAccountSwitcher = () => {
  const { currentTenant } = useAuth();
  const navigate = useNavigate();
  const demoAccounts = publicDemoService.getDemoAccounts();

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

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2 w-[200px] justify-between">
          <div className="flex items-center gap-2 max-w-[160px] overflow-hidden">
            <UserCheck className="h-4 w-4 text-muted-foreground" />
            <span className="truncate">{currentTenant.name}</span>
            <Badge 
              variant="outline" 
              className="text-xs capitalize bg-primary/10 border-primary/20 text-primary"
            >
              {currentTenant.type}
            </Badge>
          </div>
          <ChevronDownIcon className="h-4 w-4 text-muted-foreground" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center" className="w-[280px]">
        <DropdownMenuLabel>Switch to Demo Account</DropdownMenuLabel>
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
                <Badge 
                  variant="outline" 
                  className="text-xs capitalize"
                >
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
          Create new account
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DemoAccountSwitcher;
