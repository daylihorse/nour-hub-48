
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Star } from "lucide-react";

interface StallionHeaderProps {
  stallion: {
    id: string;
    name: string;
    status: string;
    breed: string;
    studFee: number;
    successRate: number;
  };
  onBackToStallions: () => void;
}

const StallionHeader = ({ stallion, onBackToStallions }: StallionHeaderProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'retired': return 'bg-gray-100 text-gray-800';
      case 'unavailable': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-4">
      <Button 
        variant="ghost" 
        onClick={onBackToStallions}
        className="flex items-center gap-2"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Stallions
      </Button>
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold">{stallion.name}</h1>
            <Badge className={getStatusColor(stallion.status)}>
              {stallion.status}
            </Badge>
          </div>
          <div className="flex items-center gap-4 text-muted-foreground">
            <span>Breed: {stallion.breed}</span>
            <span>•</span>
            <span>Stud Fee: ${stallion.studFee.toLocaleString()}</span>
            <span>•</span>
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span>{stallion.successRate}% Success Rate</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StallionHeader;
