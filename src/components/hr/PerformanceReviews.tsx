
import { useState } from "react";
import { format } from "date-fns";
import { Award, FileText } from "lucide-react";
import { Employee } from "@/types/employee";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface PerformanceReviewsProps {
  employees: Employee[];
}

const PerformanceReviews = ({ employees }: PerformanceReviewsProps) => {
  const [selectedEmployee, setSelectedEmployee] = useState<string>("");
  
  // Sample review data - in a real app this would come from a database
  const sampleReviews = [
    {
      id: "rev1",
      employeeId: employees[0]?.id || "",
      date: new Date(2023, 3, 15),
      reviewer: "Jane Smith",
      rating: 4,
      strengths: "Great communication skills, excellent problem-solving",
      areasOfImprovement: "Could improve technical documentation",
      goals: "Complete advanced training by Q3",
      comments: "Overall excellent performance this quarter"
    },
    {
      id: "rev2",
      employeeId: employees[0]?.id || "",
      date: new Date(2022, 9, 10),
      reviewer: "Michael Johnson",
      rating: 3,
      strengths: "Consistent delivery, good team player",
      areasOfImprovement: "Time management could be improved",
      goals: "Take on more leadership responsibilities",
      comments: "Solid performance with room for growth"
    }
  ];

  const reviews = sampleReviews.filter(review => 
    employees.length > 0 && review.employeeId === selectedEmployee
  );

  const renderRatingStars = (rating: number) => {
    return Array(5).fill(0).map((_, i) => (
      <span key={i} className={i < rating ? "text-yellow-500" : "text-gray-300"}>★</span>
    ));
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
            <>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-purple-600" />
                  <h3 className="font-medium">Performance Reviews</h3>
                </div>
                <Button size="sm">
                  <FileText className="h-4 w-4 mr-2" />
                  New Review
                </Button>
              </div>

              {reviews.length > 0 ? (
                <div className="grid gap-4">
                  {reviews.map((review) => (
                    <Card key={review.id}>
                      <CardContent className="pt-6">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="text-sm text-muted-foreground">
                              {format(review.date, "MMMM d, yyyy")} • Reviewed by {review.reviewer}
                            </p>
                            <div className="text-lg mt-1">
                              {renderRatingStars(review.rating)}
                            </div>
                          </div>
                        </div>
                        
                        <div className="mt-4 space-y-2">
                          <div>
                            <p className="text-sm font-medium">Strengths:</p>
                            <p className="text-sm text-muted-foreground">{review.strengths}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium">Areas for Improvement:</p>
                            <p className="text-sm text-muted-foreground">{review.areasOfImprovement}</p>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="border-t bg-muted/50">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm" className="w-full">
                              View Full Review
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Performance Review Details</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div>
                                <p className="text-sm font-medium">Review Date</p>
                                <p className="text-sm text-muted-foreground">{format(review.date, "MMMM d, yyyy")}</p>
                              </div>
                              <div>
                                <p className="text-sm font-medium">Rating</p>
                                <div className="text-lg">{renderRatingStars(review.rating)}</div>
                              </div>
                              <div>
                                <p className="text-sm font-medium">Strengths</p>
                                <p className="text-sm text-muted-foreground">{review.strengths}</p>
                              </div>
                              <div>
                                <p className="text-sm font-medium">Areas for Improvement</p>
                                <p className="text-sm text-muted-foreground">{review.areasOfImprovement}</p>
                              </div>
                              <div>
                                <p className="text-sm font-medium">Goals</p>
                                <p className="text-sm text-muted-foreground">{review.goals}</p>
                              </div>
                              <div>
                                <p className="text-sm font-medium">Additional Comments</p>
                                <p className="text-sm text-muted-foreground">{review.comments}</p>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card className="border-dashed">
                  <CardContent className="pt-6 text-center">
                    <FileText className="mx-auto h-8 w-8 text-muted-foreground" />
                    <p className="mt-2 text-sm text-muted-foreground">
                      No performance reviews found for this employee.
                    </p>
                  </CardContent>
                </Card>
              )}
            </>
          ) : (
            <p className="text-muted-foreground">Select an employee to view performance reviews.</p>
          )}
        </>
      )}
    </div>
  );
};

export default PerformanceReviews;
