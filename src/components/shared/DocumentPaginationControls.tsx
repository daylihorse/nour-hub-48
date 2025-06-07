
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface DocumentPaginationControlsProps {
  itemsPerPage: number;
  onItemsPerPageChange: (itemsPerPage: number) => void;
}

const DocumentPaginationControls = ({
  itemsPerPage,
  onItemsPerPageChange,
}: DocumentPaginationControlsProps) => {
  // Convert display number to actual items per page (cards per row * 3 rows)
  const getItemsPerPage = (cardsPerRow: number) => cardsPerRow * 3;
  
  // Convert items per page back to display number
  const getDisplayValue = (itemsPerPage: number) => {
    if (itemsPerPage === 6) return "2";
    if (itemsPerPage === 9) return "3"; 
    if (itemsPerPage === 12) return "4";
    return "3"; // default
  };

  const handleChange = (value: string) => {
    const cardsPerRow = parseInt(value);
    onItemsPerPageChange(getItemsPerPage(cardsPerRow));
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-muted-foreground">Cards per row:</span>
      <Select value={getDisplayValue(itemsPerPage)} onValueChange={handleChange}>
        <SelectTrigger className="w-16">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="2">2</SelectItem>
          <SelectItem value="3">3</SelectItem>
          <SelectItem value="4">4</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default DocumentPaginationControls;
