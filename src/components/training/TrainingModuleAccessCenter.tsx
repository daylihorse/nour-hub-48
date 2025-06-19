import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Check, X, GraduationCap, Users, Calendar, BarChart3, Target, Settings } from "lucide-react";
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

interface TrainingModuleConfig {
  id: string;
  name: string;
  description: string;
  isActive: boolean;
  submodules: ModuleCategory[];
}

const trainingModuleConfig: TrainingModuleConfig = {
  id: "training",
  name: "Training Center Management",
  description: "Comprehensive training program management for horses, riders, and staff development",
  isActive: true,
  submodules: [
    {
      category: "Core Training Management",
      modules: [
        {
          id: "training-dashboard",
          name: "Training Dashboard",
          description: "Central overview of all training activities and progress",
          isActive: true,
          isCore: true
        },
        {
          id: "session-scheduling",
          name: "Session Scheduling",
          description: "Schedule and manage training sessions",
          isActive: true,
          isCore: true
        },
        {
          id: "progress-tracking",
          name: "Progress Tracking",
          description: "Track training progress and milestones",
          isActive: true,
          isCore: true
        }
      ]
    },
    {
      category: "Program Management",
      modules: [
        {
          id: "curriculum-design",
          name: "Curriculum Design",
          description: "Create and manage training curricula and programs",
          isActive: false
        },
        {
          id: "skill-assessment",
          name: "Skill Assessment",
          description: "Evaluate and assess training skills and competencies",
          isActive: false
        },
        {
          id: "certification-management",
          name: "Certification Management",
          description: "Manage certifications and qualifications",
          isActive: false
        },
        {
          id: "training-standards",
          name: "Training Standards",
          description: "Define and maintain training standards and protocols",
          isActive: false
        }
      ]
    },
    {
      category: "Instructor & Staff Management",
      modules: [
        {
          id: "instructor-profiles",
          name: "Instructor Profiles",
          description: "Manage instructor information and qualifications",
          isActive: false
        },
        {
          id: "staff-scheduling",
          name: "Staff Scheduling",
          description: "Schedule training staff and instructors",
          isActive: false
        },
        {
          id: "performance-evaluation",
          name: "Performance Evaluation",
          description: "Evaluate instructor and staff performance",
          isActive: false
        },
        {
          id: "professional-development",
          name: "Professional Development",
          description: "Track staff training and development programs",
          isActive: false
        }
      ]
    },
    {
      category: "Facility & Equipment",
      modules: [
        {
          id: "facility-booking",
          name: "Facility Booking",
          description: "Reserve and manage training facility usage",
          isActive: false
        },
        {
          id: "equipment-management",
          name: "Equipment Management",
          description: "Track and maintain training equipment inventory",
          isActive: false
        },
        {
          id: "safety-protocols",
          name: "Safety Protocols",
          description: "Manage safety procedures and incident reporting",
          isActive: false
        },
        {
          id: "maintenance-scheduling",
          name: "Maintenance Scheduling",
          description: "Schedule facility and equipment maintenance",
          isActive: false
        }
      ]
    },
    {
      category: "Analytics & Reporting",
      modules: [
        {
          id: "training-analytics",
          name: "Training Analytics",
          description: "Analyze training effectiveness and outcomes",
          isActive: false
        },
        {
          id: "progress-reports",
          name: "Progress Reports",
          description: "Generate detailed progress and performance reports",
          isActive: false
        },
        {
          id: "attendance-tracking",
          name: "Attendance Tracking",
          description: "Monitor training session attendance and participation",
          isActive: false
        },
        {
          id: "financial-reporting",
          name: "Financial Reporting",
          description: "Track training program costs and revenue",
          isActive: false
        }
      ]
    },
    {
      category: "Advanced Features",
      modules: [
        {
          id: "virtual-training",
          name: "Virtual Training",
          description: "Online and virtual training session management",
          isActive: false
        },
        {
          id: "mobile-training-app",
          name: "Mobile Training App",
          description: "Mobile application for training session management",
          isActive: false
        },
        {
          id: "ai-coaching-assistant",
          name: "AI Coaching Assistant",
          description: "AI-powered training recommendations and coaching",
          isActive: false
        },
        {
          id: "integration-apis",
          name: "Training Integration APIs",
          description: "Connect with external training and learning systems",
          isActive: false
        }
      ]
    }
  ]
};

const TrainingModuleAccessCenter: React.FC = () => {
  const [moduleConfig, setModuleConfig] = useState<TrainingModuleConfig>(trainingModuleConfig);
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
      case "Core Training Management":
        return <GraduationCap className="h-4 w-4" />;
      case "Program Management":
        return <Target className="h-4 w-4" />;
      case "Instructor & Staff Management":
        return <Users className="h-4 w-4" />;
      case "Facility & Equipment":
        return <Calendar className="h-4 w-4" />;
      case "Analytics & Reporting":
        return <BarChart3 className="h-4 w-4" />;
      case "Advanced Features":
        return <Settings className="h-4 w-4" />;
      default:
        return <GraduationCap className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5" />
            Training Center Module Access Center
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

export default TrainingModuleAccessCenter;
