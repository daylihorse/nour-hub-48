
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ClinicDashboard from "@/components/clinic/ClinicDashboard";

const ClinicDepartment = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Clinic Department</h1>
        <p className="text-muted-foreground">Comprehensive veterinary care and patient management</p>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="appointments">Appointments</TabsTrigger>
          <TabsTrigger value="patients">Patient Records</TabsTrigger>
          <TabsTrigger value="treatments">Treatments</TabsTrigger>
          <TabsTrigger value="surgery">Surgery</TabsTrigger>
          <TabsTrigger value="pharmacy">Pharmacy</TabsTrigger>
        </TabsList>
        
        <TabsContent value="dashboard" className="mt-6">
          <ClinicDashboard />
        </TabsContent>
        
        <TabsContent value="appointments" className="mt-6">
          <div className="text-center py-12">
            <h3 className="text-lg font-semibold mb-2">Appointment Management</h3>
            <p className="text-muted-foreground">Schedule and manage veterinary appointments</p>
          </div>
        </TabsContent>
        
        <TabsContent value="patients" className="mt-6">
          <div className="text-center py-12">
            <h3 className="text-lg font-semibold mb-2">Patient Records</h3>
            <p className="text-muted-foreground">Comprehensive medical records and history</p>
          </div>
        </TabsContent>
        
        <TabsContent value="treatments" className="mt-6">
          <div className="text-center py-12">
            <h3 className="text-lg font-semibold mb-2">Treatment Plans</h3>
            <p className="text-muted-foreground">Manage treatment protocols and medications</p>
          </div>
        </TabsContent>
        
        <TabsContent value="surgery" className="mt-6">
          <div className="text-center py-12">
            <h3 className="text-lg font-semibold mb-2">Surgical Procedures</h3>
            <p className="text-muted-foreground">Schedule and track surgical operations</p>
          </div>
        </TabsContent>
        
        <TabsContent value="pharmacy" className="mt-6">
          <div className="text-center py-12">
            <h3 className="text-lg font-semibold mb-2">Pharmacy Management</h3>
            <p className="text-muted-foreground">Medication inventory and prescriptions</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ClinicDepartment;
