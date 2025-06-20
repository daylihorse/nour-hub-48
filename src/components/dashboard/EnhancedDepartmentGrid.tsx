
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Lock } from "lucide-react";
import { Link } from "react-router-dom";
import { useTenantFeatures } from "@/hooks/useTenantFeatures";

interface DepartmentModule {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  route: string;
  feature?: string;
  comingSoon?: boolean;
}

const departmentModules: DepartmentModule[] = [
  {
    id: "horses",
    title: "Horse Management",
    description: "Comprehensive horse breeding, health, and registration system",
    icon: "🐎",
    route: "/horses",
    feature: "horses"
  },
  {
    id: "clients",
    title: "Client Management", 
    description: "Manage client relationships, communications, and services",
    icon: "👥",
    route: "/clients"
  },
  {
    id: "laboratory",
    title: "Laboratory",
    description: "Sample testing, analysis, and quality control management",
    icon: "🧪",
    route: "/laboratory",
    feature: "laboratory"
  },
  {
    id: "clinic",
    title: "Veterinary Clinic",
    description: "Medical records, treatments, and health monitoring",
    icon: "🏥",
    route: "/clinic", 
    feature: "clinic"
  },
  {
    id: "pharmacy",
    title: "Pharmacy",
    description: "Medication management, prescriptions, and inventory",
    icon: "💊",
    route: "/pharmacy",
    feature: "pharmacy"
  },
  {
    id: "finance",
    title: "Finance Management",
    description: "Accounting, invoicing, and financial reporting",
    icon: "💰",
    route: "/finance",
    feature: "finance"
  },
  {
    id: "hr",
    title: "Human Resources",
    description: "Staff management, scheduling, and payroll",
    icon: "👨‍💼",
    route: "/hr",
    feature: "hr"
  },
  {
    id: "inventory",
    title: "Inventory Management",
    description: "Stock control, supplies, and equipment tracking",
    icon: "📦",
    route: "/inventory",
    feature: "inventory"
  },
  {
    id: "marketplace",
    title: "Marketplace",
    description: "Buy and sell horses, equipment, and services",
    icon: "🛒",
    route: "/marketplace",
    feature: "marketplace"
  },
  {
    id: "movements",
    title: "Movement Tracking",
    description: "Track horse movements, transportation, and logistics",
    icon: "🚛",
    route: "/movements"
  },
  {
    id: "training",
    title: "Training Programs",
    description: "Training schedules, progress tracking, and certification",
    icon: "🎯",
    route: "/training",
    feature: "training"
  },
  {
    id: "riding-reservations",
    title: "Riding Reservations",
    description: "Booking system for riding lessons and facility usage",
    icon: "🏇",
    route: "/riding-reservations",
    feature: "riding-reservations"
  },
  {
    id: "stable-rooms",
    title: "Stable & Rooms",
    description: "Facility management and room assignments",
    icon: "🏠",
    route: "/stable-rooms",
    feature: "stable-rooms"
  },
  {
    id: "maintenance",
    title: "Maintenance",
    description: "Facility maintenance, repairs, and upkeep tracking",
    icon: "🔧",
    route: "/maintenance",
    feature: "maintenance"
  },
  {
    id: "messages",
    title: "Messaging Center",
    description: "Internal communications and notification system",
    icon: "💬",
    route: "/messages",
    feature: "messages"
  }
];

const EnhancedDepartmentGrid: React.FC = () => {
  const { isFeatureEnabled } = useTenantFeatures();

  const getModuleStatus = (module: DepartmentModule) => {
    if (module.comingSoon) return "coming-soon";
    if (module.feature && !isFeatureEnabled(module.feature)) return "locked";
    return "available";
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "coming-soon":
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">Coming Soon</Badge>;
      case "locked":
        return <Badge variant="outline" className="bg-gray-50 text-gray-600 border-gray-200">Premium</Badge>;
      default:
        return <Badge className="bg-green-100 text-green-700 border-green-200">Active</Badge>;
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {departmentModules.map((module) => {
        const status = getModuleStatus(module);
        const isDisabled = status === "locked" || status === "coming-soon";

        return (
          <Card key={module.id} className={`relative overflow-hidden transition-all duration-200 hover:shadow-lg ${isDisabled ? 'opacity-60' : 'hover:scale-105'}`}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="text-3xl">{module.icon}</div>
                {getStatusBadge(status)}
              </div>
              <CardTitle className="text-lg font-semibold">{module.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                {module.description}
              </p>
              
              {isDisabled ? (
                <Button disabled className="w-full">
                  {status === "locked" ? (
                    <>
                      <Lock className="h-4 w-4 mr-2" />
                      Upgrade Required
                    </>
                  ) : (
                    "Coming Soon"
                  )}
                </Button>
              ) : (
                <Button asChild className="w-full group">
                  <Link to={module.route}>
                    Access Module
                    <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default EnhancedDepartmentGrid;
