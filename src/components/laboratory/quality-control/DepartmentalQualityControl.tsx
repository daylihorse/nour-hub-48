
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Plus, CheckCircle, AlertTriangle, XCircle, TestTube, Activity, TrendingUp } from "lucide-react";
import QualityControlChecks from "./QualityControlChecks";

interface QCResult {
  id: string;
  date: string;
  department: string;
  testType: string;
  parameter: string;
  expectedValue: string;
  actualValue: string;
  variance: number;
  status: "passed" | "failed" | "warning";
  technician: string;
  notes?: string;
}

const DepartmentalQualityControl = () => {
  const { toast } = useToast();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    department: "",
    testType: "",
    parameter: "",
    expectedValue: "",
    actualValue: "",
    technician: "",
    notes: ""
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // Mock QC results data
  const [qcResults, setQcResults] = useState<QCResult[]>([
    {
      id: "QC001",
      date: "2024-06-19",
      department: "Hematology",
      testType: "Accuracy Control",
      parameter: "Hemoglobin",
      expectedValue: "15.0 g/dL",
      actualValue: "14.8 g/dL",
      variance: 1.3,
      status: "passed",
      technician: "Lab Tech A",
      notes: "Within acceptable range"
    },
    {
      id: "QC002",
      date: "2024-06-19",
      department: "Chemistry",
      testType: "Precision Control",
      parameter: "Glucose",
      expectedValue: "100 mg/dL",
      actualValue: "105 mg/dL",
      variance: 5.0,
      status: "warning",
      technician: "Lab Tech B",
      notes: "Slightly elevated but within tolerance"
    },
    {
      id: "QC003",
      date: "2024-06-18",
      department: "Microbiology",
      testType: "Contamination Check",
      parameter: "Sterility Test",
      expectedValue: "Negative",
      actualValue: "Positive",
      variance: 0,
      status: "failed",
      technician: "Lab Tech C",
      notes: "Sample contamination detected - investigating source"
    }
  ]);

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (!formData.department.trim()) {
      errors.department = "Department is required";
    }
    if (!formData.testType.trim()) {
      errors.testType = "Test type is required";
    }
    if (!formData.parameter.trim()) {
      errors.parameter = "Parameter is required";
    }
    if (!formData.expectedValue.trim()) {
      errors.expectedValue = "Expected value is required";
    }
    if (!formData.actualValue.trim()) {
      errors.actualValue = "Actual value is required";
    }
    if (!formData.technician.trim()) {
      errors.technician = "Technician name is required";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const calculateVariance = (expected: string, actual: string): number => {
    const expectedNum = parseFloat(expected.replace(/[^\d.-]/g, ''));
    const actualNum = parseFloat(actual.replace(/[^\d.-]/g, ''));
    
    if (isNaN(expectedNum) || isNaN(actualNum) || expectedNum === 0) {
      return 0;
    }
    
    return Math.abs(((actualNum - expectedNum) / expectedNum) * 100);
  };

  const determineStatus = (variance: number): "passed" | "failed" | "warning" => {
    if (variance <= 2) return "passed";
    if (variance <= 5) return "warning";
    return "failed";
  };

  const handleSubmit = async () => {
    console.log("Form submission started", formData);
    
    if (!validateForm()) {
      console.log("Form validation failed", formErrors);
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields correctly.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Calculate variance and status
      const variance = calculateVariance(formData.expectedValue, formData.actualValue);
      const status = determineStatus(variance);

      // Create new QC result
      const newResult: QCResult = {
        id: `QC${String(qcResults.length + 4).padStart(3, '0')}`,
        date: new Date().toISOString().split('T')[0],
        department: formData.department,
        testType: formData.testType,
        parameter: formData.parameter,
        expectedValue: formData.expectedValue,
        actualValue: formData.actualValue,
        variance,
        status,
        technician: formData.technician,
        notes: formData.notes || undefined
      };

      console.log("Creating new QC result:", newResult);

      // Add to results list
      setQcResults(prev => [newResult, ...prev]);

      // Reset form
      setFormData({
        department: "",
        testType: "",
        parameter: "",
        expectedValue: "",
        actualValue: "",
        technician: "",
        notes: ""
      });
      setFormErrors({});
      setIsAddDialogOpen(false);

      // Show success message
      toast({
        title: "Success!",
        description: `Q.C Result added successfully with status: ${status.toUpperCase()}`,
      });

      console.log("QC result added successfully");

    } catch (error) {
      console.error("Error adding QC result:", error);
      toast({
        title: "Error",
        description: "Failed to add Q.C result. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (formErrors[field]) {
      setFormErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      passed: { variant: "secondary" as const, icon: CheckCircle, color: "text-green-600" },
      failed: { variant: "destructive" as const, icon: XCircle, color: "text-red-600" },
      warning: { variant: "default" as const, icon: AlertTriangle, color: "text-yellow-600" }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.passed;
    const Icon = config.icon;
    
    return (
      <Badge variant={config.variant} className="flex items-center gap-1">
        <Icon className="h-3 w-3" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const getMetrics = () => {
    const total = qcResults.length;
    const passed = qcResults.filter(r => r.status === "passed").length;
    const failed = qcResults.filter(r => r.status === "failed").length;
    const warnings = qcResults.filter(r => r.status === "warning").length;
    const passRate = total > 0 ? ((passed / total) * 100).toFixed(1) : "0";

    return { total, passed, failed, warnings, passRate };
  };

  const metrics = getMetrics();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Quality Control Management</h1>
          <p className="text-muted-foreground">Monitor and manage quality control results across departments</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Q.C Result
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add Quality Control Result</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="department">Department *</Label>
                  <Select value={formData.department} onValueChange={(value) => handleInputChange("department", value)}>
                    <SelectTrigger className={formErrors.department ? "border-red-500" : ""}>
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Hematology">Hematology</SelectItem>
                      <SelectItem value="Chemistry">Chemistry</SelectItem>
                      <SelectItem value="Microbiology">Microbiology</SelectItem>
                      <SelectItem value="Immunology">Immunology</SelectItem>
                      <SelectItem value="Pathology">Pathology</SelectItem>
                    </SelectContent>
                  </Select>
                  {formErrors.department && <p className="text-sm text-red-500">{formErrors.department}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="testType">Test Type *</Label>
                  <Select value={formData.testType} onValueChange={(value) => handleInputChange("testType", value)}>
                    <SelectTrigger className={formErrors.testType ? "border-red-500" : ""}>
                      <SelectValue placeholder="Select test type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Accuracy Control">Accuracy Control</SelectItem>
                      <SelectItem value="Precision Control">Precision Control</SelectItem>
                      <SelectItem value="Contamination Check">Contamination Check</SelectItem>
                      <SelectItem value="Calibration Verification">Calibration Verification</SelectItem>
                      <SelectItem value="Sterility Test">Sterility Test</SelectItem>
                    </SelectContent>
                  </Select>
                  {formErrors.testType && <p className="text-sm text-red-500">{formErrors.testType}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="parameter">Parameter *</Label>
                <Input
                  id="parameter"
                  value={formData.parameter}
                  onChange={(e) => handleInputChange("parameter", e.target.value)}
                  placeholder="e.g., Hemoglobin, Glucose, etc."
                  className={formErrors.parameter ? "border-red-500" : ""}
                />
                {formErrors.parameter && <p className="text-sm text-red-500">{formErrors.parameter}</p>}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="expectedValue">Expected Value *</Label>
                  <Input
                    id="expectedValue"
                    value={formData.expectedValue}
                    onChange={(e) => handleInputChange("expectedValue", e.target.value)}
                    placeholder="e.g., 15.0 g/dL"
                    className={formErrors.expectedValue ? "border-red-500" : ""}
                  />
                  {formErrors.expectedValue && <p className="text-sm text-red-500">{formErrors.expectedValue}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="actualValue">Actual Value *</Label>
                  <Input
                    id="actualValue"
                    value={formData.actualValue}
                    onChange={(e) => handleInputChange("actualValue", e.target.value)}
                    placeholder="e.g., 14.8 g/dL"
                    className={formErrors.actualValue ? "border-red-500" : ""}
                  />
                  {formErrors.actualValue && <p className="text-sm text-red-500">{formErrors.actualValue}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="technician">Technician *</Label>
                <Input
                  id="technician"
                  value={formData.technician}
                  onChange={(e) => handleInputChange("technician", e.target.value)}
                  placeholder="Technician name"
                  className={formErrors.technician ? "border-red-500" : ""}
                />
                {formErrors.technician && <p className="text-sm text-red-500">{formErrors.technician}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Notes (Optional)</Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => handleInputChange("notes", e.target.value)}
                  placeholder="Additional notes or observations"
                  className="min-h-[80px]"
                />
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsAddDialogOpen(false)}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Adding..." : "Add Result"}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <TestTube className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">{metrics.total}</p>
                <p className="text-sm text-muted-foreground">Total Tests</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-2xl font-bold text-green-600">{metrics.passed}</p>
                <p className="text-sm text-muted-foreground">Passed</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-yellow-600" />
              <div>
                <p className="text-2xl font-bold text-yellow-600">{metrics.warnings}</p>
                <p className="text-sm text-muted-foreground">Warnings</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <XCircle className="h-5 w-5 text-red-600" />
              <div>
                <p className="text-2xl font-bold text-red-600">{metrics.failed}</p>
                <p className="text-sm text-muted-foreground">Failed</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">{metrics.passRate}%</p>
                <p className="text-sm text-muted-foreground">Pass Rate</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="results" className="w-full">
        <TabsList>
          <TabsTrigger value="results">QC Results</TabsTrigger>
          <TabsTrigger value="checks">System Checks</TabsTrigger>
        </TabsList>

        <TabsContent value="results">
          <Card>
            <CardHeader>
              <CardTitle>Recent Quality Control Results</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {qcResults.map((result) => (
                  <div key={result.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-3">
                        <Activity className="h-5 w-5 text-blue-600" />
                        <div>
                          <h4 className="font-semibold">{result.parameter}</h4>
                          <p className="text-sm text-muted-foreground">
                            {result.department} • {result.testType}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {getStatusBadge(result.status)}
                        <Badge variant="outline">{result.date}</Badge>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Expected</p>
                        <p className="font-medium">{result.expectedValue}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Actual</p>
                        <p className="font-medium">{result.actualValue}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Variance</p>
                        <p className="font-medium">{result.variance.toFixed(1)}%</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Technician</p>
                        <p className="font-medium">{result.technician}</p>
                      </div>
                    </div>
                    
                    {result.notes && (
                      <div className="mt-3 pt-3 border-t">
                        <p className="text-sm text-muted-foreground">Notes:</p>
                        <p className="text-sm">{result.notes}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="checks">
          <QualityControlChecks />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DepartmentalQualityControl;
