
import {
  SidebarMenu as ShadcnSidebarMenu,
  useSidebar,
} from "@/components/ui/sidebar";
import { menuItems } from "./MenuItems";
import SidebarMenuButton from "./SidebarMenuButton";
import { useIntegratedModuleAccess } from "@/hooks/useIntegratedModuleAccess";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const SidebarMenu = () => {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const { isModuleAccessible } = useIntegratedModuleAccess();

  // Filter menu items based on integrated module access (tenant features + module access center)
  const filteredMenuItems = menuItems.filter(item => {
    const featureMap: Record<string, { moduleId: string; featureId?: string }> = {
      '/dashboard/horses': { moduleId: 'horses', featureId: 'horses' },
      '/dashboard/laboratory': { moduleId: 'laboratory', featureId: 'laboratory' },
      '/dashboard/clinic': { moduleId: 'clinic', featureId: 'clinic' },
      '/dashboard/pharmacy': { moduleId: 'pharmacy', featureId: 'pharmacy' },
      '/dashboard/finance': { moduleId: 'finance', featureId: 'finance' },
      '/dashboard/hr': { moduleId: 'hr', featureId: 'hr' },
      '/dashboard/inventory': { moduleId: 'inventory', featureId: 'inventory' },
      '/dashboard/marketplace': { moduleId: 'marketplace', featureId: 'marketplace' },
      '/dashboard/training': { moduleId: 'training', featureId: 'training' },
      '/dashboard/rooms': { moduleId: 'stable-rooms', featureId: 'rooms' },
      '/dashboard/maintenance': { moduleId: 'maintenance', featureId: 'maintenance' },
      '/dashboard/messages': { moduleId: 'messages', featureId: 'messages' },
      '/dashboard/movements': { moduleId: 'movements', featureId: 'movements' },
      '/dashboard/riding-reservations': { moduleId: 'riding-reservations' },
    };

    const moduleInfo = featureMap[item.url];
    
    // Special case for dashboard - always show
    if (item.url === '/dashboard') return true;
    // Special case for clients - always show
    if (item.url === '/dashboard/clients') return true;
    
    // Check integrated module access (both tenant features and module access center)
    if (moduleInfo) {
      return isModuleAccessible(moduleInfo.moduleId, moduleInfo.featureId);
    }
    
    // If no mapping exists, show the item
    return true;
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
