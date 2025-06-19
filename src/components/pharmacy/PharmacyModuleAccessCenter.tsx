import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Check, X, Pill, Package, FileText, ShieldCheck, Zap, BarChart3, CreditCard, Store, Users } from "lucide-react";
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

interface PharmacyModuleConfig {
  id: string;
  name: string;
  description: string;
  isActive: boolean;
  submodules: ModuleCategory[];
}

const pharmacyModuleConfig: PharmacyModuleConfig = {
  id: "pharmacy",
  name: "Pharmacy Management",
  description: "Comprehensive pharmacy operations with inventory, prescriptions, and compliance management",
  isActive: true,
  submodules: [
    {
      category: "Core Features",
      modules: [
        {
          id: "pharmacy-overview",
          name: "Pharmacy Overview",
          description: "Dashboard with key metrics and pharmacy overview",
          isActive: true,
          isCore: true
        },
        {
          id: "prescription-management",
          name: "Prescription Management",
          description: "Handle prescriptions, dosage, and medication administration",
          isActive: true,
          isCore: true
        },
        {
          id: "inventory-management",
          name: "Inventory Management",
          description: "Track medication stock, expiry dates, and supply levels",
          isActive: true,
          isCore: true
        }
      ]
    },
    {
      category: "Clinical Operations",
      modules: [
        {
          id: "clinical-protocols",
          name: "Clinical Protocols",
          description: "Evidence-based treatment protocols and drug interactions",
          isActive: false
        },
        {
          id: "dosage-calculator",
          name: "Dosage Calculator",
          description: "Calculate precise dosages based on weight and condition",
          isActive: false
        },
        {
          id: "drug-interactions",
          name: "Drug Interaction Checker",
          description: "Monitor and alert for potential drug interactions",
          isActive: false
        },
        {
          id: "adverse-events",
          name: "Adverse Event Reporting",
          description: "Track and report medication adverse events",
          isActive: false
        }
      ]
    },
    {
      category: "Compliance & Quality",
      modules: [
        {
          id: "regulatory-compliance",
          name: "Regulatory Compliance",
          description: "Ensure compliance with pharmaceutical regulations",
          isActive: false
        },
        {
          id: "controlled-substances",
          name: "Controlled Substances",
          description: "Manage controlled substance inventory and tracking",
          isActive: false
        },
        {
          id: "quality-assurance",
          name: "Quality Assurance",
          description: "Quality control checks and batch tracking",
          isActive: false
        }
      ]
    },
    {
      category: "Automation & Integration",
      modules: [
        {
          id: "automated-dispensing",
          name: "Automated Dispensing",
          description: "Automated medication dispensing and packaging",
          isActive: false
        },
        {
          id: "lab-integration",
          name: "Laboratory Integration",
          description: "Integration with laboratory systems for test results",
          isActive: false
        },
        {
          id: "clinic-integration",
          name: "Clinic Integration",
          description: "Seamless integration with clinic management systems",
          isActive: false
        }
      ]
    },
    {
      category: "Commercial Features",
      modules: [
        {
          id: "pharmacy-pos",
          name: "Point of Sale",
          description: "Process payments for medications and pharmaceutical services",
          isActive: false
        },
        {
          id: "pharmacy-store",
          name: "Store Management",
          description: "Manage pharmaceutical products and over-the-counter items",
          isActive: false
        },
        {
          id: "supplier-management",
          name: "Supplier Management",
          description: "Manage pharmaceutical suppliers and procurement",
          isActive: false
        },
        {
          id: "insurance-billing",
          name: "Insurance & Billing",
          description: "Handle insurance claims and billing for medications",
          isActive: false
        }
      ]
    }
  ]
};

const PharmacyModuleAccessCenter: React.FC = () => {
  const [moduleConfig, setModuleConfig] = useState<PharmacyModuleConfig>(pharmacyModuleConfig);
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
        return <Pill className="h-4 w-4" />;
      case "Clinical Operations":
        return <FileText className="h-4 w-4" />;
      case "Compliance & Quality":
        return <ShieldCheck className="h-4 w-4" />;
      case "Automation & Integration":
        return <Zap className="h-4 w-4" />;
      case "Commercial Features":
        return <CreditCard className="h-4 w-4" />;
      default:
        return <Pill className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Pill className="h-5 w-5" />
            Pharmacy Module Access Center
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

export default PharmacyModuleAccessCenter;