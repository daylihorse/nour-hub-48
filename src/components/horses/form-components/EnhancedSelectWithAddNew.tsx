
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus } from "lucide-react";

interface SelectOption {
  value: string;
  label: string;
  arabicLabel?: string;
}

interface EnhancedSelectWithAddNewProps {
  name: string;
  label: string;
  placeholder: string;
  options: SelectOption[];
  required?: boolean;
  isRTL?: boolean;
  onAddNew: () => void;
  addNewLabel?: string;
}

const EnhancedSelectWithAddNew = ({ 
  name, 
  label, 
  placeholder, 
  options, 
  required = false,
  isRTL = false,
  onAddNew,
  addNewLabel = "Add New"
}: EnhancedSelectWithAddNewProps) => {
  const form = useFormContext();

  const handleValueChange = (value: string) => {
    if (value === "__add_new__") {
      onAddNew();
    } else {
      form.setValue(name, value);
    }
  };

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className={isRTL ? "text-right" : ""}>
            {label} {required && "*"}
          </FormLabel>
          <Select onValueChange={handleValueChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger className={isRTL ? "text-right" : ""}>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent className="bg-white z-50">
              {options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  <span className={isRTL ? "text-right" : ""}>
                    {isRTL && option.arabicLabel ? option.arabicLabel : option.label}
                  </span>
                </SelectItem>
              ))}
              <SelectItem value="__add_new__" className="border-t mt-1 pt-2">
                <div className="flex items-center gap-2 font-medium text-primary">
                  <Plus className="h-4 w-4" />
                  <span>{addNewLabel}</span>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default EnhancedSelectWithAddNew;
