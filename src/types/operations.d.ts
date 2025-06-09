
export interface OperationAlert {
  id: string;
  type: 'inventory' | 'movement' | 'room' | 'horse' | 'lab' | 'clinic' | 'finance';
  priority: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  message: string;
  timestamp: Date;
  actionRequired: boolean;
}

export interface OperationsStats {
  activeHorses: number;
  occupiedRooms: number;
  pendingMovements: number;
  lowStockItems: number;
  pendingLabTests: number;
  scheduledAppointments: number;
  outstandingInvoices: number;
}

export interface QuickAction {
  title: string;
  icon: any;
  link: string;
  color: string;
}

export interface WorkflowStep {
  id: string;
  title: string;
  department: string;
  description: string;
  status: 'pending' | 'in_progress' | 'completed' | 'blocked';
  assignedTo?: string;
  estimatedTime?: string;
  dependencies?: string[];
  actions: string[];
}

export interface InventoryItem {
  id: string;
  name: string;
  category: string;
  currentStock: number;
  minimumStock: number;
  unitCost: number;
  totalValue: number;
  supplier: string;
  lastOrderDate: Date;
  status: 'in_stock' | 'low_stock' | 'out_of_stock' | 'on_order';
}

export interface PurchaseOrder {
  id: string;
  supplierId: string;
  supplierName: string;
  items: Array<{
    itemId: string;
    itemName: string;
    quantity: number;
    unitCost: number;
    totalCost: number;
  }>;
  totalAmount: number;
  status: 'draft' | 'sent' | 'approved' | 'delivered' | 'paid';
  orderDate: Date;
  expectedDelivery?: Date;
  invoiceNumber?: string;
}
