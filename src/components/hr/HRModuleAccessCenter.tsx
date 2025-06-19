import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Check, X, Users, Calendar, DollarSign, BarChart3, Settings, GraduationCap, Shield, Clock, FileText, Award, AlertTriangle } from "lucide-react";
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

interface HRModuleConfig {
  id: string;
  name: string;
  description: string;
  isActive: boolean;
  submodules: ModuleCategory[];
}

const hrModuleConfig: HRModuleConfig = {
  id: "hr",
  name: "Human Resources Management",
  description: "Comprehensive HR management including employee records, payroll, performance, and compliance",
  isActive: true,
  submodules: [
    {
      category: "Core HR Functions",
      modules: [
        {
          id: "hr-dashboard",
          name: "HR Dashboard",
          description: "Central HR overview with key metrics and insights",
          isActive: true,
          isCore: true
        },
        {
          id: "employee-records",
          name: "Employee Records",
          description: "Manage employee profiles, personal information, and documentation",
          isActive: true,
          isCore: true
        },
        {
          id: "employee-onboarding",
          name: "Employee Onboarding",
          description: "Streamline new employee onboarding processes",
          isActive: true,
          isCore: true
        }
      ]
    },
    {
      category: "Payroll & Benefits",
      modules: [
        {
          id: "payroll-management",
          name: "Payroll Management",
          description: "Process payroll, manage salaries, and handle deductions",
          isActive: false
        },
        {
          id: "benefits-administration",
          name: "Benefits Administration",
          description: "Manage employee benefits, insurance, and compensation packages",
          isActive: false
        },
        {
          id: "tax-compliance",
          name: "Tax Compliance",
          description: "Handle tax calculations, filings, and compliance reporting",
          isActive: false
        },
        {
          id: "expense-management",
          name: "Expense Management",
          description: "Track and reimburse employee expenses and travel costs",
          isActive: false
        }
      ]
    },
    {
      category: "Time & Attendance",
      modules: [
        {
          id: "work-schedules",
          name: "Work Schedules",
          description: "Create and manage employee work schedules and shifts",
          isActive: false
        },
        {
          id: "time-tracking",
          name: "Time Tracking",
          description: "Track employee work hours and attendance",
          isActive: false
        },
        {
          id: "leave-management",
          name: "Leave Management",
          description: "Manage vacation, sick leave, and other time-off requests",
          isActive: false
        },
        {
          id: "overtime-management",
          name: "Overtime Management",
          description: "Track and approve overtime hours and compensation",
          isActive: false
        }
      ]
    },
    {
      category: "Performance & Development",
      modules: [
        {
          id: "performance-reviews",
          name: "Performance Reviews",
          description: "Conduct regular performance evaluations and reviews",
          isActive: false
        },
        {
          id: "goal-management",
          name: "Goal Management",
          description: "Set and track employee goals and objectives",
          isActive: false
        },
        {
          id: "training-records",
          name: "Training & Development",
          description: "Manage employee training programs and skill development",
          isActive: false
        },
        {
          id: "career-planning",
          name: "Career Planning",
          description: "Plan career paths and succession planning",
          isActive: false
        }
      ]
    },
    {
      category: "Compliance & Reporting",
      modules: [
        {
          id: "hr-analytics",
          name: "HR Analytics",
          description: "Generate HR reports and workforce analytics",
          isActive: false
        },
        {
          id: "compliance-management",
          name: "Compliance Management",
          description: "Ensure HR compliance with labor laws and regulations",
          isActive: false
        },
        {
          id: "audit-trails",
          name: "Audit Trails",
          description: "Maintain detailed audit logs for HR activities",
          isActive: false
        },
        {
          id: "document-management",
          name: "Document Management",
          description: "Store and organize HR documents and policies",
          isActive: false
        }
      ]
    },
    {
      category: "Employee Engagement",
      modules: [
        {
          id: "employee-surveys",
          name: "Employee Surveys",
          description: "Conduct employee satisfaction and engagement surveys",
          isActive: false
        },
        {
          id: "recognition-programs",
          name: "Recognition Programs",
          description: "Manage employee recognition and reward programs",
          isActive: false
        },
        {
          id: "internal-communications",
          name: "Internal Communications",
          description: "Manage company announcements and internal messaging",
          isActive: false
        },
        {
          id: "employee-self-service",
          name: "Employee Self-Service",
          description: "Portal for employees to access their information and requests",
          isActive: false
        }
      ]
    }
  ]
};

const HRModuleAccessCenter: React.FC = () => {
  const [moduleConfig, setModuleConfig] = useState<HRModuleConfig>(hrModuleConfig);
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
      case "Core HR Functions":
        return <Users className="h-4 w-4" />;
      case "Payroll & Benefits":
        return <DollarSign className="h-4 w-4" />;
      case "Time & Attendance":
        return <Clock className="h-4 w-4" />;
      case "Performance & Development":
        return <Award className="h-4 w-4" />;
      case "Compliance & Reporting":
        return <Shield className="h-4 w-4" />;
      case "Employee Engagement":
        return <GraduationCap className="h-4 w-4" />;
      default:
        return <Users className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            HR Module Access Center
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

export default HRModuleAccessCenter; 