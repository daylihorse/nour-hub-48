
import { PieChart, Pie, Cell } from "recharts";
import { ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import SharedChartContainer from "./shared/SharedChartContainer";

interface ChartPieChartProps {
  title: string;
  data: Array<{ [key: string]: any; color: string }>;
  dataKey: string;
  labelKey: string;
  config?: any;
}

const ChartPieChart = ({ 
  title, 
  data, 
  dataKey, 
  labelKey, 
  config = {} 
}: ChartPieChartProps) => {
  return (
    <SharedChartContainer title={title} config={config}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={80}
          dataKey={dataKey}
          label={({ [labelKey]: label, [dataKey]: value }) => `${label}: ${value}`}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <ChartTooltip content={<ChartTooltipContent />} />
      </PieChart>
    </SharedChartContainer>
  );
};

export default ChartPieChart;
