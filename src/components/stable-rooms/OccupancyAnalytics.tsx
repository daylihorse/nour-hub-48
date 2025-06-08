
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Users, 
  Building, 
  Calendar,
  BarChart3,
  PieChart
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

const OccupancyAnalytics = () => {
  const [timeRange, setTimeRange] = useState("30d");
  const [roomType, setRoomType] = useState("all");

  // Mock analytics data
  const analytics = {
    overview: {
      totalRooms: 156,
      occupiedRooms: 142,
      availableRooms: 8,
      maintenanceRooms: 6,
      occupancyRate: 91.0,
      averageStayDuration: 45,
      totalRevenue: 145600,
      revenueGrowth: 12.5
    },
    utilizationByType: {
      stall: { total: 80, occupied: 75, rate: 93.75 },
      paddock: { total: 30, occupied: 28, rate: 93.33 },
      warehouse: { total: 20, occupied: 18, rate: 90.0 },
      feed_storage: { total: 15, occupied: 12, rate: 80.0 },
      quarantine: { total: 6, occupied: 4, rate: 66.67 },
      foaling: { total: 5, occupied: 5, rate: 100.0 }
    },
    monthlyTrends: [
      { month: "Jan", occupancy: 85, revenue: 42000 },
      { month: "Feb", occupancy: 88, revenue: 44500 },
      { month: "Mar", occupancy: 91, revenue: 47200 },
      { month: "Apr", occupancy: 89, revenue: 45800 },
      { month: "May", occupancy: 92, revenue: 48600 },
      { month: "Jun", occupancy: 91, revenue: 47900 }
    ],
    topPerformingRooms: [
      { id: "A-15", type: "stall", occupancyRate: 98, revenue: 4800 },
      { id: "B-08", type: "paddock", occupancyRate: 96, revenue: 3600 },
      { id: "F-01", type: "foaling", occupancyRate: 100, revenue: 7200 },
      { id: "W-02", type: "warehouse", occupancyRate: 95, revenue: 2400 }
    ]
  };

  const occupancyTrend = analytics.overview.occupancyRate > 90 ? 'up' : 'down';
  const revenueTrend = analytics.overview.revenueGrowth > 0 ? 'up' : 'down';

  return (
    <div className="space-y-6">
      {/* Header and Filters */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div>
          <h2 className="text-2xl font-bold">Occupancy Analytics</h2>
          <p className="text-muted-foreground">Detailed insights into facility utilization and performance</p>
        </div>
        <div className="flex gap-4">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Select value={roomType} onValueChange={setRoomType}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Room type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="stall">Stalls</SelectItem>
              <SelectItem value="paddock">Paddocks</SelectItem>
              <SelectItem value="warehouse">Warehouses</SelectItem>
              <SelectItem value="foaling">Foaling Boxes</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Key Performance Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overall Occupancy</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.overview.occupancyRate}%</div>
            <p className={`text-xs flex items-center ${occupancyTrend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
              {occupancyTrend === 'up' ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
              {occupancyTrend === 'up' ? '+' : '-'}2.5% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${analytics.overview.totalRevenue.toLocaleString()}</div>
            <p className={`text-xs flex items-center ${revenueTrend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
              {revenueTrend === 'up' ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
              {revenueTrend === 'up' ? '+' : ''}{analytics.overview.revenueGrowth}% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Stay Duration</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.overview.averageStayDuration} days</div>
            <p className="text-xs text-muted-foreground">
              Across all room types
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Available Rooms</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.overview.availableRooms}</div>
            <p className="text-xs text-muted-foreground">
              Ready for immediate occupancy
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Utilization by Room Type */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5" />
              Utilization by Room Type
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {Object.entries(analytics.utilizationByType).map(([type, data]) => (
              <div key={type} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium capitalize">{type.replace('_', ' ')}</span>
                  <Badge variant="outline">{data.rate.toFixed(1)}%</Badge>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>{data.occupied}/{data.total} rooms</span>
                  <div className="flex-1 bg-muted rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full" 
                      style={{ width: `${data.rate}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Monthly Trends */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Monthly Performance Trends
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analytics.monthlyTrends.map((trend, index) => (
                <div key={trend.month} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <span className="font-medium">{trend.month}</span>
                    <Badge variant="outline">{trend.occupancy}%</Badge>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">${trend.revenue.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">Revenue</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Performing Rooms */}
      <Card>
        <CardHeader>
          <CardTitle>Top Performing Rooms</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {analytics.topPerformingRooms.map((room) => (
              <div key={room.id} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">{room.id}</span>
                  <Badge variant="outline" className="capitalize">
                    {room.type}
                  </Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Occupancy Rate:</span>
                    <span className="font-medium">{room.occupancyRate}%</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Monthly Revenue:</span>
                    <span className="font-medium">${room.revenue.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full" 
                      style={{ width: `${room.occupancyRate}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Summary Insights */}
      <Card>
        <CardHeader>
          <CardTitle>Key Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="font-semibold text-green-600">Positive Trends</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-green-500" />
                  Foaling boxes maintain 100% occupancy rate
                </li>
                <li className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-green-500" />
                  Overall revenue growth of 12.5% this month
                </li>
                <li className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-green-500" />
                  Premium stalls show consistent high demand
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold text-orange-600">Areas for Improvement</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <TrendingDown className="h-4 w-4 text-orange-500" />
                  Quarantine rooms underutilized at 66.67%
                </li>
                <li className="flex items-center gap-2">
                  <TrendingDown className="h-4 w-4 text-orange-500" />
                  Feed storage capacity could be optimized
                </li>
                <li className="flex items-center gap-2">
                  <TrendingDown className="h-4 w-4 text-orange-500" />
                  6 rooms currently under maintenance
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OccupancyAnalytics;
