
import { storeService } from './storeService';
import { StoreProduct, StoreService, CartItem } from '@/types/store';

class MarketplaceService {
  // Get all products and services from all departments for marketplace view
  getAllMarketplaceItems(): (StoreProduct | StoreService)[] {
    const allProducts = storeService.getProducts();
    const allServices = storeService.getServices();
    return [...allProducts, ...allServices];
  }

  // Get marketplace items by category
  getItemsByCategory(category: string): (StoreProduct | StoreService)[] {
    const allItems = this.getAllMarketplaceItems();
    return allItems.filter(item => item.category === category);
  }

  // Search marketplace items
  searchItems(searchTerm: string): (StoreProduct | StoreService)[] {
    const allItems = this.getAllMarketplaceItems();
    return allItems.filter(item => 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  // Filter items by search term and category
  filterItems(searchTerm: string, category: string): (StoreProduct | StoreService)[] {
    const allItems = this.getAllMarketplaceItems();
    return allItems.filter(item => {
      const matchesSearch = !searchTerm || 
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = !category || item.category === category;
      return matchesSearch && matchesCategory && item.isActive;
    });
  }

  // Get unique categories from all items
  getAvailableCategories(): string[] {
    const allItems = this.getAllMarketplaceItems();
    const categories = new Set(allItems.map(item => item.category));
    return Array.from(categories).sort();
  }

  // Convert marketplace item to cart item
  convertToCartItem(item: StoreProduct | StoreService): CartItem {
    const isProduct = 'stock' in item;
    return {
      id: item.id,
      type: isProduct ? 'product' : 'service',
      item,
      quantity: 1,
      totalPrice: item.price,
    };
  }
}

export const marketplaceService = new MarketplaceService();
