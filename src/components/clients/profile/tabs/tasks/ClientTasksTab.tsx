import { Plus, ClipboardList } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ClientTask } from "@/types/client";
import TasksList from "./TasksList";

interface ClientTasksTabProps {
  tasks: ClientTask[];
  onAddTask?: () => void;
}

const ClientTasksTab = ({ tasks, onAddTask }: ClientTasksTabProps) => {
  return (
    <>
      <div className="flex items-center justify-between">
        <h3 className="font-medium">Tasks & Reminders</h3>
        <Button variant="outline" size="sm" onClick={onAddTask}>
          <Plus className="h-4 w-4 mr-1" /> Add Task
        </Button>
      </div>
      
      <TasksList tasks={tasks} />
    </>
  );
};

export default ClientTasksTab;
