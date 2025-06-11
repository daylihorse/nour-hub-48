
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Star } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useTenantFeatures } from "@/hooks/useTenantFeatures";
import { SubscriptionTier } from '@/types/tenant';

const SubscriptionTierInfo = () => {
  const { currentTenant } = useAuth();
  const { getSubscriptionTierFeatures, subscriptionTier } = useTenantFeatures();
  
  if (!currentTenant || !subscriptionTier) return null;
  
  const tiers: SubscriptionTier[] = ['basic', 'professional', 'premium', 'enterprise'];
  const currentTierIndex = tiers.indexOf(subscriptionTier);
  
  const getTierColor = (tier: SubscriptionTier) => {
    switch (tier) {
      case 'basic': return 'bg-gray-100 text-gray-800 border-gray-300';
      case 'professional': return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'premium': return 'bg-purple-100 text-purple-800 border-purple-300';
      case 'enterprise': return 'bg-amber-100 text-amber-800 border-amber-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };
  
  const getTierIsCurrent = (tier: SubscriptionTier) => {
    return tier === subscriptionTier;
  };
  
  const getTierIsUpgrade = (tier: SubscriptionTier) => {
    const tierIndex = tiers.indexOf(tier);
    return tierIndex > currentTierIndex;
  };
  
  return (
    <Card className="shadow-sm h-full">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg flex items-center">
          <Star className="h-5 w-5 text-yellow-500 mr-2" />
          Subscription Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="mb-4">
          <p className="text-sm text-muted-foreground">Current subscription:</p>
          <div className="flex items-center mt-1">
            <Badge className={`${getTierColor(subscriptionTier)} capitalize px-3 py-1 text-sm font-medium`}>
              {subscriptionTier}
            </Badge>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          {tiers.map(tier => {
            const features = getSubscriptionTierFeatures(tier);
            const isCurrent = getTierIsCurrent(tier);
            const isUpgrade = getTierIsUpgrade(tier);
            
            return (
              <div 
                key={tier} 
                className={`border rounded-md p-3 ${isCurrent ? 'border-primary bg-primary/5' : 'border-muted'}`}
              >
                <div className="flex items-center justify-between mb-2">
                  <Badge className={`${getTierColor(tier)} capitalize text-xs`}>
                    {tier}
                  </Badge>
                  {isCurrent && (
                    <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 text-xs">
                      Current
                    </Badge>
                  )}
                  {isUpgrade && (
                    <Badge variant="outline" className="bg-gray-100 text-gray-600 border-gray-200 text-xs">
                      Upgrade
                    </Badge>
                  )}
                </div>
                <div className="text-xs space-y-1">
                  <p className="font-medium mb-1">Features:</p>
                  <ul className="space-y-1">
                    {features.slice(0, 3).map(feature => (
                      <li key={feature.id} className="flex items-center text-xs">
                        <Check className="h-3 w-3 text-green-600 mr-1.5 flex-shrink-0" />
                        <span className="truncate">{feature.name}</span>
                      </li>
                    ))}
                    {features.length > 3 && (
                      <li className="text-xs text-muted-foreground">
                        +{features.length - 3} more
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default SubscriptionTierInfo;
