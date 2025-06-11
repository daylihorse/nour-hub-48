
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
