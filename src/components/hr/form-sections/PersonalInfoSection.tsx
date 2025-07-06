import { Control } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface PersonalInfoSectionProps {
  control: Control<any>;
}

export const PersonalInfoSection = ({ control }: PersonalInfoSectionProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <FormField
        control={control}
        name="firstName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>First Name</FormLabel>
            <FormControl>
              <Input placeholder="Enter first name" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={control}
        name="firstNameArabic"
        render={({ field }) => (
          <FormItem>
            <FormLabel>First Name (Arabic)</FormLabel>
            <FormControl>
              <Input placeholder="Enter first name in Arabic" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={control}
        name="lastName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Last Name</FormLabel>
            <FormControl>
              <Input placeholder="Enter last name" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={control}
        name="lastNameArabic"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Last Name (Arabic)</FormLabel>
            <FormControl>
              <Input placeholder="Enter last name in Arabic" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={control}
        name="nickname"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Nickname</FormLabel>
            <FormControl>
              <Input placeholder="Enter nickname" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={control}
        name="nicknameArabic"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Nickname (Arabic)</FormLabel>
            <FormControl>
              <Input placeholder="Enter nickname in Arabic" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={control}
        name="email"
        render={({ field }) => (
          <FormItem className="md:col-span-2">
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input type="email" placeholder="Enter email address" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};