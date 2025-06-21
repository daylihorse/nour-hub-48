
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RotateCcw, Plus, Calendar, Users, MapPin } from "lucide-react";
import { usePaddockService } from "@/hooks/usePaddockService";

// Mock rotation plans data - in a real app this would come from the database
const mockRotationPlans = [
  {
    id: "1",
    name: "Spring Rotation Plan",
    paddockIds: ["p1", "p2", "p3"],
    rotationInterval: 14,
    restPeriod: 7,
    status: "active",
    startDate: new Date("2024-03-01"),
    endDate: new Date("2024-05-31"),
    automaticRotation: true
  },
  {
    id: "2", 
    name: "Summer Grazing Plan",
    paddockIds: ["p4", "p5", "p6"],
    rotationInterval: 21,
    restPeriod: 14,
    status: "planned",
    startDate: new Date("2024-06-01"),
    endDate: new Date("2024-08-31"),
    automaticRotation: false
  }
];

const PaddockRotationPlanner = () => {
  const { usePaddocks } = usePaddockService();
  const { data: paddocks = [], isLoading } = usePaddocks();
  
  const [rotationPlans] = useState(mockRotationPlans);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newPlan, setNewPlan] = useState({
    name: "",
    paddockIds: [] as string[],
    rotationInterval: 14,
    restPeriod: 7,
    startDate: "",
    endDate: "",
    automaticRotation: false
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg">Loading rotation plans...</div>
      </div>
    );
  }

  const createRotationPlan = () => {
    console.log("Creating rotation plan:", newPlan);
    // In a real app, this would call the backend service
    setShowCreateForm(false);
    setNewPlan({
      name: "",
      paddockIds: [],
      rotationInterval: 14,
      restPeriod: 7,
      startDate: "",
      endDate: "",
      automaticRotation: false
    });
  };

  const activePlans = rotationPlans.filter(plan => plan.status === 'active');
  const plannedRotations = rotationPlans.filter(plan => plan.status === 'planned');

  return (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Plans</CardTitle>
            <RotateCcw className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{activePlans.length}</div>
            <p className="text-xs text-muted-foreground">
              Currently running
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Planned</CardTitle>
            <Calendar className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{plannedRotations.length}</div>
            <p className="text-xs text-muted-foreground">
              Scheduled to start
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Paddocks</CardTitle>
            <MapPin className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">{paddocks.length}</div>
            <p className="text-xs text-muted-foreground">
              Available for rotation
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Create New Plan Button */}
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Rotation Plans</h2>
        <Button 
          onClick={() => setShowCreateForm(true)}
          className="flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Create New Plan
        </Button>
      </div>

      {/* Create New Plan Form */}
      {showCreateForm && (
        <Card>
          <CardHeader>
            <CardTitle>Create New Rotation Plan</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Plan Name</label>
                <Input
                  value={newPlan.name}
                  onChange={(e) => setNewPlan({ ...newPlan, name: e.target.value })}
                  placeholder="Enter plan name"
                />
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">Rotation Interval (days)</label>
                <Input
                  type="number"
                  value={newPlan.rotationInterval}
                  onChange={(e) => setNewPlan({ ...newPlan, rotationInterval: parseInt(e.target.value) })}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Start Date</label>
                <Input
                  type="date"
                  value={newPlan.startDate}
                  onChange={(e) => setNewPlan({ ...newPlan, startDate: e.target.value })}
                />
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">End Date</label>
                <Input
                  type="date"
                  value={newPlan.endDate}
                  onChange={(e) => setNewPlan({ ...newPlan, endDate: e.target.value })}
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Select Paddocks</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {paddocks.map((paddock) => (
                  <label key={paddock.id} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={newPlan.paddockIds.includes(paddock.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setNewPlan({
                            ...newPlan,
                            paddockIds: [...newPlan.paddockIds, paddock.id]
                          });
                        } else {
                          setNewPlan({
                            ...newPlan,
                            paddockIds: newPlan.paddockIds.filter(id => id !== paddock.id)
                          });
                        }
                      }}
                    />
                    <span className="text-sm">{paddock.name}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex gap-2">
              <Button onClick={createRotationPlan}>Create Plan</Button>
              <Button variant="outline" onClick={() => setShowCreateForm(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Active Rotation Plans */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <RotateCcw className="h-5 w-5" />
            Active Rotation Plans
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {activePlans.length > 0 ? (
              activePlans.map((plan) => (
                <div key={plan.id} className="p-4 border rounded-lg bg-green-50">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">{plan.name}</h3>
                    <Badge className="bg-green-100 text-green-800">
                      {plan.status}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-muted-foreground">
                    <div>
                      <div className="font-medium">Paddocks</div>
                      <div>{plan.paddockIds.length} selected</div>
                    </div>
                    <div>
                      <div className="font-medium">Interval</div>
                      <div>{plan.rotationInterval} days</div>
                    </div>
                    <div>
                      <div className="font-medium">Rest Period</div>
                      <div>{plan.restPeriod} days</div>
                    </div>
                    <div>
                      <div className="font-medium">Duration</div>
                      <div>{plan.startDate.toLocaleDateString()} - {plan.endDate?.toLocaleDateString()}</div>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Button size="sm" variant="outline">View Details</Button>
                    <Button size="sm" variant="outline">Pause Plan</Button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-muted-foreground py-8">
                No active rotation plans
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Planned Rotations */}
      {plannedRotations.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Planned Rotations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {plannedRotations.map((plan) => (
                <div key={plan.id} className="p-4 border rounded-lg bg-blue-50">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">{plan.name}</h3>
                    <Badge className="bg-blue-100 text-blue-800">
                      {plan.status}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-muted-foreground">
                    <div>
                      <div className="font-medium">Paddocks</div>
                      <div>{plan.paddockIds.length} selected</div>
                    </div>
                    <div>
                      <div className="font-medium">Interval</div>
                      <div>{plan.rotationInterval} days</div>
                    </div>
                    <div>
                      <div className="font-medium">Starts</div>
                      <div>{plan.startDate.toLocaleDateString()}</div>
                    </div>
                    <div>
                      <div className="font-medium">Auto Rotate</div>
                      <div>{plan.automaticRotation ? 'Yes' : 'No'}</div>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Button size="sm" variant="outline">Start Now</Button>
                    <Button size="sm" variant="outline">Edit Plan</Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PaddockRotationPlanner;
