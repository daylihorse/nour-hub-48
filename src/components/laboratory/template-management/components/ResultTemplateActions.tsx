import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Eye, Edit, Copy, Trash2 } from "lucide-react";

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
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => onView(template)} className="cursor-pointer">
          <Eye className="mr-2 h-4 w-4" />
          View Template
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onEdit(template)} className="cursor-pointer">
          <Edit className="mr-2 h-4 w-4" />
          Edit Template
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onDuplicate(template)} className="cursor-pointer">
          <Copy className="mr-2 h-4 w-4" />
          Duplicate Template
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem 
          onClick={() => onDelete(template)} 
          className="cursor-pointer text-destructive focus:text-destructive"
        >
          <Trash2 className="mr-2 h-4 w-4" />
          Delete Template
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ResultTemplateActions;