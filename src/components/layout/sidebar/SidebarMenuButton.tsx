
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
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";

interface SidebarMenuButtonProps {
  item: MenuItem;
}

const SidebarMenuButton = ({ item }: SidebarMenuButtonProps) => {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  const collapsed = state === "collapsed";
  const { direction, t } = useLanguage();

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
        className={cn(
          "flex items-center gap-3 w-full",
          direction === 'rtl' && "flex-row-reverse"
        )}
      >
        <item.icon className={cn(
          "transition-all duration-200 flex-shrink-0",
          collapsed ? 'h-6 w-6' : 'h-5 w-5',
          isItemActive ? 'scale-110' : 'group-hover:scale-105'
        )} />
        {!collapsed && (
          <span className={cn(
            "truncate text-sm font-medium",
            direction === 'rtl' ? "text-right" : "text-left"
          )}>
            {t(`navigation.${item.key}`, item.title)}
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
            side={direction === 'rtl' ? 'left' : 'right'}
            className="font-medium bg-popover text-popover-foreground border shadow-md"
            sideOffset={8}
          >
            {t(`navigation.${item.key}`, item.title)}
          </TooltipContent>
        </Tooltip>
      ) : (
        menuButton
      )}
    </SidebarMenuItem>
  );
};

export default SidebarMenuButton;
