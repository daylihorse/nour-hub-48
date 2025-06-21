
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useTrainingData } from "@/hooks/useTrainingData";
import { 
  Dumbbell, 
  Users, 
  Calendar, 
  TrendingUp, 
  AlertTriangle, 
  Clock,
  MapPin,
  Award,
  Activity
} from "lucide-react";

const TrainingCenterDashboard = () => {
  const { 
    programs, 
    sessions, 
    facilities, 
    workflows, 
    metrics, 
    isLoading 
  } = useTrainingData();

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Training Center Dashboard</h2>
        <p className="text-muted-foreground">
          Comprehensive training management with cross-departmental integration
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Dumbbell className="h-4 w-4 text-blue-500" />
              <div>
                <p className="text-xs text-muted-foreground">Active Programs</p>
                <p className="text-lg font-bold">{metrics.activePrograms}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-green-500" />
              <div>
                <p className="text-xs text-muted-foreground">Horses in Training</p>
                <p className="text-lg font-bold">{metrics.horsesInTraining}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-orange-500" />
              <div>
                <p className="text-xs text-muted-foreground">Today's Sessions</p>
                <p className="text-lg font-bold">{metrics.todaySessions}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-purple-500" />
              <div>
                <p className="text-xs text-muted-foreground">Available Facilities</p>
                <p className="text-lg font-bold">{metrics.availableFacilities}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Active Programs */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Dumbbell className="h-5 w-5" />
            Active Training Programs
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {programs.slice(0, 5).map((program) => (
              <div key={program.id} className="p-4 border rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-medium">{program.name}</h4>
                    <p className="text-sm text-muted-foreground">{program.discipline}</p>
                  </div>
                  <div className="flex gap-2">
                    <Badge variant={program.type === 'competition' ? 'default' : 'secondary'}>
                      {program.type}
                    </Badge>
                    <Badge variant={program.intensity === 'high' ? 'destructive' : 'outline'}>
                      {program.intensity} intensity
                    </Badge>
                  </div>
                </div>
                
                <div className="grid grid-cols-4 gap-4 mb-3 text-sm">
                  <div>
                    <p className="text-muted-foreground">Trainer</p>
                    <p className="font-medium">{program.trainer.name}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Participants</p>
                    <p className="font-medium">{program.currentParticipants}/{program.maxParticipants}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Duration</p>
                    <p className="font-medium">{program.duration} weeks</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Location</p>
                    <p className="font-medium">{program.schedule.location}</p>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex-1 mr-4">
                    <div className="flex justify-between text-xs mb-1">
                      <span>Program Progress</span>
                      <span>{Math.round((program.currentParticipants / program.maxParticipants) * 100)}% full</span>
                    </div>
                    <Progress value={(program.currentParticipants / program.maxParticipants) * 100} className="h-2" />
                  </div>
                  <Button size="sm" variant="outline">
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Cross-Department Workflows */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Active Training Workflows
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {workflows.map((workflow) => (
              <div key={workflow.id} className="p-4 border rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-medium">
                      {workflow.type.replace('_', ' ').toUpperCase()} - Horse #{workflow.horseId}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {workflow.steps.filter(s => s.status === 'completed').length} of {workflow.steps.length} steps completed
                    </p>
                  </div>
                  <Badge variant={workflow.status === 'completed' ? 'default' : 'secondary'}>
                    {workflow.status}
                  </Badge>
                </div>
                
                <div className="mb-3">
                  <Progress 
                    value={(workflow.steps.filter(s => s.status === 'completed').length / workflow.steps.length) * 100} 
                    className="h-2" 
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {workflow.steps.slice(0, 3).map((step) => (
                    <div key={step.id} className="flex items-center gap-2 p-2 bg-muted/30 rounded">
                      <div className={`w-2 h-2 rounded-full ${
                        step.status === 'completed' ? 'bg-green-500' :
                        step.status === 'in_progress' ? 'bg-blue-500' :
                        step.status === 'blocked' ? 'bg-red-500' : 'bg-gray-300'
                      }`} />
                      <div className="flex-1">
                        <p className="text-xs font-medium">{step.title}</p>
                        <p className="text-xs text-muted-foreground">{step.department}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Today's Sessions & Facility Status */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Today's Training Sessions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {sessions.slice(0, 5).map((session) => (
                <div key={session.id} className="flex justify-between items-center p-3 border rounded">
                  <div>
                    <p className="font-medium">{session.date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
                    <p className="text-sm text-muted-foreground">
                      Horse #{session.horseId} - {session.location}
                    </p>
                  </div>
                  <Badge variant={
                    session.status === 'completed' ? 'default' :
                    session.status === 'in_progress' ? 'secondary' :
                    session.status === 'cancelled' ? 'destructive' : 'outline'
                  }>
                    {session.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Facility Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {facilities.slice(0, 5).map((facility) => (
                <div key={facility.id} className="flex justify-between items-center p-3 border rounded">
                  <div>
                    <p className="font-medium">{facility.name}</p>
                    <p className="text-sm text-muted-foreground">{facility.type}</p>
                  </div>
                  <Badge variant={
                    facility.status === 'available' ? 'default' :
                    facility.status === 'occupied' ? 'secondary' :
                    facility.status === 'maintenance' ? 'destructive' : 'outline'
                  }>
                    {facility.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TrainingCenterDashboard;
