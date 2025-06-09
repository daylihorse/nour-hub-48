
export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'alert' | 'message' | 'system' | 'reminder';
  category: 'horses' | 'clinic' | 'inventory' | 'finance' | 'laboratory' | 'training' | 'general';
  priority: 'low' | 'medium' | 'high' | 'critical';
  isRead: boolean;
  timestamp: Date;
  actionUrl?: string;
  actionLabel?: string;
  relatedEntity?: {
    type: string;
    id: string;
    name?: string;
  };
}

export interface NotificationCounts {
  total: number;
  unread: number;
  messages: number;
  alerts: number;
}
