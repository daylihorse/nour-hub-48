
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface Sample {
  id: string;
  horseName: string;
  horsePhoto: string;
  clientName: string;
  clientPhone: string;
  clientEmail: string;
}

interface SampleSelectionSectionProps {
  selectedSampleId: string;
  onSampleSelect: (sampleId: string) => void;
}

const SampleSelectionSection = ({ selectedSampleId, onSampleSelect }: SampleSelectionSectionProps) => {
  // Mock samples data - in real app this would come from an API
  const availableSamples: Sample[] = [
    { id: "S004", horseName: "Lightning", horsePhoto: "/placeholder.svg", clientName: "Mike Johnson", clientPhone: "+1-555-0126", clientEmail: "mike.j@email.com" },
    { id: "S005", horseName: "Spirit", horsePhoto: "/placeholder.svg", clientName: "Sarah Wilson", clientPhone: "+1-555-0127", clientEmail: "sarah.w@email.com" },
    { id: "S006", horseName: "Midnight", horsePhoto: "/placeholder.svg", clientName: "Tom Davis", clientPhone: "+1-555-0128", clientEmail: "tom.d@email.com" }
  ];

  return (
    <div>
      <Label htmlFor="sample">Select Sample</Label>
      <Select value={selectedSampleId} onValueChange={onSampleSelect}>
        <SelectTrigger>
          <SelectValue placeholder="Choose a sample to analyze" />
        </SelectTrigger>
        <SelectContent>
          {availableSamples.map((sample) => (
            <SelectItem key={sample.id} value={sample.id}>
              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={sample.horsePhoto} alt={sample.horseName} />
                  <AvatarFallback>{sample.horseName.charAt(0)}</AvatarFallback>
                </Avatar>
                <span>{sample.id} - {sample.horseName} ({sample.clientName})</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default SampleSelectionSection;
