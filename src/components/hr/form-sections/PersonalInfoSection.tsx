
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UserRound } from "lucide-react";
import { Control } from "react-hook-form";
import { Employee } from "@/types/employee";

interface PersonalInfoSectionProps {
  control: Control<Omit<Employee, "id">>;
}

export const PersonalInfoSection = ({ control }: PersonalInfoSectionProps) => {
  return (
    <>
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
        name="nickname"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Nickname</FormLabel>
            <FormControl>
              <div className="flex items-center">
                <UserRound className="mr-2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Enter nickname (optional)" {...field} />
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input placeholder="email@example.com" type="email" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};
