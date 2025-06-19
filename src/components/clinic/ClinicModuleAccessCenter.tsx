import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Check, X, Stethoscope, Calendar, FileText, Heart, Pill, Users, ClipboardList, CreditCard, Store } from "lucide-react";
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

interface ClinicModuleConfig {
  id: string;
  name: string;
  description: string;
  isActive: boolean;
  submodules: ModuleCategory[];
}

const clinicModuleConfig: ClinicModuleConfig = {
  id: "clinic",
  name: "Clinic Management",
  description: "Comprehensive veterinary clinic management with appointments, treatments, and medical records",
  isActive: true,
  submodules: [
    {
      category: "Core Features",
      modules: [
        {
          id: "clinic-overview",
          name: "Clinic Overview",
          description: "Dashboard with key metrics and clinic overview",
          isActive: true,
          isCore: true
        },
        {
          id: "appointments",
          name: "Appointment Management",
          description: "Schedule and manage veterinary appointments",
          isActive: true,
          isCore: true
        },
        {
          id: "medical-records",
          name: "Medical Records",
          description: "Comprehensive medical history and health records",
          isActive: true,
          isCore: true
        }
      ]
    },
    {
      category: "Treatment & Care",
      modules: [
        {
          id: "treatment-plans",
          name: "Treatment Plans",
          description: "Create and manage treatment protocols and care plans",
          isActive: false
        },
        {
          id: "vaccinations",
          name: "Vaccination Management",
          description: "Track vaccination schedules and immunization records",
          isActive: false
        },
        {
          id: "emergency-care",
          name: "Emergency Care",
          description: "Emergency treatment protocols and critical care management",
          isActive: false
        },
        {
          id: "surgery-management",
          name: "Surgery Management",
          description: "Surgical procedure planning and post-operative care",
          isActive: false
        }
      ]
    },
    {
      category: "Administration",
      modules: [
        {
          id: "staff-management",
          name: "Staff Management",
          description: "Manage veterinary staff, schedules, and assignments",
          isActive: false
        },
        {
          id: "document-manager",
          name: "Document Manager",
          description: "Manage clinical documents, certificates, and reports",
          isActive: false
        },
        {
          id: "compliance-tracking",
          name: "Compliance Tracking",
          description: "Track regulatory compliance and certification requirements",
          isActive: false
        }
      ]
    },
    {
      category: "Commercial Features",
      modules: [
        {
          id: "clinic-pos",
          name: "Point of Sale",
          description: "Process payments for veterinary services and treatments",
          isActive: false
        },
        {
          id: "clinic-store",
          name: "Store Management",
          description: "Manage medical supplies, medications, and equipment inventory",
          isActive: false
        },
        {
          id: "billing-insurance",
          name: "Billing & Insurance",
          description: "Manage billing, insurance claims, and payment processing",
          isActive: false
        }
      ]
    }
  ]
};

const ClinicModuleAccessCenter: React.FC = () => {
  const [moduleConfig, setModuleConfig] = useState<ClinicModuleConfig>(clinicModuleConfig);
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
        return <Stethoscope className="h-4 w-4" />;
      case "Treatment & Care":
        return <Heart className="h-4 w-4" />;
      case "Administration":
        return <ClipboardList className="h-4 w-4" />;
      case "Commercial Features":
        return <CreditCard className="h-4 w-4" />;
      default:
        return <Stethoscope className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Stethoscope className="h-5 w-5" />
            Clinic Module Access Center
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

export default ClinicModuleAccessCenter;