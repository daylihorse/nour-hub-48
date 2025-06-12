
import { ReactNode } from "react";

interface MareDetailErrorBoundaryProps {
  error: string | null;
  mareId?: string;
  availableMares: Array<{ id: string; horseName: string }>;
  onBackToMares: () => void;
  children: ReactNode;
}

const MareDetailErrorBoundary = ({ 
  error, 
  mareId, 
  availableMares, 
  onBackToMares, 
  children 
}: MareDetailErrorBoundaryProps) => {
  // Error state
  if (error) {
    return (
      <div className="p-6">
        <div className="text-red-500 mb-4">Error: {error}</div>
        <button 
          onClick={onBackToMares}
          className="text-blue-500 hover:underline"
        >
          Back to Mares
        </button>
      </div>
    );
  }

  // No mare ID provided
  if (!mareId) {
    return (
      <div className="p-6">
        <p className="text-red-500 mb-4">No mare ID provided in URL</p>
        <button 
          onClick={onBackToMares}
          className="text-blue-500 hover:underline"
        >
          Back to Mares
        </button>
      </div>
    );
  }

  return <>{children}</>;
};

export default MareDetailErrorBoundary;
