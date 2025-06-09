
import { useState } from 'react';
import { Bell, BellDot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { useNotifications } from '@/hooks/useNotifications';
import NotificationPanel from './NotificationPanel';
import { useSidebar } from '@/components/ui/sidebar';

const NotificationDropdown = () => {
  const { counts } = useNotifications();
  const [isOpen, setIsOpen] = useState(false);
  const { state } = useSidebar();
  const collapsed = state === "collapsed";

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm" 
          className="
            relative w-10 h-10 p-0 
            hover:bg-sidebar-accent hover:text-sidebar-accent-foreground 
            transition-colors duration-200 
            flex items-center justify-center
          "
        >
          <div className="relative flex items-center justify-center">
            {counts.unread > 0 ? (
              <BellDot className="h-5 w-5" />
            ) : (
              <Bell className="h-5 w-5" />
            )}
            {counts.unread > 0 && (
              <Badge 
                variant="destructive" 
                className="
                  absolute -top-2 -right-2 h-5 w-5 
                  rounded-full p-0 
                  flex items-center justify-center 
                  text-xs font-bold
                  animate-pulse
                "
              >
                {counts.unread > 99 ? '99+' : counts.unread}
              </Badge>
            )}
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="w-96 p-0 bg-background border shadow-lg z-50"
        sideOffset={8}
        side={collapsed ? "right" : "bottom"}
      >
        <NotificationPanel onClose={() => setIsOpen(false)} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NotificationDropdown;
