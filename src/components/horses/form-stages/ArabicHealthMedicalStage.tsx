
import ArabicFormSelect from "../form-components/ArabicFormSelect";
import ArabicDatePicker from "../form-components/ArabicDatePicker";
import { healthStatusOptions, vaccinationStatusOptions } from "../form-components/constants/formOptions";

const ArabicHealthMedicalStage = () => {
  return (
    <div className="space-y-6" dir="rtl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ArabicFormSelect
          name="healthStatus"
          label="Health Status"
          placeholder="Select health status"
          options={healthStatusOptions}
          required
        />

        <ArabicFormSelect
          name="vaccinationStatus"
          label="Vaccination Status"
          placeholder="Select vaccination status"
          options={vaccinationStatusOptions}
          required
        />

        <ArabicDatePicker
          name="lastVetCheckup"
          label="Last Vet Checkup"
          placeholder="Select date"
          maxDate={new Date()}
        />
      </div>
    </div>
  );
};

export default ArabicHealthMedicalStage;
