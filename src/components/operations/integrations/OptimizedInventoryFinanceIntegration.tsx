
import { useState, memo, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { 
  Package, 
  DollarSign, 
  AlertTriangle, 
  ShoppingCart
} from "lucide-react";
import { useOptimizedOperationsData } from "@/hooks/useOptimizedOperationsData";
import { useInventoryManagement } from "@/hooks/useInventoryManagement";
import { useDebounce } from "@/utils/performanceUtils";
import OptimizedMetricCard from "../shared/ui/OptimizedMetricCard";
import OptimizedStatsGrid from "../shared/ui/OptimizedStatsGrid";
import DashboardSection from "../shared/ui/DashboardSection";
import InventoryOverview from "./inventory/InventoryOverview";
import PurchaseOrdersTable from "./inventory/PurchaseOrdersTable";
import StockAlertsList from "./inventory/StockAlertsList";

const OptimizedInventoryFinanceIntegration = memo(() => {
  const [selectedTab, setSelectedTab] = useState<'overview' | 'orders' | 'alerts'>('overview');
  const { inventoryItems, purchaseOrders, isLoading, totalInventoryValue, lowStockItems } = useOptimizedOperationsData();
  
  const {
    filteredItems,
    metrics,
    pendingOrderValue,
    createAutomaticOrder
  } = useInventoryManagement({ inventoryItems, purchaseOrders });

  // Debounced tab switching to prevent rapid re-renders
  const debouncedSetSelectedTab = useDebounce(setSelectedTab, 100);

  // Memoized tab content to prevent unnecessary re-renders
  const tabContent = useMemo(() => {
    switch (selectedTab) {
      case 'overview':
        return (
          <DashboardSection title="Inventory Status">
            <InventoryOverview 
              items={filteredItems}
              onCreateOrder={createAutomaticOrder}
            />
          </DashboardSection>
        );
      case 'orders':
        return (
          <DashboardSection title="Purchase Orders">
            <PurchaseOrdersTable orders={purchaseOrders} />
          </DashboardSection>
        );
      case 'alerts':
        return (
          <StockAlertsList 
            lowStockItems={lowStockItems}
            onCreateOrder={createAutomaticOrder}
          />
        );
      default:
        return null;
    }
  }, [selectedTab, filteredItems, purchaseOrders, lowStockItems, createAutomaticOrder]);

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
      <OptimizedStatsGrid columns={4}>
        <OptimizedMetricCard
          label="Total Inventory Value"
          value={`$${totalInventoryValue.toFixed(2)}`}
          icon={Package}
          iconColor="text-blue-500"
        />
        <OptimizedMetricCard
          label="Low Stock Items"
          value={lowStockItems.length}
          icon={AlertTriangle}
          iconColor="text-red-500"
        />
        <OptimizedMetricCard
          label="Pending Orders"
          value={purchaseOrders.filter(o => o.status !== 'paid').length}
          icon={ShoppingCart}
          iconColor="text-purple-500"
        />
        <OptimizedMetricCard
          label="Outstanding Orders"
          value={`$${pendingOrderValue.toFixed(2)}`}
          icon={DollarSign}
          iconColor="text-green-500"
        />
      </OptimizedStatsGrid>

      {/* Navigation Tabs */}
      <div className="flex gap-2">
        <Button 
          variant={selectedTab === 'overview' ? 'default' : 'outline'}
          onClick={() => debouncedSetSelectedTab('overview')}
        >
          Overview
        </Button>
        <Button 
          variant={selectedTab === 'orders' ? 'default' : 'outline'}
          onClick={() => debouncedSetSelectedTab('orders')}
        >
          Purchase Orders
        </Button>
        <Button 
          variant={selectedTab === 'alerts' ? 'default' : 'outline'}
          onClick={() => debouncedSetSelectedTab('alerts')}
        >
          Stock Alerts
        </Button>
      </div>

      {/* Memoized Tab Content */}
      {tabContent}
    </div>
  );
});

OptimizedInventoryFinanceIntegration.displayName = "OptimizedInventoryFinanceIntegration";

export default OptimizedInventoryFinanceIntegration;
