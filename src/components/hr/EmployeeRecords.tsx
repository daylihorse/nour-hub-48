
import { useState } from "react";
import { format } from "date-fns";
import { User, Search, UserCog } from "lucide-react";
import { Employee } from "@/types/employee";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface EmployeeRecordsProps {
  employees: Employee[];
}

const EmployeeRecords = ({ employees }: EmployeeRecordsProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);

  const filteredEmployees = employees.filter((employee) => {
    const fullName = `${employee.firstName} ${employee.lastName}`.toLowerCase();
    const searchLower = searchTerm.toLowerCase();
    
    return (
      fullName.includes(searchLower) ||
      employee.email.toLowerCase().includes(searchLower) ||
      employee.department.toLowerCase().includes(searchLower) ||
      employee.position.toLowerCase().includes(searchLower)
    );
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "inactive":
        return "bg-red-100 text-red-800";
      case "on-leave":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <div className="relative flex-grow">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search employees..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline">
          Export
        </Button>
      </div>

      {employees.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="pt-6 text-center">
            <User className="mx-auto h-8 w-8 text-muted-foreground" />
            <p className="mt-2 text-sm text-muted-foreground">
              No employee records found. Add your first employee to get started.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Position</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Hire Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEmployees.map((employee) => (
                <TableRow key={employee.id}>
                  <TableCell>
                    <div className="font-medium">{`${employee.firstName} ${employee.lastName}`}</div>
                    <div className="text-sm text-muted-foreground">{employee.email}</div>
                  </TableCell>
                  <TableCell>{employee.position}</TableCell>
                  <TableCell>{employee.department}</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className={getStatusColor(employee.status)}>
                      {employee.status === "active" ? "Active" :
                       employee.status === "inactive" ? "Inactive" : "On Leave"}
                    </Badge>
                  </TableCell>
                  <TableCell>{format(new Date(employee.hireDate), "MMM d, yyyy")}</TableCell>
                  <TableCell className="text-right">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => setSelectedEmployee(employee)}
                        >
                          <UserCog className="h-4 w-4" />
                          <span className="sr-only">View details</span>
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                          <DialogTitle>Employee Details</DialogTitle>
                        </DialogHeader>
                        {selectedEmployee && (
                          <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-2">
                              <div className="space-y-1">
                                <p className="text-sm font-medium leading-none">Full Name</p>
                                <p className="text-sm text-muted-foreground">
                                  {`${selectedEmployee.firstName} ${selectedEmployee.lastName}`}
                                </p>
                              </div>
                              <div className="space-y-1">
                                <p className="text-sm font-medium leading-none">Position</p>
                                <p className="text-sm text-muted-foreground">{selectedEmployee.position}</p>
                              </div>
                              <div className="space-y-1">
                                <p className="text-sm font-medium leading-none">Email</p>
                                <p className="text-sm text-muted-foreground">{selectedEmployee.email}</p>
                              </div>
                              <div className="space-y-1">
                                <p className="text-sm font-medium leading-none">Phone</p>
                                <p className="text-sm text-muted-foreground">{selectedEmployee.phone}</p>
                              </div>
                              <div className="space-y-1">
                                <p className="text-sm font-medium leading-none">Department</p>
                                <p className="text-sm text-muted-foreground">{selectedEmployee.department}</p>
                              </div>
                              <div className="space-y-1">
                                <p className="text-sm font-medium leading-none">Hire Date</p>
                                <p className="text-sm text-muted-foreground">
                                  {format(new Date(selectedEmployee.hireDate), "MMM d, yyyy")}
                                </p>
                              </div>
                              <div className="space-y-1">
                                <p className="text-sm font-medium leading-none">Status</p>
                                <p className="text-sm">
                                  <Badge variant="secondary" className={getStatusColor(selectedEmployee.status)}>
                                    {selectedEmployee.status === "active" ? "Active" :
                                     selectedEmployee.status === "inactive" ? "Inactive" : "On Leave"}
                                  </Badge>
                                </p>
                              </div>
                            </div>
                          </div>
                        )}
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default EmployeeRecords;
