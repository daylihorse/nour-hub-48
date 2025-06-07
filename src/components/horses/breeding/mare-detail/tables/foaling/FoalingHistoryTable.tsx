
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Baby, Heart } from "lucide-react";

interface FoalingRecord {
  id: string;
  title: string;
  foalName: string;
  birthDate: string;
  birthTime: string;
  gender: string;
  sire: string;
  birthWeight: string;
  height: string;
  color: string;
  status: string;
  complications: string;
  veterinarian: string;
  registrationNumber: string;
  weaningDate: string;
  currentLocation: string;
}

interface FoalingHistoryTableProps {
  records: FoalingRecord[];
  onEdit: (recordId: string) => void;
  onView: (recordId: string) => void;
}

const FoalingHistoryTable = ({ records, onEdit, onView }: FoalingHistoryTableProps) => {
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

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2 text-slate-700">
          <Baby className="h-5 w-5" />
          Birth Records ({records.length})
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
              {records.map((record) => (
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

export default FoalingHistoryTable;
