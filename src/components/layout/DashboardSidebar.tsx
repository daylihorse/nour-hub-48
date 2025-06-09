
import { useState } from "react";
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
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import NotificationDropdown from "@/components/notifications/NotificationDropdown";
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
  const { collapsed } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => {
    if (path === "/dashboard") {
      return currentPath === "/dashboard";
    }
    return currentPath.startsWith(path);
  };

  return (
    <Sidebar className={collapsed ? "w-14" : "w-60"} collapsible>
      {/* Header with notification dropdown */}
      <div className="p-4 border-b flex items-center justify-between">
        {!collapsed && (
          <h2 className="text-lg font-semibold">Stable Management</h2>
        )}
        <div className="flex items-center gap-2">
          <NotificationDropdown />
          <SidebarTrigger />
        </div>
      </div>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      className={({ isActive: navIsActive }) =>
                        `flex items-center gap-2 ${
                          navIsActive || isActive(item.url)
                            ? "bg-muted text-primary font-medium"
                            : "hover:bg-muted/50"
                        }`
                      }
                    >
                      <item.icon className="h-4 w-4" />
                      {!collapsed && <span>{item.title}</span>}
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
