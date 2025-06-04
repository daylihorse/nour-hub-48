
import { TemplateStateManager } from "./centralTemplate/templateState";
import { TemplateSelectionManager } from "./centralTemplate/templateSelection";
import { TemplateFilterManager } from "./centralTemplate/templateFilters";
import { TemplateOperationsManager } from "./centralTemplate/templateOperations";
import { Template } from "@/types/template";
import { TemplateState } from "@/types/centralTemplateTypes";

class CentralTemplateService {
  private stateManager: TemplateStateManager;
  private selectionManager: TemplateSelectionManager;
  private filterManager: TemplateFilterManager;
  private operationsManager: TemplateOperationsManager;

  constructor() {
    this.stateManager = new TemplateStateManager();
    this.selectionManager = new TemplateSelectionManager(this.stateManager);
    this.filterManager = new TemplateFilterManager(this.stateManager);
    this.operationsManager = new TemplateOperationsManager(this.stateManager, this.filterManager);
  }

  // State management
  subscribe(listener: (state: TemplateState) => void): () => void {
    return this.stateManager.subscribe(listener);
  }

  getState(): TemplateState {
    return this.stateManager.getState();
  }

  // Template operations
  async loadTemplates(): Promise<void> {
    return this.operationsManager.loadTemplates();
  }

  async searchTemplates(filters: any): Promise<void> {
    return this.operationsManager.searchTemplates(filters);
  }

  async getSelectedTemplateDetails(): Promise<Template[]> {
    return this.operationsManager.getSelectedTemplateDetails();
  }

  getTemplateById(id: string): Template | undefined {
    return this.operationsManager.getTemplateById(id);
  }

  async syncWithService(): Promise<void> {
    return this.operationsManager.syncWithService();
  }

  convertTemplateToFormValues(template: Template) {
    return this.operationsManager.convertTemplateToFormValues(template);
  }

  // Selection management
  selectTemplate(templateId: string): void {
    this.selectionManager.selectTemplate(templateId);
  }

  deselectTemplate(templateId: string): void {
    this.selectionManager.deselectTemplate(templateId);
  }

  clearSelection(): void {
    this.selectionManager.clearSelection();
  }

  setSelectedTemplates(templateIds: string[]): void {
    this.selectionManager.setSelectedTemplates(templateIds);
  }

  // Filter management
  setFilter(filterType: keyof TemplateState['filters'], value: string): void {
    this.operationsManager.handleFilterChange(filterType, value);
  }

  clearFilters(): void {
    this.operationsManager.handleClearFilters();
  }
}

export const centralTemplateService = new CentralTemplateService();
export type { TemplateState, TemplateOperations } from "@/types/centralTemplateTypes";
