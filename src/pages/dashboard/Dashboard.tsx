
import TenantDashboard from "@/components/tenant/TenantDashboard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
  TrendingUp,
  AlertTriangle,
  Pill,
  UserCheck,
  Lock
} from "lucide-react";
import { Link } from "react-router-dom";
import { useTenantFeatures } from "@/hooks/useTenantFeatures";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

// Feature to Icon mapping
const featureIcons: Record<string, any> = {
  horses: Rabbit,
  laboratory: FlaskRound,
  clinic: Hospital,
  pharmacy: Pill,
  finance: DollarSign,
  hr: Users,
  inventory: Package,
  marketplace: Store,
  training: Dumbbell,
  rooms: Warehouse,
  maintenance: Wrench,
  messages: MessageSquare,
};

const Dashboard = () => {
  const { 
    isFeatureEnabled, 
    getFeatureDefinition,
    getAvailableFeatures 
  } = useTenantFeatures();

  // Define departments with their corresponding features
  const departments = [
    {
      title: "Horses Department",
      icon: Rabbit,
      description: "Manage horse records, health, and breeding information",
      link: "/dashboard/horses",
      color: "bg-blue-500",
      alerts: 3,
      feature: "horses"
    },
    {
      title: "Clients", 
      icon: UserCheck,
      description: "Client management and relationships",
      link: "/dashboard/clients",
      color: "bg-indigo-500", 
      alerts: 0,
      feature: null
    },
    {
      title: "Laboratory",
      icon: FlaskRound,
      description: "Lab tests, results, and medical analysis",
      link: "/dashboard/laboratory",
      color: "bg-green-500",
      alerts: 7,
      feature: "laboratory"
    },
    {
      title: "Clinic",
      icon: Hospital,
      description: "Veterinary care, appointments, and medical records",
      link: "/dashboard/clinic",
      color: "bg-red-500",
      alerts: 2,
      feature: "clinic"
    },
    {
      title: "Pharmacy",
      icon: Pill,
      description: "Veterinary pharmacy, prescriptions, and medication management",
      link: "/dashboard/pharmacy",
      color: "bg-teal-500",
      alerts: 8,
      feature: "pharmacy"
    },
    {
      title: "Finance",
      icon: DollarSign,
      description: "Financial management, invoicing, and accounting",
      link: "/dashboard/finance",
      color: "bg-yellow-500",
      alerts: 5,
      feature: "finance"
    },
    {
      title: "HR Department",
      icon: Users,
      description: "Employee management, payroll, and scheduling",
      link: "/dashboard/hr",
      color: "bg-purple-500",
      alerts: 0,
      feature: "hr"
    },
    {
      title: "Inventory",
      icon: Package,
      description: "Stock management, supplies, and equipment",
      link: "/dashboard/inventory",
      color: "bg-orange-500",
      alerts: 8,
      feature: "inventory"
    },
    {
      title: "Marketplace",
      icon: Store,
      description: "Stable store and marketplace integration",
      link: "/dashboard/marketplace",
      color: "bg-pink-500",
      alerts: 0,
      feature: "marketplace"
    },
    {
      title: "Horse Movements",
      icon: ArrowRightLeft,
      description: "Track arrivals, departures, and transfers",
      link: "/dashboard/movements",
      color: "bg-indigo-500",
      alerts: 4,
      feature: null
    },
    {
      title: "Training Center",
      icon: Dumbbell,
      description: "Training programs, schedules, and progress tracking",
      link: "/dashboard/training",
      color: "bg-teal-500",
      alerts: 0,
      feature: "training"
    },
    {
      title: "Stable Rooms",
      icon: Warehouse,
      description: "Room assignments, availability, and maintenance",
      link: "/dashboard/rooms",
      color: "bg-cyan-500",
      alerts: 2,
      feature: "rooms"
    },
    {
      title: "Maintenance",
      icon: Wrench,
      description: "Facility maintenance, repairs, and schedules",
      link: "/dashboard/maintenance",
      color: "bg-gray-500",
      alerts: 1,
      feature: "maintenance"
    },
    {
      title: "Messages",
      icon: MessageSquare,
      description: "Internal messaging and communications",
      link: "/dashboard/messages",
      color: "bg-emerald-500",
      alerts: 0,
      feature: "messages"
    }
  ];

  // Filter departments based on tenant features
  const availableDepartments = departments.filter(dept => 
    !dept.feature || isFeatureEnabled(dept.feature)
  );
  
  // Calculate alerts only for available departments
  const totalAlerts = availableDepartments.reduce((sum, dept) => sum + dept.alerts, 0);

  // Generate department cards with feature access control
  const renderDepartmentCard = (dept: any) => {
    // Determine if feature is available (by subscription) but not enabled
    const isAvailable = dept.feature ? getAvailableFeatures().some(f => f.id === dept.feature) : true;
    const isEnabled = !dept.feature || isFeatureEnabled(dept.feature);
    
    if (!isAvailable) {
      // Don't show unavailable features at all
      return null;
    }
    
    const cardContent = (
      <Card className={`h-full transition-all duration-200 ${isEnabled ? 'hover:shadow-lg hover:scale-105' : 'opacity-60'}`}>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between mb-3">
            <div className={`w-12 h-12 rounded-lg ${dept.color} flex items-center justify-center ${isEnabled ? 'group-hover:scale-110 transition-transform duration-200' : ''}`}>
              <dept.icon className="h-6 w-6 text-white" />
            </div>
            {dept.alerts > 0 && isEnabled && (
              <Badge variant="destructive" className="text-xs">
                {dept.alerts}
              </Badge>
            )}
            {!isEnabled && (
              <Badge variant="outline" className="text-xs bg-muted">
                Disabled
              </Badge>
            )}
          </div>
          <CardTitle className="text-lg">{dept.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">{dept.description}</p>
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
      {/* Tenant Dashboard */}
      <TenantDashboard />

      {/* Modules Section */}
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold">Available Modules</h2>
            <p className="text-muted-foreground">Access your enabled modules for comprehensive management</p>
          </div>
          <div className="flex gap-2">
            {totalAlerts > 0 && (
              <Button variant="destructive" className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                {totalAlerts} Alerts
              </Button>
            )}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-green-500" />
                <div>
                  <p className="text-sm text-muted-foreground">Available Modules</p>
                  <p className="text-2xl font-bold">{availableDepartments.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-red-500" />
                <div>
                  <p className="text-sm text-muted-foreground">Active Alerts</p>
                  <p className="text-2xl font-bold">{totalAlerts}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Rabbit className="h-5 w-5 text-blue-500" />
                <div>
                  <p className="text-sm text-muted-foreground">Active Horses</p>
                  <p className="text-2xl font-bold">47</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Warehouse className="h-5 w-5 text-purple-500" />
                <div>
                  <p className="text-sm text-muted-foreground">Occupied Rooms</p>
                  <p className="text-2xl font-bold">32/45</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Department Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {departments.map(renderDepartmentCard)}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
