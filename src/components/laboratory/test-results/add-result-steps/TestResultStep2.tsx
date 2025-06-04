
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Trash2 } from "lucide-react";
import { TestResultFormData } from "../AddTestResultDialog";

interface TestResultStep2Props {
  formData: TestResultFormData;
  updateFormData: (updates: Partial<TestResultFormData>) => void;
}

const TestResultStep2 = ({ formData, updateFormData }: TestResultStep2Props) => {
  const [newValue, setNewValue] = useState({
    parameter: "",
    value: "",
    unit: "",
    reference: "",
    status: "normal" as "normal" | "high" | "low"
  });

  // Template values based on test type
  const getTemplateValues = () => {
    switch (formData.testType) {
      case "Complete Blood Count":
        return [
          { parameter: "White Blood Cells", unit: "x10³/μL", reference: "5.0-10.0" },
          { parameter: "Red Blood Cells", unit: "x10⁶/μL", reference: "6.5-12.0" },
          { parameter: "Hemoglobin", unit: "g/dL", reference: "11.0-18.0" },
          { parameter: "Hematocrit", unit: "%", reference: "32-53" },
          { parameter: "Platelets", unit: "x10³/μL", reference: "100-600" }
        ];
      case "Blood Chemistry Panel":
        return [
          { parameter: "Glucose", unit: "mg/dL", reference: "75-115" },
          { parameter: "Total Protein", unit: "g/dL", reference: "5.2-7.9" },
          { parameter: "Albumin", unit: "g/dL", reference: "2.6-3.7" },
          { parameter: "Creatinine", unit: "mg/dL", reference: "1.2-1.9" }
        ];
      case "Urinalysis":
        return [
          { parameter: "Protein", unit: "mg/dL", reference: "0-30" },
          { parameter: "Glucose", unit: "", reference: "Negative" },
          { parameter: "Specific Gravity", unit: "", reference: "1.020-1.050" }
        ];
      default:
        return [];
    }
  };

  const addTemplateValues = () => {
    const templates = getTemplateValues();
    const newValues = templates.map(template => ({
      ...template,
      value: "",
      status: "normal" as const
    }));
    updateFormData({ values: [...formData.values, ...newValues] });
  };

  const addCustomValue = () => {
    if (newValue.parameter && newValue.value) {
      updateFormData({ 
        values: [...formData.values, { ...newValue }] 
      });
      setNewValue({
        parameter: "",
        value: "",
        unit: "",
        reference: "",
        status: "normal"
      });
    }
  };

  const removeValue = (index: number) => {
    const updatedValues = formData.values.filter((_, i) => i !== index);
    updateFormData({ values: updatedValues });
  };

  const updateValue = (index: number, field: string, value: any) => {
    const updatedValues = [...formData.values];
    updatedValues[index] = { ...updatedValues[index], [field]: value };
    updateFormData({ values: updatedValues });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Test Values for {formData.testType}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {getTemplateValues().length > 0 && formData.values.length === 0 && (
            <div className="text-center py-4">
              <p className="text-muted-foreground mb-4">Add standard parameters for this test type</p>
              <Button onClick={addTemplateValues} variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                Add Standard Parameters
              </Button>
            </div>
          )}

          {formData.values.length > 0 && (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Parameter</TableHead>
                  <TableHead>Value</TableHead>
                  <TableHead>Unit</TableHead>
                  <TableHead>Reference Range</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {formData.values.map((value, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Input
                        value={value.parameter}
                        onChange={(e) => updateValue(index, 'parameter', e.target.value)}
                        placeholder="Parameter name"
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        value={value.value}
                        onChange={(e) => updateValue(index, 'value', e.target.value)}
                        placeholder="Value"
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        value={value.unit}
                        onChange={(e) => updateValue(index, 'unit', e.target.value)}
                        placeholder="Unit"
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        value={value.reference}
                        onChange={(e) => updateValue(index, 'reference', e.target.value)}
                        placeholder="Reference range"
                      />
                    </TableCell>
                    <TableCell>
                      <Select 
                        value={value.status} 
                        onValueChange={(val) => updateValue(index, 'status', val)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="normal">Normal</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                          <SelectItem value="low">Low</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => removeValue(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}

          <Card className="bg-gray-50">
            <CardHeader>
              <CardTitle className="text-lg">Add Custom Parameter</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-5 gap-4 items-end">
                <div>
                  <Label>Parameter</Label>
                  <Input
                    value={newValue.parameter}
                    onChange={(e) => setNewValue({ ...newValue, parameter: e.target.value })}
                    placeholder="Parameter name"
                  />
                </div>
                <div>
                  <Label>Value</Label>
                  <Input
                    value={newValue.value}
                    onChange={(e) => setNewValue({ ...newValue, value: e.target.value })}
                    placeholder="Value"
                  />
                </div>
                <div>
                  <Label>Unit</Label>
                  <Input
                    value={newValue.unit}
                    onChange={(e) => setNewValue({ ...newValue, unit: e.target.value })}
                    placeholder="Unit"
                  />
                </div>
                <div>
                  <Label>Reference</Label>
                  <Input
                    value={newValue.reference}
                    onChange={(e) => setNewValue({ ...newValue, reference: e.target.value })}
                    placeholder="Reference range"
                  />
                </div>
                <div>
                  <Button onClick={addCustomValue}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
};

export default TestResultStep2;
