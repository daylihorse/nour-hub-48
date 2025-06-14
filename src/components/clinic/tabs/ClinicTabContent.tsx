
import { TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, FileText, Syringe, Scissors, Pill, CreditCard } from "lucide-react";
import ClinicOverview from "@/components/clinic/ClinicOverview";
import ClinicDocumentManager from "@/components/clinic/ClinicDocumentManager";
import StoreManagement from "@/components/store/StoreManagement";
import EnhancedPOSSystem from "@/components/pos/EnhancedPOSSystem";

interface ClinicTabContentProps {
  showPOSInTab: boolean;
  onPOSClick: () => void;
}

const ClinicTabContent = ({ showPOSInTab, onPOSClick }: ClinicTabContentProps) => {
  return (
    <>
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
              onClick={onPOSClick}
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
    </>
  );
};

export default ClinicTabContent;
