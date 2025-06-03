
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { CheckCircle, AlertTriangle, XCircle, Eye, Download } from "lucide-react";
import TestResultDetailsDialog from "./TestResultDetailsDialog";

interface TestResult {
  id: string;
  sampleId: string;
  horseName: string;
  testType: string;
  completedDate: string;
  status: string;
  technician: string;
  reviewedBy: string;
  findings: string;
  values: Array<{
    parameter: string;
    value: string;
    unit: string;
    reference: string;
    status: string;
  }>;
}

interface TestResultsTableProps {
  results: TestResult[];
}

const TestResultsTable = ({ results }: TestResultsTableProps) => {
  const [selectedResult, setSelectedResult] = useState<TestResult | null>(null);

  const getStatusBadge = (status: string) => {
    const statusMap = {
      normal: { variant: "secondary", icon: CheckCircle, color: "green" },
      abnormal: { variant: "destructive", icon: AlertTriangle, color: "red" },
      critical: { variant: "destructive", icon: XCircle, color: "red" }
    };
    
    const config = statusMap[status as keyof typeof statusMap] || statusMap.normal;
    const Icon = config.icon;
    
    return (
      <Badge variant={config.variant as any} className="flex items-center gap-1">
        <Icon className="h-3 w-3" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Test Results</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Test ID</TableHead>
              <TableHead>Sample</TableHead>
              <TableHead>Test Type</TableHead>
              <TableHead>Completed Date</TableHead>
              <TableHead>Technician</TableHead>
              <TableHead>Reviewed By</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {results.map((result) => (
              <TableRow key={result.id}>
                <TableCell className="font-medium">{result.id}</TableCell>
                <TableCell>
                  <div>
                    <div className="font-medium">{result.sampleId}</div>
                    <div className="text-sm text-muted-foreground">{result.horseName}</div>
                  </div>
                </TableCell>
                <TableCell>{result.testType}</TableCell>
                <TableCell>{result.completedDate}</TableCell>
                <TableCell>{result.technician}</TableCell>
                <TableCell>{result.reviewedBy}</TableCell>
                <TableCell>{getStatusBadge(result.status)}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" onClick={() => setSelectedResult(result)}>
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                      </DialogTrigger>
                      <TestResultDetailsDialog result={selectedResult} />
                    </Dialog>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
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

export default TestResultsTable;
