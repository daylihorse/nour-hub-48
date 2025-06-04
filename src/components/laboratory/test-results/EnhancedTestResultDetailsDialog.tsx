
import { DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Download, Printer, CheckCircle, AlertTriangle, XCircle, Phone, Mail, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { EnhancedTestResult } from "./utils/enhancedTestResultsData";

interface EnhancedTestResultDetailsDialogProps {
  result: EnhancedTestResult | null;
}

const EnhancedTestResultDetailsDialog = ({ result }: EnhancedTestResultDetailsDialogProps) => {
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

  const getTrendIcon = (current: string, previous: string) => {
    const currentNum = parseFloat(current);
    const previousNum = parseFloat(previous);
    
    if (isNaN(currentNum) || isNaN(previousNum)) return <Minus className="h-3 w-3 text-gray-400" />;
    
    if (currentNum > previousNum) return <TrendingUp className="h-3 w-3 text-red-500" />;
    if (currentNum < previousNum) return <TrendingDown className="h-3 w-3 text-green-500" />;
    return <Minus className="h-3 w-3 text-gray-400" />;
  };

  const getHistoricalValue = (parameter: string, historicalResults: any[]) => {
    if (!historicalResults || historicalResults.length === 0) return null;
    const lastResult = historicalResults[historicalResults.length - 1];
    return lastResult.values.find((v: any) => v.parameter === parameter);
  };

  return (
    <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle>Test Result Details - {result.id}</DialogTitle>
      </DialogHeader>
      
      <Tabs defaultValue="current" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="current">Current Results</TabsTrigger>
          <TabsTrigger value="comparison">Historical Comparison</TabsTrigger>
          <TabsTrigger value="client">Client Information</TabsTrigger>
        </TabsList>
        
        <TabsContent value="current" className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Horse Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={result.horsePhoto} alt={result.horseName} />
                    <AvatarFallback>{result.horseName.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-lg">{result.horseName}</h3>
                    <p className="text-muted-foreground">Sample ID: {result.sampleId}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Test Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
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
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Findings</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm bg-gray-50 p-3 rounded">{result.findings}</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Test Values</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Parameter</TableHead>
                    <TableHead>Value</TableHead>
                    <TableHead>Reference Range</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Trend</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {result.values.map((value, index) => {
                    const historicalValue = getHistoricalValue(value.parameter, result.historicalResults || []);
                    return (
                      <TableRow key={index}>
                        <TableCell>{value.parameter}</TableCell>
                        <TableCell>{value.value} {value.unit}</TableCell>
                        <TableCell>{value.reference}</TableCell>
                        <TableCell>
                          <span className={getValueStatus(value.status)}>
                            {value.status.toUpperCase()}
                          </span>
                        </TableCell>
                        <TableCell>
                          {historicalValue ? getTrendIcon(value.value, historicalValue.value) : <Minus className="h-3 w-3 text-gray-400" />}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="comparison" className="space-y-4">
          {result.historicalResults && result.historicalResults.length > 0 ? (
            <Card>
              <CardHeader>
                <CardTitle>Historical Comparison</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Parameter</TableHead>
                      <TableHead>Current ({result.completedDate})</TableHead>
                      {result.historicalResults.map((historical, index) => (
                        <TableHead key={index}>Previous ({historical.date})</TableHead>
                      ))}
                      <TableHead>Change</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {result.values.map((value, index) => {
                      const historicalValue = getHistoricalValue(value.parameter, result.historicalResults || []);
                      return (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{value.parameter}</TableCell>
                          <TableCell className={getValueStatus(value.status)}>
                            {value.value} {value.unit}
                          </TableCell>
                          {result.historicalResults?.map((historical, hIndex) => {
                            const hValue = historical.values.find(v => v.parameter === value.parameter);
                            return (
                              <TableCell key={hIndex} className={hValue ? getValueStatus(hValue.status) : ""}>
                                {hValue ? `${hValue.value} ${hValue.unit}` : "N/A"}
                              </TableCell>
                            );
                          })}
                          <TableCell>
                            {historicalValue ? getTrendIcon(value.value, historicalValue.value) : "N/A"}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="text-center py-8">
                <p className="text-muted-foreground">No historical results available for comparison</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="client" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Client Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Client Name</p>
                <p className="font-medium">{result.clientName}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Phone Number</p>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <p className="font-medium">{result.clientPhone}</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Email Address</p>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <p className="font-medium">{result.clientEmail}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <div className="flex justify-end gap-2 pt-4">
        <Button variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Download PDF
        </Button>
        <Button variant="outline">
          <Printer className="h-4 w-4 mr-2" />
          Print
        </Button>
      </div>
    </DialogContent>
  );
};

export default EnhancedTestResultDetailsDialog;
