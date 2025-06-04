
import { TableCell, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import ResultTemplateActions from "./ResultTemplateActions";

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

interface ResultTemplateRowProps {
  template: Template;
  onView: (template: Template) => void;
  onEdit: (template: Template) => void;
  onDuplicate: (template: Template) => void;
  onDelete: (template: Template) => void;
}

const ResultTemplateRow = ({ 
  template, 
  onView, 
  onEdit, 
  onDuplicate, 
  onDelete 
}: ResultTemplateRowProps) => {
  const getStatusBadge = (status: string) => {
    const statusMap = {
      active: { variant: "default" as const, label: "Active" },
      draft: { variant: "secondary" as const, label: "Draft" },
      archived: { variant: "outline" as const, label: "Archived" }
    };
    
    return (
      <Badge variant={statusMap[status as keyof typeof statusMap]?.variant || "outline"}>
        {statusMap[status as keyof typeof statusMap]?.label || status}
      </Badge>
    );
  };

  return (
    <TableRow key={template.id}>
      <TableCell>
        <div>
          <div className="font-medium">{template.nameEn}</div>
          <div className="text-sm text-muted-foreground" dir="rtl">
            {template.nameAr}
          </div>
        </div>
      </TableCell>
      <TableCell>{template.category}</TableCell>
      <TableCell>{template.parametersCount} parameters</TableCell>
      <TableCell>{template.normalRanges}</TableCell>
      <TableCell>{getStatusBadge(template.status)}</TableCell>
      <TableCell>{template.usageCount} times</TableCell>
      <TableCell>{template.lastModified}</TableCell>
      <TableCell>
        <ResultTemplateActions
          template={template}
          onView={onView}
          onEdit={onEdit}
          onDuplicate={onDuplicate}
          onDelete={onDelete}
        />
      </TableCell>
    </TableRow>
  );
};

export default ResultTemplateRow;
