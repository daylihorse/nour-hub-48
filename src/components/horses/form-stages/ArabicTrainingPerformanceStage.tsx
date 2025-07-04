
import ArabicFormSelect from "../form-components/ArabicFormSelect";
import ArabicFormInput from "../form-components/ArabicFormInput";
import { trainingLevelOptions } from "../form-components/constants/formOptions";

const ArabicTrainingPerformanceStage = () => {
  return (
    <div className="space-y-6" dir="rtl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ArabicFormSelect
          name="trainingLevel"
          label="Training Level"
          placeholder="Select training level"
          options={trainingLevelOptions}
        />

        <ArabicFormInput
          name="disciplines"
          label="Disciplines"
          placeholder="Enter disciplines (comma separated)"
        />

        <ArabicFormInput
          name="competitionHistory"
          label="Competition History"
          placeholder="Enter competition history"
        />

        <ArabicFormInput
          name="achievements"
          label="Achievements"
          placeholder="Enter achievements"
        />
      </div>
    </div>
  );
};

export default ArabicTrainingPerformanceStage;
