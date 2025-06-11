
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
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
  Zap
} from "lucide-react";
import { Link } from "react-router-dom";
import { useTenantFeatures } from "@/hooks/useTenantFeatures";

const EnhancedDepartmentGrid = () => {
  const { 
    isFeatureEnabled, 
    getFeatureDefinition,
    getAvailableFeatures 
  } = useTenantFeatures();

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
      priority: "high"
    },
    {
      title: "Clients", 
      icon: UserCheck,
      description: "Client management and relationships",
      link: "/dashboard/clients",
      color: "from-indigo-500 to-indigo-600",
      iconBg: "bg-indigo-500", 
      alerts: 0,
      feature: null,
      priority: "high"
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
      priority: "medium"
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
      priority: "high"
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
      priority: "medium"
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
      priority: "high"
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
      priority: "medium"
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
      priority: "medium"
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
      priority: "low"
    },
    {
      title: "Horse Movements",
      icon: ArrowRightLeft,
      description: "Track arrivals, departures, and transfers",
      link: "/dashboard/movements",
      color: "from-indigo-500 to-indigo-600",
      iconBg: "bg-indigo-500",
      alerts: 4,
      feature: null,
      priority: "medium"
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
      priority: "low"
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
      priority: "high"
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
      priority: "medium"
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
      priority: "low"
    }
  ];

  // Filter departments based on tenant features
  const availableDepartments = departments.filter(dept => 
    !dept.feature || isFeatureEnabled(dept.feature)
  );

  // Group by priority
  const highPriority = availableDepartments.filter(d => d.priority === 'high');
  const mediumPriority = availableDepartments.filter(d => d.priority === 'medium');
  const lowPriority = availableDepartments.filter(d => d.priority === 'low');

  const renderDepartmentCard = (dept: any) => {
    const isAvailable = dept.feature ? getAvailableFeatures().some(f => f.id === dept.feature) : true;
    const isEnabled = !dept.feature || isFeatureEnabled(dept.feature);
    
    if (!isAvailable) return null;
    
    const cardContent = (
      <Card className={`group h-full transition-all duration-300 border-0 shadow-brown hover:shadow-brown-lg ${isEnabled ? 'hover:scale-105' : 'opacity-60'}`}>
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
              {!isEnabled && (
                <Badge variant="outline" className="text-xs bg-muted">
                  <Lock className="h-3 w-3 mr-1" />
                  Disabled
                </Badge>
              )}
            </div>
          </div>
          <CardTitle className="text-xl mb-2 text-brown-900">{dept.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-brown-600 mb-4 line-clamp-2">{dept.description}</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Zap className="h-3 w-3 text-brown-500" />
              <span className="text-xs text-brown-500 capitalize">{dept.priority} Priority</span>
            </div>
            <ArrowRight className={`h-4 w-4 text-brown-400 transition-transform duration-200 ${isEnabled ? 'group-hover:translate-x-1' : ''}`} />
          </div>
        </CardContent>
      </Card>
    );
    
    if (!isEnabled) {
      return (
        <Tooltip key={dept.title}>
          <TooltipTrigger asChild>
            <div className="cursor-not-allowed">
              {cardContent}
            </div>
          </TooltipTrigger>
          <TooltipContent side="top">
            <div className="flex items-center gap-2 p-1">
              <Lock className="h-4 w-4" />
              <span>This feature is disabled in your tenant settings</span>
            </div>
          </TooltipContent>
        </Tooltip>
      );
    }
    
    return (
      <Link key={dept.title} to={dept.link} className="group">
        {cardContent}
      </Link>
    );
  };

  return (
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
  );
};

export default EnhancedDepartmentGrid;
