
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Settings, Eye, EyeOff } from "lucide-react";
import { useModuleAccess } from "@/contexts/ModuleAccessContext";
import HorseModuleAccessCenter from "@/components/horses/HorseModuleAccessCenter";
import HRModuleAccessCenter from "@/components/hr/HRModuleAccessCenter";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ModuleAccessDemo: React.FC = () => {
  const { moduleConfigs } = useModuleAccess();

  const getModuleStatus = (moduleId: string) => {
    const config = moduleConfigs[moduleId];
    if (!config) return { isActive: false, activeSubmodules: 0, totalSubmodules: 0 };
    
    const totalSubmodules = config.submodules.reduce((acc, category) => acc + category.modules.length, 0);
    const activeSubmodules = config.submodules.reduce((acc, category) => 
      acc + category.modules.filter(m => m.isActive).length, 0
    );
    
    return {
      isActive: config.isActive,
      activeSubmodules,
      totalSubmodules
    };
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Module Access Control Demo</h1>
          <p className="text-muted-foreground">
            Configure which modules and submodules are accessible. Changes affect sidebar visibility and module content.
          </p>
        </div>
      </div>

      {/* Module Status Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Module Status Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(moduleConfigs).map(([moduleId, config]) => {
              const status = getModuleStatus(moduleId);
              return (
                <Card key={moduleId} className="border">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-sm">{config.name}</h3>
                      {status.isActive ? (
                        <Eye className="h-4 w-4 text-green-600" />
                      ) : (
                        <EyeOff className="h-4 w-4 text-gray-400" />
                      )}
                    </div>
                    <div className="space-y-1">
                      <Badge variant={status.isActive ? "default" : "secondary"} className="text-xs">
                        {status.isActive ? "Active" : "Inactive"}
                      </Badge>
                      <p className="text-xs text-muted-foreground">
                        {status.activeSubmodules}/{status.totalSubmodules} submodules active
                      </p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Module Access Centers */}
      <Tabs defaultValue="horses" className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="horses">Horses</TabsTrigger>
          <TabsTrigger value="hr">HR</TabsTrigger>
          <TabsTrigger value="inventory">Inventory</TabsTrigger>
          <TabsTrigger value="movements">Movements</TabsTrigger>
          <TabsTrigger value="riding">Riding</TabsTrigger>
          <TabsTrigger value="stable">Stable</TabsTrigger>
        </TabsList>
        
        <TabsContent value="horses">
          <HorseModuleAccessCenter />
        </TabsContent>
        
        <TabsContent value="hr">
          <HRModuleAccessCenter />
        </TabsContent>
        
        <TabsContent value="inventory">
          <Card>
            <CardContent className="p-6">
              <p className="text-muted-foreground">Inventory Module Access Center integration in progress...</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="movements">
          <Card>
            <CardContent className="p-6">
              <p className="text-muted-foreground">Movement Module Access Center integration in progress...</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="riding">
          <Card>
            <CardContent className="p-6">
              <p className="text-muted-foreground">Riding Reservations Module Access Center integration in progress...</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="stable">
          <Card>
            <CardContent className="p-6">
              <p className="text-muted-foreground">Stable Rooms Module Access Center integration in progress...</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Instructions */}
      <Card>
        <CardHeader>
          <CardTitle>How to Test</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm">
            <div className="flex items-start gap-2">
              <span className="font-semibold text-blue-600">1.</span>
              <span>Toggle modules on/off using the switches above - watch the sidebar update in real-time</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-semibold text-blue-600">2.</span>
              <span>Enable/disable submodules to see how they affect module dashboard content</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-semibold text-blue-600">3.</span>
              <span>Navigate to the Horse Management page to see submodule-based conditional rendering</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-semibold text-blue-600">4.</span>
              <span>Settings are saved to localStorage and persist across browser sessions</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ModuleAccessDemo;
