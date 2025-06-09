
import { InventoryItem, StockStatus } from './types';

export const getStockStatus = (current: number, minimum: number): StockStatus => {
  if (current === 0) return { status: "out_of_stock", color: "bg-red-500", text: "Out of Stock" };
  if (current <= minimum) return { status: "low_stock", color: "bg-orange-500", text: "Low Stock" };
  return { status: "in_stock", color: "bg-green-500", text: "In Stock" };
};

export const isExpiringSoon = (expiryDate: string): boolean => {
  const expiry = new Date(expiryDate);
  const today = new Date();
  const daysUntilExpiry = Math.ceil((expiry.getTime() - today.getTime()) / (1000 * 3600 * 24));
  return daysUntilExpiry <= 90; // Within 3 months
};

export const filterItems = (
  items: InventoryItem[],
  searchTerm: string,
  categoryFilter: string,
  stockFilter: string
): InventoryItem[] => {
  return items.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.genericName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.brandName?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
    
    let matchesStock = true;
    if (stockFilter === 'low_stock') {
      matchesStock = item.currentStock <= item.minimumStock;
    } else if (stockFilter === 'out_of_stock') {
      matchesStock = item.currentStock === 0;
    } else if (stockFilter === 'expiring_soon') {
      matchesStock = isExpiringSoon(item.expiryDate);
    }
    
    return matchesSearch && matchesCategory && matchesStock;
  });
};
