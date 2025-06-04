
import BasicDetailsSection from "./basic-components/BasicDetailsSection";
import GenderAgeClassSection from "./basic-components/GenderAgeClassSection";
import ConditionalFieldsSection from "./basic-components/ConditionalFieldsSection";
import PhysicalDetailsSection from "./basic-components/PhysicalDetailsSection";

const BasicInformationStage = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <BasicDetailsSection />
        <GenderAgeClassSection />
        <ConditionalFieldsSection />
        <PhysicalDetailsSection />
      </div>
    </div>
  );
};

export default BasicInformationStage;
