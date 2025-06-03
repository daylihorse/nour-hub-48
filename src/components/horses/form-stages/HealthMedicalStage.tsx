
import HealthStatusField from "./health-components/HealthStatusField";
import VaccinationStatusField from "./health-components/VaccinationStatusField";
import LastVetCheckupField from "./health-components/LastVetCheckupField";
import MedicalConditionsManager from "./health-components/MedicalConditionsManager";
import AllergiesManager from "./health-components/AllergiesManager";

const HealthMedicalStage = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <HealthStatusField />
        <VaccinationStatusField />
        <LastVetCheckupField />
      </div>

      <div className="space-y-4">
        <MedicalConditionsManager />
        <AllergiesManager />
      </div>
    </div>
  );
};

export default HealthMedicalStage;
