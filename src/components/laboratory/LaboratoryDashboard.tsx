
import StatisticsOverview from "./dashboard/StatisticsOverview";
import EnhancedQuickActions from "./dashboard/EnhancedQuickActions";
import RecentActivity from "./dashboard/RecentActivity";
import PerformanceMetrics from "./dashboard/PerformanceMetrics";

const LaboratoryDashboard = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <EnhancedQuickActions />
        </div>
        <div className="lg:col-span-3">
          <StatisticsOverview />
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentActivity />
        <PerformanceMetrics />
      </div>
    </div>
  );
};

export default LaboratoryDashboard;
