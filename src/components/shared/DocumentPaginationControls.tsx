
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface DocumentPaginationControlsProps {
  cardsPerRow: number;
  onCardsPerRowChange: (cardsPerRow: number) => void;
  label?: string;
  options?: { value: string; label: string; cardsPerRow: number }[];
}

const DocumentPaginationControls = ({
  cardsPerRow,
  onCardsPerRowChange,
  label = "Cards per row:",
  options = [
    { value: "2", label: "2", cardsPerRow: 2 },
    { value: "3", label: "3", cardsPerRow: 3 },
    { value: "4", label: "4", cardsPerRow: 4 }
  ]
}: DocumentPaginationControlsProps) => {
  const getCurrentValue = () => {
    const option = options.find(opt => opt.cardsPerRow === cardsPerRow);
    return option ? option.value : options[1].value; // default to "3"
  };

  const handleChange = (value: string) => {
    const option = options.find(opt => opt.value === value);
    if (option) {
      onCardsPerRowChange(option.cardsPerRow);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-muted-foreground">{label}</span>
      <Select value={getCurrentValue()} onValueChange={handleChange}>
        <SelectTrigger className="w-16">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {options.map(option => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default DocumentPaginationControls;
