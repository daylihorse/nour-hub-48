
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Package, 
  DollarSign, 
  AlertTriangle, 
  ShoppingCart
} from "lucide-react";
import { useOperationsData } from "@/hooks/useOperationsData";
import { useInventoryManagement } from "@/hooks/useInventoryManagement";
import MetricCard from "../shared/ui/MetricCard";
import StatsGrid from "../shared/ui/StatsGrid";
import DashboardSection from "../shared/ui/DashboardSection";
import InventoryOverview from "./inventory/InventoryOverview";
import PurchaseOrdersTable from "./inventory/PurchaseOrdersTable";
import StockAlertsList from "./inventory/StockAlertsList";

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
      <StatsGrid columns={4}>
        <MetricCard
          label="Total Inventory Value"
          value={`$${metrics.totalValue.toFixed(2)}`}
          icon={Package}
          iconColor="text-blue-500"
        />
        <MetricCard
          label="Low Stock Items"
          value={metrics.lowStockCount}
          icon={AlertTriangle}
          iconColor="text-red-500"
        />
        <MetricCard
          label="Pending Orders"
          value={purchaseOrders.filter(o => o.status !== 'paid').length}
          icon={ShoppingCart}
          iconColor="text-purple-500"
        />
        <MetricCard
          label="Outstanding Orders"
          value={`$${pendingOrderValue.toFixed(2)}`}
          icon={DollarSign}
          iconColor="text-green-500"
        />
      </StatsGrid>

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
        <DashboardSection title="Inventory Status">
          <InventoryOverview 
            items={filteredItems}
            onCreateOrder={createAutomaticOrder}
          />
        </DashboardSection>
      )}

      {selectedTab === 'orders' && (
        <DashboardSection title="Purchase Orders">
          <PurchaseOrdersTable orders={purchaseOrders} />
        </DashboardSection>
      )}

      {selectedTab === 'alerts' && (
        <StockAlertsList 
          lowStockItems={lowStockItems}
          onCreateOrder={createAutomaticOrder}
        />
      )}
    </div>
  );
};

export default InventoryFinanceIntegration;
