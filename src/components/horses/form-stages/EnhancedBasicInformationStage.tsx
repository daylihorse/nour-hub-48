import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";
import { HorseFormData } from "@/types/horse";
import EnhancedGenderAgeClassSection from "./EnhancedGenderAgeClassSection";

const EnhancedBasicInformationStage = () => {
  const form = useFormContext<HorseFormData>();

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Horse Name */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Horse Name *</FormLabel>
              <FormControl>
                <Input placeholder="Enter horse name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Arabic Name */}
        <FormField
          control={form.control}
          name="arabicName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Arabic Name</FormLabel>
              <FormControl>
                <Input 
                  placeholder="Enter Arabic name (optional)" 
                  {...field} 
                  dir="rtl"
                  className="font-arabic"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Breed */}
        <FormField
          control={form.control}
          name="breed"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Breed *</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Arabian, Thoroughbred" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Color */}
        <FormField
          control={form.control}
          name="color"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Color *</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Bay, Chestnut, Black" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {/* Enhanced Gender and Age Classification Section */}
      <div className="border-t pt-6">
        <h3 className="text-lg font-semibold mb-4">Gender & Age Classification</h3>
        <EnhancedGenderAgeClassSection />
      </div>
    </div>
  );
};

export default EnhancedBasicInformationStage;