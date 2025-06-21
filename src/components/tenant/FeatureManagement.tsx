
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from '@/hooks/useAuth';
import { useTenantFeatures, FEATURE_MATRIX } from '@/hooks/useTenantFeatures';
import { Lock, InfoIcon } from 'lucide-react';
import { 
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from "@/components/ui/tooltip";

// Mock function to update tenant settings - would be replaced with actual API call
const updateTenantFeatureSettings = async (
  tenantId: string, 
  features: Record<string, boolean>
): Promise<boolean> => {
  console.log('Updating tenant features:', { tenantId, features });
  return new Promise((resolve) => {
    setTimeout(() => resolve(true), 500);
  });
};

const FeatureManagement = () => {
  const { currentTenant } = useAuth();
  const { features, getAvailableFeatures, getUnavailableFeatures } = useTenantFeatures();
  const { toast } = useToast();
  
  const [featureStates, setFeatureStates] = useState<Record<string, boolean>>({
    ...(features || {})
  });
  const [isLoading, setIsLoading] = useState(false);
  
  const availableFeatures = getAvailableFeatures();
  const unavailableFeatures = getUnavailableFeatures();
  
  if (!currentTenant) return null;
  
  const handleToggleFeature = (featureId: string) => {
    setFeatureStates(prev => ({
      ...prev,
      [featureId]: !prev[featureId]
    }));
  };
  
  const handleSaveChanges = async () => {
    if (!currentTenant?.id) return;
    
    setIsLoading(true);
    try {
      const success = await updateTenantFeatureSettings(
        currentTenant.id,
        featureStates
      );
      
      if (success) {
        toast({
          title: "Features updated",
          description: "Your feature settings have been saved successfully.",
        });
      } else {
        throw new Error("Failed to update features");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update feature settings. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const hasChanges = () => {
    if (!features) return false;
    
    return Object.keys(featureStates).some(
      key => featureStates[key] !== features[key as keyof typeof features]
    );
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Manage Features</CardTitle>
        <CardDescription>
          Enable or disable features based on your organization's needs
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Available Features */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-muted-foreground">Available Features</h3>
            <div className="space-y-2">
              {availableFeatures.map(feature => {
                const { id, name, description } = feature;
                
                return (
                  <div key={id} className="flex items-center justify-between p-3 border rounded-md">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium text-sm">{name}</h4>
                        <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">
                          Available
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">{description}</p>
                    </div>
                    <Switch 
                      checked={featureStates[id] || false} 
                      onCheckedChange={() => handleToggleFeature(id)}
                    />
                  </div>
                );
              })}
            </div>
          </div>
          
          {/* Unavailable Features - require subscription upgrade */}
          {unavailableFeatures.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-muted-foreground">
                Features Requiring Subscription Upgrade
              </h3>
              <div className="space-y-2">
                {unavailableFeatures.map(feature => {
                  const { id, name, description, requiredSubscription } = feature;
                  const lowestTier = requiredSubscription[0];
                  
                  return (
                    <div key={id} className="flex items-center justify-between p-3 border rounded-md bg-gray-50">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium text-sm">{name}</h4>
                          <Badge variant="outline" className="text-xs bg-gray-100 text-gray-600 border-gray-200">
                            {lowestTier} Subscription
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">{description}</p>
                      </div>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div>
                            <Switch 
                              checked={false} 
                              disabled={true}
                            />
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <div className="flex items-center gap-2">
                            <Lock className="h-4 w-4" />
                            <span className="text-xs">
                              Requires {lowestTier} subscription or higher
                            </span>
                          </div>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          
          <div className="flex justify-end gap-3 pt-4">
            <Button 
              variant="outline" 
              onClick={() => setFeatureStates({ ...(features || {}) })}
              disabled={!hasChanges() || isLoading}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleSaveChanges} 
              disabled={!hasChanges() || isLoading}
              className="min-w-[100px]"
            >
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
          </div>
          
          <div className="flex items-center gap-2 p-3 bg-blue-50 text-blue-800 rounded-md text-xs">
            <InfoIcon className="h-4 w-4" />
            <p>
              Note: Changes to feature settings may require reloading the application to take effect.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FeatureManagement;
