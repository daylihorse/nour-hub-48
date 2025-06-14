
import AddHorseForm from "./AddHorseForm";
import { HorseFormData } from "@/types/horse";

interface EnglishAddHorseFormProps {
  onSave: (data: HorseFormData) => void;
  onCancel: () => void;
}

const EnglishAddHorseForm = ({ onSave, onCancel }: EnglishAddHorseFormProps) => {
  return <AddHorseForm onSave={onSave} onCancel={onCancel} />;
};

export default EnglishAddHorseForm;
