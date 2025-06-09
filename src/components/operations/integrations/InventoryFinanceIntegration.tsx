
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  Package, 
  DollarSign, 
  AlertTriangle, 
  ShoppingCart,
  FileText
} from "lucide-react";
import { useOperationsData } from "@/hooks/useOperationsData";
import { useInventoryManagement } from "@/hooks/useInventoryManagement";
import { 
  getInventoryStatusColor, 
  getOrderStatusColor
} from "@/utils/operationsUtils";

const InventoryFinanceIntegration = () => {
  const [selectedTab, setSelectedTab] = useState<'overview' | 'orders' | 'alerts'>('overview');
  const { inventoryItems, purchaseOrders, isLoading } = useOperationsData();
  
  const {
    filteredItems,
    lowStockItems,
    metrics,
    pendingOrderValue,
    createAutomaticOrder
  } = useInventoryManagement({ inventoryItems, purchaseOrders });

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

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
                <p className="text-xl font-bold">${metrics.totalValue.toFixed(2)}</p>
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
                <p className="text-xl font-bold">{metrics.lowStockCount}</p>
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
                {filteredItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell>{item.category}</TableCell>
                    <TableCell>{item.currentStock}</TableCell>
                    <TableCell>{item.minimumStock}</TableCell>
                    <TableCell>${item.unitCost.toFixed(2)}</TableCell>
                    <TableCell>${item.totalValue.toFixed(2)}</TableCell>
                    <TableCell>
                      <Badge className={getInventoryStatusColor(item.status)}>
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
