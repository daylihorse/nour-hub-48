
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import { sampleAccounts } from './dev-login/SampleAccount';
import { useDevLogin } from './dev-login/useDevLogin';
import AccountCard from './dev-login/AccountCard';
import StatusGuide from './dev-login/StatusGuide';
import ImportantNotes from './dev-login/ImportantNotes';

const DevLoginHelper = () => {
  const {
    isCreating,
    creatingEmail,
    operationStatus,
    quickLogin,
    createAllSampleUsers,
    debugCurrentUser
  } = useDevLogin();

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Development Login Helper</CardTitle>
        <p className="text-sm text-muted-foreground">
          Quick access to sample accounts for testing different tenant types and roles.
        </p>
        <div className="flex gap-2 mt-4">
          <Button
            onClick={createAllSampleUsers}
            disabled={isCreating}
            className="bg-blue-600 hover:bg-blue-700"
          >
            {isCreating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating Users...
              </>
            ) : (
              'Create All Sample Users'
            )}
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
            <AccountCard
              key={index}
              account={account}
              isCreating={isCreating}
              creatingEmail={creatingEmail}
              operationStatus={operationStatus}
              onQuickLogin={quickLogin}
            />
          ))}
        </div>
        
        <StatusGuide />
        <ImportantNotes />
      </CardContent>
    </Card>
  );
};

export default DevLoginHelper;
