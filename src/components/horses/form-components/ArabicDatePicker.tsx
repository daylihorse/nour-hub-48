
import { useFormContext } from "react-hook-form";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { ar } from "date-fns/locale";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { arabicLabels } from "./constants/arabicLabels";

interface ArabicDatePickerProps {
  name: string;
  label: string;
  placeholder: string;
  required?: boolean;
  minDate?: Date;
  maxDate?: Date;
}

const ArabicDatePicker = ({ 
  name, 
  label, 
  placeholder, 
  required = false,
  minDate,
  maxDate
}: ArabicDatePickerProps) => {
  const form = useFormContext();
  const arabicLabel = arabicLabels[label] || label;
  const arabicPlaceholder = arabicLabels[placeholder] || placeholder;

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col text-right">
          <FormLabel className="text-right block">
            {arabicLabel} {required && "*"}
          </FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full text-right font-normal",
                    !field.value && "text-muted-foreground"
                  )}
                >
                  {field.value ? (
                    format(field.value, "PPP", { locale: ar })
                  ) : (
                    <span>{arabicPlaceholder}</span>
                  )}
                  <CalendarIcon className="mr-auto h-4 w-4 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 bg-white z-50" align="start">
              <Calendar
                mode="single"
                selected={field.value}
                onSelect={field.onChange}
                disabled={(date) => {
                  if (maxDate && date > maxDate) return true;
                  if (minDate && date < minDate) return true;
                  return false;
                }}
                initialFocus
                className="p-3"
                locale={ar}
              />
            </PopoverContent>
          </Popover>
          <FormMessage className="text-right" />
        </FormItem>
      )}
    />
  );
};

export default ArabicDatePicker;
