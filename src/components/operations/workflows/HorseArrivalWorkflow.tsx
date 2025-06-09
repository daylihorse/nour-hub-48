
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowRight } from "lucide-react";
import { WorkflowStep } from "@/types/operations";
import { calculateWorkflowProgress } from "@/utils/operationsUtils";
import WorkflowStepCard from "../shared/WorkflowStepCard";

const HorseArrivalWorkflow = () => {
  const [workflowSteps, setWorkflowSteps] = useState<WorkflowStep[]>([
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
  ]);

  const progressPercentage = calculateWorkflowProgress(workflowSteps);
  const completedSteps = workflowSteps.filter(step => step.status === 'completed').length;

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

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Horse Arrival Workflow</span>
            <Badge variant="outline">
              {completedSteps}/{workflowSteps.length} Steps Complete
            </Badge>
          </CardTitle>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Overall Progress</span>
              <span>{Math.round(progressPercentage)}%</span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {workflowSteps.map((step, index) => (
              <div key={step.id}>
                <WorkflowStepCard
                  step={step}
                  index={index}
                  canStart={canStartStep(step)}
                  onStart={startStep}
                  onComplete={completeStep}
                />
                {index < workflowSteps.length - 1 && (
                  <div className="flex justify-center mt-4">
                    <ArrowRight className="h-4 w-4 text-muted-foreground" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HorseArrivalWorkflow;
