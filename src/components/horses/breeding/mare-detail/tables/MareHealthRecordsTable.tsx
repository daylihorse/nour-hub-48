
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Search, Download, Heart, Shield, AlertTriangle } from "lucide-react";

interface MareHealthRecordsTableProps {
  mareId: string;
}

const MareHealthRecordsTable = ({ mareId }: MareHealthRecordsTableProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  // Mock health records data
  const healthRecords = [
    {
      id: "HR001",
      date: "2024-01-15",
      type: "Routine Checkup",
      veterinarian: "Dr. Sarah Ahmed",
      findings: "Excellent overall health, pregnancy progressing normally",
      treatment: "Continue prenatal vitamins",
      medications: ["Prenatal Multi-Vitamin", "Calcium Supplement"],
      nextVisit: "2024-02-15",
      status: "Completed",
      cost: "$150"
    },
    {
      id: "HR002", 
      date: "2023-12-01",
      type: "Vaccination",
      veterinarian: "Dr. Michael Roberts",
      findings: "Pre-breeding vaccination protocol completed",
      treatment: "Rhinopneumonitis, Influenza vaccines administered",
      medications: ["Rhinopneumonitis Vaccine", "Influenza Vaccine"],
      nextVisit: "2024-06-01",
      status: "Completed",
      cost: "$120"
    },
    {
      id: "HR003",
      date: "2023-11-10", 
      type: "Dental Care",
      veterinarian: "Dr. James Wilson",
      findings: "Minor dental issues corrected, teeth floated",
      treatment: "Dental floating, minor corrections made",
      medications: ["Sedative", "Pain Relief"],
      nextVisit: "2024-05-10",
      status: "Completed", 
      cost: "$200"
    },
    {
      id: "HR004",
      date: "2023-10-01",
      type: "Emergency",
      veterinarian: "Dr. Sarah Ahmed",
      findings: "Minor colic episode, resolved with treatment",
      treatment: "IV fluids, anti-spasmodics administered",
      medications: ["Banamine", "IV Fluids", "Probiotics"],
      nextVisit: "2023-10-03",
      status: "Resolved",
      cost: "$350"
    }
  ];

  // Mock vaccination records
  const vaccinations = [
    {
      vaccine: "Rhinopneumonitis",
      lastDate: "2023-12-01",
      nextDue: "2024-06-01",
      status: "Current"
    },
    {
      vaccine: "Influenza", 
      lastDate: "2023-12-01",
      nextDue: "2024-06-01",
      status: "Current"
    },
    {
      vaccine: "Tetanus",
      lastDate: "2023-06-15",
      nextDue: "2024-06-15", 
      status: "Current"
    },
    {
      vaccine: "West Nile Virus",
      lastDate: "2023-05-01",
      nextDue: "2024-05-01",
      status: "Due Soon"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed": return "bg-green-500";
      case "Resolved": return "bg-blue-500";
      case "Pending": return "bg-orange-500";
      case "Emergency": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  const getVaccineStatusColor = (status: string) => {
    switch (status) {
      case "Current": return "bg-green-500";
      case "Due Soon": return "bg-orange-500";
      case "Overdue": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "Emergency": return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case "Vaccination": return <Shield className="h-4 w-4 text-blue-500" />;
      default: return <Heart className="h-4 w-4 text-green-500" />;
    }
  };

  const filteredRecords = healthRecords.filter(record =>
    record.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.veterinarian.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.findings.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-800">Health Records</h2>
        <div className="flex gap-3">
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export Records
          </Button>
          <Button className="bg-blue-500 hover:bg-blue-600 text-white flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add Health Record
          </Button>
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

      {/* Health Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-green-200 bg-green-50">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">Excellent</div>
            <p className="text-sm text-green-700">Overall Health</p>
          </CardContent>
        </Card>
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">4</div>
            <p className="text-sm text-blue-700">Records This Year</p>
          </CardContent>
        </Card>
        <Card className="border-purple-200 bg-purple-50">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">Current</div>
            <p className="text-sm text-purple-700">Vaccinations</p>
          </CardContent>
        </Card>
        <Card className="border-orange-200 bg-orange-50">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">1</div>
            <p className="text-sm text-orange-700">Due Soon</p>
          </CardContent>
        </Card>
      </div>

      {/* Vaccination Status */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2 text-slate-700">
            <Shield className="h-5 w-5" />
            Vaccination Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {vaccinations.map((vaccine, index) => (
              <div key={index} className="flex items-center justify-between p-3 border border-slate-200 rounded-lg">
                <div>
                  <p className="font-semibold">{vaccine.vaccine}</p>
                  <p className="text-sm text-muted-foreground">
                    Last: {new Date(vaccine.lastDate).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right">
                  <Badge className={`${getVaccineStatusColor(vaccine.status)} text-white text-xs mb-1`}>
                    {vaccine.status}
                  </Badge>
                  <p className="text-sm text-muted-foreground">
                    Due: {new Date(vaccine.nextDue).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Health Records Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2 text-slate-700">
            <Heart className="h-5 w-5" />
            Medical Records ({filteredRecords.length})
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
                  <TableHead className="font-semibold text-slate-700">Status</TableHead>
                  <TableHead className="font-semibold text-slate-700">Cost</TableHead>
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
                        {getTypeIcon(record.type)}
                        <span className="text-sm">{record.type}</span>
                      </div>
                    </TableCell>
                    <TableCell>{record.veterinarian}</TableCell>
                    <TableCell className="max-w-xs truncate">{record.findings}</TableCell>
                    <TableCell>
                      <Badge className={`${getStatusColor(record.status)} text-white text-xs`}>
                        {record.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-semibold">{record.cost}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          View
                        </Button>
                        <Button variant="outline" size="sm">
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

      {/* Medications & Treatments */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg text-slate-700">Current Medications & Treatments</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="border-blue-200 bg-blue-50">
              <CardContent className="p-4">
                <h4 className="font-semibold text-blue-700 mb-3">Active Medications</h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Prenatal Multi-Vitamin</span>
                    <Badge variant="outline" className="text-xs">Daily</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Calcium Supplement</span>
                    <Badge variant="outline" className="text-xs">Daily</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-green-200 bg-green-50">
              <CardContent className="p-4">
                <h4 className="font-semibold text-green-700 mb-3">Upcoming Appointments</h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Routine Checkup</span>
                    <span className="text-xs text-muted-foreground">Feb 15, 2024</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Dental Care</span>
                    <span className="text-xs text-muted-foreground">May 10, 2024</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MareHealthRecordsTable;
