
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

interface ServiceTemplate {
  id: string;
  nameEn: string;
  nameAr: string;
  description: string;
  testsIncluded: string[];
  duration: string;
  price: string;
  category: string;
  status: string;
}

interface EditServiceTemplateDialogProps {
  template: ServiceTemplate | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (template: ServiceTemplate) => void;
}

const EditServiceTemplateDialog = ({ template, isOpen, onClose, onSave }: EditServiceTemplateDialogProps) => {
  const [editedTemplate, setEditedTemplate] = useState<ServiceTemplate | null>(null);
  const [newTest, setNewTest] = useState("");

  useEffect(() => {
    if (template) {
      setEditedTemplate({ ...template });
    }
  }, [template]);

  const handleSave = () => {
    if (editedTemplate) {
      onSave(editedTemplate);
      onClose();
    }
  };

  const updateField = (field: keyof ServiceTemplate, value: string | string[]) => {
    if (editedTemplate) {
      setEditedTemplate({
        ...editedTemplate,
        [field]: value
      });
    }
  };

  const addTest = () => {
    if (newTest.trim() && editedTemplate) {
      const updatedTests = [...editedTemplate.testsIncluded, newTest.trim()];
      updateField('testsIncluded', updatedTests);
      setNewTest("");
    }
  };

  const removeTest = (testToRemove: string) => {
    if (editedTemplate) {
      const updatedTests = editedTemplate.testsIncluded.filter(test => test !== testToRemove);
      updateField('testsIncluded', updatedTests);
    }
  };

  if (!editedTemplate) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Service Template</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Service Name (English)</Label>
                  <Input
                    value={editedTemplate.nameEn}
                    onChange={(e) => updateField('nameEn', e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Service Name (Arabic)</Label>
                  <Input
                    dir="rtl"
                    value={editedTemplate.nameAr}
                    onChange={(e) => updateField('nameAr', e.target.value)}
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label>Description</Label>
                  <Textarea
                    value={editedTemplate.description}
                    onChange={(e) => updateField('description', e.target.value)}
                    rows={3}
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
                      <SelectItem value="Preventive Care">Preventive Care</SelectItem>
                      <SelectItem value="Competition">Competition</SelectItem>
                      <SelectItem value="Wellness">Wellness</SelectItem>
                      <SelectItem value="Emergency">Emergency</SelectItem>
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

                <div className="space-y-2">
                  <Label>Duration</Label>
                  <Input
                    value={editedTemplate.duration}
                    onChange={(e) => updateField('duration', e.target.value)}
                    placeholder="e.g., 2-3 hours"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Price</Label>
                  <Input
                    value={editedTemplate.price}
                    onChange={(e) => updateField('price', e.target.value)}
                    placeholder="e.g., $150"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Included Tests</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  value={newTest}
                  onChange={(e) => setNewTest(e.target.value)}
                  placeholder="Add a test..."
                  onKeyPress={(e) => e.key === 'Enter' && addTest()}
                />
                <Button onClick={addTest}>Add</Button>
              </div>

              <div className="flex flex-wrap gap-2">
                {editedTemplate.testsIncluded.map((test, index) => (
                  <Badge key={index} variant="secondary" className="flex items-center gap-1">
                    {test}
                    <X 
                      className="h-3 w-3 cursor-pointer" 
                      onClick={() => removeTest(test)}
                    />
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-end gap-2 pt-4">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditServiceTemplateDialog;
