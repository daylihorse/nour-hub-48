
import { CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

const StatusGuide = () => {
  return (
    <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
      <h4 className="font-medium text-amber-800 mb-2">Status Guide:</h4>
      <div className="flex gap-4 text-sm text-amber-700">
        <div className="flex items-center gap-1">
          <Loader2 className="h-3 w-3 animate-spin text-blue-500" />
          <span>Processing</span>
        </div>
        <div className="flex items-center gap-1">
          <CheckCircle className="h-3 w-3 text-green-500" />
          <span>Success</span>
        </div>
        <div className="flex items-center gap-1">
          <AlertCircle className="h-3 w-3 text-red-500" />
          <span>Error</span>
        </div>
      </div>
    </div>
  );
};

export default StatusGuide;
