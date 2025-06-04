
import { templateService, Template, TemplateFilters } from "./templateService";

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
  searchTemplates: (filters: TemplateFilters) => Promise<void>;
  selectTemplate: (templateId: string) => void;
  deselectTemplate: (templateId: string) => void;
  clearSelection: () => void;
  setFilter: (filterType: keyof TemplateState['filters'], value: string) => void;
  clearFilters: () => void;
  getSelectedTemplateDetails: () => Promise<Template[]>;
  syncWithService: () => Promise<void>;
}

class CentralTemplateService {
  private state: TemplateState = {
    templates: [],
    selectedTemplates: [],
    loading: false,
    error: null,
    filters: {
      searchTerm: "",
      category: "",
      sampleType: "",
      methodology: ""
    },
    metadata: {
      categories: [],
      sampleTypes: [],
      methodologies: []
    }
  };

  private listeners: Set<(state: TemplateState) => void> = new Set();

  // Subscribe to state changes
  subscribe(listener: (state: TemplateState) => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  // Notify all listeners of state changes
  private notify(): void {
    this.listeners.forEach(listener => listener({ ...this.state }));
  }

  // Get current state
  getState(): TemplateState {
    return { ...this.state };
  }

  // Load all templates
  async loadTemplates(): Promise<void> {
    this.state.loading = true;
    this.state.error = null;
    this.notify();

    try {
      const templates = await templateService.getAllTemplates();
      this.state.templates = templates;
      await this.loadMetadata();
    } catch (error) {
      this.state.error = error instanceof Error ? error.message : 'Failed to load templates';
      console.error("Failed to load templates:", error);
    } finally {
      this.state.loading = false;
      this.notify();
    }
  }

  // Search templates with filters
  async searchTemplates(filters: TemplateFilters): Promise<void> {
    this.state.loading = true;
    this.notify();

    try {
      const templates = await templateService.searchTemplates(filters);
      this.state.templates = templates;
    } catch (error) {
      this.state.error = error instanceof Error ? error.message : 'Failed to search templates';
      console.error("Failed to search templates:", error);
    } finally {
      this.state.loading = false;
      this.notify();
    }
  }

  // Load metadata (categories, sample types, methodologies)
  private async loadMetadata(): Promise<void> {
    try {
      const [categories, sampleTypes, methodologies] = await Promise.all([
        templateService.getTemplateCategories(),
        templateService.getSampleTypes(),
        templateService.getMethodologies()
      ]);

      this.state.metadata = {
        categories,
        sampleTypes,
        methodologies
      };
    } catch (error) {
      console.error("Failed to load template metadata:", error);
    }
  }

  // Template selection methods
  selectTemplate(templateId: string): void {
    if (!this.state.selectedTemplates.includes(templateId)) {
      this.state.selectedTemplates.push(templateId);
      this.notify();
    }
  }

  deselectTemplate(templateId: string): void {
    this.state.selectedTemplates = this.state.selectedTemplates.filter(id => id !== templateId);
    this.notify();
  }

  clearSelection(): void {
    this.state.selectedTemplates = [];
    this.notify();
  }

  setSelectedTemplates(templateIds: string[]): void {
    this.state.selectedTemplates = [...templateIds];
    this.notify();
  }

  // Filter methods
  setFilter(filterType: keyof TemplateState['filters'], value: string): void {
    this.state.filters[filterType] = value;
    this.notify();
    
    // Auto-search when filters change
    this.searchTemplates(this.getActiveFilters());
  }

  clearFilters(): void {
    this.state.filters = {
      searchTerm: "",
      category: "",
      sampleType: "",
      methodology: ""
    };
    this.notify();
    this.loadTemplates();
  }

  private getActiveFilters(): TemplateFilters {
    const filters: TemplateFilters = {};
    
    if (this.state.filters.searchTerm) filters.searchTerm = this.state.filters.searchTerm;
    if (this.state.filters.category) filters.category = this.state.filters.category;
    if (this.state.filters.sampleType) filters.sampleType = this.state.filters.sampleType;
    if (this.state.filters.methodology) filters.methodology = this.state.filters.methodology;
    
    return filters;
  }

  // Get selected template details
  async getSelectedTemplateDetails(): Promise<Template[]> {
    if (this.state.selectedTemplates.length === 0) return [];
    return await templateService.getTemplatesByIds(this.state.selectedTemplates);
  }

  // Get template by ID from current state
  getTemplateById(id: string): Template | undefined {
    return this.state.templates.find(template => template.id === id);
  }

  // Sync with template service
  async syncWithService(): Promise<void> {
    try {
      const syncedTemplates = await templateService.syncTemplateData(this.state.selectedTemplates);
      console.log("Templates synced:", syncedTemplates);
    } catch (error) {
      console.error("Failed to sync templates:", error);
    }
  }

  // Convert template parameters for form usage
  convertTemplateToFormValues(template: Template) {
    return templateService.convertTemplateParametersToFormValues(template);
  }
}

export const centralTemplateService = new CentralTemplateService();
