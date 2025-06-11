
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Building2, 
  CheckCircle, 
  ArrowRight, 
  Users, 
  Settings,
  Zap,
  Star
} from 'lucide-react';
import { OnboardingData } from './OnboardingWizard';

interface OnboardingCompleteProps {
  data: OnboardingData;
  onComplete: () => void;
  onBack: () => void;
}

const OnboardingComplete = ({ data, onComplete, onBack }: OnboardingCompleteProps) => {
  const getTenantTypeTitle = () => {
    const titles = {
      stable: 'Equestrian Stable',
      clinic: 'Veterinary Clinic',
      laboratory: 'Diagnostic Laboratory',
      hospital: 'Veterinary Hospital',
      marketplace: 'Equine Marketplace',
      enterprise: 'Enterprise Solution'
    };
    return titles[data.tenantType];
  };

  const getEnabledFeatures = () => {
    return Object.entries(data.features || {})
      .filter(([_, enabled]) => enabled)
      .map(([feature]) => feature);
  };

  const getFeatureName = (feature: string) => {
    const names: Record<string, string> = {
      horses: 'Horse Management',
      clinic: 'Clinic Management',
      laboratory: 'Laboratory',
      pharmacy: 'Pharmacy',
      marketplace: 'Marketplace',
      finance: 'Financial Management',
      hr: 'Human Resources',
      inventory: 'Inventory Management',
      training: 'Training Center',
      rooms: 'Facility Management',
      maintenance: 'Maintenance',
      messages: 'Internal Messaging'
    };
    return names[feature] || feature;
  };

  const enabledFeatures = getEnabledFeatures();
  const totalTeamMembers = 1 + (data.team?.additionalMembers?.length || 0);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-center mb-8">
        <div className="flex items-center gap-2">
          <Building2 className="h-6 w-6 text-blue-600" />
          <span className="text-xl font-bold text-gray-900">EquiSense Setup</span>
        </div>
      </div>

      {/* Progress - All Complete */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-semibold">
            ✓
          </div>
          <div className="w-16 h-1 bg-green-500"></div>
          <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-semibold">
            ✓
          </div>
          <div className="w-16 h-1 bg-green-500"></div>
          <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-semibold">
            ✓
          </div>
          <div className="w-16 h-1 bg-green-500"></div>
          <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-semibold">
            ✓
          </div>
        </div>
        <div className="mb-6">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Setup Complete!</h1>
          <p className="text-xl text-gray-600">Your {getTenantTypeTitle().toLowerCase()} is ready to go</p>
        </div>
      </div>

      {/* Summary */}
      <div className="max-w-4xl mx-auto space-y-6 mb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Business Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Building2 className="h-5 w-5 text-blue-600" />
                Business
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="font-semibold">{data.tenantDetails?.name}</p>
                <p className="text-sm text-gray-600">
                  {data.tenantDetails?.address?.city}, {data.tenantDetails?.address?.state}
                </p>
                <Badge className="bg-blue-100 text-blue-800">
                  {getTenantTypeTitle()}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Features */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Settings className="h-5 w-5 text-purple-600" />
                Features
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="font-semibold">{enabledFeatures.length} modules enabled</p>
                <div className="space-y-1">
                  {enabledFeatures.slice(0, 3).map((feature) => (
                    <p key={feature} className="text-sm text-gray-600">
                      • {getFeatureName(feature)}
                    </p>
                  ))}
                  {enabledFeatures.length > 3 && (
                    <p className="text-xs text-gray-500">
                      +{enabledFeatures.length - 3} more modules
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Team */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Users className="h-5 w-5 text-green-600" />
                Team
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="font-semibold">{totalTeamMembers} team member{totalTeamMembers > 1 ? 's' : ''}</p>
                <p className="text-sm text-gray-600">
                  {data.team?.ownerInfo?.firstName} {data.team?.ownerInfo?.lastName}
                </p>
                <Badge className="bg-green-100 text-green-800">Owner</Badge>
                {(data.team?.additionalMembers?.length || 0) > 0 && (
                  <p className="text-xs text-gray-500">
                    +{data.team?.additionalMembers?.length} additional members
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Next Steps */}
        <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-blue-600" />
              What's Next?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold mt-0.5">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Explore Your Dashboard</h4>
                    <p className="text-sm text-gray-600">Familiarize yourself with the main features and navigation</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold mt-0.5">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Add Your Data</h4>
                    <p className="text-sm text-gray-600">Start by adding horses, clients, or inventory items</p>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold mt-0.5">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Invite Your Team</h4>
                    <p className="text-sm text-gray-600">Send invitations to team members who need access</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold mt-0.5">
                    4
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Customize Settings</h4>
                    <p className="text-sm text-gray-600">Configure notifications, branding, and preferences</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Success Message */}
        <div className="text-center bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl p-8 text-white">
          <Star className="h-12 w-12 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Welcome to EquiSense!</h2>
          <p className="text-lg opacity-90 mb-6">
            Your {getTenantTypeTitle().toLowerCase()} platform is now ready. 
            We're excited to help you streamline your operations and grow your business.
          </p>
          <Button 
            onClick={onComplete}
            size="lg" 
            variant="secondary" 
            className="bg-white text-blue-600 hover:bg-gray-100"
          >
            Enter Your Dashboard
            <ArrowRight className="h-5 w-5 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OnboardingComplete;
