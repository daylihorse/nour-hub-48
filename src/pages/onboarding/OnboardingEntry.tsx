
import { useParams, Navigate } from 'react-router-dom';
import { TenantType } from '@/types/tenant';
import TenantTypeSelection from '@/components/onboarding/TenantTypeSelection';
import OnboardingWizard from '@/components/onboarding/OnboardingWizard';

const OnboardingEntry = () => {
  const { tenantType } = useParams<{ tenantType?: TenantType }>();

  // If no tenant type specified, show selection
  if (!tenantType) {
    return <TenantTypeSelection />;
  }

  // Validate tenant type
  const validTypes: TenantType[] = ['stable', 'clinic', 'laboratory', 'hospital', 'marketplace', 'enterprise'];
  if (!validTypes.includes(tenantType as TenantType)) {
    return <Navigate to="/onboarding" replace />;
  }

  // Show onboarding wizard for selected type
  return <OnboardingWizard tenantType={tenantType as TenantType} />;
};

export default OnboardingEntry;
