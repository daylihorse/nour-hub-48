
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { LogOut } from "lucide-react";

const DashboardHeader = () => {
  const { logout, currentTenant } = useAuth();

  return (
    <header className="flex items-center justify-between p-4 border-b">
      <h1 className="text-xl font-semibold">
        {currentTenant?.name || 'Dashboard'}
      </h1>
      <Button variant="outline" onClick={logout}>
        <LogOut className="h-4 w-4 mr-2" />
        Logout
      </Button>
    </header>
  );
};

export default DashboardHeader;
