
import { CheckCircle } from "lucide-react";

const ReviewHeader = () => {
  return (
    <div className="text-center mb-6">
      <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
      <h2 className="text-2xl font-bold mb-2">Review Horse Information</h2>
      <p className="text-muted-foreground">
        Please review all the information before registering the horse
      </p>
    </div>
  );
};

export default ReviewHeader;
