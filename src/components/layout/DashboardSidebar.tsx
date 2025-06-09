
import { NavLink, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
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
  BarChart3
} from "lucide-react";

const menuItems = [
  { 
    title: "Dashboard", 
    url: "/dashboard", 
    icon: BarChart3 
  },
  { 
    title: "Horses Department", 
    url: "/dashboard/horses", 
    icon: Rabbit 
  },
  { 
    title: "Laboratory", 
    url: "/dashboard/laboratory", 
    icon: FlaskRound 
  },
  { 
    title: "Clinic", 
    url: "/dashboard/clinic", 
    icon: Hospital 
  },
  { 
    title: "Pharmacy", 
    url: "/dashboard/pharmacy", 
    icon: Pill 
  },
  { 
    title: "Finance", 
    url: "/dashboard/finance", 
    icon: DollarSign 
  },
  { 
    title: "HR Department", 
    url: "/dashboard/hr", 
    icon: Users 
  },
  { 
    title: "Inventory", 
    url: "/dashboard/inventory", 
    icon: Package 
  },
  { 
    title: "Marketplace", 
    url: "/dashboard/marketplace", 
    icon: Store 
  },
  { 
    title: "Horse Movements", 
    url: "/dashboard/movements", 
    icon: ArrowRightLeft 
  },
  { 
    title: "Training Center", 
    url: "/dashboard/training", 
    icon: Dumbbell 
  },
  { 
    title: "Stable Rooms", 
    url: "/dashboard/rooms", 
    icon: Warehouse 
  },
  { 
    title: "Maintenance", 
    url: "/dashboard/maintenance", 
    icon: Wrench 
  },
  { 
    title: "Messages", 
    url: "/dashboard/messages", 
    icon: MessageSquare 
  }
];

const DashboardSidebar = () => {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  const collapsed = state === "collapsed";

  const isActive = (path: string) => {
    if (path === "/dashboard") {
      return currentPath === "/dashboard";
    }
    return currentPath.startsWith(path);
  };

  return (
    <TooltipProvider>
      <Sidebar className={collapsed ? "w-16" : "w-64"} collapsible="icon">
        <SidebarContent className="overflow-y-auto">
          <SidebarGroup>
            <SidebarGroupLabel className={collapsed ? "sr-only" : ""}>
              Navigation
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="space-y-1">
                {menuItems.map((item) => {
                  const isItemActive = isActive(item.url);
                  
                  const menuButton = (
                    <SidebarMenuButton 
                      asChild
                      className={`
                        group relative transition-all duration-200 ease-in-out
                        ${collapsed ? 'justify-center p-3' : 'justify-start p-3'}
                        ${isItemActive 
                          ? 'bg-primary text-primary-foreground font-medium shadow-sm' 
                          : 'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                        }
                      `}
                    >
                      <NavLink
                        to={item.url}
                        className="flex items-center gap-3 w-full"
                      >
                        <item.icon className={`
                          transition-all duration-200 flex-shrink-0
                          ${collapsed ? 'h-6 w-6' : 'h-5 w-5'}
                          ${isItemActive ? 'scale-110' : 'group-hover:scale-105'}
                        `} />
                        {!collapsed && (
                          <span className="truncate text-sm font-medium">
                            {item.title}
                          </span>
                        )}
                      </NavLink>
                    </SidebarMenuButton>
                  );

                  return (
                    <SidebarMenuItem key={item.title}>
                      {collapsed ? (
                        <Tooltip>
                          <TooltipTrigger asChild>
                            {menuButton}
                          </TooltipTrigger>
                          <TooltipContent 
                            side="right" 
                            className="font-medium bg-popover text-popover-foreground border shadow-md"
                            sideOffset={8}
                          >
                            {item.title}
                          </TooltipContent>
                        </Tooltip>
                      ) : (
                        menuButton
                      )}
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        {/* Footer */}
        {!collapsed && (
          <div className="sticky bottom-0 bg-sidebar border-t border-sidebar-border p-4">
            <p className="text-xs text-sidebar-foreground/60 text-center">
              Stable Management System
            </p>
          </div>
        )}
      </Sidebar>
    </TooltipProvider>
  );
};

export default DashboardSidebar;
