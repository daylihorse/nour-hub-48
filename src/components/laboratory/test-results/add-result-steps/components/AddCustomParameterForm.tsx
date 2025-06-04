
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";

interface TestValue {
  parameter: string;
  value: string;
  unit: string;
  reference: string;
  status: 'normal' | 'high' | 'low';
}

interface AddCustomParameterFormProps {
  onAddParameter: (parameter: TestValue) => boolean;
}

export const AddCustomParameterForm = ({ onAddParameter }: AddCustomParameterFormProps) => {
  const [newValue, setNewValue] = useState<TestValue>({
    parameter: "",
    value: "",
    unit: "",
    reference: "",
    status: "normal"
  });

  const handleAdd = () => {
    const success = onAddParameter(newValue);
    if (success) {
      setNewValue({
        parameter: "",
        value: "",
        unit: "",
        reference: "",
        status: "normal"
      });
    }
  };

  return (
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
            <Button onClick={handleAdd}>
              <Plus className="h-4 w-4 mr-2" />
              Add
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
