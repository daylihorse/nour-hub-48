
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/useAuth";
import { useTenantFeatures } from "@/hooks/useTenantFeatures";

const EnhancedSubscriptionTierInfo = () => {
  const { currentTenant } = useAuth();
  const { subscriptionTier, getSubscriptionTierFeatures } = useTenantFeatures();

  if (!currentTenant) return null;

  const tierFeatures = getSubscriptionTierFeatures(subscriptionTier);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Subscription Information</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <Badge variant="outline" className="capitalize">
              {subscriptionTier} Plan
            </Badge>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">
              {tierFeatures.length} features available
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EnhancedSubscriptionTierInfo;
