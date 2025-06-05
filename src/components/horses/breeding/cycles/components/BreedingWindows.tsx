
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Target } from "lucide-react";
import { format, isWithinInterval, addDays } from "date-fns";

interface HeatCycle {
  id: string;
  mareName: string;
  estimatedOvulation: Date;
  breedingWindow: {
    start: Date;
    end: Date;
    optimal: Date;
  };
  status: string;
  breedingAttempts: number;
}

interface BreedingWindowsProps {
  heatCycles: HeatCycle[];
  getStatusBadge: (status: string) => JSX.Element;
}

const BreedingWindows = ({ heatCycles, getStatusBadge }: BreedingWindowsProps) => {
  const now = new Date();
  
  const getWindowStatus = (window: { start: Date; end: Date; optimal: Date }) => {
    if (isWithinInterval(now, { start: window.start, end: window.end })) {
      return { status: 'active', label: 'Active Window', color: 'text-green-600' };
    }
    if (now < window.start) {
      return { status: 'upcoming', label: 'Upcoming', color: 'text-blue-600' };
    }
    return { status: 'closed', label: 'Closed', color: 'text-gray-600' };
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-green-500" />
            Optimal Breeding Windows
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {heatCycles.map((cycle) => {
              const windowStatus = getWindowStatus(cycle.breedingWindow);
              
              return (
                <Card key={cycle.id} className="border-l-4 border-l-green-500">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-semibold">{cycle.mareName}</h4>
                        <p className="text-sm text-muted-foreground">
                          Breeding attempts: {cycle.breedingAttempts}
                        </p>
                      </div>
                      <div className="flex flex-col gap-1">
                        {getStatusBadge(cycle.status)}
                        <Badge 
                          variant="outline" 
                          className={`text-xs ${windowStatus.color}`}
                        >
                          {windowStatus.label}
                        </Badge>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <span className="text-muted-foreground">Window Start:</span>
                          <p className="font-medium">{format(cycle.breedingWindow.start, "MMM dd, h:mm a")}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Window End:</span>
                          <p className="font-medium">{format(cycle.breedingWindow.end, "MMM dd, h:mm a")}</p>
                        </div>
                      </div>

                      <div className="bg-green-50 p-3 rounded-lg">
                        <div className="flex items-center gap-2 mb-1">
                          <Target className="h-4 w-4 text-green-600" />
                          <span className="text-sm font-medium text-green-700">Optimal Time</span>
                        </div>
                        <p className="text-sm text-green-700">
                          {format(cycle.breedingWindow.optimal, "MMM dd, yyyy 'at' h:mm a")}
                        </p>
                      </div>

                      {windowStatus.status === 'active' && (
                        <div className="flex gap-2">
                          <Button size="sm" className="flex-1">
                            Schedule Breeding
                          </Button>
                          <Button variant="outline" size="sm">
                            <Clock className="h-4 w-4" />
                          </Button>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BreedingWindows;
