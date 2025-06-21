
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTenantFeatures } from "@/hooks/useTenantFeatures";

const EnhancedDepartmentGrid = () => {
  const { isFeatureEnabled, getEnabledFeatures } = useTenantFeatures();
  const enabledFeatures = getEnabledFeatures();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {enabledFeatures.map(feature => (
        <Card key={feature.id}>
          <CardHeader>
            <CardTitle>{feature.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              {feature.category} feature
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default EnhancedDepartmentGrid;
