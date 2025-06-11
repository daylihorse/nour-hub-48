
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Edit, Calendar, Stethoscope } from "lucide-react";

interface MareHeaderProps {
  mare: {
    id?: string;
    name: string;
    status: string;
    age: number;
    breed: string;
  };
  onBackToMares: () => void;
}

const MareHeader = ({ mare, onBackToMares }: MareHeaderProps) => {
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
    <div className="flex justify-between items-start">
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={onBackToMares}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Mares
        </Button>
        <div>
          <h1 className="text-3xl font-bold">{mare.name}</h1>
          <div className="flex items-center gap-3 mt-2">
            <Badge className={getStatusColor(mare.status)}>
              {mare.status}
            </Badge>
            <span className="text-muted-foreground">
              {mare.breed} • {mare.age} years
            </span>
          </div>
        </div>
      </div>
      
      <div className="flex gap-2">
        <Button variant="outline">
          <Edit className="h-4 w-4 mr-2" />
          Edit Mare
        </Button>
        <Button variant="outline">
          <Calendar className="h-4 w-4 mr-2" />
          Schedule
        </Button>
        <Button>
          <Stethoscope className="h-4 w-4 mr-2" />
          Quick Checkup
        </Button>
      </div>
    </div>
  );
};

export default MareHeader;
