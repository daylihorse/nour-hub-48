
import ChartPieChart from "@/components/ui/charts/PieChart";

const HorsesBreedChart = () => {
  const breedDistribution = [
    { breed: "Arabian", count: 25, color: "#8884d8" },
    { breed: "Thoroughbred", count: 18, color: "#82ca9d" },
    { breed: "Quarter Horse", count: 12, color: "#ffc658" },
    { breed: "Warmblood", count: 8, color: "#ff7300" },
  ];

  return (
    <ChartPieChart
      title="Breed Distribution"
      data={breedDistribution}
      dataKey="count"
      labelKey="breed"
    />
  );
};

export default HorsesBreedChart;
