
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Plus, Stethoscope, Pill, Syringe, AlertTriangle, UserCheck } from "lucide-react";
import VaccinationManagement from "./VaccinationManagement";
import MedicationManagement from "./MedicationManagement";
import VeterinarianManagement from "./VeterinarianManagement";
import MedicalAlerts from "./MedicalAlerts";
import MedicalDashboard from "./MedicalDashboard";

const MedicalManagement = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Medical Management</h1>
          <p className="text-muted-foreground">
            Comprehensive health and medical record management system
          </p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="dashboard" className="flex items-center gap-2">
            <Stethoscope className="h-4 w-4" />
            Dashboard
          </TabsTrigger>
          <TabsTrigger value="vaccinations" className="flex items-center gap-2">
            <Syringe className="h-4 w-4" />
            Vaccinations
          </TabsTrigger>
          <TabsTrigger value="medications" className="flex items-center gap-2">
            <Pill className="h-4 w-4" />
            Medications
          </TabsTrigger>
          <TabsTrigger value="veterinarians" className="flex items-center gap-2">
            <UserCheck className="h-4 w-4" />
            Veterinarians
          </TabsTrigger>
          <TabsTrigger value="alerts" className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" />
            Alerts
          </TabsTrigger>
          <TabsTrigger value="reports">
            Reports
          </TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="space-y-6">
          <MedicalDashboard />
        </TabsContent>

        <TabsContent value="vaccinations" className="space-y-6">
          <VaccinationManagement />
        </TabsContent>

        <TabsContent value="medications" className="space-y-6">
          <MedicationManagement />
        </TabsContent>

        <TabsContent value="veterinarians" className="space-y-6">
          <VeterinarianManagement />
        </TabsContent>

        <TabsContent value="alerts" className="space-y-6">
          <MedicalAlerts />
        </TabsContent>

        <TabsContent value="reports" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Medical Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  Generate comprehensive medical reports for your horses.
                </p>
                <div className="flex gap-2">
                  <Button variant="outline">Vaccination Report</Button>
                  <Button variant="outline">Medication Report</Button>
                  <Button variant="outline">Health Summary</Button>
                  <Button variant="outline">Cost Analysis</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MedicalManagement;
