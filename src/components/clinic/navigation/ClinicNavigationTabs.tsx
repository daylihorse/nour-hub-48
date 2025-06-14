
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Activity, Calendar, FileText, Syringe, Scissors, Pill, Store, CreditCard } from "lucide-react";

interface ClinicNavigationTabsProps {
  activeTab: string;
  onTabChange: (value: string) => void;
  showPOSInTab: boolean;
}

const ClinicNavigationTabs = ({ activeTab, onTabChange, showPOSInTab }: ClinicNavigationTabsProps) => {
  return (
    <div className="bg-slate-50 border-b border-slate-200 px-1">
      <TabsList className="w-full h-auto bg-transparent p-1 grid grid-cols-4 lg:grid-cols-8 gap-1">
        <TabsTrigger 
          value="overview" 
          className="flex items-center justify-center gap-2 px-3 py-2.5 text-sm font-medium text-slate-600 hover:text-slate-900 bg-white data-[state=active]:bg-emerald-500 data-[state=active]:text-white data-[state=active]:shadow-sm rounded-lg transition-all duration-200 min-w-0"
        >
          <Activity className="h-4 w-4 flex-shrink-0" />
          <span className="hidden sm:inline truncate">Overview</span>
        </TabsTrigger>
        <TabsTrigger 
          value="appointments" 
          className="flex items-center justify-center gap-2 px-3 py-2.5 text-sm font-medium text-slate-600 hover:text-slate-900 bg-white data-[state=active]:bg-emerald-500 data-[state=active]:text-white data-[state=active]:shadow-sm rounded-lg transition-all duration-200 min-w-0"
        >
          <Calendar className="h-4 w-4 flex-shrink-0" />
          <span className="hidden sm:inline truncate">Appointments</span>
        </TabsTrigger>
        <TabsTrigger 
          value="patients" 
          className="flex items-center justify-center gap-2 px-3 py-2.5 text-sm font-medium text-slate-600 hover:text-slate-900 bg-white data-[state=active]:bg-emerald-500 data-[state=active]:text-white data-[state=active]:shadow-sm rounded-lg transition-all duration-200 min-w-0"
        >
          <FileText className="h-4 w-4 flex-shrink-0" />
          <span className="hidden sm:inline truncate">Patients</span>
        </TabsTrigger>
        <TabsTrigger 
          value="treatments" 
          className="flex items-center justify-center gap-2 px-3 py-2.5 text-sm font-medium text-slate-600 hover:text-slate-900 bg-white data-[state=active]:bg-emerald-500 data-[state=active]:text-white data-[state=active]:shadow-sm rounded-lg transition-all duration-200 min-w-0"
        >
          <Syringe className="h-4 w-4 flex-shrink-0" />
          <span className="hidden sm:inline truncate">Treatments</span>
        </TabsTrigger>
        <TabsTrigger 
          value="surgery" 
          className="flex items-center justify-center gap-2 px-3 py-2.5 text-sm font-medium text-slate-600 hover:text-slate-900 bg-white data-[state=active]:bg-emerald-500 data-[state=active]:text-white data-[state=active]:shadow-sm rounded-lg transition-all duration-200 min-w-0"
        >
          <Scissors className="h-4 w-4 flex-shrink-0" />
          <span className="hidden sm:inline truncate">Surgery</span>
        </TabsTrigger>
        <TabsTrigger 
          value="pharmacy" 
          className="flex items-center justify-center gap-2 px-3 py-2.5 text-sm font-medium text-slate-600 hover:text-slate-900 bg-white data-[state=active]:bg-emerald-500 data-[state=active]:text-white data-[state=active]:shadow-sm rounded-lg transition-all duration-200 min-w-0"
        >
          <Pill className="h-4 w-4 flex-shrink-0" />
          <span className="hidden sm:inline truncate">Pharmacy</span>
        </TabsTrigger>
        <TabsTrigger 
          value="documents" 
          className="flex items-center justify-center gap-2 px-3 py-2.5 text-sm font-medium text-slate-600 hover:text-slate-900 bg-white data-[state=active]:bg-emerald-500 data-[state=active]:text-white data-[state=active]:shadow-sm rounded-lg transition-all duration-200 min-w-0"
        >
          <FileText className="h-4 w-4 flex-shrink-0" />
          <span className="hidden sm:inline truncate">Documents</span>
        </TabsTrigger>
        <TabsTrigger 
          value="store" 
          className="flex items-center justify-center gap-2 px-3 py-2.5 text-sm font-medium text-slate-600 hover:text-slate-900 bg-white data-[state=active]:bg-emerald-500 data-[state=active]:text-white data-[state=active]:shadow-sm rounded-lg transition-all duration-200 min-w-0"
        >
          <Store className="h-4 w-4 flex-shrink-0" />
          <span className="hidden sm:inline truncate">Store</span>
        </TabsTrigger>
        {showPOSInTab && (
          <TabsTrigger 
            value="pos" 
            className="flex items-center justify-center gap-2 px-3 py-2.5 text-sm font-medium text-slate-600 hover:text-slate-900 bg-white data-[state=active]:bg-emerald-500 data-[state=active]:text-white data-[state=active]:shadow-sm rounded-lg transition-all duration-200 min-w-0"
          >
            <CreditCard className="h-4 w-4 flex-shrink-0" />
            <span className="hidden sm:inline truncate">POS</span>
          </TabsTrigger>
        )}
      </TabsList>
    </div>
  );
};

export default ClinicNavigationTabs;
