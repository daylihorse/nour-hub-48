import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UserRound } from "lucide-react";
import { Control } from "react-hook-form";
interface PersonalInfoSectionProps {
  control: Control<any>;
}
export const PersonalInfoSection = ({
  control
}: PersonalInfoSectionProps) => {
  return <>
      <div className="grid grid-cols-2 gap-4">
        <FormField control={control} name="firstName" render={({
        field
      }) => <FormItem className="rounded-xl">
              <FormLabel>First Name (English)</FormLabel>
              <FormControl>
                <Input placeholder="Enter first name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>} />
        
        <FormField control={control} name="firstNameArabic" render={({
        field
      }) => <FormItem>
              <FormLabel>First Name (Arabic)</FormLabel>
              <FormControl>
                <Input placeholder="أدخل الاسم الأول" dir="rtl" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>} />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <FormField control={control} name="lastName" render={({
        field
      }) => <FormItem className="rounded-md bg-slate-50 px-0 mx-0 my-[13px]">
              <FormLabel>Last Name (English)</FormLabel>
              <FormControl>
                <Input placeholder="Enter last name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>} />
        
        <FormField control={control} name="lastNameArabic" render={({
        field
      }) => <FormItem className="my-[13px]">
              <FormLabel>Last Name (Arabic)</FormLabel>
              <FormControl>
                <Input placeholder="أدخل اسم العائلة" dir="rtl" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>} />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <FormField control={control} name="nickname" render={({
        field
      }) => <FormItem className="my-[13px]">
              <FormLabel>Nickname (English)</FormLabel>
              <FormControl>
                <div className="flex items-center">
                  <UserRound className="mr-2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Enter nickname (optional)" {...field} />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>} />
        
        <FormField control={control} name="nicknameArabic" render={({
        field
      }) => <FormItem className="my-[13px]">
              <FormLabel>Nickname (Arabic)</FormLabel>
              <FormControl>
                <div className="flex items-center">
                  <UserRound className="mr-2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="أدخل اللقب (اختياري)" dir="rtl" {...field} />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>} />
      </div>
      
      <FormField control={control} name="email" render={({
      field
    }) => <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input placeholder="email@example.com" type="email" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>} />
    </>;
};