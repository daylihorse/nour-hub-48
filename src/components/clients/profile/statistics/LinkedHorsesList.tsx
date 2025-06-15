
import { User } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface LinkedHorsesListProps {
  linkedHorses?: string[];
  onViewHorses: () => void;
}

const LinkedHorsesList = ({ linkedHorses, onViewHorses }: LinkedHorsesListProps) => {
  if (!linkedHorses || linkedHorses.length === 0) {
    return null;
  }

  return (
    <div className="mt-4">
      <h3 className="text-sm font-medium mb-2">Linked Horses</h3>
      <div className="grid grid-cols-1 gap-2">
        {linkedHorses.map((horseId) => (
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
  );
};

export default LinkedHorsesList;
