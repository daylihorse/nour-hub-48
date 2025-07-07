import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export interface LaboratoryTemplate {
  id: string;
  nameEn: string;
  nameAr: string;
  category: string;
  sampleType: string;
  methodology: string;
  turnaroundTime: string;
  parametersCount: number;
  parameters: Array<{
    id: number;
    nameEn: string;
    nameAr: string;
    unit: string;
    dataType: string;
    normalRangeMin: string;
    normalRangeMax: string;
    criticalLow: string;
    criticalHigh: string;
  }>;
  status: 'active' | 'draft' | 'archived';
  usageCount: number;
  createdAt: string;
  updatedAt: string;
  tenantId: string;
}

export const useTemplateManagement = () => {
  const { toast } = useToast();
  const [templates, setTemplates] = useState<LaboratoryTemplate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Filters
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [sampleTypeFilter, setSampleTypeFilter] = useState("");
  const [methodologyFilter, setMethodologyFilter] = useState("");

  // Metadata
  const [categories, setCategories] = useState<string[]>([]);
  const [sampleTypes, setSampleTypes] = useState<string[]>([]);
  const [methodologies, setMethodologies] = useState<string[]>([]);

  // Load templates from mock data initially
  useEffect(() => {
    loadMockTemplates();
  }, []);

  const loadMockTemplates = () => {
    const mockTemplates: LaboratoryTemplate[] = [
      {
        id: "1",
        nameEn: "Complete Blood Count",
        nameAr: "تعداد الدم الكامل",
        category: "Hematology",
        sampleType: "Blood",
        methodology: "Flow Cytometry",
        turnaroundTime: "2 hours",
        parametersCount: 12,
        parameters: [
          {
            id: 1,
            nameEn: "Hemoglobin",
            nameAr: "الهيموجلوبين",
            unit: "g/dL",
            dataType: "numeric",
            normalRangeMin: "12.0",
            normalRangeMax: "16.0",
            criticalLow: "7.0",
            criticalHigh: "20.0"
          },
          {
            id: 2,
            nameEn: "White Blood Cells",
            nameAr: "كريات الدم البيضاء",
            unit: "K/uL",
            dataType: "numeric",
            normalRangeMin: "4.0",
            normalRangeMax: "11.0",
            criticalLow: "2.0",
            criticalHigh: "50.0"
          }
        ],
        status: 'active',
        usageCount: 156,
        createdAt: "2024-01-15",
        updatedAt: "2024-06-01",
        tenantId: "default"
      },
      {
        id: "2",
        nameEn: "Liver Function Panel",
        nameAr: "فحص وظائف الكبد",
        category: "Clinical Chemistry",
        sampleType: "Serum",
        methodology: "Spectrophotometry",
        turnaroundTime: "4 hours",
        parametersCount: 8,
        parameters: [
          {
            id: 1,
            nameEn: "ALT",
            nameAr: "إنزيم الألت",
            unit: "U/L",
            dataType: "numeric",
            normalRangeMin: "7",
            normalRangeMax: "40",
            criticalLow: "0",
            criticalHigh: "200"
          }
        ],
        status: 'active',
        usageCount: 89,
        createdAt: "2024-02-01",
        updatedAt: "2024-05-28",
        tenantId: "default"
      },
      {
        id: "3",
        nameEn: "Thyroid Profile",
        nameAr: "ملف الغدة الدرقية",
        category: "Endocrinology",
        sampleType: "Serum",
        methodology: "Immunoassay",
        turnaroundTime: "6 hours",
        parametersCount: 5,
        parameters: [
          {
            id: 1,
            nameEn: "TSH",
            nameAr: "الهرمون المحفز للغدة الدرقية",
            unit: "mIU/L",
            dataType: "numeric",
            normalRangeMin: "0.5",
            normalRangeMax: "4.5",
            criticalLow: "0.1",
            criticalHigh: "100"
          }
        ],
        status: 'draft',
        usageCount: 0,
        createdAt: "2024-03-01",
        updatedAt: "2024-05-15",
        tenantId: "default"
      }
    ];

    setTemplates(mockTemplates);
    
    // Extract metadata
    const uniqueCategories = [...new Set(mockTemplates.map(t => t.category))];
    const uniqueSampleTypes = [...new Set(mockTemplates.map(t => t.sampleType))];
    const uniqueMethodologies = [...new Set(mockTemplates.map(t => t.methodology))];
    
    setCategories(uniqueCategories);
    setSampleTypes(uniqueSampleTypes);
    setMethodologies(uniqueMethodologies);
    setLoading(false);
  };

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = !searchTerm || 
      template.nameEn.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.nameAr.includes(searchTerm);
    
    const matchesCategory = !categoryFilter || template.category === categoryFilter;
    const matchesSampleType = !sampleTypeFilter || template.sampleType === sampleTypeFilter;
    const matchesMethodology = !methodologyFilter || template.methodology === methodologyFilter;
    
    return matchesSearch && matchesCategory && matchesSampleType && matchesMethodology;
  });

  const clearFilters = () => {
    setSearchTerm("");
    setCategoryFilter("");
    setSampleTypeFilter("");
    setMethodologyFilter("");
  };

  const createTemplate = async (templateData: Partial<LaboratoryTemplate>) => {
    try {
      const newTemplate: LaboratoryTemplate = {
        id: `template_${Date.now()}`,
        nameEn: templateData.nameEn || "",
        nameAr: templateData.nameAr || "",
        category: templateData.category || "",
        sampleType: templateData.sampleType || "",
        methodology: templateData.methodology || "",
        turnaroundTime: templateData.turnaroundTime || "",
        parametersCount: templateData.parameters?.length || 0,
        parameters: templateData.parameters || [],
        status: 'draft',
        usageCount: 0,
        createdAt: new Date().toISOString().split('T')[0],
        updatedAt: new Date().toISOString().split('T')[0],
        tenantId: "default"
      };

      setTemplates(prev => [...prev, newTemplate]);
      
      toast({
        title: "Template Created",
        description: `"${newTemplate.nameEn}" has been created successfully.`,
      });

      return newTemplate;
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create template",
        variant: "destructive"
      });
      throw error;
    }
  };

  const updateTemplate = async (id: string, updates: Partial<LaboratoryTemplate>) => {
    try {
      setTemplates(prev => prev.map(template => 
        template.id === id 
          ? { 
              ...template, 
              ...updates, 
              updatedAt: new Date().toISOString().split('T')[0] 
            }
          : template
      ));

      toast({
        title: "Template Updated",
        description: "Template has been updated successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update template",
        variant: "destructive"
      });
      throw error;
    }
  };

  const deleteTemplate = async (id: string) => {
    try {
      const template = templates.find(t => t.id === id);
      setTemplates(prev => prev.filter(t => t.id !== id));
      
      toast({
        title: "Template Deleted",
        description: `"${template?.nameEn}" has been deleted successfully.`,
        variant: "destructive"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete template",
        variant: "destructive"
      });
      throw error;
    }
  };

  const duplicateTemplate = async (id: string) => {
    try {
      const template = templates.find(t => t.id === id);
      if (!template) return;

      const duplicatedTemplate: LaboratoryTemplate = {
        ...template,
        id: `${template.id}_copy_${Date.now()}`,
        nameEn: `${template.nameEn} (Copy)`,
        nameAr: `${template.nameAr} (نسخة)`,
        status: 'draft',
        usageCount: 0,
        createdAt: new Date().toISOString().split('T')[0],
        updatedAt: new Date().toISOString().split('T')[0]
      };

      setTemplates(prev => [...prev, duplicatedTemplate]);
      
      toast({
        title: "Template Duplicated",
        description: `"${template.nameEn}" has been duplicated successfully.`,
      });

      return duplicatedTemplate;
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to duplicate template",
        variant: "destructive"
      });
      throw error;
    }
  };

  return {
    templates: filteredTemplates,
    allTemplates: templates,
    loading,
    error,
    searchTerm,
    categoryFilter,
    sampleTypeFilter,
    methodologyFilter,
    categories,
    sampleTypes,
    methodologies,
    setSearchTerm,
    setCategoryFilter,
    setSampleTypeFilter,
    setMethodologyFilter,
    clearFilters,
    createTemplate,
    updateTemplate,
    deleteTemplate,
    duplicateTemplate
  };
};