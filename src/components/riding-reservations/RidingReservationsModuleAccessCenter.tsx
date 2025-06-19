import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Check, X, Calendar, Users, Rabbit, MapPin, Star, CreditCard } from "lucide-react";
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

interface RidingReservationsModuleConfig {
  id: string;
  name: string;
  description: string;
  isActive: boolean;
  submodules: ModuleCategory[];
}

const ridingReservationsModuleConfig: RidingReservationsModuleConfig = {
  id: "riding-reservations",
  name: "Riding Reservations Management",
  description: "Comprehensive horse riding reservation system for guests, scheduling, and experience management",
  isActive: true,
  submodules: [
    {
      category: "Core Reservation Management",
      modules: [
        {
          id: "reservation-dashboard",
          name: "Reservation Dashboard",
          description: "Central overview of all riding reservations and bookings",
          isActive: true,
          isCore: true
        },
        {
          id: "booking-system",
          name: "Booking System",
          description: "Accept and manage riding experience bookings",
          isActive: true,
          isCore: true
        },
        {
          id: "schedule-management",
          name: "Schedule Management",
          description: "Manage riding schedules and time slots",
          isActive: true,
          isCore: true
        }
      ]
    },
    {
      category: "Experience Management",
      modules: [
        {
          id: "ride-experiences",
          name: "Ride Experiences",
          description: "Create and manage different types of riding experiences",
          isActive: false
        },
        {
          id: "trail-management",
          name: "Trail Management",
          description: "Manage riding trails and route information",
          isActive: false
        },
        {
          id: "group-bookings",
          name: "Group Bookings",
          description: "Handle large group and corporate reservations",
          isActive: false
        },
        {
          id: "seasonal-programs",
          name: "Seasonal Programs",
          description: "Manage seasonal riding programs and special events",
          isActive: false
        }
      ]
    },
    {
      category: "Guest & Guide Management",
      modules: [
        {
          id: "guest-profiles",
          name: "Guest Profiles",
          description: "Manage guest information and riding history",
          isActive: false
        },
        {
          id: "guide-scheduling",
          name: "Guide Scheduling",
          description: "Schedule riding guides and instructors",
          isActive: false
        },
        {
          id: "safety-assessments",
          name: "Safety Assessments",
          description: "Conduct rider safety evaluations and skill assessments",
          isActive: false
        },
        {
          id: "guide-training",
          name: "Guide Training",
          description: "Manage guide certifications and training programs",
          isActive: false
        }
      ]
    },
    {
      category: "Horse & Equipment Management",
      modules: [
        {
          id: "horse-assignment",
          name: "Horse Assignment",
          description: "Assign horses to riders based on skill level and preferences",
          isActive: false
        },
        {
          id: "equipment-tracking",
          name: "Equipment Tracking",
          description: "Track saddles, bridles, and safety equipment usage",
          isActive: false
        },
        {
          id: "horse-availability",
          name: "Horse Availability",
          description: "Monitor horse availability and rest schedules",
          isActive: false
        },
        {
          id: "maintenance-alerts",
          name: "Maintenance Alerts",
          description: "Equipment maintenance schedules and safety checks",
          isActive: false
        }
      ]
    },
    {
      category: "Payment & Pricing",
      modules: [
        {
          id: "pricing-management",
          name: "Pricing Management",
          description: "Manage dynamic pricing for different ride experiences",
          isActive: false
        },
        {
          id: "payment-processing",
          name: "Payment Processing",
          description: "Handle reservations payments and refunds",
          isActive: false
        },
        {
          id: "package-deals",
          name: "Package Deals",
          description: "Create and manage riding package offers",
          isActive: false
        },
        {
          id: "loyalty-programs",
          name: "Loyalty Programs",
          description: "Reward frequent riders with loyalty benefits",
          isActive: false
        }
      ]
    },
    {
      category: "Analytics & Reporting",
      modules: [
        {
          id: "booking-analytics",
          name: "Booking Analytics",
          description: "Analyze reservation patterns and guest preferences",
          isActive: false
        },
        {
          id: "revenue-reports",
          name: "Revenue Reports",
          description: "Track riding experience revenue and profitability",
          isActive: false
        },
        {
          id: "guest-satisfaction",
          name: "Guest Satisfaction",
          description: "Monitor guest feedback and satisfaction scores",
          isActive: false
        },
        {
          id: "capacity-optimization",
          name: "Capacity Optimization",
          description: "Optimize schedules and resource utilization",
          isActive: false
        }
      ]
    }
  ]
};

const RidingReservationsModuleAccessCenter: React.FC = () => {
  const [moduleConfig, setModuleConfig] = useState<RidingReservationsModuleConfig>(ridingReservationsModuleConfig);
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
      case "Core Reservation Management":
        return <Calendar className="h-4 w-4 mr-2" />;
      case "Experience Management":
        return <MapPin className="h-4 w-4 mr-2" />;
      case "Guest & Guide Management":
        return <Users className="h-4 w-4 mr-2" />;
      case "Horse & Equipment Management":
        return <Rabbit className="h-4 w-4 mr-2" />;
      case "Payment & Pricing":
        return <CreditCard className="h-4 w-4 mr-2" />;
      case "Analytics & Reporting":
        return <Star className="h-4 w-4 mr-2" />;
      default:
        return <Calendar className="h-4 w-4 mr-2" />;
    }
  };

  return (
    <>
      <Card className="w-full">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-xl font-bold flex items-center">
            <Calendar className="h-6 w-6 mr-2" />
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
                : `Are you sure you want to ${pendingChange?.newState ? 'activate' : 'deactivate'} the entire Riding Reservations module? This will ${pendingChange?.newState ? 'enable' : 'disable'} all related features.`
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

export default RidingReservationsModuleAccessCenter; 