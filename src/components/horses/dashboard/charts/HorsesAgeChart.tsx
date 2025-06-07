
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis } from "recharts";

const HorsesAgeChart = () => {
  const horsesByAge = [
    { ageRange: "1-3 years", count: 12, color: "#8884d8" },
    { ageRange: "4-8 years", count: 25, color: "#82ca9d" },
    { ageRange: "9-15 years", count: 18, color: "#ffc658" },
    { ageRange: "16+ years", count: 8, color: "#ff7300" },
  ];

  return (
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
  );
};

export default HorsesAgeChart;
