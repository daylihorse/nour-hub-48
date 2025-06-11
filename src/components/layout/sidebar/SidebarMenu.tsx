
import {
  SidebarMenu as ShadcnSidebarMenu,
  useSidebar,
} from "@/components/ui/sidebar";
import { menuItems } from "./MenuItems";
import SidebarMenuButton from "./SidebarMenuButton";
import { useTenantFeatures } from "@/hooks/useTenantFeatures";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const SidebarMenu = () => {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const { isFeatureEnabled, getFeatureDefinition } = useTenantFeatures();

  // Filter menu items based on tenant features
  const filteredMenuItems = menuItems.filter(item => {
    const featureMap: Record<string, string> = {
      '/dashboard/horses': 'horses',
      '/dashboard/laboratory': 'laboratory',
      '/dashboard/clinic': 'clinic',
      '/dashboard/pharmacy': 'pharmacy',
      '/dashboard/finance': 'finance',
      '/dashboard/hr': 'hr',
      '/dashboard/inventory': 'inventory',
      '/dashboard/marketplace': 'marketplace',
      '/dashboard/training': 'training',
      '/dashboard/rooms': 'rooms',
      '/dashboard/maintenance': 'maintenance',
      '/dashboard/messages': 'messages',
    };

    const feature = featureMap[item.url];
    // Special case for dashboard - always show
    if (item.url === '/dashboard') return true;
    // Special case for clients - always show
    if (item.url === '/dashboard/clients') return true;
    
    // If no feature mapping exists, or the feature is enabled, show the item
    return !feature || isFeatureEnabled(feature);
  });

  return (
    <ShadcnSidebarMenu className="space-y-1">
      {filteredMenuItems.map((item) => (
        <SidebarMenuButton key={item.title} item={item} />
      ))}
    </ShadcnSidebarMenu>
  );
};

export default SidebarMenu;
