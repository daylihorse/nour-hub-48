
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface GeldingFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const GeldingFilters = ({ searchTerm, setSearchTerm }: GeldingFiltersProps) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          placeholder="Search geldings by name, breed, or owner..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>
    </div>
  );
};

export default GeldingFilters;
