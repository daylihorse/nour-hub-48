
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, User, CheckCircle, Plus } from "lucide-react";
import { usePaddockService } from "@/hooks/usePaddockService";

const PaddockMaintenanceScheduler = () => {
  const { 
    usePaddocks, 
    useMaintenanceRecords, 
    createMaintenance, 
    isCreatingMaintenance 
  } = usePaddockService();
  
  const { data: paddocks = [], isLoading: paddocksLoading } = usePaddocks();
  const { data: maintenanceRecords = [], isLoading: maintenanceLoading } = useMaintenanceRecords();
  
  const [selectedPaddock, setSelectedPaddock] = useState<string>("");

  if (paddocksLoading || maintenanceLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg">Loading maintenance schedule...</div>
      </div>
    );
  }

  const scheduleMaintenanceTask = (maintenanceData: any) => {
    createMaintenance(maintenanceData);
  };

  const upcomingMaintenance = maintenanceRecords.filter(
    record => record.status === 'scheduled'
  );

  const inProgressMaintenance = maintenanceRecords.filter(
    record => record.status === 'in_progress'
  );

  const completedMaintenance = maintenanceRecords.filter(
    record => record.status === 'completed'
  );

  return (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Scheduled</CardTitle>
            <Calendar className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{upcomingMaintenance.length}</div>
            <p className="text-xs text-muted-foreground">
              Tasks scheduled
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
            <Clock className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{inProgressMaintenance.length}</div>
            <p className="text-xs text-muted-foreground">
              Currently active
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{completedMaintenance.length}</div>
            <p className="text-xs text-muted-foreground">
              This month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Schedule New Maintenance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Schedule New Maintenance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <select 
              className="border rounded-md p-2"
              value={selectedPaddock}
              onChange={(e) => setSelectedPaddock(e.target.value)}
            >
              <option value="">Select Paddock</option>
              {paddocks.map((paddock) => (
                <option key={paddock.id} value={paddock.id}>
                  {paddock.name}
                </option>
              ))}
            </select>
            
            <select className="border rounded-md p-2">
              <option value="">Maintenance Type</option>
              <option value="fence_repair">Fence Repair</option>
              <option value="gate_maintenance">Gate Maintenance</option>
              <option value="drainage">Drainage</option>
              <option value="grass_maintenance">Grass Maintenance</option>
              <option value="water_system">Water System</option>
              <option value="shelter_repair">Shelter Repair</option>
            </select>
            
            <Button 
              onClick={() => {
                if (selectedPaddock) {
                  scheduleMaintenanceTask({
                    paddockId: selectedPaddock,
                    type: 'fence_repair',
                    description: 'Scheduled maintenance task',
                    scheduledDate: new Date(),
                    status: 'scheduled'
                  });
                }
              }}
              disabled={!selectedPaddock || isCreatingMaintenance}
            >
              {isCreatingMaintenance ? 'Scheduling...' : 'Schedule Task'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Upcoming Maintenance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Upcoming Maintenance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {upcomingMaintenance.length > 0 ? (
              upcomingMaintenance.map((task) => (
                <div key={task.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <div className="font-medium">{task.description}</div>
                    <div className="text-sm text-muted-foreground">
                      {task.type.replace('_', ' ').toUpperCase()} • 
                      Scheduled: {task.scheduledDate.toLocaleDateString()}
                    </div>
                    {task.assignedTo && (
                      <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                        <User className="h-3 w-3" />
                        Assigned to: {task.assignedTo}
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge 
                      variant="outline" 
                      className="bg-blue-50 text-blue-700"
                    >
                      {task.status}
                    </Badge>
                    <Button size="sm" variant="outline">
                      Start Task
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-muted-foreground py-8">
                No upcoming maintenance scheduled
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* In Progress Tasks */}
      {inProgressMaintenance.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              In Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {inProgressMaintenance.map((task) => (
                <div key={task.id} className="flex items-center justify-between p-4 border rounded-lg bg-orange-50">
                  <div className="flex-1">
                    <div className="font-medium">{task.description}</div>
                    <div className="text-sm text-muted-foreground">
                      {task.type.replace('_', ' ').toUpperCase()} • 
                      Started: {task.scheduledDate.toLocaleDateString()}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge 
                      variant="outline" 
                      className="bg-orange-100 text-orange-700"
                    >
                      {task.status}
                    </Badge>
                    <Button size="sm" variant="outline">
                      Complete
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Recent Completed Tasks */}
      {completedMaintenance.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5" />
              Recently Completed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {completedMaintenance.slice(0, 5).map((task) => (
                <div key={task.id} className="flex items-center justify-between p-4 border rounded-lg bg-green-50">
                  <div className="flex-1">
                    <div className="font-medium">{task.description}</div>
                    <div className="text-sm text-muted-foreground">
                      {task.type.replace('_', ' ').toUpperCase()} • 
                      Completed: {task.completedDate?.toLocaleDateString() || 'Recently'}
                    </div>
                  </div>
                  <Badge 
                    variant="outline" 
                    className="bg-green-100 text-green-700"
                  >
                    {task.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PaddockMaintenanceScheduler;
