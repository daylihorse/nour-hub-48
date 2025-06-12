
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar, 
  Heart, 
  Target, 
  Users,
  DollarSign,
  Clock
} from "lucide-react";

interface StallionSummaryCardProps {
  stallion: {
    id: string;
    name: string;
    status: string;
    breed: string;
    studFee: number;
    successRate: number;
    totalMares: number;
    successfulBreedings: number;
    livefoals: number;
    nextAvailable: string;
    bookings: number;
  };
}

const StallionSummaryCard = ({ stallion }: StallionSummaryCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'default';
      case 'retired': return 'secondary';
      case 'unavailable': return 'destructive';
      default: return 'secondary';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Stallion Overview</span>
          <Badge variant={getStatusColor(stallion.status)}>
            {stallion.status.charAt(0).toUpperCase() + stallion.status.slice(1)}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <div className="flex items-center gap-2">
            <DollarSign className="h-4 w-4 text-green-500" />
            <div>
              <p className="text-sm text-muted-foreground">Stud Fee</p>
              <p className="font-semibold">${stallion.studFee.toLocaleString()}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Target className="h-4 w-4 text-blue-500" />
            <div>
              <p className="text-sm text-muted-foreground">Success Rate</p>
              <p className="font-semibold">{stallion.successRate}%</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-purple-500" />
            <div>
              <p className="text-sm text-muted-foreground">Total Mares</p>
              <p className="font-semibold">{stallion.totalMares}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Heart className="h-4 w-4 text-red-500" />
            <div>
              <p className="text-sm text-muted-foreground">Successful Breedings</p>
              <p className="font-semibold">{stallion.successfulBreedings}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Heart className="h-4 w-4 text-pink-500" />
            <div>
              <p className="text-sm text-muted-foreground">Live Foals</p>
              <p className="font-semibold">{stallion.livefoals}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-orange-500" />
            <div>
              <p className="text-sm text-muted-foreground">Next Available</p>
              <p className="font-semibold">{stallion.nextAvailable}</p>
            </div>
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-indigo-500" />
            <div>
              <p className="text-sm text-muted-foreground">Active Bookings</p>
              <p className="font-semibold">{stallion.bookings} scheduled</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StallionSummaryCard;
