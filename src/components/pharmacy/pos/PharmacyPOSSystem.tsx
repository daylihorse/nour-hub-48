
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  ShoppingCart, 
  FileText, 
  Pill, 
  Users,
  CreditCard,
  AlertTriangle,
  Shield
} from "lucide-react";
import { PharmacyPOSState } from "@/types/pharmacyPOS";
import { usePharmacyCartManagement } from "@/hooks/usePharmacyCartManagement";
import { usePharmacySalesManagement } from "@/hooks/usePharmacySalesManagement";
import PharmacyProductGrid from "./PharmacyProductGrid";
import PharmacyCartSection from "./PharmacyCartSection";
import PharmacyCheckoutSection from "./PharmacyCheckoutSection";
import PrescriptionSalesWorkflow from "./PrescriptionSalesWorkflow";
import ClientManagementPanel from "./ClientManagementPanel";
import InsuranceBillingPanel from "./InsuranceBillingPanel";

const PharmacyPOSSystem = () => {
  const [activeTab, setActiveTab] = useState("pos");
  const [posState, setPosState] = useState<Omit<PharmacyPOSState, 'cart'>>({
    saleType: 'otc',
    paymentMethod: 'cash',
    discount: 0,
    requiresConsultation: false,
  });

  const {
    cart,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    getSubtotal,
    getTax,
    getTotal,
    validatePrescriptionItems,
  } = usePharmacyCartManagement();

  const {
    completeSale,
    processInsuranceClaim,
    sendPickupNotification,
  } = usePharmacySalesManagement();

  const handleStateChange = (updates: Partial<typeof posState>) => {
    setPosState(prev => ({ ...prev, ...updates }));
  };

  const handleCompleteSale = async () => {
    const subtotal = getSubtotal();
    const tax = getTax();
    const total = getTotal(posState.discount);
    
    const success = await completeSale({
      ...posState,
      cart,
    }, subtotal, tax, total);
    
    if (success) {
      clearCart();
      setPosState({
        saleType: 'otc',
        paymentMethod: 'cash',
        discount: 0,
        requiresConsultation: false,
      });
    }
  };

  const handleProcessClaim = (claimData: any) => {
    processInsuranceClaim(claimData);
  };

  const getTotalItems = () => cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <ShoppingCart className="h-6 w-6 text-blue-500" />
            Pharmacy Point of Sale
          </h2>
          <p className="text-muted-foreground">
            Complete pharmacy sales, prescriptions, and client management
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Badge variant="outline" className="text-sm">
            Sale Type: {posState.saleType.toUpperCase()}
          </Badge>
          {getTotalItems() > 0 && (
            <Badge className="bg-blue-500">
              {getTotalItems()} items in cart
            </Badge>
          )}
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="pos" className="flex items-center gap-2">
            <CreditCard className="h-4 w-4" />
            POS
          </TabsTrigger>
          <TabsTrigger value="prescriptions" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Prescriptions
          </TabsTrigger>
          <TabsTrigger value="clients" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Clients
          </TabsTrigger>
          <TabsTrigger value="insurance" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Insurance
          </TabsTrigger>
          <TabsTrigger value="consultation" className="flex items-center gap-2">
            <Pill className="h-4 w-4" />
            Consultation
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pos" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <PharmacyProductGrid
                onAddToCart={addToCart}
                saleType={posState.saleType}
              />
            </div>
            <div className="space-y-4">
              <PharmacyCartSection
                cart={cart}
                saleType={posState.saleType}
                onUpdateQuantity={updateQuantity}
                onRemoveFromCart={removeFromCart}
              />
              <Separator />
              <PharmacyCheckoutSection
                posState={{ ...posState, cart }}
                subtotal={getSubtotal()}
                tax={getTax()}
                total={getTotal(posState.discount)}
                onStateChange={handleStateChange}
                onCompleteSale={handleCompleteSale}
              />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="prescriptions" className="mt-6">
          <PrescriptionSalesWorkflow
            onAddToCart={addToCart}
            onStateChange={handleStateChange}
            posState={posState}
          />
        </TabsContent>

        <TabsContent value="clients" className="mt-6">
          <ClientManagementPanel
            selectedClient={posState.client}
            onClientSelect={(client) => handleStateChange({ client })}
            onSendNotification={sendPickupNotification}
          />
        </TabsContent>

        <TabsContent value="insurance" className="mt-6">
          <InsuranceBillingPanel
            client={posState.client}
            cart={cart}
            onInsuranceUpdate={(insuranceInfo) => handleStateChange({ insuranceInfo })}
            onProcessClaim={handleProcessClaim}
          />
        </TabsContent>

        <TabsContent value="consultation" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Pill className="h-5 w-5" />
                Pharmacy Consultation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <AlertTriangle className="h-12 w-12 mx-auto text-orange-500 mb-4" />
                <p className="text-muted-foreground">
                  Consultation workflow coming soon. This will include drug interaction checks,
                  dosage verification, and client counseling documentation.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PharmacyPOSSystem;
