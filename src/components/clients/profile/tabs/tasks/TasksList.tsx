
import { Plus, Calendar, User, ClipboardList } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { ClientTask } from "@/types/client";

interface TasksListProps {
  tasks: ClientTask[];
}

const TasksList = ({ tasks }: TasksListProps) => {
  if (!tasks || tasks.length === 0) {
    return (
      <div className="text-center py-8 border rounded-md bg-muted/20">
        <div className="flex justify-center">
          <ClipboardList className="h-8 w-8 text-muted-foreground" />
        </div>
        <p className="mt-2 text-muted-foreground">No tasks created yet</p>
        <Button variant="outline" className="mt-3">
          <Plus className="h-4 w-4 mr-1" /> Create Task
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {tasks.map((task) => (
        <div 
          key={task.id}
          className={`border rounded-md p-3 ${
            task.status === "completed" ? "bg-muted/50" : ""
          }`}
        >
          <div className="flex items-start">
            <div className={`w-2 h-2 rounded-full mt-2 mr-2 ${
              task.priority === "high" ? "bg-red-500" :
              task.priority === "medium" ? "bg-yellow-500" : "bg-green-500"
            }`}></div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <p className={`font-medium ${task.status === "completed" ? "line-through text-muted-foreground" : ""}`}>
                  {task.title}
                </p>
                <Badge variant={
                  task.status === "completed" ? "outline" :
                  task.status === "in_progress" ? "secondary" : "default"  
                }>
                  {task.status}
                </Badge>
              </div>
              {task.description && (
                <p className="text-sm text-muted-foreground mt-1">{task.description}</p>
              )}
              <div className="flex items-center justify-between mt-2">
                {task.due_date && (
                  <div className="flex items-center text-xs">
                    <Calendar className="h-3 w-3 mr-1" />
                    <span>{format(new Date(task.due_date), 'MMM dd, yyyy')}</span>
                  </div>
                )}
                {task.assigned_to && (
                  <div className="flex items-center text-xs">
                    <User className="h-3 w-3 mr-1" />
                    <span>Assigned to: {task.assigned_to}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TasksList;
