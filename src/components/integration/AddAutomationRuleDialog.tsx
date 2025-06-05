
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Plus, X } from "lucide-react";
import { useState } from "react";
import { AutomationRule } from "@/types/integration";
import { useToast } from "@/hooks/use-toast";

interface AddAutomationRuleDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onRuleCreated: (rule: AutomationRule) => void;
}

const AddAutomationRuleDialog = ({ open, onOpenChange, onRuleCreated }: AddAutomationRuleDialogProps) => {
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [sourceEvent, setSourceEvent] = useState("");
  const [targetAction, setTargetAction] = useState("");
  const [conditions, setConditions] = useState<any[]>([]);
  const [newCondition, setNewCondition] = useState({
    field: "",
    operator: "",
    value: "",
  });

  const sourceEvents = [
    { value: "breeding_scheduled", label: "Breeding Scheduled" },
    { value: "pregnancy_confirmed", label: "Pregnancy Confirmed" },
    { value: "foaling_due", label: "Foaling Due" },
    { value: "health_check_completed", label: "Health Check Completed" },
    { value: "vaccination_due", label: "Vaccination Due" },
  ];

  const targetActions = [
    { value: "create_clinic_appointment", label: "Create Clinic Appointment" },
    { value: "schedule_ultrasound_series", label: "Schedule Ultrasound Series" },
    { value: "update_breeding_eligibility", label: "Update Breeding Eligibility" },
    { value: "send_notification", label: "Send Notification" },
    { value: "update_horse_status", label: "Update Horse Status" },
  ];

  const operators = [
    { value: "equals", label: "Equals" },
    { value: "not_equals", label: "Not Equals" },
    { value: "greater_than", label: "Greater Than" },
    { value: "less_than", label: "Less Than" },
    { value: "contains", label: "Contains" },
  ];

  const addCondition = () => {
    if (newCondition.field && newCondition.operator && newCondition.value) {
      setConditions(prev => [...prev, { ...newCondition }]);
      setNewCondition({ field: "", operator: "", value: "" });
    }
  };

  const removeCondition = (index: number) => {
    setConditions(prev => prev.filter((_, i) => i !== index));
  };

  const handleCreate = () => {
    if (!name || !sourceEvent || !targetAction) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const newRule: AutomationRule = {
      id: `rule_${Date.now()}`,
      name,
      sourceEvent,
      targetAction,
      conditions,
      enabled: true,
      createdAt: new Date(),
    };

    onRuleCreated(newRule);
    
    toast({
      title: "Rule Created",
      description: `Automation rule "${name}" has been created successfully.`,
    });

    // Reset form
    setName("");
    setSourceEvent("");
    setTargetAction("");
    setConditions([]);
    setNewCondition({ field: "", operator: "", value: "" });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Create Automation Rule</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium">Rule Name</label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter rule name..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Source Event</label>
              <Select value={sourceEvent} onValueChange={setSourceEvent}>
                <SelectTrigger>
                  <SelectValue placeholder="Select source event" />
                </SelectTrigger>
                <SelectContent>
                  {sourceEvents.map((event) => (
                    <SelectItem key={event.value} value={event.value}>
                      {event.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium">Target Action</label>
              <Select value={targetAction} onValueChange={setTargetAction}>
                <SelectTrigger>
                  <SelectValue placeholder="Select target action" />
                </SelectTrigger>
                <SelectContent>
                  {targetActions.map((action) => (
                    <SelectItem key={action.value} value={action.value}>
                      {action.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium">Conditions (Optional)</label>
            <div className="space-y-2 mt-2">
              {conditions.map((condition, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Badge variant="outline" className="flex items-center gap-1">
                    {condition.field} {condition.operator} {condition.value}
                    <button
                      onClick={() => removeCondition(index)}
                      className="ml-1 text-red-500 hover:text-red-700"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                </div>
              ))}
              
              <div className="grid grid-cols-4 gap-2">
                <Input
                  value={newCondition.field}
                  onChange={(e) => setNewCondition(prev => ({ ...prev, field: e.target.value }))}
                  placeholder="Field name"
                />
                <Select 
                  value={newCondition.operator} 
                  onValueChange={(value) => setNewCondition(prev => ({ ...prev, operator: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Operator" />
                  </SelectTrigger>
                  <SelectContent>
                    {operators.map((op) => (
                      <SelectItem key={op.value} value={op.value}>
                        {op.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Input
                  value={newCondition.value}
                  onChange={(e) => setNewCondition(prev => ({ ...prev, value: e.target.value }))}
                  placeholder="Value"
                />
                <Button onClick={addCondition} size="sm">
                  <Plus className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreate}>
              Create Rule
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddAutomationRuleDialog;
