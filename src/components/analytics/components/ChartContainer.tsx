
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

interface ChartContainerProps {
  title: string;
  type: 'line' | 'bar';
  data: any[];
  xAxis: string;
  yAxis: string | string[];
  colors?: string[];
}

const ChartContainer = ({ 
  title, 
  type, 
  data, 
  xAxis, 
  yAxis, 
  colors = ['#8884d8', '#82ca9d'] 
}: ChartContainerProps) => {
  const yAxisFields = Array.isArray(yAxis) ? yAxis : [yAxis];

  const renderChart = () => {
    if (type === 'line') {
      return (
        <LineChart data={data}>
          <XAxis dataKey={xAxis} />
          <YAxis />
          <ChartTooltip content={<ChartTooltipContent />} />
          {yAxisFields.map((field, index) => (
            <Line
              key={field}
              dataKey={field}
              stroke={colors[index % colors.length]}
              strokeWidth={2}
              name={field.charAt(0).toUpperCase() + field.slice(1)}
            />
          ))}
        </LineChart>
      );
    }

    return (
      <BarChart data={data}>
        <XAxis dataKey={xAxis} />
        <YAxis />
        <ChartTooltip content={<ChartTooltipContent />} />
        {yAxisFields.map((field, index) => (
          <Bar
            key={field}
            dataKey={field}
            fill={colors[index % colors.length]}
            name={field.charAt(0).toUpperCase() + field.slice(1)}
          />
        ))}
      </BarChart>
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            {renderChart()}
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChartContainer;
