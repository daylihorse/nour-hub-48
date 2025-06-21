
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, ArrowRight, Building2, CheckCircle, Star } from 'lucide-react';
import { TenantType } from '@/types/tenant';

interface FeatureSelectionProps {
  tenantType: TenantType;
  data?: Record<string, boolean>;
  onUpdate: (data: Record<string, boolean>) => void;
  onNext: () => void;
  onBack: () => void;
}

const FeatureSelection = ({ tenantType, data, onUpdate, onNext, onBack }: FeatureSelectionProps) => {
  const [selectedFeatures, setSelectedFeatures] = useState(data || {});

  const getFeaturesByTenant = () => {
    const baseFeatures = {
      horses: { name: 'Horse Management', description: 'Comprehensive horse records and health tracking', essential: true },
      messages: { name: 'Internal Messaging', description: 'Team communication and notifications', essential: true },
      finance: { name: 'Financial Management', description: 'Invoicing, payments, and financial reporting', essential: false },
      hr: { name: 'Human Resources', description: 'Employee management and payroll', essential: false },
      inventory: { name: 'Inventory Management', description: 'Stock tracking and supply management', essential: false }
    };

    const tenantSpecific = {
      stable: {
        ...baseFeatures,
        training: { name: 'Training Center', description: 'Training programs and progress tracking', essential: false },
        rooms: { name: 'Stable Rooms', description: 'Room assignments and facility management', essential: true },
        maintenance: { name: 'Maintenance', description: 'Facility maintenance and repairs', essential: false }
      },
      clinic: {
        ...baseFeatures,
        clinic: { name: 'Clinic Management', description: 'Appointments and medical procedures', essential: true },
        pharmacy: { name: 'Pharmacy', description: 'Prescription and medication management', essential: false },
        laboratory: { name: 'Laboratory', description: 'Lab tests and diagnostic reports', essential: false }
      },
      laboratory: {
        ...baseFeatures,
        laboratory: { name: 'Laboratory Management', description: 'Sample processing and test results', essential: true },
        clinic: { name: 'Clinic Integration', description: 'Integration with veterinary clinics', essential: false }
      },
      hospital: {
        ...baseFeatures,
        clinic: { name: 'Clinical Management', description: 'Medical procedures and patient care', essential: true },
        pharmacy: { name: 'Hospital Pharmacy', description: 'Medication dispensing and tracking', essential: true },
        laboratory: { name: 'Diagnostic Laboratory', description: 'In-house testing and diagnostics', essential: true },
        rooms: { name: 'Hospital Rooms', description: 'Patient rooms and surgical suites', essential: true }
      },
      marketplace: {
        ...baseFeatures,
        marketplace: { name: 'Marketplace Platform', description: 'Online buying and selling platform', essential: true }
      },
      enterprise: {
        ...baseFeatures,
        clinic: { name: 'Clinic Management', description: 'Multi-location clinic operations', essential: false },
        pharmacy: { name: 'Pharmacy Network', description: 'Multi-location pharmacy management', essential: false },
        laboratory: { name: 'Laboratory Network', description: 'Centralized lab management', essential: false },
        marketplace: { name: 'Marketplace Integration', description: 'B2B marketplace functionality', essential: false },
        training: { name: 'Training Programs', description: 'Staff training and certification', essential: false },
        rooms: { name: 'Facility Management', description: 'Multi-location facility management', essential: false },
        maintenance: { name: 'Maintenance Network', description: 'Centralized maintenance management', essential: false }
      }
    };

    return tenantSpecific[tenantType] || baseFeatures;
  };

  const features = getFeaturesByTenant();
  const essentialFeatures = Object.entries(features).filter(([_, feature]) => feature.essential);
  const optionalFeatures = Object.entries(features).filter(([_, feature]) => !feature.essential);

  const handleFeatureToggle = (featureKey: string, checked: boolean) => {
    const newFeatures = { ...selectedFeatures, [featureKey]: checked };
    setSelectedFeatures(newFeatures);
  };

  const handleContinue = () => {
    // Include all essential features
    const finalFeatures = { ...selectedFeatures };
    essentialFeatures.forEach(([key]) => {
      finalFeatures[key] = true;
    });
    
    onUpdate(finalFeatures);
    onNext();
  };

  const getTenantTypeTitle = () => {
    const titles = {
      stable: 'Equestrian Stable',
      clinic: 'Veterinary Clinic',
      laboratory: 'Diagnostic Laboratory',
      hospital: 'Veterinary Hospital',
      marketplace: 'Equine Marketplace',
      enterprise: 'Enterprise Solution'
    };
    return titles[tenantType];
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <Button variant="outline" onClick={onBack} className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
        <div className="flex items-center gap-2">
          <Building2 className="h-6 w-6 text-blue-600" />
          <span className="text-xl font-bold text-gray-900">EquiSense Setup</span>
        </div>
      </div>

      {/* Progress */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="w-8 h-8 bg-gray-200 text-gray-400 rounded-full flex items-center justify-center text-sm font-semibold">
            ✓
          </div>
          <div className="w-16 h-1 bg-gray-200"></div>
          <div className="w-8 h-8 bg-gray-200 text-gray-400 rounded-full flex items-center justify-center text-sm font-semibold">
            ✓
          </div>
          <div className="w-16 h-1 bg-blue-600"></div>
          <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
            3
          </div>
          <div className="w-16 h-1 bg-gray-200"></div>
          <div className="w-8 h-8 bg-gray-200 text-gray-400 rounded-full flex items-center justify-center text-sm font-semibold">
            4
          </div>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Select Your Features</h1>
        <p className="text-gray-600">Choose the modules that best fit your {getTenantTypeTitle().toLowerCase()} needs</p>
      </div>

      <div className="max-w-4xl mx-auto space-y-8">
        {/* Essential Features */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-500" />
              <CardTitle>Essential Features</CardTitle>
              <Badge className="bg-blue-100 text-blue-800">Included</Badge>
            </div>
            <p className="text-sm text-gray-600">These features are automatically included for your business type</p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {essentialFeatures.map(([key, feature]) => (
                <div key={key} className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{feature.name}</h3>
                    <p className="text-sm text-gray-600">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Optional Features */}
        {optionalFeatures.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Additional Features</CardTitle>
              <p className="text-sm text-gray-600">Choose additional modules to enhance your platform (you can always add these later)</p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {optionalFeatures.map(([key, feature]) => (
                  <div key={key} className="flex items-start gap-3 p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                    <Checkbox
                      checked={selectedFeatures[key] || false}
                      onCheckedChange={(checked) => handleFeatureToggle(key, checked as boolean)}
                      className="mt-0.5"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{feature.name}</h3>
                      <p className="text-sm text-gray-600">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        <div className="flex justify-end">
          <Button onClick={handleContinue} className="bg-blue-600 hover:bg-blue-700 px-8">
            Continue
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FeatureSelection;
