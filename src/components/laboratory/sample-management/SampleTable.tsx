
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface Sample {
  id: string;
  horseId: string;
  horseName: string;
  sampleType: string;
  collectionDate: string;
  collectedBy: string;
  status: string;
  priority: string;
  notes: string;
}

interface SampleTableProps {
  samples: Sample[];
}

const SampleTable = ({ samples }: SampleTableProps) => {
  const getStatusBadge = (status: string) => {
    const statusMap = {
      collected: { variant: "outline", color: "blue" },
      processing: { variant: "default", color: "yellow" },
      completed: { variant: "secondary", color: "green" },
      rejected: { variant: "destructive", color: "red" }
    };
    
    const config = statusMap[status as keyof typeof statusMap] || statusMap.collected;
    return <Badge variant={config.variant as any}>{status.charAt(0).toUpperCase() + status.slice(1)}</Badge>;
  };

  const getPriorityBadge = (priority: string) => {
    return priority === "urgent" ? 
      <Badge variant="destructive">Urgent</Badge> : 
      <Badge variant="outline">Routine</Badge>;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sample Records</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Sample ID</TableHead>
              <TableHead>Horse</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Collection Date</TableHead>
              <TableHead>Collected By</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {samples.map((sample) => (
              <TableRow key={sample.id}>
                <TableCell className="font-medium">{sample.id}</TableCell>
                <TableCell>{sample.horseName}</TableCell>
                <TableCell>{sample.sampleType}</TableCell>
                <TableCell>{sample.collectionDate}</TableCell>
                <TableCell>{sample.collectedBy}</TableCell>
                <TableCell>{getPriorityBadge(sample.priority)}</TableCell>
                <TableCell>{getStatusBadge(sample.status)}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">View</Button>
                    <Button variant="outline" size="sm">Edit</Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default SampleTable;
