
import { UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormValues, classificationOptions } from "../FormSchema";
import AddCategoryDialog from "../dialogs/AddCategoryDialog";

interface ClassificationFieldProps {
  form: UseFormReturn<FormValues>;
}

const ClassificationField = ({ form }: ClassificationFieldProps) => {
  return (
    <FormField
      control={form.control}
      name="classification"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Service Classification</FormLabel>
          <div className="flex space-x-2">
            <FormControl>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select classification" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="categories">Categories</SelectItem>
                  {classificationOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                  <AddCategoryDialog />
                </SelectContent>
              </Select>
            </FormControl>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default ClassificationField;
