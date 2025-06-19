import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Check, X, Building, Users, Wrench, BarChart3, MapPin, DollarSign } from "lucide-react";
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

interface StableRoomsModuleConfig {
  id: string;
  name: string;
  description: string;
  isActive: boolean;
  submodules: ModuleCategory[];
}

const stableRoomsModuleConfig: StableRoomsModuleConfig = {
  id: "stable-rooms",
  name: "Stable Rooms Management",
  description: "Comprehensive stall, paddock, and facility management system with occupancy tracking and maintenance scheduling",
  isActive: true,
  submodules: [
    {
      category: "Core Facility Management",
      modules: [
        {
          id: "rooms-dashboard",
          name: "Rooms Dashboard",
          description: "Central overview of all stable facilities and occupancy status",
          isActive: true,
          isCore: true
        },
        {
          id: "room-management",
          name: "Room Management",
          description: "Manage stalls, paddocks, and storage facility information",
          isActive: true,
          isCore: true
        },
        {
          id: "assignment-tracking",
          name: "Assignment Tracking",
          description: "Track room assignments and occupancy history",
          isActive: true,
          isCore: true
        }
      ]
    },
    {
      category: "Space Planning & Layout",
      modules: [
        {
          id: "floor-plan-visualization",
          name: "Floor Plan Visualization",
          description: "Interactive facility maps and space layout management",
          isActive: false
        },
        {
          id: "space-optimization",
          name: "Space Optimization",
          description: "Optimize facility usage and layout efficiency",
          isActive: false
        },
        {
          id: "capacity-planning",
          name: "Capacity Planning",
          description: "Plan future facility needs and expansion",
          isActive: false
        },
        {
          id: "zone-management",
          name: "Zone Management",
          description: "Organize facilities into functional zones and areas",
          isActive: false
        }
      ]
    },
    {
      category: "Maintenance & Safety",
      modules: [
        {
          id: "maintenance-scheduling",
          name: "Maintenance Scheduling",
          description: "Schedule and track facility maintenance activities",
          isActive: false
        },
        {
          id: "safety-inspections",
          name: "Safety Inspections",
          description: "Conduct and manage facility safety inspections",
          isActive: false
        },
        {
          id: "repair-tracking",
          name: "Repair Tracking",
          description: "Track repairs, parts, and maintenance costs",
          isActive: false
        },
        {
          id: "preventive-maintenance",
          name: "Preventive Maintenance",
          description: "Automated preventive maintenance scheduling",
          isActive: false
        }
      ]
    },
    {
      category: "Occupancy & Reservations",
      modules: [
        {
          id: "reservation-system",
          name: "Reservation System",
          description: "Advanced booking system for temporary assignments",
          isActive: false
        },
        {
          id: "waitlist-management",
          name: "Waitlist Management",
          description: "Manage waiting lists for popular facilities",
          isActive: false
        },
        {
          id: "occupancy-analytics",
          name: "Occupancy Analytics",
          description: "Analyze facility usage patterns and trends",
          isActive: false
        },
        {
          id: "seasonal-planning",
          name: "Seasonal Planning",
          description: "Plan facility usage for seasonal variations",
          isActive: false
        }
      ]
    },
    {
      category: "Financial Management",
      modules: [
        {
          id: "billing-management",
          name: "Billing Management",
          description: "Automated billing for facility usage and services",
          isActive: false
        },
        {
          id: "pricing-models",
          name: "Pricing Models",
          description: "Flexible pricing structures for different facility types",
          isActive: false
        },
        {
          id: "cost-tracking",
          name: "Cost Tracking",
          description: "Track operational costs and facility profitability",
          isActive: false
        },
        {
          id: "deposit-management",
          name: "Deposit Management",
          description: "Manage security deposits and damage claims",
          isActive: false
        }
      ]
    },
    {
      category: "Reporting & Analytics",
      modules: [
        {
          id: "utilization-reports",
          name: "Utilization Reports",
          description: "Detailed facility utilization and efficiency reports",
          isActive: false
        },
        {
          id: "revenue-analytics",
          name: "Revenue Analytics",
          description: "Track facility revenue and financial performance",
          isActive: false
        },
        {
          id: "maintenance-reports",
          name: "Maintenance Reports",
          description: "Maintenance cost analysis and scheduling reports",
          isActive: false
        },
        {
          id: "compliance-tracking",
          name: "Compliance Tracking",
          description: "Track regulatory compliance and certifications",
          isActive: false
        }
      ]
    }
  ]
};

const StableRoomsModuleAccessCenter: React.FC = () => {
  const [moduleConfig, setModuleConfig] = useState<StableRoomsModuleConfig>(stableRoomsModuleConfig);
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
      case "Core Facility Management":
        return <Building className="h-4 w-4 mr-2" />;
      case "Space Planning & Layout":
        return <MapPin className="h-4 w-4 mr-2" />;
      case "Maintenance & Safety":
        return <Wrench className="h-4 w-4 mr-2" />;
      case "Occupancy & Reservations":
        return <Users className="h-4 w-4 mr-2" />;
      case "Financial Management":
        return <DollarSign className="h-4 w-4 mr-2" />;
      case "Reporting & Analytics":
        return <BarChart3 className="h-4 w-4 mr-2" />;
      default:
        return <Building className="h-4 w-4 mr-2" />;
    }
  };

  return (
    <>
      <Card className="w-full">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-xl font-bold flex items-center">
            <Building className="h-6 w-6 mr-2" />
            {moduleConfig.name}
          </CardTitle>
          <div className="flex items-center space-x-2">
            <Badge 
              variant={moduleConfig.isActive ? "default" : "outline"}
              className={moduleConfig.isActive ? "bg-green-600" : "text-gray-500"}
            >
              {moduleConfig.isActive ? "Active" : "Inactive"}
            </Badge>
            <Switch
              checked={moduleConfig.isActive}
              onCheckedChange={(checked) => handleModuleToggle(checked)}
            />
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-6">{moduleConfig.description}</p>
          
          <Accordion type="multiple" className="w-full" defaultValue={moduleConfig.submodules.map((_, index) => `item-${index}`)}>
            {moduleConfig.submodules.map((category, categoryIndex) => (
              <AccordionItem value={`item-${categoryIndex}`} key={categoryIndex}>
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex items-center text-left">
                    {getCategoryIcon(category.category)}
                    <span className="font-semibold">{category.category}</span>
                    <Badge variant="outline" className="ml-auto mr-2">
                      {category.modules.filter(m => m.isActive).length}/{category.modules.length} Active
                    </Badge>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4 pt-4">
                    {category.modules.map((submodule) => (
                      <div key={submodule.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className={`p-2 rounded-full ${submodule.isActive ? 'bg-green-100' : 'bg-gray-100'}`}>
                            {submodule.isActive ? (
                              <Check className="h-4 w-4 text-green-600" />
                            ) : (
                              <X className="h-4 w-4 text-gray-400" />
                            )}
                          </div>
                          <div>
                            <h4 className="font-medium flex items-center gap-2">
                              {submodule.name}
                              {submodule.isCore && (
                                <Badge variant="secondary" className="text-xs">Core</Badge>
                              )}
                            </h4>
                            <p className="text-sm text-muted-foreground">{submodule.description}</p>
                          </div>
                        </div>
                        <Switch
                          checked={submodule.isActive}
                          onCheckedChange={(checked) => handleSubmoduleToggle(submodule.id, checked)}
                          disabled={submodule.isCore && !moduleConfig.isActive}
                        />
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>

      <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Module Change</AlertDialogTitle>
            <AlertDialogDescription>
              {pendingChange?.submoduleId 
                ? `Are you sure you want to ${pendingChange.newState ? 'activate' : 'deactivate'} this submodule? This may affect related functionality.`
                : `Are you sure you want to ${pendingChange?.newState ? 'activate' : 'deactivate'} the entire Stable Rooms module? This will ${pendingChange?.newState ? 'enable' : 'disable'} all related features.`
              }
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={cancelChange}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmChange}>Confirm</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default StableRoomsModuleAccessCenter; 