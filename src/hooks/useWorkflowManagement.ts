
import { useState, useMemo } from 'react';
import { WorkflowStep } from '@/types/operations';
import { calculateWorkflowProgress } from '@/utils/operationsUtils';

export interface UseWorkflowManagementReturn {
  workflowSteps: WorkflowStep[];
  progressPercentage: number;
  completedSteps: number;
  canStartStep: (step: WorkflowStep) => boolean;
  startStep: (stepId: string) => void;
  completeStep: (stepId: string) => void;
  resetWorkflow: () => void;
}

const initialWorkflowSteps: WorkflowStep[] = [
  {
    id: 'movement_log',
    title: 'Log Arrival Movement',
    department: 'Movements',
    description: 'Record horse arrival in movement system',
    status: 'completed',
    assignedTo: 'Sarah Johnson',
    estimatedTime: '5 mins',
    actions: ['Verify transport documentation', 'Update arrival status']
  },
  {
    id: 'health_check',
    title: 'Initial Health Assessment',
    department: 'Clinic',
    description: 'Mandatory health screening for new arrivals',
    status: 'in_progress',
    assignedTo: 'Dr. Martinez',
    estimatedTime: '30 mins',
    dependencies: ['movement_log'],
    actions: ['Physical examination', 'Temperature check', 'Documentation review']
  },
  {
    id: 'room_assignment',
    title: 'Assign Stable Room',
    department: 'Stable Rooms',
    description: 'Allocate appropriate accommodation',
    status: 'pending',
    estimatedTime: '10 mins',
    dependencies: ['health_check'],
    actions: ['Check room availability', 'Assign based on requirements', 'Update room status']
  },
  {
    id: 'lab_samples',
    title: 'Collect Laboratory Samples',
    department: 'Laboratory',
    description: 'Standard blood work and health screening',
    status: 'pending',
    estimatedTime: '15 mins',
    dependencies: ['health_check'],
    actions: ['Blood sample collection', 'Urinalysis', 'Parasite screening']
  },
  {
    id: 'inventory_setup',
    title: 'Setup Feed & Supplies',
    department: 'Inventory',
    description: 'Allocate feed and care supplies',
    status: 'pending',
    estimatedTime: '20 mins',
    dependencies: ['room_assignment'],
    actions: ['Assess dietary needs', 'Allocate feed supplies', 'Setup care kit']
  },
  {
    id: 'financial_setup',
    title: 'Financial Registration',
    department: 'Finance',
    description: 'Setup billing and cost tracking',
    status: 'pending',
    estimatedTime: '15 mins',
    dependencies: ['room_assignment'],
    actions: ['Create billing account', 'Setup cost centers', 'Generate initial invoice']
  }
];

export const useWorkflowManagement = (): UseWorkflowManagementReturn => {
  const [workflowSteps, setWorkflowSteps] = useState<WorkflowStep[]>(initialWorkflowSteps);

  const progressPercentage = useMemo(() => {
    return calculateWorkflowProgress(workflowSteps);
  }, [workflowSteps]);

  const completedSteps = useMemo(() => {
    return workflowSteps.filter(step => step.status === 'completed').length;
  }, [workflowSteps]);

  const canStartStep = (step: WorkflowStep) => {
    if (!step.dependencies) return step.status === 'pending';
    return step.dependencies.every(depId => 
      workflowSteps.find(s => s.id === depId)?.status === 'completed'
    ) && step.status === 'pending';
  };

  const startStep = (stepId: string) => {
    setWorkflowSteps(prev => prev.map(step => 
      step.id === stepId ? { ...step, status: 'in_progress' } : step
    ));
  };

  const completeStep = (stepId: string) => {
    setWorkflowSteps(prev => prev.map(step => 
      step.id === stepId ? { ...step, status: 'completed' } : step
    ));
  };

  const resetWorkflow = () => {
    setWorkflowSteps(initialWorkflowSteps);
  };

  return {
    workflowSteps,
    progressPercentage,
    completedSteps,
    canStartStep,
    startStep,
    completeStep,
    resetWorkflow
  };
};
