
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { 
  CheckCircle, 
  Clock, 
  ArrowRight, 
  Warehouse, 
  Package, 
  FlaskRound, 
  Hospital,
  FileText,
  AlertTriangle
} from "lucide-react";

interface WorkflowStep {
  id: string;
  title: string;
  department: string;
  description: string;
  status: 'pending' | 'in_progress' | 'completed' | 'blocked';
  assignedTo?: string;
  estimatedTime?: string;
  dependencies?: string[];
  actions: string[];
}

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

  const getStatusIcon = (status: WorkflowStep['status']) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'in_progress': return <Clock className="h-4 w-4 text-blue-500" />;
      case 'blocked': return <AlertTriangle className="h-4 w-4 text-red-500" />;
      default: return <Clock className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: WorkflowStep['status']) => {
    switch (status) {
      case 'completed': return 'bg-green-50 border-green-200';
      case 'in_progress': return 'bg-blue-50 border-blue-200';
      case 'blocked': return 'bg-red-50 border-red-200';
      default: return 'bg-gray-50 border-gray-200';
    }
  };

  const getDepartmentIcon = (department: string) => {
    switch (department) {
      case 'Stable Rooms': return <Warehouse className="h-4 w-4" />;
      case 'Inventory': return <Package className="h-4 w-4" />;
      case 'Laboratory': return <FlaskRound className="h-4 w-4" />;
      case 'Clinic': return <Hospital className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  const completedSteps = workflowSteps.filter(step => step.status === 'completed').length;
  const progressPercentage = (completedSteps / workflowSteps.length) * 100;

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
              <div
                key={step.id}
                className={`p-4 rounded-lg border ${getStatusColor(step.status)}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3 flex-1">
                    <div className="flex items-center gap-2 mt-1">
                      {getStatusIcon(step.status)}
                      <span className="text-sm font-medium">{index + 1}</span>
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-medium">{step.title}</h4>
                        <div className="flex items-center gap-1">
                          {getDepartmentIcon(step.department)}
                          <Badge variant="outline" className="text-xs">
                            {step.department}
                          </Badge>
                        </div>
                      </div>
                      
                      <p className="text-sm text-muted-foreground mb-2">
                        {step.description}
                      </p>
                      
                      <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                        {step.assignedTo && (
                          <span>Assigned to: {step.assignedTo}</span>
                        )}
                        {step.estimatedTime && (
                          <span>Est. time: {step.estimatedTime}</span>
                        )}
                      </div>
                      
                      <div className="space-y-1">
                        {step.actions.map((action, actionIndex) => (
                          <div key={actionIndex} className="flex items-center gap-2">
                            <Checkbox 
                              id={`${step.id}-action-${actionIndex}`}
                              checked={step.status === 'completed'}
                              disabled={step.status !== 'in_progress'}
                            />
                            <label 
                              htmlFor={`${step.id}-action-${actionIndex}`}
                              className="text-sm"
                            >
                              {action}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    {step.status === 'in_progress' && (
                      <Button 
                        size="sm" 
                        onClick={() => completeStep(step.id)}
                      >
                        Complete
                      </Button>
                    )}
                    {canStartStep(step) && (
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => startStep(step.id)}
                      >
                        Start
                      </Button>
                    )}
                    {step.dependencies && step.status === 'pending' && !canStartStep(step) && (
                      <Badge variant="secondary" className="text-xs">
                        Waiting for dependencies
                      </Badge>
                    )}
                  </div>
                </div>
                
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
