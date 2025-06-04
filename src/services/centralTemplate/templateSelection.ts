
import { TemplateStateManager } from "./templateState";

export class TemplateSelectionManager {
  constructor(private stateManager: TemplateStateManager) {}

  selectTemplate(templateId: string): void {
    const currentState = this.stateManager.getState();
    if (!currentState.selectedTemplates.includes(templateId)) {
      this.stateManager.updateState({
        selectedTemplates: [...currentState.selectedTemplates, templateId]
      });
    }
  }

  deselectTemplate(templateId: string): void {
    const currentState = this.stateManager.getState();
    this.stateManager.updateState({
      selectedTemplates: currentState.selectedTemplates.filter(id => id !== templateId)
    });
  }

  clearSelection(): void {
    this.stateManager.updateState({
      selectedTemplates: []
    });
  }

  setSelectedTemplates(templateIds: string[]): void {
    this.stateManager.updateState({
      selectedTemplates: [...templateIds]
    });
  }
}
