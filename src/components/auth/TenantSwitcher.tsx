
import { useState } from 'react';
import { Check, ChevronDown, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/hooks/useAuth';
import { Tenant } from '@/types/tenant';

const TenantSwitcher = () => {
  const { currentTenant, availableTenants, switchTenant } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const handleTenantSwitch = async (tenant: Tenant) => {
    await switchTenant(tenant.id);
    setIsOpen(false);
  };

  const getTenantTypeColor = (type: string) => {
    switch (type) {
      case 'stable': return 'bg-blue-100 text-blue-800';
      case 'clinic': return 'bg-green-100 text-green-800';
      case 'hospital': return 'bg-red-100 text-red-800';
      case 'laboratory': return 'bg-purple-100 text-purple-800';
      case 'marketplace': return 'bg-pink-100 text-pink-800';
      case 'enterprise': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'trial': return 'bg-yellow-100 text-yellow-800';
      case 'suspended': return 'bg-red-100 text-red-800';
      case 'expired': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (!currentTenant) return null;

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          className="w-full justify-between"
          size="sm"
        >
          <div className="flex items-center gap-2 truncate">
            <Building2 className="h-4 w-4 flex-shrink-0" />
            <span className="truncate">{currentTenant.name}</span>
          </div>
          <ChevronDown className="h-4 w-4 flex-shrink-0" />
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent className="w-80" align="start">
        {availableTenants.map((tenant) => (
          <DropdownMenuItem
            key={tenant.id}
            className="flex items-center gap-3 p-3 cursor-pointer"
            onClick={() => handleTenantSwitch(tenant)}
          >
            <div className="flex items-center justify-center w-8 h-8 rounded bg-muted">
              <Building2 className="h-4 w-4" />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-medium truncate">{tenant.name}</span>
                {currentTenant.id === tenant.id && (
                  <Check className="h-4 w-4 text-green-600" />
                )}
              </div>
              <div className="flex items-center gap-2 mt-1 flex-wrap">
                <Badge 
                  variant="secondary" 
                  className={`text-xs ${getTenantTypeColor(tenant.type)}`}
                >
                  {tenant.type}
                </Badge>
                <Badge variant="outline" className="text-xs">
                  {tenant.subscriptionTier}
                </Badge>
                <Badge 
                  variant="outline" 
                  className={`text-xs ${getStatusColor(tenant.status)}`}
                >
                  {tenant.status}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {tenant.metadata?.address?.city}, {tenant.metadata?.address?.country}
              </p>
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default TenantSwitcher;
