
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Heart, Activity } from "lucide-react";

interface HealthRecord {
  id: string;
  title: string;
  date: string;
  type: string;
  veterinarian: string;
  findings: string;
  treatment: string;
  nextAppointment: string;
  status: string;
}

interface HealthRecordsTableProps {
  records: HealthRecord[];
  onEdit: (recordId: string) => void;
  onView: (recordId: string) => void;
}

const HealthRecordsTable = ({ records, onEdit, onView }: HealthRecordsTableProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Normal": return "bg-green-500";
      case "Completed": return "bg-blue-500";
      case "Follow-up Required": return "bg-orange-500";
      case "Urgent": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2 text-slate-700">
          <Heart className="h-5 w-5" />
          Medical History ({records.length})
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
              {records.map((record) => (
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

export default HealthRecordsTable;
