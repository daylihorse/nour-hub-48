
import StatisticsOverview from "./dashboard/StatisticsOverview";
import RecentActivity from "./dashboard/RecentActivity";
import QuickActions from "./dashboard/QuickActions";
import PerformanceMetrics from "./dashboard/PerformanceMetrics";

const LaboratoryDashboard = () => {
  return (
    <div className="space-y-6">
      {/* Statistics Overview */}
      <StatisticsOverview />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity - Takes 2 columns on large screens */}
        <div className="lg:col-span-2">
          <RecentActivity />
        </div>

        {/* Quick Actions - Takes 1 column */}
        <div>
          <QuickActions />
        </div>
      </div>

      {/* Performance Metrics */}
      <PerformanceMetrics />
    </div>
  );
};

export default LaboratoryDashboard;
