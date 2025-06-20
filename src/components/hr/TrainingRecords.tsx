
import { useState } from "react";
import { format } from "date-fns";
import { GraduationCap, Calendar, User, Award } from "lucide-react";
import { Employee } from "@/types/employee";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface TrainingRecordsProps {
  employees: Employee[];
}

const TrainingRecords = ({ employees }: TrainingRecordsProps) => {
  const [selectedEmployee, setSelectedEmployee] = useState<string>("");
  
  // Sample training records data - in a real app this would come from the database
  const trainingRecords = [
    {
      id: "1",
      trainingName: "Safety Training Certification",
      provider: "SafeWork Institute",
      startDate: new Date("2024-01-15"),
      endDate: new Date("2024-01-16"),
      completionStatus: "completed" as const,
      certificateExpiry: new Date("2025-01-15"),
      description: "Workplace safety and emergency procedures"
    },
    {
      id: "2",
      trainingName: "Leadership Development Program",
      provider: "Management Academy",
      startDate: new Date("2024-03-01"),
      endDate: new Date("2024-03-31"),
      completionStatus: "in-progress" as const,
      description: "Advanced leadership and team management skills"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "in-progress":
        return "bg-blue-100 text-blue-800";
      case "scheduled":
        return "bg-yellow-100 text-yellow-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
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
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <GraduationCap className="h-5 w-5 text-blue-600" />
                <h3 className="font-medium">Training Records</h3>
              </div>
              
              <div className="space-y-4">
                {trainingRecords.map((record) => (
                  <Card key={record.id}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h4 className="font-medium text-lg">{record.trainingName}</h4>
                          <p className="text-sm text-muted-foreground">{record.provider}</p>
                        </div>
                        <Badge className={getStatusColor(record.completionStatus)}>
                          {record.completionStatus}
                        </Badge>
                      </div>

                      <div className="grid gap-2 text-sm">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          <span>Start: {format(record.startDate, 'MMM dd, yyyy')}</span>
                        </div>
                        {record.endDate && (
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            <span>End: {format(record.endDate, 'MMM dd, yyyy')}</span>
                          </div>
                        )}
                        {record.certificateExpiry && (
                          <div className="flex items-center gap-2">
                            <Award className="h-4 w-4" />
                            <span>Certificate Expires: {format(record.certificateExpiry, 'MMM dd, yyyy')}</span>
                          </div>
                        )}
                      </div>

                      {record.description && (
                        <p className="text-sm text-muted-foreground mt-3">{record.description}</p>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ) : (
            <p className="text-muted-foreground">Select an employee to view training records.</p>
          )}
        </>
      )}
    </div>
  );
};

export default TrainingRecords;
