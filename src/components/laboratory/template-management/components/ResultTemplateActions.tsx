
import { Button } from "@/components/ui/button";
import { Edit, Trash2, Copy, Eye, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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

interface ResultTemplateActionsProps {
  template: Template;
  onView: (template: Template) => void;
  onEdit: (template: Template) => void;
  onDuplicate: (template: Template) => void;
  onDelete: (template: Template) => void;
}

const ResultTemplateActions = ({ 
  template, 
  onView, 
  onEdit, 
  onDuplicate, 
  onDelete 
}: ResultTemplateActionsProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => onView(template)}>
          <Eye className="h-4 w-4 mr-2" />
          View
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onEdit(template)}>
          <Edit className="h-4 w-4 mr-2" />
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onDuplicate(template)}>
          <Copy className="h-4 w-4 mr-2" />
          Duplicate
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem 
          className="text-destructive"
          onClick={() => onDelete(template)}
        >
          <Trash2 className="h-4 w-4 mr-2" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ResultTemplateActions;
