import { Control } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";

interface EmploymentDetailsSectionProps {
  control: Control<any>;
  date: Date;
  setDate: (date: Date) => void;
}

export const EmploymentDetailsSection = ({ control, date, setDate }: EmploymentDetailsSectionProps) => {
  const { t } = useLanguage();
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <FormField
        control={control}
        name="position"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t('hr.position')}</FormLabel>
            <FormControl>
              <Input placeholder={t('hr.position_placeholder')} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={control}
        name="otherPosition"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t('hr.other_position')}</FormLabel>
            <FormControl>
              <Input placeholder={t('hr.other_position_placeholder')} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={control}
        name="hireDate"
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <FormLabel>{t('hr.hire_date')}</FormLabel>
            <Popover>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant={"outline"}
                     className={cn(
                      "w-full pl-3 text-left font-normal rtl:pr-3 rtl:pl-0 rtl:text-right",
                      !field.value && "text-muted-foreground"
                    )}
                  >
                    {field.value ? (
                      format(field.value, "PPP")
                    ) : (
                      <span>{t('hr.pick_date')}</span>
                    )}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50 rtl:mr-auto rtl:ml-0" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={field.value}
                  onSelect={field.onChange}
                  disabled={(date) =>
                    date > new Date() || date < new Date("1900-01-01")
                  }
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={control}
        name="status"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t('hr.status')}</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder={t('hr.select_employment_status')} />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="active">{t('hr.active')}</SelectItem>
                <SelectItem value="inactive">{t('hr.inactive')}</SelectItem>
                <SelectItem value="on-leave">{t('hr.on_leave')}</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={control}
        name="salary"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t('hr.salary')}</FormLabel>
            <FormControl>
              <Input 
                type="number" 
                placeholder={t('hr.salary_placeholder')} 
                {...field}
                onChange={(e) => field.onChange(e.target.value ? parseFloat(e.target.value) : undefined)}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={control}
        name="currency"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t('hr.currency')}</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value || "USD"}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder={t('hr.select_currency')} />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="USD">USD</SelectItem>
                <SelectItem value="EUR">EUR</SelectItem>
                <SelectItem value="GBP">GBP</SelectItem>
                <SelectItem value="AED">AED</SelectItem>
                <SelectItem value="SAR">SAR</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={control}
        name="salaryType"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t('hr.salary_type')}</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value || "monthly"}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder={t('hr.select_salary_type')} />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="daily">{t('hr.daily')}</SelectItem>
                <SelectItem value="monthly">{t('hr.monthly')}</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};