
import PharmacyPOSSystem from "@/components/pharmacy/pos/PharmacyPOSSystem";

const PharmacyPOS = () => {
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Pharmacy - Point of Sale</h1>
          <p className="text-muted-foreground">
            Complete pharmacy sales, prescriptions, and client management
          </p>
        </div>
        <PharmacyPOSSystem />
      </div>
    </div>
  );
};

export default PharmacyPOS;
