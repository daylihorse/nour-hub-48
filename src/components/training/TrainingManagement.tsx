
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useTrainingData } from "@/hooks/useTrainingData";
import { Calendar, Plus, Search, Filter, Users, MapPin, Clock, Award } from "lucide-react";

const TrainingManagement = () => {
  const { programs, sessions, facilities, createProgram, scheduleSession } = useTrainingData();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");

  const filteredPrograms = programs.filter(program => {
    const matchesSearch = program.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         program.discipline.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === "all" || program.type === filterType;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Training Management</h2>
          <p className="text-muted-foreground">Manage programs, sessions, and facilities</p>
        </div>
        <Button onClick={() => createProgram} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          New Program
        </Button>
      </div>

      <Tabs defaultValue="programs" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="programs">Programs</TabsTrigger>
          <TabsTrigger value="sessions">Sessions</TabsTrigger>
          <TabsTrigger value="facilities">Facilities</TabsTrigger>
          <TabsTrigger value="assessments">Assessments</TabsTrigger>
        </TabsList>

        <TabsContent value="programs" className="space-y-4">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search programs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-48">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="basic">Basic</SelectItem>
                <SelectItem value="advanced">Advanced</SelectItem>
                <SelectItem value="specialized">Specialized</SelectItem>
                <SelectItem value="rehabilitation">Rehabilitation</SelectItem>
                <SelectItem value="competition">Competition</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-4">
            {filteredPrograms.map((program) => (
              <Card key={program.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{program.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">{program.description}</p>
                    </div>
                    <div className="flex gap-2">
                      <Badge variant={program.type === 'competition' ? 'default' : 'secondary'}>
                        {program.type}
                      </Badge>
                      <Badge variant={program.status === 'active' ? 'default' : 'outline'}>
                        {program.status}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-xs text-muted-foreground">Participants</p>
                        <p className="font-medium">{program.currentParticipants}/{program.maxParticipants}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-xs text-muted-foreground">Duration</p>
                        <p className="font-medium">{program.duration} weeks</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-xs text-muted-foreground">Location</p>
                        <p className="font-medium">{program.schedule.location}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Award className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-xs text-muted-foreground">Trainer</p>
                        <p className="font-medium">{program.trainer.name}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="text-sm">
                      <span className="text-muted-foreground">Cost: </span>
                      <span className="font-medium">${program.cost}</span>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        View Details
                      </Button>
                      <Button size="sm">
                        Manage
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="sessions" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Training Sessions</h3>
            <Button onClick={() => scheduleSession} className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Schedule Session
            </Button>
          </div>
          
          <div className="grid gap-4">
            {sessions.map((session) => (
              <Card key={session.id}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-medium">
                        {session.type.charAt(0).toUpperCase() + session.type.slice(1)} Session
                      </h4>
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
                  
                  <div className="grid grid-cols-3 gap-4 mb-3 text-sm">
                    <div className="flex items-center gap-2">
                      <Clock className="h-3 w-3 text-muted-foreground" />
                      <div>
                        <p className="text-muted-foreground">Date & Time</p>
                        <p className="font-medium">
                          {session.date.toLocaleDateString()} {session.date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-3 w-3 text-muted-foreground" />
                      <div>
                        <p className="text-muted-foreground">Duration</p>
                        <p className="font-medium">{session.duration} minutes</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Award className="h-3 w-3 text-muted-foreground" />
                      <div>
                        <p className="text-muted-foreground">Trainer</p>
                        <p className="font-medium">{session.trainerId}</p>
                      </div>
                    </div>
                  </div>
                  
                  {session.performanceMetrics && (
                    <div className="mb-3 p-3 bg-muted/30 rounded">
                      <p className="text-sm font-medium mb-2">Performance Metrics</p>
                      <div className="grid grid-cols-4 gap-2 text-xs">
                        <div>
                          <p className="text-muted-foreground">Endurance</p>
                          <p className="font-medium">{session.performanceMetrics.endurance}/10</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Technique</p>
                          <p className="font-medium">{session.performanceMetrics.technique}/10</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Behavior</p>
                          <p className="font-medium">{session.performanceMetrics.behavior}/10</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Improvement</p>
                          <p className="font-medium">{session.performanceMetrics.improvement}/10</p>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div className="flex justify-end gap-2">
                    <Button size="sm" variant="outline">
                      View Details
                    </Button>
                    {session.status === 'scheduled' && (
                      <Button size="sm">
                        Start Session
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="facilities" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Training Facilities</h3>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Facility
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {facilities.map((facility) => (
              <Card key={facility.id}>
                <CardHeader>
                  <CardTitle className="text-lg">{facility.name}</CardTitle>
                  <Badge variant={
                    facility.status === 'available' ? 'default' :
                    facility.status === 'occupied' ? 'secondary' :
                    facility.status === 'maintenance' ? 'destructive' : 'outline'
                  }>
                    {facility.status}
                  </Badge>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Type:</span>
                      <span className="text-sm font-medium capitalize">{facility.type}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Capacity:</span>
                      <span className="text-sm font-medium">{facility.capacity} horses</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Equipment:</span>
                      <span className="text-sm font-medium">{facility.equipment.length} items</span>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="flex-1">
                      Schedule
                    </Button>
                    <Button size="sm" className="flex-1">
                      Manage
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="assessments" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Training Assessments</h3>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              New Assessment
            </Button>
          </div>
          
          <Card>
            <CardContent className="p-6 text-center">
              <Award className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">Assessment management coming soon</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TrainingManagement;
