
import QualityMetricsOverview from "./quality-control/QualityMetricsOverview";
import QualityTrendsChart from "./quality-control/QualityTrendsChart";
import QualityControlChecks from "./quality-control/QualityControlChecks";
import ComplianceAudits from "./quality-control/ComplianceAudits";
import QualityActionItems from "./quality-control/QualityActionItems";

const QualityControl = () => {
  return (
    <div className="space-y-6">
      <QualityMetricsOverview />

      <QualityTrendsChart />

      <QualityControlChecks />

      <ComplianceAudits />

      <QualityActionItems />
    </div>
  );
};

export default QualityControl;
