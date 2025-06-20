
import BreedingQuickAccess from "./breeding/BreedingQuickAccess";
import BreedingFeaturesShowcase from "./breeding/BreedingFeaturesShowcase";
import HorsesMetricsCards from "./dashboard/HorsesMetricsCards";
import HorsesChartsSection from "./dashboard/HorsesChartsSection";
import HorsesRecentActivities from "./dashboard/HorsesRecentActivities";
import { useIntegratedModuleAccess } from "@/hooks/useIntegratedModuleAccess";

interface HorsesDashboardProps {
  onNavigateToBreeding?: (tab: string) => void;
}

const HorsesDashboard = ({ onNavigateToBreeding }: HorsesDashboardProps) => {
  const { isSubmoduleAccessible } = useIntegratedModuleAccess();

  const handleNavigateToBreeding = (tab: string) => {
    if (onNavigateToBreeding) {
      onNavigateToBreeding(tab);
    }
  };

  // Check if breeding features are accessible
  const hasBreedingAccess = isSubmoduleAccessible("horses", "breeding-contracts") || 
                           isSubmoduleAccessible("horses", "breeding-records");

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <HorsesMetricsCards />

      {/* Breeding Features - only show if accessible */}
      {hasBreedingAccess && (
        <>
          <BreedingFeaturesShowcase onNavigateToBreeding={handleNavigateToBreeding} />
          <BreedingQuickAccess onNavigateToBreeding={handleNavigateToBreeding} />
        </>
      )}

      {/* Charts Grid */}
      <HorsesChartsSection />

      {/* Recent Activities & Alerts */}
      <HorsesRecentActivities />
    </div>
  );
};

export default HorsesDashboard;
