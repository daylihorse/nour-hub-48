
import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  // Get the current month and year for the default values
  const [currentMonth, setCurrentMonth] = React.useState<Date>(props.defaultMonth || new Date());

  // Handler for month change
  const handleMonthChange = (month: string) => {
    const newDate = new Date(currentMonth);
    newDate.setMonth(parseInt(month));
    setCurrentMonth(newDate);
  };

  // Handler for year change
  const handleYearChange = (year: string) => {
    const newDate = new Date(currentMonth);
    newDate.setFullYear(parseInt(year));
    setCurrentMonth(newDate);
  };

  // Generate month options
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  // Generate year options (10 years back and forward)
  const currentYear = new Date().getFullYear();
  const years = Array.from({
    length: 21
  }, (_, i) => currentYear - 10 + i);
  
  return <DayPicker showOutsideDays={showOutsideDays} className={cn("p-3", className)} classNames={{
    months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
    month: "space-y-4",
    caption: "flex justify-center pt-1 relative items-center",
    caption_label: "text-sm font-medium hidden",
    // Hide the default caption label
    nav: "space-x-1 flex items-center",
    nav_button: cn(buttonVariants({
      variant: "outline"
    }), "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"),
    nav_button_previous: "absolute left-1",
    nav_button_next: "absolute right-1",
    table: "w-full border-collapse space-y-1",
    head_row: "flex",
    head_cell: "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
    row: "flex w-full mt-2",
    cell: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
    day: cn(buttonVariants({
      variant: "ghost"
    }), "h-9 w-9 p-0 font-normal aria-selected:opacity-100"),
    day_range_end: "day-range-end",
    day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
    day_today: "bg-accent text-accent-foreground",
    day_outside: "day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
    day_disabled: "text-muted-foreground opacity-50",
    day_range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
    day_hidden: "invisible",
    ...classNames
  }} components={{
    IconLeft: ({
      ..._props
    }) => <ChevronLeft className="h-4 w-4" />,
    IconRight: ({
      ..._props
    }) => <ChevronRight className="h-4 w-4" />,
    Caption: ({
      displayMonth
    }) => {
      return <div className="flex justify-center items-center space-x-2 py-1">
              <Select value={displayMonth.getMonth().toString()} onValueChange={handleMonthChange}>
                <SelectTrigger className="h-7 w-[110px] font-medium text-base">
                  <SelectValue>
                    {months[displayMonth.getMonth()]}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent position="popper" className="min-w-[280px]">
                  <div className="grid grid-cols-3 gap-1 p-1">
                    {months.map((month, index) => (
                      <SelectItem 
                        key={month} 
                        value={index.toString()} 
                        className="text-xs py-1.5 px-2 rounded-md cursor-pointer"
                      >
                        {month}
                      </SelectItem>
                    ))}
                  </div>
                </SelectContent>
              </Select>

              <Select value={displayMonth.getFullYear().toString()} onValueChange={handleYearChange}>
                <SelectTrigger className="h-7 w-[70px] font-medium text-xs">
                  <SelectValue>
                    {displayMonth.getFullYear()}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent position="popper" className="min-w-[70px] max-h-[180px] overflow-y-auto">
                  <div className="py-1 scroll-smooth" style={{ scrollBehavior: 'smooth' }}>
                    {years.map(year => (
                      <SelectItem 
                        key={year} 
                        value={year.toString()} 
                        className="text-xs py-2"
                      >
                        {year}
                      </SelectItem>
                    ))}
                  </div>
                </SelectContent>
              </Select>
            </div>;
    }
  }} month={currentMonth} onMonthChange={setCurrentMonth} {...props} />;
}
Calendar.displayName = "Calendar";
export { Calendar };
