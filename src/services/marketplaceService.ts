
import { storeService } from './storeService';
import { StoreProduct, StoreService, CartItem } from '@/types/store';

class MarketplaceService {
  constructor() {
    console.log('MarketplaceService initialized');
  }

  // Get all products and services from all departments for marketplace view
  getAllMarketplaceItems(): (StoreProduct | StoreService)[] {
    console.log('getAllMarketplaceItems called');
    try {
      const allProducts = storeService.getProducts();
      const allServices = storeService.getServices();
      const combinedItems = [...allProducts, ...allServices];
      console.log('Total marketplace items:', combinedItems.length);
      console.log('Products:', allProducts.length, 'Services:', allServices.length);
      return combinedItems;
    } catch (error) {
      console.error('Error getting marketplace items:', error);
      return [];
    }
  }

  // Get marketplace items by category
  getItemsByCategory(category: string): (StoreProduct | StoreService)[] {
    console.log('getItemsByCategory called with category:', category);
    try {
      const allItems = this.getAllMarketplaceItems();
      const filtered = allItems.filter(item => item.category === category);
      console.log('Items in category', category, ':', filtered.length);
      return filtered;
    } catch (error) {
      console.error('Error getting items by category:', error);
      return [];
    }
  }

  // Search marketplace items
  searchItems(searchTerm: string): (StoreProduct | StoreService)[] {
    console.log('searchItems called with term:', searchTerm);
    try {
      const allItems = this.getAllMarketplaceItems();
      const searchResults = allItems.filter(item => 
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
      console.log('Search results for', searchTerm, ':', searchResults.length);
      return searchResults;
    } catch (error) {
      console.error('Error searching items:', error);
      return [];
    }
  }

  // Filter items by search term and category
  filterItems(searchTerm: string, category: string): (StoreProduct | StoreService)[] {
    console.log('filterItems called with searchTerm:', searchTerm, 'category:', category);
    try {
      const allItems = this.getAllMarketplaceItems();
      const filtered = allItems.filter(item => {
        const matchesSearch = !searchTerm || 
          item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = !category || item.category === category;
        const isActive = item.isActive;
        return matchesSearch && matchesCategory && isActive;
      });
      console.log('Filtered items:', filtered.length);
      console.log('Filter criteria - Search:', searchTerm, 'Category:', category);
      return filtered;
    } catch (error) {
      console.error('Error filtering items:', error);
      return [];
    }
  }

  // Get unique categories from all items
  getAvailableCategories(): string[] {
    console.log('getAvailableCategories called');
    try {
      const allItems = this.getAllMarketplaceItems();
      const categories = new Set(allItems.map(item => item.category));
      const categoriesArray = Array.from(categories).sort();
      console.log('Available categories:', categoriesArray);
      return categoriesArray;
    } catch (error) {
      console.error('Error getting categories:', error);
      return [];
    }
  }

  // Convert marketplace item to cart item
  convertToCartItem(item: StoreProduct | StoreService): CartItem {
    console.log('convertToCartItem called for:', item.name);
    try {
      const isProduct = 'stock' in item;
      const cartItem: CartItem = {
        id: item.id,
        type: isProduct ? 'product' : 'service',
        item,
        quantity: 1,
        totalPrice: item.price,
      };
      console.log('Cart item created:', cartItem.type, cartItem.item.name);
      return cartItem;
    } catch (error) {
      console.error('Error converting to cart item:', error);
      throw error;
    }
  }
}

export const marketplaceService = new MarketplaceService();
