
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { useTenantFeatures, FeatureDefinition } from '@/hooks/useTenantFeatures';

const FeatureManagement = () => {
  const { features, featureMatrix, isFeatureEnabled } = useTenantFeatures();
  const [enabledFeatures, setEnabledFeatures] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    features.forEach(feature => {
      initial[feature.id] = feature.enabled;
    });
    return initial;
  });

  const handleFeatureToggle = (featureId: string, enabled: boolean) => {
    setEnabledFeatures(prev => ({
      ...prev,
      [featureId]: enabled
    }));
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Feature Management</h2>
        <p className="text-muted-foreground">Configure which features are available for your tenant</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {features.map((feature) => {
          const definition = featureMatrix[feature.id] as FeatureDefinition;
          const isEnabled = enabledFeatures[feature.id] ?? feature.enabled;
          
          return (
            <Card key={feature.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{feature.name}</CardTitle>
                  <Switch
                    checked={isEnabled}
                    onCheckedChange={(checked) => handleFeatureToggle(feature.id, checked)}
                  />
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-2">
                  {definition?.description || 'Feature description'}
                </p>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">{feature.category}</Badge>
                  {definition?.requiredSubscription && (
                    <Badge variant="outline">
                      {definition.requiredSubscription[0]}+
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default FeatureManagement;
