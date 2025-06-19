import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  MapPin,
  Lock,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  PowerIcon,
  BarChart3,
  Calendar,
  Settings,
  Leaf,
  Check,
  X,
  Map,
  Droplets
} from "lucide-react";
import { Link } from "react-router-dom";
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

interface PaddockModuleConfig {
  id: string;
  name: string;
  description: string;
  isActive: boolean;
  submodules: ModuleCategory[];
}

const paddockModuleConfig: PaddockModuleConfig = {
  id: "paddock",
  name: "Paddock Management",
  description: "Comprehensive paddock and field management system with environmental monitoring",
  isActive: true,
  submodules: [
    {
      category: "Core Features",
      modules: [
        {
          id: "paddock-mapping",
          name: "Paddock Mapping",
          description: "Map and organize paddock layouts",
          isActive: true,
          isCore: true
        },
        {
          id: "paddock-rotation",
          name: "Rotation Planning",
          description: "Plan and track paddock rotation schedules",
          isActive: true,
          isCore: true
        }
      ]
    },
    {
      category: "Environmental Management",
      modules: [
        {
          id: "soil-management",
          name: "Soil Management",
          description: "Track soil quality, pH levels and nutrient content",
          isActive: false
        },
        {
          id: "grass-management",
          name: "Grass Management",
          description: "Monitor grass growth, types and quality",
          isActive: false
        },
        {
          id: "water-management",
          name: "Water Management",
          description: "Track water sources, quality and irrigation systems",
          isActive: false
        }
      ]
    },
    {
      category: "Maintenance",
      modules: [
        {
          id: "fence-maintenance",
          name: "Fence Maintenance",
          description: "Schedule and track fence repairs and maintenance",
          isActive: false
        },
        {
          id: "weed-control",
          name: "Weed Control",
          description: "Monitor and manage weed control programs",
          isActive: false
        },
        {
          id: "fertilization",
          name: "Fertilization Planning",
          description: "Schedule and track fertilization programs",
          isActive: false
        }
      ]
    },
    {
      category: "Advanced Features",
      modules: [
        {
          id: "paddock-analytics",
          name: "Paddock Analytics",
          description: "Advanced analytics for paddock optimization",
          isActive: false
        },
        {
          id: "environmental-monitoring",
          name: "Environmental Monitoring",
          description: "Track weather conditions and environmental impact",
          isActive: false
        },
        {
          id: "grazing-optimization",
          name: "Grazing Optimization",
          description: "AI-powered grazing recommendations and scheduling",
          isActive: false
        },
        {
          id: "satellite-integration",
          name: "Satellite Integration",
          description: "Integration with satellite imagery for vegetation analysis",
          isActive: false
        }
      ]
    }
  ]
};

const PaddockModuleAccessCenter: React.FC = () => {
  const [moduleConfig, setModuleConfig] = useState<PaddockModuleConfig>(paddockModuleConfig);
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
      case "Environmental Management":
        return <Leaf className="h-4 w-4 mr-2" />;
      case "Maintenance":
        return <Droplets className="h-4 w-4 mr-2" />;
      case "Advanced Features":
        return <BarChart3 className="h-4 w-4 mr-2" />;
      default:
        return <Map className="h-4 w-4 mr-2" />;
    }
  };

  return (
    <>
      <Card className="w-full">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-xl font-bold flex items-center">
            <Map className="h-6 w-6 mr-2" />
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
          <p className="text-sm text-muted-foreground mb-4">{moduleConfig.description}</p>
          
          <Accordion type="multiple" className="w-full">
            {moduleConfig.submodules.map((category, idx) => (
              <AccordionItem key={`${moduleConfig.id}-${idx}`} value={`${moduleConfig.id}-${idx}`}>
                <AccordionTrigger className="text-md font-medium">
                  <div className="flex items-center">
                    {getCategoryIcon(category.category)}
                    {category.category}
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-3">
                    {category.modules.map(submodule => (
                      <div 
                        key={submodule.id} 
                        className="flex items-center justify-between p-2 rounded-md border"
                      >
                        <div className="flex-1">
                          <div className="flex items-center">
                            <h4 className="font-medium">
                              {submodule.name}
                              {submodule.isCore && (
                                <Badge variant="outline" className="ml-2 bg-blue-100 text-blue-800 border-blue-300">
                                  Core
                                </Badge>
                              )}
                            </h4>
                          </div>
                          <p className="text-sm text-muted-foreground">{submodule.description}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          {submodule.isActive ? (
                            <Check size={16} className="text-green-500" />
                          ) : (
                            <X size={16} className="text-gray-400" />
                          )}
                          <Switch
                            checked={submodule.isActive}
                            onCheckedChange={(checked) => 
                              handleSubmoduleToggle(submodule.id, checked)
                            }
                            disabled={submodule.isCore || !moduleConfig.isActive}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>

      <AlertDialog open={dialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {pendingChange?.newState 
                ? "Activate Feature" 
                : "Deactivate Feature"}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {pendingChange?.newState 
                ? "This will activate the selected paddock feature and may require subscription changes. Do you want to continue?" 
                : "This will deactivate the selected paddock feature. Any data will remain but will be inaccessible until reactivated. Continue?"}
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

export default PaddockModuleAccessCenter; 