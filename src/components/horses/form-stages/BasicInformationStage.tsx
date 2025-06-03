
import DynamicInput from "../form-components/DynamicInput";
import DynamicSelect from "../form-components/DynamicSelect";
import DynamicDatePicker from "../form-components/DynamicDatePicker";
import { horseBreeds, horseColors, genderOptions } from "../form-components/constants/formOptions";

const BasicInformationStage = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <DynamicInput
        name="name"
        label="Horse Name"
        placeholder="Enter horse name"
        required
      />

      <DynamicInput
        name="arabicName"
        label="Arabic Name"
        placeholder="اسم الحصان بالعربية"
        isRTL
      />

      <DynamicSelect
        name="breed"
        label="Breed"
        placeholder="Select breed"
        options={horseBreeds}
        required
      />

      <DynamicSelect
        name="gender"
        label="Gender"
        placeholder="Select gender"
        options={genderOptions}
        required
      />

      <DynamicDatePicker
        name="birthDate"
        label="Birth Date"
        placeholder="Pick a date"
        required
        minDate={new Date("1990-01-01")}
        maxDate={new Date()}
      />

      <DynamicSelect
        name="color"
        label="Color"
        placeholder="Select color"
        options={horseColors}
        required
      />

      <DynamicInput
        name="height"
        label="Height (hands)"
        placeholder="e.g., 15.2"
        type="number"
        step="0.1"
      />

      <DynamicInput
        name="weight"
        label="Weight (kg)"
        placeholder="e.g., 500"
        type="number"
      />
    </div>
  );
};

export default BasicInformationStage;
