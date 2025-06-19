import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Check, X, MapPin, Truck, BarChart3, Shield, FileText, Navigation2 } from "lucide-react";
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

interface MovementModuleConfig {
  id: string;
  name: string;
  description: string;
  isActive: boolean;
  submodules: ModuleCategory[];
}

const movementModuleConfig: MovementModuleConfig = {
  id: "movements",
  name: "Horse Movement Management",
  description: "Comprehensive tracking and management of horse movements, transportation, and location changes",
  isActive: true,
  submodules: [
    {
      category: "Core Movement Tracking",
      modules: [
        {
          id: "movement-dashboard",
          name: "Movement Dashboard",
          description: "Central overview of all horse movements and transportation",
          isActive: true,
          isCore: true
        },
        {
          id: "movement-recording",
          name: "Movement Recording",
          description: "Record and track individual horse movements",
          isActive: true,
          isCore: true
        },
        {
          id: "location-tracking",
          name: "Location Tracking",
          description: "Real-time tracking of horse locations and status",
          isActive: true,
          isCore: true
        }
      ]
    },
    {
      category: "Transportation Management",
      modules: [
        {
          id: "transport-scheduling",
          name: "Transport Scheduling",
          description: "Schedule and plan horse transportation activities",
          isActive: false
        },
        {
          id: "vehicle-management",
          name: "Vehicle Management",
          description: "Manage transportation vehicles and equipment",
          isActive: false
        },
        {
          id: "route-optimization",
          name: "Route Optimization",
          description: "Optimize transportation routes for efficiency",
          isActive: false
        },
        {
          id: "driver-assignment",
          name: "Driver Assignment",
          description: "Assign and manage transportation staff",
          isActive: false
        }
      ]
    },
    {
      category: "Movement Documentation",
      modules: [
        {
          id: "movement-certificates",
          name: "Movement Certificates",
          description: "Generate and manage official movement documents",
          isActive: false
        },
        {
          id: "health-clearances",
          name: "Health Clearances",
          description: "Track health certificates and veterinary clearances",
          isActive: false
        },
        {
          id: "customs-documentation",
          name: "Customs Documentation",
          description: "Manage international movement and customs papers",
          isActive: false
        },
        {
          id: "insurance-tracking",
          name: "Insurance Tracking",
          description: "Track movement insurance and liability coverage",
          isActive: false
        }
      ]
    },
    {
      category: "Compliance & Regulations",
      modules: [
        {
          id: "regulatory-compliance",
          name: "Regulatory Compliance",
          description: "Ensure compliance with movement regulations",
          isActive: false
        },
        {
          id: "quarantine-management",
          name: "Quarantine Management",
          description: "Manage quarantine requirements and tracking",
          isActive: false
        },
        {
          id: "border-control",
          name: "Border Control",
          description: "Handle international border crossing requirements",
          isActive: false
        },
        {
          id: "audit-trails",
          name: "Movement Audit Trails",
          description: "Maintain detailed audit logs for all movements",
          isActive: false
        }
      ]
    },
    {
      category: "Analytics & Reporting",
      modules: [
        {
          id: "movement-analytics",
          name: "Movement Analytics",
          description: "Analyze movement patterns and statistics",
          isActive: false
        },
        {
          id: "cost-tracking",
          name: "Transportation Cost Tracking",
          description: "Track and analyze transportation costs",
          isActive: false
        },
        {
          id: "performance-metrics",
          name: "Performance Metrics",
          description: "Monitor transportation performance and efficiency",
          isActive: false
        },
        {
          id: "reporting-dashboard",
          name: "Movement Reporting",
          description: "Generate comprehensive movement reports",
          isActive: false
        }
      ]
    },
    {
      category: "Advanced Features",
      modules: [
        {
          id: "gps-tracking",
          name: "GPS Tracking",
          description: "Real-time GPS tracking of horse transporters",
          isActive: false
        },
        {
          id: "mobile-app",
          name: "Mobile Movement App",
          description: "Mobile application for field movement recording",
          isActive: false
        },
        {
          id: "automated-notifications",
          name: "Automated Notifications",
          description: "Automatic alerts for movement milestones",
          isActive: false
        },
        {
          id: "integration-apis",
          name: "Integration APIs",
          description: "Connect with external transportation systems",
          isActive: false
        }
      ]
    }
  ]
};

const MovementModuleAccessCenter: React.FC = () => {
  const [moduleConfig, setModuleConfig] = useState<MovementModuleConfig>(movementModuleConfig);
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
      setModuleConfig(prev => ({
        ...prev,
        isActive: pendingChange.newState,
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
      case "Core Movement Tracking":
        return <MapPin className="h-4 w-4" />;
      case "Transportation Management":
        return <Truck className="h-4 w-4" />;
      case "Movement Documentation":
        return <FileText className="h-4 w-4" />;
      case "Compliance & Regulations":
        return <Shield className="h-4 w-4" />;
      case "Analytics & Reporting":
        return <BarChart3 className="h-4 w-4" />;
      case "Advanced Features":
        return <Navigation2 className="h-4 w-4" />;
      default:
        return <MapPin className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Navigation2 className="h-5 w-5" />
            Horse Movement Module Access Center
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

export default MovementModuleAccessCenter;
