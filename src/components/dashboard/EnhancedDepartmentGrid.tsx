import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  ArrowRight, 
  Lock, 
  Info, 
  Clock, 
  CheckCircle, 
  Star, 
  Sparkles, 
  Play, 
  Crown,
  Horse,
  Users,
  FlaskConical,
  Stethoscope,
  Pill,
  DollarSign,
  Package,
  UserCheck,
  ShoppingBag,
  TruckIcon,
  GraduationCap,
  Calendar,
  Building,
  Wrench,
  MessageSquare
} from "lucide-react";
import { useTenantFeatures } from "@/hooks/useTenantFeatures";
import ModuleDetailsDialog from "./ModuleDetailsDialog";

interface DepartmentModule {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  route: string;
  feature?: string;
  comingSoon?: boolean;
}

interface EnhancedDepartmentGridProps {
  modules: DepartmentModule[];
  isFeatureEnabled: (feature: string) => boolean;
  onAccessModule: (module: DepartmentModule) => void;
}

// Enhanced module status types
type ModuleStatus = 'active' | 'trial' | 'locked' | 'coming-soon' | 'premium-trial';

// Simulated user subscription and trial data
const moduleStatusData: Record<string, { status: ModuleStatus; trialDaysLeft?: number; plan?: string }> = {
  horses: { status: 'active', plan: 'premium' },
  clients: { status: 'active', plan: 'basic' },
  laboratory: { status: 'trial', trialDaysLeft: 14, plan: 'premium' },
  clinic: { status: 'premium-trial', trialDaysLeft: 30, plan: 'premium' },
  pharmacy: { status: 'locked' },
  finance: { status: 'trial', trialDaysLeft: 7, plan: 'basic' },
  inventory: { status: 'active', plan: 'basic' },
  hr: { status: 'locked' },
  marketplace: { status: 'coming-soon' },
  movements: { status: 'active', plan: 'basic' },
  training: { status: 'locked' },
  'riding-reservations': { status: 'coming-soon' },
  'stable-rooms': { status: 'trial', trialDaysLeft: 21, plan: 'premium' },
  maintenance: { status: 'locked' },
  messages: { status: 'active', plan: 'basic' }
};

// Department modules configuration
const departmentModules: DepartmentModule[] = [
  {
    id: "horses",
    title: "Horse Management",
    description: "Comprehensive horse registry, breeding records, and performance tracking for your equine operation.",
    icon: <Horse className="h-8 w-8" />,
    route: "/dashboard/horses",
    feature: "horses_module"
  },
  {
    id: "clients",
    title: "Client Management",
    description: "Manage client relationships, service history, and communication in one centralized system.",
    icon: <Users className="h-8 w-8" />,
    route: "/dashboard/clients",
    feature: "clients_module"
  },
  {
    id: "laboratory",
    title: "Laboratory",
    description: "Advanced laboratory management for sample processing, quality control, and result analysis.",
    icon: <FlaskConical className="h-8 w-8" />,
    route: "/dashboard/laboratory",
    feature: "laboratory_module"
  },
  {
    id: "clinic",
    title: "Veterinary Clinic",
    description: "Complete veterinary practice management with medical records and appointment scheduling.",
    icon: <Stethoscope className="h-8 w-8" />,
    route: "/dashboard/clinic",
    feature: "clinic_module"
  },
  {
    id: "pharmacy",
    title: "Pharmacy",
    description: "Manage medications, prescriptions, and pharmaceutical inventory with compliance tracking.",
    icon: <Pill className="h-8 w-8" />,
    route: "/dashboard/pharmacy",
    feature: "pharmacy_module"
  },
  {
    id: "finance",
    title: "Finance & Accounting",
    description: "Complete financial management including invoicing, accounting, and financial reporting.",
    icon: <DollarSign className="h-8 w-8" />,
    route: "/dashboard/finance",
    feature: "finance_module"
  },
  {
    id: "inventory",
    title: "Inventory Management",
    description: "Smart inventory tracking for feed, equipment, medications, and supplies with automated reordering.",
    icon: <Package className="h-8 w-8" />,
    route: "/dashboard/inventory",
    feature: "inventory_module"
  },
  {
    id: "hr",
    title: "Human Resources",
    description: "Employee management, payroll processing, and HR administration for your organization.",
    icon: <UserCheck className="h-8 w-8" />,
    route: "/dashboard/hr",
    feature: "hr_module"
  },
  {
    id: "marketplace",
    title: "Marketplace",
    description: "Online marketplace for buying and selling horses, equipment, and services.",
    icon: <ShoppingBag className="h-8 w-8" />,
    route: "/dashboard/marketplace",
    comingSoon: true
  },
  {
    id: "movements",
    title: "Horse Movements",
    description: "Track horse transportation, location changes, and movement history across facilities.",
    icon: <TruckIcon className="h-8 w-8" />,
    route: "/dashboard/movements",
    feature: "movements_module"
  },
  {
    id: "training",
    title: "Training Academy",
    description: "Comprehensive training program management for horses and riders with progress tracking.",
    icon: <GraduationCap className="h-8 w-8" />,
    route: "/dashboard/training",
    feature: "training_module"
  },
  {
    id: "riding-reservations",
    title: "Riding Reservations",
    description: "Manage riding lesson bookings, facility reservations, and scheduling for instructors.",
    icon: <Calendar className="h-8 w-8" />,
    route: "/dashboard/riding-reservations",
    comingSoon: true
  },
  {
    id: "stable-rooms",
    title: "Stable & Housing",
    description: "Manage stable assignments, housing arrangements, and facility maintenance schedules.",
    icon: <Building className="h-8 w-8" />,
    route: "/dashboard/stable-rooms",
    feature: "stable_rooms_module"
  },
  {
    id: "maintenance",
    title: "Maintenance",
    description: "Facility maintenance scheduling, work orders, and equipment maintenance tracking.",
    icon: <Wrench className="h-8 w-8" />,
    route: "/dashboard/maintenance",
    feature: "maintenance_module"
  },
  {
    id: "messages",
    title: "Communication",
    description: "Internal messaging system for team communication and client correspondence.",
    icon: <MessageSquare className="h-8 w-8" />,
    route: "/dashboard/messages",
    feature: "messages_module"
  }
];

const getStatusBadge = (status: ModuleStatus, trialDaysLeft?: number) => {
  switch (status) {
    case 'active':
      return (
        <Badge className="bg-green-100 text-green-700 border-green-300">
          <CheckCircle className="h-3 w-3 mr-1" />
          Active
        </Badge>
      );
    case 'trial':
      return (
        <Badge className="bg-blue-100 text-blue-700 border-blue-300">
          <Clock className="h-3 w-3 mr-1" />
          Trial ({trialDaysLeft} days)
        </Badge>
      );
    case 'premium-trial':
      return (
        <Badge className="bg-purple-100 text-purple-700 border-purple-300">
          <Crown className="h-3 w-3 mr-1" />
          Premium Trial ({trialDaysLeft} days)
        </Badge>
      );
    case 'locked':
      return (
        <Badge variant="secondary" className="bg-gray-100 text-gray-600 border-gray-300">
          <Lock className="h-3 w-3 mr-1" />
          Upgrade Required
        </Badge>
      );
    case 'coming-soon':
      return (
        <Badge className="bg-orange-100 text-orange-700 border-orange-300">
          <Sparkles className="h-3 w-3 mr-1" />
          Coming Soon
        </Badge>
      );
    default:
      return null;
  }
};

const getCardStyles = (status: ModuleStatus) => {
  switch (status) {
    case 'active':
      return "border-green-200 bg-green-50/30 hover:shadow-lg hover:border-green-300";
    case 'trial':
    case 'premium-trial':
      return "border-blue-200 bg-blue-50/30 hover:shadow-lg hover:border-blue-300";
    case 'locked':
      return "border-gray-200 bg-gray-50/30 hover:shadow-md opacity-75";
    case 'coming-soon':
      return "border-orange-200 bg-orange-50/30 hover:shadow-md opacity-85";
    default:
      return "border-gray-200 hover:shadow-lg";
  }
};

const getActionButton = (
  module: DepartmentModule, 
  status: ModuleStatus, 
  trialDaysLeft?: number, 
  onLearnMore?: () => void
) => {
  switch (status) {
    case 'active':
      return (
        <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
          <ArrowRight className="h-4 w-4 mr-2" />
          Access Module
        </Button>
      );
    case 'trial':
      return (
        <div className="space-y-2">
          <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
            <ArrowRight className="h-4 w-4 mr-2" />
            Continue Trial
          </Button>
          <Button variant="outline" onClick={onLearnMore} className="w-full text-xs">
            Upgrade Options
          </Button>
        </div>
      );
    case 'premium-trial':
      return (
        <div className="space-y-2">
          <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white">
            <Crown className="h-4 w-4 mr-2" />
            Access Premium
          </Button>
          <p className="text-xs text-center text-purple-600">
            {trialDaysLeft} days remaining
          </p>
        </div>
      );
    case 'locked':
      return (
        <div className="space-y-2">
          <Button 
            variant="outline" 
            onClick={onLearnMore}
            className="w-full border-blue-200 text-blue-700 hover:bg-blue-50"
          >
            <Play className="h-4 w-4 mr-2" />
            Start Free Trial
          </Button>
          <Button 
            variant="outline" 
            onClick={onLearnMore}
            className="w-full text-xs border-purple-200 text-purple-700 hover:bg-purple-50"
          >
            View Pricing
          </Button>
        </div>
      );
    case 'coming-soon':
      return (
        <Button 
          variant="outline" 
          onClick={onLearnMore}
          className="w-full border-orange-200 text-orange-700 hover:bg-orange-50"
        >
          <Sparkles className="h-4 w-4 mr-2" />
          Get Notified
        </Button>
      );
    default:
      return (
        <Button variant="outline" onClick={onLearnMore} className="w-full">
          Learn More
        </Button>
      );
  }
};

const EnhancedDepartmentGrid: React.FC = () => {
  const { isFeatureEnabled } = useTenantFeatures();
  const [selectedModule, setSelectedModule] = useState<DepartmentModule | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const getModuleStatus = (module: DepartmentModule): ModuleStatus => {
    // Check if module has enhanced status data
    const statusData = moduleStatusData[module.id];
    if (statusData) {
      return statusData.status;
    }
    
    // Fallback to original logic
    if (module.comingSoon) return "coming-soon";
    if (module.feature && !isFeatureEnabled(module.feature)) return "locked";
    return "active";
  };

  const handleModuleClick = (module: DepartmentModule) => {
    setSelectedModule(module);
    setIsDialogOpen(true);
  };

  const handleAccessModule = (module: DepartmentModule) => {
    // This would navigate to the actual module or show upgrade dialog
    console.log(`Accessing module: ${module.title}`);
    setIsDialogOpen(false);
    // You can implement actual navigation here if needed
    // window.location.href = module.route;
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedModule(null);
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {departmentModules.map((module) => {
          const status = getModuleStatus(module);
          const isDisabled = status === "locked" || status === "coming-soon";

          return (
            <Card 
              key={module.id} 
              className={`relative overflow-hidden transition-all duration-200 ${getCardStyles(status)} ${
                isDisabled ? '' : 'hover:scale-105 cursor-pointer'
              }`}
              onClick={() => handleModuleClick(module)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="text-3xl">{module.icon}</div>
                  {getStatusBadge(status, moduleStatusData[module.id]?.trialDaysLeft)}
                </div>
                <CardTitle className="text-lg font-semibold">{module.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {module.description}
                </p>
                
                {getActionButton(module, status, moduleStatusData[module.id]?.trialDaysLeft, () => handleModuleClick(module))}
              </CardContent>
            </Card>
          );
        })}
      </div>

      <ModuleDetailsDialog
        module={selectedModule}
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        onAccessModule={handleAccessModule}
        isFeatureEnabled={isFeatureEnabled}
      />
    </>
  );
};

export default EnhancedDepartmentGrid;
