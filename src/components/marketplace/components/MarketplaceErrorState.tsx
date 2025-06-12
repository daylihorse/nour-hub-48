
import { Button } from "@/components/ui/button";

interface MarketplaceErrorStateProps {
  error: string;
  onRetry: () => void;
}

const MarketplaceErrorState = ({ error, onRetry }: MarketplaceErrorStateProps) => {
  return (
    <div className="text-center py-8">
      <div className="text-red-500 mb-4">⚠️ Error</div>
      <p className="text-muted-foreground">{error}</p>
      <Button onClick={onRetry} className="mt-4">
        Retry
      </Button>
    </div>
  );
};

export default MarketplaceErrorState;
