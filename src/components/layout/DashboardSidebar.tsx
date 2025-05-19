
import { useLocation } from "react-router-dom";
import { NavLink } from "react-router-dom";
import {
  // Replace Horse with appropriate icons
  Rabbit, // Using Rabbit as a substitute for Horse
  FlaskRound,
  Hospital,
  DollarSign,
  Users,
  Package,
  ArrowRight,
  ArrowLeft,
  Dumbbell,
  Warehouse,
  Wrench,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";

const departments = [
  { title: "Horses Department", path: "/dashboard/horses", icon: Rabbit }, // Changed from Horse to Rabbit
  { title: "Laboratory", path: "/dashboard/laboratory", icon: FlaskRound },
  { title: "Clinic", path: "/dashboard/clinic", icon: Hospital },
  { title: "Finance", path: "/dashboard/finance", icon: DollarSign },
  { title: "HR Department", path: "/dashboard/hr", icon: Users },
  { title: "Inventory", path: "/dashboard/inventory", icon: Package },
  { 
    title: "Arrivals & Departures", 
    path: "/dashboard/movements", 
    icon: (props) => (
      <div className="flex" {...props}>
        <ArrowRight className="h-4 w-4 mr-1" />
        <ArrowLeft className="h-4 w-4" />
      </div>
    )
  },
  { title: "Training Center", path: "/dashboard/training", icon: Dumbbell },
  { title: "Stable Rooms", path: "/dashboard/rooms", icon: Warehouse },
  { title: "Maintenance", path: "/dashboard/maintenance", icon: Wrench },
];

const DashboardSidebar = () => {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => currentPath.startsWith(path);
  const isExpanded = departments.some((d) => isActive(d.path));

  const getNavClass = ({ isActive }: { isActive: boolean }) =>
    isActive 
      ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium" 
      : "hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground";

  return (
    <Sidebar 
      variant="sidebar" 
      collapsible="icon"
      className={state === "expanded" ? "w-64" : "w-[3rem]"}
    >
      <SidebarHeader className="py-4">
        <div className="flex items-center justify-between px-4">
          {state === "expanded" && (
            <h1 className="text-xl font-bold">Equus Manager</h1>
          )}
          <SidebarTrigger className="ml-auto" />
        </div>
      </SidebarHeader>

      <SidebarContent>
        {/* Fixed: Removed defaultOpen and added open prop instead */}
        <SidebarGroup open={isExpanded}>
          <SidebarGroupLabel>Departments</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {departments.map((dept) => (
                <SidebarMenuItem key={dept.path}>
                  <SidebarMenuButton 
                    asChild 
                    tooltip={state === "collapsed" ? dept.title : undefined}
                  >
                    <NavLink to={dept.path} className={getNavClass} end>
                      <dept.icon className="h-5 w-5" />
                      {state === "expanded" && <span>{dept.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default DashboardSidebar;
