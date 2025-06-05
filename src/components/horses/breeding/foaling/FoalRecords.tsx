
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Baby, Search, Plus, Heart, Calendar, Trophy } from "lucide-react";
import FoalRecordCard from "./components/FoalRecordCard";

const FoalRecords = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const foalRecords = [
    {
      id: "F001",
      foalName: "Thunder's Storm",
      registrationNumber: "AR2024001",
      birthDate: "2024-01-02",
      gender: "male",
      mareName: "Whisper",
      stallionName: "Thunder",
      color: "Bay",
      markings: "White star on forehead",
      birthWeight: 45,
      currentWeight: 85,
      height: 105,
      healthStatus: "healthy",
      vaccinationStatus: "up_to_date",
      nextVaccination: "2024-02-15",
      microchipId: "MC2024001",
      passportNumber: "HP2024001",
      notes: "Excellent development, strong and healthy",
      achievements: ["Best Foal Show 2024"],
    },
    {
      id: "F002",
      foalName: "Lightning's Grace",
      registrationNumber: "AR2023045",
      birthDate: "2023-12-28",
      gender: "female",
      mareName: "Grace",
      stallionName: "Lightning",
      color: "Chestnut",
      markings: "White blaze and two white socks",
      birthWeight: 42,
      currentWeight: 78,
      height: 98,
      healthStatus: "healthy",
      vaccinationStatus: "up_to_date",
      nextVaccination: "2024-02-10",
      microchipId: "MC2023045",
      passportNumber: "HP2023045",
      notes: "Beautiful filly with excellent conformation",
      achievements: [],
    },
    {
      id: "F003",
      foalName: "Storm's Pride",
      registrationNumber: "AR2023038",
      birthDate: "2023-11-15",
      gender: "male",
      mareName: "Bella",
      stallionName: "Storm",
      color: "Gray",
      markings: "Dark mane and tail",
      birthWeight: 48,
      currentWeight: 92,
      height: 108,
      healthStatus: "monitoring",
      vaccinationStatus: "up_to_date",
      nextVaccination: "2024-01-20",
      microchipId: "MC2023038",
      passportNumber: "HP2023038",
      notes: "Under veterinary supervision for leg development",
      achievements: [],
    },
  ];

  const filteredRecords = foalRecords.filter(record => {
    const matchesSearch = record.foalName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.registrationNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.mareName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.stallionName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || record.healthStatus === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const stats = {
    totalFoals: foalRecords.length,
    healthyFoals: foalRecords.filter(r => r.healthStatus === "healthy").length,
    monitoringFoals: foalRecords.filter(r => r.healthStatus === "monitoring").length,
    avgWeight: Math.round(foalRecords.reduce((sum, r) => sum + r.currentWeight, 0) / foalRecords.length),
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">Foal Registry</h2>
          <p className="text-muted-foreground">Complete foal records and development tracking</p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Foal
        </Button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <Baby className="h-6 w-6 text-blue-500 mx-auto mb-2" />
            <div className="text-2xl font-bold">{stats.totalFoals}</div>
            <p className="text-sm text-muted-foreground">Total Foals</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Heart className="h-6 w-6 text-green-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-green-600">{stats.healthyFoals}</div>
            <p className="text-sm text-muted-foreground">Healthy</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Calendar className="h-6 w-6 text-orange-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-orange-600">{stats.monitoringFoals}</div>
            <p className="text-sm text-muted-foreground">Monitoring</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Trophy className="h-6 w-6 text-purple-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-purple-600">{stats.avgWeight}kg</div>
            <p className="text-sm text-muted-foreground">Avg Weight</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search by foal name, registration, or parents..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button 
                variant={statusFilter === "all" ? "default" : "outline"}
                onClick={() => setStatusFilter("all")}
              >
                All
              </Button>
              <Button 
                variant={statusFilter === "healthy" ? "default" : "outline"}
                onClick={() => setStatusFilter("healthy")}
              >
                Healthy
              </Button>
              <Button 
                variant={statusFilter === "monitoring" ? "default" : "outline"}
                onClick={() => setStatusFilter("monitoring")}
              >
                Monitoring
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Foal Records Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredRecords.map((record) => (
          <FoalRecordCard key={record.id} record={record} />
        ))}
      </div>
    </div>
  );
};

export default FoalRecords;
