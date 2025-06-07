
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Calendar, Activity } from "lucide-react";

interface HeatCycle {
  id: string;
  title: string;
  startDate: string;
  date: string;
  endDate: string;
  duration: number;
  intensity: string;
  breedingWindow: string;
  bred: boolean;
  status: string;
  notes: string;
}

interface HeatCycleTableProps {
  cycles: HeatCycle[];
  onEdit: (cycleId: string) => void;
  onView: (cycleId: string) => void;
}

const HeatCycleTable = ({ cycles, onEdit, onView }: HeatCycleTableProps) => {
  const getIntensityColor = (intensity: string) => {
    switch (intensity) {
      case "Strong": return "bg-red-500";
      case "Moderate": return "bg-orange-500";
      case "Weak": return "bg-yellow-500";
      default: return "bg-gray-500";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2 text-slate-700">
          <Calendar className="h-5 w-5" />
          Heat Cycle History ({cycles.length})
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
              {cycles.map((cycle) => (
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
                      <Button variant="outline" size="sm" onClick={() => onView(cycle.id)}>
                        View
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => onEdit(cycle.id)}>
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
};

export default HeatCycleTable;
