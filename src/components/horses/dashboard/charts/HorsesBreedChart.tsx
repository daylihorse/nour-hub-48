
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { PieChart, Pie, Cell } from "recharts";

const HorsesBreedChart = () => {
  const breedDistribution = [
    { breed: "Arabian", count: 25, color: "#8884d8" },
    { breed: "Thoroughbred", count: 18, color: "#82ca9d" },
    { breed: "Quarter Horse", count: 12, color: "#ffc658" },
    { breed: "Warmblood", count: 8, color: "#ff7300" },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Breed Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={{}} className="h-[300px]">
          <PieChart>
            <Pie
              data={breedDistribution}
              cx="50%"
              cy="50%"
              outerRadius={80}
              dataKey="count"
              label={({ breed, count }) => `${breed}: ${count}`}
            >
              {breedDistribution.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <ChartTooltip content={<ChartTooltipContent />} />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default HorsesBreedChart;
