
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Settings, Plus, Edit, Trash2, Zap } from "lucide-react";
import { useState } from "react";
import { AutomationRule } from "@/types/integration";
import AddAutomationRuleDialog from "./AddAutomationRuleDialog";

const AutomationRulesPanel = () => {
  const [rules, setRules] = useState<AutomationRule[]>([
    {
      id: "rule_1",
      name: "Auto-schedule Pre-breeding Checkup",
      sourceEvent: "breeding_scheduled",
      targetAction: "create_clinic_appointment",
      conditions: [
        { field: "mare_health_status", operator: "equals", value: "healthy" },
        { field: "stallion_health_status", operator: "equals", value: "healthy" }
      ],
      enabled: true,
      createdAt: new Date(),
    },
    {
      id: "rule_2",
      name: "Pregnancy Monitoring Alert",
      sourceEvent: "pregnancy_confirmed",
      targetAction: "schedule_ultrasound_series",
      conditions: [
        { field: "pregnancy_week", operator: "greater_than", value: "4" }
      ],
      enabled: true,
      createdAt: new Date(),
    },
    {
      id: "rule_3",
      name: "Update Breeding Status from Health Check",
      sourceEvent: "health_check_completed",
      targetAction: "update_breeding_eligibility",
      conditions: [
        { field: "health_status", operator: "equals", value: "healthy" }
      ],
      enabled: false,
      createdAt: new Date(),
    },
  ]);

  const [showAddDialog, setShowAddDialog] = useState(false);

  const toggleRule = (ruleId: string) => {
    setRules(prev => prev.map(rule => 
      rule.id === ruleId ? { ...rule, enabled: !rule.enabled } : rule
    ));
  };

  const deleteRule = (ruleId: string) => {
    setRules(prev => prev.filter(rule => rule.id !== ruleId));
  };

  const getEventTypeColor = (eventType: string) => {
    switch (eventType) {
      case 'breeding_scheduled': return 'bg-blue-100 text-blue-800';
      case 'pregnancy_confirmed': return 'bg-pink-100 text-pink-800';
      case 'health_check_completed': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getActionTypeColor = (actionType: string) => {
    switch (actionType) {
      case 'create_clinic_appointment': return 'bg-purple-100 text-purple-800';
      case 'schedule_ultrasound_series': return 'bg-orange-100 text-orange-800';
      case 'update_breeding_eligibility': return 'bg-teal-100 text-teal-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Automation Rules
          </div>
          <Button onClick={() => setShowAddDialog(true)} size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Rule
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {rules.length === 0 ? (
          <div className="text-center py-8">
            <Zap className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
            <p className="text-muted-foreground">No automation rules configured</p>
            <Button onClick={() => setShowAddDialog(true)} className="mt-2">
              Create First Rule
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            {rules.map((rule) => (
              <div key={rule.id} className="p-4 border rounded-lg space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Switch
                      checked={rule.enabled}
                      onCheckedChange={() => toggleRule(rule.id)}
                    />
                    <h4 className="font-medium">{rule.name}</h4>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button size="sm" variant="outline">
                      <Edit className="h-3 w-3" />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={() => deleteRule(rule.id)}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <span className="text-muted-foreground">When:</span>
                  <Badge className={getEventTypeColor(rule.sourceEvent)}>
                    {rule.sourceEvent.replace('_', ' ')}
                  </Badge>
                  <span className="text-muted-foreground">→ Then:</span>
                  <Badge className={getActionTypeColor(rule.targetAction)}>
                    {rule.targetAction.replace('_', ' ')}
                  </Badge>
                </div>

                {rule.conditions.length > 0 && (
                  <div className="text-sm">
                    <span className="text-muted-foreground">Conditions:</span>
                    <div className="mt-1 space-y-1">
                      {rule.conditions.map((condition, index) => (
                        <div key={index} className="flex items-center gap-2 text-xs">
                          <Badge variant="outline">
                            {condition.field} {condition.operator} {condition.value}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>Created: {rule.createdAt.toLocaleDateString()}</span>
                  <Badge variant={rule.enabled ? "default" : "secondary"}>
                    {rule.enabled ? "Active" : "Disabled"}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        )}

        <AddAutomationRuleDialog 
          open={showAddDialog} 
          onOpenChange={setShowAddDialog}
          onRuleCreated={(newRule) => setRules(prev => [...prev, newRule])}
        />
      </CardContent>
    </Card>
  );
};

export default AutomationRulesPanel;
