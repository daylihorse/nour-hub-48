
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, ArrowRight, Building2 } from 'lucide-react';
import { TenantType } from '@/types/tenant';
import { OnboardingData } from '../OnboardingWizard';

interface TenantDetailsFormProps {
  tenantType: TenantType;
  data?: OnboardingData['tenantDetails'];
  onUpdate: (data: OnboardingData['tenantDetails']) => void;
  onNext: () => void;
  onBack: () => void;
}

const TenantDetailsForm = ({ tenantType, data, onUpdate, onNext, onBack }: TenantDetailsFormProps) => {
  const [formData, setFormData] = useState(data || {
    name: '',
    address: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'USA'
    },
    contact: {
      phone: '',
      email: '',
      website: ''
    },
    businessInfo: {
      registrationNumber: '',
      taxId: ''
    }
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Business name is required';
    }
    if (!formData.contact.email.trim()) {
      newErrors.email = 'Email is required';
    }
    if (!formData.contact.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }
    if (!formData.address.street.trim()) {
      newErrors.street = 'Street address is required';
    }
    if (!formData.address.city.trim()) {
      newErrors.city = 'City is required';
    }
    if (!formData.address.state.trim()) {
      newErrors.state = 'State is required';
    }
    if (!formData.address.zipCode.trim()) {
      newErrors.zipCode = 'ZIP code is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onUpdate(formData);
      onNext();
    }
  };

  const updateField = (field: string, value: string) => {
    setFormData(prev => {
      const keys = field.split('.');
      const newData = { ...prev };
      let current: any = newData;
      
      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]];
      }
      current[keys[keys.length - 1]] = value;
      
      return newData;
    });

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
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
          <div className="w-16 h-1 bg-blue-600"></div>
          <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
            2
          </div>
          <div className="w-16 h-1 bg-gray-200"></div>
          <div className="w-8 h-8 bg-gray-200 text-gray-400 rounded-full flex items-center justify-center text-sm font-semibold">
            3
          </div>
          <div className="w-16 h-1 bg-gray-200"></div>
          <div className="w-8 h-8 bg-gray-200 text-gray-400 rounded-full flex items-center justify-center text-sm font-semibold">
            4
          </div>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Tell Us About Your {getTenantTypeTitle()}</h1>
        <p className="text-gray-600">We'll use this information to set up your account and customize your experience</p>
      </div>

      {/* Form */}
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Business Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Business Name */}
            <div>
              <Label htmlFor="name">Business Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => updateField('name', e.target.value)}
                placeholder="Enter your business name"
                className={errors.name ? 'border-red-500' : ''}
              />
              {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name}</p>}
            </div>

            {/* Contact Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.contact.email}
                  onChange={(e) => updateField('contact.email', e.target.value)}
                  placeholder="business@example.com"
                  className={errors.email ? 'border-red-500' : ''}
                />
                {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
              </div>
              <div>
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  value={formData.contact.phone}
                  onChange={(e) => updateField('contact.phone', e.target.value)}
                  placeholder="+1 (555) 123-4567"
                  className={errors.phone ? 'border-red-500' : ''}
                />
                {errors.phone && <p className="text-sm text-red-500 mt-1">{errors.phone}</p>}
              </div>
            </div>

            <div>
              <Label htmlFor="website">Website (Optional)</Label>
              <Input
                id="website"
                value={formData.contact.website}
                onChange={(e) => updateField('contact.website', e.target.value)}
                placeholder="https://yourwebsite.com"
              />
            </div>

            {/* Address */}
            <div>
              <Label htmlFor="street">Street Address *</Label>
              <Input
                id="street"
                value={formData.address.street}
                onChange={(e) => updateField('address.street', e.target.value)}
                placeholder="123 Main Street"
                className={errors.street ? 'border-red-500' : ''}
              />
              {errors.street && <p className="text-sm text-red-500 mt-1">{errors.street}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="city">City *</Label>
                <Input
                  id="city"
                  value={formData.address.city}
                  onChange={(e) => updateField('address.city', e.target.value)}
                  placeholder="City"
                  className={errors.city ? 'border-red-500' : ''}
                />
                {errors.city && <p className="text-sm text-red-500 mt-1">{errors.city}</p>}
              </div>
              <div>
                <Label htmlFor="state">State *</Label>
                <Input
                  id="state"
                  value={formData.address.state}
                  onChange={(e) => updateField('address.state', e.target.value)}
                  placeholder="State"
                  className={errors.state ? 'border-red-500' : ''}
                />
                {errors.state && <p className="text-sm text-red-500 mt-1">{errors.state}</p>}
              </div>
              <div>
                <Label htmlFor="zipCode">ZIP Code *</Label>
                <Input
                  id="zipCode"
                  value={formData.address.zipCode}
                  onChange={(e) => updateField('address.zipCode', e.target.value)}
                  placeholder="12345"
                  className={errors.zipCode ? 'border-red-500' : ''}
                />
                {errors.zipCode && <p className="text-sm text-red-500 mt-1">{errors.zipCode}</p>}
              </div>
            </div>

            {/* Business Registration (Optional) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="registrationNumber">Business Registration Number (Optional)</Label>
                <Input
                  id="registrationNumber"
                  value={formData.businessInfo.registrationNumber}
                  onChange={(e) => updateField('businessInfo.registrationNumber', e.target.value)}
                  placeholder="REG-123456"
                />
              </div>
              <div>
                <Label htmlFor="taxId">Tax ID (Optional)</Label>
                <Input
                  id="taxId"
                  value={formData.businessInfo.taxId}
                  onChange={(e) => updateField('businessInfo.taxId', e.target.value)}
                  placeholder="12-3456789"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end mt-8">
          <Button onClick={handleSubmit} className="bg-blue-600 hover:bg-blue-700 px-8">
            Continue
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TenantDetailsForm;
