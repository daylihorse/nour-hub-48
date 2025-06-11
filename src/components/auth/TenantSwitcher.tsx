
import { CheckIcon, ChevronDownIcon, BuildingIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/hooks/useAuth';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';

const TenantSwitcher = () => {
  const { currentTenant, availableTenants, switchTenant } = useAuth();
  const navigate = useNavigate();

  if (!currentTenant || availableTenants.length <= 1) {
    return null;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2 w-[200px] justify-between">
          <div className="flex items-center gap-2 max-w-[160px] overflow-hidden">
            <BuildingIcon className="h-4 w-4 text-muted-foreground" />
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
      <DropdownMenuContent align="center" className="w-[220px]">
        <DropdownMenuLabel>Switch tenant</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {availableTenants.map((tenant) => (
          <DropdownMenuItem
            key={tenant.id}
            className={`flex items-center justify-between cursor-pointer ${
              tenant.id === currentTenant.id ? 'bg-accent' : ''
            }`}
            onClick={() => {
              if (tenant.id !== currentTenant.id) {
                switchTenant(tenant.id);
                // Navigate to dashboard after switch
                navigate('/dashboard');
              }
            }}
          >
            <div className="flex items-center gap-2 max-w-[160px] overflow-hidden">
              <span className="truncate">{tenant.name}</span>
              <Badge 
                variant="outline" 
                className="text-xs capitalize"
              >
                {tenant.type}
              </Badge>
            </div>
            {tenant.id === currentTenant.id && <CheckIcon className="h-4 w-4" />}
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => navigate('/onboarding')}
          className="cursor-pointer text-primary hover:text-primary"
        >
          Add new tenant
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default TenantSwitcher;
