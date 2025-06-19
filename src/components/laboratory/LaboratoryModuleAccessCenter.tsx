
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Check, X, FlaskRound, TestTube, Microscope, TrendingUp, Shield, File, Settings, FileText, ShoppingCart } from "lucide-react";
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

interface LaboratoryModuleConfig {
  id: string;
  name: string;
  description: string;
  isActive: boolean;
  submodules: ModuleCategory[];
}

const laboratoryModuleConfig: LaboratoryModuleConfig = {
  id: "laboratory",
  name: "Laboratory Management",
  description: "Comprehensive laboratory testing, analysis, and quality control system",
  isActive: true,
  submodules: [
    {
      category: "Core Features",
      modules: [
        {
          id: "lab-overview",
          name: "Laboratory Overview",
          description: "Dashboard with key metrics and system overview",
          isActive: true,
          isCore: true
        },
        {
          id: "sample-management",
          name: "Sample Management",
          description: "Sample collection, tracking, and test management",
          isActive: true,
          isCore: true
        },
        {
          id: "test-results",
          name: "Test Results",
          description: "View and manage laboratory test results",
          isActive: true,
          isCore: true
        }
      ]
    },
    {
      category: "Analysis & Reporting",
      modules: [
        {
          id: "result-comparison",
          name: "Result Comparison",
          description: "Compare test results across different horses and time periods",
          isActive: false
        },
        {
          id: "quality-control",
          name: "Quality Control",
          description: "QC checks, compliance monitoring, and audit trails",
          isActive: false
        },
        {
          id: "templates",
          name: "Report Templates",
          description: "Customizable templates for laboratory reports",
          isActive: false
        }
      ]
    },
    {
      category: "Management Tools",
      modules: [
        {
          id: "equipment-management",
          name: "Equipment Management",
          description: "Track laboratory equipment, maintenance, and calibration",
          isActive: false
        },
        {
          id: "document-manager",
          name: "Document Manager",
          description: "Manage laboratory documents, protocols, and SOPs",
          isActive: false
        }
      ]
    },
    {
      category: "Commercial Features",
      modules: [
        {
          id: "lab-pos",
          name: "Point of Sale",
          description: "Process payments for laboratory services",
          isActive: false
        },
        {
          id: "lab-store",
          name: "Store Management",
          description: "Manage laboratory supplies and inventory",
          isActive: false
        }
      ]
    }
  ]
};

const LaboratoryModuleAccessCenter: React.FC = () => {
  const [moduleConfig, setModuleConfig] = useState<LaboratoryModuleConfig>(laboratoryModuleConfig);
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
        return <FlaskRound className="h-4 w-4 mr-2" />;
      case "Analysis & Reporting":
        return <TrendingUp className="h-4 w-4 mr-2" />;
      case "Management Tools":
        return <Settings className="h-4 w-4 mr-2" />;
      case "Commercial Features":
        return <ShoppingCart className="h-4 w-4 mr-2" />;
      default:
        return <TestTube className="h-4 w-4 mr-2" />;
    }
  };

  return (
    <>
      <Card className="w-full">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-xl font-bold flex items-center">
            <FlaskRound className="h-6 w-6 mr-2" />
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

export default LaboratoryModuleAccessCenter;
