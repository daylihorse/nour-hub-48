
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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

interface EditParameterDialogProps {
  parameter: Parameter | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (parameter: Parameter) => void;
}

const EditParameterDialog = ({ parameter, isOpen, onClose, onSave }: EditParameterDialogProps) => {
  const [editedParameter, setEditedParameter] = useState<Parameter | null>(null);

  useEffect(() => {
    if (parameter) {
      setEditedParameter({ ...parameter });
    }
  }, [parameter]);

  const handleSave = () => {
    if (editedParameter) {
      onSave(editedParameter);
      onClose();
    }
  };

  const updateField = (field: keyof Parameter, value: string) => {
    if (editedParameter) {
      setEditedParameter({
        ...editedParameter,
        [field]: value
      });
    }
  };

  if (!editedParameter) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Edit Parameter</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Parameter Name (English)</Label>
              <Input
                value={editedParameter.nameEn}
                onChange={(e) => updateField('nameEn', e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label>Parameter Name (Arabic)</Label>
              <Input
                dir="rtl"
                value={editedParameter.nameAr}
                onChange={(e) => updateField('nameAr', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Unit</Label>
              <Input
                value={editedParameter.unit}
                onChange={(e) => updateField('unit', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Data Type</Label>
              <Select 
                value={editedParameter.dataType} 
                onValueChange={(value) => updateField('dataType', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="numeric">Numeric</SelectItem>
                  <SelectItem value="text">Text</SelectItem>
                  <SelectItem value="boolean">Yes/No</SelectItem>
                  <SelectItem value="dropdown">Dropdown</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label>Normal Range Min</Label>
              <Input
                type="number"
                value={editedParameter.normalRangeMin}
                onChange={(e) => updateField('normalRangeMin', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Normal Range Max</Label>
              <Input
                type="number"
                value={editedParameter.normalRangeMax}
                onChange={(e) => updateField('normalRangeMax', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Critical Low</Label>
              <Input
                type="number"
                value={editedParameter.criticalLow}
                onChange={(e) => updateField('criticalLow', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Critical High</Label>
              <Input
                type="number"
                value={editedParameter.criticalHigh}
                onChange={(e) => updateField('criticalHigh', e.target.value)}
              />
            </div>
          </div>
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

export default EditParameterDialog;
