
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Trash2, FlaskConical } from "lucide-react";
import { StatusIndicator } from "./StatusIndicator";
import { TestValueStatus } from "../../AddTestResultDialog";

interface TestValue {
  parameter: string;
  value: string;
  unit: string;
  reference: string;
  status: TestValueStatus;
  templateId?: string;
}

interface TemplateParametersTableProps {
  values: TestValue[];
  onUpdateValue: (index: number, field: string, value: any) => void;
  onRemoveValue: (index: number) => void;
}

export const TemplateParametersTable = ({ 
  values, 
  onUpdateValue, 
  onRemoveValue 
}: TemplateParametersTableProps) => {
  if (values.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground border-2 border-dashed rounded-lg">
        <FlaskConical className="h-12 w-12 mx-auto mb-3 opacity-50" />
        <p className="text-lg font-medium">No parameters to display</p>
        <p className="text-sm">
          Load template parameters using the button above or add custom parameters below
        </p>
      </div>
    );
  }

  return (
    <div className="border rounded-lg">
      <div className="bg-muted/50 px-4 py-2 border-b">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">
            Parameters ({values.length})
          </span>
          <span className="text-xs text-muted-foreground">
            Enter values and monitor status indicators
          </span>
        </div>
      </div>
      
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
          {values.map((value, index) => (
            <TableRow key={`${value.parameter}-${index}`}>
              <TableCell>
                <div className="font-medium">{value.parameter}</div>
                {value.templateId && (
                  <div className="text-xs text-muted-foreground mt-1">
                    Template parameter
                  </div>
                )}
              </TableCell>
              <TableCell>
                <Input
                  value={value.value}
                  onChange={(e) => onUpdateValue(index, 'value', e.target.value)}
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
                <StatusIndicator status={value.status} />
              </TableCell>
              <TableCell>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onRemoveValue(index)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
