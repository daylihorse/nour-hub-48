
import ChartLineChart from "@/components/ui/charts/LineChart";

const HorsesHealthChart = () => {
  const healthMetrics = [
    { month: "Jan", healthy: 58, treatment: 5, checkup: 2 },
    { month: "Feb", healthy: 60, treatment: 3, checkup: 4 },
    { month: "Mar", healthy: 62, treatment: 1, checkup: 3 },
    { month: "Apr", healthy: 61, treatment: 4, checkup: 1 },
    { month: "May", healthy: 63, treatment: 2, checkup: 2 },
    { month: "Jun", healthy: 63, treatment: 0, checkup: 3 },
  ];

  const chartConfig = {
    healthy: { color: "#82ca9d" },
    treatment: { color: "#ff7300" },
    checkup: { color: "#8884d8" },
  };

  const lines = [
    { dataKey: "healthy", stroke: "var(--color-healthy)", name: "Healthy" },
    { dataKey: "treatment", stroke: "var(--color-treatment)", name: "In Treatment" },
    { dataKey: "checkup", stroke: "var(--color-checkup)", name: "Scheduled Checkup" },
  ];

  return (
    <ChartLineChart
      title="Health Status Tracking"
      data={healthMetrics}
      lines={lines}
      xAxisKey="month"
      config={chartConfig}
    />
  );
};

export default HorsesHealthChart;
