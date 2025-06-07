
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis } from "recharts";

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

  return (
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
  );
};

export default HorsesHealthChart;
