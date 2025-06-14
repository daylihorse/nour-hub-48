
import ChartLineChart from "@/components/ui/charts/LineChart";

const HealthOutcomesChart = () => {
  const healthMetrics = [
    { month: "Jan", recoveryRate: 94.5, satisfaction: 96.2, complications: 2.1 },
    { month: "Feb", recoveryRate: 95.8, satisfaction: 96.8, complications: 1.8 },
    { month: "Mar", recoveryRate: 94.2, satisfaction: 95.9, complications: 2.3 },
    { month: "Apr", recoveryRate: 96.1, satisfaction: 97.1, complications: 1.5 },
    { month: "May", recoveryRate: 95.7, satisfaction: 96.5, complications: 1.9 },
    { month: "Jun", recoveryRate: 96.8, satisfaction: 97.3, complications: 1.2 },
  ];

  const chartConfig = {
    recoveryRate: { label: "Recovery Rate %", color: "#82ca9d" },
    satisfaction: { label: "Satisfaction %", color: "#8884d8" },
    complications: { label: "Complications %", color: "#ff7300" },
  };

  const healthLines = [
    { dataKey: "recoveryRate", stroke: "#82ca9d", name: "Recovery Rate %" },
    { dataKey: "satisfaction", stroke: "#8884d8", name: "Satisfaction %" },
    { dataKey: "complications", stroke: "#ff7300", name: "Complications %" },
  ];

  return (
    <ChartLineChart
      title="Health Outcome Metrics"
      data={healthMetrics}
      lines={healthLines}
      xAxisKey="month"
      config={chartConfig}
    />
  );
};

export default HealthOutcomesChart;
