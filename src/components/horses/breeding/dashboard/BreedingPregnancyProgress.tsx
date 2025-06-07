
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { calculateProgressPercentage, formatProgressText } from "../utils/breedingUtils";

interface PregnancyItem {
  name: string;
  currentDay: number;
  totalDays: number;
  expectedDate: string;
}

interface BreedingPregnancyProgressProps {
  pregnancies: PregnancyItem[];
}

const BreedingPregnancyProgress = ({ pregnancies }: BreedingPregnancyProgressProps) => {
  return (
    <Card className="lg:col-span-2">
      <CardHeader>
        <CardTitle>Pregnancy Progress</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {pregnancies.map((pregnancy) => {
            const progressPercentage = calculateProgressPercentage(pregnancy.currentDay, pregnancy.totalDays);
            const progressText = formatProgressText(pregnancy.currentDay, pregnancy.totalDays);
            
            return (
              <div key={pregnancy.name} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{pregnancy.name}</span>
                  <span className="text-sm text-muted-foreground">
                    {progressText}
                  </span>
                </div>
                <Progress value={progressPercentage} className="h-2" />
                <p className="text-xs text-muted-foreground">Expected: {pregnancy.expectedDate}</p>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default BreedingPregnancyProgress;
