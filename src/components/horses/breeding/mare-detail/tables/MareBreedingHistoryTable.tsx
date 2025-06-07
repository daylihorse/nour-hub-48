
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Search, Download, Calendar, Horse } from "lucide-react";

interface MareBreedingHistoryTableProps {
  mareId: string;
}

const MareBreedingHistoryTable = ({ mareId }: MareBreedingHistoryTableProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  // Mock breeding history data
  const breedingHistory = [
    {
      id: "BH001",
      date: "2023-07-20",
      stallion: "Thunder Storm",
      method: "Natural",
      veterinarian: "Dr. Sarah Ahmed",
      result: "Pregnant",
      notes: "Successful breeding, mare responded well",
      cost: "$2,500",
      season: "2023",
      cycle: "Second heat"
    },
    {
      id: "BH002",
      date: "2022-05-15",
      stallion: "Golden Thunder",
      method: "AI",
      veterinarian: "Dr. Michael Roberts",
      result: "Live Foal",
      notes: "Excellent breeding, produced healthy colt",
      cost: "$3,000",
      season: "2022",
      cycle: "First heat"
    },
    {
      id: "BH003",
      date: "2021-06-10",
      stallion: "Silver Knight",
      method: "Natural",
      veterinarian: "Dr. Sarah Ahmed",
      result: "Live Foal",
      notes: "Standard breeding procedure, healthy filly born",
      cost: "$2,800",
      season: "2021",
      cycle: "Third heat"
    },
    {
      id: "BH004",
      date: "2020-04-22",
      stallion: "Desert Wind",
      method: "AI",
      veterinarian: "Dr. James Wilson",
      result: "Failed",
      notes: "Mare did not conceive, will retry next cycle",
      cost: "$2,200",
      season: "2020",
      cycle: "First heat"
    }
  ];

  const getResultColor = (result: string) => {
    switch (result) {
      case "Live Foal": return "bg-green-500";
      case "Pregnant": return "bg-blue-500";
      case "Failed": return "bg-red-500";
      case "Stillborn": return "bg-gray-500";
      default: return "bg-gray-500";
    }
  };

  const filteredHistory = breedingHistory.filter(record =>
    record.stallion.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.veterinarian.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.method.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-800">Breeding History</h2>
        <div className="flex gap-3">
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button className="bg-blue-500 hover:bg-blue-600 text-white flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add Breeding Record
          </Button>
        </div>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardContent className="p-4">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search by stallion, veterinarian, or method..."
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
            <div className="text-2xl font-bold text-green-600">3</div>
            <p className="text-sm text-green-700">Successful Breedings</p>
          </CardContent>
        </Card>
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">1</div>
            <p className="text-sm text-blue-700">Currently Pregnant</p>
          </CardContent>
        </Card>
        <Card className="border-red-200 bg-red-50">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-red-600">1</div>
            <p className="text-sm text-red-700">Failed Attempts</p>
          </CardContent>
        </Card>
        <Card className="border-purple-200 bg-purple-50">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">75%</div>
            <p className="text-sm text-purple-700">Success Rate</p>
          </CardContent>
        </Card>
      </div>

      {/* Breeding History Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2 text-slate-700">
            <Calendar className="h-5 w-5" />
            Breeding Records ({filteredHistory.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-semibold text-slate-700">Date</TableHead>
                  <TableHead className="font-semibold text-slate-700">Stallion</TableHead>
                  <TableHead className="font-semibold text-slate-700">Method</TableHead>
                  <TableHead className="font-semibold text-slate-700">Veterinarian</TableHead>
                  <TableHead className="font-semibold text-slate-700">Result</TableHead>
                  <TableHead className="font-semibold text-slate-700">Cost</TableHead>
                  <TableHead className="font-semibold text-slate-700">Season</TableHead>
                  <TableHead className="font-semibold text-slate-700">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredHistory.map((record) => (
                  <TableRow key={record.id} className="hover:bg-slate-50">
                    <TableCell className="font-medium">
                      {new Date(record.date).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Horse className="h-4 w-4 text-blue-500" />
                        {record.stallion}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-xs">
                        {record.method}
                      </Badge>
                    </TableCell>
                    <TableCell>{record.veterinarian}</TableCell>
                    <TableCell>
                      <Badge className={`${getResultColor(record.result)} text-white text-xs`}>
                        {record.result}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-semibold">{record.cost}</TableCell>
                    <TableCell>{record.season}</TableCell>
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
    </div>
  );
};

export default MareBreedingHistoryTable;
