
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, DollarSign, GraduationCap, FileText, Clipboard } from "lucide-react";
import ModuleTabs, { ModuleTabConfig } from "@/components/common/ModuleTabs";

// Explicitly define the component to accept no props
interface HRDashboardProps {}

const HRDashboard: React.FC<HRDashboardProps> = () => {
  // Define all HR tabs - always accessible since we're excluding HR from module access
  const allTabs: ModuleTabConfig[] = [
    {
      value: "overview",
      label: "Overview",
      icon: Users,
      content: (
        <Card>
          <CardHeader>
            <CardTitle>HR Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Dashboard with key HR metrics and employee information.</p>
            <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-700">HR module is running independently of the module access system for testing purposes.</p>
            </div>
          </CardContent>
        </Card>
      )
    },
    {
      value: "employees",
      label: "Employee Records", 
      icon: FileText,
      content: (
        <Card>
          <CardHeader>
            <CardTitle>Employee Records</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Manage employee information and records.</p>
            <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-700">Employee records are always accessible in standalone mode.</p>
            </div>
          </CardContent>
        </Card>
      )
    },
    {
      value: "payroll",
      label: "Payroll & Benefits",
      icon: DollarSign,
      content: (
        <Card>
          <CardHeader>
            <CardTitle>Payroll & Benefits</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Manage payroll, compensation, and employee benefits.</p>
            <div className="mt-4 space-y-2">
              <div className="p-3 bg-blue-50 border border-blue-200 rounded">
                <strong>Payroll Management:</strong> Process payroll and compensation (Always Available)
              </div>
              <div className="p-3 bg-blue-50 border border-blue-200 rounded">
                <strong>Benefits Administration:</strong> Manage employee benefits (Always Available)
              </div>
            </div>
          </CardContent>
        </Card>
      )
    },
    {
      value: "training",
      label: "Performance & Training",
      icon: GraduationCap,
      content: (
        <Card>
          <CardHeader>
            <CardTitle>Performance & Training</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Manage performance reviews and training programs.</p>
            <div className="mt-4 space-y-2">
              <div className="p-3 bg-blue-50 border border-blue-200 rounded">
                <strong>Performance Reviews:</strong> Track employee performance (Always Available)
              </div>
              <div className="p-3 bg-blue-50 border border-blue-200 rounded">
                <strong>Training Programs:</strong> Manage employee training (Always Available)
              </div>
            </div>
          </CardContent>
        </Card>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Human Resources</h1>
          <p className="text-muted-foreground">Comprehensive HR management system (Standalone Mode)</p>
        </div>
      </div>

      <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
        <p className="text-sm text-yellow-800">
          <strong>Note:</strong> HR module is temporarily running in standalone mode, independent of the module access system for testing purposes.
        </p>
      </div>

      <ModuleTabs 
        tabs={allTabs}
        defaultValue={allTabs[0].value}
        className="w-full"
      />
    </div>
  );
};

export default HRDashboard;
