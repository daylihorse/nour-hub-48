
import { useMemo } from "react";
import { 
  Package, 
  AlertTriangle, 
  TrendingUp, 
  DollarSign,
  Calendar,
  Truck,
  CheckCircle,
  Clock,
  BarChart3,
  PieChart
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

type InventoryItemType = {
  id: string;
  name: string;
  enabled: boolean;
  expiryDate: string;
  currentStock: number;
  purchaseDate: string;
  type: string;
  supplier: string;
  image?: string;
};

interface InventoryDashboardProps {
  items: InventoryItemType[];
}

const InventoryDashboard = ({ items }: InventoryDashboardProps) => {
  // Calculate metrics based on inventory data
  const metrics = useMemo(() => {
    const totalItems = items.length;
    const activeItems = items.filter(item => item.enabled).length;
    const inactiveItems = items.filter(item => !item.enabled).length;
    const totalStock = items.reduce((sum, item) => sum + item.currentStock, 0);
    const avgStock = totalItems > 0 ? totalStock / totalItems : 0;
    
    // Calculate low stock items (assuming less than 5 is low)
    const lowStockItems = items.filter(item => item.currentStock < 5).length;
    
    // Calculate expiring items (within 30 days)
    const today = new Date();
    const thirtyDaysFromNow = new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000);
    const expiringItems = items.filter(item => {
      const expiryDate = new Date(item.expiryDate);
      return expiryDate <= thirtyDaysFromNow && expiryDate >= today;
    }).length;
    
    // Calculate item types distribution
    const typeDistribution: Record<string, number> = {};
    items.forEach(item => {
      typeDistribution[item.type] = (typeDistribution[item.type] || 0) + 1;
    });
    
    // Calculate supplier distribution
    const supplierDistribution: Record<string, number> = {};
    items.forEach(item => {
      supplierDistribution[item.supplier] = (supplierDistribution[item.supplier] || 0) + 1;
    });
    
    return {
      totalItems,
      activeItems,
      inactiveItems,
      totalStock,
      avgStock,
      lowStockItems,
      expiringItems,
      typeDistribution: Object.entries(typeDistribution).map(([type, count]) => ({ type, count })),
      supplierDistribution: Object.entries(supplierDistribution).map(([supplier, count]) => ({ supplier, count })),
    };
  }, [items]);

  // Sample recent activities
  const recentActivities = [
    { type: "stock", message: "Chia Seeds stock updated - Added 5 units", time: "2 hours ago" },
    { type: "expiry", message: "Orniboral expiring in 15 days - Review needed", time: "1 day ago" },
    { type: "supplier", message: "New supplier added: Al-Russaifi Stores", time: "2 days ago" },
    { type: "restock", message: "Low stock alert: 3 items need restocking", time: "3 days ago" },
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "stock": return <Package className="h-4 w-4 text-green-600" />;
      case "expiry": return <Calendar className="h-4 w-4 text-orange-600" />;
      case "supplier": return <Truck className="h-4 w-4 text-blue-600" />;
      case "restock": return <AlertTriangle className="h-4 w-4 text-red-600" />;
      default: return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Items</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.totalItems}</div>
            <div className="flex gap-2 text-xs text-muted-foreground mt-2">
              <span className="text-green-600">{metrics.activeItems} Active</span>
              <span className="text-gray-600">{metrics.inactiveItems} Inactive</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Stock</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.totalStock}</div>
            <p className="text-xs text-muted-foreground">
              Avg: {metrics.avgStock.toFixed(1)} per item
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Low Stock Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{metrics.lowStockItems}</div>
            <p className="text-xs text-muted-foreground">
              Items with stock &lt; 5 units
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Expiring Soon</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{metrics.expiringItems}</div>
            <p className="text-xs text-muted-foreground">
              Items expiring in 30 days
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts and Analytics */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Item Type Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {metrics.typeDistribution.slice(0, 5).map((stat) => (
                <div key={stat.type} className="flex items-center justify-between">
                  <span className="text-sm">{stat.type}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{stat.count}</span>
                    <Progress 
                      value={metrics.totalItems > 0 ? (stat.count / metrics.totalItems) * 100 : 0} 
                      className="h-2 w-20" 
                    />
                  </div>
                </div>
              ))}
              {metrics.typeDistribution.length === 0 && (
                <p className="text-sm text-muted-foreground">No items categorized yet</p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5" />
              Supplier Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {metrics.supplierDistribution.slice(0, 5).map((stat) => (
                <div key={stat.supplier} className="flex items-center justify-between">
                  <Badge variant="outline" className="text-xs">{stat.supplier}</Badge>
                  <span className="text-sm font-medium">{stat.count} items</span>
                </div>
              ))}
              {metrics.supplierDistribution.length === 0 && (
                <p className="text-sm text-muted-foreground">No suppliers assigned yet</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activities and Alerts */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Recent Activities
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-start gap-3">
                  {getActivityIcon(activity.type)}
                  <div className="flex-1 space-y-1">
                    <p className="text-sm">{activity.message}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-amber-500" />
              Inventory Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {metrics.lowStockItems > 0 && (
                <div className="flex items-center gap-2 p-2 bg-red-50 rounded-lg">
                  <AlertTriangle className="h-4 w-4 text-red-600" />
                  <span className="text-sm">{metrics.lowStockItems} items have low stock</span>
                </div>
              )}
              
              {metrics.expiringItems > 0 && (
                <div className="flex items-center gap-2 p-2 bg-orange-50 rounded-lg">
                  <Calendar className="h-4 w-4 text-orange-600" />
                  <span className="text-sm">{metrics.expiringItems} items expiring soon</span>
                </div>
              )}
              
              <div className="flex items-center gap-2 p-2 bg-green-50 rounded-lg">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="text-sm">Inventory system running normally</span>
              </div>
              
              {metrics.activeItems > 0 && (
                <div className="flex items-center gap-2 p-2 bg-blue-50 rounded-lg">
                  <Package className="h-4 w-4 text-blue-600" />
                  <span className="text-sm">{metrics.activeItems} items currently active</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default InventoryDashboard;
