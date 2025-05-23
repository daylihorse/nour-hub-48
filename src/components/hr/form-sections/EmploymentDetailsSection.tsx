import { useState } from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { CalendarIcon, Plus } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Control } from "react-hook-form";
interface EmploymentDetailsSectionProps {
  control: Control<any>;
  date: Date;
  setDate: (date: Date) => void;
}
const availablePositions = ["Manager", "Supervisor", "Veterinarian", "Lab Technician", "Administrator", "Stable Hand", "Horse Trainer", "Receptionist", "Accountant", "Security", "Other"];
const currencies = [{
  code: "USD",
  symbol: "$"
}, {
  code: "EUR",
  symbol: "€"
}, {
  code: "GBP",
  symbol: "£"
}, {
  code: "SAR",
  symbol: "﷼"
}, {
  code: "AED",
  symbol: "د.إ"
}, {
  code: "EGP",
  symbol: "E£"
}];
export const EmploymentDetailsSection = ({
  control,
  date,
  setDate
}: EmploymentDetailsSectionProps) => {
  const [showOtherPosition, setShowOtherPosition] = useState(false);
  const [selectedPositions, setSelectedPositions] = useState<string[]>([]);
  const [otherPosition, setOtherPosition] = useState("");
  const [selectedCurrency, setSelectedCurrency] = useState("USD");
  const handlePositionChange = (position: string) => {
    setSelectedPositions(current => {
      // If "Other" is selected, show the input field
      if (position === "Other") {
        setShowOtherPosition(true);
      }

      // If position is already selected, remove it
      if (current.includes(position)) {
        const newPositions = current.filter(p => p !== position);
        // If "Other" is unselected, hide the input field
        if (position === "Other") {
          setShowOtherPosition(false);
          setOtherPosition("");
        }
        return newPositions;
      }

      // Otherwise, add the position
      return [...current, position];
    });
  };
  const formatSalary = (value: string) => {
    // Remove any non-digits
    const digits = value.replace(/\D/g, '');

    // Add commas for thousands
    if (digits) {
      return digits.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
    return '';
  };
  return <>
      <div className="space-y-4">
        <FormLabel>Position</FormLabel>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {availablePositions.map(position => <div key={position} className="flex items-center space-x-2">
              <Checkbox id={`position-${position}`} checked={selectedPositions.includes(position)} onCheckedChange={() => handlePositionChange(position)} />
              <label htmlFor={`position-${position}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                {position}
              </label>
            </div>)}
        </div>
        
        {showOtherPosition && <FormField control={control} name="otherPosition" render={({
        field
      }) => <FormItem>
                <FormLabel>Other Position</FormLabel>
                <FormControl>
                  <Input placeholder="Specify position" {...field} value={otherPosition} onChange={e => {
            setOtherPosition(e.target.value);
            field.onChange(e);
          }} />
                </FormControl>
                <FormMessage />
              </FormItem>} />}
        
        <FormField control={control} name="positions" render={({
        field
      }) => <FormItem className="hidden">
              <FormControl>
                <Input type="hidden" {...field} value={JSON.stringify([...selectedPositions.filter(p => p !== "Other"), ...(otherPosition && showOtherPosition ? [otherPosition] : [])])} />
              </FormControl>
            </FormItem>} />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField control={control} name="hireDate" render={({
        field
      }) => <FormItem className="flex flex-col">
              <FormLabel className="my-[10px]">Hire Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button variant="outline" className="font-normal text-base">
                      {field.value ? format(field.value, "dd/MM/yyyy") : <span>Pick a date</span>}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar mode="single" selected={field.value} onSelect={date => {
              field.onChange(date);
              setDate(date || new Date());
            }} initialFocus className="p-3 pointer-events-auto" />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>} />
        
        <FormField control={control} name="status" render={({
        field
      }) => <FormItem>
              <FormLabel>Status</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="on-leave">On Leave</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>} />
      </div>

      <div className="space-y-4">
        <FormLabel>Salary</FormLabel>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex">
            <Select value={selectedCurrency} onValueChange={setSelectedCurrency}>
              <SelectTrigger className="w-[100px] rounded-r-none">
                <SelectValue placeholder="Currency" />
              </SelectTrigger>
              <SelectContent>
                {currencies.map(currency => <SelectItem key={currency.code} value={currency.code}>
                    {currency.symbol} {currency.code}
                  </SelectItem>)}
              </SelectContent>
            </Select>
            
            <FormField control={control} name="salary" render={({
            field
          }) => <FormItem className="flex-1">
                  <FormControl>
                    <Input className="rounded-l-none" placeholder="0.00" {...field} onChange={e => {
                const formattedValue = formatSalary(e.target.value);
                e.target.value = formattedValue;
                field.onChange(formattedValue === "" ? undefined : parseFloat(formattedValue.replace(/,/g, '')));
              }} value={typeof field.value === 'number' ? formatSalary(field.value.toString()) : ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>} />
          </div>
          
          <FormField control={control} name="salaryType" render={({
          field
        }) => <FormItem className="space-y-3">
                <FormControl>
                  <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-row space-x-4">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="daily" id="daily" />
                      <FormLabel htmlFor="daily" className="cursor-pointer font-normal">
                        Daily
                      </FormLabel>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="monthly" id="monthly" />
                      <FormLabel htmlFor="monthly" className="cursor-pointer font-normal">
                        Monthly
                      </FormLabel>
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>} />
        </div>
        
        <FormField control={control} name="currency" render={({
        field
      }) => <FormItem className="hidden">
              <FormControl>
                <Input type="hidden" {...field} value={selectedCurrency} />
              </FormControl>
            </FormItem>} />
      </div>
    </>;
};