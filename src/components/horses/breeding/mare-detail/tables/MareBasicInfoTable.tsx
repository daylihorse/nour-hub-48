
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useMareContext } from "@/contexts/MareContext";
import { User, Calendar, Heart, Activity } from "lucide-react";

interface MareBasicInfoTableProps {
  mareId: string;
}

const MareBasicInfoTable = ({ mareId }: MareBasicInfoTableProps) => {
  const { mares, error } = useMareContext();
  
  console.log('MareBasicInfoTable - looking for mareId:', mareId);
  console.log('MareBasicInfoTable - available mares:', mares.map(m => ({ id: m.id, name: m.horseName })));
  
  const mare = mares.find(m => m.id === mareId);

  if (error) {
    return (
      <Card>
        <CardContent className="p-6">
          <p className="text-red-500">Error loading mare data: {error}</p>
        </CardContent>
      </Card>
    );
  }

  if (!mare) {
    return (
      <Card>
        <CardContent className="p-6">
          <p className="text-muted-foreground mb-2">Mare not found (ID: {mareId})</p>
          <p className="text-sm text-muted-foreground">
            Available mare IDs: {mares.map(m => m.id).join(', ')}
          </p>
        </CardContent>
      </Card>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pregnant': return 'bg-blue-500';
      case 'nursing': return 'bg-green-500';
      case 'open': return 'bg-yellow-500';
      case 'bred': return 'bg-purple-500';
      case 'retired': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Basic Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Name</label>
                <p className="text-lg font-semibold">{mare.horseName}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Horse ID</label>
                <p>{mare.horseId}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Breed</label>
                <p>{mare.breed}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Age</label>
                <p>{mare.age} years</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Status</label>
                <div className="mt-1">
                  <Badge className={getStatusColor(mare.status)}>
                    {mare.status}
                  </Badge>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Total Foals</label>
                <p className="flex items-center gap-2">
                  <Heart className="h-4 w-4 text-red-500" />
                  {mare.totalFoals} (Live: {mare.liveFoals})
                </p>
              </div>
              {mare.expectedDueDate && (
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Expected Due Date</label>
                  <p className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-blue-500" />
                    {new Date(mare.expectedDueDate).toLocaleDateString()}
                  </p>
                </div>
              )}
              {mare.stallionName && (
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Current Stallion</label>
                  <p className="flex items-center gap-2">
                    <Activity className="h-4 w-4 text-purple-500" />
                    {mare.stallionName}
                  </p>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MareBasicInfoTable;
