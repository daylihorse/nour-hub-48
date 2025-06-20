
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Horse, 
  Stethoscope, 
  Calculator, 
  Package, 
  Users, 
  Calendar,
  Dumbbell,
  BarChart3,
  ChevronRight,
  ExternalLink
} from "lucide-react";
import { Link } from "react-router-dom";

export const createDashboardModuleTabs = () => [
  {
    id: "all",
    label: "All Modules",
    content: (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <ModuleCard
          title="Horse Management"
          description="Comprehensive horse profiles, health records, and breeding management"
          icon={Horse}
          status="active"
          route="/dashboard/horses"
          stats={{ total: 143, active: 138 }}
        />
        <ModuleCard
          title="Veterinary Clinic"
          description="Medical records, treatments, and health monitoring"
          icon={Stethoscope}
          status="active"
          route="/dashboard/clinic"
          stats={{ appointments: 24, treatments: 12 }}
        />
        <ModuleCard
          title="Financial Management"
          description="Invoicing, payments, expenses, and financial reporting"
          icon={Calculator}
          status="active"
          route="/dashboard/finance"
          stats={{ revenue: "$45,200", pending: 8 }}
        />
        <ModuleCard
          title="Inventory Management"
          description="Stock tracking, purchase orders, and supplier management"
          icon={Package}
          status="active"
          route="/dashboard/inventory"
          stats={{ items: 234, lowStock: 12 }}
        />
        <ModuleCard
          title="Client Management"
          description="Client profiles, communications, and relationship management"
          icon={Users}
          status="active"
          route="/dashboard/clients"
          stats={{ clients: 89, active: 76 }}
        />
        <ModuleCard
          title="Training Center"
          description="Training programs, instructor management, and performance tracking"
          icon={Dumbbell}
          status="active"
          route="/dashboard/training"
          stats={{ programs: 15, sessions: 89 }}
        />
        <ModuleCard
          title="Analytics & Reports"
          description="Advanced analytics, business intelligence, and custom reports"
          icon={BarChart3}
          status="new"
          route="/dashboard/analytics"
          stats={{ reports: 12, insights: 5 }}
        />
        <ModuleCard
          title="Scheduling"
          description="Appointment scheduling and calendar management"
          icon={Calendar}
          status="coming-soon"
          route="/dashboard/scheduling"
          stats={{ upcoming: 18, today: 6 }}
        />
      </div>
    )
  },
  {
    id: "active",
    label: "Active Modules",
    content: (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ModuleCard
          title="Horse Management"
          description="Comprehensive horse profiles and health records"
          icon={Horse}
          status="active"
          route="/dashboard/horses"
          stats={{ total: 143, active: 138 }}
        />
        <ModuleCard
          title="Veterinary Clinic"
          description="Medical records and treatments"
          icon={Stethoscope}
          status="active"
          route="/dashboard/clinic"
          stats={{ appointments: 24, treatments: 12 }}
        />
        <ModuleCard
          title="Financial Management"
          description="Invoicing and financial reporting"
          icon={Calculator}
          status="active"
          route="/dashboard/finance"
          stats={{ revenue: "$45,200", pending: 8 }}
        />
        <ModuleCard
          title="Training Center"
          description="Training programs and performance tracking"
          icon={Dumbbell}
          status="active"
          route="/dashboard/training"
          stats={{ programs: 15, sessions: 89 }}
        />
        <ModuleCard
          title="Analytics & Reports"
          description="Advanced analytics and business intelligence"
          icon={BarChart3}
          status="new"
          route="/dashboard/analytics"
          stats={{ reports: 12, insights: 5 }}
        />
      </div>
    )
  },
  {
    id: "new",
    label: "New Features",
    content: (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ModuleCard
          title="Analytics & Reports"
          description="Advanced analytics, business intelligence, and custom reporting with AI-powered insights"
          icon={BarChart3}
          status="new"
          route="/dashboard/analytics"
          stats={{ reports: 12, insights: 5 }}
          highlight={true}
        />
      </div>
    )
  }
];

interface ModuleCardProps {
  title: string;
  description: string;
  icon: any;
  status: "active" | "coming-soon" | "new";
  route: string;
  stats?: Record<string, any>;
  highlight?: boolean;
}

const ModuleCard = ({ title, description, icon: Icon, status, route, stats, highlight }: ModuleCardProps) => {
  const getStatusBadge = () => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800">Active</Badge>;
      case "new":
        return <Badge className="bg-blue-100 text-blue-800">New</Badge>;
      case "coming-soon":
        return <Badge variant="outline">Coming Soon</Badge>;
    }
  };

  const CardWrapper = status === "coming-soon" ? "div" : Link;
  const cardProps = status === "coming-soon" ? {} : { to: route };

  return (
    <Card className={`hover:shadow-lg transition-shadow cursor-pointer ${highlight ? 'ring-2 ring-blue-500 bg-blue-50' : ''}`}>
      <CardWrapper {...cardProps}>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <Icon className={`h-8 w-8 ${highlight ? 'text-blue-600' : 'text-primary'}`} />
            {getStatusBadge()}
          </div>
          <CardTitle className="text-lg">{title}</CardTitle>
          <p className="text-sm text-muted-foreground">{description}</p>
        </CardHeader>
        <CardContent className="space-y-4">
          {stats && (
            <div className="grid grid-cols-2 gap-2 text-sm">
              {Object.entries(stats).map(([key, value]) => (
                <div key={key} className="text-center">
                  <div className="font-semibold">{value}</div>
                  <div className="text-muted-foreground capitalize">{key}</div>
                </div>
              ))}
            </div>
          )}
          
          {status !== "coming-soon" && (
            <Button variant="outline" size="sm" className="w-full" asChild>
              <Link to={route}>
                Open Module
                {status === "new" ? <ExternalLink className="h-4 w-4 ml-2" /> : <ChevronRight className="h-4 w-4 ml-2" />}
              </Link>
            </Button>
          )}
          
          {status === "coming-soon" && (
            <Button variant="outline" size="sm" className="w-full" disabled>
              Coming Soon
            </Button>
          )}
        </CardContent>
      </CardWrapper>
    </Card>
  );
};
