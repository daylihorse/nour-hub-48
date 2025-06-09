
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useOperationsData } from "@/hooks/useOperationsData";
import { useInventoryManagement } from "@/hooks/useInventoryManagement";
import { Package, DollarSign, TrendingUp, AlertTriangle, ShoppingCart } from "lucide-react";
import { formatCurrency } from "@/utils/operationsUtils";

const InventoryFinanceIntegration = () => {
  const { inventoryItems, purchaseOrders, isLoading } = useOperationsData();
  const {
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
          Automated inventory management with financial tracking and purchasing workflows
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Package className="h-4 w-4 text-blue-500" />
              <div>
                <p className="text-xs text-muted-foreground">Total Inventory</p>
                <p className="text-lg font-bold">{formatCurrency(metrics.totalValue)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-orange-500" />
              <div>
                <p className="text-xs text-muted-foreground">Low Stock Items</p>
                <p className="text-lg font-bold">{metrics.lowStockCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <ShoppingCart className="h-4 w-4 text-green-500" />
              <div>
                <p className="text-xs text-muted-foreground">Pending Orders</p>
                <p className="text-lg font-bold">{formatCurrency(pendingOrderValue)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-purple-500" />
              <div>
                <p className="text-xs text-muted-foreground">Stock Health</p>
                <p className="text-lg font-bold">
                  {Math.round((metrics.inStockCount / (metrics.inStockCount + metrics.lowStockCount)) * 100)}%
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Low Stock Alert Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-orange-500" />
            Low Stock Alerts & Auto-Ordering
          </CardTitle>
        </CardHeader>
        <CardContent>
          {lowStockItems.length > 0 ? (
            <div className="space-y-4">
              {lowStockItems.map((item) => (
                <div key={item.id} className="p-4 border rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-medium">{item.name}</h4>
                      <p className="text-sm text-muted-foreground">{item.category}</p>
                    </div>
                    <Badge variant={item.status === 'out_of_stock' ? 'destructive' : 'secondary'}>
                      {item.status.replace('_', ' ')}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-4 gap-4 mb-3 text-sm">
                    <div>
                      <p className="text-muted-foreground">Current Stock</p>
                      <p className="font-medium">{item.currentStock}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Minimum</p>
                      <p className="font-medium">{item.minimumStock}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Unit Cost</p>
                      <p className="font-medium">{formatCurrency(item.unitCost)}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Supplier</p>
                      <p className="font-medium">{item.supplier}</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex-1 mr-4">
                      <div className="flex justify-between text-xs mb-1">
                        <span>Stock Level</span>
                        <span>{Math.round((item.currentStock / item.minimumStock) * 100)}%</span>
                      </div>
                      <Progress 
                        value={Math.min((item.currentStock / item.minimumStock) * 100, 100)} 
                        className="h-2"
                      />
                    </div>
                    <Button
                      size="sm"
                      onClick={() => createAutomaticOrder(item.id)}
                      disabled={item.status === 'on_order'}
                    >
                      {item.status === 'on_order' ? 'Order Pending' : 'Auto Order'}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Package className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">All inventory items are adequately stocked</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Purchase Orders Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            Active Purchase Orders
          </CardTitle>
        </CardHeader>
        <CardContent>
          {purchaseOrders.length > 0 ? (
            <div className="space-y-4">
              {purchaseOrders.map((order) => (
                <div key={order.id} className="p-4 border rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-medium">{order.id}</h4>
                      <p className="text-sm text-muted-foreground">{order.supplierName}</p>
                    </div>
                    <Badge variant={
                      order.status === 'delivered' ? 'default' :
                      order.status === 'approved' ? 'secondary' :
                      order.status === 'sent' ? 'outline' : 'destructive'
                    }>
                      {order.status}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 mb-3 text-sm">
                    <div>
                      <p className="text-muted-foreground">Order Date</p>
                      <p className="font-medium">{order.orderDate.toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Expected Delivery</p>
                      <p className="font-medium">
                        {order.expectedDelivery?.toLocaleDateString() || 'TBD'}
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Total Amount</p>
                      <p className="font-medium">{formatCurrency(order.totalAmount)}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Items:</p>
                    {order.items.map((item, index) => (
                      <div key={index} className="flex justify-between text-sm">
                        <span>{item.itemName} (x{item.quantity})</span>
                        <span>{formatCurrency(item.totalCost)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <ShoppingCart className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No active purchase orders</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default InventoryFinanceIntegration;
