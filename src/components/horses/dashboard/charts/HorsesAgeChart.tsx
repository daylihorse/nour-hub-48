
import ChartBarChart from "@/components/ui/charts/BarChart";

const HorsesAgeChart = () => {
  const horsesByAge = [
    { ageRange: "1-3 years", count: 12, color: "#8884d8" },
    { ageRange: "4-8 years", count: 25, color: "#82ca9d" },
    { ageRange: "9-15 years", count: 18, color: "#ffc658" },
    { ageRange: "16+ years", count: 8, color: "#ff7300" },
  ];

  return (
    <ChartBarChart
      title="Age Distribution"
      data={horsesByAge}
      dataKey="count"
      xAxisKey="ageRange"
      fill="#8884d8"
    />
  );
};

export default HorsesAgeChart;
