
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { CheckCircle, AlertTriangle, XCircle, Eye, Download, Phone, Mail, TrendingUp } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import EnhancedTestResultDetailsDialog from "./EnhancedTestResultDetailsDialog";
import { EnhancedTestResult } from "./utils/enhancedTestResultsData";

interface EnhancedTestResultsTableProps {
  results: EnhancedTestResult[];
}

const EnhancedTestResultsTable = ({ results }: EnhancedTestResultsTableProps) => {
  const [selectedResult, setSelectedResult] = useState<EnhancedTestResult | null>(null);

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
        <CardTitle>Enhanced Test Results</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Test ID</TableHead>
              <TableHead>Horse</TableHead>
              <TableHead>Client Information</TableHead>
              <TableHead>Test Type</TableHead>
              <TableHead>Completed Date</TableHead>
              <TableHead>Technician</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Historical</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {results.map((result) => (
              <TableRow key={result.id}>
                <TableCell className="font-medium">{result.id}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={result.horsePhoto} alt={result.horseName} />
                      <AvatarFallback>{result.horseName.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{result.horseName}</div>
                      <div className="text-sm text-muted-foreground">{result.sampleId}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <div className="font-medium text-sm">{result.clientName}</div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Phone className="h-3 w-3" />
                      {result.clientPhone}
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Mail className="h-3 w-3" />
                      {result.clientEmail}
                    </div>
                  </div>
                </TableCell>
                <TableCell>{result.testType}</TableCell>
                <TableCell>{result.completedDate}</TableCell>
                <TableCell>{result.technician}</TableCell>
                <TableCell>{getStatusBadge(result.status)}</TableCell>
                <TableCell>
                  {result.historicalResults && result.historicalResults.length > 0 ? (
                    <Badge variant="outline" className="flex items-center gap-1">
                      <TrendingUp className="h-3 w-3" />
                      {result.historicalResults.length} prev
                    </Badge>
                  ) : (
                    <span className="text-muted-foreground text-sm">None</span>
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" onClick={() => setSelectedResult(result)}>
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                      </DialogTrigger>
                      <EnhancedTestResultDetailsDialog result={selectedResult} />
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

export default EnhancedTestResultsTable;
