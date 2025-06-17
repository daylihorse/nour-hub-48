/**
 * Component: PaddockEnvironmentalMonitoring
 * 
 * PURPOSE:
 * Advanced environmental monitoring and control system for paddock management.
 * Provides real-time weather tracking, irrigation management, climate control,
 * and comprehensive environmental analytics for optimal horse welfare and
 * paddock condition maintenance.
 * 
 * ARCHITECTURAL PATTERN:
 * - Tab-based interface for different environmental aspects
 * - Real-time data visualization with interactive charts
 * - Alert system for environmental condition monitoring
 * - Automated system control and scheduling capabilities
 * 
 * DESIGN PRINCIPLES:
 * - Real-time monitoring with live data updates
 * - Visual analytics for trend identification and analysis
 * - Proactive alert system for preventive management
 * - Integrated control system for automated responses
 * 
 * ENVIRONMENTAL CONTEXT:
 * This component manages critical environmental factors:
 * - Weather conditions and forecasting
 * - Irrigation system control and water management
 * - Climate control for horse comfort optimization
 * - Environmental performance analytics and reporting
 * 
 * MONITORING FEATURES:
 * The system provides comprehensive environmental oversight:
 * - Real-time weather data with 24-hour forecasting
 * - Multi-zone irrigation system management
 * - Automated climate control with energy monitoring
 * - Performance analytics with optimization recommendations
 * 
 * INTEGRATION CONTEXT:
 * Designed for integration with IoT sensors, weather APIs, and
 * automated control systems. Supports both manual override and
 * fully automated environmental management workflows.
 * 
 * ACCESSIBILITY FEATURES:
 * - Color-coded status indicators for quick assessment
 * - Chart data accessible through screen readers
 * - Keyboard navigation for all interactive elements
 * - High contrast design for critical alerts and status information
 */

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell
} from 'recharts';
import { 
  Cloud, Droplets, Thermometer, Wind, Sun, AlertTriangle, 
  Settings, Calendar, TrendingUp, CloudRain, Eye, 
  WifiOff, CheckCircle, XCircle, Gauge, Zap, Activity
} from 'lucide-react';

/**
 * Weather monitoring data structure for environmental tracking.
 * Contains comprehensive meteorological information for paddock management.
 */
interface WeatherData {
  /** Unique identifier for weather data record */
  id: string;
  
  /** ISO timestamp for data collection time */
  timestamp: string;
  
  /** Temperature in Celsius for horse comfort assessment */
  temperature: number;
  
  /** Relative humidity percentage for comfort and health monitoring */
  humidity: number;
  
  /** Rainfall measurement in millimeters for irrigation planning */
  rainfall: number;
  
  /** Wind speed in kilometers per hour for safety assessment */
  windSpeed: number;
  
  /** Atmospheric pressure in hectopascals for weather prediction */
  pressure: number;
  
  /** UV index for sun exposure risk assessment */
  uvIndex: number;
  
  /** Visibility distance in kilometers for operational safety */
  visibility: number;
}

/**
 * Irrigation system configuration and status tracking.
 * Manages water distribution systems across paddock zones.
 */
interface IrrigationSystem {
  /** Unique identifier for irrigation system */
  id: string;
  
  /** Associated paddock identifier for zone mapping */
  paddockId: string;
  
  /** Human-readable system name for identification */
  name: string;
  
  /** System type determining water distribution method */
  type: 'sprinkler' | 'drip' | 'flood' | 'misting';
  
  /** Current operational status of the irrigation system */
  status: 'active' | 'inactive' | 'maintenance' | 'error';
  
  /** Scheduled operation times in human-readable format */
  schedule: string;
  
  /** Current water flow rate in liters per minute */
  waterFlow: number;
  
  /** Water pressure measurement in PSI */
  pressure: number;
  
  /** Area coverage percentage for effectiveness tracking */
  coverage: number;
  
  /** Last maintenance date for scheduling tracking */
  lastMaintenance: string;
  
  /** Next scheduled maintenance date */
  nextScheduled: string;
}

/**
 * Environmental alert system for proactive monitoring.
 * Tracks and manages environmental condition warnings and notifications.
 */
interface EnvironmentalAlert {
  /** Unique identifier for alert record */
  id: string;
  
  /** Alert category for classification and routing */
  type: 'weather' | 'irrigation' | 'temperature' | 'humidity' | 'system';
  
  /** Alert urgency level for prioritization */
  severity: 'low' | 'medium' | 'high' | 'critical';
  
  /** Human-readable alert description */
  message: string;
  
  /** Alert generation timestamp */
  timestamp: string;
  
  /** Current alert status for workflow tracking */
  status: 'active' | 'acknowledged' | 'resolved';
  
  /** Associated paddock for location-specific alerts */
  paddockId: string;
}

/**
 * Climate control system management and monitoring.
 * Manages automated environmental control equipment.
 */
interface ClimateControl {
  /** Unique identifier for climate control system */
  id: string;
  
  /** Associated paddock for zone-specific control */
  paddockId: string;
  
  /** Type of climate control system */
  type: 'heating' | 'cooling' | 'ventilation' | 'shade';
  
  /** Current operational status */
  status: 'on' | 'off' | 'auto' | 'maintenance';
  
  /** Target temperature for automated control (optional) */
  targetTemperature?: number;
  
  /** Current measured temperature in the control zone */
  currentTemperature: number;
  
  /** Power consumption in kilowatts for energy monitoring */
  powerConsumption: number;
  
  /** System efficiency percentage for performance tracking */
  efficiency: number;
}

const PaddockEnvironmentalMonitoring: React.FC = () => {
  /** Currently selected paddock for environmental monitoring */
  const [selectedPaddock, setSelectedPaddock] = useState('paddock-1');
  
  /** Active tab state for navigation between monitoring aspects */
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data - in real app, this would come from APIs
  const weatherData: WeatherData[] = [
    { id: '1', timestamp: '2024-01-15 06:00', temperature: 18, humidity: 75, rainfall: 0, windSpeed: 12, pressure: 1013, uvIndex: 2, visibility: 10 },
    { id: '2', timestamp: '2024-01-15 09:00', temperature: 22, humidity: 68, rainfall: 0, windSpeed: 15, pressure: 1014, uvIndex: 5, visibility: 10 },
    { id: '3', timestamp: '2024-01-15 12:00', temperature: 28, humidity: 55, rainfall: 0, windSpeed: 18, pressure: 1012, uvIndex: 8, visibility: 10 },
    { id: '4', timestamp: '2024-01-15 15:00', temperature: 31, humidity: 48, rainfall: 0, windSpeed: 20, pressure: 1010, uvIndex: 9, visibility: 8 },
    { id: '5', timestamp: '2024-01-15 18:00', temperature: 26, humidity: 62, rainfall: 2.5, windSpeed: 22, pressure: 1008, uvIndex: 4, visibility: 6 },
    { id: '6', timestamp: '2024-01-15 21:00', temperature: 20, humidity: 78, rainfall: 5.2, windSpeed: 18, pressure: 1009, uvIndex: 0, visibility: 4 }
  ];

  const irrigationSystems: IrrigationSystem[] = [
    {
      id: 'irr-1',
      paddockId: 'paddock-1',
      name: 'North Zone Sprinklers',
      type: 'sprinkler',
      status: 'active',
      schedule: 'Daily 06:00, 18:00',
      waterFlow: 85,
      pressure: 45,
      coverage: 95,
      lastMaintenance: '2024-01-10',
      nextScheduled: '2024-01-20'
    },
    {
      id: 'irr-2',
      paddockId: 'paddock-1',
      name: 'South Zone Drip System',
      type: 'drip',
      status: 'inactive',
      schedule: 'Daily 05:30, 17:30',
      waterFlow: 65,
      pressure: 30,
      coverage: 88,
      lastMaintenance: '2024-01-08',
      nextScheduled: '2024-01-18'
    },
    {
      id: 'irr-3',
      paddockId: 'paddock-1',
      name: 'Central Misting System',
      type: 'misting',
      status: 'error',
      schedule: 'Temperature triggered >30°C',
      waterFlow: 0,
      pressure: 0,
      coverage: 0,
      lastMaintenance: '2024-01-05',
      nextScheduled: '2024-01-16'
    }
  ];

  const environmentalAlerts: EnvironmentalAlert[] = [
    {
      id: 'alert-1',
      type: 'irrigation',
      severity: 'high',
      message: 'Central Misting System offline - high temperature alert',
      timestamp: '2024-01-15 14:30',
      status: 'active',
      paddockId: 'paddock-1'
    },
    {
      id: 'alert-2',
      type: 'weather',
      severity: 'medium',
      message: 'Heavy rain expected - consider shelter preparation',
      timestamp: '2024-01-15 16:45',
      status: 'acknowledged',
      paddockId: 'paddock-1'
    },
    {
      id: 'alert-3',
      type: 'temperature',
      severity: 'low',
      message: 'Temperature rising above optimal range',
      timestamp: '2024-01-15 13:15',
      status: 'resolved',
      paddockId: 'paddock-1'
    }
  ];

  const climateControls: ClimateControl[] = [
    {
      id: 'climate-1',
      paddockId: 'paddock-1',
      type: 'shade',
      status: 'auto',
      currentTemperature: 31,
      powerConsumption: 0,
      efficiency: 85
    },
    {
      id: 'climate-2',
      paddockId: 'paddock-1',
      type: 'ventilation',
      status: 'on',
      currentTemperature: 28,
      powerConsumption: 2.4,
      efficiency: 92
    },
    {
      id: 'climate-3',
      paddockId: 'paddock-1',
      type: 'cooling',
      status: 'auto',
      targetTemperature: 25,
      currentTemperature: 31,
      powerConsumption: 5.8,
      efficiency: 78
    }
  ];

  /**
   * Determines the appropriate color scheme for system status indicators.
   * 
   * STATUS COLOR MAPPING:
   * - active/on/resolved: Green for operational systems
   * - inactive/off/acknowledged: Yellow for standby systems
   * - maintenance/auto: Blue for automated or maintenance modes
   * - error/critical: Red for systems requiring attention
   * - default: Gray for unknown or transitional states
   * 
   * @param status The current system status
   * @returns CSS classes for status styling
   */
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
      case 'on':
      case 'resolved':
        return 'text-green-600 bg-green-100';
      case 'inactive':
      case 'off':
      case 'acknowledged':
        return 'text-yellow-600 bg-yellow-100';
      case 'maintenance':
      case 'auto':
        return 'text-blue-600 bg-blue-100';
      case 'error':
      case 'critical':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  /**
   * Determines the appropriate color scheme for alert severity indicators.
   * 
   * SEVERITY COLOR MAPPING:
   * - low: Blue for informational alerts
   * - medium: Yellow for caution alerts
   * - high: Orange for warning alerts
   * - critical: Red for emergency alerts
   * - default: Gray for unspecified severity
   * 
   * @param severity The alert severity level
   * @returns CSS classes for severity styling
   */
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low':
        return 'text-blue-600 bg-blue-100';
      case 'medium':
        return 'text-yellow-600 bg-yellow-100';
      case 'high':
        return 'text-orange-600 bg-orange-100';
      case 'critical':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  /** Current weather conditions for real-time display */
  const currentWeather = weatherData[weatherData.length - 1];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Environmental Monitoring</h2>
          <p className="text-muted-foreground">
            Monitor and control paddock environmental conditions
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Settings className="h-4 w-4 mr-2" />
            Configure Alerts
          </Button>
          <Button size="sm">
            <Activity className="h-4 w-4 mr-2" />
            Real-time Dashboard
          </Button>
        </div>
      </div>

      {/* Current Conditions Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="flex items-center p-6">
            <Thermometer className="h-8 w-8 text-red-500 mr-4" />
            <div>
              <p className="text-2xl font-bold">{currentWeather.temperature}°C</p>
              <p className="text-sm text-muted-foreground">Temperature</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center p-6">
            <Droplets className="h-8 w-8 text-blue-500 mr-4" />
            <div>
              <p className="text-2xl font-bold">{currentWeather.humidity}%</p>
              <p className="text-sm text-muted-foreground">Humidity</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center p-6">
            <Wind className="h-8 w-8 text-gray-500 mr-4" />
            <div>
              <p className="text-2xl font-bold">{currentWeather.windSpeed} km/h</p>
              <p className="text-sm text-muted-foreground">Wind Speed</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center p-6">
            <CloudRain className="h-8 w-8 text-blue-600 mr-4" />
            <div>
              <p className="text-2xl font-bold">{currentWeather.rainfall} mm</p>
              <p className="text-sm text-muted-foreground">Rainfall (24h)</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Environmental Alerts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <AlertTriangle className="h-5 w-5 mr-2" />
            Environmental Alerts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {environmentalAlerts.map((alert) => (
              <Alert key={alert.id} className={alert.severity === 'high' || alert.severity === 'critical' ? 'border-red-200' : ''}>
                <AlertDescription className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Badge className={getSeverityColor(alert.severity)}>
                      {alert.severity.toUpperCase()}
                    </Badge>
                    <span>{alert.message}</span>
                    <span className="text-sm text-muted-foreground">{alert.timestamp}</span>
                  </div>
                  <Badge className={getStatusColor(alert.status)}>
                    {alert.status}
                  </Badge>
                </AlertDescription>
              </Alert>
            ))}
          </div>
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Weather Overview</TabsTrigger>
          <TabsTrigger value="irrigation">Irrigation Systems</TabsTrigger>
          <TabsTrigger value="climate">Climate Control</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Temperature & Humidity Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={weatherData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="timestamp" />
                    <YAxis yAxisId="temp" orientation="left" />
                    <YAxis yAxisId="humidity" orientation="right" />
                    <Tooltip />
                    <Legend />
                    <Line yAxisId="temp" type="monotone" dataKey="temperature" stroke="#ef4444" name="Temperature (°C)" />
                    <Line yAxisId="humidity" type="monotone" dataKey="humidity" stroke="#3b82f6" name="Humidity (%)" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Weather Conditions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <Gauge className="h-4 w-4 text-gray-600" />
                    <span className="text-sm">Pressure: {currentWeather.pressure} hPa</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Sun className="h-4 w-4 text-yellow-600" />
                    <span className="text-sm">UV Index: {currentWeather.uvIndex}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Eye className="h-4 w-4 text-blue-600" />
                    <span className="text-sm">Visibility: {currentWeather.visibility} km</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Cloud className="h-4 w-4 text-gray-600" />
                    <span className="text-sm">Conditions: Clear</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Heat Index</span>
                    <span>32°C</span>
                  </div>
                  <Progress value={65} className="h-2" />
                  
                  <div className="flex justify-between text-sm">
                    <span>Comfort Level</span>
                    <span>Moderate</span>
                  </div>
                  <Progress value={45} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>24-Hour Weather Forecast</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="text-center space-y-2">
                    <p className="text-sm text-muted-foreground">{6 + i * 3}:00</p>
                    <Sun className="h-6 w-6 mx-auto text-yellow-500" />
                    <p className="text-sm font-medium">{25 + Math.floor(Math.random() * 8)}°C</p>
                    <p className="text-xs text-muted-foreground">{Math.floor(Math.random() * 20)}%</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="irrigation" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Irrigation Systems Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {irrigationSystems.map((system) => (
                    <div key={system.id} className="border rounded-lg p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">{system.name}</h4>
                        <Badge className={getStatusColor(system.status)}>
                          {system.status}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Type: </span>
                          <span className="capitalize">{system.type}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Schedule: </span>
                          <span>{system.schedule}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Water Flow: </span>
                          <span>{system.waterFlow} L/min</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Pressure: </span>
                          <span>{system.pressure} PSI</span>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Coverage</span>
                          <span>{system.coverage}%</span>
                        </div>
                        <Progress value={system.coverage} className="h-2" />
                      </div>
                      
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Settings className="h-4 w-4 mr-1" />
                          Configure
                        </Button>
                        <Button size="sm" variant="outline">
                          <Calendar className="h-4 w-4 mr-1" />
                          Schedule
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Water Usage Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={[
                    { name: 'Mon', usage: 450, target: 400 },
                    { name: 'Tue', usage: 380, target: 400 },
                    { name: 'Wed', usage: 520, target: 400 },
                    { name: 'Thu', usage: 420, target: 400 },
                    { name: 'Fri', usage: 390, target: 400 },
                    { name: 'Sat', usage: 480, target: 400 },
                    { name: 'Sun', usage: 410, target: 400 }
                  ]}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="usage" fill="#3b82f6" name="Actual Usage (L)" />
                    <Bar dataKey="target" fill="#ef4444" name="Target Usage (L)" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="climate" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Climate Control Systems</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {climateControls.map((control) => (
                    <div key={control.id} className="border rounded-lg p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium capitalize">{control.type} System</h4>
                        <div className="flex items-center space-x-2">
                          <Badge className={getStatusColor(control.status)}>
                            {control.status}
                          </Badge>
                          <Switch checked={control.status === 'on' || control.status === 'auto'} />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Current Temp: </span>
                          <span>{control.currentTemperature}°C</span>
                        </div>
                        {control.targetTemperature && (
                          <div>
                            <span className="text-muted-foreground">Target Temp: </span>
                            <span>{control.targetTemperature}°C</span>
                          </div>
                        )}
                        <div>
                          <span className="text-muted-foreground">Power: </span>
                          <span>{control.powerConsumption} kW</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Efficiency: </span>
                          <span>{control.efficiency}%</span>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Performance</span>
                          <span>{control.efficiency}%</span>
                        </div>
                        <Progress value={control.efficiency} className="h-2" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Energy Consumption</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={[
                        { name: 'Cooling', value: 45, fill: '#3b82f6' },
                        { name: 'Ventilation', value: 25, fill: '#10b981' },
                        { name: 'Heating', value: 20, fill: '#f59e0b' },
                        { name: 'Lighting', value: 10, fill: '#ef4444' }
                      ]}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Total Daily Consumption</span>
                    <span className="font-medium">24.8 kWh</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Estimated Monthly Cost</span>
                    <span className="font-medium">$186.00</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Efficiency Rating</span>
                    <span className="font-medium text-green-600">85%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Environmental Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={weatherData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="timestamp" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="temperature" stroke="#ef4444" name="Temperature" />
                    <Line type="monotone" dataKey="pressure" stroke="#3b82f6" name="Pressure" />
                    <Line type="monotone" dataKey="uvIndex" stroke="#f59e0b" name="UV Index" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>System Performance</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Overall System Health</span>
                      <span>92%</span>
                    </div>
                    <Progress value={92} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Irrigation Efficiency</span>
                      <span>88%</span>
                    </div>
                    <Progress value={88} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Climate Control Efficiency</span>
                      <span>85%</span>
                    </div>
                    <Progress value={85} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Energy Efficiency</span>
                      <span>78%</span>
                    </div>
                    <Progress value={78} className="h-2" />
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <h4 className="font-medium mb-3">Recommendations</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-start space-x-2">
                      <TrendingUp className="h-4 w-4 text-green-600 mt-0.5" />
                      <span>Optimize irrigation schedule to reduce water usage by 15%</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <Zap className="h-4 w-4 text-yellow-600 mt-0.5" />
                      <span>Schedule maintenance for misting system to improve efficiency</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <CheckCircle className="h-4 w-4 text-blue-600 mt-0.5" />
                      <span>Consider automated shade deployment during peak heat hours</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PaddockEnvironmentalMonitoring;
