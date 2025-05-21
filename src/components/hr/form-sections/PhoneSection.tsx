
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { MessageCircle, MessageSquare } from "lucide-react";
import { Control } from "react-hook-form";
import { Employee } from "@/types/employee";

interface PhoneSectionProps {
  control: Control<Omit<Employee, "id">>;
}

// Common country codes
const countryCodes = [
  { code: "+1", country: "United States/Canada" },
  { code: "+44", country: "United Kingdom" },
  { code: "+52", country: "Mexico" },
  { code: "+33", country: "France" },
  { code: "+49", country: "Germany" },
  { code: "+61", country: "Australia" },
  { code: "+86", country: "China" },
  { code: "+91", country: "India" },
  { code: "+81", country: "Japan" },
  { code: "+55", country: "Brazil" },
  { code: "+27", country: "South Africa" },
  { code: "+7", country: "Russia" },
  { code: "+971", country: "UAE" },
  { code: "+966", country: "Saudi Arabia" },
  { code: "+34", country: "Spain" },
  { code: "+39", country: "Italy" },
];

export const PhoneSection = ({ control }: PhoneSectionProps) => {
  return (
    <div>
      <FormLabel>Phone</FormLabel>
      <div className="space-y-4">
        <div className="flex space-x-2">
          <div className="w-1/3">
            <FormField
              control={control}
              name="phone.countryCode"
              render={({ field }) => (
                <FormItem>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Code" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {countryCodes.map((item) => (
                        <SelectItem key={item.code} value={item.code}>
                          <span className="flex items-center">
                            <span className="font-medium">{item.code}</span>
                            <span className="ml-1 text-muted-foreground text-xs">
                              {item.country}
                            </span>
                          </span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <div className="flex-1">
            <FormField
              control={control}
              name="phone.number"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex items-center">
                      <MessageCircle className="mr-2 h-4 w-4 text-muted-foreground" />
                      <Input placeholder="(123) 456-7890" {...field} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={control}
            name="phone.hasWhatsapp"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                <div className="space-y-0.5 leading-none">
                  <FormLabel>
                    <div className="flex items-center">
                      {/* Note: Fixed WhatsApp capitalization */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-2 h-4 w-4 text-green-500"
                      >
                        <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
                        <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1Z" />
                        <path d="M13 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1Z" />
                        <path d="M9 14a5 5 0 0 0 6 0" />
                      </svg>
                      WhatsApp
                    </div>
                  </FormLabel>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          
          <FormField
            control={control}
            name="phone.hasTelegram"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                <div className="space-y-0.5 leading-none">
                  <FormLabel>
                    <div className="flex items-center">
                      <MessageSquare className="mr-2 h-4 w-4 text-blue-500" />
                      Telegram
                    </div>
                  </FormLabel>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
      </div>
    </div>
  );
};
