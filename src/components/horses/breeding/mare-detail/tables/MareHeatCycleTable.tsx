
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Search, Download, Calendar, Activity } from "lucide-react";
import ViewToggle from "../components/ViewToggle";
import RecordCard from "../components/RecordCard";
import RecordListItem from "../components/RecordListItem";

interface MareHeatCycleTableProps {
  mareId: string;
  viewMode: 'grid' | 'list' | 'table';
  onViewModeChange: (mode: 'grid' | 'list' | 'table') => void;
  onActionClick: (type: 'checkup' | 'breeding' | 'health' | 'birth', title: string) => void;
}

const MareHeatCycleTable = ({ mareId, viewMode, onViewModeChange, onActionClick }: MareHeatCycleTableProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  // Mock heat cycle data
  const heatCycles = [
    {
      id: "HC001",
      title: "Heat Cycle - Strong Intensity",
      startDate: "2023-06-01",
      date: "2023-06-01",
      endDate: "2023-06-07",
      duration: 6,
      intensity: "Strong",
      breedingWindow: "2023-06-03 - 2023-06-05",
      bred: true,
      status: "Completed",
      notes: "Optimal breeding window utilized",
      details: {
        "Duration": "6 days",
        "Intensity": "Strong",
        "Breeding Window": "2023-06-03 - 2023-06-05",
        "Bred": "Yes"
      }
    },
    {
      id: "HC002",
      title: "Heat Cycle - Moderate Intensity",
      startDate: "2023-04-15",
      date: "2023-04-15",
      endDate: "2023-04-20",
      duration: 5,
      intensity: "Moderate",
      breedingWindow: "2023-04-17 - 2023-04-19",
      bred: false,
      status: "Completed",
      notes: "Mare not bred during this cycle",
      details: {
        "Duration": "5 days",
        "Intensity": "Moderate",
        "Breeding Window": "2023-04-17 - 2023-04-19",
        "Bred": "No"
      }
    },
    {
      id: "HC003",
      title: "Heat Cycle - Strong Intensity",
      startDate: "2023-03-01",
      date: "2023-03-01",
      endDate: "2023-03-06",
      duration: 5,
      intensity: "Strong",
      breedingWindow: "2023-03-03 - 2023-03-05",
      bred: false,
      status: "Completed",
      notes: "Stallion not available during optimal window",
      details: {
        "Duration": "5 days",
        "Intensity": "Strong",
        "Breeding Window": "2023-03-03 - 2023-03-05",
        "Bred": "No"
      }
    }
  ];

  const getIntensityColor = (intensity: string) => {
    switch (intensity) {
      case "Strong": return "bg-red-500";
      case "Moderate": return "bg-orange-500";
      case "Weak": return "bg-yellow-500";
      default: return "bg-gray-500";
    }
  };

  const filteredCycles = heatCycles.filter(cycle =>
    cycle.intensity.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cycle.notes.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddHeatCycle = () => {
    onActionClick('checkup', 'Record Heat Cycle');
  };

  const handleEdit = () => {
    console.log('Edit heat cycle record for mare:', mareId);
  };

  const handleView = () => {
    console.log('View heat cycle record for mare:', mareId);
  };

  const renderContent = () => {
    if (viewMode === 'table') {
      return (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2 text-slate-700">
              <Calendar className="h-5 w-5" />
              Heat Cycle History ({filteredCycles.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="font-semibold text-slate-700">Start Date</TableHead>
                    <TableHead className="font-semibold text-slate-700">End Date</TableHead>
                    <TableHead className="font-semibold text-slate-700">Duration</TableHead>
                    <TableHead className="font-semibold text-slate-700">Intensity</TableHead>
                    <TableHead className="font-semibold text-slate-700">Breeding Window</TableHead>
                    <TableHead className="font-semibold text-slate-700">Bred</TableHead>
                    <TableHead className="font-semibold text-slate-700">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCycles.map((cycle) => (
                    <TableRow key={cycle.id} className="hover:bg-slate-50">
                      <TableCell className="font-medium">
                        {new Date(cycle.startDate).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        {new Date(cycle.endDate).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Activity className="h-4 w-4 text-blue-500" />
                          {cycle.duration} days
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={`${getIntensityColor(cycle.intensity)} text-white text-xs`}>
                          {cycle.intensity}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm">{cycle.breedingWindow}</TableCell>
                      <TableCell>
                        <Badge className={cycle.bred ? "bg-green-500" : "bg-gray-500"} variant="outline">
                          {cycle.bred ? "Yes" : "No"}
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
          {filteredCycles.map((record) => (
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
          {filteredCycles.map((record) => (
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
        <h2 className="text-2xl font-bold text-slate-800">Heat Cycle Tracking</h2>
        <div className="flex items-center gap-4">
          <ViewToggle currentView={viewMode} onViewChange={onViewModeChange} />
          <div className="flex gap-3">
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Export Data
            </Button>
            <Button onClick={handleAddHeatCycle} className="bg-blue-500 hover:bg-blue-600 text-white flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Record Heat Cycle
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
                placeholder="Search by intensity or notes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Cycle Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">21</div>
            <p className="text-sm text-blue-700">Average Cycle (days)</p>
          </CardContent>
        </Card>
        <Card className="border-green-200 bg-green-50">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">5.3</div>
            <p className="text-sm text-green-700">Average Duration</p>
          </CardContent>
        </Card>
        <Card className="border-purple-200 bg-purple-50">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">1</div>
            <p className="text-sm text-purple-700">Successful Breedings</p>
          </CardContent>
        </Card>
        <Card className="border-orange-200 bg-orange-50">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">N/A</div>
            <p className="text-sm text-orange-700">Next Expected</p>
          </CardContent>
        </Card>
      </div>

      {/* Heat Cycles Content */}
      {renderContent()}
    </div>
  );
};

export default MareHeatCycleTable;
