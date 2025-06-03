
import DynamicInput from "../form-components/DynamicInput";
import DynamicSelect from "../form-components/DynamicSelect";
import { ownerTypeOptions } from "../form-components/constants/formOptions";

const OwnershipDocumentationStage = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <DynamicSelect
          name="ownerType"
          label="Owner Type"
          placeholder="Select owner type"
          options={ownerTypeOptions}
          required
        />

        <DynamicInput
          name="ownerName"
          label="Owner Name"
          placeholder="Enter owner name"
          required
        />

        <DynamicInput
          name="ownerContact"
          label="Owner Contact"
          placeholder="Phone number or email"
          required
        />
      </div>

      <div className="border-t pt-6">
        <h4 className="text-lg font-semibold mb-4">Registration & Documentation</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <DynamicInput
            name="registrationNumber"
            label="Registration Number"
            placeholder="e.g., REG-2024-001"
          />

          <DynamicInput
            name="passportNumber"
            label="Passport Number"
            placeholder="International passport number"
          />

          <DynamicInput
            name="microchipId"
            label="Microchip ID"
            placeholder="15-digit microchip number"
          />
        </div>
      </div>
    </div>
  );
};

export default OwnershipDocumentationStage;
