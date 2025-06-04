
import { Button } from "@/components/ui/button";
import { Edit, Trash2, Copy, Eye, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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

interface ServiceTemplateActionsProps {
  template: ServiceTemplate;
  onView: (template: ServiceTemplate) => void;
  onEdit: (template: ServiceTemplate) => void;
  onDuplicate: (template: ServiceTemplate) => void;
  onDelete: (template: ServiceTemplate) => void;
}

const ServiceTemplateActions = ({ 
  template, 
  onView, 
  onEdit, 
  onDuplicate, 
  onDelete 
}: ServiceTemplateActionsProps) => {
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

export default ServiceTemplateActions;
