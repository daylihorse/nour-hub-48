
import { templateService, Template, TemplateFilters } from "@/services/templateService";
import { TemplateStateManager } from "./templateState";
import { TemplateFilterManager } from "./templateFilters";
import { TemplateState } from "@/types/centralTemplateTypes";

export class TemplateOperationsManager {
  constructor(
    private stateManager: TemplateStateManager,
    private filterManager: TemplateFilterManager
  ) {}

  async loadTemplates(): Promise<void> {
    this.stateManager.updateState({ loading: true, error: null });

    try {
      const templates = await templateService.getAllTemplates();
      this.stateManager.updateState({ templates });
      await this.loadMetadata();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to load templates';
      this.stateManager.updateState({ error: errorMessage });
      console.error("Failed to load templates:", error);
    } finally {
      this.stateManager.updateState({ loading: false });
    }
  }

  async searchTemplates(filters: TemplateFilters): Promise<void> {
    this.stateManager.updateState({ loading: true });

    try {
      const templates = await templateService.searchTemplates(filters);
      this.stateManager.updateState({ templates });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to search templates';
      this.stateManager.updateState({ error: errorMessage });
      console.error("Failed to search templates:", error);
    } finally {
      this.stateManager.updateState({ loading: false });
    }
  }

  private async loadMetadata(): Promise<void> {
    try {
      const [categories, sampleTypes, methodologies] = await Promise.all([
        templateService.getTemplateCategories(),
        templateService.getSampleTypes(),
        templateService.getMethodologies()
      ]);

      this.stateManager.updateMetadata({
        categories,
        sampleTypes,
        methodologies
      });
    } catch (error) {
      console.error("Failed to load template metadata:", error);
    }
  }

  async getSelectedTemplateDetails(): Promise<Template[]> {
    const selectedTemplates = this.stateManager.getState().selectedTemplates;
    if (selectedTemplates.length === 0) return [];
    return await templateService.getTemplatesByIds(selectedTemplates);
  }

  getTemplateById(id: string): Template | undefined {
    const templates = this.stateManager.getState().templates;
    return templates.find(template => template.id === id);
  }

  async syncWithService(): Promise<void> {
    try {
      const selectedTemplates = this.stateManager.getState().selectedTemplates;
      const syncedTemplates = await templateService.syncTemplateData(selectedTemplates);
      console.log("Templates synced:", syncedTemplates);
    } catch (error) {
      console.error("Failed to sync templates:", error);
    }
  }

  convertTemplateToFormValues(template: Template) {
    return templateService.convertTemplateParametersToFormValues(template);
  }

  // Auto-search when filters change
  handleFilterChange(filterType: keyof TemplateState['filters'], value: string): void {
    this.filterManager.setFilter(filterType, value);
    this.searchTemplates(this.filterManager.getActiveFilters());
  }

  handleClearFilters(): void {
    this.filterManager.clearFilters();
    this.loadTemplates();
  }
}
