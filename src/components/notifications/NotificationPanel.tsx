
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useNotifications } from '@/hooks/useNotifications';
import NotificationCard from './NotificationCard';

interface NotificationPanelProps {
  onClose: () => void;
}

const NotificationPanel = ({ onClose }: NotificationPanelProps) => {
  const { counts, markAllAsRead, getFilteredNotifications } = useNotifications();
  const [activeTab, setActiveTab] = useState<'all' | 'unread' | 'messages'>('all');

  const filteredNotifications = getFilteredNotifications(activeTab);

  return (
    <div className="w-full">
      {/* Header */}
      <div className="p-4 border-b">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold">Notifications</h3>
          {counts.unread > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={markAllAsRead}
              className="text-xs"
            >
              Mark all read
            </Button>
          )}
        </div>
        
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as typeof activeTab)}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="all" className="flex items-center gap-1">
              All
              <Badge variant="secondary" className="text-xs">
                {counts.total}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="unread" className="flex items-center gap-1">
              Unread
              {counts.unread > 0 && (
                <Badge variant="destructive" className="text-xs">
                  {counts.unread}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="messages" className="flex items-center gap-1">
              Messages
              <Badge variant="secondary" className="text-xs">
                {counts.messages}
              </Badge>
            </TabsTrigger>
          </TabsList>
          
          {/* Content */}
          <TabsContent value="all" className="mt-0">
            <NotificationList notifications={filteredNotifications} onClose={onClose} />
          </TabsContent>
          
          <TabsContent value="unread" className="mt-0">
            <NotificationList notifications={filteredNotifications} onClose={onClose} />
          </TabsContent>
          
          <TabsContent value="messages" className="mt-0">
            <NotificationList notifications={filteredNotifications} onClose={onClose} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

interface NotificationListProps {
  notifications: any[];
  onClose: () => void;
}

const NotificationList = ({ notifications, onClose }: NotificationListProps) => {
  if (notifications.length === 0) {
    return (
      <div className="p-6 text-center text-muted-foreground">
        <p>No notifications</p>
      </div>
    );
  }

  return (
    <div className="max-h-96 overflow-y-auto">
      {notifications.map((notification) => (
        <NotificationCard
          key={notification.id}
          notification={notification}
          onClose={onClose}
        />
      ))}
    </div>
  );
};

export default NotificationPanel;
