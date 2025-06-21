
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { SubscriptionTier } from '@/types/tenant';
import { useTenantFeatures } from '@/hooks/useTenantFeatures';

interface SubscriptionTierInfoProps {
  tier: SubscriptionTier;
}

const SubscriptionTierInfo = ({ tier }: SubscriptionTierInfoProps) => {
  const { getSubscriptionTierFeatures } = useTenantFeatures();
  const tierFeatures = getSubscriptionTierFeatures(tier);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Subscription Tier
          <Badge variant="default">{tier}</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">
            Available features for {tier} tier:
          </p>
          <div className="flex flex-wrap gap-2">
            {tierFeatures.map((feature) => (
              <Badge key={feature.id} variant="outline">
                {feature.name}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SubscriptionTierInfo;
