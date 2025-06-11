
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/hooks/useAuth";
import { PermissionGuard } from "@/components/auth";
import FeatureManagement from "@/components/tenant/FeatureManagement";
import { Shield, Settings } from "lucide-react";

const TenantSettings = () => {
  const { currentTenant } = useAuth();
  
  if (!currentTenant) return null;
  
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10">
          <Settings className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">Tenant Settings</h1>
          <p className="text-muted-foreground">
            Manage settings for {currentTenant.name}
          </p>
        </div>
      </div>
      
      <Tabs defaultValue="features" className="space-y-6">
        <TabsList>
          <TabsTrigger value="features">Features</TabsTrigger>
          <TabsTrigger value="general">General Settings</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="branding">Branding</TabsTrigger>
        </TabsList>
        
        <TabsContent value="features">
          <PermissionGuard permission="tenant:update">
            <FeatureManagement />
          </PermissionGuard>
        </TabsContent>
        
        <TabsContent value="general">
          <div className="flex items-center justify-center p-12 border rounded-md">
            <div className="text-center space-y-2">
              <Shield className="h-10 w-10 text-muted-foreground mx-auto" />
              <h3 className="text-lg font-medium">General Settings</h3>
              <p className="text-muted-foreground">
                General settings management will be implemented in a future update.
              </p>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="users">
          <div className="flex items-center justify-center p-12 border rounded-md">
            <div className="text-center space-y-2">
              <Shield className="h-10 w-10 text-muted-foreground mx-auto" />
              <h3 className="text-lg font-medium">User Management</h3>
              <p className="text-muted-foreground">
                User management will be implemented in a future update.
              </p>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="branding">
          <div className="flex items-center justify-center p-12 border rounded-md">
            <div className="text-center space-y-2">
              <Shield className="h-10 w-10 text-muted-foreground mx-auto" />
              <h3 className="text-lg font-medium">Branding Settings</h3>
              <p className="text-muted-foreground">
                Branding customization will be implemented in a future update.
              </p>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TenantSettings;
