
import { useState } from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Clock, Calendar } from "lucide-react";
import { Employee } from "@/types/employee";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";

interface WorkSchedulesProps {
  employees: Employee[];
}

const WorkSchedules = ({ employees }: WorkSchedulesProps) => {
  const [selectedEmployee, setSelectedEmployee] = useState<string>("");
  
  // Sample schedule data - in a real app this would come from the database
  const schedules = [
    { day: "Monday", startTime: "08:00", endTime: "16:00" },
    { day: "Tuesday", startTime: "08:00", endTime: "16:00" },
    { day: "Wednesday", startTime: "08:00", endTime: "16:00" },
    { day: "Thursday", startTime: "08:00", endTime: "16:00" },
    { day: "Friday", startTime: "08:00", endTime: "16:00" },
  ];

  return (
    <div className="space-y-4">
      {employees.length === 0 ? (
        <p className="text-muted-foreground">No employees available. Add employees to manage schedules.</p>
      ) : (
        <>
          <div className="mb-6">
            <label className="text-sm font-medium mb-1 block">Select Employee</label>
            <Select
              value={selectedEmployee}
              onValueChange={setSelectedEmployee}
            >
              <SelectTrigger className="w-full md:w-[300px]">
                <SelectValue placeholder="Select employee" />
              </SelectTrigger>
              <SelectContent>
                {employees.map((employee) => (
                  <SelectItem key={employee.id} value={employee.id}>
                    {`${employee.firstName} ${employee.lastName}`}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selectedEmployee ? (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-blue-600" />
                <h3 className="font-medium">Weekly Schedule</h3>
              </div>
              
              <div className="grid gap-4">
                {schedules.map((schedule) => (
                  <Card key={schedule.day}>
                    <CardContent className="flex items-center justify-between p-4">
                      <div className="font-medium">{schedule.day}</div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span>{`${schedule.startTime} - ${schedule.endTime}`}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ) : (
            <p className="text-muted-foreground">Select an employee to view or edit their schedule.</p>
          )}
        </>
      )}
    </div>
  );
};

export default WorkSchedules;
