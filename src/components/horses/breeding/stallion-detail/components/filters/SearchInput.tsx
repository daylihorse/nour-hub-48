
import { Input } from '@/components/ui/input';

interface SearchInputProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

const SearchInput = ({ 
  searchTerm, 
  onSearchChange, 
  placeholder = "Search records...",
  className = "max-w-xs"
}: SearchInputProps) => {
  return (
    <div className="flex-1">
      <Input
        placeholder={placeholder}
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className={className}
      />
    </div>
  );
};

export default SearchInput;
