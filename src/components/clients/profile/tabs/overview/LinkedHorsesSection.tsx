
import { User } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface LinkedHorsesSectionProps {
  linkedHorses: string[];
  onViewHorses: () => void;
}

const LinkedHorsesSection = ({ linkedHorses, onViewHorses }: LinkedHorsesSectionProps) => {
  return (
    <div>
      <h3 className="font-semibold text-base mb-3 flex items-center">
        <User className="h-4 w-4 mr-2 text-purple-500" />
        Linked Horses
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {linkedHorses.map((horseId) => (
          <Card 
            key={horseId}
            className="bg-gradient-to-br from-purple-50 to-purple-100/50 hover:shadow-md transition-all cursor-pointer"
            onClick={onViewHorses}
          >
            <CardContent className="p-3 flex items-center">
              <div className="w-10 h-10 rounded-full bg-purple-200 flex items-center justify-center mr-3">
                <User className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="font-medium text-purple-800">Horse #{horseId.split('-')[1]}</p>
                <p className="text-xs text-purple-600">Click to view details</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default LinkedHorsesSection;
