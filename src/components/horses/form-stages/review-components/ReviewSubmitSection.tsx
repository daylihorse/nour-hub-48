
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface ReviewSubmitSectionProps {
  onSubmit: () => void;
}

const ReviewSubmitSection = ({ onSubmit }: ReviewSubmitSectionProps) => {
  return (
    <>
      <Separator />
      <div className="bg-blue-50 p-6 rounded-lg text-center">
        <h3 className="text-lg font-semibold text-blue-900 mb-2">Ready to Register</h3>
        <p className="text-blue-700 mb-4">
          All information has been reviewed. Click the button below to register this horse in the stable management system.
        </p>
        <Button 
          onClick={onSubmit}
          size="lg"
          className="bg-green-600 hover:bg-green-700"
        >
          Register Horse
        </Button>
      </div>
    </>
  );
};

export default ReviewSubmitSection;
