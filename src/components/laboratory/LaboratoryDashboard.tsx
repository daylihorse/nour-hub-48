
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, PieChart, Pie, Cell, LineChart, Line, ResponsiveContainer, AreaChart, Area } from "recharts";
import { FlaskRound, Clock, CheckCircle, AlertTriangle, TrendingUp, Microscope, TestTube, Activity } from "lucide-react";

const LaboratoryDashboard = () => {
  // Sample data for charts
  const testVolumes = [
    { month: "Jan", bloodTests: 45, urineTests: 32, fecalTests: 28, biopsies: 15 },
    { month: "Feb", bloodTests: 52, urineTests: 38, fecalTests: 31, biopsies: 18 },
    { month: "Mar", bloodTests: 48, urineTests: 35, fecalTests: 29, biopsies: 20 },
    { month: "Apr", bloodTests: 55, urineTests: 42, fecalTests: 33, biopsies: 16 },
    { month: "May", bloodTests: 58, urineTests: 40, fecalTests: 35, biopsies: 22 },
    { month: "Jun", bloodTests: 62, urineTests: 45, fecalTests: 38, biopsies: 19 },
  ];

  const sampleTypes = [
    { type: "Blood Samples", count: 342, percentage: 45, color: "#8884d8" },
    { type: "Urine Samples", count: 198, percentage: 26, color: "#82ca9d" },
    { type: "Fecal Samples", count: 156, percentage: 20, color: "#ffc658" },
    { type: "Tissue Biopsies", count: 68, percentage: 9, color: "#ff7300" },
  ];

  const turnaroundTimes = [
    { testType: "Routine Blood", avgHours: 24, target: 24, color: "#82ca9d" },
    { testType: "Urgent Blood", avgHours: 4, target: 6, color: "#ff7300" },
    { testType: "Cultures", avgHours: 72, target: 72, color: "#8884d8" },
    { testType: "Pathology", avgHours: 48, target: 48, color: "#ffc658" },
  ];

  const qualityMetrics = [
    { month: "Jan", accuracy: 98.5, precision: 97.2, contamination: 1.2 },
    { month: "Feb", accuracy: 98.8, precision: 97.8, contamination: 0.9 },
    { month: "Mar", accuracy: 99.1, precision: 98.1, contamination: 0.8 },
    { month: "Apr", accuracy: 98.7, precision: 97.9, contamination: 1.1 },
    { month: "May", accuracy: 99.2, precision: 98.5, contamination: 0.7 },
    { month: "Jun", accuracy: 99.0, precision: 98.3, contamination: 0.8 },
  ];

  const keyMetrics = [
    {
      title: "Total Tests This Month",
      value: "187",
      change: "+12% from last month",
      trend: "up",
      icon: TestTube,
      color: "text-blue-600"
    },
    {
      title: "Pending Results",
      value: "23",
      change: "Within normal range",
      trend: "stable",
      icon: Clock,
      color: "text-orange-600"
    },
    {
      title: "Quality Score",
      value: "99.0%",
      change: "+0.3% this month",
      trend: "up",
      icon: CheckCircle,
      color: "text-green-600"
    },
    {
      title: "Avg Turnaround",
      value: "18.5 hrs",
      change: "-2.1 hrs improved",
      trend: "up",
      icon: TrendingUp,
      color: "text-purple-600"
    }
  ];

  const chartConfig = {
    bloodTests: { color: "#8884d8" },
    urineTests: { color: "#82ca9d" },
    fecalTests: { color: "#ffc658" },
    biopsies: { color: "#ff7300" },
    accuracy: { color: "#82ca9d" },
    precision: { color: "#8884d8" },
    contamination: { color: "#ff7300" },
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
        {/* Test Volume Trends */}
        <Card>
          <CardHeader>
            <CardTitle>Test Volume Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <AreaChart data={testVolumes}>
                <XAxis dataKey="month" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Area dataKey="bloodTests" stackId="1" stroke="var(--color-bloodTests)" fill="var(--color-bloodTests)" fillOpacity={0.6} />
                <Area dataKey="urineTests" stackId="1" stroke="var(--color-urineTests)" fill="var(--color-urineTests)" fillOpacity={0.6} />
                <Area dataKey="fecalTests" stackId="1" stroke="var(--color-fecalTests)" fill="var(--color-fecalTests)" fillOpacity={0.6} />
                <Area dataKey="biopsies" stackId="1" stroke="var(--color-biopsies)" fill="var(--color-biopsies)" fillOpacity={0.6} />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Sample Type Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Sample Type Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{}} className="h-[300px]">
              <PieChart>
                <Pie
                  data={sampleTypes}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="count"
                  label={({ type, percentage }) => `${type}: ${percentage}%`}
                >
                  {sampleTypes.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <ChartTooltip content={<ChartTooltipContent />} />
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Turnaround Time Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Turnaround Time Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{}} className="h-[300px]">
              <BarChart data={turnaroundTimes} layout="horizontal">
                <XAxis type="number" />
                <YAxis dataKey="testType" type="category" width={100} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="avgHours" fill="#8884d8" name="Actual Hours" />
                <Bar dataKey="target" fill="#82ca9d" name="Target Hours" />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Quality Metrics */}
        <Card>
          <CardHeader>
            <CardTitle>Quality Control Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <LineChart data={qualityMetrics}>
                <XAxis dataKey="month" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line dataKey="accuracy" stroke="var(--color-accuracy)" name="Accuracy %" strokeWidth={2} />
                <Line dataKey="precision" stroke="var(--color-precision)" name="Precision %" strokeWidth={2} />
                <Line dataKey="contamination" stroke="var(--color-contamination)" name="Contamination %" strokeWidth={2} />
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
              <FlaskRound className="h-4 w-4 text-blue-500" />
              Recent Test Results
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <div>
                  <p className="text-sm font-medium">Blood Panel - Thunder</p>
                  <p className="text-xs text-muted-foreground">All parameters within normal range</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                <Microscope className="h-4 w-4 text-blue-500" />
                <div>
                  <p className="text-sm font-medium">Fecal Parasite - Bella</p>
                  <p className="text-xs text-muted-foreground">No parasites detected</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg">
                <Clock className="h-4 w-4 text-orange-500" />
                <div>
                  <p className="text-sm font-medium">Culture - Shadow</p>
                  <p className="text-xs text-muted-foreground">In progress - 48hrs remaining</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-orange-500" />
              Laboratory Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-red-50 rounded-lg">
                <AlertTriangle className="h-4 w-4 text-red-500" />
                <div>
                  <p className="text-sm font-medium">Critical Result</p>
                  <p className="text-xs text-muted-foreground">Whisper - Elevated white cell count</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg">
                <Clock className="h-4 w-4 text-yellow-500" />
                <div>
                  <p className="text-sm font-medium">Equipment Maintenance</p>
                  <p className="text-xs text-muted-foreground">Centrifuge due for calibration</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                <TestTube className="h-4 w-4 text-blue-500" />
                <div>
                  <p className="text-sm font-medium">Supply Alert</p>
                  <p className="text-xs text-muted-foreground">Blood collection tubes running low</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LaboratoryDashboard;
