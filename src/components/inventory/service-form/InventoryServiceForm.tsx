
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { formSchema, FormValues, InventoryServiceFormProps } from "./FormSchema";
import BasicInfoSection from "./BasicInfoSection";
import ServiceDetailsSection from "./ServiceDetailsSection";
import ImageUploadSection from "./ImageUploadSection";

const InventoryServiceForm = ({ onSave, onCancel }: InventoryServiceFormProps) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      serviceName: "",
      classification: "",
      approvalDate: new Date(),
      addExpiryDate: false,
      supplier: "",
      group: "",
      additionalNotes: "",
      serviceOffers: 1,
      alertThreshold: 1,
      purchasePrice: 0,
      listForSale: false,
      sellingPrice: 0,
      images: [],
    },
  });

  const onSubmit = (data: FormValues) => {
    onSave(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <BasicInfoSection form={form} />
        <ServiceDetailsSection form={form} />
        <ImageUploadSection form={form} />
        
        <div className="flex justify-end space-x-2 pt-4">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">Save Service</Button>
        </div>
      </form>
    </Form>
  );
};

export default InventoryServiceForm;
