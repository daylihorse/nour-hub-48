
import { TemplateFilters } from "@/types/template";
import { TemplateState } from "@/types/centralTemplateTypes";
import { TemplateStateManager } from "./templateState";

export class TemplateFilterManager {
  constructor(private stateManager: TemplateStateManager) {}

  setFilter(filterType: keyof TemplateState['filters'], value: string): void {
    this.stateManager.updateFilters({ [filterType]: value });
  }

  clearFilters(): void {
    this.stateManager.resetFilters();
  }

  getActiveFilters(): TemplateFilters {
    const filters: TemplateFilters = {};
    const currentFilters = this.stateManager.getState().filters;
    
    if (currentFilters.searchTerm) filters.searchTerm = currentFilters.searchTerm;
    if (currentFilters.category) filters.category = currentFilters.category;
    if (currentFilters.sampleType) filters.sampleType = currentFilters.sampleType;
    if (currentFilters.methodology) filters.methodology = currentFilters.methodology;
    
    return filters;
  }
}
