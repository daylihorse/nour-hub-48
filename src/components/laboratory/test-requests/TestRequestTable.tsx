
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface TestRequest {
  id: string;
  sampleId: string;
  horseName: string;
  testType: string;
  requestedBy: string;
  requestDate: string;
  priority: string;
  status: string;
  estimatedCompletion: string;
  notes: string;
}

interface TestRequestTableProps {
  requests: TestRequest[];
}

const TestRequestTable = ({ requests }: TestRequestTableProps) => {
  const getStatusBadge = (status: string) => {
    const statusMap = {
      pending: { variant: "outline", color: "blue" },
      "in-progress": { variant: "default", color: "yellow" },
      completed: { variant: "secondary", color: "green" },
      cancelled: { variant: "destructive", color: "red" }
    };
    
    const config = statusMap[status as keyof typeof statusMap] || statusMap.pending;
    return <Badge variant={config.variant as any}>{status.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}</Badge>;
  };

  const getPriorityBadge = (priority: string) => {
    return priority === "urgent" ? 
      <Badge variant="destructive">Urgent</Badge> : 
      <Badge variant="outline">Routine</Badge>;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Test Request Queue</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Request ID</TableHead>
              <TableHead>Sample</TableHead>
              <TableHead>Test Type</TableHead>
              <TableHead>Requested By</TableHead>
              <TableHead>Request Date</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Est. Completion</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {requests.map((request) => (
              <TableRow key={request.id}>
                <TableCell className="font-medium">{request.id}</TableCell>
                <TableCell>
                  <div>
                    <div className="font-medium">{request.sampleId}</div>
                    <div className="text-sm text-muted-foreground">{request.horseName}</div>
                  </div>
                </TableCell>
                <TableCell>{request.testType}</TableCell>
                <TableCell>{request.requestedBy}</TableCell>
                <TableCell>{request.requestDate}</TableCell>
                <TableCell>{getPriorityBadge(request.priority)}</TableCell>
                <TableCell>{getStatusBadge(request.status)}</TableCell>
                <TableCell>{request.estimatedCompletion}</TableCell>
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

export default TestRequestTable;
