
import { useState, useMemo } from 'react';
import { OperationAlert } from '@/types/operations';

export interface UseOperationsAlertsProps {
  alerts: OperationAlert[];
}

export interface UseOperationsAlertsReturn {
  filteredAlerts: OperationAlert[];
  priorityFilter: string;
  setPriorityFilter: (priority: string) => void;
  typeFilter: string;
  setTypeFilter: (type: string) => void;
  showActionRequired: boolean;
  setShowActionRequired: (show: boolean) => void;
  dismissAlert: (alertId: string) => void;
  markAsRead: (alertId: string) => void;
  takeAction: (alertId: string) => void;
  alertCounts: {
    critical: number;
    high: number;
    medium: number;
    low: number;
    actionRequired: number;
  };
}

export const useOperationsAlerts = ({ alerts }: UseOperationsAlertsProps): UseOperationsAlertsReturn => {
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [showActionRequired, setShowActionRequired] = useState(false);
  const [dismissedAlerts, setDismissedAlerts] = useState<string[]>([]);

  const filteredAlerts = useMemo(() => {
    return alerts.filter(alert => {
      if (dismissedAlerts.includes(alert.id)) return false;
      
      const matchesPriority = priorityFilter === 'all' || alert.priority === priorityFilter;
      const matchesType = typeFilter === 'all' || alert.type === typeFilter;
      const matchesActionRequired = !showActionRequired || alert.actionRequired;
      
      return matchesPriority && matchesType && matchesActionRequired;
    });
  }, [alerts, priorityFilter, typeFilter, showActionRequired, dismissedAlerts]);

  const alertCounts = useMemo(() => {
    const visibleAlerts = alerts.filter(alert => !dismissedAlerts.includes(alert.id));
    
    return {
      critical: visibleAlerts.filter(alert => alert.priority === 'critical').length,
      high: visibleAlerts.filter(alert => alert.priority === 'high').length,
      medium: visibleAlerts.filter(alert => alert.priority === 'medium').length,
      low: visibleAlerts.filter(alert => alert.priority === 'low').length,
      actionRequired: visibleAlerts.filter(alert => alert.actionRequired).length,
    };
  }, [alerts, dismissedAlerts]);

  const dismissAlert = (alertId: string) => {
    setDismissedAlerts(prev => [...prev, alertId]);
  };

  const markAsRead = (alertId: string) => {
    console.log(`Marking alert ${alertId} as read`);
    // In a real implementation, this would call an API
  };

  const takeAction = (alertId: string) => {
    const alert = alerts.find(a => a.id === alertId);
    if (alert) {
      console.log(`Taking action for alert: ${alert.title}`);
      // In a real implementation, this would trigger appropriate actions
      // based on the alert type and context
    }
  };

  return {
    filteredAlerts,
    priorityFilter,
    setPriorityFilter,
    typeFilter,
    setTypeFilter,
    showActionRequired,
    setShowActionRequired,
    dismissAlert,
    markAsRead,
    takeAction,
    alertCounts
  };
};
