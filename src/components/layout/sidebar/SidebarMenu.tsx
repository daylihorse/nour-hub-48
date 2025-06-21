
import {
  SidebarMenu as ShadcnSidebarMenu,
  useSidebar,
} from "@/components/ui/sidebar";
import { menuItems } from "./MenuItems";
import SidebarMenuButton from "./SidebarMenuButton";
import { useTenantFeatures } from "@/hooks/useTenantFeatures";

const SidebarMenu = () => {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const { isFeatureEnabled } = useTenantFeatures();

  // Filter menu items based on tenant features
  const filteredMenuItems = menuItems.filter(item => {
    const featureMap: Record<string, string> = {
      '/dashboard/horses': 'horses',
      '/dashboard/paddocks': 'paddocks',
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
    
    // Always show these core items
    if (item.url === '/dashboard') return true;
    if (item.url === '/dashboard/clients') return true;
    if (item.url === '/dashboard/movements') return true;
    if (item.url === '/dashboard/academy') return true;
    if (item.url === '/dashboard/settings') return true;
    
    // If no feature mapping exists, show the item (for core functionality)
    if (!feature) return true;
    
    // Check if the feature is enabled
    return isFeatureEnabled(feature);
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
