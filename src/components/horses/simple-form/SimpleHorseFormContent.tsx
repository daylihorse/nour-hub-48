
import { useFormContext } from "react-hook-form";
import { CardContent } from "@/components/ui/card";
import { SimpleHorseFormData } from "../form-schema/SimpleHorseFormSchema";
import BasicInformationSection from "./BasicInformationSection";
import OwnershipHealthSection from "./OwnershipHealthSection";
import SimpleHorseFormActions from "./SimpleHorseFormActions";

interface SimpleHorseFormContentProps {
  onCancel: () => void;
  onSubmit: (data: SimpleHorseFormData) => void;
  isSubmitting: boolean;
}

const SimpleHorseFormContent = ({ onCancel, onSubmit, isSubmitting }: SimpleHorseFormContentProps) => {
  const form = useFormContext<SimpleHorseFormData>();

  return (
    <CardContent>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <BasicInformationSection form={form} />
          <OwnershipHealthSection form={form} />
        </div>
        <SimpleHorseFormActions onCancel={onCancel} isSubmitting={isSubmitting} />
      </form>
    </CardContent>
  );
};

export default SimpleHorseFormContent;
