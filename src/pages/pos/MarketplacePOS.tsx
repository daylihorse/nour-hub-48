
import MarketplacePOS from "@/components/marketplace/MarketplacePOS";

const MarketplacePOSPage = () => {
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Marketplace - Point of Sale</h1>
          <p className="text-muted-foreground">
            Complete marketplace sales and transactions
          </p>
        </div>
        <MarketplacePOS />
      </div>
    </div>
  );
};

export default MarketplacePOSPage;
