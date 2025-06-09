
import { OperationAlert, OperationsStats, InventoryItem, PurchaseOrder } from "@/types/operations";

export class OperationsDataService {
  // Mock data - in a real app, this would connect to APIs
  static getMockAlerts(): OperationAlert[] {
    return [
      {
        id: '1',
        type: 'inventory',
        priority: 'critical',
        title: 'Low Feed Stock',
        message: 'Premium hay supply below minimum threshold',
        timestamp: new Date(),
        actionRequired: true
      },
      {
        id: '2',
        type: 'movement',
        priority: 'high',
        title: 'Incoming Arrival',
        message: 'Arabian mare scheduled for arrival in 2 hours',
        timestamp: new Date(),
        actionRequired: true
      },
      {
        id: '3',
        type: 'lab',
        priority: 'medium',
        title: 'Test Results Ready',
        message: '3 blood test results awaiting review',
        timestamp: new Date(),
        actionRequired: false
      }
    ];
  }

  static getMockOperationsStats(): OperationsStats {
    return {
      activeHorses: 47,
      occupiedRooms: 32,
      pendingMovements: 5,
      lowStockItems: 8,
      pendingLabTests: 12,
      scheduledAppointments: 7,
      outstandingInvoices: 3
    };
  }

  static getMockInventoryItems(): InventoryItem[] {
    return [
      {
        id: '1',
        name: 'Premium Horse Feed',
        category: 'Feed',
        currentStock: 15,
        minimumStock: 50,
        unitCost: 25.00,
        totalValue: 375.00,
        supplier: 'Feed Co.',
        lastOrderDate: new Date('2024-01-15'),
        status: 'low_stock'
      },
      {
        id: '2',
        name: 'Veterinary Syringes',
        category: 'Medical',
        currentStock: 0,
        minimumStock: 100,
        unitCost: 0.50,
        totalValue: 0,
        supplier: 'MedSupply Inc.',
        lastOrderDate: new Date('2024-01-10'),
        status: 'out_of_stock'
      },
      {
        id: '3',
        name: 'Grooming Brushes',
        category: 'Equipment',
        currentStock: 25,
        minimumStock: 10,
        unitCost: 15.00,
        totalValue: 375.00,
        supplier: 'Equine Tools',
        lastOrderDate: new Date('2024-01-20'),
        status: 'in_stock'
      }
    ];
  }

  static getMockPurchaseOrders(): PurchaseOrder[] {
    return [
      {
        id: 'PO-001',
        supplierId: '1',
        supplierName: 'Feed Co.',
        items: [
          {
            itemId: '1',
            itemName: 'Premium Horse Feed',
            quantity: 100,
            unitCost: 25.00,
            totalCost: 2500.00
          }
        ],
        totalAmount: 2500.00,
        status: 'sent',
        orderDate: new Date('2024-01-25'),
        expectedDelivery: new Date('2024-02-01')
      },
      {
        id: 'PO-002',
        supplierId: '2',
        supplierName: 'MedSupply Inc.',
        items: [
          {
            itemId: '2',
            itemName: 'Veterinary Syringes',
            quantity: 500,
            unitCost: 0.50,
            totalCost: 250.00
          }
        ],
        totalAmount: 250.00,
        status: 'approved',
        orderDate: new Date('2024-01-26'),
        expectedDelivery: new Date('2024-01-30')
      }
    ];
  }
}
