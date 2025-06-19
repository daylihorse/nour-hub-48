import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Check, X, Package, Warehouse, BarChart3, Truck, Settings, QrCode, AlertTriangle, Users, CreditCard, ShoppingCart } from "lucide-react";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface SubModule {
  id: string;
  name: string;
  description: string;
  isActive: boolean;
  isCore?: boolean;
}

interface ModuleCategory {
  category: string;
  modules: SubModule[];
}

interface InventoryModuleConfig {
  id: string;
  name: string;
  description: string;
  isActive: boolean;
  submodules: ModuleCategory[];
}

const inventoryModuleConfig: InventoryModuleConfig = {
  id: "inventory",
  name: "Inventory & Warehouse Management",
  description: "Comprehensive inventory tracking, warehouse operations, and supply chain management",
  isActive: true,
  submodules: [
    {
      category: "Core Features",
      modules: [
        {
          id: "inventory-overview",
          name: "Inventory Overview",
          description: "Dashboard with key inventory metrics and insights",
          isActive: true,
          isCore: true
        },
        {
          id: "item-management",
          name: "Item Management",
          description: "Manage product catalog, SKUs, and item details",
          isActive: true,
          isCore: true
        },
        {
          id: "stock-tracking",
          name: "Stock Tracking",
          description: "Real-time stock levels and inventory movements",
          isActive: true,
          isCore: true
        }
      ]
    },
    {
      category: "Warehouse Operations",
      modules: [
        {
          id: "receiving",
          name: "Receiving & Putaway",
          description: "Manage incoming shipments and warehouse putaway processes",
          isActive: false
        },
        {
          id: "picking-packing",
          name: "Picking & Packing",
          description: "Order fulfillment, picking lists, and packing operations",
          isActive: false
        },
        {
          id: "cycle-counting",
          name: "Cycle Counting",
          description: "Regular inventory counts and variance management",
          isActive: false
        },
        {
          id: "location-management",
          name: "Location Management",
          description: "Warehouse zones, bins, and location tracking",
          isActive: false
        }
      ]
    },
    {
      category: "Supply Chain",
      modules: [
        {
          id: "purchase-orders",
          name: "Purchase Orders",
          description: "Create and manage purchase orders with suppliers",
          isActive: false
        },
        {
          id: "supplier-management",
          name: "Supplier Management",
          description: "Manage supplier relationships and performance",
          isActive: false
        },
        {
          id: "reorder-management",
          name: "Reorder Management",
          description: "Automated reorder points and safety stock levels",
          isActive: false
        },
        {
          id: "demand-planning",
          name: "Demand Planning",
          description: "Forecast demand and plan inventory levels",
          isActive: false
        }
      ]
    },
    {
      category: "Analytics & Reporting",
      modules: [
        {
          id: "inventory-reports",
          name: "Inventory Reports",
          description: "Comprehensive inventory and movement reports",
          isActive: false
        },
        {
          id: "cost-analysis",
          name: "Cost Analysis",
          description: "Inventory valuation and cost tracking",
          isActive: false
        },
        {
          id: "abc-analysis",
          name: "ABC Analysis",
          description: "Categorize items by value and importance",
          isActive: false
        },
        {
          id: "kpi-dashboard",
          name: "KPI Dashboard",
          description: "Key performance indicators for inventory management",
          isActive: false
        }
      ]
    },
    {
      category: "Advanced Features",
      modules: [
        {
          id: "barcode-scanning",
          name: "Barcode Scanning",
          description: "Mobile barcode scanning for inventory operations",
          isActive: false
        },
        {
          id: "lot-tracking",
          name: "Lot & Serial Tracking",
          description: "Track items by lot numbers and serial numbers",
          isActive: false
        },
        {
          id: "expiry-management",
          name: "Expiry Management",
          description: "Track expiration dates and manage product shelf life",
          isActive: false
        },
        {
          id: "multi-location",
          name: "Multi-Location",
          description: "Manage inventory across multiple warehouses",
          isActive: false
        },
        {
          id: "integration-apis",
          name: "Integration APIs",
          description: "Connect with external systems and marketplaces",
          isActive: false
        }
      ]
    }
  ]
};

const InventoryModuleAccessCenter: React.FC = () => {
  const [moduleConfig, setModuleConfig] = useState<InventoryModuleConfig>(inventoryModuleConfig);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [pendingChange, setPendingChange] = useState<{
    submoduleId?: string;
    newState: boolean;
  } | null>(null);

  const handleModuleToggle = (newState: boolean) => {
    setPendingChange({ newState });
    setDialogOpen(true);
  };

  const handleSubmoduleToggle = (submoduleId: string, newState: boolean) => {
    setPendingChange({ submoduleId, newState });
    setDialogOpen(true);
  };

  const confirmChange = () => {
    if (!pendingChange) return;
    
    if (!pendingChange.submoduleId) {
      // Main module toggle
      setModuleConfig(prev => ({
        ...prev,
        isActive: pendingChange.newState,
        // If deactivating, deactivate all non-core submodules
        submodules: prev.submodules.map(category => ({
          ...category,
          modules: category.modules.map(submodule => ({
            ...submodule,
            isActive: pendingChange.newState ? 
              submodule.isActive : 
              submodule.isCore || false
          }))
        }))
      }));
    } else {
      // Submodule toggle
      setModuleConfig(prev => ({
        ...prev,
        submodules: prev.submodules.map(category => ({
          ...category,
          modules: category.modules.map(submodule => 
            submodule.id === pendingChange.submoduleId
              ? { ...submodule, isActive: pendingChange.newState }
              : submodule
          )
        }))
      }));
    }
    
    setDialogOpen(false);
    setPendingChange(null);
  };

  const cancelChange = () => {
    setDialogOpen(false);
    setPendingChange(null);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Core Features":
        return <Package className="h-4 w-4" />;
      case "Warehouse Operations":
        return <Warehouse className="h-4 w-4" />;
      case "Supply Chain":
        return <Truck className="h-4 w-4" />;
      case "Analytics & Reporting":
        return <BarChart3 className="h-4 w-4" />;
      case "Advanced Features":
        return <QrCode className="h-4 w-4" />;
      default:
        return <Package className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Inventory & Warehouse Module Access Center
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <Card className="border-2">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div>
                      <CardTitle className="text-lg">{moduleConfig.name}</CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">
                        {moduleConfig.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={moduleConfig.isActive ? "default" : "secondary"}>
                      {moduleConfig.isActive ? (
                        <><Check className="h-3 w-3 mr-1" /> Active</>
                      ) : (
                        <><X className="h-3 w-3 mr-1" /> Inactive</>
                      )}
                    </Badge>
                    <Switch
                      checked={moduleConfig.isActive}
                      onCheckedChange={(checked) => handleModuleToggle(checked)}
                    />
                  </div>
                </div>
              </CardHeader>
              
              {moduleConfig.isActive && (
                <CardContent className="pt-0">
                  <Accordion type="multiple" className="w-full">
                    {moduleConfig.submodules.map((category, categoryIndex) => (
                      <AccordionItem key={categoryIndex} value={`category-${categoryIndex}`}>
                        <AccordionTrigger className="text-sm font-medium">
                          <div className="flex items-center gap-2">
                            {getCategoryIcon(category.category)}
                            {category.category}
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-3 pt-2">
                            {category.modules.map((submodule) => (
                              <div
                                key={submodule.id}
                                className="flex items-center justify-between p-3 rounded-lg border bg-card"
                              >
                                <div className="flex-1">
                                  <div className="flex items-center gap-2">
                                    <h4 className="font-medium text-sm">{submodule.name}</h4>
                                    {submodule.isCore && (
                                      <Badge variant="outline" className="text-xs">
                                        Core
                                      </Badge>
                                    )}
                                  </div>
                                  <p className="text-xs text-muted-foreground mt-1">
                                    {submodule.description}
                                  </p>
                                </div>
                                <Switch
                                  checked={submodule.isActive}
                                  disabled={submodule.isCore}
                                  onCheckedChange={(checked) => 
                                    handleSubmoduleToggle(submodule.id, checked)
                                  }
                                />
                              </div>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              )}
            </Card>
          </div>
        </CardContent>
      </Card>

      <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Module Change</AlertDialogTitle>
            <AlertDialogDescription>
              {pendingChange?.submoduleId ? 
                `Are you sure you want to ${pendingChange.newState ? 'activate' : 'deactivate'} this submodule?` :
                `Are you sure you want to ${pendingChange?.newState ? 'activate' : 'deactivate'} this module? This will affect all its submodules.`
              }
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={cancelChange}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmChange}>Confirm</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default InventoryModuleAccessCenter; 