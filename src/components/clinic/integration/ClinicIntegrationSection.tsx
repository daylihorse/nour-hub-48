
import ClinicIntegrationPanel from "@/components/integration/ClinicIntegrationPanel";
import ClinicHorseUpdatePanel from "@/components/integration/ClinicHorseUpdatePanel";

const ClinicIntegrationSection = () => {
  return (
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
  );
};

export default ClinicIntegrationSection;
