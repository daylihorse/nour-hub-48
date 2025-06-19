import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, TestTube, Plus, X, Settings } from "lucide-react";

interface Analysis {
  id: string;
  name: string;
  department: string;
  category: string;
  unit: string;
  expectedValue: string;
  toleranceLimit: string;
}

interface QCTemplateStep2Props {
  data: any;
  onDataChange: (data: any) => void;
}

const QCTemplateStep2 = ({ data, onDataChange }: QCTemplateStep2Props) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedAnalyses, setSelectedAnalyses] = useState<Analysis[]>(data.analyses || []);

  const availableAnalyses: Analysis[] = [
    // Chemistry
    { id: "glucose", name: "Glucose Control", department: "Chemistry", category: "Blood Sugar", unit: "mg/dL", expectedValue: "100", toleranceLimit: "±5%" },
    { id: "cholesterol", name: "Cholesterol Control", department: "Chemistry", category: "Lipid Profile", unit: "mg/dL", expectedValue: "200", toleranceLimit: "±3%" },
    { id: "creatinine", name: "Creatinine Control", department: "Chemistry", category: "Kidney Function", unit: "mg/dL", expectedValue: "1.0", toleranceLimit: "±10%" },
    { id: "alt", name: "ALT Control", department: "Chemistry", category: "Liver Function", unit: "U/L", expectedValue: "40", toleranceLimit: "±8%" },
    { id: "albumin", name: "Albumin Control", department: "Chemistry", category: "Protein", unit: "g/dL", expectedValue: "4.0", toleranceLimit: "±5%" },
    { id: "bilirubin", name: "Bilirubin Control", department: "Chemistry", category: "Liver Function", unit: "mg/dL", expectedValue: "1.0", toleranceLimit: "±10%" },
    
    // Hematology
    { id: "hemoglobin", name: "Hemoglobin Control", department: "Hematology", category: "Complete Blood Count", unit: "g/dL", expectedValue: "14.0", toleranceLimit: "±3%" },
    { id: "platelets", name: "Platelet Control", department: "Hematology", category: "Complete Blood Count", unit: "x10³/μL", expectedValue: "250", toleranceLimit: "±5%" },
    { id: "wbc", name: "WBC Control", department: "Hematology", category: "Complete Blood Count", unit: "x10³/μL", expectedValue: "7.5", toleranceLimit: "±4%" },
    { id: "rbc", name: "RBC Control", department: "Hematology", category: "Complete Blood Count", unit: "x10⁶/μL", expectedValue: "4.5", toleranceLimit: "±2%" },
    { id: "hematocrit", name: "Hematocrit Control", department: "Hematology", category: "Complete Blood Count", unit: "%", expectedValue: "42", toleranceLimit: "±3%" },
    
    // Microbiology
    { id: "ecoli_growth", name: "E.coli Growth Control", department: "Microbiology", category: "Culture Control", unit: "Growth", expectedValue: "Positive", toleranceLimit: "Pass/Fail" },
    { id: "staph_growth", name: "S.aureus Growth Control", department: "Microbiology", category: "Culture Control", unit: "Growth", expectedValue: "Positive", toleranceLimit: "Pass/Fail" },
    { id: "sterility", name: "Sterility Control", department: "Microbiology", category: "Culture Control", unit: "Growth", expectedValue: "Negative", toleranceLimit: "Pass/Fail" },
    { id: "antibiotic", name: "Antibiotic Sensitivity Control", department: "Microbiology", category: "Sensitivity", unit: "Zone", expectedValue: "Standard", toleranceLimit: "±1 mm" },
    
    // Immunology
    { id: "iga", name: "IgA Control", department: "Immunology", category: "Immunoglobulins", unit: "mg/dL", expectedValue: "200", toleranceLimit: "±10%" },
    { id: "igg", name: "IgG Control", department: "Immunology", category: "Immunoglobulins", unit: "mg/dL", expectedValue: "1000", toleranceLimit: "±8%" },
    { id: "igm", name: "IgM Control", department: "Immunology", category: "Immunoglobulins", unit: "mg/dL", expectedValue: "120", toleranceLimit: "±12%" }
  ];

  const categories = [...new Set(availableAnalyses.map(a => a.category))];
  
  // Filter by department if one is selected in Step 1
  const departmentFilter = data.basicInfo?.department;
  const filteredByDepartment = departmentFilter 
    ? availableAnalyses.filter(a => a.department === departmentFilter)
    : availableAnalyses;

  const filteredAnalyses = filteredByDepartment.filter(analysis => {
    const matchesSearch = analysis.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || analysis.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  useEffect(() => {
    onDataChange({
      ...data,
      analyses: selectedAnalyses
    });
  }, [selectedAnalyses]);

  const handleAnalysisToggle = (analysis: Analysis, checked: boolean) => {
    if (checked) {
      setSelectedAnalyses(prev => [...prev, analysis]);
    } else {
      setSelectedAnalyses(prev => prev.filter(a => a.id !== analysis.id));
    }
  };

  const handleRemoveAnalysis = (analysisId: string) => {
    setSelectedAnalyses(prev => prev.filter(a => a.id !== analysisId));
  };

  const handleSelectAll = () => {
    setSelectedAnalyses(filteredAnalyses);
  };

  const handleClearAll = () => {
    setSelectedAnalyses([]);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <TestTube className="h-6 w-6 text-blue-600" />
        <div>
          <h3 className="text-lg font-semibold">Select QC Analyses</h3>
          <p className="text-sm text-muted-foreground">
            Choose the analyses that will be included in this QC template
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Selection Panel */}
        <div className="lg:col-span-2 space-y-4">
          {/* Search and Filter */}
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search analyses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Bulk Actions */}
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleSelectAll}>
              <Plus className="h-4 w-4 mr-1" />
              Select All
            </Button>
            <Button variant="outline" size="sm" onClick={handleClearAll}>
              <X className="h-4 w-4 mr-1" />
              Clear All
            </Button>
          </div>

          {/* Available Analyses */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Available Analyses</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {filteredAnalyses.map((analysis) => {
                  const isSelected = selectedAnalyses.some(a => a.id === analysis.id);
                  return (
                    <div
                      key={analysis.id}
                      className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50"
                    >
                      <Checkbox
                        checked={isSelected}
                        onCheckedChange={(checked) => handleAnalysisToggle(analysis, checked as boolean)}
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{analysis.name}</span>
                          <Badge variant="outline" className="text-xs">
                            {analysis.category}
                          </Badge>
                        </div>
                        <div className="text-sm text-muted-foreground mt-1">
                          Expected: {analysis.expectedValue} {analysis.unit} (±{analysis.toleranceLimit})
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Selected Analyses Panel */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Settings className="h-4 w-4" />
                Selected Analyses ({selectedAnalyses.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              {selectedAnalyses.length > 0 ? (
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {selectedAnalyses.map((analysis) => (
                    <div
                      key={analysis.id}
                      className="flex items-center justify-between p-2 bg-blue-50 rounded border"
                    >
                      <div className="flex-1">
                        <div className="font-medium text-sm">{analysis.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {analysis.expectedValue} {analysis.unit}
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveAnalysis(analysis.id)}
                      >
                        <X className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center text-muted-foreground py-6">
                  <TestTube className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">No analyses selected</p>
                  <p className="text-xs">Select analyses from the list</p>
                </div>
              )}
            </CardContent>
          </Card>

          {departmentFilter && (
            <Card className="bg-green-50 border-green-200">
              <CardContent className="pt-6">
                <div className="flex items-start gap-2">
                  <TestTube className="h-4 w-4 text-green-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-green-900 text-sm">
                      Department Filter Applied
                    </h4>
                    <p className="text-xs text-green-800 mt-1">
                      Showing analyses for {departmentFilter} department only
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default QCTemplateStep2; 