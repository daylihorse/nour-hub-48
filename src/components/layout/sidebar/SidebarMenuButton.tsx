
import { NavLink, useLocation } from "react-router-dom";
import {
  SidebarMenuButton as ShadcnSidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { MenuItem } from "./MenuItems";

interface SidebarMenuButtonProps {
  item: MenuItem;
}

const SidebarMenuButton = ({ item }: SidebarMenuButtonProps) => {
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

  const isItemActive = isActive(item.url);

  const menuButton = (
    <ShadcnSidebarMenuButton 
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
    </ShadcnSidebarMenuButton>
  );

  return (
    <SidebarMenuItem>
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
};

export default SidebarMenuButton;
