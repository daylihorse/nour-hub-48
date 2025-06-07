import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, PieChart, Pie, Cell, LineChart, Line, ResponsiveContainer } from "recharts";
import { Heart, Activity, Calendar, Users, AlertTriangle, TrendingUp } from "lucide-react";
import BreedingQuickAccess from "./breeding/BreedingQuickAccess";
import BreedingFeaturesShowcase from "./breeding/BreedingFeaturesShowcase";

interface HorsesDashboardProps {
  onNavigateToBreeding?: (tab: string) => void;
}

const HorsesDashboard = ({ onNavigateToBreeding }: HorsesDashboardProps) => {
  // Sample data for charts
  const horsesByAge = [
    { ageRange: "1-3 years", count: 12, color: "#8884d8" },
    { ageRange: "4-8 years", count: 25, color: "#82ca9d" },
    { ageRange: "9-15 years", count: 18, color: "#ffc658" },
    { ageRange: "16+ years", count: 8, color: "#ff7300" },
  ];

  const healthMetrics = [
    { month: "Jan", healthy: 58, treatment: 5, checkup: 2 },
    { month: "Feb", healthy: 60, treatment: 3, checkup: 4 },
    { month: "Mar", healthy: 62, treatment: 1, checkup: 3 },
    { month: "Apr", healthy: 61, treatment: 4, checkup: 1 },
    { month: "May", healthy: 63, treatment: 2, checkup: 2 },
    { month: "Jun", healthy: 63, treatment: 0, checkup: 3 },
  ];

  const breedDistribution = [
    { breed: "Arabian", count: 25, color: "#8884d8" },
    { breed: "Thoroughbred", count: 18, color: "#82ca9d" },
    { breed: "Quarter Horse", count: 12, color: "#ffc658" },
    { breed: "Warmblood", count: 8, color: "#ff7300" },
  ];

  const keyMetrics = [
    {
      title: "Total Horses",
      value: "63",
      change: "+2 this month",
      trend: "up",
      icon: Heart,
      color: "text-blue-600"
    },
    {
      title: "Healthy Horses",
      value: "63",
      change: "100%",
      trend: "stable",
      icon: Heart,
      color: "text-green-600"
    },
    {
      title: "In Training",
      value: "28",
      change: "+5 this week",
      trend: "up",
      icon: Activity,
      color: "text-orange-600"
    },
    {
      title: "Avg Age",
      value: "8.2 years",
      change: "+0.3 years",
      trend: "up",
      icon: Calendar,
      color: "text-purple-600"
    }
  ];

  const chartConfig = {
    healthy: { color: "#82ca9d" },
    treatment: { color: "#ff7300" },
    checkup: { color: "#8884d8" },
  };

  const handleNavigateToBreeding = (tab: string) => {
    if (onNavigateToBreeding) {
      onNavigateToBreeding(tab);
    }
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

      {/* New Breeding Features Showcase */}
      <BreedingFeaturesShowcase onNavigateToBreeding={handleNavigateToBreeding} />

      {/* Breeding Quick Access */}
      <BreedingQuickAccess onNavigateToBreeding={handleNavigateToBreeding} />

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Health Status Over Time */}
        <Card>
          <CardHeader>
            <CardTitle>Health Status Tracking</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <LineChart data={healthMetrics}>
                <XAxis dataKey="month" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line dataKey="healthy" stroke="var(--color-healthy)" name="Healthy" strokeWidth={2} />
                <Line dataKey="treatment" stroke="var(--color-treatment)" name="In Treatment" strokeWidth={2} />
                <Line dataKey="checkup" stroke="var(--color-checkup)" name="Scheduled Checkup" strokeWidth={2} />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Age Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Age Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{}} className="h-[300px]">
              <BarChart data={horsesByAge}>
                <XAxis dataKey="ageRange" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="count" fill="#8884d8" />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Breed Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Breed Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{}} className="h-[300px]">
              <PieChart>
                <Pie
                  data={breedDistribution}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="count"
                  label={({ breed, count }) => `${breed}: ${count}`}
                >
                  {breedDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <ChartTooltip content={<ChartTooltipContent />} />
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Recent Activities & Alerts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-orange-500" />
              Recent Activities & Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                <Heart className="h-4 w-4 text-green-500" />
                <div>
                  <p className="text-sm font-medium">Health Check Completed</p>
                  <p className="text-xs text-muted-foreground">Thunder - All vitals normal</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                <Activity className="h-4 w-4 text-blue-500" />
                <div>
                  <p className="text-sm font-medium">Training Session</p>
                  <p className="text-xs text-muted-foreground">Bella - Advanced dressage completed</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg">
                <Calendar className="h-4 w-4 text-orange-500" />
                <div>
                  <p className="text-sm font-medium">Upcoming Vaccination</p>
                  <p className="text-xs text-muted-foreground">Shadow - Due in 3 days</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                <Users className="h-4 w-4 text-purple-500" />
                <div>
                  <p className="text-sm font-medium">New Arrival</p>
                  <p className="text-xs text-muted-foreground">Whisper - Arabian mare registered</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HorsesDashboard;
