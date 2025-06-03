
import DynamicSelect from "../form-components/DynamicSelect";
import DynamicDatePicker from "../form-components/DynamicDatePicker";
import { healthStatusOptions, vaccinationStatusOptions } from "../form-components/constants/formOptions";
import MedicalConditionsManager from "./health-components/MedicalConditionsManager";
import AllergiesManager from "./health-components/AllergiesManager";

const HealthMedicalStage = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <DynamicSelect
          name="healthStatus"
          label="Health Status"
          placeholder="Select health status"
          options={healthStatusOptions}
          required
        />

        <DynamicSelect
          name="vaccinationStatus"
          label="Vaccination Status"
          placeholder="Select vaccination status"
          options={vaccinationStatusOptions}
          required
        />

        <DynamicDatePicker
          name="lastVetCheckup"
          label="Last Vet Checkup"
          placeholder="Select date"
          maxDate={new Date()}
        />
      </div>

      <div className="space-y-4">
        <MedicalConditionsManager />
        <AllergiesManager />
      </div>
    </div>
  );
};

export default HealthMedicalStage;
