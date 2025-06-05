
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Baby, Search, Plus, Calendar, Weight, Clock } from "lucide-react";
import BirthRecordCard from "./components/BirthRecordCard";
import AddBirthRecordDialog from "./dialogs/AddBirthRecordDialog";

const BirthRecords = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showAddDialog, setShowAddDialog] = useState(false);

  const birthRecords = [
    {
      id: "BR001",
      foalName: "Thunder's Storm",
      mareName: "Whisper",
      stallionName: "Thunder",
      birthDate: "2024-01-02",
      birthTime: "03:45",
      gender: "male",
      birthWeight: 45,
      height: 95,
      status: "healthy",
      complications: "None",
      veterinarian: "Dr. Smith",
      registrationNumber: "AR2024001",
      color: "Bay",
      markings: "White star on forehead",
      notes: "Strong healthy colt, standing and nursing well",
    },
    {
      id: "BR002",
      foalName: "Lightning's Grace",
      mareName: "Grace",
      stallionName: "Lightning",
      birthDate: "2023-12-28",
      birthTime: "14:20",
      gender: "female",
      birthWeight: 42,
      height: 92,
      status: "healthy",
      complications: "Minor dystocia",
      veterinarian: "Dr. Johnson",
      registrationNumber: "AR2023045",
      color: "Chestnut",
      markings: "White blaze and two white socks",
      notes: "Assisted delivery, foal doing well post-birth",
    },
    {
      id: "BR003",
      foalName: "Storm's Pride",
      mareName: "Bella",
      stallionName: "Storm",
      birthDate: "2023-11-15",
      birthTime: "08:10",
      gender: "male",
      birthWeight: 48,
      height: 98,
      status: "needs_attention",
      complications: "Weak pasterns",
      veterinarian: "Dr. Smith",
      registrationNumber: "AR2023038",
      color: "Gray",
      markings: "Dark mane and tail",
      notes: "Monitoring leg development, physical therapy recommended",
    },
  ];

  const filteredRecords = birthRecords.filter(record => {
    const matchesSearch = record.foalName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.mareName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.stallionName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || record.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const stats = {
    totalBirths: birthRecords.length,
    healthyFoals: birthRecords.filter(r => r.status === "healthy").length,
    needsAttention: birthRecords.filter(r => r.status === "needs_attention").length,
    avgBirthWeight: Math.round(birthRecords.reduce((sum, r) => sum + r.birthWeight, 0) / birthRecords.length),
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">Birth Records</h2>
          <p className="text-muted-foreground">Complete birth documentation and foal details</p>
        </div>
        <Button onClick={() => setShowAddDialog(true)} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Record Birth
        </Button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <Baby className="h-6 w-6 text-blue-500 mx-auto mb-2" />
            <div className="text-2xl font-bold">{stats.totalBirths}</div>
            <p className="text-sm text-muted-foreground">Total Births</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Calendar className="h-6 w-6 text-green-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-green-600">{stats.healthyFoals}</div>
            <p className="text-sm text-muted-foreground">Healthy Foals</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Clock className="h-6 w-6 text-orange-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-orange-600">{stats.needsAttention}</div>
            <p className="text-sm text-muted-foreground">Needs Attention</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Weight className="h-6 w-6 text-purple-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-purple-600">{stats.avgBirthWeight}kg</div>
            <p className="text-sm text-muted-foreground">Avg Birth Weight</p>
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
                  placeholder="Search by foal, mare, or stallion name..."
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
                variant={statusFilter === "needs_attention" ? "default" : "outline"}
                onClick={() => setStatusFilter("needs_attention")}
              >
                Needs Attention
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Birth Records Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredRecords.map((record) => (
          <BirthRecordCard key={record.id} record={record} />
        ))}
      </div>

      {/* Add Birth Record Dialog */}
      <AddBirthRecordDialog 
        open={showAddDialog} 
        onOpenChange={setShowAddDialog}
      />
    </div>
  );
};

export default BirthRecords;
