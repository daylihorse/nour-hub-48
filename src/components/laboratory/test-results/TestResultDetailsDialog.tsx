
import { DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Download, Printer, CheckCircle, AlertTriangle, XCircle } from "lucide-react";

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

interface TestResultDetailsDialogProps {
  result: TestResult | null;
}

const TestResultDetailsDialog = ({ result }: TestResultDetailsDialogProps) => {
  if (!result) return null;

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

  const getValueStatus = (status: string) => {
    const statusMap = {
      normal: "text-green-600",
      high: "text-red-600",
      low: "text-orange-600"
    };
    return statusMap[status as keyof typeof statusMap] || "text-gray-600";
  };

  return (
    <DialogContent className="max-w-2xl">
      <DialogHeader>
        <DialogTitle>Test Result Details - {result.id}</DialogTitle>
      </DialogHeader>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Horse</p>
            <p className="font-medium">{result.horseName}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Test Type</p>
            <p className="font-medium">{result.testType}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Completed Date</p>
            <p className="font-medium">{result.completedDate}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Status</p>
            {getStatusBadge(result.status)}
          </div>
        </div>
        
        <div>
          <p className="text-sm text-muted-foreground mb-2">Findings</p>
          <p className="text-sm bg-gray-50 p-3 rounded">{result.findings}</p>
        </div>
        
        <div>
          <p className="text-sm text-muted-foreground mb-2">Test Values</p>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Parameter</TableHead>
                <TableHead>Value</TableHead>
                <TableHead>Reference Range</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {result.values.map((value, index) => (
                <TableRow key={index}>
                  <TableCell>{value.parameter}</TableCell>
                  <TableCell>{value.value} {value.unit}</TableCell>
                  <TableCell>{value.reference}</TableCell>
                  <TableCell>
                    <span className={getValueStatus(value.status)}>
                      {value.status.toUpperCase()}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        
        <div className="flex justify-end gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Download PDF
          </Button>
          <Button variant="outline">
            <Printer className="h-4 w-4 mr-2" />
            Print
          </Button>
        </div>
      </div>
    </DialogContent>
  );
};

export default TestResultDetailsDialog;
