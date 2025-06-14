
import ChartBarChart from "@/components/ui/charts/BarChart";
import ChartPieChart from "@/components/ui/charts/PieChart";
import ChartLineChart from "@/components/ui/charts/LineChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { AreaChart, Area, XAxis, YAxis } from "recharts";

const ClinicCharts = () => {
  const appointmentData = [
    { month: "Jan", routine: 45, emergency: 12, surgery: 8, wellness: 32 },
    { month: "Feb", routine: 52, emergency: 15, surgery: 10, wellness: 38 },
    { month: "Mar", routine: 48, emergency: 18, surgery: 12, wellness: 35 },
    { month: "Apr", routine: 55, emergency: 14, surgery: 9, wellness: 42 },
    { month: "May", routine: 58, emergency: 16, surgery: 11, wellness: 40 },
    { month: "Jun", routine: 62, emergency: 13, surgery: 15, wellness: 45 },
  ];

  const treatmentTypes = [
    { type: "Routine Checkups", count: 342, percentage: 45, color: "#8884d8" },
    { type: "Emergency Care", count: 98, percentage: 13, color: "#ff7300" },
    { type: "Surgical Procedures", count: 65, percentage: 9, color: "#82ca9d" },
    { type: "Wellness Exams", count: 252, percentage: 33, color: "#ffc658" },
  ];

  const healthMetrics = [
    { month: "Jan", recoveryRate: 94.5, satisfaction: 96.2, complications: 2.1 },
    { month: "Feb", recoveryRate: 95.8, satisfaction: 96.8, complications: 1.8 },
    { month: "Mar", recoveryRate: 94.2, satisfaction: 95.9, complications: 2.3 },
    { month: "Apr", recoveryRate: 96.1, satisfaction: 97.1, complications: 1.5 },
    { month: "May", recoveryRate: 95.7, satisfaction: 96.5, complications: 1.9 },
    { month: "Jun", recoveryRate: 96.8, satisfaction: 97.3, complications: 1.2 },
  ];

  const dailySchedule = [
    { time: "08:00", appointments: 8, capacity: 10 },
    { time: "10:00", appointments: 12, capacity: 12 },
    { time: "12:00", appointments: 6, capacity: 8 },
    { time: "14:00", appointments: 10, capacity: 12 },
    { time: "16:00", appointments: 9, capacity: 10 },
    { time: "18:00", appointments: 4, capacity: 6 },
  ];

  const chartConfig = {
    routine: { label: "Routine", color: "#8884d8" },
    emergency: { label: "Emergency", color: "#ff7300" },
    surgery: { label: "Surgery", color: "#82ca9d" },
    wellness: { label: "Wellness", color: "#ffc658" },
    appointments: { label: "Scheduled", color: "#8884d8" },
    capacity: { label: "Capacity", color: "#82ca9d" },
    recoveryRate: { label: "Recovery Rate %", color: "#82ca9d" },
    satisfaction: { label: "Satisfaction %", color: "#8884d8" },
    complications: { label: "Complications %", color: "#ff7300" },
  };

  const healthLines = [
    { dataKey: "recoveryRate", stroke: "#82ca9d", name: "Recovery Rate %" },
    { dataKey: "satisfaction", stroke: "#8884d8", name: "Satisfaction %" },
    { dataKey: "complications", stroke: "#ff7300", name: "Complications %" },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Appointment Trends */}
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

      {/* Treatment Distribution */}
      <ChartPieChart
        title="Treatment Type Distribution"
        data={treatmentTypes}
        dataKey="count"
        labelKey="type"
        config={chartConfig}
      />

      {/* Daily Schedule Capacity */}
      <ChartBarChart
        title="Today's Schedule Capacity"
        data={dailySchedule}
        dataKey="appointments"
        xAxisKey="time"
        fill="#8884d8"
        config={chartConfig}
      />

      {/* Health Outcomes */}
      <ChartLineChart
        title="Health Outcome Metrics"
        data={healthMetrics}
        lines={healthLines}
        xAxisKey="month"
        config={chartConfig}
      />
    </div>
  );
};

export default ClinicCharts;
