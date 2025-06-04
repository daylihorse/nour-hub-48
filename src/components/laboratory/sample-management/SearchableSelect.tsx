
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
  const [searchValue, setSearchValue] = useState("");

  const selectedOption = options.find((option) => option.value === value);

  // Filter options based on search value
  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchValue.toLowerCase())
  );

  const handleSelect = (selectedValue: string) => {
    console.log("HandleSelect called with:", selectedValue);
    
    if (selectedValue === "__add_new__") {
      console.log("Add new triggered");
      handleClose();
      onAddNew?.();
      return;
    }

    // Direct value matching since we now use consistent values
    const matchedOption = options.find(option => option.value === selectedValue);

    if (matchedOption) {
      console.log("Setting value:", matchedOption.value);
      onValueChange(matchedOption.value === value ? "" : matchedOption.value);
    } else {
      console.log("No match found for:", selectedValue);
    }
    
    handleClose();
  };

  const handleClose = () => {
    setOpen(false);
    setSearchValue("");
  };

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
    if (!newOpen) {
      setSearchValue("");
    }
  };

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
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
      <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0 bg-white border border-gray-200 shadow-lg z-[100]" align="start">
        <Command shouldFilter={false}>
          <CommandInput 
            placeholder={`Search ${placeholder.toLowerCase()}...`}
            value={searchValue}
            onValueChange={setSearchValue}
            className="h-9"
          />
          <CommandList>
            <CommandEmpty>
              {searchValue ? `No results found for "${searchValue}"` : "No options available"}
            </CommandEmpty>
            <CommandGroup>
              {filteredOptions.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  onSelect={() => handleSelect(option.value)}
                  className="cursor-pointer flex items-center"
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
                  className="border-t mt-1 pt-2 cursor-pointer bg-blue-50 hover:bg-blue-100 flex items-center"
                >
                  <Plus className="mr-2 h-4 w-4 text-blue-600" />
                  <span className="font-medium text-blue-600">{addNewLabel}</span>
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
