
import { useFormContext } from "react-hook-form";
import { Plus, X } from "lucide-react";
import { useState } from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { HorseFormValues } from "../form-schema/HorseFormSchema";

const StableManagementStage = () => {
  const form = useFormContext<HorseFormValues>();
  const [newSpecialNeed, setNewSpecialNeed] = useState("");

  const addSpecialNeed = () => {
    if (newSpecialNeed.trim()) {
      const currentNeeds = form.getValues("specialNeeds") || [];
      form.setValue("specialNeeds", [...currentNeeds, newSpecialNeed.trim()]);
      setNewSpecialNeed("");
    }
  };

  const removeSpecialNeed = (index: number) => {
    const currentNeeds = form.getValues("specialNeeds") || [];
    form.setValue("specialNeeds", currentNeeds.filter((_, i) => i !== index));
  };

  const specialNeeds = form.watch("specialNeeds") || [];

  return (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="stallNumber"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Stall Number</FormLabel>
            <FormControl>
              <Input placeholder="e.g., A-12, B-05" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="feedingSchedule"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Feeding Schedule</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Describe feeding times and diet..."
                  className="min-h-20"
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="exerciseRoutine"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Exercise Routine</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Describe daily exercise routine..."
                  className="min-h-20"
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div>
        <FormLabel>Special Needs</FormLabel>
        <div className="flex gap-2 mt-2">
          <Input
            placeholder="Add special need or requirement"
            value={newSpecialNeed}
            onChange={(e) => setNewSpecialNeed(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addSpecialNeed())}
          />
          <Button type="button" onClick={addSpecialNeed} size="icon">
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        {specialNeeds.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {specialNeeds.map((need, index) => (
              <Badge key={index} variant="outline" className="flex items-center gap-1">
                {need}
                <button
                  type="button"
                  onClick={() => removeSpecialNeed(index)}
                  className="ml-1 hover:text-destructive"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
        )}
      </div>

      <div className="bg-amber-50 p-4 rounded-lg">
        <h5 className="font-medium text-amber-900 mb-2">Stable Management Notes</h5>
        <p className="text-sm text-amber-700">
          This information helps the stable staff provide proper care for the horse. 
          Include any specific requirements, preferences, or behavioral notes that are important for daily care.
        </p>
      </div>
    </div>
  );
};

export default StableManagementStage;
