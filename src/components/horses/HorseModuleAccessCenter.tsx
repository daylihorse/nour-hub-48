
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check, X, Users, Clipboard, Award, Dna } from "lucide-react";
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

interface HorseModuleConfig {
  id: string;
  name: string;
  description: string;
  isActive: boolean;
  submodules: ModuleCategory[];
}

const horseModuleConfig: HorseModuleConfig = {
  id: "horse",
  name: "Horse Management",
  description: "Comprehensive horse management system with breeding, health, and performance tracking",
  isActive: true,
  submodules: [
    {
      category: "Core Features",
      modules: [
        {
          id: "horse-registration",
          name: "Horse Registration",
          description: "Register and manage horse profiles with detailed information",
          isActive: true,
          isCore: true
        },
        {
          id: "horse-health",
          name: "Health Records",
          description: "Track health records, vaccinations and medical history",
          isActive: true,
          isCore: true
        }
      ]
    },
    {
      category: "Breeding Management",
      modules: [
        {
          id: "breeding-contracts",
          name: "Breeding Contracts",
          description: "Create and manage breeding contracts and agreements",
          isActive: false
        },
        {
          id: "breeding-records",
          name: "Breeding Records",
          description: "Track breeding history, outcomes and lineage",
          isActive: false
        },
        {
          id: "stallion-management",
          name: "Stallion Management",
          description: "Specialized tools for stallion owners and managers",
          isActive: false
        },
        {
          id: "mare-management",
          name: "Mare Management",
          description: "Track mare reproductive cycles and breeding readiness",
          isActive: false
        }
      ]
    },
    {
      category: "Performance & Training",
      modules: [
        {
          id: "performance-tracking",
          name: "Performance Tracking",
          description: "Monitor training progress and competition results",
          isActive: false
        },
        {
          id: "training-schedules",
          name: "Training Schedules",
          description: "Create and manage training programs and schedules",
          isActive: false
        },
        {
          id: "competition-management",
          name: "Competition Management",
          description: "Track competition entries, results and achievements",
          isActive: false
        }
      ]
    },
    {
      category: "Advanced Features",
      modules: [
        {
          id: "genetics-analysis",
          name: "Genetics Analysis",
          description: "Advanced genetic tracking and analysis tools",
          isActive: false
        },
        {
          id: "nutrition-management",
          name: "Nutrition Management",
          description: "Manage feeding schedules and nutrition plans",
          isActive: false
        },
        {
          id: "transport-logistics",
          name: "Transport & Logistics",
          description: "Manage horse transportation and travel documents",
          isActive: false
        },
        {
          id: "pedigree-visualization",
          name: "Pedigree Visualization",
          description: "Interactive pedigree charts and ancestry tracking",
          isActive: false
        }
      ]
    }
  ]
};

const HorseModuleAccessCenter: React.FC = () => {
  const [moduleConfig, setModuleConfig] = useState<HorseModuleConfig>(horseModuleConfig);
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
      case "Breeding Management":
        return <Dna className="h-4 w-4 mr-2" />;
      case "Performance & Training":
        return <Award className="h-4 w-4 mr-2" />;
      case "Core Features":
        return <Users className="h-4 w-4 mr-2" />;
      default:
        return <Clipboard className="h-4 w-4 mr-2" />;
    }
  };

  return (
    <>
      <Card className="w-full">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-xl font-bold flex items-center">
            <Users className="h-6 w-6 mr-2" />
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
                ? "This will activate the selected feature and may require subscription changes. Do you want to continue?" 
                : "This will deactivate the selected feature. Any data will remain but will be inaccessible until reactivated. Continue?"}
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

export default HorseModuleAccessCenter;
