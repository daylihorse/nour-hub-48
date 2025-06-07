
import { BarChart, Bar, XAxis, YAxis } from "recharts";
import { ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import SharedChartContainer from "./shared/SharedChartContainer";

interface ChartBarChartProps {
  title: string;
  data: Array<{ [key: string]: any }>;
  dataKey: string;
  xAxisKey: string;
  fill?: string;
  config?: any;
}

const ChartBarChart = ({ 
  title, 
  data, 
  dataKey, 
  xAxisKey, 
  fill = "#8884d8",
  config = {} 
}: ChartBarChartProps) => {
  return (
    <SharedChartContainer title={title} config={config}>
      <BarChart data={data}>
        <XAxis dataKey={xAxisKey} />
        <YAxis />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey={dataKey} fill={fill} />
      </BarChart>
    </SharedChartContainer>
  );
};

export default ChartBarChart;
