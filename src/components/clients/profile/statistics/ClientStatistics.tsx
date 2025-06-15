
import { User } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HorseOwner } from "@/types/client";
import LinkedHorsesList from "./LinkedHorsesList";

interface ClientStatisticsProps {
  horseOwner: HorseOwner;
  onViewHorses: () => void;
}

const ClientStatistics = ({ horseOwner, onViewHorses }: ClientStatisticsProps) => {
  return (
    <Card className="shadow-md border-0 bg-white/80 backdrop-blur-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm flex items-center">
          <User className="h-4 w-4 mr-2 text-purple-500" />
          Statistics
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="grid grid-cols-2 gap-2">
          <div className="text-center p-2 rounded-lg bg-purple-50">
            <div className="text-lg font-bold text-purple-600">{horseOwner.horsesOwned}</div>
            <div className="text-xs text-purple-600">Horses</div>
          </div>
          {horseOwner.billingInfo && (
            <div className="text-center p-2 rounded-lg bg-red-50">
              <div className="text-lg font-bold text-red-600">${horseOwner.billingInfo.outstanding.toFixed(0)}</div>
              <div className="text-xs text-red-600">Outstanding</div>
            </div>
          )}
        </div>
        {horseOwner.stableAssignment && (
          <div className="mt-2 p-2 rounded-lg bg-gray-50">
            <div className="text-xs font-medium text-gray-700">Stable Assignment</div>
            <div className="text-xs text-gray-600">{horseOwner.stableAssignment}</div>
          </div>
        )}
        
        <LinkedHorsesList 
          linkedHorses={horseOwner.linkedHorses} 
          onViewHorses={onViewHorses} 
        />
      </CardContent>
    </Card>
  );
};

export default ClientStatistics;
