
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Search, Download, Calendar, Thermometer, Activity } from "lucide-react";

interface MareHeatCycleTableProps {
  mareId: string;
}

const MareHeatCycleTable = ({ mareId }: MareHeatCycleTableProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  // Mock heat cycle data
  const heatCycles = [
    {
      id: "HC001",
      startDate: "2023-06-15",
      endDate: "2023-06-20",
      duration: 5,
      intensity: "Strong",
      ovulationDate: "2023-06-18",
      notes: "Normal cycle, good breeding window",
      breeding: "Yes",
      stallion: "Thunder Storm",
      result: "Pregnant",
      nextPredicted: "2024-07-15"
    },
    {
      id: "HC002", 
      startDate: "2023-05-01",
      endDate: "2023-05-06",
      duration: 5,
      intensity: "Moderate",
      ovulationDate: "2023-05-04",
      notes: "Standard cycle length and intensity",
      breeding: "No",
      stallion: null,
      result: "Not Bred",
      nextPredicted: "2023-06-15"
    },
    {
      id: "HC003",
      startDate: "2023-03-18",
      endDate: "2023-03-24", 
      duration: 6,
      intensity: "Strong",
      ovulationDate: "2023-03-21",
      notes: "Slightly longer cycle, still within normal range",
      breeding: "Yes",
      stallion: "Golden Thunder",
      result: "Failed",
      nextPredicted: "2023-05-01"
    },
    {
      id: "HC004",
      startDate: "2023-02-02",
      endDate: "2023-02-06",
      duration: 4,
      intensity: "Weak",
      ovulationDate: "2023-02-04",
      notes: "Shorter cycle, weaker signs - transitional season",
      breeding: "No", 
      stallion: null,
      result: "Not Bred",
      nextPredicted: "2023-03-18"
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

  const getResultColor = (result: string) => {
    switch (result) {
      case "Pregnant": return "bg-green-500";
      case "Failed": return "bg-red-500";
      case "Not Bred": return "bg-gray-500";
      default: return "bg-gray-500";
    }
  };

  const filteredCycles = heatCycles.filter(cycle =>
    cycle.notes.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (cycle.stallion && cycle.stallion.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Calculate average cycle length
  const avgCycleLength = heatCycles.reduce((sum, cycle) => sum + cycle.duration, 0) / heatCycles.length;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-800">Heat Cycle Tracking</h2>
        <div className="flex gap-3">
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export Data
          </Button>
          <Button className="bg-blue-500 hover:bg-blue-600 text-white flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Record Heat Cycle
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
                placeholder="Search by notes or stallion name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Cycle Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{heatCycles.length}</div>
            <p className="text-sm text-blue-700">Total Cycles Tracked</p>
          </CardContent>
        </Card>
        <Card className="border-green-200 bg-green-50">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{avgCycleLength.toFixed(1)}</div>
            <p className="text-sm text-green-700">Avg Cycle Length (days)</p>
          </CardContent>
        </Card>
        <Card className="border-purple-200 bg-purple-50">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">2</div>
            <p className="text-sm text-purple-700">Breeding Attempts</p>
          </CardContent>
        </Card>
        <Card className="border-orange-200 bg-orange-50">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">50%</div>
            <p className="text-sm text-orange-700">Conception Rate</p>
          </CardContent>
        </Card>
        <Card className="border-red-200 bg-red-50">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-red-600">21</div>
            <p className="text-sm text-red-700">Avg Cycle Interval</p>
          </CardContent>
        </Card>
      </div>

      {/* Current Status Alert - If mare is not pregnant */}
      <Card className="border-green-200 bg-green-50">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Calendar className="h-6 w-6 text-green-600" />
              <div>
                <h3 className="font-semibold text-green-800">Next Predicted Heat Cycle</h3>
                <p className="text-sm text-green-700">
                  Currently pregnant - next cycle expected after foaling and recovery period
                </p>
              </div>
            </div>
            <Badge className="bg-green-600 text-white">
              Pregnant
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Heat Cycles Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2 text-slate-700">
            <Thermometer className="h-5 w-5" />
            Heat Cycle History ({filteredCycles.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-semibold text-slate-700">Start Date</TableHead>
                  <TableHead className="font-semibold text-slate-700">Duration</TableHead>
                  <TableHead className="font-semibold text-slate-700">Intensity</TableHead>
                  <TableHead className="font-semibold text-slate-700">Ovulation</TableHead>
                  <TableHead className="font-semibold text-slate-700">Breeding</TableHead>
                  <TableHead className="font-semibold text-slate-700">Stallion</TableHead>
                  <TableHead className="font-semibold text-slate-700">Result</TableHead>
                  <TableHead className="font-semibold text-slate-700">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCycles.map((cycle) => (
                  <TableRow key={cycle.id} className="hover:bg-slate-50">
                    <TableCell className="font-medium">
                      <div>
                        <div>{new Date(cycle.startDate).toLocaleDateString()}</div>
                        <div className="text-xs text-muted-foreground">
                          to {new Date(cycle.endDate).toLocaleDateString()}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Activity className="h-4 w-4 text-blue-500" />
                        <span className="font-semibold">{cycle.duration} days</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={`${getIntensityColor(cycle.intensity)} text-white text-xs`}>
                        {cycle.intensity}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {new Date(cycle.ovulationDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <Badge variant={cycle.breeding === "Yes" ? "default" : "outline"} className="text-xs">
                        {cycle.breeding}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {cycle.stallion || "—"}
                    </TableCell>
                    <TableCell>
                      <Badge className={`${getResultColor(cycle.result)} text-white text-xs`}>
                        {cycle.result}
                      </Badge>
                    </TableCell>
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

      {/* Detailed Cycle Information */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg text-slate-700">Cycle Pattern Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Average Cycle Length:</span>
                <span className="font-semibold">{avgCycleLength.toFixed(1)} days</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Most Common Intensity:</span>
                <span className="font-semibold">Strong</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Breeding Success Rate:</span>
                <span className="font-semibold text-green-600">50%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Regular Pattern:</span>
                <span className="font-semibold text-blue-600">Yes</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg text-slate-700">Breeding Recommendations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-3 border border-blue-200 rounded-lg bg-blue-50">
                <p className="text-sm text-blue-800">
                  <strong>Current Status:</strong> Mare is currently pregnant and not cycling.
                </p>
              </div>
              <div className="p-3 border border-green-200 rounded-lg bg-green-50">
                <p className="text-sm text-green-800">
                  <strong>Post-Foaling:</strong> Allow 30-45 days recovery before considering next breeding.
                </p>
              </div>
              <div className="p-3 border border-purple-200 rounded-lg bg-purple-50">
                <p className="text-sm text-purple-800">
                  <strong>Pattern:</strong> Mare shows consistent 21-day cycles with strong heat signs.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MareHeatCycleTable;
