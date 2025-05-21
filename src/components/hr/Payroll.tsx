
import { useState } from "react";
import { format } from "date-fns";
import { DollarSign, Calendar } from "lucide-react";
import { Employee } from "@/types/employee";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

interface PayrollProps {
  employees: Employee[];
}

const Payroll = ({ employees }: PayrollProps) => {
  const [selectedMonth, setSelectedMonth] = useState<string>(format(new Date(), "yyyy-MM"));
  
  // Sample payroll data - in a real app this would come from a database
  const payrollRecords = employees.map(employee => ({
    id: `payroll-${employee.id}`,
    employeeId: employee.id,
    employeeName: `${employee.firstName} ${employee.lastName}`,
    payPeriodStart: new Date(2023, 4, 1),
    payPeriodEnd: new Date(2023, 4, 15),
    grossPay: 2500 + Math.random() * 1000,
    deductions: 500 + Math.random() * 200,
    netPay: 2000 + Math.random() * 800,
    paymentDate: new Date(2023, 4, 20),
    status: "paid"
  }));

  // Months for the selector
  const months = [
    { value: "2023-05", label: "May 2023" },
    { value: "2023-06", label: "June 2023" },
    { value: "2023-07", label: "July 2023" },
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  return (
    <div className="space-y-4">
      {employees.length === 0 ? (
        <p className="text-muted-foreground">No employees available. Add employees to manage payroll.</p>
      ) : (
        <>
          <div className="flex items-center gap-4">
            <div>
              <label className="text-sm font-medium mb-1 block">Pay Period</label>
              <Select
                value={selectedMonth}
                onValueChange={setSelectedMonth}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select month" />
                </SelectTrigger>
                <SelectContent>
                  {months.map((month) => (
                    <SelectItem key={month.value} value={month.value}>
                      {month.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Card className="flex-1">
              <CardContent className="flex items-center justify-between p-4">
                <div>
                  <p className="text-sm text-muted-foreground">Total Payroll</p>
                  <p className="text-2xl font-bold">{formatCurrency(payrollRecords.reduce((sum, r) => sum + r.netPay, 0))}</p>
                </div>
                <DollarSign className="h-8 w-8 text-green-500" />
              </CardContent>
            </Card>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employee</TableHead>
                  <TableHead>Pay Period</TableHead>
                  <TableHead className="text-right">Gross Pay</TableHead>
                  <TableHead className="text-right">Deductions</TableHead>
                  <TableHead className="text-right">Net Pay</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {payrollRecords.map((record) => (
                  <TableRow key={record.id}>
                    <TableCell>{record.employeeName}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                        <span>{`${format(record.payPeriodStart, "MMM d")} - ${format(record.payPeriodEnd, "MMM d, yyyy")}`}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">{formatCurrency(record.grossPay)}</TableCell>
                    <TableCell className="text-right">{formatCurrency(record.deductions)}</TableCell>
                    <TableCell className="text-right font-medium">{formatCurrency(record.netPay)}</TableCell>
                    <TableCell>
                      <Badge className="bg-green-100 text-green-800">Paid</Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </>
      )}
    </div>
  );
};

export default Payroll;
