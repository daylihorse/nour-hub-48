
import ClinicMetrics from "./overview/ClinicMetrics";
import ClinicCharts from "./overview/ClinicCharts";
import ClinicActivities from "./overview/ClinicActivities";

const ClinicOverview = () => {
  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <ClinicMetrics />

      {/* Charts Grid */}
      <ClinicCharts />

      {/* Recent Activities & Alerts */}
      <ClinicActivities />
    </div>
  );
};

export default ClinicOverview;
