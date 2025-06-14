
import AppointmentTrendsChart from "./charts/AppointmentTrendsChart";
import TreatmentDistributionChart from "./charts/TreatmentDistributionChart";
import DailyScheduleChart from "./charts/DailyScheduleChart";
import HealthOutcomesChart from "./charts/HealthOutcomesChart";

const ClinicCharts = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Appointment Trends */}
      <AppointmentTrendsChart />

      {/* Treatment Distribution */}
      <TreatmentDistributionChart />

      {/* Daily Schedule Capacity */}
      <DailyScheduleChart />

      {/* Health Outcomes */}
      <HealthOutcomesChart />
    </div>
  );
};

export default ClinicCharts;
