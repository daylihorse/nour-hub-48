
import { useState } from "react";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDown, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchableSelectOption {
  value: string;
  label: string;
}

interface SearchableSelectProps {
  options: SearchableSelectOption[];
  value: string;
  placeholder: string;
  onValueChange: (value: string) => void;
  onAddNew?: () => void;
  addNewLabel?: string;
}

const SearchableSelect = ({
  options,
  value,
  placeholder,
  onValueChange,
  onAddNew,
  addNewLabel = "Add New"
}: SearchableSelectProps) => {
  const [open, setOpen] = useState(false);

  const filteredOptions = options;
  const selectedOption = options.find((option) => option.value === value);

  const handleSelect = (selectedValue: string) => {
    if (selectedValue === "__add_new__") {
      onAddNew?.();
    } else {
      onValueChange(selectedValue === value ? "" : selectedValue);
    }
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {selectedOption ? selectedOption.label : placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0 bg-white border shadow-lg z-50">
        <Command>
          <CommandInput 
            placeholder={`Search ${placeholder.toLowerCase()}...`}
          />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {filteredOptions.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  onSelect={() => handleSelect(option.value)}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === option.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {option.label}
                </CommandItem>
              ))}
              {onAddNew && (
                <CommandItem
                  value="__add_new__"
                  onSelect={() => handleSelect("__add_new__")}
                  className="border-t mt-1 pt-2"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  <span className="font-medium text-primary">{addNewLabel}</span>
                </CommandItem>
              )}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default SearchableSelect;
