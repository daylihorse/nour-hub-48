
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mare } from "@/types/breeding/mare";
import { Calendar, Heart, Activity } from "lucide-react";

interface MareCardProps {
  mare: Mare;
}

const MareCard = ({ mare }: MareCardProps) => {
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
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-lg font-semibold">{mare.horseName}</h3>
            <p className="text-sm text-muted-foreground">{mare.breed} • {mare.age} years</p>
          </div>
          <Badge className={getStatusColor(mare.status)}>
            {mare.status}
          </Badge>
        </div>
        
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <Heart className="h-4 w-4 text-red-500" />
            <span>Total Foals: {mare.totalFoals}</span>
          </div>
          
          {mare.expectedDueDate && (
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-blue-500" />
              <span>Due: {new Date(mare.expectedDueDate).toLocaleDateString()}</span>
            </div>
          )}
          
          {mare.stallionName && (
            <div className="flex items-center gap-2">
              <Activity className="h-4 w-4 text-purple-500" />
              <span>Sire: {mare.stallionName}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default MareCard;
