
import { UseFormReturn } from "react-hook-form";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Switch } from "@/components/ui/switch";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { FormValues } from "../FormSchema";

interface DateFieldsProps {
  form: UseFormReturn<FormValues>;
}

const DateFields = ({ form }: DateFieldsProps) => {
  return (
    <>
      <FormField
        control={form.control}
        name="approvalDate"
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <FormLabel>Service Approval Date</FormLabel>
            <Popover>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full pl-3 text-left font-normal",
                      !field.value && "text-muted-foreground"
                    )}
                  >
                    {field.value ? (
                      format(field.value, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={field.value}
                  onSelect={field.onChange}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="addExpiryDate"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <div className="flex flex-row items-center justify-between">
              <FormLabel>Would you like to add an expiry date for this service?</FormLabel>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </div>
            <div className="flex space-x-2">
              <Button
                type="button"
                variant={!field.value ? "secondary" : "outline"}
                className={cn(
                  "flex-1",
                  !field.value && "bg-muted"
                )}
                onClick={() => form.setValue("addExpiryDate", false)}
              >
                No
              </Button>
              <Button
                type="button"
                variant={field.value ? "secondary" : "outline"}
                className={cn(
                  "flex-1",
                  field.value && "bg-muted"
                )}
                onClick={() => form.setValue("addExpiryDate", true)}
              >
                Yes
              </Button>
            </div>
            <FormMessage />
          </FormItem>
        )}
      />

      {form.watch("addExpiryDate") && (
        <FormField
          control={form.control}
          name="expiryDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Expiry Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value || undefined}
                    onSelect={field.onChange}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
    </>
  );
};

export default DateFields;
