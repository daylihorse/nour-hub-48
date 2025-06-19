import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Switch } from "@/components/ui/switch";
import { 
  Rabbit, 
  FlaskRound, 
  Hospital, 
  DollarSign, 
  Users, 
  Package, 
  ArrowRightLeft, 
  Dumbbell, 
  Warehouse, 
  Wrench,
  Store,
  MessageSquare,
  Pill,
  UserCheck,
  Lock,
  ArrowRight,
  Zap,
  PowerIcon,
  CreditCard
} from "lucide-react";
import { Link } from "react-router-dom";
import { useTenantFeatures } from "@/hooks/useTenantFeatures";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// Mock function to update tenant settings - would be replaced with actual API call
const updateTenantFeatureSettings = async (
  tenantId: string, 
  features: Record<string, boolean>
): Promise<boolean> => {
  console.log('Updating tenant features:', { tenantId, features });
  return new Promise((resolve) => {
    setTimeout(() => resolve(true), 500);
  });
};

const EnhancedDepartmentGrid = () => {
  const { 
    isFeatureEnabled, 
    getFeatureDefinition,
    getAvailableFeatures,
    features,
    featureMatrix
  } = useTenantFeatures();
  
  const { currentTenant } = useAuth();
  const { toast } = useToast();
  const [featureStates, setFeatureStates] = useState<Record<string, boolean>>({
    ...(features || {})
  });
  const [isUpdating, setIsUpdating] = useState<string | null>(null);
  const [showSubscriptionDialog, setShowSubscriptionDialog] = useState(false);
  const [selectedModule, setSelectedModule] = useState<string | null>(null);

  const departments = [
    {
      title: "Horses Department",
      icon: Rabbit,
      description: "Manage horse records, health, and breeding information",
      link: "/dashboard/horses",
      color: "from-blue-500 to-blue-600",
      iconBg: "bg-blue-500",
      alerts: 3,
      feature: "horses",
      priority: "high",
      targetClients: ["Horse Owner", "Stable Owner", "Breeding Farm"]
    },
    {
      title: "Clients", 
      icon: UserCheck,
      description: "Client management and relationships",
      link: "/dashboard/clients",
      color: "from-indigo-500 to-indigo-600",
      iconBg: "bg-indigo-500", 
      alerts: 0,
      feature: null, // Core feature, always available
      priority: "high",
      targetClients: ["All"]
    },
    {
      title: "Laboratory",
      icon: FlaskRound,
      description: "Lab tests, results, and medical analysis",
      link: "/dashboard/laboratory",
      color: "from-green-500 to-green-600",
      iconBg: "bg-green-500",
      alerts: 7,
      feature: "laboratory",
      priority: "medium",
      targetClients: ["Veterinary Clinic", "Hospital Owner", "Research Center"]
    },
    {
      title: "Clinic",
      icon: Hospital,
      description: "Veterinary care, appointments, and medical records",
      link: "/dashboard/clinic",
      color: "from-red-500 to-red-600",
      iconBg: "bg-red-500",
      alerts: 2,
      feature: "clinic",
      priority: "high",
      targetClients: ["Veterinary Clinic", "Hospital Owner"]
    },
    {
      title: "Pharmacy",
      icon: Pill,
      description: "Veterinary pharmacy, prescriptions, and medication management",
      link: "/dashboard/pharmacy",
      color: "from-teal-500 to-teal-600",
      iconBg: "bg-teal-500",
      alerts: 8,
      feature: "pharmacy",
      priority: "medium",
      targetClients: ["Veterinary Clinic", "Hospital Owner", "Pharmacy"]
    },
    {
      title: "Finance",
      icon: DollarSign,
      description: "Financial management, invoicing, and accounting",
      link: "/dashboard/finance",
      color: "from-yellow-500 to-yellow-600",
      iconBg: "bg-yellow-500",
      alerts: 5,
      feature: "finance",
      priority: "high",
      targetClients: ["All"]
    },
    {
      title: "HR Department",
      icon: Users,
      description: "Employee management, payroll, and scheduling",
      link: "/dashboard/hr",
      color: "from-purple-500 to-purple-600",
      iconBg: "bg-purple-500",
      alerts: 0,
      feature: "hr",
      priority: "medium",
      targetClients: ["Stable Owner", "Hospital Owner", "Breeding Farm", "Training Center"]
    },
    {
      title: "Inventory",
      icon: Package,
      description: "Stock management, supplies, and equipment",
      link: "/dashboard/inventory",
      color: "from-orange-500 to-orange-600",
      iconBg: "bg-orange-500",
      alerts: 8,
      feature: "inventory",
      priority: "medium",
      targetClients: ["All"]
    },
    {
      title: "Marketplace",
      icon: Store,
      description: "Stable store and marketplace integration",
      link: "/dashboard/marketplace",
      color: "from-pink-500 to-pink-600",
      iconBg: "bg-pink-500",
      alerts: 0,
      feature: "marketplace",
      priority: "low",
      targetClients: ["All"]
    },
    {
      title: "Horse Movements",
      icon: ArrowRightLeft,
      description: "Track arrivals, departures, and transfers",
      link: "/dashboard/movements",
      color: "from-indigo-500 to-indigo-600",
      iconBg: "bg-indigo-500",
      alerts: 4,
      feature: null, // Core feature, always available
      priority: "medium",
      targetClients: ["Horse Owner", "Stable Owner", "Breeding Farm"]
    },
    {
      title: "Training Center",
      icon: Dumbbell,
      description: "Training programs, schedules, and progress tracking",
      link: "/dashboard/training",
      color: "from-teal-500 to-teal-600",
      iconBg: "bg-teal-500",
      alerts: 0,
      feature: "training",
      priority: "low",
      targetClients: ["Training Center", "Stable Owner"]
    },
    {
      title: "Stable Rooms",
      icon: Warehouse,
      description: "Room assignments, availability, and maintenance",
      link: "/dashboard/rooms",
      color: "from-cyan-500 to-cyan-600",
      iconBg: "bg-cyan-500",
      alerts: 2,
      feature: "rooms",
      priority: "high",
      targetClients: ["Stable Owner", "Breeding Farm"]
    },
    {
      title: "Maintenance",
      icon: Wrench,
      description: "Facility maintenance, repairs, and schedules",
      link: "/dashboard/maintenance",
      color: "from-gray-500 to-gray-600",
      iconBg: "bg-gray-500",
      alerts: 1,
      feature: "maintenance",
      priority: "medium",
      targetClients: ["Stable Owner", "Hospital Owner", "Breeding Farm"]
    },
    {
      title: "Messages",
      icon: MessageSquare,
      description: "Internal messaging and communications",
      link: "/dashboard/messages",
      color: "from-emerald-500 to-emerald-600",
      iconBg: "bg-emerald-500",
      alerts: 0,
      feature: "messages",
      priority: "low",
      targetClients: ["All"]
    }
  ];

  // Get all departments that are available based on subscription
  const availableDepartments = departments.filter(dept => 
    !dept.feature || getAvailableFeatures().some(f => f.id === dept.feature)
  );

  // Group by priority
  const highPriority = availableDepartments.filter(d => d.priority === 'high');
  const mediumPriority = availableDepartments.filter(d => d.priority === 'medium');
  const lowPriority = availableDepartments.filter(d => d.priority === 'low');

  // Function to handle module activation/deactivation
  const handleToggleModule = async (featureId: string | null) => {
    if (!featureId || !currentTenant?.id) return;
    
    // If trying to activate a module that's not currently active
    if (!featureStates[featureId]) {
      setSelectedModule(featureId);
      setShowSubscriptionDialog(true);
      return;
    }
    
    // If deactivating a module
    setIsUpdating(featureId);
    
    const updatedFeatures = {
      ...featureStates,
      [featureId]: false
    };
    
    try {
      const success = await updateTenantFeatureSettings(
        currentTenant.id,
        updatedFeatures
      );
      
      if (success) {
        setFeatureStates(updatedFeatures);
        toast({
          title: "Module Deactivated",
          description: `${getFeatureDefinition(featureId)?.name} has been deactivated.`,
        });
      } else {
        throw new Error("Failed to update module status");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update module status. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUpdating(null);
    }
  };

  // Function to handle subscription confirmation
  const handleConfirmSubscription = async () => {
    if (!selectedModule || !currentTenant?.id) return;
    
    setIsUpdating(selectedModule);
    
    const updatedFeatures = {
      ...featureStates,
      [selectedModule]: true
    };
    
    try {
      const success = await updateTenantFeatureSettings(
        currentTenant.id,
        updatedFeatures
      );
      
      if (success) {
        setFeatureStates(updatedFeatures);
        toast({
          title: "Module Activated",
          description: `${getFeatureDefinition(selectedModule)?.name} has been activated. You will be billed accordingly.`,
        });
      } else {
        throw new Error("Failed to activate module");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to activate module. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUpdating(null);
      setShowSubscriptionDialog(false);
      setSelectedModule(null);
    }
  };

  const renderDepartmentCard = (dept: any) => {
    const isAvailable = dept.feature ? getAvailableFeatures().some(f => f.id === dept.feature) : true;
    const isEnabled = !dept.feature || featureStates[dept.feature];
    
    if (!isAvailable) return null;
    
    const cardContent = (
      <Card className={`group h-full transition-all duration-300 border-0 shadow-brown hover:shadow-brown-lg ${isEnabled ? 'hover:scale-105' : 'opacity-75'}`}>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between mb-4">
            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-r ${dept.color} flex items-center justify-center shadow-brown transition-transform duration-300 ${isEnabled ? 'group-hover:scale-110' : ''}`}>
              <dept.icon className="h-7 w-7 text-white" />
            </div>
            <div className="flex flex-col items-end gap-2">
              {dept.alerts > 0 && isEnabled && (
                <Badge variant="destructive" className="text-xs px-2 py-1">
                  {dept.alerts}
                </Badge>
              )}
              {!isEnabled && dept.feature && (
                <Badge variant="outline" className="text-xs bg-muted">
                  <Lock className="h-3 w-3 mr-1" />
                  Inactive
                </Badge>
              )}
            </div>
          </div>
          <CardTitle className="text-xl mb-2 text-brown-900">{dept.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-brown-600 mb-4 line-clamp-2">{dept.description}</p>
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Zap className="h-3 w-3 text-brown-500" />
                <span className="text-xs text-brown-500 capitalize">{dept.priority} Priority</span>
              </div>
              {dept.targetClients && dept.targetClients[0] !== "All" && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className="text-xs text-brown-500 cursor-help">For: {dept.targetClients.length > 1 ? `${dept.targetClients[0]}+` : dept.targetClients[0]}</span>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-xs">Recommended for: {dept.targetClients.join(", ")}</p>
                  </TooltipContent>
                </Tooltip>
              )}
            </div>
            
            <div className="flex items-center justify-between pt-2 border-t border-gray-100">
              {dept.feature ? (
                <div 
                  className="flex items-center gap-2 cursor-pointer"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleToggleModule(dept.feature);
                  }}
                >
                  <span className="text-xs text-brown-600">
                    {isUpdating === dept.feature ? 'Updating...' : isEnabled ? 'Active' : 'Inactive'}
                  </span>
                  <Switch 
                    checked={isEnabled} 
                    className="data-[state=checked]:bg-green-500"
                    disabled={isUpdating === dept.feature}
                  />
                </div>
              ) : (
                <span className="text-xs text-green-600 font-medium">Core Feature</span>
              )}
              
              <ArrowRight className={`h-4 w-4 text-brown-400 transition-transform duration-200 ${isEnabled ? 'group-hover:translate-x-1' : ''}`} />
            </div>
          </div>
        </CardContent>
      </Card>
    );
    
    if (!isEnabled) {
      return (
        <div key={dept.title} className="cursor-pointer" onClick={(e) => e.stopPropagation()}>
          {cardContent}
        </div>
      );
    }
    
    return (
      <Link key={dept.title} to={dept.link} className="group">
        {cardContent}
      </Link>
    );
  };

  return (
    <>
      <div className="space-y-8">
        {/* High Priority Modules */}
        {highPriority.length > 0 && (
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-2 h-8 bg-brown-gradient rounded-full"></div>
              <div>
                <h3 className="text-xl font-bold text-brown-900">Essential Modules</h3>
                <p className="text-brown-600 text-sm">Your most frequently used features</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {highPriority.map(renderDepartmentCard)}
            </div>
          </div>
        )}

        {/* Medium Priority Modules */}
        {mediumPriority.length > 0 && (
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-2 h-8 bg-gradient-to-b from-brown-300 to-brown-400 rounded-full"></div>
              <div>
                <h3 className="text-xl font-bold text-brown-900">Operations Modules</h3>
                <p className="text-brown-600 text-sm">Day-to-day operational features</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {mediumPriority.map(renderDepartmentCard)}
            </div>
          </div>
        )}

        {/* Low Priority Modules */}
        {lowPriority.length > 0 && (
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-2 h-8 bg-gradient-to-b from-brown-200 to-brown-300 rounded-full"></div>
              <div>
                <h3 className="text-xl font-bold text-brown-900">Additional Features</h3>
                <p className="text-brown-600 text-sm">Extended functionality and tools</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {lowPriority.map(renderDepartmentCard)}
            </div>
          </div>
        )}
      </div>

      {/* Subscription Confirmation Dialog */}
      <Dialog open={showSubscriptionDialog} onOpenChange={setShowSubscriptionDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Activate Module Subscription</DialogTitle>
            <DialogDescription>
              {selectedModule && (
                <div className="py-4">
                  <p>You are about to activate the <strong>{getFeatureDefinition(selectedModule)?.name}</strong> module.</p>
                  <div className="flex items-center gap-2 mt-4 p-3 bg-amber-50 text-amber-800 rounded-md">
                    <CreditCard className="h-5 w-5 flex-shrink-0" />
                    <p className="text-sm">
                      This will add the module to your active subscriptions and adjust your billing accordingly.
                    </p>
                  </div>
                </div>
              )}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => {
                setShowSubscriptionDialog(false);
                setSelectedModule(null);
              }}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleConfirmSubscription}
              disabled={isUpdating === selectedModule}
            >
              {isUpdating === selectedModule ? "Processing..." : "Confirm & Activate"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EnhancedDepartmentGrid;
