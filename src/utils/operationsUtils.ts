
import { OperationAlert } from "@/types/operations";

export const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'critical': return 'text-red-600 bg-red-50 border-red-200';
    case 'high': return 'text-orange-600 bg-orange-50 border-orange-200';
    case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    default: return 'text-blue-600 bg-blue-50 border-blue-200';
  }
};

export const getInventoryStatusColor = (status: string) => {
  switch (status) {
    case 'in_stock': return 'text-green-600 bg-green-50';
    case 'low_stock': return 'text-yellow-600 bg-yellow-50';
    case 'out_of_stock': return 'text-red-600 bg-red-50';
    case 'on_order': return 'text-blue-600 bg-blue-50';
    default: return 'text-gray-600 bg-gray-50';
  }
};

export const getOrderStatusColor = (status: string) => {
  switch (status) {
    case 'delivered': return 'text-green-600 bg-green-50';
    case 'approved': return 'text-blue-600 bg-blue-50';
    case 'sent': return 'text-purple-600 bg-purple-50';
    case 'paid': return 'text-green-600 bg-green-50';
    default: return 'text-gray-600 bg-gray-50';
  }
};

export const calculateInventoryMetrics = (items: any[]) => {
  const totalValue = items.reduce((sum, item) => sum + item.totalValue, 0);
  const lowStockItems = items.filter(item => 
    item.status === 'low_stock' || item.status === 'out_of_stock'
  );
  
  return {
    totalValue,
    lowStockCount: lowStockItems.length,
    inStockCount: items.filter(item => item.status === 'in_stock').length,
    outOfStockCount: items.filter(item => item.status === 'out_of_stock').length
  };
};

export const calculateWorkflowProgress = (steps: any[]) => {
  const completedSteps = steps.filter(step => step.status === 'completed').length;
  return (completedSteps / steps.length) * 100;
};
