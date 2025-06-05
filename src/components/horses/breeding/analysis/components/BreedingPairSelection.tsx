
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dna } from "lucide-react";

interface Mare {
  id: string;
  name: string;
  pedigree: string;
  geneticProfile: string;
}

interface Stallion {
  id: string;
  name: string;
  pedigree: string;
  geneticProfile: string;
}

interface BreedingPairSelectionProps {
  mares: Mare[];
  stallions: Stallion[];
  selectedMare: string;
  selectedStallion: string;
  onMareSelect: (value: string) => void;
  onStallionSelect: (value: string) => void;
  onAnalyze: () => void;
}

const BreedingPairSelection = ({
  mares,
  stallions,
  selectedMare,
  selectedStallion,
  onMareSelect,
  onStallionSelect,
  onAnalyze
}: BreedingPairSelectionProps) => {
  const canAnalyze = selectedMare && selectedStallion;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Dna className="h-5 w-5 text-purple-500" />
          Breeding Pair Selection
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Select Mare</label>
            <Select value={selectedMare} onValueChange={onMareSelect}>
              <SelectTrigger>
                <SelectValue placeholder="Choose a mare" />
              </SelectTrigger>
              <SelectContent>
                {mares.map((mare) => (
                  <SelectItem key={mare.id} value={mare.id}>
                    {mare.name} - {mare.geneticProfile} Profile
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Select Stallion</label>
            <Select value={selectedStallion} onValueChange={onStallionSelect}>
              <SelectTrigger>
                <SelectValue placeholder="Choose a stallion" />
              </SelectTrigger>
              <SelectContent>
                {stallions.map((stallion) => (
                  <SelectItem key={stallion.id} value={stallion.id}>
                    {stallion.name} - {stallion.geneticProfile} Profile
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex justify-center mt-4">
          <Button disabled={!canAnalyze} onClick={onAnalyze} className="flex items-center gap-2">
            <Dna className="h-4 w-4" />
            Run Genetic Analysis
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default BreedingPairSelection;
