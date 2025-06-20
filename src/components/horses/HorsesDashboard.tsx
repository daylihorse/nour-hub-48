
import BreedingQuickAccess from "./breeding/BreedingQuickAccess";
import BreedingFeaturesShowcase from "./breeding/BreedingFeaturesShowcase";
import HorsesMetricsCards from "./dashboard/HorsesMetricsCards";
import HorsesChartsSection from "./dashboard/HorsesChartsSection";
import HorsesRecentActivities from "./dashboard/HorsesRecentActivities";

interface HorsesDashboardProps {
  onNavigateToBreeding?: (tab: string) => void;
}

const HorsesDashboard = ({ onNavigateToBreeding }: HorsesDashboardProps) => {
  const handleNavigateToBreeding = (tab: string) => {
    if (onNavigateToBreeding) {
      onNavigateToBreeding(tab);
    }
  };

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <HorsesMetricsCards />

      {/* New Breeding Features Showcase */}
      <BreedingFeaturesShowcase onNavigateToBreeding={handleNavigateToBreeding} />

      {/* Breeding Quick Access */}
      <BreedingQuickAccess onNavigateToBreeding={handleNavigateToBreeding} />

      {/* Charts Grid */}
      <HorsesChartsSection />

      {/* Recent Activities & Alerts */}
      <HorsesRecentActivities />
    </div>
  );
};

export default HorsesDashboard;
