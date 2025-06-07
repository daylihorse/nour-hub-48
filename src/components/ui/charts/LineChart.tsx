
import { LineChart, Line, XAxis, YAxis } from "recharts";
import { ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import SharedChartContainer from "./shared/SharedChartContainer";

interface LineData {
  [key: string]: any;
}

interface LineConfig {
  dataKey: string;
  stroke: string;
  name: string;
  strokeWidth?: number;
}

interface ChartLineChartProps {
  title: string;
  data: LineData[];
  lines: LineConfig[];
  xAxisKey: string;
  config?: any;
}

const ChartLineChart = ({ 
  title, 
  data, 
  lines, 
  xAxisKey, 
  config = {} 
}: ChartLineChartProps) => {
  return (
    <SharedChartContainer title={title} config={config}>
      <LineChart data={data}>
        <XAxis dataKey={xAxisKey} />
        <YAxis />
        <ChartTooltip content={<ChartTooltipContent />} />
        {lines.map((line) => (
          <Line
            key={line.dataKey}
            dataKey={line.dataKey}
            stroke={line.stroke}
            name={line.name}
            strokeWidth={line.strokeWidth || 2}
          />
        ))}
      </LineChart>
    </SharedChartContainer>
  );
};

export default ChartLineChart;
