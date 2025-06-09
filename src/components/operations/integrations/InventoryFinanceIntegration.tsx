
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Package, 
  DollarSign, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle,
  ShoppingCart,
  FileText,
  Calendar
} from "lucide-react";

interface InventoryItem {
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

interface PurchaseOrder {
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

const InventoryFinanceIntegration = () => {
  const [selectedTab, setSelectedTab] = useState<'overview' | 'orders' | 'alerts'>('overview');

  // Mock data
  const inventoryItems: InventoryItem[] = [
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

  const purchaseOrders: PurchaseOrder[] = [
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'in_stock': return 'text-green-600 bg-green-50';
      case 'low_stock': return 'text-yellow-600 bg-yellow-50';
      case 'out_of_stock': return 'text-red-600 bg-red-50';
      case 'on_order': return 'text-blue-600 bg-blue-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getOrderStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'text-green-600 bg-green-50';
      case 'approved': return 'text-blue-600 bg-blue-50';
      case 'sent': return 'text-purple-600 bg-purple-50';
      case 'paid': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const totalInventoryValue = inventoryItems.reduce((sum, item) => sum + item.totalValue, 0);
  const lowStockItems = inventoryItems.filter(item => item.status === 'low_stock' || item.status === 'out_of_stock');
  const pendingOrderValue = purchaseOrders
    .filter(order => order.status !== 'paid')
    .reduce((sum, order) => sum + order.totalAmount, 0);

  const createAutomaticOrder = (itemId: string) => {
    const item = inventoryItems.find(i => i.id === itemId);
    if (item) {
      console.log(`Creating automatic order for ${item.name}`);
      // This would integrate with the actual ordering system
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Inventory & Finance Integration</h2>
        <p className="text-muted-foreground">
          Unified inventory management with automated financial tracking
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Package className="h-5 w-5 text-blue-500" />
              <div>
                <p className="text-sm text-muted-foreground">Total Inventory Value</p>
                <p className="text-xl font-bold">${totalInventoryValue.toFixed(2)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-500" />
              <div>
                <p className="text-sm text-muted-foreground">Low Stock Items</p>
                <p className="text-xl font-bold">{lowStockItems.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5 text-purple-500" />
              <div>
                <p className="text-sm text-muted-foreground">Pending Orders</p>
                <p className="text-xl font-bold">{purchaseOrders.filter(o => o.status !== 'paid').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-green-500" />
              <div>
                <p className="text-sm text-muted-foreground">Outstanding Orders</p>
                <p className="text-xl font-bold">${pendingOrderValue.toFixed(2)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Navigation Tabs */}
      <div className="flex gap-2">
        <Button 
          variant={selectedTab === 'overview' ? 'default' : 'outline'}
          onClick={() => setSelectedTab('overview')}
        >
          Overview
        </Button>
        <Button 
          variant={selectedTab === 'orders' ? 'default' : 'outline'}
          onClick={() => setSelectedTab('orders')}
        >
          Purchase Orders
        </Button>
        <Button 
          variant={selectedTab === 'alerts' ? 'default' : 'outline'}
          onClick={() => setSelectedTab('alerts')}
        >
          Stock Alerts
        </Button>
      </div>

      {/* Content based on selected tab */}
      {selectedTab === 'overview' && (
        <Card>
          <CardHeader>
            <CardTitle>Inventory Status</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Item</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Current Stock</TableHead>
                  <TableHead>Min. Stock</TableHead>
                  <TableHead>Unit Cost</TableHead>
                  <TableHead>Total Value</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {inventoryItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell>{item.category}</TableCell>
                    <TableCell>{item.currentStock}</TableCell>
                    <TableCell>{item.minimumStock}</TableCell>
                    <TableCell>${item.unitCost.toFixed(2)}</TableCell>
                    <TableCell>${item.totalValue.toFixed(2)}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(item.status)}>
                        {item.status.replace('_', ' ')}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {(item.status === 'low_stock' || item.status === 'out_of_stock') && (
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => createAutomaticOrder(item.id)}
                        >
                          Order Now
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {selectedTab === 'orders' && (
        <Card>
          <CardHeader>
            <CardTitle>Purchase Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Supplier</TableHead>
                  <TableHead>Items</TableHead>
                  <TableHead>Total Amount</TableHead>
                  <TableHead>Order Date</TableHead>
                  <TableHead>Expected Delivery</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {purchaseOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell>{order.supplierName}</TableCell>
                    <TableCell>{order.items.length} item(s)</TableCell>
                    <TableCell>${order.totalAmount.toFixed(2)}</TableCell>
                    <TableCell>{order.orderDate.toLocaleDateString()}</TableCell>
                    <TableCell>
                      {order.expectedDelivery?.toLocaleDateString() || 'TBD'}
                    </TableCell>
                    <TableCell>
                      <Badge className={getOrderStatusColor(order.status)}>
                        {order.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button size="sm" variant="outline">
                          <FileText className="w-3 h-3" />
                        </Button>
                        {order.status === 'delivered' && (
                          <Button size="sm" variant="outline">
                            Mark Paid
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {selectedTab === 'alerts' && (
        <div className="space-y-4">
          {lowStockItems.map((item) => (
            <Card key={item.id} className="border-red-200 bg-red-50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="h-5 w-5 text-red-500" />
                    <div>
                      <h4 className="font-medium text-red-800">{item.name}</h4>
                      <p className="text-sm text-red-600">
                        Current stock: {item.currentStock} / Minimum: {item.minimumStock}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" onClick={() => createAutomaticOrder(item.id)}>
                      Create Order
                    </Button>
                    <Button size="sm" variant="outline">
                      Find Supplier
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default InventoryFinanceIntegration;
