
export interface Template {
  id: string;
  nameEn: string;
  nameAr: string;
  category: string;
  sampleType: string;
  methodology: string;
  turnaroundTime: string;
  parametersCount: number;
  parameters: Array<{
    id: number;
    nameEn: string;
    nameAr: string;
    unit: string;
    dataType: string;
    normalRangeMin: string;
    normalRangeMax: string;
    criticalLow: string;
    criticalHigh: string;
  }>;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface TemplateFilters {
  category?: string;
  sampleType?: string;
  methodology?: string;
  searchTerm?: string;
}

export interface TemplateCacheEntry {
  data: Template[];
  timestamp: number;
  filters?: TemplateFilters;
}
