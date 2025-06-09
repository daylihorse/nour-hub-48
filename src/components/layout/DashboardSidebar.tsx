
import { useLocation } from "react-router-dom";
import { NavLink } from "react-router-dom";
import {
  House,
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
  User,
  MessageSquare,
  Store,
  Home,
  Settings,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";

// Explicit type definitions for icons
type IconComponent = React.ComponentType<{ className?: string }>;
type CustomIconRenderer = (props: { className?: string }) => React.ReactNode;

// Department structure
interface Department {
  title: string;
  path: string;
  icon: IconComponent | CustomIconRenderer;
}

const departments: Department[] = [
  { title: "Home", path: "/dashboard", icon: Home },
  { title: "Unified Operations", path: "/dashboard/operations", icon: Settings },
  { title: "Horses Department", path: "/dashboard/horses", icon: House },
  { title: "Laboratory", path: "/dashboard/laboratory", icon: FlaskRound },
  { title: "Clinic", path: "/dashboard/clinic", icon: Hospital },
  { title: "Finance", path: "/dashboard/finance", icon: DollarSign },
  { title: "Clients", path: "/dashboard/clients", icon: Users },
  { title: "Messages", path: "/dashboard/messages", icon: MessageSquare },
  { title: "HR Department", path: "/dashboard/hr", icon: Users },
  { title: "Inventory", path: "/dashboard/inventory", icon: Package },
  { title: "Marketplace", path: "/dashboard/marketplace", icon: Store },
  { 
    title: "Arrivals & Departures", 
    path: "/dashboard/movements", 
    icon: (props) => (
      <div className="flex" {...props}>
        <ArrowRight className="h-6 w-6 mr-1" />
        <ArrowLeft className="h-6 w-6" />
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

  return (
    <Sidebar 
      variant="sidebar" 
      collapsible="icon"
      className={state === "expanded" ? "w-64 shadow-md" : "w-[4rem] shadow-md"}
    >
      <SidebarHeader className="py-6 border-b border-sidebar-border">
        <div className="flex items-center justify-between px-4">
          {state === "expanded" && (
            <h1 className="text-xl font-bold">Equus Manager</h1>
          )}
          <SidebarTrigger className="ml-auto" />
        </div>
      </SidebarHeader>

      <SidebarContent className="py-2">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {departments.map((dept) => {
                const active = isActive(dept.path);
                
                // Properly handle both icon types with explicit type checks
                const renderIcon = () => {
                  if (typeof dept.icon === 'function') {
                    // Check if it's our custom renderer function by looking for React Component properties
                    if (!('$$typeof' in dept.icon)) {
                      // It's our custom renderer function
                      return (dept.icon as CustomIconRenderer)({ className: "h-6 w-6" });
                    } else {
                      // It's a React component
                      const IconComp = dept.icon as IconComponent;
                      return <IconComp className="h-6 w-6" />;
                    }
                  } else {
                    // For non-function icons (should be React components)
                    const IconComp = dept.icon as IconComponent;
                    return <IconComp className="h-6 w-6" />;
                  }
                };
                
                return (
                  <SidebarMenuItem key={dept.path} className="px-3 py-1">
                    <SidebarMenuButton 
                      asChild 
                      tooltip={state === "collapsed" ? dept.title : undefined}
                      className="w-full"
                    >
                      <NavLink 
                        to={dept.path} 
                        className={({ isActive }) => `
                          flex items-center p-3 rounded-md font-medium transition-all duration-200
                          ${isActive 
                            ? 'bg-sidebar-accent text-sidebar-accent-foreground font-semibold' 
                            : 'hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground'
                          }
                        `}
                        end
                      >
                        <div className={`
                          flex-shrink-0 transition-transform duration-200 mr-3
                          ${active ? 'text-primary' : 'text-muted-foreground'}
                          hover:scale-110
                        `}>
                          {renderIcon()}
                        </div>
                        
                        {state === "expanded" && (
                          <span className="flex-grow truncate">
                            {dept.title}
                          </span>
                        )}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default DashboardSidebar;
