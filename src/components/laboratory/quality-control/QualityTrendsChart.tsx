
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, BarChart, Bar } from "recharts";

const QualityTrendsChart = () => {
  const qualityTrends = [
    { month: "Jan", accuracy: 98.5, precision: 97.2, turnaround: 22.5, contamination: 1.2 },
    { month: "Feb", accuracy: 98.8, precision: 97.8, turnaround: 21.8, contamination: 0.9 },
    { month: "Mar", accuracy: 99.1, precision: 98.1, turnaround: 20.5, contamination: 0.8 },
    { month: "Apr", accuracy: 98.7, precision: 97.9, turnaround: 21.2, contamination: 1.1 },
    { month: "May", accuracy: 99.2, precision: 98.5, turnaround: 19.8, contamination: 0.7 },
    { month: "Jun", accuracy: 99.0, precision: 98.3, turnaround: 20.1, contamination: 0.8 },
  ];

  const chartConfig = {
    accuracy: { color: "#82ca9d" },
    precision: { color: "#8884d8" },
    turnaround: { color: "#ffc658" },
    contamination: { color: "#ff7300" },
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Quality Metrics Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[300px]">
            <LineChart data={qualityTrends}>
              <XAxis dataKey="month" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line dataKey="accuracy" stroke="var(--color-accuracy)" name="Accuracy %" strokeWidth={2} />
              <Line dataKey="precision" stroke="var(--color-precision)" name="Precision %" strokeWidth={2} />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Performance Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[300px]">
            <BarChart data={qualityTrends}>
              <XAxis dataKey="month" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="turnaround" fill="var(--color-turnaround)" name="Avg Turnaround (hrs)" />
              <Bar dataKey="contamination" fill="var(--color-contamination)" name="Contamination %" />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default QualityTrendsChart;
