
import { useState } from "react";
import { format } from "date-fns";
import { BookOpen, Calendar, CheckCircle, Clock } from "lucide-react";
import { Employee } from "@/types/employee";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface TrainingRecordsProps {
  employees: Employee[];
}

const TrainingRecords = ({ employees }: TrainingRecordsProps) => {
  const [selectedEmployee, setSelectedEmployee] = useState<string>("");

  // Sample training data - in a real app this would come from a database
  const sampleTrainings = [
    {
      id: "tr1",
      employeeId: employees[0]?.id || "",
      trainingName: "First Aid Certification",
      provider: "Red Cross",
      startDate: new Date(2023, 2, 10),
      endDate: new Date(2023, 2, 12),
      completionStatus: "completed",
      certificateExpiry: new Date(2024, 2, 12),
      description: "Basic first aid training and CPR certification"
    },
    {
      id: "tr2",
      employeeId: employees[0]?.id || "",
      trainingName: "Equine Health Management",
      provider: "Equestrian Excellence Institute",
      startDate: new Date(2023, 4, 15),
      endDate: undefined,
      completionStatus: "in-progress",
      description: "Advanced course on horse health management and preventative care"
    },
    {
      id: "tr3",
      employeeId: employees[0]?.id || "",
      trainingName: "Safety Protocols",
      provider: "Stable Safety Association",
      startDate: new Date(2023, 6, 5),
      endDate: undefined,
      completionStatus: "scheduled",
      description: "Workshop on stable safety and emergency procedures"
    }
  ];

  const trainings = sampleTrainings.filter(training => 
    employees.length > 0 && training.employeeId === selectedEmployee
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "in-progress":
        return "bg-blue-100 text-blue-800";
      case "scheduled":
        return "bg-purple-100 text-purple-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className={getStatusColor(status)}>Completed</Badge>;
      case "in-progress":
        return <Badge className={getStatusColor(status)}>In Progress</Badge>;
      case "scheduled":
        return <Badge className={getStatusColor(status)}>Scheduled</Badge>;
      case "cancelled":
        return <Badge className={getStatusColor(status)}>Cancelled</Badge>;
      default:
        return <Badge className={getStatusColor("default")}>Unknown</Badge>;
    }
  };

  const getCompletionIndicator = (status: string) => {
    switch (status) {
      case "completed":
        return (
          <div className="flex items-center gap-1">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <span className="text-sm text-muted-foreground">Completed</span>
          </div>
        );
      case "in-progress":
        return <Progress value={65} className="h-2" />;
      case "scheduled":
        return (
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4 text-purple-500" />
            <span className="text-sm text-muted-foreground">Upcoming</span>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-4">
      {employees.length === 0 ? (
        <p className="text-muted-foreground">No employees available. Add employees to manage training records.</p>
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
            <>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-teal-600" />
                  <h3 className="font-medium">Training Records</h3>
                </div>
                <Button size="sm">
                  <BookOpen className="h-4 w-4 mr-2" />
                  New Training
                </Button>
              </div>

              {trainings.length > 0 ? (
                <div className="grid gap-4">
                  {trainings.map((training) => (
                    <Card key={training.id}>
                      <CardContent className="p-5">
                        <div className="flex justify-between">
                          <div>
                            <h4 className="font-medium">{training.trainingName}</h4>
                            <p className="text-sm text-muted-foreground">
                              Provider: {training.provider}
                            </p>
                          </div>
                          <div>
                            {getStatusBadge(training.completionStatus as string)}
                          </div>
                        </div>

                        <div className="mt-4 space-y-2">
                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm text-muted-foreground">
                                {format(training.startDate, "MMM d, yyyy")}
                                {training.endDate ? ` - ${format(training.endDate, "MMM d, yyyy")}` : ""}
                              </span>
                            </div>
                            
                            {training.certificateExpiry && (
                              <div className="flex items-center gap-1">
                                <Clock className="h-4 w-4 text-amber-500" />
                                <span className="text-sm">
                                  Expires: {format(training.certificateExpiry, "MMM d, yyyy")}
                                </span>
                              </div>
                            )}
                          </div>
                          
                          <p className="text-sm text-muted-foreground pt-2">
                            {training.description}
                          </p>
                          
                          <div className="pt-2">
                            {getCompletionIndicator(training.completionStatus as string)}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card className="border-dashed">
                  <CardContent className="pt-6 text-center">
                    <BookOpen className="mx-auto h-8 w-8 text-muted-foreground" />
                    <p className="mt-2 text-sm text-muted-foreground">
                      No training records found for this employee.
                    </p>
                  </CardContent>
                </Card>
              )}
            </>
          ) : (
            <p className="text-muted-foreground">Select an employee to view training records.</p>
          )}
        </>
      )}
    </div>
  );
};

export default TrainingRecords;
