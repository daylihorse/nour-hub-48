
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/useAuth";
import { useTenantFeatures } from "@/hooks/useTenantFeatures";
import { 
  Building2, 
  Users, 
  Star, 
  Calendar,
  MapPin,
  Phone,
  Mail,
  Globe
} from "lucide-react";

const TenantDashboard = () => {
  const { currentTenant, user } = useAuth();
  const { getEnabledFeatures } = useTenantFeatures();

  if (!currentTenant || !user) return null;

  const enabledFeatures = getEnabledFeatures();

  const getTenantTypeColor = (type: string) => {
    switch (type) {
      case 'stable': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'clinic': return 'bg-green-100 text-green-800 border-green-200';
      case 'marketplace': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'enterprise': return 'bg-orange-100 text-orange-800 border-orange-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getSubscriptionColor = (tier: string) => {
    switch (tier) {
      case 'basic': return 'bg-gray-100 text-gray-800';
      case 'professional': return 'bg-blue-100 text-blue-800';
      case 'premium': return 'bg-purple-100 text-purple-800';
      case 'enterprise': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Tenant Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center justify-center w-16 h-16 rounded-lg bg-primary/10">
            <Building2 className="h-8 w-8 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">{currentTenant.name}</h1>
            <p className="text-muted-foreground">Welcome back, {user.firstName}!</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Badge className={getTenantTypeColor(currentTenant.type)}>
            {currentTenant.type.toUpperCase()}
          </Badge>
          <Badge className={getSubscriptionColor(currentTenant.subscriptionTier)}>
            {currentTenant.subscriptionTier.toUpperCase()}
          </Badge>
        </div>
      </div>

      {/* Tenant Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-500" />
              <div>
                <p className="text-sm text-muted-foreground">Subscription</p>
                <p className="text-lg font-semibold capitalize">{currentTenant.subscriptionTier}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-blue-500" />
              <div>
                <p className="text-sm text-muted-foreground">Your Role</p>
                <p className="text-lg font-semibold capitalize">
                  {user.tenants.find(t => t.tenantId === currentTenant.id)?.role}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-green-500" />
              <div>
                <p className="text-sm text-muted-foreground">Member Since</p>
                <p className="text-lg font-semibold">
                  {currentTenant.createdAt.toLocaleDateString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Building2 className="h-5 w-5 text-purple-500" />
              <div>
                <p className="text-sm text-muted-foreground">Features</p>
                <p className="text-lg font-semibold">{enabledFeatures.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tenant Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {currentTenant.metadata?.address && (
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="font-medium">Address</p>
                  <p className="text-sm text-muted-foreground">
                    {currentTenant.metadata.address.street}<br />
                    {currentTenant.metadata.address.city}, {currentTenant.metadata.address.state} {currentTenant.metadata.address.zipCode}<br />
                    {currentTenant.metadata.address.country}
                  </p>
                </div>
              </div>
            )}
            
            {currentTenant.metadata?.contact?.phone && (
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Phone</p>
                  <p className="text-sm text-muted-foreground">
                    {currentTenant.metadata.contact.phone}
                  </p>
                </div>
              </div>
            )}
            
            {currentTenant.metadata?.contact?.email && (
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Email</p>
                  <p className="text-sm text-muted-foreground">
                    {currentTenant.metadata.contact.email}
                  </p>
                </div>
              </div>
            )}
            
            {currentTenant.metadata?.contact?.website && (
              <div className="flex items-center gap-3">
                <Globe className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Website</p>
                  <p className="text-sm text-muted-foreground">
                    {currentTenant.metadata.contact.website}
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Enabled Features</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {enabledFeatures.map((feature) => (
                <Badge key={feature} variant="secondary">
                  {feature.charAt(0).toUpperCase() + feature.slice(1)}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TenantDashboard;
