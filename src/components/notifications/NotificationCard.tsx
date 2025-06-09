
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { X, ArrowUpRight } from 'lucide-react';
import { useNotifications } from '@/hooks/useNotifications';
import { Notification } from '@/types/notifications';
import { formatDistanceToNow } from 'date-fns';

interface NotificationCardProps {
  notification: Notification;
  onClose: () => void;
}

const NotificationCard = ({ notification, onClose }: NotificationCardProps) => {
  const navigate = useNavigate();
  const { markAsRead, dismissNotification } = useNotifications();

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical':
        return 'border-l-red-500 bg-red-50';
      case 'high':
        return 'border-l-orange-500 bg-orange-50';
      case 'medium':
        return 'border-l-yellow-500 bg-yellow-50';
      default:
        return 'border-l-blue-500 bg-blue-50';
    }
  };

  const getCategoryIcon = (category: string) => {
    // You can expand this with specific icons for each category
    switch (category) {
      case 'inventory':
        return '📦';
      case 'clinic':
        return '🏥';
      case 'laboratory':
        return '🔬';
      case 'finance':
        return '💰';
      case 'training':
        return '🏃';
      default:
        return '📢';
    }
  };

  const handleCardClick = () => {
    if (!notification.isRead) {
      markAsRead(notification.id);
    }
    
    if (notification.actionUrl) {
      navigate(notification.actionUrl);
      onClose();
    }
  };

  const handleDismiss = (e: React.MouseEvent) => {
    e.stopPropagation();
    dismissNotification(notification.id);
  };

  return (
    <div
      className={`
        p-4 border-l-4 cursor-pointer hover:bg-muted/50 transition-colors
        ${getPriorityColor(notification.priority)}
        ${!notification.isRead ? 'bg-opacity-100' : 'bg-opacity-30'}
      `}
      onClick={handleCardClick}
    >
      <div className="flex items-start gap-3">
        <div className="text-lg">{getCategoryIcon(notification.category)}</div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h4 className={`text-sm font-medium ${!notification.isRead ? 'font-semibold' : ''}`}>
                  {notification.title}
                </h4>
                {!notification.isRead && (
                  <div className="w-2 h-2 bg-blue-500 rounded-full" />
                )}
              </div>
              
              <p className="text-sm text-muted-foreground mb-2">
                {notification.message}
              </p>
              
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Badge variant="outline" className="text-xs capitalize">
                  {notification.category}
                </Badge>
                <span>
                  {formatDistanceToNow(notification.timestamp, { addSuffix: true })}
                </span>
                {notification.relatedEntity?.name && (
                  <span>• {notification.relatedEntity.name}</span>
                )}
              </div>
            </div>
            
            <div className="flex items-center gap-1">
              {notification.actionUrl && (
                <ArrowUpRight className="h-3 w-3 text-muted-foreground" />
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={handleDismiss}
                className="h-6 w-6 p-0 hover:bg-destructive hover:text-destructive-foreground"
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          </div>
          
          {notification.actionLabel && notification.actionUrl && (
            <div className="mt-2">
              <Badge variant="outline" className="text-xs">
                {notification.actionLabel}
              </Badge>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationCard;
