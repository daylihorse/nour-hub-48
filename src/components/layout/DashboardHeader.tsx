
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator, DropdownMenuLabel } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/useAuth";
import { LogOut, User, Settings, Shield, Bell, HelpCircle, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import SidebarAccountSwitcher from "@/components/auth/SidebarAccountSwitcher";

const DashboardHeader = () => {
  const { logout, user, currentTenant } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
      navigate('/');
    }
  };

  const getUserInitials = () => {
    if (!user) return "U";
    return `${user.firstName?.[0] || ''}${user.lastName?.[0] || ''}`.toUpperCase();
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
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-brown">
      <div className="flex h-16 items-center px-6">
        {/* Left side with sidebar trigger */}
        <div className="flex items-center gap-4">
          <SidebarTrigger className="hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-all duration-200 hover:shadow-brown" />
          <div className="hidden lg:block">
            <h1 className="text-lg font-semibold text-foreground">
              Dayli Horse Overview
            </h1>
          </div>
        </div>

        {/* Center - Account Switcher */}
        <div className="flex-1 flex justify-center px-4">
          <SidebarAccountSwitcher />
        </div>

        {/* Right side - Enhanced User menu */}
        <div className="flex items-center gap-4">
          {/* Notifications */}
          <Button variant="ghost" size="sm" className="relative hover:bg-brown-100 hover:text-brown-800 transition-all duration-200">
            <Bell className="h-4 w-4" />
            <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
              3
            </span>
          </Button>

          {/* User Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-3 hover:bg-brown-100 hover:text-brown-800 transition-all duration-200 px-3 py-2">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-brown-gradient text-white font-semibold text-sm">
                    {getUserInitials()}
                  </AvatarFallback>
                </Avatar>
                <div className="hidden md:block text-left">
                  <p className="text-sm font-medium">{user?.firstName} {user?.lastName}</p>
                  <div className="flex items-center gap-2">
                    <Badge className={`${getSubscriptionColor(currentTenant?.subscriptionTier || 'basic')} text-xs px-2 py-0`}>
                      {currentTenant?.subscriptionTier || 'basic'}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {user?.tenants.find(t => t.tenantId === currentTenant?.id)?.role}
                    </span>
                  </div>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent 
              align="end" 
              className="w-64 bg-white/95 backdrop-blur-sm border border-brown-200 shadow-brown-lg"
            >
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-2">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-brown-gradient text-white font-semibold">
                        {getUserInitials()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium leading-none">{user?.firstName} {user?.lastName}</p>
                      <p className="text-xs leading-none text-muted-foreground mt-1">
                        {user?.email}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={`${getSubscriptionColor(currentTenant?.subscriptionTier || 'basic')} text-xs`}>
                      <Star className="h-3 w-3 mr-1" />
                      {currentTenant?.subscriptionTier}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {user?.tenants.find(t => t.tenantId === currentTenant?.id)?.role}
                    </Badge>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              
              <DropdownMenuItem className="hover:bg-brown-50 cursor-pointer">
                <User className="mr-2 h-4 w-4" />
                <span>Profile Settings</span>
              </DropdownMenuItem>
              
              <DropdownMenuItem className="hover:bg-brown-50 cursor-pointer">
                <Settings className="mr-2 h-4 w-4" />
                <span>Account Settings</span>
              </DropdownMenuItem>
              
              <DropdownMenuItem className="hover:bg-brown-50 cursor-pointer">
                <Shield className="mr-2 h-4 w-4" />
                <span>Privacy & Security</span>
              </DropdownMenuItem>
              
              <DropdownMenuItem className="hover:bg-brown-50 cursor-pointer">
                <HelpCircle className="mr-2 h-4 w-4" />
                <span>Help & Support</span>
              </DropdownMenuItem>
              
              <DropdownMenuSeparator />
              
              <DropdownMenuItem 
                onClick={handleLogout}
                className="hover:bg-red-50 hover:text-red-600 cursor-pointer"
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Sign Out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
