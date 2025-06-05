
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, CalendarDays } from "lucide-react";

interface HeatCycle {
  id: string;
  mareName: string;
  cycleStartDate: Date;
  estimatedOvulation: Date;
  status: string;
}

interface CycleCalendarProps {
  heatCycles: HeatCycle[];
}

const CycleCalendar = ({ heatCycles }: CycleCalendarProps) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-blue-500" />
            Heat Cycle Calendar
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <CalendarDays className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">Interactive heat cycle calendar coming soon</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Upcoming Ovulations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {heatCycles
              .filter(cycle => cycle.status === 'in_heat')
              .map((cycle) => (
                <div key={cycle.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-medium">{cycle.mareName}</h4>
                      <p className="text-sm text-muted-foreground">Estimated ovulation</p>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    <div>Date: {cycle.estimatedOvulation.toLocaleDateString()}</div>
                  </div>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CycleCalendar;
