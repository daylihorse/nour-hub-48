import React from "react";
import { UseFormReturn } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface FormLayoutProps {
  form: UseFormReturn<any>;
  onSubmit: (data: any) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
  submitLabel?: string;
  children: React.ReactNode;
}

export const FormLayout = ({
  form,
  onSubmit,
  onCancel,
  isLoading = false,
  submitLabel = "Save",
  children
}: FormLayoutProps) => {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <ScrollArea className="max-h-[calc(70vh-100px)] pr-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-4">
            {children}
          </div>
        </ScrollArea>
        
        <div className="flex flex-col sm:flex-row sm:justify-end gap-2 pt-4 border-t mt-4 sticky bottom-0 bg-background">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isLoading}
            className="w-full sm:w-auto order-2 sm:order-1"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full sm:w-auto order-1 sm:order-2"
          >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {submitLabel}
          </Button>
        </div>
      </form>
    </Form>
  );
};
