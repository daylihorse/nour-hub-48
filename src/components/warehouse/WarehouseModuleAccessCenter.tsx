import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Check, X, Warehouse, Package2, Truck, BarChart3, Settings, MapPin, Users, Shield, Clock, Zap } from "lucide-react";
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

interface WarehouseModuleConfig {
  id: string;
  name: string;
  description: string;
  isActive: boolean;
  submodules: ModuleCategory[];
}

const warehouseModuleConfig: WarehouseModuleConfig = {
  id: "warehouse",
  name: "Warehouse Operations Management",
  description: "Advanced warehouse operations, automation, and logistics management",
  isActive: true,
  submodules: [
    {
      category: "Core Operations",
      modules: [
        {
          id: "warehouse-overview",
          name: "Warehouse Overview",
          description: "Central dashboard for warehouse operations and KPIs",
          isActive: true,
          isCore: true
        },
        {
          id: "receiving-operations",
          name: "Receiving Operations",
          description: "Manage incoming shipments and dock scheduling",
          isActive: true,
          isCore: true
        },
        {
          id: "putaway-management",
          name: "Putaway Management",
          description: "Optimize storage location assignments",
          isActive: true,
          isCore: true
        }
      ]
    },
    {
      category: "Fulfillment Center",
      modules: [
        {
          id: "order-management",
          name: "Order Management",
          description: "Process and prioritize fulfillment orders",
          isActive: false
        },
        {
          id: "picking-optimization",
          name: "Picking Optimization",
          description: "Route optimization and batch picking",
          isActive: false
        },
        {
          id: "packing-stations",
          name: "Packing Stations",
          description: "Manage packing operations and quality control",
          isActive: false
        },
        {
          id: "shipping-coordination",
          name: "Shipping Coordination",
          description: "Coordinate outbound shipments and carrier management",
          isActive: false
        }
      ]
    },
    {
      category: "Warehouse Layout",
      modules: [
        {
          id: "zone-management",
          name: "Zone Management",
          description: "Define and manage warehouse zones and areas",
          isActive: false
        },
        {
          id: "bin-location-system",
          name: "Bin Location System",
          description: "Detailed bin and shelf location tracking",
          isActive: false
        },
        {
          id: "slotting-optimization",
          name: "Slotting Optimization",
          description: "Optimize product placement for efficiency",
          isActive: false
        },
        {
          id: "capacity-planning",
          name: "Capacity Planning",
          description: "Plan and monitor warehouse space utilization",
          isActive: false
        }
      ]
    },
    {
      category: "Workforce Management",
      modules: [
        {
          id: "labor-management",
          name: "Labor Management",
          description: "Track workforce productivity and scheduling",
          isActive: false
        },
        {
          id: "task-assignment",
          name: "Task Assignment",
          description: "Automated task distribution and prioritization",
          isActive: false
        },
        {
          id: "performance-tracking",
          name: "Performance Tracking",
          description: "Monitor individual and team performance metrics",
          isActive: false
        },
        {
          id: "training-management",
          name: "Training Management",
          description: "Manage employee training and certifications",
          isActive: false
        }
      ]
    },
    {
      category: "Advanced Systems",
      modules: [
        {
          id: "wms-integration",
          name: "WMS Integration",
          description: "Warehouse Management System integrations",
          isActive: false
        },
        {
          id: "automation-control",
          name: "Automation Control",
          description: "Control automated systems and robotics",
          isActive: false
        },
        {
          id: "voice-picking",
          name: "Voice Picking",
          description: "Voice-directed warehouse operations",
          isActive: false
        },
        {
          id: "real-time-tracking",
          name: "Real-time Tracking",
          description: "RFID and IoT-based real-time asset tracking",
          isActive: false
        }
      ]
    }
  ]
};

const WarehouseModuleAccessCenter: React.FC = () => {
  const [moduleConfig, setModuleConfig] = useState<WarehouseModuleConfig>(warehouseModuleConfig);
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
      case "Core Operations":
        return <Warehouse className="h-4 w-4" />;
      case "Fulfillment Center":
        return <Package2 className="h-4 w-4" />;
      case "Warehouse Layout":
        return <MapPin className="h-4 w-4" />;
      case "Workforce Management":
        return <Users className="h-4 w-4" />;
      case "Advanced Systems":
        return <Zap className="h-4 w-4" />;
      default:
        return <Warehouse className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Warehouse className="h-5 w-5" />
            Warehouse Operations Module Access Center
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

export default WarehouseModuleAccessCenter; 