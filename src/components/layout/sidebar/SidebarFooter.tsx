
import { useSidebar } from "@/components/ui/sidebar";

const SidebarFooter = () => {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";

  return (
    <div className="sticky bottom-0 bg-sidebar border-t border-sidebar-border p-4">
      {!collapsed && (
        <p className="text-xs text-sidebar-foreground/60 text-center">
          Stable Management System
        </p>
      )}
    </div>
  );
};

export default SidebarFooter;
