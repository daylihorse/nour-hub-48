
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, PieChart, Pie, Cell, LineChart, Line } from "recharts";

const HorsesChartsSection = () => {
  const horsesByAge = [
    { ageRange: "1-3 years", count: 12, color: "#8884d8" },
    { ageRange: "4-8 years", count: 25, color: "#82ca9d" },
    { ageRange: "9-15 years", count: 18, color: "#ffc658" },
    { ageRange: "16+ years", count: 8, color: "#ff7300" },
  ];

  const healthMetrics = [
    { month: "Jan", healthy: 58, treatment: 5, checkup: 2 },
    { month: "Feb", healthy: 60, treatment: 3, checkup: 4 },
    { month: "Mar", healthy: 62, treatment: 1, checkup: 3 },
    { month: "Apr", healthy: 61, treatment: 4, checkup: 1 },
    { month: "May", healthy: 63, treatment: 2, checkup: 2 },
    { month: "Jun", healthy: 63, treatment: 0, checkup: 3 },
  ];

  const breedDistribution = [
    { breed: "Arabian", count: 25, color: "#8884d8" },
    { breed: "Thoroughbred", count: 18, color: "#82ca9d" },
    { breed: "Quarter Horse", count: 12, color: "#ffc658" },
    { breed: "Warmblood", count: 8, color: "#ff7300" },
  ];

  const chartConfig = {
    healthy: { color: "#82ca9d" },
    treatment: { color: "#ff7300" },
    checkup: { color: "#8884d8" },
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Health Status Over Time */}
      <Card>
        <CardHeader>
          <CardTitle>Health Status Tracking</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[300px]">
            <LineChart data={healthMetrics}>
              <XAxis dataKey="month" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line dataKey="healthy" stroke="var(--color-healthy)" name="Healthy" strokeWidth={2} />
              <Line dataKey="treatment" stroke="var(--color-treatment)" name="In Treatment" strokeWidth={2} />
              <Line dataKey="checkup" stroke="var(--color-checkup)" name="Scheduled Checkup" strokeWidth={2} />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Age Distribution */}
      <Card>
        <CardHeader>
          <CardTitle>Age Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={{}} className="h-[300px]">
            <BarChart data={horsesByAge}>
              <XAxis dataKey="ageRange" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="count" fill="#8884d8" />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Breed Distribution */}
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
    </div>
  );
};

export default HorsesChartsSection;
