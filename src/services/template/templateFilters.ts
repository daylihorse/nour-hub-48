
import { Template, TemplateFilters } from "@/types/template";

export class TemplateFilterService {
  static applyFilters(templates: Template[], filters: TemplateFilters): Template[] {
    let filteredTemplates = templates.filter(template => template.isActive);

    if (filters.category) {
      filteredTemplates = filteredTemplates.filter(template => 
        template.category.toLowerCase() === filters.category?.toLowerCase()
      );
    }

    if (filters.sampleType) {
      filteredTemplates = filteredTemplates.filter(template => 
        template.sampleType.toLowerCase() === filters.sampleType?.toLowerCase()
      );
    }

    if (filters.methodology) {
      filteredTemplates = filteredTemplates.filter(template => 
        template.methodology.toLowerCase() === filters.methodology?.toLowerCase()
      );
    }

    if (filters.searchTerm) {
      const searchLower = filters.searchTerm.toLowerCase();
      filteredTemplates = filteredTemplates.filter(template => 
        template.nameEn.toLowerCase().includes(searchLower) ||
        template.nameAr.includes(filters.searchTerm!) ||
        template.category.toLowerCase().includes(searchLower)
      );
    }

    return filteredTemplates;
  }

  static extractCategories(templates: Template[]): string[] {
    const categories = [...new Set(templates.map(template => template.category))];
    return categories.sort();
  }

  static extractSampleTypes(templates: Template[]): string[] {
    const sampleTypes = [...new Set(templates.map(template => template.sampleType))];
    return sampleTypes.sort();
  }

  static extractMethodologies(templates: Template[]): string[] {
    const methodologies = [...new Set(templates.map(template => template.methodology))];
    return methodologies.sort();
  }
}
