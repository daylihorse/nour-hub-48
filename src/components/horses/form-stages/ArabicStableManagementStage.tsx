
import ArabicFormInput from "../form-components/ArabicFormInput";

const ArabicStableManagementStage = () => {
  return (
    <div className="space-y-6" dir="rtl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ArabicFormInput
          name="stallNumber"
          label="Stall Number"
          placeholder="Enter stall number"
        />

        <ArabicFormInput
          name="feedingSchedule"
          label="Feeding Schedule"
          placeholder="Enter feeding schedule"
        />

        <ArabicFormInput
          name="exerciseRoutine"
          label="Exercise Routine"
          placeholder="Enter exercise routine"
        />

        <ArabicFormInput
          name="specialNeeds"
          label="Special Needs"
          placeholder="Enter special needs"
        />
      </div>
    </div>
  );
};

export default ArabicStableManagementStage;
