
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Calendar, Thermometer, Heart, Eye } from "lucide-react";
import { format, differenceInDays } from "date-fns";

interface HeatCycle {
  id: string;
  mareName: string;
  cycleStartDate: Date;
  estimatedOvulation: Date;
  cycleDay: number;
  cycleLength: number;
  status: string;
  signs: string[];
  breedingAttempts: number;
  successful: boolean;
}

interface HeatRecordsProps {
  heatCycles: HeatCycle[];
  getStatusBadge: (status: string) => JSX.Element;
  onMareSelect: (mareId: string) => void;
}

const HeatRecords = ({ heatCycles, getStatusBadge, onMareSelect }: HeatRecordsProps) => {
  const getCycleProgress = (cycle: HeatCycle) => {
    return Math.min((cycle.cycleDay / cycle.cycleLength) * 100, 100);
  };

  const getDaysToOvulation = (cycle: HeatCycle) => {
    return differenceInDays(cycle.estimatedOvulation, new Date());
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {heatCycles.map((cycle) => {
        const progress = getCycleProgress(cycle);
        const daysToOvulation = getDaysToOvulation(cycle);
        
        return (
          <Card key={cycle.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-semibold text-lg">{cycle.mareName}</h3>
                  <p className="text-sm text-muted-foreground">
                    Day {cycle.cycleDay} of {cycle.cycleLength}-day cycle
                  </p>
                </div>
                {getStatusBadge(cycle.status)}
              </div>

              <div className="space-y-4">
                {/* Cycle Progress */}
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Cycle Progress</span>
                    <span>{Math.round(progress)}%</span>
                  </div>
                  <Progress value={progress} className="h-2" />
                </div>

                {/* Key Dates */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <span className="text-muted-foreground">Started:</span>
                      <p className="font-medium">{format(cycle.cycleStartDate, "MMM dd")}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Heart className="h-4 w-4 text-red-500" />
                    <div>
                      <span className="text-muted-foreground">Est. Ovulation:</span>
                      <p className="font-medium">{format(cycle.estimatedOvulation, "MMM dd")}</p>
                    </div>
                  </div>
                </div>

                {/* Ovulation Countdown */}
                {daysToOvulation > 0 && (
                  <div className="bg-orange-50 p-3 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Thermometer className="h-4 w-4 text-orange-500" />
                      <span className="text-sm font-medium text-orange-700">
                        {daysToOvulation} days until estimated ovulation
                      </span>
                    </div>
                  </div>
                )}

                {/* Heat Signs */}
                <div>
                  <span className="text-sm text-muted-foreground">Current Signs:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {cycle.signs.map((sign, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {sign}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Breeding Summary */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Breeding Attempts:</span>
                    <p className="font-medium">{cycle.breedingAttempts}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Success:</span>
                    <p className={`font-medium ${cycle.successful ? 'text-green-600' : 'text-muted-foreground'}`}>
                      {cycle.successful ? 'Yes' : 'Pending'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => onMareSelect(cycle.id)}
                    className="flex items-center gap-2"
                  >
                    <Eye className="h-4 w-4" />
                    View Details
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="flex items-center gap-2"
                  >
                    Update Signs
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default HeatRecords;
