
import ChartPieChart from "@/components/ui/charts/PieChart";

const TreatmentDistributionChart = () => {
  const treatmentTypes = [
    { type: "Routine Checkups", count: 342, percentage: 45, color: "#8884d8" },
    { type: "Emergency Care", count: 98, percentage: 13, color: "#ff7300" },
    { type: "Surgical Procedures", count: 65, percentage: 9, color: "#82ca9d" },
    { type: "Wellness Exams", count: 252, percentage: 33, color: "#ffc658" },
  ];

  const chartConfig = {
    routine: { label: "Routine", color: "#8884d8" },
    emergency: { label: "Emergency", color: "#ff7300" },
    surgery: { label: "Surgery", color: "#82ca9d" },
    wellness: { label: "Wellness", color: "#ffc658" },
  };

  return (
    <ChartPieChart
      title="Treatment Type Distribution"
      data={treatmentTypes}
      dataKey="count"
      labelKey="type"
      config={chartConfig}
    />
  );
};

export default TreatmentDistributionChart;
