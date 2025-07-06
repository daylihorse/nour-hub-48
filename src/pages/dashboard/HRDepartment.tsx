
import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import AddEmployee from "@/components/hr/AddEmployee";
import { useEmployees } from "@/hooks/useEmployees";
import EnhancedEmployeeRecords from "@/components/hr/EnhancedEmployeeRecords";
import WorkSchedules from "@/components/hr/WorkSchedules";
import Payroll from "@/components/hr/Payroll";
import PerformanceReviews from "@/components/hr/PerformanceReviews";
import TrainingRecords from "@/components/hr/TrainingRecords";
import { mapDatabaseEmployeesToEmployees, mapEmployeeToDatabaseEmployee } from "@/utils/employeeMapper";

const HRDepartment = () => {
  const { employees: dbEmployees, addEmployee } = useEmployees();
  
  // Convert database employees to component employee type
  const employees = mapDatabaseEmployeesToEmployees(dbEmployees);

  const handleAddEmployee = async (employee: any) => {
    try {
      const dbEmployee = mapEmployeeToDatabaseEmployee(employee);
      await addEmployee(dbEmployee);
    } catch (error) {
      console.error('Error adding employee:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">HR Department</h1>
        <p className="text-muted-foreground">Manage employees, schedules, and payroll</p>
      </div>
      
      <Tabs defaultValue="employees">
        <TabsList className="grid w-full md:w-auto grid-cols-4 md:grid-cols-6">
          <TabsTrigger value="employees">Employees</TabsTrigger>
          <TabsTrigger value="add">Add Employee</TabsTrigger>
          <TabsTrigger value="schedules">Schedules</TabsTrigger>
          <TabsTrigger value="payroll">Payroll</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="training">Training</TabsTrigger>
        </TabsList>

        <TabsContent value="employees">
          <EnhancedEmployeeRecords />
        </TabsContent>

        <TabsContent value="add">
          <AddEmployee onSubmit={handleAddEmployee} />
        </TabsContent>

        <TabsContent value="schedules">
          <Card>
            <CardHeader>
              <CardTitle>Work Schedules</CardTitle>
              <CardDescription>Manage employee work schedules</CardDescription>
            </CardHeader>
            <CardContent>
              <WorkSchedules employees={employees} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payroll">
          <Card>
            <CardHeader>
              <CardTitle>Payroll Management</CardTitle>
              <CardDescription>Track and manage employee payroll</CardDescription>
            </CardHeader>
            <CardContent>
              <Payroll employees={employees} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance">
          <Card>
            <CardHeader>
              <CardTitle>Performance Reviews</CardTitle>
              <CardDescription>Track employee performance and reviews</CardDescription>
            </CardHeader>
            <CardContent>
              <PerformanceReviews employees={employees} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="training">
          <Card>
            <CardHeader>
              <CardTitle>Training Records</CardTitle>
              <CardDescription>Manage employee training and certifications</CardDescription>
            </CardHeader>
            <CardContent>
              <TrainingRecords employees={employees} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default HRDepartment;
