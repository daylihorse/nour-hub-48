
import { User } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HorseOwner } from "@/types/client";

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
        
        {/* Linked Horses Section */}
        {horseOwner.linkedHorses && horseOwner.linkedHorses.length > 0 && (
          <div className="mt-4">
            <h3 className="text-sm font-medium mb-2">Linked Horses</h3>
            <div className="grid grid-cols-1 gap-2">
              {horseOwner.linkedHorses.map((horseId) => (
                <Card 
                  key={horseId}
                  className="bg-gradient-to-br from-purple-50 to-purple-100/50 hover:shadow-md transition-all cursor-pointer"
                  onClick={onViewHorses}
                >
                  <CardContent className="p-2 flex items-center">
                    <div className="w-8 h-8 rounded-full bg-purple-200 flex items-center justify-center mr-2">
                      <User className="h-4 w-4 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-purple-800">Horse #{horseId.split('-')[1]}</p>
                      <p className="text-xs text-purple-600">Click to view details</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ClientStatistics;
