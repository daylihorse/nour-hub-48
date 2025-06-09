
import { useState, useMemo } from 'react';
import { InventoryItem, PurchaseOrder } from '@/types/operations';
import { calculateInventoryMetrics } from '@/utils/operationsUtils';

export interface UseInventoryManagementProps {
  inventoryItems: InventoryItem[];
  purchaseOrders: PurchaseOrder[];
}

export interface UseInventoryManagementReturn {
  filteredItems: InventoryItem[];
  lowStockItems: InventoryItem[];
  metrics: {
    totalValue: number;
    lowStockCount: number;
    inStockCount: number;
    outOfStockCount: number;
  };
  pendingOrderValue: number;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  statusFilter: string;
  setStatusFilter: (status: string) => void;
  categoryFilter: string;
  setCategoryFilter: (category: string) => void;
  createAutomaticOrder: (itemId: string) => void;
}

export const useInventoryManagement = ({ 
  inventoryItems, 
  purchaseOrders 
}: UseInventoryManagementProps): UseInventoryManagementReturn => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const filteredItems = useMemo(() => {
    return inventoryItems.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.category.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
      const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
      
      return matchesSearch && matchesStatus && matchesCategory;
    });
  }, [inventoryItems, searchTerm, statusFilter, categoryFilter]);

  const lowStockItems = useMemo(() => {
    return inventoryItems.filter(item => 
      item.status === 'low_stock' || item.status === 'out_of_stock'
    );
  }, [inventoryItems]);

  const metrics = useMemo(() => {
    return calculateInventoryMetrics(inventoryItems);
  }, [inventoryItems]);

  const pendingOrderValue = useMemo(() => {
    return purchaseOrders
      .filter(order => order.status !== 'paid')
      .reduce((sum, order) => sum + order.totalAmount, 0);
  }, [purchaseOrders]);

  const createAutomaticOrder = (itemId: string) => {
    const item = inventoryItems.find(i => i.id === itemId);
    if (item) {
      console.log(`Creating automatic order for ${item.name}`);
      // This would integrate with the actual ordering system
      // In a real implementation, this would call an API
    }
  };

  return {
    filteredItems,
    lowStockItems,
    metrics,
    pendingOrderValue,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    categoryFilter,
    setCategoryFilter,
    createAutomaticOrder
  };
};
