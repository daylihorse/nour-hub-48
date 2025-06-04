
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { CheckCircle, AlertTriangle, XCircle } from "lucide-react";
import { TestResultFormData } from "../AddTestResultDialog";

interface TestResultStep4Props {
  formData: TestResultFormData;
  updateFormData: (updates: Partial<TestResultFormData>) => void;
}

const TestResultStep4 = ({ formData }: TestResultStep4Props) => {
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
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Review Test Result</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Please review all information before submitting the test result.
          </p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Sample Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-3">
              <Avatar className="h-12 w-12">
                <AvatarImage src={formData.horsePhoto} alt={formData.horseName} />
                <AvatarFallback>{formData.horseName.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold">{formData.horseName}</h3>
                <p className="text-sm text-muted-foreground">Sample: {formData.sampleId}</p>
              </div>
            </div>
            <div className="space-y-2">
              <div>
                <span className="text-sm text-muted-foreground">Client: </span>
                <span className="font-medium">{formData.clientName}</span>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Phone: </span>
                <span className="font-medium">{formData.clientPhone}</span>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Email: </span>
                <span className="font-medium">{formData.clientEmail}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Test Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <span className="text-sm text-muted-foreground">Test Type: </span>
              <span className="font-medium">{formData.testType}</span>
            </div>
            <div>
              <span className="text-sm text-muted-foreground">Completion Date: </span>
              <span className="font-medium">{formData.completedDate}</span>
            </div>
            <div>
              <span className="text-sm text-muted-foreground">Overall Status: </span>
              {getStatusBadge(formData.status)}
            </div>
            <div>
              <span className="text-sm text-muted-foreground">Technician: </span>
              <span className="font-medium">{formData.technician}</span>
            </div>
            <div>
              <span className="text-sm text-muted-foreground">Reviewed By: </span>
              <span className="font-medium">{formData.reviewedBy}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Clinical Findings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-gray-50 p-4 rounded">
            <p className="text-sm">{formData.findings || "No findings recorded"}</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Test Values ({formData.values.length} parameters)</CardTitle>
        </CardHeader>
        <CardContent>
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
              {formData.values.map((value, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{value.parameter}</TableCell>
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
        </CardContent>
      </Card>
    </div>
  );
};

export default TestResultStep4;
