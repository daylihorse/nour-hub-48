
import { useState } from "react";
import { format } from "date-fns";
import { DollarSign, Calendar, User } from "lucide-react";
import { Employee } from "@/types/employee";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";

interface PayrollProps {
  employees: Employee[];
}

const Payroll = ({ employees }: PayrollProps) => {
  const [selectedEmployee, setSelectedEmployee] = useState<string>("");
  
  // Sample payroll data - in a real app this would come from the database
  const payrollRecord = {
    grossPay: 5000,
    deductions: 750,
    netPay: 4250,
    payPeriod: "December 2024",
    payDate: new Date(),
  };

  return (
    <div className="space-y-4">
      {employees.length === 0 ? (
        <p className="text-muted-foreground">No employees available. Add employees to manage payroll.</p>
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
                <DollarSign className="h-5 w-5 text-green-600" />
                <h3 className="font-medium">Payroll Information</h3>
              </div>
              
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <DollarSign className="h-4 w-4 text-green-600" />
                      <span className="text-sm font-medium">Gross Pay</span>
                    </div>
                    <div className="text-2xl font-bold">${payrollRecord.grossPay}</div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <DollarSign className="h-4 w-4 text-red-600" />
                      <span className="text-sm font-medium">Deductions</span>
                    </div>
                    <div className="text-2xl font-bold">${payrollRecord.deductions}</div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <DollarSign className="h-4 w-4 text-blue-600" />
                      <span className="text-sm font-medium">Net Pay</span>
                    </div>
                    <div className="text-2xl font-bold">${payrollRecord.netPay}</div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardContent className="p-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span className="font-medium">Pay Period: {payrollRecord.payPeriod}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span className="font-medium">Pay Date: {format(payrollRecord.payDate, 'MMM dd, yyyy')}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            <p className="text-muted-foreground">Select an employee to view payroll information.</p>
          )}
        </>
      )}
    </div>
  );
};

export default Payroll;
