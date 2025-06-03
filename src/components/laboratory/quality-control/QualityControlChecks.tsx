
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CheckCircle, AlertTriangle } from "lucide-react";

const QualityControlChecks = () => {
  const qualityChecks = [
    {
      id: "QC001",
      date: "2024-06-01",
      checkType: "Accuracy Control",
      parameter: "Blood Glucose",
      expectedValue: "100 mg/dL",
      measuredValue: "99.2 mg/dL",
      variance: "0.8%",
      status: "passed",
      technician: "Lab Tech A"
    },
    {
      id: "QC002",
      date: "2024-06-02",
      checkType: "Precision Control",
      parameter: "Hemoglobin",
      expectedValue: "15.0 g/dL",
      measuredValue: "15.3 g/dL",
      variance: "2.0%",
      status: "passed",
      technician: "Lab Tech B"
    },
    {
      id: "QC003",
      date: "2024-06-03",
      checkType: "Contamination Check",
      parameter: "Sample Integrity",
      expectedValue: "Negative",
      measuredValue: "Trace Positive",
      variance: "N/A",
      status: "failed",
      technician: "Lab Tech C"
    }
  ];

  const getStatusBadge = (status: string) => {
    const statusMap = {
      passed: { variant: "secondary", icon: CheckCircle, color: "green" },
      failed: { variant: "destructive", icon: AlertTriangle, color: "red" },
      warning: { variant: "default", icon: AlertTriangle, color: "yellow" }
    };
    
    const config = statusMap[status as keyof typeof statusMap] || statusMap.passed;
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
        <CardTitle className="flex items-center gap-2">
          <CheckCircle className="h-5 w-5 text-green-500" />
          Recent Quality Control Checks
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>QC ID</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Check Type</TableHead>
              <TableHead>Parameter</TableHead>
              <TableHead>Expected</TableHead>
              <TableHead>Measured</TableHead>
              <TableHead>Variance</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Technician</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {qualityChecks.map((check) => (
              <TableRow key={check.id}>
                <TableCell className="font-medium">{check.id}</TableCell>
                <TableCell>{check.date}</TableCell>
                <TableCell>{check.checkType}</TableCell>
                <TableCell>{check.parameter}</TableCell>
                <TableCell>{check.expectedValue}</TableCell>
                <TableCell>{check.measuredValue}</TableCell>
                <TableCell>{check.variance}</TableCell>
                <TableCell>{getStatusBadge(check.status)}</TableCell>
                <TableCell>{check.technician}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default QualityControlChecks;
