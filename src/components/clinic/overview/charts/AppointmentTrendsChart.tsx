
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { AreaChart, Area, XAxis, YAxis } from "recharts";

const AppointmentTrendsChart = () => {
  const appointmentData = [
    { month: "Jan", routine: 45, emergency: 12, surgery: 8, wellness: 32 },
    { month: "Feb", routine: 52, emergency: 15, surgery: 10, wellness: 38 },
    { month: "Mar", routine: 48, emergency: 18, surgery: 12, wellness: 35 },
    { month: "Apr", routine: 55, emergency: 14, surgery: 9, wellness: 42 },
    { month: "May", routine: 58, emergency: 16, surgery: 11, wellness: 40 },
    { month: "Jun", routine: 62, emergency: 13, surgery: 15, wellness: 45 },
  ];

  const chartConfig = {
    routine: { label: "Routine", color: "#8884d8" },
    emergency: { label: "Emergency", color: "#ff7300" },
    surgery: { label: "Surgery", color: "#82ca9d" },
    wellness: { label: "Wellness", color: "#ffc658" },
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Appointment Trends</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px]">
          <AreaChart data={appointmentData}>
            <XAxis 
              dataKey="month" 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12 }}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12 }}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Area 
              dataKey="routine" 
              stackId="1" 
              stroke="#8884d8" 
              fill="#8884d8" 
              fillOpacity={0.6} 
            />
            <Area 
              dataKey="emergency" 
              stackId="1" 
              stroke="#ff7300" 
              fill="#ff7300" 
              fillOpacity={0.6} 
            />
            <Area 
              dataKey="surgery" 
              stackId="1" 
              stroke="#82ca9d" 
              fill="#82ca9d" 
              fillOpacity={0.6} 
            />
            <Area 
              dataKey="wellness" 
              stackId="1" 
              stroke="#ffc658" 
              fill="#ffc658" 
              fillOpacity={0.6} 
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default AppointmentTrendsChart;
