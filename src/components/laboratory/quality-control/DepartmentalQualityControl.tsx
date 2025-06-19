import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { 
  TestTube, 
  Beaker, 
  Microscope, 
  Plus, 
  Calendar, 
  CheckCircle, 
  AlertTriangle,
  Save,
  Eye,
  Edit3,
  Building2,
  FlaskConical,
  Grid3X3,
  List,
  Table as TableIcon,
  User,
  Settings2,
  ClipboardCheck
} from "lucide-react";

interface QCResult {
  id: string;
  date: string;
  department: string;
  qcTemplate?: string;
  test: string;
  parameter: string;
  expectedValue: string;
  actualValue: string;
  unit: string;
  variance: number;
  status: 'passed' | 'failed' | 'warning';
  technician: string;
  equipment: string;
  notes?: string;
}

interface Department {
  id: string;
  name: string;
  icon: any;
  equipment: string[];
  tests: string[];
  color: string;
}

interface QCTemplate {
  id: string;
  nameEn: string;
  nameAr: string;
  department: string;
  category: string;
  frequency: string;
  analyses: Array<{
    id: string;
    name: string;
    expectedValue: string;
    unit: string;
    toleranceLimit: string;
  }>;
}

type ViewMode = 'grid' | 'list' | 'table';

const DepartmentalQualityControl = () => {
  const { toast } = useToast();
  const [viewMode, setViewMode] = useState<ViewMode>('table');
  const [isAddQCDialogOpen, setIsAddQCDialogOpen] = useState(false);
  const [isAddDepartmentDialogOpen, setIsAddDepartmentDialogOpen] = useState(false);
  const [isViewQCDialogOpen, setIsViewQCDialogOpen] = useState(false);
  const [isEditQCDialogOpen, setIsEditQCDialogOpen] = useState(false);
  const [selectedQCResult, setSelectedQCResult] = useState<QCResult | null>(null);

  // Mock QC Templates data
  const [qcTemplates] = useState<QCTemplate[]>([
    {
      id: "qct-001",
      nameEn: "Chemistry Daily QC",
      nameAr: "ضبط الجودة اليومي للكيمياء",
      department: "chemistry",
      category: "Daily Controls",
      frequency: "Daily",
      analyses: [
        { id: "glucose", name: "Glucose Control", expectedValue: "100", unit: "mg/dL", toleranceLimit: "±5%" },
        { id: "cholesterol", name: "Cholesterol Control", expectedValue: "200", unit: "mg/dL", toleranceLimit: "±3%" },
        { id: "creatinine", name: "Creatinine Control", expectedValue: "1.0", unit: "mg/dL", toleranceLimit: "±10%" }
      ]
    },
    {
      id: "qct-002",
      nameEn: "Hematology Weekly QC",
      nameAr: "ضبط الجودة الأسبوعي للدم",
      department: "hematology",
      category: "Weekly Controls",
      frequency: "Weekly",
      analyses: [
        { id: "hemoglobin", name: "Hemoglobin Control", expectedValue: "14.0", unit: "g/dL", toleranceLimit: "±3%" },
        { id: "platelets", name: "Platelet Control", expectedValue: "250", unit: "x10³/μL", toleranceLimit: "±5%" },
        { id: "wbc", name: "WBC Control", expectedValue: "7.5", unit: "x10³/μL", toleranceLimit: "±4%" }
      ]
    },
    {
      id: "qct-003",
      nameEn: "Microbiology Monthly QC",
      nameAr: "ضبط الجودة الشهري للأحياء الدقيقة",
      department: "microbiology",
      category: "Monthly Controls",
      frequency: "Monthly",
      analyses: [
        { id: "ecoli_growth", name: "E.coli Growth Control", expectedValue: "Positive", unit: "Growth", toleranceLimit: "Pass/Fail" },
        { id: "sterility", name: "Sterility Control", expectedValue: "Negative", unit: "Growth", toleranceLimit: "Pass/Fail" }
      ]
    },
    {
      id: "qct-004",
      nameEn: "Chemistry Lipid Panel QC",
      nameAr: "ضبط جودة فحص الدهون",
      department: "chemistry",
      category: "Specialized Controls",
      frequency: "Daily",
      analyses: [
        { id: "total_chol", name: "Total Cholesterol Control", expectedValue: "180", unit: "mg/dL", toleranceLimit: "±5%" },
        { id: "hdl", name: "HDL Control", expectedValue: "45", unit: "mg/dL", toleranceLimit: "±8%" },
        { id: "ldl", name: "LDL Control", expectedValue: "110", unit: "mg/dL", toleranceLimit: "±7%" }
      ]
    }
  ]);

  const [qcResults, setQcResults] = useState<QCResult[]>([
    {
      id: "QC001",
      date: "2024-01-15",
      department: "chemistry",
      qcTemplate: "qct-001",
      test: "Glucose Control",
      parameter: "Glucose",
      expectedValue: "100",
      actualValue: "99.2",
      unit: "mg/dL",
      variance: 0.8,
      status: 'passed',
      technician: "Dr. Smith",
      equipment: "Cobas c702",
      notes: "Within acceptable range"
    },
    {
      id: "QC002", 
      date: "2024-01-15",
      department: "chemistry",
      qcTemplate: "qct-001",
      test: "ALT Control",
      parameter: "ALT",
      expectedValue: "45",
      actualValue: "47.5",
      unit: "U/L",
      variance: 5.6,
      status: 'passed',
      technician: "Dr. Johnson",
      equipment: "Architect c4000"
    },
    {
      id: "QC003",
      date: "2024-01-15", 
      department: "hematology",
      qcTemplate: "qct-002",
      test: "WBC Control",
      parameter: "White Blood Cells",
      expectedValue: "7500",
      actualValue: "8100",
      unit: "cells/μL",
      variance: 8.0,
      status: 'warning',
      technician: "Dr. Williams",
      equipment: "XN-3000",
      notes: "Slightly elevated but within warning limits"
    },
    {
      id: "QC004",
      date: "2024-01-15",
      department: "hematology", 
      qcTemplate: "qct-002",
      test: "Hemoglobin Control",
      parameter: "Hemoglobin",
      expectedValue: "15.0",
      actualValue: "15.2",
      unit: "g/dL",
      variance: 1.3,
      status: 'passed',
      technician: "Dr. Brown",
      equipment: "DxH 900"
    },
    {
      id: "QC005",
      date: "2024-01-15",
      department: "microbiology",
      qcTemplate: "qct-003",
      test: "Bacteria Culture Control",
      parameter: "Growth Control",
      expectedValue: "Positive",
      actualValue: "Positive",
      unit: "",
      variance: 0,
      status: 'passed',
      technician: "Dr. Davis",
      equipment: "Incubator IC-150",
      notes: "Expected growth observed"
    },
    {
      id: "QC006",
      date: "2024-01-14",
      department: "chemistry",
      qcTemplate: "qct-001",
      test: "Creatinine Control", 
      parameter: "Creatinine",
      expectedValue: "1.2",
      actualValue: "1.45",
      unit: "mg/dL",
      variance: 20.8,
      status: 'failed',
      technician: "Dr. Smith",
      equipment: "Cobas c702",
      notes: "Exceeded acceptable variance - equipment calibration required"
    }
  ]);

  const [departments, setDepartments] = useState<Department[]>([
    { 
      id: "chemistry", 
      name: "Chemistry Department", 
      icon: TestTube,
      equipment: ["Cobas c702", "Architect c4000", "AU680"],
      tests: ["Glucose Control", "ALT Control", "AST Control", "Creatinine Control", "Urea Control"],
      color: "bg-blue-50 border-blue-200"
    },
    { 
      id: "hematology", 
      name: "Hematology Department", 
      icon: Beaker,
      equipment: ["XN-3000", "DxH 900", "CA-1500"],
      tests: ["WBC Control", "RBC Control", "Hemoglobin Control", "Platelet Control", "PT/INR Control"],
      color: "bg-green-50 border-green-200"
    },
    { 
      id: "microbiology", 
      name: "Microbiology Department", 
      icon: Microscope,
      equipment: ["Incubator IC-150", "VITEK 2", "BacT/ALERT"],
      tests: ["Bacteria Culture Control", "Sensitivity Control", "Sterility Control", "Growth Medium Control"],
      color: "bg-purple-50 border-purple-200"
    }
  ]);

  const [selectedDepartment, setSelectedDepartment] = useState("chemistry");
  const [qcFormData, setQcFormData] = useState({
    qcTemplate: "",
    selectedAnalysis: "",
    test: "",
    parameter: "",
    expectedValue: "",
    actualValue: "",
    unit: "",
    equipment: "",
    technician: "",
    notes: ""
  });

  const [editFormData, setEditFormData] = useState({
    qcTemplate: "",
    test: "",
    parameter: "",
    expectedValue: "",
    actualValue: "",
    unit: "",
    equipment: "",
    technician: "",
    notes: "",
    status: ""
  });

  const [departmentFormData, setDepartmentFormData] = useState({
    name: "",
    equipment: "",
    tests: ""
  });

  // Get available QC templates for selected department
  const getAvailableTemplates = () => {
    return qcTemplates.filter(template => template.department === selectedDepartment);
  };

  // Get selected template details
  const getSelectedTemplate = () => {
    return qcTemplates.find(t => t.id === qcFormData.qcTemplate);
  };

  // Handle QC template selection
  const handleTemplateChange = (templateId: string) => {
    setQcFormData({
      ...qcFormData,
      qcTemplate: templateId,
      selectedAnalysis: "",
      test: "",
      parameter: "",
      expectedValue: "",
      unit: ""
    });
  };

  // Handle analysis selection from template
  const handleAnalysisChange = (analysisId: string) => {
    const selectedTemplate = getSelectedTemplate();
    if (selectedTemplate) {
      const selectedAnalysis = selectedTemplate.analyses.find(a => a.id === analysisId);
      if (selectedAnalysis) {
        setQcFormData({
          ...qcFormData,
          selectedAnalysis: analysisId,
          test: selectedAnalysis.name,
          parameter: selectedAnalysis.name.replace(" Control", ""),
          expectedValue: selectedAnalysis.expectedValue,
          unit: selectedAnalysis.unit
        });
      }
    }
  };

  // Handler functions for View and Edit buttons
  const handleViewQCResult = (result: QCResult) => {
    setSelectedQCResult(result);
    setIsViewQCDialogOpen(true);
  };

  const handleEditQCResult = (result: QCResult) => {
    setSelectedQCResult(result);
    setEditFormData({
      qcTemplate: result.qcTemplate || "",
      test: result.test,
      parameter: result.parameter,
      expectedValue: result.expectedValue,
      actualValue: result.actualValue,
      unit: result.unit,
      equipment: result.equipment,
      technician: result.technician,
      notes: result.notes || "",
      status: result.status
    });
    setIsEditQCDialogOpen(true);
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedQCResult) return;

    // Calculate variance
    const expected = parseFloat(editFormData.expectedValue);
    const actual = parseFloat(editFormData.actualValue);
    const variance = expected !== 0 ? Math.abs((actual - expected) / expected) * 100 : 0;

    const updatedResult: QCResult = {
      ...selectedQCResult,
      qcTemplate: editFormData.qcTemplate,
      test: editFormData.test,
      parameter: editFormData.parameter,
      expectedValue: editFormData.expectedValue,
      actualValue: editFormData.actualValue,
      unit: editFormData.unit,
      equipment: editFormData.equipment,
      technician: editFormData.technician,
      notes: editFormData.notes,
      status: editFormData.status as 'passed' | 'failed' | 'warning',
      variance: variance
    };

    setQcResults(prev => prev.map(result => 
      result.id === selectedQCResult.id ? updatedResult : result
    ));

    toast({
      title: "QC Result Updated",
      description: `Quality control result ${selectedQCResult.id} has been updated successfully.`,
    });

    setIsEditQCDialogOpen(false);
    setSelectedQCResult(null);
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      passed: { variant: "secondary", icon: CheckCircle, color: "text-green-600" },
      failed: { variant: "destructive", icon: AlertTriangle, color: "text-red-600" },
      warning: { variant: "default", icon: AlertTriangle, color: "text-yellow-600" }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig];
    const Icon = config.icon;
    
    return (
      <Badge variant={config.variant as any} className="flex items-center gap-1">
        <Icon className="h-3 w-3" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const getVarianceColor = (variance: number, status: string) => {
    if (status === 'failed') return "text-red-600 font-semibold";
    if (status === 'warning') return "text-yellow-600 font-medium"; 
    return "text-green-600";
  };

  const handleQCSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("QC Form submitted!", qcFormData, selectedDepartment);
    
    // Validation
    if (!selectedDepartment || !qcFormData.test || !qcFormData.parameter || 
        !qcFormData.expectedValue || !qcFormData.actualValue || !qcFormData.technician) {
      console.log("Validation failed", {
        selectedDepartment,
        test: qcFormData.test,
        parameter: qcFormData.parameter,
        expectedValue: qcFormData.expectedValue,
        actualValue: qcFormData.actualValue,
        technician: qcFormData.technician
      });
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    
    // Calculate variance
    const expected = parseFloat(qcFormData.expectedValue);
    const actual = parseFloat(qcFormData.actualValue);
    
    if (isNaN(expected) || isNaN(actual)) {
      toast({
        title: "Invalid Values",
        description: "Expected and actual values must be valid numbers.",
        variant: "destructive",
      });
      return;
    }
    
    console.log("Creating new QC result...");
    const variance = expected !== 0 ? Math.abs((actual - expected) / expected) * 100 : 0;
    
    // Determine status based on variance
    let status: 'passed' | 'failed' | 'warning' = 'passed';
    if (variance > 15) status = 'failed';
    else if (variance > 5) status = 'warning';

    const newResult: QCResult = {
      id: `QC${String(qcResults.length + 1).padStart(3, '0')}`,
      date: new Date().toISOString().split('T')[0],
      department: selectedDepartment,
      qcTemplate: qcFormData.qcTemplate || undefined,
      test: qcFormData.test,
      parameter: qcFormData.parameter,
      expectedValue: qcFormData.expectedValue,
      actualValue: qcFormData.actualValue,
      unit: qcFormData.unit,
      variance: variance,
      status: status,
      technician: qcFormData.technician,
      equipment: qcFormData.equipment,
      notes: qcFormData.notes
    };

    console.log("New QC result created:", newResult);
    setQcResults(prev => [...prev, newResult]);
    
    const templateInfo = qcFormData.qcTemplate ? 
      ` using template "${getSelectedTemplate()?.nameEn}"` : '';

    toast({
      title: "QC Result Saved",
      description: `Quality control result for ${qcFormData.test}${templateInfo} has been recorded successfully.`,
    });
    
    setQcFormData({
      qcTemplate: "",
      selectedAnalysis: "",
      test: "",
      parameter: "",
      expectedValue: "",
      actualValue: "",
      unit: "",
      equipment: "",
      technician: "",
      notes: ""
    });
    setIsAddQCDialogOpen(false);
  };

  const handleDepartmentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newDepartment: Department = {
      id: departmentFormData.name.toLowerCase().replace(/\s+/g, '-'),
      name: departmentFormData.name,
      icon: FlaskConical,
      equipment: departmentFormData.equipment.split(',').map(item => item.trim()),
      tests: departmentFormData.tests.split(',').map(item => item.trim()),
      color: "bg-orange-50 border-orange-200"
    };

    setDepartments([...departments, newDepartment]);
    
    toast({
      title: "Department Added",
      description: `${departmentFormData.name} has been added successfully.`,
    });
    
    setDepartmentFormData({
      name: "",
      equipment: "",
      tests: ""
    });
    setIsAddDepartmentDialogOpen(false);
  };

  const getDepartmentData = (deptId: string) => {
    return qcResults.filter(item => item.department === deptId);
  };

  const getAllStats = () => {
    const total = qcResults.length;
    const passed = qcResults.filter(item => item.status === 'passed').length;
    const failed = qcResults.filter(item => item.status === 'failed').length;
    const warning = qcResults.filter(item => item.status === 'warning').length;
    
    return { total, passed, failed, warning };
  };

  const stats = getAllStats();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Quality Control Management</h2>
          <p className="text-muted-foreground">
            Departmental quality control testing and result tracking
          </p>
        </div>
        <div className="flex gap-2">
          <Dialog open={isAddDepartmentDialogOpen} onOpenChange={setIsAddDepartmentDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Building2 className="h-4 w-4 mr-2" />
                Add New Department
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Add New Laboratory Department</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleDepartmentSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="deptName">Department Name</Label>
                  <Input
                    id="deptName"
                    value={departmentFormData.name}
                    onChange={(e) => setDepartmentFormData({...departmentFormData, name: e.target.value})}
                    placeholder="e.g., Biochemistry Department"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="deptEquipment">Equipment (comma-separated)</Label>
                  <Input
                    id="deptEquipment"
                    value={departmentFormData.equipment}
                    onChange={(e) => setDepartmentFormData({...departmentFormData, equipment: e.target.value})}
                    placeholder="e.g., Equipment A, Equipment B, Equipment C"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="deptTests">QC Tests (comma-separated)</Label>
                  <Input
                    id="deptTests"
                    value={departmentFormData.tests}
                    onChange={(e) => setDepartmentFormData({...departmentFormData, tests: e.target.value})}
                    placeholder="e.g., Test A Control, Test B Control"
                    required
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <Button type="button" variant="outline" onClick={() => setIsAddDepartmentDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">
                    <Save className="h-4 w-4 mr-2" />
                    Add Department
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>

          <Dialog open={isAddQCDialogOpen} onOpenChange={setIsAddQCDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add QC Result
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Record Quality Control Result</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleQCSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="department">Department</Label>
                    <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {departments.map((dept) => (
                          <SelectItem key={dept.id} value={dept.id}>
                            {dept.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="qcTemplate" className="flex items-center gap-2">
                      <ClipboardCheck className="h-4 w-4 text-blue-600" />
                      QC Template (Optional)
                    </Label>
                    <Select value={qcFormData.qcTemplate} onValueChange={handleTemplateChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select QC template..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">No template (Manual entry)</SelectItem>
                        {getAvailableTemplates().map((template) => (
                          <SelectItem key={template.id} value={template.id}>
                            <div className="flex flex-col">
                              <span className="font-medium">{template.nameEn}</span>
                              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <Badge variant="outline" className="text-xs">
                                  {template.frequency}
                                </Badge>
                                <span>{template.category}</span>
                              </div>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Show analysis selection if template is selected */}
                  {qcFormData.qcTemplate && getSelectedTemplate() && (
                    <div className="col-span-2">
                      <Label htmlFor="selectedAnalysis" className="flex items-center gap-2">
                        <TestTube className="h-4 w-4 text-green-600" />
                        Select Analysis from Template
                      </Label>
                      <Select value={qcFormData.selectedAnalysis} onValueChange={handleAnalysisChange}>
                        <SelectTrigger>
                          <SelectValue placeholder="Choose an analysis from the template..." />
                        </SelectTrigger>
                        <SelectContent>
                          {getSelectedTemplate()?.analyses.map((analysis) => (
                            <SelectItem key={analysis.id} value={analysis.id}>
                              <div className="flex flex-col">
                                <span className="font-medium">{analysis.name}</span>
                                <span className="text-xs text-muted-foreground">
                                  Expected: {analysis.expectedValue} {analysis.unit} ({analysis.toleranceLimit})
                                </span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  <div>
                    <Label htmlFor="test">QC Test</Label>
                    <Select 
                      value={qcFormData.test} 
                      onValueChange={(value) => setQcFormData({...qcFormData, test: value})}
                      disabled={!!qcFormData.qcTemplate && !!qcFormData.selectedAnalysis}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select test..." />
                      </SelectTrigger>
                      <SelectContent>
                        {departments.find(d => d.id === selectedDepartment)?.tests.map((test) => (
                          <SelectItem key={test} value={test}>
                            {test}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="parameter">Parameter</Label>
                    <Input
                      id="parameter"
                      value={qcFormData.parameter}
                      onChange={(e) => setQcFormData({...qcFormData, parameter: e.target.value})}
                      placeholder="Enter parameter..."
                      required
                      disabled={!!qcFormData.qcTemplate && !!qcFormData.selectedAnalysis}
                    />
                  </div>

                  <div>
                    <Label htmlFor="expectedValue">Expected Value</Label>
                    <Input
                      id="expectedValue"
                      value={qcFormData.expectedValue}
                      onChange={(e) => setQcFormData({...qcFormData, expectedValue: e.target.value})}
                      placeholder="Enter expected value..."
                      required
                      disabled={!!qcFormData.qcTemplate && !!qcFormData.selectedAnalysis}
                    />
                  </div>

                  <div>
                    <Label htmlFor="unit">Unit</Label>
                    <Input
                      id="unit"
                      value={qcFormData.unit}
                      onChange={(e) => setQcFormData({...qcFormData, unit: e.target.value})}
                      placeholder="mg/dL, U/L, etc..."
                      disabled={!!qcFormData.qcTemplate && !!qcFormData.selectedAnalysis}
                    />
                  </div>

                  <div>
                    <Label htmlFor="actualValue">Actual Value *</Label>
                    <Input
                      id="actualValue"
                      value={qcFormData.actualValue}
                      onChange={(e) => setQcFormData({...qcFormData, actualValue: e.target.value})}
                      placeholder="Enter measured value..."
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="equipment">Equipment Used</Label>
                    <Select value={qcFormData.equipment} onValueChange={(value) => setQcFormData({...qcFormData, equipment: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select equipment..." />
                      </SelectTrigger>
                      <SelectContent>
                        {departments.find(d => d.id === selectedDepartment)?.equipment.map((equip) => (
                          <SelectItem key={equip} value={equip}>
                            {equip}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="technician">Technician</Label>
                    <Input
                      id="technician"
                      value={qcFormData.technician}
                      onChange={(e) => setQcFormData({...qcFormData, technician: e.target.value})}
                      placeholder="Enter technician name..."
                      required
                    />
                  </div>
                </div>

                {/* Template Information Display */}
                {qcFormData.qcTemplate && getSelectedTemplate() && (
                  <Card className="bg-blue-50 border-blue-200">
                    <CardContent className="pt-4">
                      <div className="flex items-start gap-3">
                        <ClipboardCheck className="h-5 w-5 text-blue-600 mt-0.5" />
                        <div className="flex-1">
                          <h4 className="font-medium text-blue-900">Using QC Template</h4>
                          <p className="text-sm text-blue-800 mt-1">
                            <strong>{getSelectedTemplate()?.nameEn}</strong> - {getSelectedTemplate()?.category}
                          </p>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge variant="outline" className="text-xs">
                              {getSelectedTemplate()?.frequency}
                            </Badge>
                            <span className="text-xs text-blue-700">
                              {getSelectedTemplate()?.analyses.length} analyses available
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                <div>
                  <Label htmlFor="notes">Notes (Optional)</Label>
                  <Textarea
                    id="notes"
                    value={qcFormData.notes}
                    onChange={(e) => setQcFormData({...qcFormData, notes: e.target.value})}
                    placeholder="Additional notes or observations..."
                    rows={3}
                  />
                </div>

                <div className="flex justify-end gap-2">
                  <Button type="button" variant="outline" onClick={() => {
                    setIsAddQCDialogOpen(false);
                    setQcFormData({
                      qcTemplate: "",
                      selectedAnalysis: "",
                      test: "",
                      parameter: "",
                      expectedValue: "",
                      actualValue: "",
                      unit: "",
                      equipment: "",
                      technician: "",
                      notes: ""
                    });
                  }}>
                    Cancel
                  </Button>
                  <Button type="submit" onClick={() => console.log("Submit button clicked", qcFormData)}>
                    <Save className="h-4 w-4 mr-2" />
                    Save Result
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Overall Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total QC Tests</p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
              <Calendar className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Passed</p>
                <p className="text-2xl font-bold text-green-600">{stats.passed}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Warnings</p>
                <p className="text-2xl font-bold text-yellow-600">{stats.warning}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Failed</p>
                <p className="text-2xl font-bold text-red-600">{stats.failed}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* View Mode Toggle */}
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold">Department QC Results</h3>
        <div className="flex items-center gap-2">
          <div className="flex rounded-lg border p-1">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('grid')}
              className="h-8 px-3"
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('list')}
              className="h-8 px-3"
            >
              <List className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'table' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('table')}
              className="h-8 px-3"
            >
              <TableIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Dynamic Content based on View Mode */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {qcResults.map((result) => (
            <Card key={result.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="text-xs">
                    {result.id}
                  </Badge>
                  {getStatusBadge(result.status)}
                </div>
                <CardTitle className="text-base">{result.test}</CardTitle>
                <p className="text-sm text-muted-foreground">{result.parameter}</p>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Department:</span>
                    <span className="capitalize">{departments.find(d => d.id === result.department)?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Date:</span>
                    <span>{result.date}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Expected:</span>
                    <span>{result.expectedValue} {result.unit}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Actual:</span>
                    <span>{result.actualValue} {result.unit}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Variance:</span>
                    <span className={getVarianceColor(result.variance, result.status)}>
                      {result.variance.toFixed(1)}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Technician:</span>
                    <span className="flex items-center gap-1">
                      <User className="h-3 w-3" />
                      {result.technician}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Equipment:</span>
                    <span className="flex items-center gap-1">
                      <Settings2 className="h-3 w-3" />
                      {result.equipment}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2 mt-4">
                  <Button variant="outline" size="sm" onClick={() => handleViewQCResult(result)} className="flex-1">
                    <Eye className="h-3 w-3 mr-1" />
                    View
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleEditQCResult(result)} className="flex-1">
                    <Edit3 className="h-3 w-3 mr-1" />
                    Edit
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {viewMode === 'list' && (
        <div className="space-y-3">
          {qcResults.map((result) => (
            <Card key={result.id} className="hover:shadow-sm transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">{result.id}</Badge>
                      {getStatusBadge(result.status)}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">{result.test}</h4>
                      <p className="text-sm text-muted-foreground">{result.parameter}</p>
                    </div>
                    <div className="hidden md:flex items-center gap-6 text-sm">
                      <div>
                        <span className="text-muted-foreground">Department: </span>
                        <span className="capitalize">{departments.find(d => d.id === result.department)?.name}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Date: </span>
                        <span>{result.date}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Expected: </span>
                        <span>{result.expectedValue} {result.unit}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Actual: </span>
                        <span>{result.actualValue} {result.unit}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Variance: </span>
                        <span className={getVarianceColor(result.variance, result.status)}>
                          {result.variance.toFixed(1)}%
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <User className="h-3 w-3 text-muted-foreground" />
                        <span>{result.technician}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Settings2 className="h-3 w-3 text-muted-foreground" />
                        <span>{result.equipment}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <Button variant="outline" size="sm" onClick={() => handleViewQCResult(result)}>
                      <Eye className="h-3 w-3" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleEditQCResult(result)}>
                      <Edit3 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {viewMode === 'table' && (
        <div className="space-y-6">
          {departments.map((dept) => {
            const Icon = dept.icon;
            const deptData = getDepartmentData(dept.id);
            const deptStats = {
              total: deptData.length,
              passed: deptData.filter(item => item.status === 'passed').length,
              failed: deptData.filter(item => item.status === 'failed').length,
              warning: deptData.filter(item => item.status === 'warning').length,
            };

            return (
              <Card key={dept.id} className={dept.color}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Icon className="h-5 w-5" />
                      {dept.name}
                    </div>
                    <div className="flex gap-2 text-sm">
                      <Badge variant="secondary" className="bg-white">
                        Total: {deptStats.total}
                      </Badge>
                      <Badge variant="secondary" className="bg-green-100 text-green-700">
                        Passed: {deptStats.passed}
                      </Badge>
                      {deptStats.warning > 0 && (
                        <Badge variant="secondary" className="bg-yellow-100 text-yellow-700">
                          Warning: {deptStats.warning}
                        </Badge>
                      )}
                      {deptStats.failed > 0 && (
                        <Badge variant="secondary" className="bg-red-100 text-red-700">
                          Failed: {deptStats.failed}
                        </Badge>
                      )}
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {deptData.length > 0 ? (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Date</TableHead>
                          <TableHead>Test</TableHead>
                          <TableHead>Parameter</TableHead>
                          <TableHead>Expected</TableHead>
                          <TableHead>Actual</TableHead>
                          <TableHead>Variance</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Technician</TableHead>
                          <TableHead>Equipment</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {deptData.map((result) => (
                          <TableRow key={result.id}>
                            <TableCell>{result.date}</TableCell>
                            <TableCell className="font-medium">{result.test}</TableCell>
                            <TableCell>{result.parameter}</TableCell>
                            <TableCell>{result.expectedValue} {result.unit}</TableCell>
                            <TableCell>{result.actualValue} {result.unit}</TableCell>
                            <TableCell className={getVarianceColor(result.variance, result.status)}>
                              {result.variance.toFixed(1)}%
                            </TableCell>
                            <TableCell>{getStatusBadge(result.status)}</TableCell>
                            <TableCell>{result.technician}</TableCell>
                            <TableCell>{result.equipment}</TableCell>
                            <TableCell>
                              <div className="flex gap-1">
                                <Button variant="outline" size="sm" onClick={() => handleViewQCResult(result)}>
                                  <Eye className="h-3 w-3" />
                                </Button>
                                <Button variant="outline" size="sm" onClick={() => handleEditQCResult(result)}>
                                  <Edit3 className="h-3 w-3" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      <FlaskConical className="h-12 w-12 mx-auto mb-2 opacity-50" />
                      <p>No QC results recorded for this department yet.</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* View QC Result Dialog */}
      <Dialog open={isViewQCDialogOpen} onOpenChange={setIsViewQCDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5 text-blue-600" />
              Quality Control Result Details
            </DialogTitle>
          </DialogHeader>
          {selectedQCResult && (
            <div className="space-y-6">
              {/* Header Status Bar */}
              <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-slate-50 rounded-lg border">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="px-3 py-1 text-sm font-medium">
                      {selectedQCResult.id}
                    </Badge>
                    {getStatusBadge(selectedQCResult.status)}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Performed on {selectedQCResult.date}
                  </div>
                </div>
                <div className="text-sm text-muted-foreground">
                  {departments.find(d => d.id === selectedQCResult.department)?.name}
                </div>
              </div>

              {/* Main Information Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Test Information */}
                <Card className="border-blue-200 bg-blue-50/30">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2 text-blue-800">
                      <TestTube className="w-5 h-5" />
                      Test Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Test Name</Label>
                      <p className="text-lg font-semibold text-gray-900">{selectedQCResult.test}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Parameter</Label>
                      <p className="text-base text-gray-700">{selectedQCResult.parameter}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">QC ID</Label>
                      <p className="text-base font-medium text-gray-900">{selectedQCResult.id}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Test Date</Label>
                      <p className="text-base text-gray-700">{selectedQCResult.date}</p>
                    </div>
                  </CardContent>
                </Card>

                {/* Results & Analysis */}
                <Card className="border-green-200 bg-green-50/30">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2 text-green-800">
                      <CheckCircle className="w-5 h-5" />
                      Results & Analysis
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg border border-blue-200">
                        <span className="text-sm font-medium text-blue-700">Expected Value</span>
                        <span className="text-lg font-bold text-blue-800">
                          {selectedQCResult.expectedValue} {selectedQCResult.unit}
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border border-gray-200">
                        <span className="text-sm font-medium text-gray-700">Actual Value</span>
                        <span className="text-lg font-bold text-gray-800">
                          {selectedQCResult.actualValue} {selectedQCResult.unit}
                        </span>
                      </div>
                      <div className={`flex justify-between items-center p-3 rounded-lg border ${
                        selectedQCResult.status === 'passed' ? 'bg-green-50 border-green-200' :
                        selectedQCResult.status === 'warning' ? 'bg-yellow-50 border-yellow-200' :
                        'bg-red-50 border-red-200'
                      }`}>
                        <span className="text-sm font-medium">Variance</span>
                        <span className={`text-lg font-bold ${getVarianceColor(selectedQCResult.variance, selectedQCResult.status)}`}>
                          {selectedQCResult.variance.toFixed(1)}%
                        </span>
                      </div>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Test Status</Label>
                      <div className="mt-2">
                        {getStatusBadge(selectedQCResult.status)}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Processing Details */}
                <Card className="border-purple-200 bg-purple-50/30">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2 text-purple-800">
                      <User className="w-5 h-5" />
                      Processing Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Lab Technician</Label>
                      <div className="flex items-center gap-2 mt-1">
                        <User className="w-4 h-4 text-purple-600" />
                        <p className="text-base font-medium text-gray-900">{selectedQCResult.technician}</p>
                      </div>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Equipment Used</Label>
                      <div className="flex items-center gap-2 mt-1">
                        <Settings2 className="w-4 h-4 text-purple-600" />
                        <p className="text-base text-gray-700">{selectedQCResult.equipment}</p>
                      </div>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Department</Label>
                      <div className="flex items-center gap-2 mt-1">
                        <Building2 className="w-4 h-4 text-purple-600" />
                        <p className="text-base text-gray-700 capitalize">
                          {departments.find(d => d.id === selectedQCResult.department)?.name}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Notes Section */}
              {selectedQCResult.notes && (
                <Card className="border-orange-200 bg-orange-50/30">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2 text-orange-800">
                      <AlertTriangle className="w-5 h-5" />
                      Additional Notes
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="p-4 bg-white border border-orange-200 rounded-lg">
                      <p className="text-gray-700 leading-relaxed">{selectedQCResult.notes}</p>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Quality Assessment */}
              <Card className="border-gray-200">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <FlaskConical className="w-5 h-5" />
                    Quality Assessment Summary
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <p className="text-sm font-medium text-blue-700">Accuracy</p>
                      <p className="text-2xl font-bold text-blue-800 mt-1">
                        {(100 - selectedQCResult.variance).toFixed(1)}%
                      </p>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
                      <p className="text-sm font-medium text-green-700">Precision</p>
                      <p className="text-2xl font-bold text-green-800 mt-1">
                        {selectedQCResult.status === 'passed' ? 'High' : 
                         selectedQCResult.status === 'warning' ? 'Medium' : 'Low'}
                      </p>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg border border-purple-200">
                      <p className="text-sm font-medium text-purple-700">Quality Score</p>
                      <p className="text-2xl font-bold text-purple-800 mt-1">
                        {selectedQCResult.status === 'passed' ? 'A' : 
                         selectedQCResult.status === 'warning' ? 'B' : 'C'}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit QC Result Dialog */}
      <Dialog open={isEditQCDialogOpen} onOpenChange={setIsEditQCDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Edit3 className="h-5 w-5" />
              Edit Quality Control Result
            </DialogTitle>
          </DialogHeader>
          {selectedQCResult && (
            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="editTest">QC Test</Label>
                  <Input
                    id="editTest"
                    value={editFormData.test}
                    onChange={(e) => setEditFormData({...editFormData, test: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="editParameter">Parameter</Label>
                  <Input
                    id="editParameter"
                    value={editFormData.parameter}
                    onChange={(e) => setEditFormData({...editFormData, parameter: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="editExpected">Expected Value</Label>
                  <Input
                    id="editExpected"
                    value={editFormData.expectedValue}
                    onChange={(e) => setEditFormData({...editFormData, expectedValue: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="editActual">Actual Value</Label>
                  <Input
                    id="editActual"
                    value={editFormData.actualValue}
                    onChange={(e) => setEditFormData({...editFormData, actualValue: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="editUnit">Unit</Label>
                  <Input
                    id="editUnit"
                    value={editFormData.unit}
                    onChange={(e) => setEditFormData({...editFormData, unit: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="editStatus">Status</Label>
                  <Select value={editFormData.status} onValueChange={(value) => setEditFormData({...editFormData, status: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="passed">Passed</SelectItem>
                      <SelectItem value="warning">Warning</SelectItem>
                      <SelectItem value="failed">Failed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="editEquipment">Equipment</Label>
                  <Input
                    id="editEquipment"
                    value={editFormData.equipment}
                    onChange={(e) => setEditFormData({...editFormData, equipment: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="editTechnician">Technician</Label>
                  <Input
                    id="editTechnician"
                    value={editFormData.technician}
                    onChange={(e) => setEditFormData({...editFormData, technician: e.target.value})}
                    required
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="editNotes">Notes</Label>
                <Textarea
                  id="editNotes"
                  value={editFormData.notes}
                  onChange={(e) => setEditFormData({...editFormData, notes: e.target.value})}
                  rows={3}
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setIsEditQCDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  <Save className="h-4 w-4 mr-2" />
                  Update Result
                </Button>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DepartmentalQualityControl; 