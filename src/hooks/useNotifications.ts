
import { useState, useMemo } from 'react';
import { Notification, NotificationCounts } from '@/types/notifications';

export interface UseNotificationsReturn {
  notifications: Notification[];
  counts: NotificationCounts;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  dismissNotification: (id: string) => void;
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'isRead'>) => void;
  getFilteredNotifications: (filter: 'all' | 'unread' | 'messages') => Notification[];
}

export const useNotifications = (): UseNotificationsReturn => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 'notif_001',
      title: 'Low Stock Alert',
      message: 'Training equipment supply is running low',
      type: 'alert',
      category: 'inventory',
      priority: 'high',
      isRead: false,
      timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
      actionUrl: '/dashboard/inventory',
      actionLabel: 'View Inventory',
      relatedEntity: {
        type: 'inventory_item',
        id: 'inv_001',
        name: 'Training Saddle'
      }
    },
    {
      id: 'notif_002',
      title: 'Horse Health Check Due',
      message: 'Arabian mare #H003 requires veterinary examination',
      type: 'reminder',
      category: 'clinic',
      priority: 'medium',
      isRead: false,
      timestamp: new Date(Date.now() - 60 * 60 * 1000), // 1 hour ago
      actionUrl: '/dashboard/clinic',
      actionLabel: 'Schedule Appointment',
      relatedEntity: {
        type: 'horse',
        id: 'H003',
        name: 'Arabian Mare'
      }
    },
    {
      id: 'notif_003',
      title: 'Lab Results Available',
      message: 'Blood test results for 3 horses are ready for review',
      type: 'system',
      category: 'laboratory',
      priority: 'medium',
      isRead: true,
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      actionUrl: '/dashboard/laboratory',
      actionLabel: 'View Results'
    },
    {
      id: 'notif_004',
      title: 'Payment Received',
      message: 'Training program payment has been processed successfully',
      type: 'system',
      category: 'finance',
      priority: 'low',
      isRead: false,
      timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 hours ago
      actionUrl: '/dashboard/finance',
      actionLabel: 'View Transaction'
    },
    {
      id: 'notif_005',
      title: 'New Message',
      message: 'Dr. Martinez sent you a message about training progress',
      type: 'message',
      category: 'general',
      priority: 'medium',
      isRead: false,
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
      actionUrl: '/dashboard/messages',
      actionLabel: 'Read Message'
    }
  ]);

  const counts = useMemo((): NotificationCounts => {
    const unreadNotifications = notifications.filter(n => !n.isRead);
    const messageNotifications = notifications.filter(n => n.type === 'message');
    
    return {
      total: notifications.length,
      unread: unreadNotifications.length,
      messages: messageNotifications.length,
      alerts: notifications.filter(n => n.type === 'alert' && !n.isRead).length
    };
  }, [notifications]);

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, isRead: true }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, isRead: true }))
    );
  };

  const dismissNotification = (id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  const addNotification = (notificationData: Omit<Notification, 'id' | 'timestamp' | 'isRead'>) => {
    const newNotification: Notification = {
      ...notificationData,
      id: `notif_${Date.now()}`,
      timestamp: new Date(),
      isRead: false
    };
    setNotifications(prev => [newNotification, ...prev]);
  };

  const getFilteredNotifications = (filter: 'all' | 'unread' | 'messages'): Notification[] => {
    switch (filter) {
      case 'unread':
        return notifications.filter(n => !n.isRead);
      case 'messages':
        return notifications.filter(n => n.type === 'message');
      default:
        return notifications;
    }
  };

  return {
    notifications,
    counts,
    markAsRead,
    markAllAsRead,
    dismissNotification,
    addNotification,
    getFilteredNotifications
  };
};
