
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Thermometer, Heart, Plus, TrendingUp } from "lucide-react";
import CycleCalendar from "./components/CycleCalendar";
import HeatRecords from "./components/HeatRecords";
import BreedingWindows from "./components/BreedingWindows";
import CycleAnalytics from "./components/CycleAnalytics";

interface HeatCycle {
  id: string;
  mareId: string;
  mareName: string;
  cycleStartDate: Date;
  estimatedOvulation: Date;
  actualOvulation?: Date;
  cycleEndDate?: Date;
  cycleLength: number;
  cycleDay: number;
  status: 'in_heat' | 'ovulated' | 'luteal' | 'anestrus';
  breedingWindow: {
    start: Date;
    end: Date;
    optimal: Date;
  };
  signs: string[];
  veterinaryNotes?: string;
  breedingAttempts: number;
  successful: boolean;
}

const MareHeatCycleTracking = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedMare, setSelectedMare] = useState<string | null>(null);

  const heatCycles: HeatCycle[] = [
    {
      id: "HC001",
      mareId: "M001",
      mareName: "Whisper",
      cycleStartDate: new Date("2024-01-15"),
      estimatedOvulation: new Date("2024-01-21"),
      actualOvulation: new Date("2024-01-22"),
      cycleEndDate: new Date("2024-01-26"),
      cycleLength: 21,
      cycleDay: 7,
      status: "ovulated",
      breedingWindow: {
        start: new Date("2024-01-20"),
        end: new Date("2024-01-24"),
        optimal: new Date("2024-01-22")
      },
      signs: ["Winking", "Squatting", "Receptive to stallion"],
      veterinaryNotes: "Strong ovulation detected via ultrasound",
      breedingAttempts: 2,
      successful: true
    },
    {
      id: "HC002",
      mareId: "M002",
      mareName: "Grace",
      cycleStartDate: new Date("2024-01-20"),
      estimatedOvulation: new Date("2024-01-26"),
      cycleLength: 22,
      cycleDay: 12,
      status: "in_heat",
      breedingWindow: {
        start: new Date("2024-01-25"),
        end: new Date("2024-01-29"),
        optimal: new Date("2024-01-27")
      },
      signs: ["Tail raising", "Mare showing interest"],
      breedingAttempts: 0,
      successful: false
    }
  ];

  const getStatusBadge = (status: string) => {
    const statusMap = {
      in_heat: { variant: "default" as const, label: "In Heat", color: "text-red-600" },
      ovulated: { variant: "secondary" as const, label: "Ovulated", color: "text-green-600" },
      luteal: { variant: "outline" as const, label: "Luteal Phase", color: "text-yellow-600" },
      anestrus: { variant: "outline" as const, label: "Anestrus", color: "text-gray-600" }
    };
    
    return (
      <Badge variant={statusMap[status as keyof typeof statusMap]?.variant || "outline"}>
        {statusMap[status as keyof typeof statusMap]?.label || status}
      </Badge>
    );
  };

  const cycleStats = {
    totalMares: heatCycles.length,
    inHeat: heatCycles.filter(c => c.status === 'in_heat').length,
    ovulated: heatCycles.filter(c => c.status === 'ovulated').length,
    avgCycleLength: Math.round(heatCycles.reduce((sum, c) => sum + c.cycleLength, 0) / heatCycles.length),
    successRate: Math.round((heatCycles.filter(c => c.successful).length / heatCycles.length) * 100)
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-purple-900">Heat Cycle Tracking</h2>
          <p className="text-slate-600">
            Monitor estrus cycles and optimize breeding timing for all mares
          </p>
        </div>
        <Button className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700">
          <Plus className="h-4 w-4" />
          Record Heat Cycle
        </Button>
      </div>

      {/* Cycle Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card className="border-purple-200">
          <CardContent className="p-4 text-center">
            <Heart className="h-6 w-6 text-pink-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-purple-900">{cycleStats.totalMares}</div>
            <p className="text-sm text-slate-600">Tracked Mares</p>
          </CardContent>
        </Card>
        <Card className="border-purple-200">
          <CardContent className="p-4 text-center">
            <div className="h-6 w-6 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <div className="h-3 w-3 bg-red-500 rounded-full"></div>
            </div>
            <div className="text-2xl font-bold text-purple-900">{cycleStats.inHeat}</div>
            <p className="text-sm text-slate-600">In Heat</p>
          </CardContent>
        </Card>
        <Card className="border-purple-200">
          <CardContent className="p-4 text-center">
            <div className="h-6 w-6 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <div className="h-3 w-3 bg-green-500 rounded-full"></div>
            </div>
            <div className="text-2xl font-bold text-purple-900">{cycleStats.ovulated}</div>
            <p className="text-sm text-slate-600">Recently Ovulated</p>
          </CardContent>
        </Card>
        <Card className="border-purple-200">
          <CardContent className="p-4 text-center">
            <Calendar className="h-6 w-6 text-blue-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-purple-900">{cycleStats.avgCycleLength}</div>
            <p className="text-sm text-slate-600">Avg Cycle (days)</p>
          </CardContent>
        </Card>
        <Card className="border-purple-200">
          <CardContent className="p-4 text-center">
            <TrendingUp className="h-6 w-6 text-green-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-purple-900">{cycleStats.successRate}%</div>
            <p className="text-sm text-slate-600">Success Rate</p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-purple-50 border border-purple-200 p-1 h-12">
          <TabsTrigger 
            value="overview"
            className="text-purple-700 data-[state=active]:bg-purple-500 data-[state=active]:text-white font-medium"
          >
            Overview
          </TabsTrigger>
          <TabsTrigger 
            value="calendar"
            className="text-purple-700 data-[state=active]:bg-purple-500 data-[state=active]:text-white font-medium"
          >
            Heat Calendar
          </TabsTrigger>
          <TabsTrigger 
            value="breeding-windows"
            className="text-purple-700 data-[state=active]:bg-purple-500 data-[state=active]:text-white font-medium"
          >
            Breeding Windows
          </TabsTrigger>
          <TabsTrigger 
            value="analytics"
            className="text-purple-700 data-[state=active]:bg-purple-500 data-[state=active]:text-white font-medium"
          >
            Analytics
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <HeatRecords 
            heatCycles={heatCycles}
            getStatusBadge={getStatusBadge}
            onMareSelect={setSelectedMare}
          />
        </TabsContent>

        <TabsContent value="calendar" className="mt-6">
          <CycleCalendar heatCycles={heatCycles} />
        </TabsContent>

        <TabsContent value="breeding-windows" className="mt-6">
          <BreedingWindows heatCycles={heatCycles} getStatusBadge={getStatusBadge} />
        </TabsContent>

        <TabsContent value="analytics" className="mt-6">
          <CycleAnalytics heatCycles={heatCycles} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MareHeatCycleTracking;
