
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

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

export const useResultTemplates = () => {
  const { toast } = useToast();
  const [viewingTemplate, setViewingTemplate] = useState<Template | null>(null);
  const [editingTemplate, setEditingTemplate] = useState<Template | null>(null);
  const [deletingTemplate, setDeletingTemplate] = useState<Template | null>(null);
  const [templates, setTemplates] = useState<Template[]>([
    {
      id: "1",
      nameEn: "Complete Blood Count",
      nameAr: "تعداد الدم الكامل",
      category: "Hematology",
      parametersCount: 12,
      normalRanges: "Age/Gender specific",
      lastModified: "2024-06-01",
      status: "active",
      usageCount: 156
    },
    {
      id: "2", 
      nameEn: "Liver Function Panel",
      nameAr: "فحص وظائف الكبد",
      category: "Clinical Chemistry",
      parametersCount: 8,
      normalRanges: "Standard adult",
      lastModified: "2024-05-28",
      status: "active",
      usageCount: 89
    },
    {
      id: "3",
      nameEn: "Thyroid Profile",
      nameAr: "ملف الغدة الدرقية", 
      category: "Endocrinology",
      parametersCount: 5,
      normalRanges: "Age specific",
      lastModified: "2024-05-15",
      status: "draft",
      usageCount: 0
    }
  ]);

  const handleViewTemplate = (template: Template) => {
    setViewingTemplate(template);
  };

  const handleEditTemplate = (template: Template) => {
    setEditingTemplate(template);
  };

  const handleSaveTemplate = (updatedTemplate: Template) => {
    setTemplates(prev => 
      prev.map(t => t.id === updatedTemplate.id ? {
        ...updatedTemplate,
        lastModified: new Date().toISOString().split('T')[0]
      } : t)
    );
    
    toast({
      title: "Template Updated",
      description: `"${updatedTemplate.nameEn}" has been updated successfully.`,
    });
  };

  const handleDuplicateTemplate = (template: Template) => {
    const duplicatedTemplate: Template = {
      ...template,
      id: `${template.id}-copy-${Date.now()}`,
      nameEn: `${template.nameEn} (Copy)`,
      nameAr: `${template.nameAr} (نسخة)`,
      usageCount: 0,
      lastModified: new Date().toISOString().split('T')[0],
      status: "draft"
    };

    setTemplates(prev => [...prev, duplicatedTemplate]);
    
    toast({
      title: "Template Duplicated",
      description: `"${template.nameEn}" has been duplicated successfully.`,
    });
  };

  const handleDeleteTemplate = (template: Template) => {
    setDeletingTemplate(template);
  };

  const confirmDeleteTemplate = () => {
    if (deletingTemplate) {
      setTemplates(prev => prev.filter(t => t.id !== deletingTemplate.id));
      
      toast({
        title: "Template Deleted",
        description: `"${deletingTemplate.nameEn}" has been deleted successfully.`,
        variant: "destructive",
      });
      
      setDeletingTemplate(null);
    }
  };

  return {
    templates,
    viewingTemplate,
    editingTemplate,
    deletingTemplate,
    setViewingTemplate,
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
