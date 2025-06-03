
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, Download, Printer, CheckCircle, AlertTriangle, XCircle, Eye } from "lucide-react";

const TestResults = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedResult, setSelectedResult] = useState<any>(null);

  // Mock test results data
  const testResults = [
    {
      id: "TR001",
      sampleId: "S001",
      horseName: "Thunder",
      testType: "Complete Blood Count",
      completedDate: "2024-06-03",
      status: "normal",
      technician: "Lab Tech A",
      reviewedBy: "Dr. Smith",
      findings: "All parameters within normal ranges",
      values: [
        { parameter: "White Blood Cells", value: "6.5", unit: "x10³/μL", reference: "5.0-10.0", status: "normal" },
        { parameter: "Red Blood Cells", value: "8.2", unit: "x10⁶/μL", reference: "6.5-12.0", status: "normal" },
        { parameter: "Hemoglobin", value: "14.5", unit: "g/dL", reference: "11.0-18.0", status: "normal" }
      ]
    },
    {
      id: "TR002",
      sampleId: "S002",
      horseName: "Bella",
      testType: "Urinalysis",
      completedDate: "2024-06-02",
      status: "abnormal",
      technician: "Lab Tech B",
      reviewedBy: "Dr. Johnson",
      findings: "Elevated protein levels detected",
      values: [
        { parameter: "Protein", value: "150", unit: "mg/dL", reference: "0-30", status: "high" },
        { parameter: "Glucose", value: "Negative", unit: "", reference: "Negative", status: "normal" },
        { parameter: "Specific Gravity", value: "1.025", unit: "", reference: "1.020-1.050", status: "normal" }
      ]
    },
    {
      id: "TR003",
      sampleId: "S003",
      horseName: "Shadow",
      testType: "Parasite Screening",
      completedDate: "2024-06-05",
      status: "normal",
      technician: "Lab Tech C",
      reviewedBy: "Dr. Brown",
      findings: "No parasites detected",
      values: [
        { parameter: "Strongyles", value: "Negative", unit: "", reference: "Negative", status: "normal" },
        { parameter: "Roundworms", value: "Negative", unit: "", reference: "Negative", status: "normal" },
        { parameter: "Tapeworms", value: "Negative", unit: "", reference: "Negative", status: "normal" }
      ]
    }
  ];

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

  const filteredResults = testResults.filter(result => {
    const matchesSearch = result.horseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         result.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         result.testType.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || result.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex justify-between items-center">
        <div className="flex gap-4 items-center">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search test results..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-80"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-40">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Results</SelectItem>
              <SelectItem value="normal">Normal</SelectItem>
              <SelectItem value="abnormal">Abnormal</SelectItem>
              <SelectItem value="critical">Critical</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button variant="outline">
            <Printer className="h-4 w-4 mr-2" />
            Print
          </Button>
        </div>
      </div>

      {/* Results Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <div>
                <p className="text-sm text-muted-foreground">Total Results</p>
                <p className="text-2xl font-bold">284</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <div>
                <p className="text-sm text-muted-foreground">Normal</p>
                <p className="text-2xl font-bold">241</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-orange-500" />
              <div>
                <p className="text-sm text-muted-foreground">Abnormal</p>
                <p className="text-2xl font-bold">38</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <XCircle className="h-4 w-4 text-red-500" />
              <div>
                <p className="text-sm text-muted-foreground">Critical</p>
                <p className="text-2xl font-bold">5</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Results Table */}
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
              {filteredResults.map((result) => (
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
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Test Result Details - {result?.id}</DialogTitle>
                          </DialogHeader>
                          {selectedResult && (
                            <div className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <p className="text-sm text-muted-foreground">Horse</p>
                                  <p className="font-medium">{selectedResult.horseName}</p>
                                </div>
                                <div>
                                  <p className="text-sm text-muted-foreground">Test Type</p>
                                  <p className="font-medium">{selectedResult.testType}</p>
                                </div>
                                <div>
                                  <p className="text-sm text-muted-foreground">Completed Date</p>
                                  <p className="font-medium">{selectedResult.completedDate}</p>
                                </div>
                                <div>
                                  <p className="text-sm text-muted-foreground">Status</p>
                                  {getStatusBadge(selectedResult.status)}
                                </div>
                              </div>
                              
                              <div>
                                <p className="text-sm text-muted-foreground mb-2">Findings</p>
                                <p className="text-sm bg-gray-50 p-3 rounded">{selectedResult.findings}</p>
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
                                    {selectedResult.values.map((value: any, index: number) => (
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
                          )}
                        </DialogContent>
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
    </div>
  );
};

export default TestResults;
