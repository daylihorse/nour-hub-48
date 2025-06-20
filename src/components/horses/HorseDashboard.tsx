
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useIntegratedModuleAccess } from "@/hooks/useIntegratedModuleAccess";
import { Heart, Users, Dna, Award, Clipboard } from "lucide-react";
import ModuleTabs, { ModuleTabConfig } from "@/components/common/ModuleTabs";

const HorseDashboard: React.FC = () => {
  const { isSubmoduleAccessible } = useIntegratedModuleAccess();

  // Define all possible tabs with their access requirements
  const allTabs: ModuleTabConfig[] = [
    {
      value: "registration",
      label: "Registration",
      icon: Heart,
      content: (
        <Card>
          <CardHeader>
            <CardTitle>Horse Registration</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Register and manage horse profiles with detailed information.</p>
            <div className="mt-4 p-4 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground">This is a core feature and is always available when the Horse Management module is active.</p>
            </div>
          </CardContent>
        </Card>
      )
    },
    {
      value: "health",
      label: "Health Records", 
      icon: Users,
      content: (
        <Card>
          <CardHeader>
            <CardTitle>Health Records</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Track health records, vaccinations and medical history.</p>
            <div className="mt-4 p-4 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground">This is a core feature and is always available when the Horse Management module is active.</p>
            </div>
          </CardContent>
        </Card>
      )
    },
    {
      value: "breeding",
      label: "Breeding",
      icon: Dna,
      content: (
        <Card>
          <CardHeader>
            <CardTitle>Breeding Management</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Manage breeding contracts, records, and lineage tracking.</p>
            <div className="mt-4 space-y-2">
              {isSubmoduleAccessible("horses", "breeding-contracts") && (
                <div className="p-3 bg-green-50 border border-green-200 rounded">
                  <strong>Breeding Contracts:</strong> Create and manage breeding agreements
                </div>
              )}
              {isSubmoduleAccessible("horses", "breeding-records") && (
                <div className="p-3 bg-green-50 border border-green-200 rounded">
                  <strong>Breeding Records:</strong> Track breeding history and outcomes
                </div>
              )}
              {!isSubmoduleAccessible("horses", "breeding-contracts") && !isSubmoduleAccessible("horses", "breeding-records") && (
                <div className="p-3 bg-orange-50 border border-orange-200 rounded">
                  <p className="text-sm text-orange-700">Enable breeding submodules in the Horse Module Access Center to see more features.</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )
    },
    {
      value: "performance",
      label: "Performance",
      icon: Award,
      content: (
        <Card>
          <CardHeader>
            <CardTitle>Performance & Training</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Monitor training progress and competition results.</p>
            <div className="mt-4 p-4 bg-orange-50 border border-orange-200 rounded-lg">
              <p className="text-sm text-orange-700">Enable Performance & Training submodules in the Horse Module Access Center to access these features.</p>
            </div>
          </CardContent>
        </Card>
      )
    }
  ];

  // Filter tabs based on submodule access
  const accessibleTabs = allTabs.filter(tab => {
    switch (tab.value) {
      case "registration":
      case "health":
        // Core features - always show if module is active
        return true;
      case "breeding":
        // Show if any breeding submodule is accessible
        return isSubmoduleAccessible("horses", "breeding-contracts") || isSubmoduleAccessible("horses", "breeding-records");
      case "performance":
        // Show if any performance submodule is accessible
        return isSubmoduleAccessible("horses", "performance-tracking") || isSubmoduleAccessible("horses", "training-schedules");
      default:
        return false;
    }
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Horse Management</h1>
          <p className="text-muted-foreground">Comprehensive horse management system</p>
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
                Enable features in the Horse Module Access Center to access horse management functionality.
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default HorseDashboard;
