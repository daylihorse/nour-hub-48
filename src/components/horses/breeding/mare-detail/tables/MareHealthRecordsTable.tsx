
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Search, Download, Heart, Activity } from "lucide-react";
import ViewToggle from "../components/ViewToggle";
import RecordCard from "../components/RecordCard";
import RecordListItem from "../components/RecordListItem";

interface MareHealthRecordsTableProps {
  mareId: string;
  viewMode: 'grid' | 'list' | 'table';
  onViewModeChange: (mode: 'grid' | 'list' | 'table') => void;
  onActionClick: (type: 'checkup' | 'breeding' | 'health' | 'birth', title: string) => void;
}

const MareHealthRecordsTable = ({ mareId, viewMode, onViewModeChange, onActionClick }: MareHealthRecordsTableProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  // Mock health records data
  const healthRecords = [
    {
      id: "HR001",
      title: "Pregnancy Checkup",
      date: "2024-03-01",
      type: "Pregnancy Checkup",
      veterinarian: "Dr. Sarah Ahmed",
      findings: "Healthy pregnancy progression",
      treatment: "Prenatal vitamins",
      nextAppointment: "2024-04-01",
      status: "Normal",
      details: {
        "Type": "Pregnancy Checkup",
        "Veterinarian": "Dr. Sarah Ahmed",
        "Treatment": "Prenatal vitamins",
        "Next Appointment": "2024-04-01"
      }
    },
    {
      id: "HR002",
      title: "Annual Vaccination",
      date: "2024-01-15",
      type: "Vaccination",
      veterinarian: "Dr. Michael Roberts",
      findings: "Annual vaccinations administered",
      treatment: "EHV, WNV, Tetanus vaccines",
      nextAppointment: "2025-01-15",
      status: "Completed",
      details: {
        "Type": "Vaccination",
        "Veterinarian": "Dr. Michael Roberts",
        "Treatment": "EHV, WNV, Tetanus vaccines",
        "Next Appointment": "2025-01-15"
      }
    },
    {
      id: "HR003",
      title: "Dental Checkup",
      date: "2023-12-10",
      type: "Dental Checkup",
      veterinarian: "Dr. Sarah Ahmed",
      findings: "Minor dental wear, no issues",
      treatment: "Routine dental float",
      nextAppointment: "2024-12-10",
      status: "Normal",
      details: {
        "Type": "Dental Checkup",
        "Veterinarian": "Dr. Sarah Ahmed",
        "Treatment": "Routine dental float",
        "Next Appointment": "2024-12-10"
      }
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Normal": return "bg-green-500";
      case "Completed": return "bg-blue-500";
      case "Follow-up Required": return "bg-orange-500";
      case "Urgent": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  const filteredRecords = healthRecords.filter(record =>
    record.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.veterinarian.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.findings.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddHealthRecord = () => {
    onActionClick('health', 'Add Health Record');
  };

  const handleEdit = () => {
    console.log('Edit health record for mare:', mareId);
  };

  const handleView = () => {
    console.log('View health record for mare:', mareId);
  };

  const renderContent = () => {
    if (viewMode === 'table') {
      return (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2 text-slate-700">
              <Heart className="h-5 w-5" />
              Medical History ({filteredRecords.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="font-semibold text-slate-700">Date</TableHead>
                    <TableHead className="font-semibold text-slate-700">Type</TableHead>
                    <TableHead className="font-semibold text-slate-700">Veterinarian</TableHead>
                    <TableHead className="font-semibold text-slate-700">Findings</TableHead>
                    <TableHead className="font-semibold text-slate-700">Treatment</TableHead>
                    <TableHead className="font-semibold text-slate-700">Status</TableHead>
                    <TableHead className="font-semibold text-slate-700">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRecords.map((record) => (
                    <TableRow key={record.id} className="hover:bg-slate-50">
                      <TableCell className="font-medium">
                        {new Date(record.date).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Activity className="h-4 w-4 text-blue-500" />
                          {record.type}
                        </div>
                      </TableCell>
                      <TableCell>{record.veterinarian}</TableCell>
                      <TableCell className="max-w-xs truncate">{record.findings}</TableCell>
                      <TableCell className="max-w-xs truncate">{record.treatment}</TableCell>
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
          {filteredRecords.map((record) => (
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
          {filteredRecords.map((record) => (
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
        <h2 className="text-2xl font-bold text-slate-800">Health Records</h2>
        <div className="flex items-center gap-4">
          <ViewToggle currentView={viewMode} onViewChange={onViewModeChange} />
          <div className="flex gap-3">
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Export Records
            </Button>
            <Button onClick={handleAddHealthRecord} className="bg-blue-500 hover:bg-blue-600 text-white flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Health Record
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
                placeholder="Search by type, veterinarian, or findings..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Health Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-green-200 bg-green-50">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">3</div>
            <p className="text-sm text-green-700">Total Records</p>
          </CardContent>
        </Card>
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">1</div>
            <p className="text-sm text-blue-700">Recent Checkups</p>
          </CardContent>
        </Card>
        <Card className="border-purple-200 bg-purple-50">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">2</div>
            <p className="text-sm text-purple-700">Vaccinations</p>
          </CardContent>
        </Card>
        <Card className="border-orange-200 bg-orange-50">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">0</div>
            <p className="text-sm text-orange-700">Pending Follow-ups</p>
          </CardContent>
        </Card>
      </div>

      {/* Health Records Content */}
      {renderContent()}
    </div>
  );
};

export default MareHealthRecordsTable;
