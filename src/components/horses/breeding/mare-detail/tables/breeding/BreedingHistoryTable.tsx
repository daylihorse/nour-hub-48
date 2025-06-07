
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Calendar, Heart } from "lucide-react";

interface BreedingRecord {
  id: string;
  title: string;
  date: string;
  stallion: string;
  method: string;
  veterinarian: string;
  result: string;
  status: string;
  notes: string;
  cost: string;
  season: string;
  cycle: string;
}

interface BreedingHistoryTableProps {
  records: BreedingRecord[];
  onEdit: (recordId: string) => void;
  onView: (recordId: string) => void;
}

const BreedingHistoryTable = ({ records, onEdit, onView }: BreedingHistoryTableProps) => {
  const getResultColor = (result: string) => {
    switch (result) {
      case "Live Foal": return "bg-green-500";
      case "Pregnant": return "bg-blue-500";
      case "Failed": return "bg-red-500";
      case "Stillborn": return "bg-gray-500";
      default: return "bg-gray-500";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2 text-slate-700">
          <Calendar className="h-5 w-5" />
          Breeding Records ({records.length})
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
              {records.map((record) => (
                <TableRow key={record.id} className="hover:bg-slate-50">
                  <TableCell className="font-medium">
                    {new Date(record.date).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Heart className="h-4 w-4 text-blue-500" />
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
                      <Button variant="outline" size="sm" onClick={() => onView(record.id)}>
                        View
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => onEdit(record.id)}>
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

export default BreedingHistoryTable;
