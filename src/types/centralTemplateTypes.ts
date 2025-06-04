
import { Template } from "./template";

export interface TemplateState {
  templates: Template[];
  selectedTemplates: string[];
  loading: boolean;
  error: string | null;
  filters: {
    searchTerm: string;
    category: string;
    sampleType: string;
    methodology: string;
  };
  metadata: {
    categories: string[];
    sampleTypes: string[];
    methodologies: string[];
  };
}

export interface TemplateOperations {
  loadTemplates: () => Promise<void>;
  searchTemplates: (filters: any) => Promise<void>;
  selectTemplate: (templateId: string) => void;
  deselectTemplate: (templateId: string) => void;
  clearSelection: () => void;
  setFilter: (filterType: keyof TemplateState['filters'], value: string) => void;
  clearFilters: () => void;
  getSelectedTemplateDetails: () => Promise<Template[]>;
  syncWithService: () => Promise<void>;
}
