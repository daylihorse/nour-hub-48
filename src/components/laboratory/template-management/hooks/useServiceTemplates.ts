
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

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

export const useServiceTemplates = () => {
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

  return {
    templates,
    editingTemplate,
    deletingTemplate,
    setEditingTemplate,
    setDeletingTemplate,
    handleViewTemplate,
    handleEditTemplate,
    handleSaveTemplate,
    handleDuplicateTemplate,
    handleDeleteTemplate,
    confirmDeleteTemplate
  };
};
