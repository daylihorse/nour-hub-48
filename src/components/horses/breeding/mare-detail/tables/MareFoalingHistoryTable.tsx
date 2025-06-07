
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Search, Download, Baby, Heart, Calendar } from "lucide-react";
import ViewToggle from "../components/ViewToggle";
import RecordCard from "../components/RecordCard";
import RecordListItem from "../components/RecordListItem";

interface MareFoalingHistoryTableProps {
  mareId: string;
  viewMode: 'grid' | 'list' | 'table';
  onViewModeChange: (mode: 'grid' | 'list' | 'table') => void;
  onActionClick: (type: 'checkup' | 'breeding' | 'health' | 'birth', title: string) => void;
}

const MareFoalingHistoryTable = ({ mareId, viewMode, onViewModeChange, onActionClick }: MareFoalingHistoryTableProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  // Mock foaling history data
  const foalingHistory = [
    {
      id: "FOAL001",
      title: "Luna's Thunder Birth",
      foalName: "Luna's Thunder",
      birthDate: "2023-01-15",
      date: "2023-01-15",
      birthTime: "14:30",
      gender: "Colt",
      sire: "Golden Thunder", 
      birthWeight: "45 kg",
      height: "85 cm",
      color: "Bay",
      status: "Healthy",
      complications: "None",
      veterinarian: "Dr. Sarah Ahmed",
      registrationNumber: "ARA-2023-0123",
      weaningDate: "2023-07-15",
      currentLocation: "Pasture A",
      details: {
        "Gender": "Colt",
        "Sire": "Golden Thunder",
        "Weight": "45 kg",
        "Color": "Bay"
      }
    },
    {
      id: "FOAL002",
      title: "Silver Star Birth", 
      foalName: "Silver Star",
      birthDate: "2022-03-20",
      date: "2022-03-20",
      birthTime: "09:15",
      gender: "Filly",
      sire: "Silver Knight",
      birthWeight: "42 kg", 
      height: "82 cm",
      color: "Gray",
      status: "Healthy",
      complications: "Mild dystocia",
      veterinarian: "Dr. Sarah Ahmed",
      registrationNumber: "ARA-2022-0087",
      weaningDate: "2022-09-20",
      currentLocation: "Training Facility",
      details: {
        "Gender": "Filly",
        "Sire": "Silver Knight",
        "Weight": "42 kg",
        "Color": "Gray"
      }
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Healthy": return "bg-green-500";
      case "Deceased": return "bg-red-500";
      case "Sold": return "bg-blue-500";
      case "Training": return "bg-purple-500";
      default: return "bg-gray-500";
    }
  };

  const getGenderColor = (gender: string) => {
    return gender === "Colt" ? "bg-blue-500" : "bg-pink-500";
  };

  const filteredHistory = foalingHistory.filter(record =>
    record.foalName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.sire.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.color.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddBirth = () => {
    onActionClick('birth', 'Record Birth');
  };

  const handleEdit = () => {
    console.log('Edit foaling record for mare:', mareId);
  };

  const handleView = () => {
    console.log('View foaling record for mare:', mareId);
  };

  const renderContent = () => {
    if (viewMode === 'table') {
      return (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2 text-slate-700">
              <Baby className="h-5 w-5" />
              Birth Records ({filteredHistory.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="font-semibold text-slate-700">Foal Name</TableHead>
                    <TableHead className="font-semibold text-slate-700">Birth Date</TableHead>
                    <TableHead className="font-semibold text-slate-700">Gender</TableHead>
                    <TableHead className="font-semibold text-slate-700">Sire</TableHead>
                    <TableHead className="font-semibold text-slate-700">Birth Weight</TableHead>
                    <TableHead className="font-semibold text-slate-700">Color</TableHead>
                    <TableHead className="font-semibold text-slate-700">Status</TableHead>
                    <TableHead className="font-semibold text-slate-700">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredHistory.map((record) => (
                    <TableRow key={record.id} className="hover:bg-slate-50">
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <Heart className="h-4 w-4 text-red-500" />
                          {record.foalName}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">
                            {new Date(record.birthDate).toLocaleDateString()}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {record.birthTime}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={`${getGenderColor(record.gender)} text-white text-xs`}>
                          {record.gender}
                        </Badge>
                      </TableCell>
                      <TableCell>{record.sire}</TableCell>
                      <TableCell className="font-semibold">{record.birthWeight}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-xs">
                          {record.color}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={`${getStatusColor(record.status)} text-white text-xs`}>
                          {record.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" onClick={handleView}>
                            View
                          </Button>
                          <Button variant="outline" size="sm" onClick={handleEdit}>
                            Edit
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      );
    }

    if (viewMode === 'grid') {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredHistory.map((record) => (
            <RecordCard
              key={record.id}
              record={record}
              onEdit={handleEdit}
              onView={handleView}
            />
          ))}
        </div>
      );
    }

    return (
      <Card>
        <CardContent className="p-0">
          {filteredHistory.map((record) => (
            <RecordListItem
              key={record.id}
              record={record}
              onEdit={handleEdit}
              onView={handleView}
            />
          ))}
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-800">Foaling History</h2>
        <div className="flex items-center gap-4">
          <ViewToggle currentView={viewMode} onViewChange={onViewModeChange} />
          <div className="flex gap-3">
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Export Records
            </Button>
            <Button onClick={handleAddBirth} className="bg-blue-500 hover:bg-blue-600 text-white flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Birth Record
            </Button>
          </div>
        </div>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-4">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search by foal name, sire, or color..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-green-200 bg-green-50">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">2</div>
            <p className="text-sm text-green-700">Total Foals</p>
          </CardContent>
        </Card>
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">1</div>
            <p className="text-sm text-blue-700">Colts</p>
          </CardContent>
        </Card>
        <Card className="border-pink-200 bg-pink-50">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-pink-600">1</div>
            <p className="text-sm text-pink-700">Fillies</p>
          </CardContent>
        </Card>
        <Card className="border-purple-200 bg-purple-50">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">100%</div>
            <p className="text-sm text-purple-700">Survival Rate</p>
          </CardContent>
        </Card>
      </div>

      {/* Foaling History Content */}
      {renderContent()}

      {/* Detailed Foal Cards - only show in grid view */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredHistory.map((foal) => (
            <Card key={foal.id} className="border-slate-200 hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2 text-slate-700">
                  <Baby className="h-5 w-5" />
                  {foal.foalName}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Registration</p>
                      <p className="font-semibold">{foal.registrationNumber}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Current Location</p>
                      <p className="font-semibold">{foal.currentLocation}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Height at Birth</p>
                      <p className="font-semibold">{foal.height}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Weaning Date</p>
                      <p className="font-semibold">{new Date(foal.weaningDate).toLocaleDateString()}</p>
                    </div>
                  </div>
                  {foal.complications !== "None" && (
                    <div>
                      <p className="text-sm text-muted-foreground">Birth Complications</p>
                      <p className="font-semibold text-orange-600">{foal.complications}</p>
                    </div>
                  )}
                  <div className="flex gap-2 pt-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      View Full Record
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      Health Records
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default MareFoalingHistoryTable;
