
import { StoreProduct, StoreService } from '@/types/store';
import { storeService } from './storeService';

export interface MarketplaceProduct extends StoreProduct {
  rating: number;
  reviewCount: number;
  featured: boolean;
  tags: string[];
  vendor: {
    name: string;
    rating: number;
    verified: boolean;
  };
}

export interface MarketplaceService extends StoreService {
  rating: number;
  reviewCount: number;
  featured: boolean;
  tags: string[];
  provider: {
    name: string;
    rating: number;
    verified: boolean;
  };
}

class PublicMarketplaceService {
  private enhancedProducts: MarketplaceProduct[] = [];
  private enhancedServices: MarketplaceService[] = [];

  constructor() {
    this.initializeMarketplaceData();
  }

  private initializeMarketplaceData() {
    // Get base products and services from storeService
    const baseProducts = storeService.getProducts();
    const baseServices = storeService.getServices();

    // Enhance products with marketplace-specific data
    this.enhancedProducts = baseProducts.map(product => ({
      ...product,
      rating: Math.floor(Math.random() * 2) + 4, // 4-5 stars
      reviewCount: Math.floor(Math.random() * 100) + 10,
      featured: Math.random() > 0.7,
      tags: this.generateTags(product.category, product.department),
      vendor: {
        name: this.getVendorName(product.department),
        rating: Math.floor(Math.random() * 1) + 4.5,
        verified: true
      }
    }));

    // Enhance services with marketplace-specific data
    this.enhancedServices = baseServices.map(service => ({
      ...service,
      rating: Math.floor(Math.random() * 2) + 4,
      reviewCount: Math.floor(Math.random() * 50) + 5,
      featured: Math.random() > 0.8,
      tags: this.generateTags(service.category, service.department),
      provider: {
        name: this.getProviderName(service.department),
        rating: Math.floor(Math.random() * 1) + 4.5,
        verified: true
      }
    }));
  }

  private generateTags(category: string, department: string): string[] {
    const baseTags = [category.toLowerCase().replace(/\s+/g, '-')];
    
    const departmentTags: Record<string, string[]> = {
      inventory: ['feed', 'supplies', 'equipment'],
      clinic: ['veterinary', 'health', 'medical'],
      laboratory: ['testing', 'analysis', 'diagnostics'],
      marketplace: ['premium', 'exclusive', 'bestseller']
    };

    return [...baseTags, ...(departmentTags[department] || [])];
  }

  private getVendorName(department: string): string {
    const vendors: Record<string, string[]> = {
      inventory: ['EquiSupply Pro', 'Horse Feed Direct', 'Stable Solutions'],
      clinic: ['VetMed Plus', 'Equine Health Co', 'Animal Care Supply'],
      laboratory: ['Lab Tech Equine', 'Diagnostic Solutions', 'Test Pro Labs'],
      marketplace: ['Premium Equine', 'Elite Horse Gear', 'Pro Rider Supply']
    };
    
    const departmentVendors = vendors[department] || ['EquiSense Store'];
    return departmentVendors[Math.floor(Math.random() * departmentVendors.length)];
  }

  private getProviderName(department: string): string {
    const providers: Record<string, string[]> = {
      inventory: ['Inventory Experts', 'Supply Chain Pro', 'Stock Masters'],
      clinic: ['Veterinary Services', 'Animal Health Pro', 'Equine Care Team'],
      laboratory: ['Lab Analysis Pro', 'Diagnostic Team', 'Test Specialists'],
      marketplace: ['Marketplace Pros', 'E-commerce Experts', 'Digital Solutions']
    };
    
    const departmentProviders = providers[department] || ['EquiSense Services'];
    return departmentProviders[Math.floor(Math.random() * departmentProviders.length)];
  }

  // Public methods
  getAllProducts(): MarketplaceProduct[] {
    return this.enhancedProducts.filter(p => p.isActive);
  }

  getAllServices(): MarketplaceService[] {
    return this.enhancedServices.filter(s => s.isActive);
  }

  getFeaturedProducts(): MarketplaceProduct[] {
    return this.enhancedProducts.filter(p => p.featured && p.isActive);
  }

  getFeaturedServices(): MarketplaceService[] {
    return this.enhancedServices.filter(s => s.featured && s.isActive);
  }

  searchProducts(query: string): MarketplaceProduct[] {
    const searchTerm = query.toLowerCase();
    return this.enhancedProducts.filter(product => 
      product.isActive && (
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm) ||
        product.tags.some(tag => tag.includes(searchTerm))
      )
    );
  }

  searchServices(query: string): MarketplaceService[] {
    const searchTerm = query.toLowerCase();
    return this.enhancedServices.filter(service => 
      service.isActive && (
        service.name.toLowerCase().includes(searchTerm) ||
        service.description.toLowerCase().includes(searchTerm) ||
        service.category.toLowerCase().includes(searchTerm) ||
        service.tags.some(tag => tag.includes(searchTerm))
      )
    );
  }

  getProductsByCategory(category: string): MarketplaceProduct[] {
    return this.enhancedProducts.filter(p => p.category === category && p.isActive);
  }

  getServicesByCategory(category: string): MarketplaceService[] {
    return this.enhancedServices.filter(s => s.category === category && s.isActive);
  }

  getProductsByDepartment(department: string): MarketplaceProduct[] {
    return this.enhancedProducts.filter(p => p.department === department && p.isActive);
  }

  getServicesByDepartment(department: string): MarketplaceService[] {
    return this.enhancedServices.filter(s => s.department === department && s.isActive);
  }

  getCategories(): string[] {
    const productCategories = this.enhancedProducts.map(p => p.category);
    const serviceCategories = this.enhancedServices.map(s => s.category);
    return Array.from(new Set([...productCategories, ...serviceCategories])).sort();
  }

  getDepartments(): string[] {
    const productDepartments = this.enhancedProducts.map(p => p.department);
    const serviceDepartments = this.enhancedServices.map(s => s.department);
    return Array.from(new Set([...productDepartments, ...serviceDepartments])).sort();
  }

  filterItems(filters: {
    query?: string;
    category?: string;
    department?: string;
    minPrice?: number;
    maxPrice?: number;
    rating?: number;
    featured?: boolean;
  }) {
    let products = this.enhancedProducts.filter(p => p.isActive);
    let services = this.enhancedServices.filter(s => s.isActive);

    if (filters.query) {
      products = this.searchProducts(filters.query);
      services = this.searchServices(filters.query);
    }

    if (filters.category) {
      products = products.filter(p => p.category === filters.category);
      services = services.filter(s => s.category === filters.category);
    }

    if (filters.department) {
      products = products.filter(p => p.department === filters.department);
      services = services.filter(s => s.department === filters.department);
    }

    if (filters.minPrice !== undefined) {
      products = products.filter(p => p.price >= filters.minPrice!);
      services = services.filter(s => s.price >= filters.minPrice!);
    }

    if (filters.maxPrice !== undefined) {
      products = products.filter(p => p.price <= filters.maxPrice!);
      services = services.filter(s => s.price <= filters.maxPrice!);
    }

    if (filters.rating) {
      products = products.filter(p => p.rating >= filters.rating!);
      services = services.filter(s => s.rating >= filters.rating!);
    }

    if (filters.featured) {
      products = products.filter(p => p.featured);
      services = services.filter(s => s.featured);
    }

    return { products, services };
  }
}

export const publicMarketplaceService = new PublicMarketplaceService();
