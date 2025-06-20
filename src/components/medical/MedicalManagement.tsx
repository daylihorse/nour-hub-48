
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  Activity, 
  Syringe, 
  Pill, 
  UserCheck, 
  AlertTriangle,
  Calendar,
  FileText,
  Shield,
  Stethoscope
} from "lucide-react";
import VaccinationManagement from "./VaccinationManagement";
import VeterinarianManagement from "./VeterinarianManagement";
import MedicationManagement from "./MedicationManagement";
import MedicalAlertsManagement from "./MedicalAlertsManagement";
import MedicalDashboard from "./MedicalDashboard";

const MedicalManagement = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  const tabsConfig = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: Activity,
      component: MedicalDashboard,
      description: "Medical overview and key metrics"
    },
    {
      id: "vaccinations",
      label: "Vaccinations",
      icon: Syringe,
      component: VaccinationManagement,
      description: "Manage vaccination records and schedules"
    },
    {
      id: "medications",
      label: "Medications",
      icon: Pill,
      component: MedicationManagement,
      description: "Track medications and treatments"
    },
    {
      id: "veterinarians",
      label: "Veterinarians",
      icon: UserCheck,
      component: VeterinarianManagement,
      description: "Manage veterinarian contacts"
    },
    {
      id: "alerts",
      label: "Medical Alerts",
      icon: AlertTriangle,
      component: MedicalAlertsManagement,
      description: "Health alerts and notifications"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Medical Management</h1>
          <p className="text-muted-foreground">
            Comprehensive health and medical record management system
          </p>
        </div>
        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
          <Shield className="h-3 w-3 mr-1" />
          Medical Module Active
        </Badge>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          {tabsConfig.map((tab) => (
            <TabsTrigger key={tab.id} value={tab.id} className="flex items-center gap-2">
              <tab.icon className="h-4 w-4" />
              <span className="hidden sm:inline">{tab.label}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        {tabsConfig.map((tab) => (
          <TabsContent key={tab.id} value={tab.id} className="space-y-6">
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <tab.icon className="h-5 w-5 text-primary" />
                  <CardTitle>{tab.label}</CardTitle>
                </div>
                <p className="text-sm text-muted-foreground">{tab.description}</p>
              </CardHeader>
              <CardContent>
                <tab.component />
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default MedicalManagement;
