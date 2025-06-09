
import { useState } from 'react';

export interface OperationAlert {
  id: string;
  type: string;
  priority: string;
  message: string;
  department: string;
  createdAt: Date;
}

export interface InventoryItem {
  id: string;
  name: string;
  category: string;
  currentStock: number;
  minimumStock: number;
  unitCost: number;
  supplier: string;
  status: 'in_stock' | 'low_stock' | 'out_of_stock' | 'on_order';
  totalValue: number;
}

export interface PurchaseOrder {
  id: string;
  supplierName: string;
  orderDate: Date;
  expectedDelivery?: Date;
  status: 'pending' | 'approved' | 'sent' | 'delivered';
  totalAmount: number;
  items: {
    itemName: string;
    quantity: number;
    totalCost: number;
  }[];
}

export const useOperationsData = () => {
  const [isLoading] = useState(false);
  
  const mockAlerts: OperationAlert[] = [
    {
      id: 'alert_001',
      type: 'equipment',
      priority: 'high',
      message: 'Training equipment allocation required',
      department: 'Training',
      createdAt: new Date()
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
      supplier: 'Equestrian Supply Co.',
      status: 'low_stock',
      totalValue: 2500
    }
  ];

  const mockPurchaseOrders: PurchaseOrder[] = [
    {
      id: 'po_001',
      supplierName: 'Training Equipment Ltd.',
      orderDate: new Date(),
      status: 'pending',
      totalAmount: 1500,
      items: [
        {
          itemName: 'Training Cones',
          quantity: 20,
          totalCost: 300
        }
      ]
    }
  ];

  return {
    alerts: mockAlerts,
    inventoryItems: mockInventoryItems,
    purchaseOrders: mockPurchaseOrders,
    isLoading
  };
};
