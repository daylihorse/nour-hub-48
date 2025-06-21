
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Check, Star, ArrowRight, Crown, Zap } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useTenantFeatures } from "@/hooks/useTenantFeatures";
import { SubscriptionTier } from '@/types/tenant';

const EnhancedSubscriptionTierInfo = () => {
  const { currentTenant } = useAuth();
  const { getSubscriptionTierFeatures, subscriptionTier } = useTenantFeatures();
  
  if (!currentTenant || !subscriptionTier) return null;
  
  const tiers: SubscriptionTier[] = ['basic', 'professional', 'premium', 'enterprise'];
  const currentTierIndex = tiers.indexOf(subscriptionTier);
  
  const getTierInfo = (tier: SubscriptionTier) => {
    switch (tier) {
      case 'basic': 
        return { 
          color: 'bg-gray-100 text-gray-800 border-gray-300',
          price: '$29',
          icon: Star,
          gradient: 'from-gray-50 to-gray-100'
        };
      case 'professional': 
        return { 
          color: 'bg-blue-100 text-blue-800 border-blue-300',
          price: '$79',
          icon: Zap,
          gradient: 'from-blue-50 to-blue-100'
        };
      case 'premium': 
        return { 
          color: 'bg-purple-100 text-purple-800 border-purple-300',
          price: '$149',
          icon: Crown,
          gradient: 'from-purple-50 to-purple-100'
        };
      case 'enterprise': 
        return { 
          color: 'bg-orange-100 text-orange-800 border-orange-300',
          price: 'Custom',
          icon: Crown,
          gradient: 'from-orange-50 to-orange-100'
        };
      default: 
        return { 
          color: 'bg-gray-100 text-gray-800 border-gray-300',
          price: '$29',
          icon: Star,
          gradient: 'from-gray-50 to-gray-100'
        };
    }
  };
  
  const currentTierInfo = getTierInfo(subscriptionTier);
  const currentFeatures = getSubscriptionTierFeatures(subscriptionTier);
  const nextTier = tiers[currentTierIndex + 1];
  const nextTierFeatures = nextTier ? getSubscriptionTierFeatures(nextTier) : [];
  
  return (
    <Card className="shadow-brown hover:shadow-brown-lg transition-shadow duration-300">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2">
          <currentTierInfo.icon className="h-5 w-5 text-brown-600" />
          Subscription Management
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Current Plan */}
        <div className={`bg-gradient-to-r ${currentTierInfo.gradient} rounded-xl p-6 border-2 border-brown-200`}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <Badge className={`${currentTierInfo.color} px-3 py-1 text-sm font-medium mb-2`}>
                Current Plan
              </Badge>
              <h3 className="text-2xl font-bold text-brown-900 capitalize">{subscriptionTier}</h3>
              <p className="text-brown-600">{currentTierInfo.price}/month</p>
            </div>
            <currentTierInfo.icon className="h-8 w-8 text-brown-600" />
          </div>
          
          <div className="space-y-2">
            <p className="text-sm text-brown-700 font-medium">Features included:</p>
            <div className="grid grid-cols-1 gap-1">
              {currentFeatures.slice(0, 4).map(feature => (
                <div key={feature.id} className="flex items-center text-sm text-brown-700">
                  <Check className="h-3 w-3 text-green-600 mr-2 flex-shrink-0" />
                  <span className="truncate">{feature.name}</span>
                </div>
              ))}
              {currentFeatures.length > 4 && (
                <p className="text-xs text-brown-600 mt-1">
                  +{currentFeatures.length - 4} more features
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Usage Progress */}
        <div className="space-y-3">
          <h4 className="font-medium text-brown-900">Plan Usage</h4>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-brown-600">Features Used</span>
              <span className="text-brown-900 font-medium">{currentFeatures.length}/20</span>
            </div>
            <Progress value={(currentFeatures.length / 20) * 100} className="h-2" />
          </div>
        </div>

        {/* Upgrade Section */}
        {nextTier && (
          <div className="border-t pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-brown-600">Unlock more with</p>
                <p className="font-semibold text-brown-900 capitalize">{nextTier}</p>
                <p className="text-xs text-brown-600">
                  +{nextTierFeatures.length - currentFeatures.length} additional features
                </p>
              </div>
              <Button size="sm" variant="outline" className="border-brown-200 hover:bg-brown-50">
                <ArrowRight className="h-3 w-3 mr-1" />
                Upgrade
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default EnhancedSubscriptionTierInfo;
