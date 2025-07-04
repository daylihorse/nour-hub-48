
import ArabicFormInput from "../form-components/ArabicFormInput";
import ArabicFormSelect from "../form-components/ArabicFormSelect";
import ArabicDatePicker from "../form-components/ArabicDatePicker";
import { horseBreeds, horseColors, genderOptions } from "../form-components/constants/formOptions";

const ArabicBasicInformationStage = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6" dir="rtl">
      <ArabicFormInput
        name="name"
        label="Horse Name"
        placeholder="Enter horse name"
        required
      />

      <ArabicFormInput
        name="arabicName"
        label="Arabic Name"
        placeholder="اسم الحصان بالعربية"
      />

      <ArabicFormSelect
        name="breed"
        label="Breed"
        placeholder="Select breed"
        options={horseBreeds}
        required
      />

      <ArabicFormSelect
        name="gender"
        label="Gender"
        placeholder="Select gender"
        options={genderOptions}
        required
      />

      <ArabicDatePicker
        name="birthDate"
        label="Birth Date"
        placeholder="Pick a date"
        required
        minDate={new Date("1990-01-01")}
        maxDate={new Date()}
      />

      <ArabicFormSelect
        name="color"
        label="Color"
        placeholder="Select color"
        options={horseColors}
        required
      />

      <ArabicFormInput
        name="height"
        label="Height (hands)"
        placeholder="e.g., 15.2"
        type="number"
        step="0.1"
      />

      <ArabicFormInput
        name="weight"
        label="Weight (kg)"
        placeholder="e.g., 500"
        type="number"
      />
    </div>
  );
};

export default ArabicBasicInformationStage;
