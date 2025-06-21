
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useDevLogin } from "./dev-login/useDevLogin";

const DevLoginHelper = () => {
  const { quickLogin, createAllSampleUsers, isCreating } = useDevLogin();

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Development Login Helper</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Button 
            onClick={createAllSampleUsers}
            disabled={isCreating}
            className="w-full"
          >
            {isCreating ? 'Creating Users...' : 'Create All Sample Users'}
          </Button>
          <p className="text-sm text-muted-foreground text-center">
            This will create sample accounts for development testing.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default DevLoginHelper;
