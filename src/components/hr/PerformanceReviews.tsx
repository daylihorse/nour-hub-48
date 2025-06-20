
import { useState } from "react";
import { format } from "date-fns";
import { Star, Calendar, User } from "lucide-react";
import { Employee } from "@/types/employee";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";

interface PerformanceReviewsProps {
  employees: Employee[];
}

const PerformanceReviews = ({ employees }: PerformanceReviewsProps) => {
  const [selectedEmployee, setSelectedEmployee] = useState<string>("");
  
  // Sample performance review data - in a real app this would come from the database
  const performanceReview = {
    date: new Date(),
    reviewer: "John Manager",
    rating: 4.5,
    strengths: "Excellent communication skills and leadership qualities",
    areasOfImprovement: "Could improve time management skills",
    goals: "Complete project management certification",
    comments: "Overall excellent performance this quarter"
  };

  return (
    <div className="space-y-4">
      {employees.length === 0 ? (
        <p className="text-muted-foreground">No employees available. Add employees to manage performance reviews.</p>
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
                <Star className="h-5 w-5 text-yellow-600" />
                <h3 className="font-medium">Performance Review</h3>
              </div>
              
              <Card>
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span className="font-medium">Review Date: {format(performanceReview.date, 'MMM dd, yyyy')}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      <span className="font-medium">Reviewer: {performanceReview.reviewer}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-yellow-600" />
                    <span className="font-medium">Overall Rating: {performanceReview.rating}/5</span>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <h4 className="font-medium text-green-600 mb-1">Strengths</h4>
                      <p className="text-sm text-muted-foreground">{performanceReview.strengths}</p>
                    </div>

                    <div>
                      <h4 className="font-medium text-orange-600 mb-1">Areas for Improvement</h4>
                      <p className="text-sm text-muted-foreground">{performanceReview.areasOfImprovement}</p>
                    </div>

                    <div>
                      <h4 className="font-medium text-blue-600 mb-1">Goals</h4>
                      <p className="text-sm text-muted-foreground">{performanceReview.goals}</p>
                    </div>

                    <div>
                      <h4 className="font-medium mb-1">Comments</h4>
                      <p className="text-sm text-muted-foreground">{performanceReview.comments}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            <p className="text-muted-foreground">Select an employee to view performance reviews.</p>
          )}
        </>
      )}
    </div>
  );
};

export default PerformanceReviews;
