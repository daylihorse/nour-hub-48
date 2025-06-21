
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";

const DashboardHero = () => {
  const { currentTenant } = useAuth();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Welcome to {currentTenant?.name || 'EquiSense'}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">
          Your comprehensive equine management platform
        </p>
      </CardContent>
    </Card>
  );
};

export default DashboardHero;
