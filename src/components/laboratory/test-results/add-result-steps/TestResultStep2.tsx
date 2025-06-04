
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Trash2, AlertTriangle, CheckCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { TestResultFormData } from "../AddTestResultDialog";
import { useTemplateIntegration } from "../hooks/useTemplateIntegration";

interface TestResultStep2Props {
  formData: TestResultFormData;
  updateFormData: (updates: Partial<TestResultFormData>) => void;
}

const TestResultStep2 = ({ formData, updateFormData }: TestResultStep2Props) => {
  const { getTemplateById, convertTemplateParametersToFormValues } = useTemplateIntegration();
  const [templateLoaded, setTemplateLoaded] = useState(false);
  const [newValue, setNewValue] = useState({
    parameter: "",
    value: "",
    unit: "",
    reference: "",
    status: "normal" as "normal" | "high" | "low"
  });

  const selectedTemplate = formData.templateId ? getTemplateById(formData.templateId) : null;

  // Auto-load template parameters when template is selected
  useEffect(() => {
    if (selectedTemplate && !templateLoaded && formData.values.length === 0) {
      const templateValues = convertTemplateParametersToFormValues(selectedTemplate);
      updateFormData({ values: templateValues });
      setTemplateLoaded(true);
    }
  }, [selectedTemplate, templateLoaded, formData.values.length, updateFormData, convertTemplateParametersToFormValues]);

  const loadTemplateParameters = () => {
    if (selectedTemplate) {
      const templateValues = convertTemplateParametersToFormValues(selectedTemplate);
      updateFormData({ values: templateValues });
      setTemplateLoaded(true);
    }
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
    
    // Auto-calculate status based on value and reference range
    if (field === 'value' && updatedValues[index].reference) {
      const numericValue = parseFloat(value);
      const reference = updatedValues[index].reference;
      
      if (reference.includes('-')) {
        const [min, max] = reference.split('-').map(v => parseFloat(v.trim()));
        if (!isNaN(numericValue) && !isNaN(min) && !isNaN(max)) {
          if (numericValue < min) {
            updatedValues[index].status = 'low';
          } else if (numericValue > max) {
            updatedValues[index].status = 'high';
          } else {
            updatedValues[index].status = 'normal';
          }
        }
      }
    }
    
    updateFormData({ values: updatedValues });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'high': return 'text-red-600 bg-red-50';
      case 'low': return 'text-yellow-600 bg-yellow-50';
      case 'normal': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'high':
      case 'low':
        return <AlertTriangle className="h-3 w-3" />;
      case 'normal':
        return <CheckCircle className="h-3 w-3" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {selectedTemplate && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Test Values for {selectedTemplate.nameEn}
              <Badge variant="outline">{selectedTemplate.category}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {formData.values.length === 0 ? (
              <Alert>
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  No parameters loaded yet. Click below to load the template parameters.
                </AlertDescription>
              </Alert>
            ) : (
              <Alert>
                <CheckCircle className="h-4 w-4" />
                <AlertDescription>
                  Template parameters loaded successfully. Enter values for each parameter.
                </AlertDescription>
              </Alert>
            )}

            {formData.values.length === 0 && (
              <div className="text-center py-4">
                <Button onClick={loadTemplateParameters} variant="outline">
                  <Plus className="h-4 w-4 mr-2" />
                  Load Template Parameters ({selectedTemplate.parameters.length} parameters)
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
                        <div className="font-medium">{value.parameter}</div>
                      </TableCell>
                      <TableCell>
                        <Input
                          value={value.value}
                          onChange={(e) => updateValue(index, 'value', e.target.value)}
                          placeholder="Enter value"
                          className="w-24"
                        />
                      </TableCell>
                      <TableCell>
                        <span className="text-sm text-muted-foreground">{value.unit}</span>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm">{value.reference}</span>
                      </TableCell>
                      <TableCell>
                        <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(value.status)}`}>
                          {getStatusIcon(value.status)}
                          <span className="capitalize">{value.status}</span>
                        </div>
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
      )}
    </div>
  );
};

export default TestResultStep2;
