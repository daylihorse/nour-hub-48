
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { TenantType } from '@/types/tenant';

interface FeatureSelectionProps {
  tenantType: TenantType;
  data?: Record<string, boolean>;
  onUpdate: (features: Record<string, boolean>) => void;
  onNext: () => void;
  onBack: () => void;
}

const FeatureSelection = ({ tenantType, data = {}, onUpdate, onNext, onBack }: FeatureSelectionProps) => {
  const [selectedFeatures, setSelectedFeatures] = useState<Record<string, boolean>>(data);

  const featureCategories = {
    essential: [
      { id: 'horses', name: 'Horse Management', description: 'Core horse management features' },
      { id: 'clients', name: 'Client Management', description: 'Customer relationship management' }
    ],
    advanced: [
      { id: 'clinic', name: 'Veterinary Clinic', description: 'Medical records and treatments' },
      { id: 'finance', name: 'Financial Management', description: 'Accounting and billing' }
    ]
  };

  const handleFeatureToggle = (featureId: string, enabled: boolean) => {
    const updated = { ...selectedFeatures, [featureId]: enabled };
    setSelectedFeatures(updated);
    onUpdate(updated);
  };

  const handleContinue = () => {
    onNext();
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle>Select Features</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-4">Essential Features</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {featureCategories.essential.map((feature) => (
                <div key={feature.id} className="flex items-start space-x-3 p-4 border rounded-lg">
                  <Checkbox
                    id={feature.id}
                    checked={selectedFeatures[feature.id] || false}
                    onCheckedChange={(checked) => handleFeatureToggle(feature.id, !!checked)}
                  />
                  <div>
                    <label htmlFor={feature.id} className="text-sm font-medium cursor-pointer">
                      {feature.name}
                    </label>
                    <p className="text-xs text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Advanced Features</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {featureCategories.advanced.map((feature) => (
                <div key={feature.id} className="flex items-start space-x-3 p-4 border rounded-lg">
                  <Checkbox
                    id={feature.id}
                    checked={selectedFeatures[feature.id] || false}
                    onCheckedChange={(checked) => handleFeatureToggle(feature.id, !!checked)}
                  />
                  <div>
                    <label htmlFor={feature.id} className="text-sm font-medium cursor-pointer">
                      {feature.name}
                    </label>
                    <p className="text-xs text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-between pt-6">
            <Button variant="outline" onClick={onBack}>
              Back
            </Button>
            <Button onClick={handleContinue}>
              Continue
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FeatureSelection;
