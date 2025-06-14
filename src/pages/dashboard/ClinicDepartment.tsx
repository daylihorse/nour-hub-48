import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import ClinicOverview from "@/components/clinic/ClinicOverview";
import ClinicIntegrationPanel from "@/components/integration/ClinicIntegrationPanel";
import ClinicHorseUpdatePanel from "@/components/integration/ClinicHorseUpdatePanel";
import ClinicDocumentManager from "@/components/clinic/ClinicDocumentManager";
import StoreManagement from "@/components/store/StoreManagement";
import EnhancedPOSSystem from "@/components/pos/EnhancedPOSSystem";
import POSChoiceDialog from "@/components/pos/POSChoiceDialog";
import { usePOSChoice } from "@/hooks/usePOSChoice";
import { Stethoscope, Calendar, FileText, Syringe, Scissors, Pill, Activity, Heart, Users, Store, CreditCard } from "lucide-react";

const ClinicDepartment = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [showPOSInTab, setShowPOSInTab] = useState(false);
  const { isDialogOpen, openPOSChoice, closePOSChoice, handleUseHere, handleOpenSeparate } = usePOSChoice("Clinic");

  const stats = [
    {
      title: "Today's Appointments",
      value: "12",
      icon: Calendar,
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      title: "Active Patients",
      value: "89",
      icon: Heart,
      color: "text-red-600",
      bgColor: "bg-red-50"
    },
    {
      title: "Pending Results",
      value: "5",
      icon: FileText,
      color: "text-orange-600",
      bgColor: "bg-orange-50"
    },
    {
      title: "Emergency Cases",
      value: "2",
      icon: Activity,
      color: "text-green-600",
      bgColor: "bg-green-50"
    }
  ];

  const handlePOSClick = () => {
    openPOSChoice();
  };

  const handleUsePOSHere = () => {
    setShowPOSInTab(true);
    setActiveTab("pos");
    closePOSChoice();
  };

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

        {/* Integration Panel */}
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
            <div className="bg-white px-8 pt-6 border-b border-slate-200">
              <TabsList className="w-full bg-slate-50 p-1 grid grid-cols-8 lg:grid-cols-9 gap-1 rounded-lg">
                <TabsTrigger 
                  value="overview" 
                  className="data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-sm font-medium transition-all duration-200 flex items-center gap-2 px-3 py-2 rounded-md text-slate-600 hover:text-slate-900"
                >
                  <Activity className="h-4 w-4" />
                  <span className="hidden sm:inline">Overview</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="appointments" 
                  className="data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-sm font-medium transition-all duration-200 flex items-center gap-2 px-3 py-2 rounded-md text-slate-600 hover:text-slate-900"
                >
                  <Calendar className="h-4 w-4" />
                  <span className="hidden sm:inline">Appointments</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="patients" 
                  className="data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-sm font-medium transition-all duration-200 flex items-center gap-2 px-3 py-2 rounded-md text-slate-600 hover:text-slate-900"
                >
                  <FileText className="h-4 w-4" />
                  <span className="hidden sm:inline">Patient Records</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="treatments" 
                  className="data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-sm font-medium transition-all duration-200 flex items-center gap-2 px-3 py-2 rounded-md text-slate-600 hover:text-slate-900"
                >
                  <Syringe className="h-4 w-4" />
                  <span className="hidden sm:inline">Treatments</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="surgery" 
                  className="data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-sm font-medium transition-all duration-200 flex items-center gap-2 px-3 py-2 rounded-md text-slate-600 hover:text-slate-900"
                >
                  <Scissors className="h-4 w-4" />
                  <span className="hidden sm:inline">Surgery</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="pharmacy" 
                  className="data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-sm font-medium transition-all duration-200 flex items-center gap-2 px-3 py-2 rounded-md text-slate-600 hover:text-slate-900"
                >
                  <Pill className="h-4 w-4" />
                  <span className="hidden sm:inline">Pharmacy</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="documents" 
                  className="data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-sm font-medium transition-all duration-200 flex items-center gap-2 px-3 py-2 rounded-md text-slate-600 hover:text-slate-900"
                >
                  <FileText className="h-4 w-4" />
                  <span className="hidden sm:inline">Documents</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="store" 
                  className="data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-sm font-medium transition-all duration-200 flex items-center gap-2 px-3 py-2 rounded-md text-slate-600 hover:text-slate-900"
                >
                  <Store className="h-4 w-4" />
                  <span className="hidden sm:inline">Store</span>
                </TabsTrigger>
                {showPOSInTab && (
                  <TabsTrigger 
                    value="pos" 
                    className="data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-sm font-medium transition-all duration-200 flex items-center gap-2 px-3 py-2 rounded-md text-slate-600 hover:text-slate-900"
                  >
                    <CreditCard className="h-4 w-4" />
                    <span className="hidden sm:inline">Point of Sale</span>
                  </TabsTrigger>
                )}
              </TabsList>
            </div>
            
            <div className="p-8">
              <TabsContent value="overview" className="mt-0">
                <ClinicOverview />
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

              <TabsContent value="documents" className="mt-0">
                <ClinicDocumentManager />
              </TabsContent>

              <TabsContent value="store" className="mt-0">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-2xl font-bold">Clinic Store Management</h2>
                      <p className="text-muted-foreground">Manage clinic products, services, and point of sale operations</p>
                    </div>
                    <button
                      onClick={handlePOSClick}
                      className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
                    >
                      <CreditCard className="h-5 w-5" />
                      Open Point of Sale
                    </button>
                  </div>
                  <StoreManagement department="clinic" departmentName="Clinic" />
                </div>
              </TabsContent>

              {showPOSInTab && (
                <TabsContent value="pos" className="mt-0">
                  <EnhancedPOSSystem department="clinic" />
                </TabsContent>
              )}
            </div>
          </Tabs>
        </div>
      </div>

      {/* POS Choice Dialog */}
      <POSChoiceDialog
        isOpen={isDialogOpen}
        onClose={closePOSChoice}
        departmentName="Clinic"
        onUseHere={handleUsePOSHere}
        onOpenSeparate={() => handleOpenSeparate()}
      />
    </div>
  );
};

export default ClinicDepartment;
