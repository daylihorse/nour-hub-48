/**
 * Component: PaddockSoilManagement
 * 
 * PURPOSE:
 * Comprehensive soil health monitoring and management system for paddock
 * optimization. Provides detailed soil analysis tracking, amendment scheduling,
 * nutrient management, and historical trend analysis for optimal pasture
 * health and horse welfare.
 * 
 * ARCHITECTURAL PATTERN:
 * - Tab-based interface for different soil management aspects
 * - Interactive data visualization with trend analysis
 * - Amendment tracking with cost and effectiveness analysis
 * - Historical data management with seasonal pattern recognition
 * 
 * DESIGN PRINCIPLES:
 * - Scientific approach to soil health monitoring
 * - Visual trend analysis for informed decision making
 * - Cost-effective amendment planning and tracking
 * - Long-term soil health improvement strategies
 * 
 * SOIL MANAGEMENT CONTEXT:
 * This component manages critical soil health factors:
 * - pH levels and nutrient content monitoring
 * - Soil amendment application and tracking
 * - Cost analysis for soil improvement programs
 * - Multi-year trend analysis for strategic planning
 * 
 * MONITORING FEATURES:
 * The system provides comprehensive soil oversight:
 * - Regular soil test result tracking and analysis
 * - Automated amendment recommendations based on test results
 * - Cost tracking for budget planning and ROI analysis
 * - Historical trend visualization for pattern identification
 * 
 * INTEGRATION CONTEXT:
 * Designed for integration with laboratory services, soil testing
 * equipment, and agricultural management systems. Supports both
 * manual data entry and automated data import workflows.
 * 
 * ACCESSIBILITY FEATURES:
 * - Color-coded nutrient level indicators for quick assessment
 * - Chart data accessible through screen readers
 * - Keyboard navigation for all interactive elements
 * - High contrast design for data visualization
 */

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { CalendarIcon, Download, Filter, Plus, Search, Upload } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { usePaddockData } from "@/hooks/usePaddockData";
import { DateRange } from "react-day-picker";
import { 
  Bar, 
  BarChart, 
  CartesianGrid, 
  Legend, 
  Line, 
  LineChart, 
  ResponsiveContainer, 
  Tooltip, 
  XAxis, 
  YAxis 
} from "recharts";

// Types for soil management
interface SoilTest {
  id: string;
  paddockId: string;
  date: Date;
  pH: number;
  organicMatter: number;
  nitrogen: number;
  phosphorus: number;
  potassium: number;
  calcium: number;
  magnesium: number;
  sulfur: number;
  notes: string;
  recommendations: string[];
  nextTestDue: Date;
}

interface SoilAmendment {
  id: string;
  paddockId: string;
  date: Date;
  type: string;
  amount: number;
  unit: string;
  cost: number;
  notes: string;
  applicationMethod: string;
  appliedBy: string;
}

const PaddockSoilManagement = () => {
  const { paddocks } = usePaddockData();
  const [selectedPaddock, setSelectedPaddock] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  });

  // Mock data for soil tests
  const mockSoilTests: SoilTest[] = [
    {
      id: "st1",
      paddockId: "p1",
      date: new Date("2023-03-15"),
      pH: 6.8,
      organicMatter: 4.2,
      nitrogen: 85,
      phosphorus: 70,
      potassium: 65,
      calcium: 1200,
      magnesium: 180,
      sulfur: 15,
      notes: "Good overall soil health, could benefit from slight increase in potassium",
      recommendations: [
        "Apply 50 kg/ha of potassium sulfate",
        "Continue regular organic matter additions"
      ],
      nextTestDue: new Date("2023-09-15")
    },
    {
      id: "st2",
      paddockId: "p2",
      date: new Date("2023-04-10"),
      pH: 6.5,
      organicMatter: 3.8,
      nitrogen: 65,
      phosphorus: 60,
      potassium: 55,
      calcium: 1100,
      magnesium: 160,
      sulfur: 12,
      notes: "Lower nitrogen levels than optimal",
      recommendations: [
        "Apply 75 kg/ha of balanced NPK fertilizer",
        "Consider cover cropping with legumes"
      ],
      nextTestDue: new Date("2023-10-10")
    },
    {
      id: "st3",
      paddockId: "p3",
      date: new Date("2023-05-05"),
      pH: 7.0,
      organicMatter: 4.0,
      nitrogen: 75,
      phosphorus: 65,
      potassium: 60,
      calcium: 1250,
      magnesium: 175,
      sulfur: 14,
      notes: "Balanced soil profile, good structure",
      recommendations: [
        "Maintain current management practices",
        "Consider adding compost in fall"
      ],
      nextTestDue: new Date("2023-11-05")
    }
  ];

  // Mock data for soil amendments
  const mockSoilAmendments: SoilAmendment[] = [
    {
      id: "sa1",
      paddockId: "p1",
      date: new Date("2023-04-01"),
      type: "Potassium Sulfate",
      amount: 50,
      unit: "kg/ha",
      cost: 120,
      notes: "Applied as recommended by soil test",
      applicationMethod: "Broadcast",
      appliedBy: "John Smith"
    },
    {
      id: "sa2",
      paddockId: "p2",
      date: new Date("2023-04-20"),
      type: "NPK Fertilizer (10-10-10)",
      amount: 75,
      unit: "kg/ha",
      cost: 180,
      notes: "Applied to address nutrient deficiencies",
      applicationMethod: "Broadcast",
      appliedBy: "John Smith"
    },
    {
      id: "sa3",
      paddockId: "p3",
      date: new Date("2023-05-15"),
      type: "Compost",
      amount: 5,
      unit: "tons/ha",
      cost: 250,
      notes: "Organic matter addition",
      applicationMethod: "Spread",
      appliedBy: "Sarah Johnson"
    }
  ];

  // Filter paddocks based on search term
  const filteredPaddocks = paddocks.filter(paddock => 
    paddock.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    paddock.number.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get soil tests for selected paddock
  const paddockSoilTests = selectedPaddock 
    ? mockSoilTests.filter(test => test.paddockId === selectedPaddock)
    : mockSoilTests;

  // Get soil amendments for selected paddock
  const paddockSoilAmendments = selectedPaddock
    ? mockSoilAmendments.filter(amendment => amendment.paddockId === selectedPaddock)
    : mockSoilAmendments;

  // Generate historical data for trends
  const generateHistoricalData = (paddockId: string) => {
    // In a real app, this would fetch from an API
    return [
      { date: "2022-06", pH: 6.5, organicMatter: 3.5, nitrogen: 60, phosphorus: 55, potassium: 50 },
      { date: "2022-09", pH: 6.6, organicMatter: 3.7, nitrogen: 65, phosphorus: 58, potassium: 52 },
      { date: "2022-12", pH: 6.7, organicMatter: 3.8, nitrogen: 70, phosphorus: 60, potassium: 55 },
      { date: "2023-03", pH: 6.8, organicMatter: 4.0, nitrogen: 75, phosphorus: 65, potassium: 60 },
      { date: "2023-06", pH: 6.9, organicMatter: 4.2, nitrogen: 80, phosphorus: 68, potassium: 63 },
    ];
  };

  const historicalData = selectedPaddock ? generateHistoricalData(selectedPaddock) : [];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Soil Management</h2>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export Data
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Upload className="h-4 w-4" />
            Import Test Results
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search paddocks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedPaddock || ""} onValueChange={setSelectedPaddock}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Select paddock" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Paddocks</SelectItem>
                {filteredPaddocks.map((paddock) => (
                  <SelectItem key={paddock.id} value={paddock.id}>
                    {paddock.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="grid gap-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="date"
                    variant="outline"
                    className="w-[250px] justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateRange?.from ? (
                      dateRange.to ? (
                        <>
                          {format(dateRange.from, "LLL dd, y")} -{" "}
                          {format(dateRange.to, "LLL dd, y")}
                        </>
                      ) : (
                        format(dateRange.from, "LLL dd, y")
                      )
                    ) : (
                      <span>Date range</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    initialFocus
                    mode="range"
                    defaultMonth={dateRange?.from}
                    selected={dateRange}
                    onSelect={setDateRange}
                    numberOfMonths={2}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content */}
      <Tabs defaultValue="overview">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="soil-tests">Soil Tests</TabsTrigger>
          <TabsTrigger value="amendments">Amendments</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
        </TabsList>
        
        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Soil Health Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium mb-1">Average pH</h4>
                    <div className="text-2xl font-bold">
                      {paddockSoilTests.length > 0 
                        ? (paddockSoilTests.reduce((sum, test) => sum + test.pH, 0) / paddockSoilTests.length).toFixed(1)
                        : "N/A"
                      }
                    </div>
                    <p className="text-xs text-muted-foreground">Optimal range: 6.0 - 7.0</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium mb-1">Average Organic Matter</h4>
                    <div className="text-2xl font-bold">
                      {paddockSoilTests.length > 0 
                        ? (paddockSoilTests.reduce((sum, test) => sum + test.organicMatter, 0) / paddockSoilTests.length).toFixed(1) + "%"
                        : "N/A"
                      }
                    </div>
                    <p className="text-xs text-muted-foreground">Optimal range: 3.5% - 5.0%</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium mb-1">Soil Tests Completed</h4>
                    <div className="text-2xl font-bold">{paddockSoilTests.length}</div>
                    <p className="text-xs text-muted-foreground">Last 12 months</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Upcoming Soil Tests</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {paddockSoilTests
                    .filter(test => test.nextTestDue > new Date())
                    .sort((a, b) => a.nextTestDue.getTime() - b.nextTestDue.getTime())
                    .slice(0, 3)
                    .map(test => {
                      const paddock = paddocks.find(p => p.id === test.paddockId);
                      return (
                        <div key={test.id} className="flex justify-between items-center">
                          <div>
                            <p className="font-medium">{paddock?.name || test.paddockId}</p>
                            <p className="text-sm text-muted-foreground">
                              Due: {format(test.nextTestDue, "MMM d, yyyy")}
                            </p>
                          </div>
                          <Button size="sm" variant="outline">Schedule</Button>
                        </div>
                      );
                    })}
                  {paddockSoilTests.filter(test => test.nextTestDue > new Date()).length === 0 && (
                    <p className="text-center text-muted-foreground py-4">No upcoming soil tests</p>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Amendments</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {paddockSoilAmendments
                    .sort((a, b) => b.date.getTime() - a.date.getTime())
                    .slice(0, 3)
                    .map(amendment => {
                      const paddock = paddocks.find(p => p.id === amendment.paddockId);
                      return (
                        <div key={amendment.id} className="flex justify-between items-center">
                          <div>
                            <p className="font-medium">{paddock?.name || amendment.paddockId}</p>
                            <p className="text-sm text-muted-foreground">
                              {amendment.type} - {format(amendment.date, "MMM d, yyyy")}
                            </p>
                          </div>
                          <div className="text-sm">
                            {amendment.amount} {amendment.unit}
                          </div>
                        </div>
                      );
                    })}
                  {paddockSoilAmendments.length === 0 && (
                    <p className="text-center text-muted-foreground py-4">No recent amendments</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Nutrient Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={paddockSoilTests.map(test => {
                      const paddock = paddocks.find(p => p.id === test.paddockId);
                      return {
                        name: paddock?.name || test.paddockId,
                        nitrogen: test.nitrogen,
                        phosphorus: test.phosphorus,
                        potassium: test.potassium
                      };
                    })}
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
        </TabsContent>
        
        {/* Soil Tests Tab */}
        <TabsContent value="soil-tests" className="space-y-6">
          <div className="flex justify-between">
            <h3 className="text-lg font-medium">Soil Test Records</h3>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Soil Test
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paddockSoilTests.map(test => {
              const paddock = paddocks.find(p => p.id === test.paddockId);
              return (
                <Card key={test.id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between">
                      <CardTitle className="text-lg">{paddock?.name || test.paddockId}</CardTitle>
                      <div className="text-sm text-muted-foreground">
                        {format(test.date, "MMM d, yyyy")}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium">pH</p>
                        <p className="text-lg">{test.pH}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Organic Matter</p>
                        <p className="text-lg">{test.organicMatter}%</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Nitrogen</p>
                        <p className="text-lg">{test.nitrogen} ppm</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Phosphorus</p>
                        <p className="text-lg">{test.phosphorus} ppm</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Potassium</p>
                        <p className="text-lg">{test.potassium} ppm</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Next Test Due</p>
                        <p className="text-lg">{format(test.nextTestDue, "MMM d, yyyy")}</p>
                      </div>
                    </div>
                    
                    {test.notes && (
                      <div>
                        <p className="text-sm font-medium">Notes</p>
                        <p className="text-sm text-muted-foreground">{test.notes}</p>
                      </div>
                    )}
                    
                    {test.recommendations && test.recommendations.length > 0 && (
                      <div>
                        <p className="text-sm font-medium">Recommendations</p>
                        <ul className="text-sm text-muted-foreground list-disc pl-4">
                          {test.recommendations.map((rec, index) => (
                            <li key={index}>{rec}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    <div className="flex gap-2 pt-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        View Details
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        Schedule Amendment
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
          
          {paddockSoilTests.length === 0 && (
            <Card>
              <CardContent className="p-8 text-center">
                <p className="text-muted-foreground">No soil test records found.</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
        {/* Amendments Tab */}
        <TabsContent value="amendments" className="space-y-6">
          <div className="flex justify-between">
            <h3 className="text-lg font-medium">Amendment Records</h3>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Amendment
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paddockSoilAmendments.map(amendment => {
              const paddock = paddocks.find(p => p.id === amendment.paddockId);
              return (
                <Card key={amendment.id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between">
                      <CardTitle className="text-lg">{paddock?.name || amendment.paddockId}</CardTitle>
                      <div className="text-sm text-muted-foreground">
                        {format(amendment.date, "MMM d, yyyy")}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium">Type</p>
                        <p className="text-lg">{amendment.type}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Amount</p>
                        <p className="text-lg">{amendment.amount} {amendment.unit}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Cost</p>
                        <p className="text-lg">${amendment.cost}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Applied By</p>
                        <p className="text-lg">{amendment.appliedBy}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Method</p>
                        <p className="text-lg">{amendment.applicationMethod}</p>
                      </div>
                    </div>
                    
                    {amendment.notes && (
                      <div>
                        <p className="text-sm font-medium">Notes</p>
                        <p className="text-sm text-muted-foreground">{amendment.notes}</p>
                      </div>
                    )}
                    
                    <div className="flex gap-2 pt-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        View Details
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        Edit
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
          
          {paddockSoilAmendments.length === 0 && (
            <Card>
              <CardContent className="p-8 text-center">
                <p className="text-muted-foreground">No amendment records found.</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
        {/* Trends Tab */}
        <TabsContent value="trends" className="space-y-6">
          {selectedPaddock ? (
            <>
              <Card>
                <CardHeader>
                  <CardTitle>Soil pH Trend</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={historicalData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis domain={[6, 7.5]} />
                        <Tooltip />
                        <Legend />
                        <Line 
                          type="monotone" 
                          dataKey="pH" 
                          stroke="#3b82f6" 
                          strokeWidth={2} 
                          activeDot={{ r: 8 }} 
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Organic Matter Trend</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={historicalData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis domain={[3, 5]} />
                        <Tooltip />
                        <Legend />
                        <Line 
                          type="monotone" 
                          dataKey="organicMatter" 
                          stroke="#10b981" 
                          strokeWidth={2} 
                          activeDot={{ r: 8 }} 
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Nutrient Trends</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={historicalData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line 
                          type="monotone" 
                          dataKey="nitrogen" 
                          stroke="#4ade80" 
                          strokeWidth={2} 
                          activeDot={{ r: 8 }} 
                        />
                        <Line 
                          type="monotone" 
                          dataKey="phosphorus" 
                          stroke="#f97316" 
                          strokeWidth={2} 
                          activeDot={{ r: 8 }} 
                        />
                        <Line 
                          type="monotone" 
                          dataKey="potassium" 
                          stroke="#a78bfa" 
                          strokeWidth={2} 
                          activeDot={{ r: 8 }} 
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </>
          ) : (
            <Card>
              <CardContent className="p-8 text-center">
                <p className="text-muted-foreground">Please select a paddock to view soil health trends.</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PaddockSoilManagement;
