
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Calendar, Heart, Activity, Baby } from "lucide-react";

interface MareSummaryCardProps {
  mare: {
    id?: string;
    name: string;
    status: string;
    age: number;
    breed: string;
    pregnancyDay?: number;
    expectedDueDate?: string;
    totalFoals: number;
    liveFoals: number;
    lastBreedingDate?: string;
    stallionName?: string;
  };
}

const MareSummaryCard = ({ mare }: MareSummaryCardProps) => {
  const pregnancyProgress = mare.pregnancyDay ? (mare.pregnancyDay / 340) * 100 : 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5" />
          Current Status Overview
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Pregnancy Status */}
          {mare.status === 'pregnant' && (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Baby className="h-4 w-4 text-blue-500" />
                <span className="font-medium">Pregnancy Progress</span>
              </div>
              <Progress value={pregnancyProgress} className="h-2" />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Day {mare.pregnancyDay}/340</span>
                <span>{Math.round(pregnancyProgress)}%</span>
              </div>
              {mare.expectedDueDate && (
                <p className="text-sm">
                  Due: {new Date(mare.expectedDueDate).toLocaleDateString()}
                </p>
              )}
            </div>
          )}
          
          {/* Breeding History */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Heart className="h-4 w-4 text-red-500" />
              <span className="font-medium">Foaling Record</span>
            </div>
            <div>
              <div className="text-2xl font-bold">{mare.totalFoals}</div>
              <p className="text-sm text-muted-foreground">
                Total foals ({mare.liveFoals} live births)
              </p>
            </div>
          </div>
          
          {/* Current Stallion */}
          {mare.stallionName && (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Activity className="h-4 w-4 text-purple-500" />
                <span className="font-medium">Current Sire</span>
              </div>
              <div>
                <div className="font-semibold">{mare.stallionName}</div>
                {mare.lastBreedingDate && (
                  <p className="text-sm text-muted-foreground">
                    Bred: {new Date(mare.lastBreedingDate).toLocaleDateString()}
                  </p>
                )}
              </div>
            </div>
          )}
          
          {/* Status Badge */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-green-500" />
              <span className="font-medium">Current Status</span>
            </div>
            <div>
              <Badge className={`capitalize ${
                mare.status === 'pregnant' ? 'bg-blue-500' :
                mare.status === 'nursing' ? 'bg-green-500' :
                mare.status === 'open' ? 'bg-yellow-500' :
                mare.status === 'bred' ? 'bg-purple-500' :
                'bg-gray-500'
              }`}>
                {mare.status}
              </Badge>
              <p className="text-sm text-muted-foreground mt-1">
                Active in breeding program
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MareSummaryCard;
