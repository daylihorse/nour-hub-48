
import { useState, useEffect, useMemo } from 'react';
import { OperationsDataService } from '@/services/operations/operationsDataService';
import { 
  OperationAlert, 
  OperationsStats, 
  InventoryItem, 
  PurchaseOrder 
} from '@/types/operations';

export interface UseOperationsDataReturn {
  alerts: OperationAlert[];
  stats: OperationsStats;
  inventoryItems: InventoryItem[];
  purchaseOrders: PurchaseOrder[];
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

export const useOperationsData = (): UseOperationsDataReturn => {
  const [alerts, setAlerts] = useState<OperationAlert[]>([]);
  const [stats, setStats] = useState<OperationsStats | null>(null);
  const [inventoryItems, setInventoryItems] = useState<InventoryItem[]>([]);
  const [purchaseOrders, setPurchaseOrders] = useState<PurchaseOrder[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Simulate API calls with small delays for realism
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
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => {
    fetchData();
  };

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
    refetch
  };
};
