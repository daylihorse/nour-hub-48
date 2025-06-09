
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Package, 
  FileText, 
  DollarSign, 
  AlertTriangle,
  TrendingUp,
  Clock,
  Users,
  ShoppingCart
} from "lucide-react";
import OptimizedStatsGrid from "@/components/operations/shared/ui/OptimizedStatsGrid";
import OptimizedMetricCard from "@/components/operations/shared/ui/OptimizedMetricCard";

const PharmacyDashboard = () => {
  // Mock data - in real implementation, this would come from API
  const metrics = {
    totalInventoryValue: 125000,
    pendingPrescriptions: 12,
    lowStockItems: 8,
    expiringItems: 5,
    dailySales: 3200,
    monthlyRevenue: 85000,
    activeSuppliers: 15,
    controlledSubstances: 45
  };

  const recentPrescriptions = [
    {
      id: "RX001",
      horseName: "Thunder",
      veterinarian: "Dr. Smith",
      status: "pending",
      date: "2024-01-15",
      total: 125.50
    },
    {
      id: "RX002", 
      horseName: "Lightning",
      veterinarian: "Dr. Johnson",
      status: "dispensed",
      date: "2024-01-14",
      total: 89.75
    }
  ];

  const lowStockAlerts = [
    { name: "Penicillin Injectable", currentStock: 5, minimumStock: 20 },
    { name: "Banamine Paste", currentStock: 8, minimumStock: 25 },
    { name: "Bute Tablets", currentStock: 12, minimumStock: 30 }
  ];

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <OptimizedStatsGrid columns={4}>
        <OptimizedMetricCard
          label="Total Inventory Value"
          value={`$${metrics.totalInventoryValue.toLocaleString()}`}
          icon={Package}
          iconColor="text-blue-500"
        />
        <OptimizedMetricCard
          label="Pending Prescriptions"
          value={metrics.pendingPrescriptions}
          icon={FileText}
          iconColor="text-orange-500"
        />
        <OptimizedMetricCard
          label="Low Stock Items"
          value={metrics.lowStockItems}
          icon={AlertTriangle}
          iconColor="text-red-500"
        />
        <OptimizedMetricCard
          label="Daily Sales"
          value={`$${metrics.dailySales.toLocaleString()}`}
          icon={DollarSign}
          iconColor="text-green-500"
        />
      </OptimizedStatsGrid>

      {/* Secondary Metrics */}
      <OptimizedStatsGrid columns={4}>
        <OptimizedMetricCard
          label="Monthly Revenue"
          value={`$${metrics.monthlyRevenue.toLocaleString()}`}
          icon={TrendingUp}
          iconColor="text-green-500"
        />
        <OptimizedMetricCard
          label="Expiring Items"
          value={metrics.expiringItems}
          icon={Clock}
          iconColor="text-yellow-500"
        />
        <OptimizedMetricCard
          label="Active Suppliers"
          value={metrics.activeSuppliers}
          icon={Users}
          iconColor="text-purple-500"
        />
        <OptimizedMetricCard
          label="Controlled Substances"
          value={metrics.controlledSubstances}
          icon={ShoppingCart}
          iconColor="text-indigo-500"
        />
      </OptimizedStatsGrid>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Prescriptions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Recent Prescriptions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentPrescriptions.map((prescription) => (
                <div key={prescription.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">{prescription.id}</p>
                    <p className="text-sm text-muted-foreground">{prescription.horseName}</p>
                    <p className="text-xs text-muted-foreground">{prescription.veterinarian}</p>
                  </div>
                  <div className="text-right">
                    <Badge 
                      variant={prescription.status === 'dispensed' ? 'default' : 'secondary'}
                      className="mb-1"
                    >
                      {prescription.status}
                    </Badge>
                    <p className="text-sm font-medium">${prescription.total}</p>
                    <p className="text-xs text-muted-foreground">{prescription.date}</p>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4">
              View All Prescriptions
            </Button>
          </CardContent>
        </Card>

        {/* Low Stock Alerts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-500" />
              Low Stock Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {lowStockAlerts.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg border-red-200 bg-red-50">
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-muted-foreground">
                      Current: {item.currentStock} | Min: {item.minimumStock}
                    </p>
                  </div>
                  <Badge variant="destructive">
                    Low Stock
                  </Badge>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4">
              View Inventory
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-auto py-4 flex flex-col gap-2">
              <FileText className="h-6 w-6" />
              New Prescription
            </Button>
            <Button variant="outline" className="h-auto py-4 flex flex-col gap-2">
              <Package className="h-6 w-6" />
              Add Inventory
            </Button>
            <Button variant="outline" className="h-auto py-4 flex flex-col gap-2">
              <DollarSign className="h-6 w-6" />
              Process Sale
            </Button>
            <Button variant="outline" className="h-auto py-4 flex flex-col gap-2">
              <Users className="h-6 w-6" />
              Supplier Order
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PharmacyDashboard;
