
import { Template, TemplateCacheEntry, TemplateFilters } from "@/types/template";

export class TemplateCache {
  private cache: Map<string, TemplateCacheEntry> = new Map();
  private cacheTimeout = 5 * 60 * 1000; // 5 minutes

  private getCacheKey(filters?: TemplateFilters): string {
    if (!filters) return 'all';
    return JSON.stringify(filters);
  }

  private isCacheValid(entry: TemplateCacheEntry): boolean {
    return Date.now() - entry.timestamp < this.cacheTimeout;
  }

  setCache(key: string, data: Template[], filters?: TemplateFilters): void {
    this.cache.set(key, {
      data: [...data],
      timestamp: Date.now(),
      filters
    });
  }

  getFromCache(key: string): Template[] | null {
    const entry = this.cache.get(key);
    if (entry && this.isCacheValid(entry)) {
      return entry.data;
    }
    this.cache.delete(key);
    return null;
  }

  getCacheKeyForFilters(filters?: TemplateFilters): string {
    return this.getCacheKey(filters);
  }

  clearCache(): void {
    this.cache.clear();
  }
}
