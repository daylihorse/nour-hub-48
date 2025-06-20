
import { useState } from "react";
import { format } from "date-fns";
import { Users, Search, Filter, Eye } from "lucide-react";
import { Employee } from "@/types/employee";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface EmployeeRecordsProps {
  employees: Employee[];
}

const EmployeeRecords = ({ employees }: EmployeeRecordsProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);

  const filteredEmployees = employees.filter(employee =>
    `${employee.firstName} ${employee.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.position?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadgeColor = (status: string) => {
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
      {employees.length === 0 ? (
        <div className="text-center py-8">
          <Users className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">No Employee Records</h3>
          <p className="text-muted-foreground">Add employees to start managing their records.</p>
        </div>
      ) : (
        <>
          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search employees..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>

          <div className="grid gap-4">
            {filteredEmployees.map((employee) => (
              <Card key={employee.id}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <Users className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">
                          {employee.firstName} {employee.lastName}
                        </h3>
                        <p className="text-muted-foreground">{employee.position}</p>
                        <p className="text-sm text-muted-foreground">{employee.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge className={getStatusBadgeColor(employee.status)}>
                        {employee.status}
                      </Badge>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => setSelectedEmployee(employee)}
                          >
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Employee Details</DialogTitle>
                          </DialogHeader>
                          {selectedEmployee && (
                            <div className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <label className="text-sm font-medium">Name</label>
                                  <p className="text-sm text-muted-foreground">
                                    {selectedEmployee.firstName} {selectedEmployee.lastName}
                                  </p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium">Email</label>
                                  <p className="text-sm text-muted-foreground">{selectedEmployee.email}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium">Position</label>
                                  <p className="text-sm text-muted-foreground">{selectedEmployee.position}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium">Status</label>
                                  <Badge className={getStatusBadgeColor(selectedEmployee.status)}>
                                    {selectedEmployee.status}
                                  </Badge>
                                </div>
                                <div>
                                  <label className="text-sm font-medium">Hire Date</label>
                                  <p className="text-sm text-muted-foreground">
                                    {format(selectedEmployee.hireDate, 'MMM dd, yyyy')}
                                  </p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium">Department</label>
                                  <p className="text-sm text-muted-foreground">
                                    {selectedEmployee.department.join(', ')}
                                  </p>
                                </div>
                              </div>
                              {selectedEmployee.phones.length > 0 && (
                                <div>
                                  <label className="text-sm font-medium">Phone Numbers</label>
                                  <div className="space-y-1">
                                    {selectedEmployee.phones.map((phone, index) => (
                                      <p key={index} className="text-sm text-muted-foreground">
                                        +{phone.countryCode} {phone.number}
                                        {phone.hasWhatsapp && " (WhatsApp)"}
                                        {phone.hasTelegram && " (Telegram)"}
                                      </p>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default EmployeeRecords;
