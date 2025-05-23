
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { FormValues, formSchema, InventoryItemFormProps } from "./item-form/FormSchema";
import BasicInfoSection from "./item-form/BasicInfoSection";
import ProductDetailsSection from "./item-form/ProductDetailsSection";
import ImageUploadSection from "./item-form/ImageUploadSection";

const InventoryItemForm = ({ onSave, onCancel }: InventoryItemFormProps) => {
  const [selectedImages, setSelectedImages] = useState<string[]>([]);

  // Initialize the form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productName: "",
      entryDate: new Date(),
      quantitiesPurchased: 1,
      listForSale: false,
    },
  });

  // Form submission handler
  const onSubmit = (values: FormValues) => {
    onSave({
      ...values,
      images: selectedImages,
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <BasicInfoSection form={form} />
        <ProductDetailsSection form={form} />
        <ImageUploadSection 
          selectedImages={selectedImages}
          setSelectedImages={setSelectedImages}
        />

        <div className="flex justify-between">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">Save</Button>
        </div>
      </form>
    </Form>
  );
};

export default InventoryItemForm;
