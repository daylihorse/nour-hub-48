import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check, X, Settings, Database, Users, FileText } from "lucide-react";
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

interface ModuleConfig {
  id: string;
  name: string;
  description: string;
  isActive: boolean;
  submodules: ModuleCategory[];
}

const moduleConfigs: ModuleConfig[] = [
  {
    id: "core",
    name: "Core System",
    description: "Essential system functionality and user management",
    isActive: true,
    submodules: [
      {
        category: "User Management",
        modules: [
          {
            id: "user-accounts",
            name: "User Accounts",
            description: "Manage user accounts and authentication",
            isActive: true,
            isCore: true
          },
          {
            id: "role-permissions",
            name: "Roles & Permissions",
            description: "Configure user roles and access permissions",
            isActive: true,
            isCore: true
          }
        ]
      },
      {
        category: "System Settings",
        modules: [
          {
            id: "general-settings",
            name: "General Settings",
            description: "Basic system configuration and preferences",
            isActive: true,
            isCore: true
          },
          {
            id: "notification-settings",
            name: "Notification Settings",
            description: "Configure system notifications and alerts",
            isActive: false
          }
        ]
      }
    ]
  },
  {
    id: "reporting",
    name: "Reporting & Analytics",
    description: "Generate reports and analyze data across all modules",
    isActive: false,
    submodules: [
      {
        category: "Standard Reports",
        modules: [
          {
            id: "financial-reports",
            name: "Financial Reports",
            description: "Generate financial summaries and statements",
            isActive: false
          },
          {
            id: "operational-reports",
            name: "Operational Reports",
            description: "Track operational metrics and performance",
            isActive: false
          }
        ]
      },
      {
        category: "Advanced Analytics",
        modules: [
          {
            id: "predictive-analytics",
            name: "Predictive Analytics",
            description: "AI-powered insights and predictions",
            isActive: false
          },
          {
            id: "custom-dashboards",
            name: "Custom Dashboards",
            description: "Create personalized analytical dashboards",
            isActive: false
          }
        ]
      }
    ]
  }
];

const ModuleAccessCenter: React.FC = () => {
  const [modules, setModules] = useState<ModuleConfig[]>(moduleConfigs);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [pendingChange, setPendingChange] = useState<{
    moduleId?: string;
    submoduleId?: string;
    newState: boolean;
  } | null>(null);

  const handleModuleToggle = (moduleId: string, newState: boolean) => {
    setPendingChange({ moduleId, newState });
    setDialogOpen(true);
  };

  const handleSubmoduleToggle = (moduleId: string, submoduleId: string, newState: boolean) => {
    setPendingChange({ moduleId, submoduleId, newState });
    setDialogOpen(true);
  };

  const confirmChange = () => {
    if (!pendingChange) return;
    
    if (!pendingChange.submoduleId) {
      // Main module toggle
      setModules(prev => prev.map(module => 
        module.id === pendingChange.moduleId
          ? {
              ...module,
              isActive: pendingChange.newState,
              submodules: module.submodules.map(category => ({
                ...category,
                modules: category.modules.map(submodule => ({
                  ...submodule,
                  isActive: pendingChange.newState ? 
                    submodule.isActive : 
                    submodule.isCore || false
                }))
              }))
            }
          : module
      ));
    } else {
      // Submodule toggle
      setModules(prev => prev.map(module => 
        module.id === pendingChange.moduleId
          ? {
              ...module,
              submodules: module.submodules.map(category => ({
                ...category,
                modules: category.modules.map(submodule => 
                  submodule.id === pendingChange.submoduleId
                    ? { ...submodule, isActive: pendingChange.newState }
                    : submodule
                )
              }))
            }
          : module
      ));
    }
    
    setDialogOpen(false);
    setPendingChange(null);
  };

  const cancelChange = () => {
    setDialogOpen(false);
    setPendingChange(null);
  };

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case "user management":
        return <Users className="h-4 w-4" />;
      case "system settings":
        return <Settings className="h-4 w-4" />;
      case "standard reports":
        return <FileText className="h-4 w-4" />;
      case "advanced analytics":
        return <Database className="h-4 w-4" />;
      default:
        return <Settings className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Module Access Center
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {modules.map((module) => (
              <Card key={module.id} className="border-2">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div>
                        <CardTitle className="text-lg">{module.name}</CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">
                          {module.description}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={module.isActive ? "default" : "secondary"}>
                        {module.isActive ? (
                          <><Check className="h-3 w-3 mr-1" /> Active</>
                        ) : (
                          <><X className="h-3 w-3 mr-1" /> Inactive</>
                        )}
                      </Badge>
                      <Switch
                        checked={module.isActive}
                        onCheckedChange={(checked) => handleModuleToggle(module.id, checked)}
                      />
                    </div>
                  </div>
                </CardHeader>
                
                {module.isActive && (
                  <CardContent className="pt-0">
                    <Accordion type="multiple" className="w-full">
                      {module.submodules.map((category, categoryIndex) => (
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
                                      handleSubmoduleToggle(module.id, submodule.id, checked)
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
            ))}
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

export default ModuleAccessCenter; 