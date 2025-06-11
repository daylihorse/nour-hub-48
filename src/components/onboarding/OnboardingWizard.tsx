
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TenantType } from '@/types/tenant';
import TenantDetailsForm from './forms/TenantDetailsForm';
import FeatureSelection from './forms/FeatureSelection';
import TeamSetup from './forms/TeamSetup';
import OnboardingComplete from './OnboardingComplete';

interface OnboardingWizardProps {
  tenantType: TenantType;
}

export interface OnboardingData {
  tenantType: TenantType;
  tenantDetails: {
    name: string;
    address: {
      street: string;
      city: string;
      state: string;
      zipCode: string;
      country: string;
    };
    contact: {
      phone: string;
      email: string;
      website?: string;
    };
    businessInfo: {
      registrationNumber?: string;
      taxId?: string;
    };
  };
  features: Record<string, boolean>;
  team: {
    ownerInfo: {
      firstName: string;
      lastName: string;
      email: string;
      role: string;
    };
    additionalMembers: Array<{
      email: string;
      role: string;
      firstName: string;
      lastName: string;
    }>;
  };
}

const OnboardingWizard = ({ tenantType }: OnboardingWizardProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [onboardingData, setOnboardingData] = useState<Partial<OnboardingData>>({
    tenantType,
    tenantDetails: {
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
    },
    features: {},
    team: {
      ownerInfo: {
        firstName: '',
        lastName: '',
        email: '',
        role: 'owner'
      },
      additionalMembers: []
    }
  });
  const navigate = useNavigate();

  const updateOnboardingData = (data: Partial<OnboardingData>) => {
    setOnboardingData(prev => ({ ...prev, ...data }));
  };

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    } else {
      navigate('/onboarding');
    }
  };

  const handleComplete = async () => {
    // Here you would typically send the data to your backend
    console.log('Onboarding completed with data:', onboardingData);
    
    // For now, navigate to dashboard
    navigate('/dashboard');
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <TenantDetailsForm
            tenantType={tenantType}
            data={onboardingData.tenantDetails}
            onUpdate={(details) => updateOnboardingData({ tenantDetails: details })}
            onNext={nextStep}
            onBack={prevStep}
          />
        );
      case 2:
        return (
          <FeatureSelection
            tenantType={tenantType}
            data={onboardingData.features}
            onUpdate={(features) => updateOnboardingData({ features })}
            onNext={nextStep}
            onBack={prevStep}
          />
        );
      case 3:
        return (
          <TeamSetup
            data={onboardingData.team}
            onUpdate={(team) => updateOnboardingData({ team })}
            onNext={nextStep}
            onBack={prevStep}
          />
        );
      case 4:
        return (
          <OnboardingComplete
            data={onboardingData as OnboardingData}
            onComplete={handleComplete}
            onBack={prevStep}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {renderStep()}
    </div>
  );
};

export default OnboardingWizard;
