
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, Target, Award, Calendar, BarChart3, PieChart } from "lucide-react";

const BreedingPerformanceAnalytics = () => {
  // Mock analytics data
  const analytics = {
    successRate: 78,
    totalBreedings: 156,
    successfulPregnancies: 122,
    currentPregnancies: 23,
    expectedFoals: 18,
    avgPregnancyLength: 342,
    topStallions: [
      { name: 'Thunder Storm', breedings: 24, successRate: 85 },
      { name: 'Desert King', breedings: 18, successRate: 82 },
      { name: 'Golden Arrow', breedings: 15, successRate: 79 },
    ],
    topMares: [
      { name: 'Silver Moon', pregnancies: 8, successRate: 90 },
      { name: 'Desert Rose', pregnancies: 6, successRate: 88 },
      { name: 'Morning Star', pregnancies: 5, successRate: 85 },
    ],
    monthlyTrends: [
      { month: 'Jan', breedings: 12, pregnancies: 9 },
      { month: 'Feb', breedings: 15, pregnancies: 12 },
      { month: 'Mar', breedings: 18, pregnancies: 15 },
      { month: 'Apr', breedings: 20, pregnancies: 16 },
      { month: 'May', breedings: 16, pregnancies: 13 },
      { month: 'Jun', breedings: 14, pregnancies: 11 },
    ]
  };

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Success Rate</p>
                <p className="text-2xl font-bold text-green-600">{analytics.successRate}%</p>
              </div>
              <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
                <TrendingUp className="h-4 w-4 text-green-600" />
              </div>
            </div>
            <div className="mt-4">
              <Progress value={analytics.successRate} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Breedings</p>
                <p className="text-2xl font-bold">{analytics.totalBreedings}</p>
              </div>
              <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                <Target className="h-4 w-4 text-blue-600" />
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              This year: {analytics.totalBreedings}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Pregnancies</p>
                <p className="text-2xl font-bold text-purple-600">{analytics.currentPregnancies}</p>
              </div>
              <div className="h-8 w-8 bg-purple-100 rounded-full flex items-center justify-center">
                <Calendar className="h-4 w-4 text-purple-600" />
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Expected foals: {analytics.expectedFoals}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg Pregnancy</p>
                <p className="text-2xl font-bold">{analytics.avgPregnancyLength}d</p>
              </div>
              <div className="h-8 w-8 bg-orange-100 rounded-full flex items-center justify-center">
                <Award className="h-4 w-4 text-orange-600" />
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Average duration
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Analytics */}
      <Tabs defaultValue="performance" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
          <TabsTrigger value="rankings">Rankings</TabsTrigger>
          <TabsTrigger value="forecasts">Forecasts</TabsTrigger>
        </TabsList>

        <TabsContent value="performance" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Success Rate Analysis */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Success Rate Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Natural Breeding</span>
                    <div className="flex items-center gap-2">
                      <Progress value={82} className="w-24 h-2" />
                      <span className="text-sm font-medium">82%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Artificial Insemination</span>
                    <div className="flex items-center gap-2">
                      <Progress value={75} className="w-24 h-2" />
                      <span className="text-sm font-medium">75%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Embryo Transfer</span>
                    <div className="flex items-center gap-2">
                      <Progress value={68} className="w-24 h-2" />
                      <span className="text-sm font-medium">68%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Monthly Performance */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="h-5 w-5" />
                  Monthly Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {analytics.monthlyTrends.map((month) => (
                    <div key={month.month} className="flex items-center justify-between">
                      <span className="text-sm font-medium">{month.month}</span>
                      <div className="flex items-center gap-3">
                        <Badge variant="outline" className="text-xs">
                          {month.breedings} attempts
                        </Badge>
                        <Badge variant="secondary" className="text-xs">
                          {month.pregnancies} success
                        </Badge>
                        <span className="text-sm text-green-600 font-medium">
                          {Math.round((month.pregnancies / month.breedings) * 100)}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="trends" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Breeding Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <BarChart3 className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Trend Analysis</h3>
                <p className="text-muted-foreground">
                  Interactive charts showing breeding trends over time
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rankings" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Top Stallions */}
            <Card>
              <CardHeader>
                <CardTitle>Top Performing Stallions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analytics.topStallions.map((stallion, index) => (
                    <div key={stallion.name} className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Badge variant="secondary">#{index + 1}</Badge>
                        <div>
                          <p className="font-medium">{stallion.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {stallion.breedings} breedings
                          </p>
                        </div>
                      </div>
                      <Badge className="bg-green-100 text-green-700">
                        {stallion.successRate}%
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Top Mares */}
            <Card>
              <CardHeader>
                <CardTitle>Top Performing Mares</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analytics.topMares.map((mare, index) => (
                    <div key={mare.name} className="flex items-center justify-between p-3 bg-pink-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Badge variant="secondary">#{index + 1}</Badge>
                        <div>
                          <p className="font-medium">{mare.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {mare.pregnancies} pregnancies
                          </p>
                        </div>
                      </div>
                      <Badge className="bg-green-100 text-green-700">
                        {mare.successRate}%
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="forecasts" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Breeding Forecasts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <TrendingUp className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Predictive Analytics</h3>
                <p className="text-muted-foreground">
                  AI-powered forecasts for breeding success and optimal timing
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BreedingPerformanceAnalytics;
