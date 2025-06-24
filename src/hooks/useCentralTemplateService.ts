
import { useLaboratoryData } from './useLaboratoryData';
import { LaboratoryTemplate } from '@/services/laboratory/laboratoryService';

export interface TemplateFilters {
  searchTerm: string;
  category: string;
  sampleType: string;
  methodology: string;
}

export interface TemplateMetadata {
  categories: string[];
  sampleTypes: string[];
  methodologies: string[];
}

export const useCentralTemplateService = () => {
  const { templates, templatesLoading } = useLaboratoryData();
  
  // State for selected templates and filters
  const [selectedTemplates, setSelectedTemplates] = React.useState<string[]>([]);
  const [filters, setFilters] = React.useState<TemplateFilters>({
    searchTerm: '',
    category: '',
    sampleType: '',
    methodology: ''
  });

  // Extract metadata from templates
  const metadata: TemplateMetadata = React.useMemo(() => {
    const categories = [...new Set(templates.map(t => t.category))];
    const sampleTypes = [...new Set(templates.map(t => t.sample_type).filter(Boolean))];
    const methodologies = [...new Set(templates.map(t => t.methodology).filter(Boolean))];
    
    return { categories, sampleTypes, methodologies };
  }, [templates]);

  // Filter templates based on current filters
  const filteredTemplates = React.useMemo(() => {
    return templates.filter(template => {
      const matchesSearch = !filters.searchTerm || 
        template.name_en.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        (template.name_ar && template.name_ar.includes(filters.searchTerm));
      
      const matchesCategory = !filters.category || template.category === filters.category;
      const matchesSampleType = !filters.sampleType || template.sample_type === filters.sampleType;
      const matchesMethodology = !filters.methodology || template.methodology === filters.methodology;
      
      return matchesSearch && matchesCategory && matchesSampleType && matchesMethodology;
    });
  }, [templates, filters]);

  const selectTemplate = (templateId: string) => {
    setSelectedTemplates(prev => [...prev, templateId]);
  };

  const deselectTemplate = (templateId: string) => {
    setSelectedTemplates(prev => prev.filter(id => id !== templateId));
  };

  const clearSelection = () => {
    setSelectedTemplates([]);
  };

  const setFilter = (key: keyof TemplateFilters, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      searchTerm: '',
      category: '',
      sampleType: '',
      methodology: ''
    });
  };

  const getSelectedTemplateDetails = async () => {
    return templates.filter(t => selectedTemplates.includes(t.id));
  };

  const loadTemplates = () => {
    // Templates are automatically loaded via the useLaboratoryData hook
    // This function is kept for compatibility
  };

  return {
    templates: filteredTemplates,
    selectedTemplates,
    loading: templatesLoading,
    error: null,
    filters,
    metadata,
    selectTemplate,
    deselectTemplate,
    clearSelection,
    setFilter,
    clearFilters,
    getSelectedTemplateDetails,
    loadTemplates
  };
};
