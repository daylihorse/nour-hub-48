import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import ClinicDashboard from "@/components/clinic/ClinicDashboard";
import ClinicIntegrationPanel from "@/components/integration/ClinicIntegrationPanel";
import ClinicHorseUpdatePanel from "@/components/integration/ClinicHorseUpdatePanel";
import StoreManagement from "@/components/store/StoreManagement";
import { 
  Stethoscope, 
  Calendar, 
  FileText, 
  Syringe, 
  Scissors, 
  Pill,
  Activity,
  Heart,
  Users,
  Store
} from "lucide-react";

const ClinicDepartment = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  const stats = [
    {
      title: "Today's Appointments",
      value: "12",
      icon: Calendar,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Active Patients",
      value: "89",
      icon: Heart,
      color: "text-red-600",
      bgColor: "bg-red-50",
    },
    {
      title: "Pending Results",
      value: "5",
      icon: FileText,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
    {
      title: "Emergency Cases",
      value: "2",
      icon: Activity,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-emerald-100 rounded-xl">
                <Stethoscope className="h-8 w-8 text-emerald-600" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-slate-900">Clinic Department</h1>
                <p className="text-lg text-slate-600 mt-1">
                  Comprehensive veterinary care and patient management system
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="px-4 py-2 text-sm font-medium">
                <Users className="h-4 w-4 mr-2" />
                Active Staff: 8
              </Badge>
              <Badge className="px-4 py-2 text-sm font-medium bg-emerald-100 text-emerald-700 hover:bg-emerald-200">
                System Online
              </Badge>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card key={index} className="border-none shadow-md hover:shadow-lg transition-all duration-200">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-slate-600 mb-1">{stat.title}</p>
                        <p className="text-3xl font-bold text-slate-900">{stat.value}</p>
                      </div>
                      <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                        <Icon className={`h-6 w-6 ${stat.color}`} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Integration Dashboard */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Department Integration</h2>
            <p className="text-slate-600">Real-time synchronization with other departments</p>
          </div>
          
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            <ClinicIntegrationPanel />
            <ClinicHorseUpdatePanel />
          </div>
        </div>

        <Separator className="my-8" />

        {/* Main Content Tabs */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="bg-slate-50 px-8 pt-6">
              <TabsList className="grid w-full grid-cols-7 bg-slate-900 border border-slate-700 p-1.5 h-14 rounded-xl">
                <TabsTrigger 
                  value="dashboard" 
                  className="text-white data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-lg font-semibold transition-all duration-200 flex items-center gap-2"
                >
                  <Activity className="h-4 w-4" />
                  Dashboard
                </TabsTrigger>
                <TabsTrigger 
                  value="appointments" 
                  className="text-white data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-lg font-semibold transition-all duration-200 flex items-center gap-2"
                >
                  <Calendar className="h-4 w-4" />
                  Appointments
                </TabsTrigger>
                <TabsTrigger 
                  value="patients" 
                  className="text-white data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-lg font-semibold transition-all duration-200 flex items-center gap-2"
                >
                  <FileText className="h-4 w-4" />
                  Patient Records
                </TabsTrigger>
                <TabsTrigger 
                  value="treatments" 
                  className="text-white data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-lg font-semibold transition-all duration-200 flex items-center gap-2"
                >
                  <Syringe className="h-4 w-4" />
                  Treatments
                </TabsTrigger>
                <TabsTrigger 
                  value="surgery" 
                  className="text-white data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-lg font-semibold transition-all duration-200 flex items-center gap-2"
                >
                  <Scissors className="h-4 w-4" />
                  Surgery
                </TabsTrigger>
                <TabsTrigger 
                  value="pharmacy" 
                  className="text-white data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-lg font-semibold transition-all duration-200 flex items-center gap-2"
                >
                  <Pill className="h-4 w-4" />
                  Pharmacy
                </TabsTrigger>
                <TabsTrigger 
                  value="store" 
                  className="text-white data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-lg font-semibold transition-all duration-200 flex items-center gap-2"
                >
                  <Store className="h-4 w-4" />
                  Store
                </TabsTrigger>
              </TabsList>
            </div>
            
            <div className="p-8">
              <TabsContent value="dashboard" className="mt-0">
                <ClinicDashboard />
              </TabsContent>
              
              <TabsContent value="appointments" className="mt-0">
                <Card className="border-none shadow-lg">
                  <CardHeader className="pb-6">
                    <CardTitle className="flex items-center gap-3 text-2xl">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <Calendar className="h-6 w-6 text-blue-600" />
                      </div>
                      Appointment Management
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-16">
                      <Calendar className="h-16 w-16 mx-auto text-slate-400 mb-4" />
                      <h3 className="text-xl font-semibold mb-2 text-slate-700">Schedule and Manage Appointments</h3>
                      <p className="text-slate-500 max-w-md mx-auto">
                        Efficiently organize veterinary appointments, track patient visits, and coordinate with the horses department for seamless care.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="patients" className="mt-0">
                <Card className="border-none shadow-lg">
                  <CardHeader className="pb-6">
                    <CardTitle className="flex items-center gap-3 text-2xl">
                      <div className="p-2 bg-green-100 rounded-lg">
                        <FileText className="h-6 w-6 text-green-600" />
                      </div>
                      Patient Records Management
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-16">
                      <FileText className="h-16 w-16 mx-auto text-slate-400 mb-4" />
                      <h3 className="text-xl font-semibold mb-2 text-slate-700">Comprehensive Medical Records</h3>
                      <p className="text-slate-500 max-w-md mx-auto">
                        Maintain detailed medical histories, track treatment progress, and ensure complete documentation for all patients.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="treatments" className="mt-0">
                <Card className="border-none shadow-lg">
                  <CardHeader className="pb-6">
                    <CardTitle className="flex items-center gap-3 text-2xl">
                      <div className="p-2 bg-purple-100 rounded-lg">
                        <Syringe className="h-6 w-6 text-purple-600" />
                      </div>
                      Treatment Protocols
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-16">
                      <Syringe className="h-16 w-16 mx-auto text-slate-400 mb-4" />
                      <h3 className="text-xl font-semibold mb-2 text-slate-700">Advanced Treatment Management</h3>
                      <p className="text-slate-500 max-w-md mx-auto">
                        Design and monitor treatment plans, track medication schedules, and coordinate specialized care protocols.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="surgery" className="mt-0">
                <Card className="border-none shadow-lg">
                  <CardHeader className="pb-6">
                    <CardTitle className="flex items-center gap-3 text-2xl">
                      <div className="p-2 bg-red-100 rounded-lg">
                        <Scissors className="h-6 w-6 text-red-600" />
                      </div>
                      Surgical Operations
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-16">
                      <Scissors className="h-16 w-16 mx-auto text-slate-400 mb-4" />
                      <h3 className="text-xl font-semibold mb-2 text-slate-700">Surgical Procedure Management</h3>
                      <p className="text-slate-500 max-w-md mx-auto">
                        Schedule surgical operations, track pre and post-operative care, and maintain detailed surgical records.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="pharmacy" className="mt-0">
                <Card className="border-none shadow-lg">
                  <CardHeader className="pb-6">
                    <CardTitle className="flex items-center gap-3 text-2xl">
                      <div className="p-2 bg-orange-100 rounded-lg">
                        <Pill className="h-6 w-6 text-orange-600" />
                      </div>
                      Pharmacy Operations
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-16">
                      <Pill className="h-16 w-16 mx-auto text-slate-400 mb-4" />
                      <h3 className="text-xl font-semibold mb-2 text-slate-700">Medication & Inventory Management</h3>
                      <p className="text-slate-500 max-w-md mx-auto">
                        Manage medication inventory, track prescriptions, and ensure proper drug administration protocols.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="store" className="mt-0">
                <StoreManagement department="clinic" departmentName="Clinic" />
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ClinicDepartment;
