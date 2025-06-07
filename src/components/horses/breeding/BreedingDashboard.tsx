
import EnhancedFeaturesHighlight from "./dashboard/EnhancedFeaturesHighlight";
import BreedingKeyMetrics from "./dashboard/BreedingKeyMetrics";
import BreedingRecentActivity from "./dashboard/BreedingRecentActivity";
import BreedingUpcomingEvents from "./dashboard/BreedingUpcomingEvents";
import BreedingPregnancyProgress from "./dashboard/BreedingPregnancyProgress";
import { 
  mockBreedingStats, 
  mockRecentActivity, 
  mockUpcomingEvents, 
  mockPregnancies 
} from "./config/dashboardConfig";

const BreedingDashboard = () => {
  return (
    <div className="space-y-6">
      {/* Enhanced Features Highlight */}
      <EnhancedFeaturesHighlight />

      {/* Key Metrics */}
      <BreedingKeyMetrics stats={mockBreedingStats} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <BreedingRecentActivity activities={mockRecentActivity} />

        {/* Upcoming Events */}
        <BreedingUpcomingEvents events={mockUpcomingEvents} />

        {/* Pregnancy Progress */}
        <BreedingPregnancyProgress pregnancies={mockPregnancies} />
      </div>
    </div>
  );
};

export default BreedingDashboard;
