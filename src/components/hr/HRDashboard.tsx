
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useIntegratedModuleAccess } from "@/hooks/useIntegratedModuleAccess";
import { Users, DollarSign, GraduationCap, FileText, Clipboard } from "lucide-react";
import ModuleTabs, { ModuleTabConfig } from "@/components/common/ModuleTabs";

// Explicitly define the component to accept no props
interface HRDashboardProps {}

const HRDashboard: React.FC<HRDashboardProps> = () => {
  const { isSubmoduleAccessible } = useIntegratedModuleAccess();

  // Define all possible tabs with their access requirements
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
            <div className="mt-4 p-4 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground">This is a core feature and is always available when the HR module is active.</p>
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
            <div className="mt-4 p-4 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground">This is a core feature and is always available when the HR module is active.</p>
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
              {isSubmoduleAccessible("hr", "payroll-management") && (
                <div className="p-3 bg-green-50 border border-green-200 rounded">
                  <strong>Payroll Management:</strong> Process payroll and compensation
                </div>
              )}
              {isSubmoduleAccessible("hr", "benefits-admin") && (
                <div className="p-3 bg-green-50 border border-green-200 rounded">
                  <strong>Benefits Administration:</strong> Manage employee benefits
                </div>
              )}
              {!isSubmoduleAccessible("hr", "payroll-management") && !isSubmoduleAccessible("hr", "benefits-admin") && (
                <div className="p-3 bg-orange-50 border border-orange-200 rounded">
                  <p className="text-sm text-orange-700">Enable payroll & benefits submodules in the HR Module Access Center to see more features.</p>
                </div>
              )}
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
            <div className="mt-4 p-4 bg-orange-50 border border-orange-200 rounded-lg">
              <p className="text-sm text-orange-700">Enable Performance & Training submodules in the HR Module Access Center to access these features.</p>
            </div>
          </CardContent>
        </Card>
      )
    }
  ];

  // Filter tabs based on submodule access
  const accessibleTabs = allTabs.filter(tab => {
    switch (tab.value) {
      case "overview":
      case "employees":
        // Core features - always show if module is active
        return true;
      case "payroll":
        // Show if any payroll submodule is accessible
        return isSubmoduleAccessible("hr", "payroll-management") || isSubmoduleAccessible("hr", "benefits-admin");
      case "training":
        // Show if any training submodule is accessible
        return isSubmoduleAccessible("hr", "performance-reviews") || isSubmoduleAccessible("hr", "training-programs");
      default:
        return false;
    }
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Human Resources</h1>
          <p className="text-muted-foreground">Comprehensive HR management system</p>
        </div>
      </div>

      {accessibleTabs.length > 0 ? (
        <ModuleTabs 
          tabs={accessibleTabs}
          defaultValue={accessibleTabs[0].value}
          className="w-full"
        />
      ) : (
        <Card>
          <CardContent className="flex items-center justify-center h-64">
            <div className="text-center">
              <Clipboard className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Features Available</h3>
              <p className="text-muted-foreground">
                Enable features in the HR Module Access Center to access HR functionality.
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default HRDashboard;
