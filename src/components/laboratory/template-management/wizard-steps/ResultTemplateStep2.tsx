
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Trash2, Settings } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ResultTemplateStep2Props {
  data: any;
  onDataChange: (data: any) => void;
}

const ResultTemplateStep2 = ({ data, onDataChange }: ResultTemplateStep2Props) => {
  const [newParameter, setNewParameter] = useState({
    nameEn: "",
    nameAr: "",
    unit: "",
    dataType: "",
    normalRangeMin: "",
    normalRangeMax: "",
    criticalLow: "",
    criticalHigh: ""
  });

  const addParameter = () => {
    if (newParameter.nameEn && newParameter.nameAr) {
      const updatedParameters = [...(data.parameters || []), { ...newParameter, id: Date.now() }];
      onDataChange({
        ...data,
        parameters: updatedParameters
      });
      setNewParameter({
        nameEn: "",
        nameAr: "",
        unit: "",
        dataType: "",
        normalRangeMin: "",
        normalRangeMax: "",
        criticalLow: "",
        criticalHigh: ""
      });
    }
  };

  const removeParameter = (id: number) => {
    const updatedParameters = data.parameters?.filter((param: any) => param.id !== id) || [];
    onDataChange({
      ...data,
      parameters: updatedParameters
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Test Parameters Configuration
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-4">
            <div className="space-y-2">
              <Label>Parameter Name (English)</Label>
              <Input
                placeholder="e.g., White Blood Cells"
                value={newParameter.nameEn}
                onChange={(e) => setNewParameter({ ...newParameter, nameEn: e.target.value })}
              />
            </div>
            
            <div className="space-y-2">
              <Label>Parameter Name (Arabic)</Label>
              <Input
                placeholder="خلايا الدم البيضاء"
                dir="rtl"
                value={newParameter.nameAr}
                onChange={(e) => setNewParameter({ ...newParameter, nameAr: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label>Unit</Label>
              <Input
                placeholder="x10³/μL"
                value={newParameter.unit}
                onChange={(e) => setNewParameter({ ...newParameter, unit: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label>Data Type</Label>
              <Select onValueChange={(value) => setNewParameter({ ...newParameter, dataType: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
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

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-4">
            <div className="space-y-2">
              <Label>Normal Range Min</Label>
              <Input
                type="number"
                placeholder="5.0"
                value={newParameter.normalRangeMin}
                onChange={(e) => setNewParameter({ ...newParameter, normalRangeMin: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label>Normal Range Max</Label>
              <Input
                type="number"
                placeholder="10.0"
                value={newParameter.normalRangeMax}
                onChange={(e) => setNewParameter({ ...newParameter, normalRangeMax: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label>Critical Low</Label>
              <Input
                type="number"
                placeholder="2.0"
                value={newParameter.criticalLow}
                onChange={(e) => setNewParameter({ ...newParameter, criticalLow: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label>Critical High</Label>
              <Input
                type="number"
                placeholder="20.0"
                value={newParameter.criticalHigh}
                onChange={(e) => setNewParameter({ ...newParameter, criticalHigh: e.target.value })}
              />
            </div>
          </div>

          <Button onClick={addParameter} className="mb-4">
            <Plus className="h-4 w-4 mr-2" />
            Add Parameter
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Configured Parameters</CardTitle>
        </CardHeader>
        <CardContent>
          {data.parameters?.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Parameter Name</TableHead>
                  <TableHead>Unit</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Normal Range</TableHead>
                  <TableHead>Critical Values</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.parameters.map((param: any) => (
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
                    <TableCell>
                      {param.normalRangeMin && param.normalRangeMax 
                        ? `${param.normalRangeMin} - ${param.normalRangeMax}`
                        : "Not set"
                      }
                    </TableCell>
                    <TableCell>
                      {param.criticalLow && param.criticalHigh 
                        ? `< ${param.criticalLow} or > ${param.criticalHigh}`
                        : "Not set"
                      }
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeParameter(param.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              No parameters configured yet. Add parameters using the form above.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ResultTemplateStep2;
