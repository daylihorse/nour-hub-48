
import { Badge } from "@/components/ui/badge";
import { Stethoscope, Users } from "lucide-react";

const ClinicHeader = () => {
  return (
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
    </div>
  );
};

export default ClinicHeader;
