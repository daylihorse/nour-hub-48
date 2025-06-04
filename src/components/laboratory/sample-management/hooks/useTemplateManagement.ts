
import { useState, useEffect } from "react";
import { templateService, Template, TemplateFilters } from "@/services/templateService";

export const useTemplateManagement = () => {
  const [selectedTemplates, setSelectedTemplates] = useState<string[]>([]);
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("");
  const [sampleTypeFilter, setSampleTypeFilter] = useState<string>("");
  const [methodologyFilter, setMethodologyFilter] = useState<string>("");
  
  // Filter options
  const [categories, setCategories] = useState<string[]>([]);
  const [sampleTypes, setSampleTypes] = useState<string[]>([]);
  const [methodologies, setMethodologies] = useState<string[]>([]);

  useEffect(() => {
    loadTemplates();
    loadFilterOptions();
  }, []);

  useEffect(() => {
    searchTemplates();
  }, [searchTerm, categoryFilter, sampleTypeFilter, methodologyFilter]);

  const loadTemplates = async () => {
    setLoading(true);
    try {
      const allTemplates = await templateService.getAllTemplates();
      setTemplates(allTemplates);
    } catch (error) {
      console.error("Failed to load templates:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadFilterOptions = async () => {
    try {
      const [categoriesData, sampleTypesData, methodologiesData] = await Promise.all([
        templateService.getTemplateCategories(),
        templateService.getSampleTypes(),
        templateService.getMethodologies()
      ]);
      
      setCategories(categoriesData);
      setSampleTypes(sampleTypesData);
      setMethodologies(methodologiesData);
    } catch (error) {
      console.error("Failed to load filter options:", error);
    }
  };

  const searchTemplates = async () => {
    if (!searchTerm && !categoryFilter && !sampleTypeFilter && !methodologyFilter) {
      loadTemplates();
      return;
    }

    setLoading(true);
    try {
      const filters: TemplateFilters = {
        searchTerm: searchTerm || undefined,
        category: categoryFilter || undefined,
        sampleType: sampleTypeFilter || undefined,
        methodology: methodologyFilter || undefined
      };
      
      const filteredTemplates = await templateService.searchTemplates(filters);
      setTemplates(filteredTemplates);
    } catch (error) {
      console.error("Failed to search templates:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleTemplateChange = (templateId: string, checked: boolean) => {
    if (checked) {
      setSelectedTemplates(prev => [...prev, templateId]);
    } else {
      setSelectedTemplates(prev => prev.filter(id => id !== templateId));
    }
  };

  const resetTemplates = () => {
    setSelectedTemplates([]);
  };

  const clearFilters = () => {
    setSearchTerm("");
    setCategoryFilter("");
    setSampleTypeFilter("");
    setMethodologyFilter("");
  };

  const getSelectedTemplateDetails = async () => {
    if (selectedTemplates.length === 0) return [];
    return await templateService.getTemplatesByIds(selectedTemplates);
  };

  return {
    selectedTemplates,
    templates,
    loading,
    searchTerm,
    categoryFilter,
    sampleTypeFilter,
    methodologyFilter,
    categories,
    sampleTypes,
    methodologies,
    handleTemplateChange,
    resetTemplates,
    setSearchTerm,
    setCategoryFilter,
    setSampleTypeFilter,
    setMethodologyFilter,
    clearFilters,
    getSelectedTemplateDetails
  };
};
