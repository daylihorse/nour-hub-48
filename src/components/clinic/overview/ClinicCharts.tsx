
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, PieChart, Pie, Cell, LineChart, Line, AreaChart, Area, ResponsiveContainer } from "recharts";

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

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Appointment Trends */}
      <Card>
        <CardHeader>
          <CardTitle>Appointment Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
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
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Treatment Distribution */}
      <Card>
        <CardHeader>
          <CardTitle>Treatment Type Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={treatmentTypes}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="count"
                  label={({ type, percentage }) => `${type}: ${percentage}%`}
                >
                  {treatmentTypes.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <ChartTooltip content={<ChartTooltipContent />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Daily Schedule Capacity */}
      <Card>
        <CardHeader>
          <CardTitle>Today's Schedule Capacity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dailySchedule}>
                <XAxis 
                  dataKey="time" 
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
                <Bar dataKey="appointments" fill="#8884d8" name="Scheduled" />
                <Bar dataKey="capacity" fill="#82ca9d" name="Capacity" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Health Outcomes */}
      <Card>
        <CardHeader>
          <CardTitle>Health Outcome Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={healthMetrics}>
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
                <Line 
                  dataKey="recoveryRate" 
                  stroke="#82ca9d" 
                  name="Recovery Rate %" 
                  strokeWidth={2}
                  dot={{ r: 4 }}
                />
                <Line 
                  dataKey="satisfaction" 
                  stroke="#8884d8" 
                  name="Satisfaction %" 
                  strokeWidth={2}
                  dot={{ r: 4 }}
                />
                <Line 
                  dataKey="complications" 
                  stroke="#ff7300" 
                  name="Complications %" 
                  strokeWidth={2}
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ClinicCharts;
