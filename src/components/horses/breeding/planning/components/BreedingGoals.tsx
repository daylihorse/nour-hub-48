
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Target, Plus, Calendar, TrendingUp } from "lucide-react";

interface BreedingGoal {
  id: string;
  title: string;
  target: string;
  progress: number;
  deadline: string;
  priority: string;
}

interface BreedingGoalsProps {
  goals: BreedingGoal[];
}

const BreedingGoals = ({ goals }: BreedingGoalsProps) => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "destructive";
      case "medium": return "default";
      case "low": return "secondary";
      default: return "outline";
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return "text-green-600";
    if (progress >= 50) return "text-yellow-600";
    return "text-red-600";
  };

  const getDaysUntilDeadline = (deadline: string) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">Breeding Goals & Targets</h3>
          <p className="text-sm text-muted-foreground">Track progress towards breeding objectives</p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Goal
        </Button>
      </div>

      {/* Goals List */}
      <div className="space-y-4">
        {goals.map((goal) => {
          const daysLeft = getDaysUntilDeadline(goal.deadline);
          return (
            <Card key={goal.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Target className="h-5 w-5 text-blue-500" />
                    {goal.title}
                  </CardTitle>
                  <Badge variant={getPriorityColor(goal.priority) as any}>
                    {goal.priority} priority
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Target Description */}
                <div className="text-sm text-muted-foreground">
                  <strong>Target:</strong> {goal.target}
                </div>

                {/* Progress */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Progress</span>
                    <span className={`text-sm font-bold ${getProgressColor(goal.progress)}`}>
                      {goal.progress}%
                    </span>
                  </div>
                  <Progress value={goal.progress} className="h-2" />
                </div>

                {/* Timeline */}
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    Deadline: {new Date(goal.deadline).toLocaleDateString()}
                  </div>
                  <div className={`flex items-center gap-1 ${daysLeft < 30 ? 'text-red-600' : 'text-muted-foreground'}`}>
                    <span>{daysLeft > 0 ? `${daysLeft} days left` : 'Overdue'}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    View Details
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    Update Progress
                  </Button>
                  <Button size="sm" className="flex-1">
                    Edit Goal
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Summary Statistics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-green-500" />
            Goals Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{goals.length}</div>
              <p className="text-sm text-muted-foreground">Active Goals</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {goals.filter(g => g.progress >= 80).length}
              </div>
              <p className="text-sm text-muted-foreground">On Track</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">
                {goals.filter(g => g.progress >= 50 && g.progress < 80).length}
              </div>
              <p className="text-sm text-muted-foreground">In Progress</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">
                {goals.filter(g => g.progress < 50).length}
              </div>
              <p className="text-sm text-muted-foreground">Needs Attention</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BreedingGoals;
