
import { Template, TemplateFilters } from "@/types/template";
import { mockTemplates, getTemplateUsageStats } from "./template/templateData";
import { TemplateCache } from "./template/templateCache";
import { TemplateFilterService } from "./template/templateFilters";
import { TemplateConverter } from "./template/templateConverter";

class TemplateService {
  private templates: Template[] = mockTemplates;
  private cache: TemplateCache = new TemplateCache();

  async getAllTemplates(): Promise<Template[]> {
    const cacheKey = this.cache.getCacheKeyForFilters();
    const cached = this.cache.getFromCache(cacheKey);
    if (cached) return cached;

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 300));
    const activeTemplates = this.templates.filter(template => template.isActive);
    
    this.cache.setCache(cacheKey, activeTemplates);
    return activeTemplates;
  }

  async getTemplateById(id: string): Promise<Template | undefined> {
    await new Promise(resolve => setTimeout(resolve, 100));
    return this.templates.find(template => template.id === id && template.isActive);
  }

  async getTemplatesByIds(ids: string[]): Promise<Template[]> {
    await new Promise(resolve => setTimeout(resolve, 200));
    return this.templates.filter(template => ids.includes(template.id) && template.isActive);
  }

  async searchTemplates(filters: TemplateFilters): Promise<Template[]> {
    const cacheKey = this.cache.getCacheKeyForFilters(filters);
    const cached = this.cache.getFromCache(cacheKey);
    if (cached) return cached;

    await new Promise(resolve => setTimeout(resolve, 200));
    
    const filteredTemplates = TemplateFilterService.applyFilters(this.templates, filters);

    this.cache.setCache(cacheKey, filteredTemplates, filters);
    return filteredTemplates;
  }

  async getTemplateCategories(): Promise<string[]> {
    await new Promise(resolve => setTimeout(resolve, 100));
    return TemplateFilterService.extractCategories(this.templates);
  }

  async getSampleTypes(): Promise<string[]> {
    await new Promise(resolve => setTimeout(resolve, 100));
    return TemplateFilterService.extractSampleTypes(this.templates);
  }

  async getMethodologies(): Promise<string[]> {
    await new Promise(resolve => setTimeout(resolve, 100));
    return TemplateFilterService.extractMethodologies(this.templates);
  }

  convertTemplateParametersToFormValues(template: Template) {
    return TemplateConverter.convertTemplateParametersToFormValues(template);
  }

  // New methods for template synchronization
  async syncTemplateData(templateIds: string[]): Promise<Template[]> {
    console.log("Syncing template data for IDs:", templateIds);
    return await this.getTemplatesByIds(templateIds);
  }

  clearCache(): void {
    this.cache.clearCache();
  }

  getTemplateUsageStats(): { [templateId: string]: number } {
    return getTemplateUsageStats();
  }
}

export const templateService = new TemplateService();
export type { Template, TemplateFilters } from "@/types/template";
