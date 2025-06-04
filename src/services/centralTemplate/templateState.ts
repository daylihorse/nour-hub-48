
import { TemplateState } from "@/types/centralTemplateTypes";

export class TemplateStateManager {
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
  notify(): void {
    this.listeners.forEach(listener => listener({ ...this.state }));
  }

  // Get current state
  getState(): TemplateState {
    return { ...this.state };
  }

  // Update state
  updateState(updates: Partial<TemplateState>): void {
    this.state = { ...this.state, ...updates };
    this.notify();
  }

  // Update nested state properties
  updateFilters(filters: Partial<TemplateState['filters']>): void {
    this.state.filters = { ...this.state.filters, ...filters };
    this.notify();
  }

  updateMetadata(metadata: Partial<TemplateState['metadata']>): void {
    this.state.metadata = { ...this.state.metadata, ...metadata };
    this.notify();
  }

  // Reset filters
  resetFilters(): void {
    this.state.filters = {
      searchTerm: "",
      category: "",
      sampleType: "",
      methodology: ""
    };
    this.notify();
  }
}
