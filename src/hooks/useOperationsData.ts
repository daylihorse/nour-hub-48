
import { useState } from 'react';
import { OperationAlert, InventoryItem, PurchaseOrder, OperationsStats } from '@/types/operations';

export const useOperationsData = () => {
  const [isLoading] = useState(false);
  const [error] = useState<string | null>(null);
  
  const mockAlerts: OperationAlert[] = [
    {
      id: 'alert_001',
      type: 'inventory',
      priority: 'high',
      title: 'Low Stock Alert',
      message: 'Training equipment allocation required',
      timestamp: new Date(),
      actionRequired: true
    },
    {
      id: 'alert_002',
      type: 'horse',
      priority: 'medium',
      title: 'Horse Assignment',
      message: 'Horse #H003 requires room assignment',
      timestamp: new Date(),
      actionRequired: true
    }
  ];

  const mockInventoryItems: InventoryItem[] = [
    {
      id: 'inv_001',
      name: 'Training Saddle',
      category: 'Equipment',
      currentStock: 5,
      minimumStock: 10,
      unitCost: 500,
      totalValue: 2500,
      supplier: 'Equestrian Supply Co.',
      lastOrderDate: new Date('2024-01-15'),
      status: 'low_stock'
    },
    {
      id: 'inv_002',
      name: 'Horse Feed',
      category: 'Feed',
      currentStock: 50,
      minimumStock: 30,
      unitCost: 25,
      totalValue: 1250,
      supplier: 'Feed Solutions Inc.',
      lastOrderDate: new Date('2024-01-20'),
      status: 'in_stock'
    }
  ];

  const mockPurchaseOrders: PurchaseOrder[] = [
    {
      id: 'po_001',
      supplierId: 'supplier_001',
      supplierName: 'Training Equipment Ltd.',
      items: [
        {
          itemId: 'item_001',
          itemName: 'Training Cones',
          quantity: 20,
          unitCost: 15,
          totalCost: 300
        }
      ],
      totalAmount: 1500,
      status: 'sent',
      orderDate: new Date(),
      expectedDelivery: new Date('2024-02-15')
    }
  ];

  const stats: OperationsStats = {
    activeHorses: 25,
    occupiedRooms: 18,
    pendingMovements: 3,
    lowStockItems: mockInventoryItems.filter(item => item.status === 'low_stock').length,
    pendingLabTests: 7,
    scheduledAppointments: 12,
    outstandingInvoices: 4
  };

  return {
    alerts: mockAlerts,
    inventoryItems: mockInventoryItems,
    purchaseOrders: mockPurchaseOrders,
    stats,
    isLoading,
    error
  };
};
