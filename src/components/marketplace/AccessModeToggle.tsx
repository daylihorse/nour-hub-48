
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { 
  Zap, 
  Users, 
  Lock, 
  Unlock, 
  Eye, 
  UserCheck,
  ArrowRight,
  Settings 
} from "lucide-react";
import { useAccessMode } from "@/contexts/AccessModeContext";
import { Link } from "react-router-dom";
import { publicDemoService } from "@/services/auth/publicDemoService";

const AccessModeToggle = () => {
  const { accessMode, setAccessMode, isPublicMode, isDemoMode } = useAccessMode();
  
  const demoAccounts = publicDemoService.getDemoAccounts();

  return (
    <div className="space-y-6">
      {/* Mode Toggle */}
      <Card className="border-2 border-blue-200 bg-blue-50/50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
                <Settings className="h-5 w-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-lg">Access Mode</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Choose how you want to explore EquiSense
                </p>
              </div>
            </div>
            <Badge variant={isDemoMode ? "default" : "secondary"} className="px-3 py-1">
              {isDemoMode ? "Demo Mode" : "Public Mode"}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Demo Mode */}
            <div className={`p-4 rounded-lg border-2 transition-all ${
              isDemoMode ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-gray-50'
            }`}>
              <div className="flex items-center gap-3 mb-3">
                <UserCheck className={`h-5 w-5 ${isDemoMode ? 'text-blue-600' : 'text-gray-500'}`} />
                <h3 className="font-semibold">Demo Accounts</h3>
                <Badge className="bg-green-100 text-green-800 text-xs">Recommended</Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                Experience realistic scenarios with pre-configured accounts for different business types
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Switch
                    checked={isDemoMode}
                    onCheckedChange={(checked) => setAccessMode(checked ? 'demo' : 'public')}
                  />
                  <span className="text-sm">Enable Demo Mode</span>
                </div>
                {isDemoMode && (
                  <Zap className="h-4 w-4 text-blue-500" />
                )}
              </div>
            </div>

            {/* Public Mode */}
            <div className={`p-4 rounded-lg border-2 transition-all ${
              isPublicMode ? 'border-purple-500 bg-purple-50' : 'border-gray-200 bg-gray-50'
            }`}>
              <div className="flex items-center gap-3 mb-3">
                <Eye className={`h-5 w-5 ${isPublicMode ? 'text-purple-600' : 'text-gray-500'}`} />
                <h3 className="font-semibold">Public Access</h3>
                <Badge className="bg-orange-100 text-orange-800 text-xs">No Login</Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                Explore all features immediately without any login requirements
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Switch
                    checked={isPublicMode}
                    onCheckedChange={(checked) => setAccessMode(checked ? 'public' : 'demo')}
                  />
                  <span className="text-sm">Enable Public Mode</span>
                </div>
                {isPublicMode && (
                  <Unlock className="h-4 w-4 text-purple-500" />
                )}
              </div>
            </div>
          </div>

          {/* Action Button */}
          <div className="mt-6 text-center">
            {isDemoMode ? (
              <p className="text-sm text-muted-foreground">
                Use the demo accounts below or create your own account to get started
              </p>
            ) : (
              <div className="space-y-3">
                <Link to="/dashboard">
                  <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
                    <Eye className="h-5 w-5 mr-2" />
                    Explore Dashboard Now
                    <ArrowRight className="h-5 w-5 ml-2" />
                  </Button>
                </Link>
                <p className="text-sm text-muted-foreground">
                  No login required - start exploring immediately
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Demo Accounts */}
      {isDemoMode && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Demo Accounts
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Try different account types to see how EquiSense adapts to various business needs
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {demoAccounts.map((account, index) => (
                <div key={index} className="border rounded-lg p-4 space-y-3 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-sm">{account.tenantName}</h3>
                    <Badge variant="outline" className="text-xs">
                      {account.tenantType}
                    </Badge>
                  </div>
                  
                  <p className="text-xs text-muted-foreground">{account.description}</p>
                  
                  <div className="space-y-1">
                    <p className="text-xs"><strong>Email:</strong> {account.email}</p>
                    <p className="text-xs"><strong>Password:</strong> {account.password}</p>
                  </div>
                  
                  <Link to="/login" className="block">
                    <Button size="sm" className="w-full">
                      <Lock className="h-4 w-4 mr-2" />
                      Login as {account.role}
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AccessModeToggle;
