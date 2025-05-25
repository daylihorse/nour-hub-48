
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, PieChart, Pie, Cell, LineChart, Line, AreaChart, Area } from "recharts";
import { Stethoscope, Calendar, Heart, AlertTriangle, TrendingUp, Activity, Clock, CheckCircle } from "lucide-react";

const ClinicDashboard = () => {
  // Sample data for charts
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

  const keyMetrics = [
    {
      title: "Today's Appointments",
      value: "24",
      change: "+3 from yesterday",
      trend: "up",
      icon: Calendar,
      color: "text-blue-600"
    },
    {
      title: "Active Patients",
      value: "156",
      change: "+12 this week",
      trend: "up",
      icon: Heart,
      color: "text-red-600"
    },
    {
      title: "Recovery Rate",
      value: "96.8%",
      change: "+1.1% this month",
      trend: "up",
      icon: TrendingUp,
      color: "text-green-600"
    },
    {
      title: "Avg Wait Time",
      value: "12 min",
      change: "-3 min improved",
      trend: "up",
      icon: Clock,
      color: "text-purple-600"
    }
  ];

  const chartConfig = {
    routine: { color: "#8884d8" },
    emergency: { color: "#ff7300" },
    surgery: { color: "#82ca9d" },
    wellness: { color: "#ffc658" },
    recoveryRate: { color: "#82ca9d" },
    satisfaction: { color: "#8884d8" },
    complications: { color: "#ff7300" },
  };

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {keyMetrics.map((metric) => (
          <Card key={metric.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
              <metric.icon className={`h-4 w-4 ${metric.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <p className={`text-xs ${metric.trend === 'up' ? 'text-green-600' : 'text-muted-foreground'}`}>
                {metric.change}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Appointment Trends */}
        <Card>
          <CardHeader>
            <CardTitle>Appointment Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <AreaChart data={appointmentData}>
                <XAxis dataKey="month" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Area dataKey="routine" stackId="1" stroke="var(--color-routine)" fill="var(--color-routine)" fillOpacity={0.6} />
                <Area dataKey="emergency" stackId="1" stroke="var(--color-emergency)" fill="var(--color-emergency)" fillOpacity={0.6} />
                <Area dataKey="surgery" stackId="1" stroke="var(--color-surgery)" fill="var(--color-surgery)" fillOpacity={0.6} />
                <Area dataKey="wellness" stackId="1" stroke="var(--color-wellness)" fill="var(--color-wellness)" fillOpacity={0.6} />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Treatment Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Treatment Type Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{}} className="h-[300px]">
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
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Daily Schedule Capacity */}
        <Card>
          <CardHeader>
            <CardTitle>Today's Schedule Capacity</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{}} className="h-[300px]">
              <BarChart data={dailySchedule}>
                <XAxis dataKey="time" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="appointments" fill="#8884d8" name="Scheduled" />
                <Bar dataKey="capacity" fill="#82ca9d" name="Capacity" />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Health Outcomes */}
        <Card>
          <CardHeader>
            <CardTitle>Health Outcome Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <LineChart data={healthMetrics}>
                <XAxis dataKey="month" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line dataKey="recoveryRate" stroke="var(--color-recoveryRate)" name="Recovery Rate %" strokeWidth={2} />
                <Line dataKey="satisfaction" stroke="var(--color-satisfaction)" name="Satisfaction %" strokeWidth={2} />
                <Line dataKey="complications" stroke="var(--color-complications)" name="Complications %" strokeWidth={2} />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activities & Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Stethoscope className="h-4 w-4 text-blue-500" />
              Recent Patient Updates
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <div>
                  <p className="text-sm font-medium">Successful Surgery - Thunder</p>
                  <p className="text-xs text-muted-foreground">Colic surgery completed, stable condition</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                <Activity className="h-4 w-4 text-blue-500" />
                <div>
                  <p className="text-sm font-medium">Wellness Check - Bella</p>
                  <p className="text-xs text-muted-foreground">Annual vaccination and health screening</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg">
                <Clock className="h-4 w-4 text-yellow-500" />
                <div>
                  <p className="text-sm font-medium">Follow-up Due - Shadow</p>
                  <p className="text-xs text-muted-foreground">Post-surgery check scheduled for tomorrow</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-orange-500" />
              Clinical Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-red-50 rounded-lg">
                <AlertTriangle className="h-4 w-4 text-red-500" />
                <div>
                  <p className="text-sm font-medium">Emergency Case</p>
                  <p className="text-xs text-muted-foreground">Whisper - Severe lameness, requires immediate attention</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg">
                <Calendar className="h-4 w-4 text-orange-500" />
                <div>
                  <p className="text-sm font-medium">Overbooked Schedule</p>
                  <p className="text-xs text-muted-foreground">3:00 PM slot has 3 appointments scheduled</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg">
                <Heart className="h-4 w-4 text-yellow-500" />
                <div>
                  <p className="text-sm font-medium">Medication Reminder</p>
                  <p className="text-xs text-muted-foreground">Star needs pain medication in 2 hours</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ClinicDashboard;
