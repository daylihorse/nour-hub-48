
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
import { useLanguage } from "@/contexts/LanguageContext";

const HRDepartment = () => {
  const { employees: dbEmployees, addEmployee } = useEmployees();
  const { t } = useLanguage();
  
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
        <h1 className="text-3xl font-bold">{t('hr.department')}</h1>
        <p className="text-muted-foreground">{t('hr.description')}</p>
      </div>
      
      <Tabs defaultValue="employees">
        <TabsList className="grid w-full md:w-auto grid-cols-4 md:grid-cols-6">
          <TabsTrigger value="employees">{t('hr.employees')}</TabsTrigger>
          <TabsTrigger value="add">{t('hr.add_employee')}</TabsTrigger>
          <TabsTrigger value="schedules">{t('hr.schedules')}</TabsTrigger>
          <TabsTrigger value="payroll">{t('hr.payroll')}</TabsTrigger>
          <TabsTrigger value="performance">{t('hr.performance')}</TabsTrigger>
          <TabsTrigger value="training">{t('hr.training')}</TabsTrigger>
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
              <CardTitle>{t('hr.work_schedules')}</CardTitle>
              <CardDescription>{t('hr.work_schedules_desc')}</CardDescription>
            </CardHeader>
            <CardContent>
              <WorkSchedules employees={employees} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payroll">
          <Card>
            <CardHeader>
              <CardTitle>{t('hr.payroll_management')}</CardTitle>
              <CardDescription>{t('hr.payroll_desc')}</CardDescription>
            </CardHeader>
            <CardContent>
              <Payroll employees={employees} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance">
          <Card>
            <CardHeader>
              <CardTitle>{t('hr.performance_reviews')}</CardTitle>
              <CardDescription>{t('hr.performance_desc')}</CardDescription>
            </CardHeader>
            <CardContent>
              <PerformanceReviews employees={employees} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="training">
          <Card>
            <CardHeader>
              <CardTitle>{t('hr.training_records')}</CardTitle>
              <CardDescription>{t('hr.training_desc')}</CardDescription>
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
