
import { useState, useEffect, useMemo, useCallback } from 'react';
import { OperationsDataService } from '@/services/operations/operationsDataService';
import { 
  OperationAlert, 
  OperationsStats, 
  InventoryItem, 
  PurchaseOrder 
} from '@/types/operations';

export interface UseOptimizedOperationsDataReturn {
  alerts: OperationAlert[];
  stats: OperationsStats;
  inventoryItems: InventoryItem[];
  purchaseOrders: PurchaseOrder[];
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
  // Computed values
  lowStockItems: InventoryItem[];
  criticalAlerts: OperationAlert[];
  totalInventoryValue: number;
  pendingOrdersCount: number;
}

// Cache for expensive computations
const computationCache = new Map<string, any>();

export const useOptimizedOperationsData = (): UseOptimizedOperationsDataReturn => {
  const [alerts, setAlerts] = useState<OperationAlert[]>([]);
  const [stats, setStats] = useState<OperationsStats | null>(null);
  const [inventoryItems, setInventoryItems] = useState<InventoryItem[]>([]);
  const [purchaseOrders, setPurchaseOrders] = useState<PurchaseOrder[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Use Promise.all for parallel data fetching
      const [alertsData, statsData, inventoryData, ordersData] = await Promise.all([
        Promise.resolve(OperationsDataService.getMockAlerts()),
        Promise.resolve(OperationsDataService.getMockOperationsStats()),
        Promise.resolve(OperationsDataService.getMockInventoryItems()),
        Promise.resolve(OperationsDataService.getMockPurchaseOrders())
      ]);

      setAlerts(alertsData);
      setStats(statsData);
      setInventoryItems(inventoryData);
      setPurchaseOrders(ordersData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch operations data');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Memoized computed values with caching
  const lowStockItems = useMemo(() => {
    const cacheKey = `lowStock-${inventoryItems.length}-${inventoryItems.map(i => i.status).join(',')}`;
    
    if (computationCache.has(cacheKey)) {
      return computationCache.get(cacheKey);
    }

    const result = inventoryItems.filter(item => 
      item.status === 'low_stock' || item.status === 'out_of_stock'
    );
    
    computationCache.set(cacheKey, result);
    return result;
  }, [inventoryItems]);

  const criticalAlerts = useMemo(() => {
    const cacheKey = `criticalAlerts-${alerts.length}-${alerts.map(a => a.priority).join(',')}`;
    
    if (computationCache.has(cacheKey)) {
      return computationCache.get(cacheKey);
    }

    const result = alerts.filter(alert => alert.priority === 'critical');
    
    computationCache.set(cacheKey, result);
    return result;
  }, [alerts]);

  const totalInventoryValue = useMemo(() => {
    const cacheKey = `totalValue-${inventoryItems.length}-${inventoryItems.map(i => i.totalValue).join(',')}`;
    
    if (computationCache.has(cacheKey)) {
      return computationCache.get(cacheKey);
    }

    const result = inventoryItems.reduce((sum, item) => sum + item.totalValue, 0);
    
    computationCache.set(cacheKey, result);
    return result;
  }, [inventoryItems]);

  const pendingOrdersCount = useMemo(() => {
    return purchaseOrders.filter(order => order.status !== 'paid').length;
  }, [purchaseOrders]);

  const refetch = useCallback(() => {
    // Clear relevant cache entries on refetch
    computationCache.clear();
    fetchData();
  }, [fetchData]);

  return {
    alerts,
    stats: stats || {
      activeHorses: 0,
      occupiedRooms: 0,
      pendingMovements: 0,
      lowStockItems: 0,
      pendingLabTests: 0,
      scheduledAppointments: 0,
      outstandingInvoices: 0
    },
    inventoryItems,
    purchaseOrders,
    isLoading,
    error,
    refetch,
    lowStockItems,
    criticalAlerts,
    totalInventoryValue,
    pendingOrdersCount
  };
};
