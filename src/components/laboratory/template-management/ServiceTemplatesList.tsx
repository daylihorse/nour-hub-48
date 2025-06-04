import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2, Copy, Eye, MoreHorizontal, Clock, DollarSign } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import DeleteConfirmationDialog from "./dialogs/DeleteConfirmationDialog";
import EditServiceTemplateDialog from "./dialogs/EditServiceTemplateDialog";

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

interface ServiceTemplatesListProps {
  searchTerm: string;
}

const ServiceTemplatesList = ({ searchTerm }: ServiceTemplatesListProps) => {
  const { toast } = useToast();
  const [editingTemplate, setEditingTemplate] = useState<ServiceTemplate | null>(null);
  const [deletingTemplate, setDeletingTemplate] = useState<ServiceTemplate | null>(null);
  const [templates, setTemplates] = useState<ServiceTemplate[]>([
    {
      id: "1",
      nameEn: "Basic Health Checkup",
      nameAr: "فحص صحي أساسي",
      description: "Comprehensive basic health screening",
      testsIncluded: ["CBC", "Basic Metabolic Panel", "Urinalysis"],
      duration: "2-3 hours",
      price: "$150",
      category: "Preventive Care",
      status: "active"
    },
    {
      id: "2",
      nameEn: "Pre-Competition Screening",
      nameAr: "فحص ما قبل المنافسة", 
      description: "Complete health assessment before competitions",
      testsIncluded: ["CBC", "Drug Screen", "Cardiac Panel", "Liver Function"],
      duration: "4-6 hours",
      price: "$300",
      category: "Competition",
      status: "active"
    },
    {
      id: "3",
      nameEn: "Annual Wellness Package",
      nameAr: "حزمة العافية السنوية",
      description: "Comprehensive annual health monitoring",
      testsIncluded: ["CBC", "Chemistry Panel", "Thyroid", "Parasite Screen"],
      duration: "1 day",
      price: "$250",
      category: "Wellness",
      status: "draft"
    }
  ]);

  const filteredTemplates = templates.filter(template =>
    template.nameEn.toLowerCase().includes(searchTerm.toLowerCase()) ||
    template.nameAr.includes(searchTerm) ||
    template.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewTemplate = (template: ServiceTemplate) => {
    toast({
      title: "View Service Template",
      description: `Viewing details for "${template.nameEn}"`,
    });
    console.log("View service template:", template);
  };

  const handleEditTemplate = (template: ServiceTemplate) => {
    setEditingTemplate(template);
  };

  const handleSaveTemplate = (updatedTemplate: ServiceTemplate) => {
    setTemplates(prev => 
      prev.map(t => t.id === updatedTemplate.id ? updatedTemplate : t)
    );
    
    toast({
      title: "Service Template Updated",
      description: `"${updatedTemplate.nameEn}" has been updated successfully.`,
    });
  };

  const handleDuplicateTemplate = (template: ServiceTemplate) => {
    const duplicatedTemplate: ServiceTemplate = {
      ...template,
      id: `${template.id}-copy-${Date.now()}`,
      nameEn: `${template.nameEn} (Copy)`,
      nameAr: `${template.nameAr} (نسخة)`,
      status: "draft"
    };

    setTemplates(prev => [...prev, duplicatedTemplate]);
    
    toast({
      title: "Service Template Duplicated",
      description: `"${template.nameEn}" has been duplicated successfully.`,
    });
  };

  const handleDeleteTemplate = (template: ServiceTemplate) => {
    setDeletingTemplate(template);
  };

  const confirmDeleteTemplate = () => {
    if (deletingTemplate) {
      setTemplates(prev => prev.filter(t => t.id !== deletingTemplate.id));
      
      toast({
        title: "Service Template Deleted",
        description: `"${deletingTemplate.nameEn}" has been deleted successfully.`,
        variant: "destructive",
      });
      
      setDeletingTemplate(null);
    }
  };

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
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTemplates.map((template) => (
          <Card key={template.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <CardTitle className="text-lg">{template.nameEn}</CardTitle>
                  <div className="text-sm text-muted-foreground" dir="rtl">
                    {template.nameAr}
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => handleViewTemplate(template)}>
                      <Eye className="h-4 w-4 mr-2" />
                      View
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleEditTemplate(template)}>
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleDuplicateTemplate(template)}>
                      <Copy className="h-4 w-4 mr-2" />
                      Duplicate
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem 
                      className="text-destructive"
                      onClick={() => handleDeleteTemplate(template)}
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">{template.description}</p>
              
              <div className="space-y-2">
                <div className="text-sm font-medium">Included Tests:</div>
                <div className="flex flex-wrap gap-1">
                  {template.testsIncluded.map((test, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {test}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex justify-between items-center text-sm">
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {template.duration}
                </div>
                <div className="flex items-center gap-1 font-medium">
                  <DollarSign className="h-4 w-4" />
                  {template.price}
                </div>
              </div>

              <div className="flex justify-between items-center">
                <Badge variant="secondary">{template.category}</Badge>
                {getStatusBadge(template.status)}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <EditServiceTemplateDialog
        template={editingTemplate}
        isOpen={!!editingTemplate}
        onClose={() => setEditingTemplate(null)}
        onSave={handleSaveTemplate}
      />

      <DeleteConfirmationDialog
        isOpen={!!deletingTemplate}
        onClose={() => setDeletingTemplate(null)}
        onConfirm={confirmDeleteTemplate}
        templateName={deletingTemplate?.nameEn || ""}
      />
    </div>
  );
};

export default ServiceTemplatesList;
