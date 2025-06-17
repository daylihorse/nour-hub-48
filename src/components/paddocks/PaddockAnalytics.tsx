import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { usePaddockData } from "@/hooks/usePaddockData";
import { Bar, BarChart, CartesianGrid, Cell, Legend, Line, LineChart, Pie, PieChart, ResponsiveContainer, Sector, Tooltip, XAxis, YAxis } from "recharts";

const PaddockAnalytics = () => {
  const { paddocks } = usePaddockData();
  const [timeRange, setTimeRange] = useState("last30days");
  const [selectedPaddock, setSelectedPaddock] = useState("all");

  // Mock data for charts
  const occupancyData = [
    { name: "North Pasture", value: 0, capacity: 8, percentage: 0 },
    { name: "East Exercise Area", value: 3, capacity: 4, percentage: 75 },
    { name: "South Turnout", value: 0, capacity: 6, percentage: 0 },
    { name: "Breeding Paddock", value: 2, capacity: 2, percentage: 100 },
    { name: "Quarantine Area", value: 0, capacity: 2, percentage: 0 },
    { name: "Rehabilitation Paddock", value: 1, capacity: 1, percentage: 100 },
  ];

  const usageByTypeData = [
    { name: "Grazing", value: 8, fill: "#4ade80" },
    { name: "Exercise", value: 4, fill: "#60a5fa" },
    { name: "Turnout", value: 6, fill: "#facc15" },
    { name: "Breeding", value: 2, fill: "#f472b6" },
    { name: "Quarantine", value: 2, fill: "#ef4444" },
    { name: "Rehabilitation", value: 1, fill: "#a78bfa" },
  ];

  const maintenanceData = [
    { name: "Grass Maintenance", count: 12, hours: 36 },
    { name: "Fence Repair", count: 4, hours: 16 },
    { name: "Drainage", count: 2, hours: 24 },
    { name: "Soil Treatment", count: 1, hours: 8 },
    { name: "Weed Control", count: 6, hours: 18 },
    { name: "Fertilization", count: 3, hours: 9 },
    { name: "Reseeding", count: 2, hours: 12 },
  ];

  const usageByMonthData = [
    { name: "Jan", grazing: 80, exercise: 65, turnout: 45, breeding: 100 },
    { name: "Feb", grazing: 75, exercise: 70, turnout: 50, breeding: 100 },
    { name: "Mar", grazing: 85, exercise: 75, turnout: 60, breeding: 100 },
    { name: "Apr", grazing: 90, exercise: 80, turnout: 65, breeding: 100 },
    { name: "May", grazing: 95, exercise: 85, turnout: 70, breeding: 100 },
    { name: "Jun", grazing: 92, exercise: 82, turnout: 68, breeding: 100 },
    { name: "Jul", grazing: 88, exercise: 78, turnout: 64, breeding: 100 },
    { name: "Aug", grazing: 85, exercise: 75, turnout: 60, breeding: 100 },
    { name: "Sep", grazing: 82, exercise: 72, turnout: 58, breeding: 100 },
    { name: "Oct", grazing: 78, exercise: 68, turnout: 54, breeding: 100 },
    { name: "Nov", grazing: 75, exercise: 65, turnout: 50, breeding: 100 },
    { name: "Dec", grazing: 72, exercise: 62, turnout: 48, breeding: 100 },
  ];

  const soilHealthData = [
    { name: "North Pasture", pH: 6.8, nitrogen: 85, phosphorus: 70, potassium: 65, organicMatter: 4.2 },
    { name: "East Exercise Area", pH: 6.5, nitrogen: 65, phosphorus: 60, potassium: 55, organicMatter: 3.8 },
    { name: "South Turnout", pH: 7.0, nitrogen: 75, phosphorus: 65, potassium: 60, organicMatter: 4.0 },
    { name: "Breeding Paddock", pH: 6.9, nitrogen: 80, phosphorus: 75, potassium: 70, organicMatter: 4.5 },
    { name: "Quarantine Area", pH: 6.7, nitrogen: 70, phosphorus: 65, potassium: 60, organicMatter: 3.9 },
    { name: "Rehabilitation Paddock", pH: 6.6, nitrogen: 75, phosphorus: 70, potassium: 65, organicMatter: 4.1 },
  ];

  const rotationEfficiencyData = [
    { name: "Rotation Plan 1", efficiency: 92, restDays: 14, rotationDays: 30 },
    { name: "Rotation Plan 2", efficiency: 85, restDays: 10, rotationDays: 25 },
    { name: "Rotation Plan 3", efficiency: 78, restDays: 7, rotationDays: 21 },
  ];

  // Calculate total statistics
  const totalPaddocks = paddocks.length;
  const totalCapacity = paddocks.reduce((sum, paddock) => sum + paddock.capacity, 0);
  const currentOccupancy = paddocks.reduce((sum, paddock) => sum + paddock.currentOccupancy, 0);
  const occupancyRate = totalCapacity > 0 ? Math.round((currentOccupancy / totalCapacity) * 100) : 0;
  const paddocksInMaintenance = paddocks.filter(p => p.status === "maintenance").length;
  const availablePaddocks = paddocks.filter(p => p.status === "available").length;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Paddock Analytics</h2>
        <div className="flex gap-4">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Time Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="last7days">Last 7 Days</SelectItem>
              <SelectItem value="last30days">Last 30 Days</SelectItem>
              <SelectItem value="last90days">Last 90 Days</SelectItem>
              <SelectItem value="last6months">Last 6 Months</SelectItem>
              <SelectItem value="last12months">Last 12 Months</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={selectedPaddock} onValueChange={setSelectedPaddock}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Paddock" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Paddocks</SelectItem>
              {paddocks.map(paddock => (
                <SelectItem key={paddock.id} value={paddock.id}>
                  {paddock.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Paddocks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalPaddocks}</div>
            <p className="text-xs text-muted-foreground">
              {availablePaddocks} available, {paddocksInMaintenance} in maintenance
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Capacity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCapacity} horses</div>
            <p className="text-xs text-muted-foreground">
              {currentOccupancy} currently assigned
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Occupancy Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{occupancyRate}%</div>
            <p className="text-xs text-muted-foreground">
              {currentOccupancy}/{totalCapacity} horses
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Rotation Efficiency</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">85%</div>
            <p className="text-xs text-muted-foreground">
              3 active rotation plans
            </p>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="usage">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="usage">Usage</TabsTrigger>
          <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
          <TabsTrigger value="soil">Soil Health</TabsTrigger>
          <TabsTrigger value="rotation">Rotation</TabsTrigger>
        </TabsList>
        
        <TabsContent value="usage" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Current Occupancy Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Current Occupancy</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={occupancyData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="value" name="Occupied" fill="#3b82f6" />
                      <Bar dataKey="capacity" name="Capacity" fill="#cbd5e1" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            {/* Usage by Type */}
            <Card>
              <CardHeader>
                <CardTitle>Usage by Type</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={usageByTypeData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {usageByTypeData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            {/* Usage by Month */}
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Usage by Month</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={usageByMonthData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="grazing" stroke="#4ade80" name="Grazing" />
                      <Line type="monotone" dataKey="exercise" stroke="#60a5fa" name="Exercise" />
                      <Line type="monotone" dataKey="turnout" stroke="#facc15" name="Turnout" />
                      <Line type="monotone" dataKey="breeding" stroke="#f472b6" name="Breeding" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="maintenance" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Maintenance by Type */}
            <Card>
              <CardHeader>
                <CardTitle>Maintenance by Type</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={maintenanceData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="count" name="Number of Tasks" fill="#3b82f6" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            {/* Maintenance Hours */}
            <Card>
              <CardHeader>
                <CardTitle>Maintenance Hours</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={maintenanceData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="hours" name="Hours Spent" fill="#f97316" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            {/* Maintenance Calendar Heatmap - Simplified version */}
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Maintenance Calendar (Last 30 Days)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-7 gap-1">
                  {Array.from({ length: 30 }).map((_, i) => {
                    const intensity = Math.random(); // In a real app, this would be based on actual data
                    const bgColor = intensity === 0 
                      ? "bg-gray-100" 
                      : intensity < 0.3 
                        ? "bg-green-100" 
                        : intensity < 0.7 
                          ? "bg-green-300" 
                          : "bg-green-500";
                    
                    return (
                      <div 
                        key={i} 
                        className={`${bgColor} h-8 rounded flex items-center justify-center text-xs`}
                        title={`${new Date().getDate() - 29 + i}/${new Date().getMonth() + 1}`}
                      >
                        {new Date().getDate() - 29 + i}
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="soil" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Soil pH Levels */}
            <Card>
              <CardHeader>
                <CardTitle>Soil pH Levels</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={soilHealthData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis domain={[6, 8]} />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="pH" name="pH Level" fill="#3b82f6" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            {/* Soil Nutrients */}
            <Card>
              <CardHeader>
                <CardTitle>Soil Nutrients</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={soilHealthData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="nitrogen" name="Nitrogen" fill="#4ade80" />
                      <Bar dataKey="phosphorus" name="Phosphorus" fill="#f97316" />
                      <Bar dataKey="potassium" name="Potassium" fill="#a78bfa" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            {/* Organic Matter */}
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Organic Matter Content</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={soilHealthData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis domain={[0, 5]} />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="organicMatter" name="Organic Matter %" fill="#84cc16" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="rotation" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Rotation Efficiency */}
            <Card>
              <CardHeader>
                <CardTitle>Rotation Efficiency</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={rotationEfficiencyData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis domain={[0, 100]} />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="efficiency" name="Efficiency %" fill="#3b82f6" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            {/* Rest vs Rotation Days */}
            <Card>
              <CardHeader>
                <CardTitle>Rest vs Rotation Days</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={rotationEfficiencyData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="restDays" name="Rest Days" fill="#4ade80" />
                      <Bar dataKey="rotationDays" name="Rotation Days" fill="#f97316" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            {/* Paddock Recovery Rate - Simplified */}
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Paddock Recovery Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        dataKey="day" 
                        type="number" 
                        domain={[0, 30]} 
                        ticks={[0, 5, 10, 15, 20, 25, 30]}
                        label={{ value: 'Days After Rotation', position: 'insideBottom', offset: -5 }}
                      />
                      <YAxis 
                        domain={[0, 100]}
                        label={{ value: 'Recovery %', angle: -90, position: 'insideLeft' }}
                      />
                      <Tooltip />
                      <Legend />
                      <Line 
                        data={[
                          { day: 0, recovery: 0 },
                          { day: 7, recovery: 30 },
                          { day: 14, recovery: 65 },
                          { day: 21, recovery: 85 },
                          { day: 30, recovery: 95 }
                        ]} 
                        type="monotone" 
                        dataKey="recovery" 
                        name="Grass Recovery" 
                        stroke="#4ade80"
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PaddockAnalytics;
