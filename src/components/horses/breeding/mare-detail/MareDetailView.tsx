
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Heart, Baby, Calendar, Activity } from "lucide-react";
import MareBasicInfoTable from "./tables/MareBasicInfoTable";
import MareBreedingHistoryTable from "./tables/MareBreedingHistoryTable";
import MarePregnancyTable from "./tables/MarePregnancyTable";
import MareFoalingHistoryTable from "./tables/MareFoalingHistoryTable";
import MareHealthRecordsTable from "./tables/MareHealthRecordsTable";
import MareHeatCycleTable from "./tables/MareHeatCycleTable";

const MareDetailView = () => {
  const { mareId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("basic-info");

  // Mock mare data - in real app this would come from API
  const mare = {
    id: mareId,
    name: "Luna Belle",
    status: "pregnant",
    age: 6,
    breed: "Arabian",
    image: "/placeholder.svg",
    pregnancyDay: 280,
    expectedDueDate: "2024-04-15",
    totalFoals: 2,
    liveFoals: 2,
    lastBreedingDate: "2023-07-20",
    stallionName: "Thunder Storm"
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pregnant": return "bg-blue-500";
      case "open": return "bg-green-500";
      case "nursing": return "bg-purple-500";
      case "bred": return "bg-orange-500";
      case "retired": return "bg-gray-500";
      default: return "bg-gray-500";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pregnant": return <Baby className="h-4 w-4" />;
      case "nursing": return <Heart className="h-4 w-4" />;
      case "open": return <Calendar className="h-4 w-4" />;
      default: return <Activity className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate(-1)}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Mares
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-slate-800">{mare.name}</h1>
            <p className="text-muted-foreground">Mare ID: {mare.id}</p>
          </div>
        </div>
        <Badge className={`${getStatusColor(mare.status)} text-white flex items-center gap-1`}>
          {getStatusIcon(mare.status)}
          {mare.status.toUpperCase()}
        </Badge>
      </div>

      {/* Mare Summary Card */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-xl text-slate-800">Mare Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="flex items-center space-x-4">
              <img 
                src={mare.image} 
                alt={mare.name}
                className="w-16 h-16 rounded-full object-cover border-2 border-blue-200"
              />
              <div>
                <p className="font-semibold text-slate-700">{mare.breed}</p>
                <p className="text-sm text-muted-foreground">Age: {mare.age} years</p>
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{mare.totalFoals}</div>
              <p className="text-sm text-muted-foreground">Total Foals</p>
            </div>
            
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{mare.liveFoals}</div>
              <p className="text-sm text-muted-foreground">Live Foals</p>
            </div>
            
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{mare.pregnancyDay}</div>
              <p className="text-sm text-muted-foreground">Pregnancy Day</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabbed Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-6 bg-slate-100 p-1 h-12">
          <TabsTrigger 
            value="basic-info"
            className="text-slate-700 data-[state=active]:bg-blue-500 data-[state=active]:text-white font-medium transition-all"
          >
            Basic Info
          </TabsTrigger>
          <TabsTrigger 
            value="breeding-history"
            className="text-slate-700 data-[state=active]:bg-blue-500 data-[state=active]:text-white font-medium transition-all"
          >
            Breeding History
          </TabsTrigger>
          <TabsTrigger 
            value="pregnancy"
            className="text-slate-700 data-[state=active]:bg-blue-500 data-[state=active]:text-white font-medium transition-all"
          >
            Pregnancy
          </TabsTrigger>
          <TabsTrigger 
            value="foaling"
            className="text-slate-700 data-[state=active]:bg-blue-500 data-[state=active]:text-white font-medium transition-all"
          >
            Foaling History
          </TabsTrigger>
          <TabsTrigger 
            value="health"
            className="text-slate-700 data-[state=active]:bg-blue-500 data-[state=active]:text-white font-medium transition-all"
          >
            Health Records
          </TabsTrigger>
          <TabsTrigger 
            value="heat-cycle"
            className="text-slate-700 data-[state=active]:bg-blue-500 data-[state=active]:text-white font-medium transition-all"
          >
            Heat Cycles
          </TabsTrigger>
        </TabsList>

        <TabsContent value="basic-info" className="mt-6">
          <MareBasicInfoTable mareId={mare.id} />
        </TabsContent>

        <TabsContent value="breeding-history" className="mt-6">
          <MareBreedingHistoryTable mareId={mare.id} />
        </TabsContent>

        <TabsContent value="pregnancy" className="mt-6">
          <MarePregnancyTable mareId={mare.id} />
        </TabsContent>

        <TabsContent value="foaling" className="mt-6">
          <MareFoalingHistoryTable mareId={mare.id} />
        </TabsContent>

        <TabsContent value="health" className="mt-6">
          <MareHealthRecordsTable mareId={mare.id} />
        </TabsContent>

        <TabsContent value="heat-cycle" className="mt-6">
          <MareHeatCycleTable mareId={mare.id} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MareDetailView;
