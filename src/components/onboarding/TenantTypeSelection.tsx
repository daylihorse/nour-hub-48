
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Building2, 
  Hospital, 
  FlaskRound, 
  Store, 
  Users, 
  ArrowRight,
  CheckCircle,
  Star,
  ArrowLeft
} from 'lucide-react';
import { TenantType } from '@/types/tenant';

const TenantTypeSelection = () => {
  const [selectedType, setSelectedType] = useState<TenantType | null>(null);
  const navigate = useNavigate();

  const tenantTypes = [
    {
      type: 'stable' as TenantType,
      title: 'Equestrian Stable',
      description: 'Comprehensive horse management, breeding records, and training programs',
      icon: Building2,
      features: ['Horse Management', 'Breeding Records', 'Training Programs', 'Facility Management'],
      setupTime: '15 minutes',
      popular: true,
      color: 'bg-brown-gradient'
    },
    {
      type: 'clinic' as TenantType,
      title: 'Veterinary Clinic',
      description: 'Complete veterinary practice management with appointments and medical records',
      icon: Hospital,
      features: ['Appointment Scheduling', 'Medical Records', 'Prescription Management', 'Client Portal'],
      setupTime: '20 minutes',
      popular: false,
      color: 'bg-brown-gradient'
    },
    {
      type: 'laboratory' as TenantType,
      title: 'Diagnostic Laboratory',
      description: 'Advanced laboratory management with testing workflows and quality control',
      icon: FlaskRound,
      features: ['Sample Management', 'Test Results', 'Quality Control', 'Equipment Tracking'],
      setupTime: '25 minutes',
      popular: false,
      color: 'bg-brown-gradient'
    },
    {
      type: 'hospital' as TenantType,
      title: 'Veterinary Hospital',
      description: 'Full-service hospital management with surgical suites and emergency care',
      icon: Hospital,
      features: ['Emergency Management', 'Surgical Scheduling', 'ICU Monitoring', 'Staff Coordination'],
      setupTime: '30 minutes',
      popular: false,
      color: 'bg-brown-gradient'
    },
    {
      type: 'marketplace' as TenantType,
      title: 'Equine Marketplace',
      description: 'Online marketplace for buying and selling horses, equipment, and services',
      icon: Store,
      features: ['Product Listings', 'Payment Processing', 'Buyer/Seller Matching', 'Transaction Management'],
      setupTime: '10 minutes',
      popular: false,
      color: 'bg-brown-gradient'
    },
    {
      type: 'enterprise' as TenantType,
      title: 'Enterprise Solution',
      description: 'Multi-facility management with advanced analytics and custom integrations',
      icon: Users,
      features: ['Multi-Location', 'Advanced Analytics', 'Custom Integrations', 'White Label'],
      setupTime: '45 minutes',
      popular: false,
      color: 'bg-brown-gradient'
    }
  ];

  const handleContinue = () => {
    if (selectedType) {
      navigate(`/onboarding/${selectedType}`);
    }
  };

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-brown-gradient-light">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button variant="outline" onClick={handleBack} className="flex items-center gap-2 border-brown-primary text-brown-primary hover:bg-brown-50">
            <ArrowLeft className="h-4 w-4" />
            Back to Marketplace
          </Button>
          <div className="flex items-center gap-2">
            <Building2 className="h-6 w-6 text-brown-primary" />
            <span className="text-xl font-bold text-brown-primary">Dayli Horse Setup</span>
          </div>
        </div>

        {/* Progress */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-8 h-8 bg-brown-600 text-white rounded-full flex items-center justify-center text-sm font-semibold shadow-brown">
              1
            </div>
            <div className="w-16 h-1 bg-brown-200"></div>
            <div className="w-8 h-8 bg-brown-200 text-brown-400 rounded-full flex items-center justify-center text-sm font-semibold">
              2
            </div>
            <div className="w-16 h-1 bg-brown-200"></div>
            <div className="w-8 h-8 bg-brown-200 text-brown-400 rounded-full flex items-center justify-center text-sm font-semibold">
              3
            </div>
          </div>
          <h1 className="text-3xl font-bold text-brown-900 mb-2">Choose Your Business Type</h1>
          <p className="text-brown-600">Select the option that best describes your equine business</p>
        </div>

        {/* Tenant Type Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {tenantTypes.map((tenant) => (
            <Card 
              key={tenant.type}
              className={`relative cursor-pointer transition-all duration-300 hover:shadow-brown-lg hover:scale-105 ${
                selectedType === tenant.type ? 'ring-2 ring-brown-500 shadow-brown-lg' : 'shadow-brown'
              } ${tenant.popular ? 'border-2 border-brown-500' : ''}`}
              onClick={() => setSelectedType(tenant.type)}
            >
              {tenant.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-brown-500 text-white px-4 py-1 shadow-brown">
                    <Star className="h-3 w-3 mr-1" />
                    Most Popular
                  </Badge>
                </div>
              )}
              <CardHeader>
                <div className={`w-12 h-12 rounded-lg ${tenant.color} flex items-center justify-center mb-4 shadow-brown`}>
                  <tenant.icon className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-lg text-brown-900">{tenant.title}</CardTitle>
                <p className="text-sm text-brown-600">{tenant.description}</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 mb-4">
                  {tenant.features.slice(0, 3).map((feature) => (
                    <div key={feature} className="flex items-center gap-2">
                      <CheckCircle className="h-3 w-3 text-brown-500" />
                      <span className="text-xs text-brown-700">{feature}</span>
                    </div>
                  ))}
                  {tenant.features.length > 3 && (
                    <p className="text-xs text-brown-500">+{tenant.features.length - 3} more features</p>
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-brown-500">Setup time: {tenant.setupTime}</span>
                  {selectedType === tenant.type && (
                    <CheckCircle className="h-5 w-5 text-brown-600" />
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Continue Button */}
        <div className="text-center">
          <Button 
            size="lg" 
            onClick={handleContinue}
            disabled={!selectedType}
            className="bg-brown-600 hover:bg-brown-700 px-8 shadow-brown-lg transition-all duration-200 hover:shadow-brown"
          >
            Continue Setup
            <ArrowRight className="h-5 w-5 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TenantTypeSelection;
