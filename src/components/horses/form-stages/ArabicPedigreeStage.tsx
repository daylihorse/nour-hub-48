
import ArabicFormInput from "../form-components/ArabicFormInput";

const ArabicPedigreeStage = () => {
  return (
    <div className="space-y-6" dir="rtl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ArabicFormInput
          name="sire"
          label="Sire"
          placeholder="Enter sire name"
        />

        <ArabicFormInput
          name="dam"
          label="Dam"
          placeholder="Enter dam name"
        />

        <ArabicFormInput
          name="bloodlineOrigin"
          label="Bloodline Origin"
          placeholder="Enter bloodline origin"
        />
      </div>
    </div>
  );
};

export default ArabicPedigreeStage;
