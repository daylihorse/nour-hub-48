
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Loader2 } from 'lucide-react';
import { SampleAccount } from './SampleAccount';
import { getStatusIcon, getTenantTypeColor, getRoleColor } from './DevLoginUtils';

interface AccountCardProps {
  account: SampleAccount;
  isCreating: boolean;
  creatingEmail: string | null;
  operationStatus: Record<string, 'pending' | 'success' | 'error'>;
  onQuickLogin: (account: SampleAccount) => void;
}

const AccountCard = ({ 
  account, 
  isCreating, 
  creatingEmail, 
  operationStatus, 
  onQuickLogin 
}: AccountCardProps) => {
  const StatusIcon = getStatusIcon(operationStatus[account.email]);

  return (
    <div className="border rounded-lg p-4 space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="font-medium text-sm">{account.tenantName}</h3>
        <div className="flex gap-1 items-center">
          {StatusIcon && (
            <StatusIcon 
              className={`h-4 w-4 ${
                operationStatus[account.email] === 'pending' 
                  ? 'animate-spin text-blue-500' 
                  : operationStatus[account.email] === 'success'
                  ? 'text-green-500'
                  : 'text-red-500'
              }`} 
            />
          )}
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
          onClick={() => onQuickLogin(account)}
          disabled={isCreating || creatingEmail === account.email}
          className="flex-1"
        >
          {creatingEmail === account.email ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            'Login'
          )}
        </Button>
      </div>
    </div>
  );
};

export default AccountCard;
