
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { 
  Building2, 
  Star, 
  Users, 
  Calendar,
  TrendingUp,
  Shield,
  Sparkles
} from "lucide-react";

const DashboardHero = () => {
  const { currentTenant, user } = useAuth();

  if (!currentTenant || !user) return null;

  const getTenantTypeColor = (type: string) => {
    switch (type) {
      case 'stable': return 'bg-blue-500';
      case 'clinic': return 'bg-green-500';
      case 'laboratory': return 'bg-purple-500';
      case 'marketplace': return 'bg-pink-500';
      case 'enterprise': return 'bg-orange-500';
      default: return 'bg-gray-500';
    }
  };

  const getSubscriptionColor = (tier: string) => {
    switch (tier) {
      case 'basic': return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'professional': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'premium': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'enterprise': return 'bg-orange-100 text-orange-800 border-orange-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="relative overflow-hidden bg-brown-gradient-light rounded-2xl p-8 mb-8 shadow-brown-lg">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brown-primary rounded-full -translate-y-48 translate-x-48"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-brown-primary rounded-full translate-y-32 -translate-x-32"></div>
      </div>

      <div className="relative z-10">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          {/* Left Content */}
          <div className="flex-1">
            <div className="flex items-center gap-4 mb-4">
              <div className={`w-16 h-16 rounded-2xl ${getTenantTypeColor(currentTenant.type)} flex items-center justify-center shadow-brown`}>
                <Building2 className="h-8 w-8 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-3xl font-bold text-brown-900">{currentTenant.name}</h1>
                  <Badge className={getTenantTypeColor(currentTenant.type) + " text-white border-0"}>
                    {currentTenant.type.toUpperCase()}
                  </Badge>
                </div>
                <p className="text-brown-700 text-lg">Welcome back, {user.firstName}! Here's your overview.</p>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white/50 backdrop-blur-sm rounded-lg p-4 border border-brown-200">
                <div className="flex items-center gap-2 mb-1">
                  <Star className="h-4 w-4 text-brown-600" />
                  <span className="text-sm text-brown-600">Subscription</span>
                </div>
                <p className="font-semibold text-brown-900 capitalize">{currentTenant.subscriptionTier}</p>
              </div>
              
              <div className="bg-white/50 backdrop-blur-sm rounded-lg p-4 border border-brown-200">
                <div className="flex items-center gap-2 mb-1">
                  <Users className="h-4 w-4 text-brown-600" />
                  <span className="text-sm text-brown-600">Your Role</span>
                </div>
                <p className="font-semibold text-brown-900 capitalize">
                  {user.tenants.find(t => t.tenantId === currentTenant.id)?.role}
                </p>
              </div>
              
              <div className="bg-white/50 backdrop-blur-sm rounded-lg p-4 border border-brown-200">
                <div className="flex items-center gap-2 mb-1">
                  <Calendar className="h-4 w-4 text-brown-600" />
                  <span className="text-sm text-brown-600">Member Since</span>
                </div>
                <p className="font-semibold text-brown-900">
                  {currentTenant.createdAt.toLocaleDateString()}
                </p>
              </div>
              
              <div className="bg-white/50 backdrop-blur-sm rounded-lg p-4 border border-brown-200">
                <div className="flex items-center gap-2 mb-1">
                  <TrendingUp className="h-4 w-4 text-brown-600" />
                  <span className="text-sm text-brown-600">Status</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <p className="font-semibold text-brown-900">Active</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex flex-col gap-3">
            <Badge className={`${getSubscriptionColor(currentTenant.subscriptionTier)} px-4 py-2 text-sm font-medium`}>
              <Sparkles className="h-4 w-4 mr-2" />
              {currentTenant.subscriptionTier.toUpperCase()} PLAN
            </Badge>
            <Button className="bg-brown-600 hover:bg-brown-700 shadow-brown">
              <Shield className="h-4 w-4 mr-2" />
              Manage Account
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHero;
