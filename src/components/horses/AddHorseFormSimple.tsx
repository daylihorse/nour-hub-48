
import { Card } from "@/components/ui/card";
import { HorseFormData } from "@/types/horse-unified";
import SimpleHorseFormHeader from "./simple-form/SimpleHorseFormHeader";
import SimpleHorseFormProvider from "./simple-form/SimpleHorseFormProvider";
import SimpleHorseFormContent from "./simple-form/SimpleHorseFormContent";
import { useHorseFormSubmission } from "./simple-form/hooks/useHorseFormSubmission";

interface AddHorseFormSimpleProps {
  onSave: (data: HorseFormData) => void;
  onCancel: () => void;
}

const AddHorseFormSimple = ({ onSave, onCancel }: AddHorseFormSimpleProps) => {
  console.log("AddHorseFormSimple rendering...");
  
  const { handleSubmit, isSubmitting } = useHorseFormSubmission({ onSave });

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Card>
        <SimpleHorseFormHeader onCancel={onCancel} />
        <SimpleHorseFormProvider>
          <SimpleHorseFormContent 
            onCancel={onCancel} 
            onSubmit={handleSubmit} 
            isSubmitting={isSubmitting} 
          />
        </SimpleHorseFormProvider>
      </Card>
    </div>
  );
};

export default AddHorseFormSimple;
