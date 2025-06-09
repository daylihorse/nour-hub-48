
import { WorkflowStep, OperationAlert, InventoryItem } from "@/types/operations";

export const calculateWorkflowProgress = (steps: WorkflowStep[]): number => {
  if (steps.length === 0) return 0;
  
  const completedSteps = steps.filter(step => step.status === 'completed').length;
  return (completedSteps / steps.length) * 100;
};

export const getPriorityColor = (priority: string): string => {
  switch (priority) {
    case 'critical':
      return 'border-red-500 bg-red-50';
    case 'high':
      return 'border-orange-500 bg-orange-50';
    case 'medium':
      return 'border-yellow-500 bg-yellow-50';
    case 'low':
      return 'border-blue-500 bg-blue-50';
    default:
      return 'border-gray-300 bg-gray-50';
  }
};

export const calculateInventoryMetrics = (inventoryItems: InventoryItem[]) => {
  const totalValue = inventoryItems.reduce((sum, item) => sum + item.totalValue, 0);
  const lowStockCount = inventoryItems.filter(item => 
    item.status === 'low_stock' || item.status === 'out_of_stock'
  ).length;
  const inStockCount = inventoryItems.filter(item => item.status === 'in_stock').length;
  const outOfStockCount = inventoryItems.filter(item => item.status === 'out_of_stock').length;

  return {
    totalValue,
    lowStockCount,
    inStockCount,
    outOfStockCount
  };
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
};

export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
};

export const getWorkflowStepsByDepartment = (steps: WorkflowStep[], department: string): WorkflowStep[] => {
  return steps.filter(step => step.department === department);
};

export const getAlertsByType = (alerts: OperationAlert[], type: string): OperationAlert[] => {
  return alerts.filter(alert => alert.type === type);
};

export const getAlertsByPriority = (alerts: OperationAlert[], priority: string): OperationAlert[] => {
  return alerts.filter(alert => alert.priority === priority);
};

export const canStartWorkflowStep = (step: WorkflowStep, allSteps: WorkflowStep[]): boolean => {
  if (step.status !== 'pending') return false;
  
  if (!step.dependencies || step.dependencies.length === 0) return true;
  
  return step.dependencies.every(depId => {
    const dependentStep = allSteps.find(s => s.id === depId);
    return dependentStep?.status === 'completed';
  });
};

export const getNextAvailableSteps = (steps: WorkflowStep[]): WorkflowStep[] => {
  return steps.filter(step => canStartWorkflowStep(step, steps));
};

export const calculatePharmacyMetrics = (data: any) => {
  // Placeholder for pharmacy-specific calculations
  return {
    prescriptionsFilled: 0,
    inventoryValue: 0,
    insuranceClaims: 0,
    consultationsCompleted: 0
  };
};
