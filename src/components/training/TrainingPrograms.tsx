
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Target, Search, Users, Calendar, Clock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useTrainingData } from "@/hooks/useTrainingData";

const TrainingPrograms = () => {
  const { programs, isLoading } = useTrainingData();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPrograms = programs.filter(program =>
    program.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    program.discipline.toLowerCase().includes(searchTerm.toLowerCase()) ||
    program.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'basic': return 'bg-blue-100 text-blue-800';
      case 'intermediate': return 'bg-green-100 text-green-800';
      case 'advanced': return 'bg-purple-100 text-purple-800';
      case 'specialized': return 'bg-orange-100 text-orange-800';
      case 'rehabilitation': return 'bg-red-100 text-red-800';
      case 'competition_prep': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getIntensityColor = (intensity: string) => {
    switch (intensity) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Training Programs</h2>
          <p className="text-muted-foreground">Manage and track training programs</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Create Program
        </Button>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search programs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="grid gap-4">
        {filteredPrograms.map((program) => (
          <Card key={program.id}>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Target className="h-4 w-4 text-blue-500" />
                    <h3 className="font-semibold">{program.name}</h3>
                    <Badge className={getTypeColor(program.type)}>
                      {program.type.replace('_', ' ')}
                    </Badge>
                    <Badge className={getIntensityColor(program.intensity)}>
                      {program.intensity} intensity
                    </Badge>
                  </div>

                  <p className="text-sm text-muted-foreground">{program.description}</p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-muted-foreground">
                    <div className="space-y-1">
                      <p><strong>Discipline:</strong> {program.discipline}</p>
                      <p><strong>Duration:</strong> {program.duration} weeks</p>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        <span>Participants: {program.currentParticipants}/{program.maxParticipants}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <span>Start: {program.startDate.toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <p><strong>Trainer:</strong> {program.trainer.name}</p>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>Schedule: {program.schedule.days.join(', ')}</span>
                      </div>
                    </div>
                  </div>

                  {program.requirements && (
                    <div className="pt-2 border-t">
                      <p className="text-sm text-muted-foreground">
                        <strong>Requirements:</strong> Min age {program.requirements.minimumAge} years, 
                        {program.requirements.healthClearance && ' Health clearance required,'}
                        {' '}{program.requirements.experienceLevel} level
                      </p>
                    </div>
                  )}
                </div>

                <div className="text-right space-y-1">
                  <p className="text-sm font-medium">${program.cost}</p>
                  <Badge variant={program.status === 'active' ? 'default' : 'secondary'}>
                    {program.status}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {filteredPrograms.length === 0 && (
          <Card>
            <CardContent className="p-8 text-center">
              <Target className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium mb-2">No programs found</h3>
              <p className="text-muted-foreground mb-4">
                {searchTerm ? "No programs match your search." : "Start by creating training programs."}
              </p>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Create First Program
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default TrainingPrograms;
