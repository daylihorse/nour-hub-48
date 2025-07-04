
import ArabicFormInput from "../form-components/ArabicFormInput";
import ArabicFormSelect from "../form-components/ArabicFormSelect";
import { ownerTypeOptions } from "../form-components/constants/formOptions";
import { arabicLabels } from "../form-components/constants/arabicLabels";

const ArabicOwnershipDocumentationStage = () => {
  return (
    <div className="space-y-6" dir="rtl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ArabicFormSelect
          name="ownerType"
          label="Owner Type"
          placeholder="Select owner type"
          options={ownerTypeOptions}
          required
        />

        <ArabicFormInput
          name="ownerName"
          label="Owner Name"
          placeholder="Enter owner name"
          required
        />

        <ArabicFormInput
          name="ownerContact"
          label="Owner Contact"
          placeholder="Phone number or email"
          required
        />
      </div>

      <div className="border-t pt-6">
        <h4 className="text-lg font-semibold mb-4 text-right">
          {arabicLabels["Registration & Documentation"]}
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ArabicFormInput
            name="registrationNumber"
            label="Registration Number"
            placeholder="e.g., REG-2024-001"
          />

          <ArabicFormInput
            name="passportNumber"
            label="Passport Number"
            placeholder="International passport number"
          />

          <ArabicFormInput
            name="microchipId"
            label="Microchip ID"
            placeholder="15-digit microchip number"
          />
        </div>
      </div>
    </div>
  );
};

export default ArabicOwnershipDocumentationStage;
