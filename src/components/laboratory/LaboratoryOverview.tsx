
import StatisticsOverview from "./dashboard/StatisticsOverview";
import EnhancedQuickActions from "./dashboard/EnhancedQuickActions";
import RecentActivity from "./dashboard/RecentActivity";
import PerformanceMetrics from "./dashboard/PerformanceMetrics";

const LaboratoryOverview = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6">
        <StatisticsOverview />
        <EnhancedQuickActions />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentActivity />
        <PerformanceMetrics />
      </div>
    </div>
  );
};

export default LaboratoryOverview;
