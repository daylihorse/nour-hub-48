
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Trash2 } from "lucide-react";
import { StatusIndicator } from "./StatusIndicator";

interface TestValue {
  parameter: string;
  value: string;
  unit: string;
  reference: string;
  status: 'normal' | 'high' | 'low';
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
  if (values.length === 0) return null;

  return (
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
          <TableRow key={index}>
            <TableCell>
              <div className="font-medium">{value.parameter}</div>
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
  );
};
