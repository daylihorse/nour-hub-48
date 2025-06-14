
import { Plus, Calendar, User, ClipboardList } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { ClientTask } from "@/types/client";

interface ClientTasksTabProps {
  tasks: ClientTask[];
}

const ClientTasksTab = ({ tasks }: ClientTasksTabProps) => {
  return (
    <>
      <div className="flex items-center justify-between">
        <h3 className="font-medium">Tasks & Reminders</h3>
        <Button variant="outline" size="sm">
          <Plus className="h-4 w-4 mr-1" /> Add Task
        </Button>
      </div>
      
      {tasks && tasks.length ? (
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
                      task.status === "in-progress" ? "secondary" : "default"  
                    }>
                      {task.status}
                    </Badge>
                  </div>
                  {task.description && (
                    <p className="text-sm text-muted-foreground mt-1">{task.description}</p>
                  )}
                  <div className="flex items-center justify-between mt-2">
                    {task.dueDate && (
                      <div className="flex items-center text-xs">
                        <Calendar className="h-3 w-3 mr-1" />
                        <span>{format(new Date(task.dueDate), 'MMM dd, yyyy')}</span>
                      </div>
                    )}
                    {task.assignedTo && (
                      <div className="flex items-center text-xs">
                        <User className="h-3 w-3 mr-1" />
                        <span>Assigned to: {task.assignedTo}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 border rounded-md bg-muted/20">
          <div className="flex justify-center">
            <ClipboardList className="h-8 w-8 text-muted-foreground" />
          </div>
          <p className="mt-2 text-muted-foreground">No tasks created yet</p>
          <Button variant="outline" className="mt-3">
            <Plus className="h-4 w-4 mr-1" /> Create Task
          </Button>
        </div>
      )}
    </>
  );
};

export default ClientTasksTab;
