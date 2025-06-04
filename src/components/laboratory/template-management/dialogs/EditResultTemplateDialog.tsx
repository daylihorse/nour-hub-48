
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, Trash2, Edit } from "lucide-react";
import EditParameterDialog from "../wizard-steps/components/EditParameterDialog";

interface Template {
  id: string;
  nameEn: string;
  nameAr: string;
  category: string;
  parametersCount: number;
  normalRanges: string;
  lastModified: string;
  status: string;
  usageCount: number;
}

interface Parameter {
  id: number;
  nameEn: string;
  nameAr: string;
  unit: string;
  dataType: string;
  normalRangeMin: string;
  normalRangeMax: string;
  criticalLow: string;
  criticalHigh: string;
}

interface EditResultTemplateDialogProps {
  template: Template | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (template: Template) => void;
}

const EditResultTemplateDialog = ({ template, isOpen, onClose, onSave }: EditResultTemplateDialogProps) => {
  const [editedTemplate, setEditedTemplate] = useState<Template | null>(null);
  const [parameters, setParameters] = useState<Parameter[]>([]);
  const [editingParameter, setEditingParameter] = useState<Parameter | null>(null);

  // Mock parameters for the template
  const mockParameters: Parameter[] = [
    {
      id: 1,
      nameEn: "White Blood Cells",
      nameAr: "خلايا الدم البيضاء",
      unit: "x10³/μL",
      dataType: "numeric",
      normalRangeMin: "4.5",
      normalRangeMax: "11.0",
      criticalLow: "2.0",
      criticalHigh: "20.0"
    },
    {
      id: 2,
      nameEn: "Red Blood Cells",
      nameAr: "خلايا الدم الحمراء",
      unit: "x10⁶/μL",
      dataType: "numeric",
      normalRangeMin: "4.2",
      normalRangeMax: "5.4",
      criticalLow: "3.0",
      criticalHigh: "7.0"
    }
  ];

  useEffect(() => {
    if (template) {
      setEditedTemplate({ ...template });
      setParameters([...mockParameters]);
    }
  }, [template]);

  const handleSave = () => {
    if (editedTemplate) {
      onSave(editedTemplate);
      onClose();
    }
  };

  const updateField = (field: keyof Template, value: string) => {
    if (editedTemplate) {
      setEditedTemplate({
        ...editedTemplate,
        [field]: value
      });
    }
  };

  const handleEditParameter = (parameter: Parameter) => {
    setEditingParameter(parameter);
  };

  const handleSaveParameter = (updatedParameter: Parameter) => {
    setParameters(prev => 
      prev.map(p => p.id === updatedParameter.id ? updatedParameter : p)
    );
    setEditingParameter(null);
  };

  const handleDeleteParameter = (parameterId: number) => {
    setParameters(prev => prev.filter(p => p.id !== parameterId));
  };

  if (!editedTemplate) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Result Template</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="basic" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="basic">Basic Information</TabsTrigger>
            <TabsTrigger value="parameters">Parameters</TabsTrigger>
          </TabsList>

          <TabsContent value="basic" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Template Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Template Name (English)</Label>
                    <Input
                      value={editedTemplate.nameEn}
                      onChange={(e) => updateField('nameEn', e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Template Name (Arabic)</Label>
                    <Input
                      dir="rtl"
                      value={editedTemplate.nameAr}
                      onChange={(e) => updateField('nameAr', e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Category</Label>
                    <Select 
                      value={editedTemplate.category} 
                      onValueChange={(value) => updateField('category', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Hematology">Hematology</SelectItem>
                        <SelectItem value="Clinical Chemistry">Clinical Chemistry</SelectItem>
                        <SelectItem value="Endocrinology">Endocrinology</SelectItem>
                        <SelectItem value="Microbiology">Microbiology</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Status</Label>
                    <Select 
                      value={editedTemplate.status} 
                      onValueChange={(value) => updateField('status', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="archived">Archived</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="parameters" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Template Parameters</CardTitle>
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Parameter
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Parameter Name</TableHead>
                      <TableHead>Unit</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Normal Range</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {parameters.map((param) => (
                      <TableRow key={param.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{param.nameEn}</div>
                            <div className="text-sm text-muted-foreground" dir="rtl">{param.nameAr}</div>
                          </div>
                        </TableCell>
                        <TableCell>{param.unit}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{param.dataType}</Badge>
                        </TableCell>
                        <TableCell>{param.normalRangeMin} - {param.normalRangeMax}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleEditParameter(param)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleDeleteParameter(param.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end gap-2 pt-4">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            Save Changes
          </Button>
        </div>

        <EditParameterDialog
          parameter={editingParameter}
          isOpen={!!editingParameter}
          onClose={() => setEditingParameter(null)}
          onSave={handleSaveParameter}
        />
      </DialogContent>
    </Dialog>
  );
};

export default EditResultTemplateDialog;
