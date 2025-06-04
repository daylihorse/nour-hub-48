
import RedesignedHorseForm from "./redesigned-form/RedesignedHorseForm";
import { HorseFormData } from "@/types/horse";

interface EnglishAddHorseFormProps {
  onSave: (data: HorseFormData) => void;
  onCancel: () => void;
}

const EnglishAddHorseForm = ({ onSave, onCancel }: EnglishAddHorseFormProps) => {
  return <RedesignedHorseForm onSave={onSave} onCancel={onCancel} />;
};

export default EnglishAddHorseForm;
