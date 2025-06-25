import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Building2, 
  Pill, 
  Store, 
  Globe,
  Package,
  ArrowRight,
  CheckCircle,
  Users,
  ShoppingCart,
  Heart
} from "lucide-react";
import { BusinessContextProvider } from "@/contexts/BusinessContextProvider";
import UnifiedInventoryDashboard from "./UnifiedInventoryDashboard";
import { EnhancedInventoryItem, BusinessType } from "@/types/inventory-integration";

// Sample data for different business scenarios
const getSampleData = (businessType: BusinessType): EnhancedInventoryItem[] => {
  const baseItems = [
    {
      id: "1",
      productName: "Penicillin Injectable",
      warehouse: "Medicine Warehouse",
      classification: "antibiotic",
      entryDate: new Date("2024-01-15"),
      expiryDate: new Date("2024-12-15"),
      batchNumber: "PEN2024001",
      supplier: "VetMed Pharmaceuticals",
      quantitiesPurchased: 50,
      unitOfMeasure: "vials",
      alertThreshold: 10,
      purchasePrice: 12.50,
      listForSale: businessType === 'pharmacy_owner',
      sellingPrice: businessType === 'pharmacy_owner' ? 18.75 : undefined,
      businessType,
      usageIntent: businessType === 'pharmacy_owner' ? 'for_sale' as const : 'personal_use' as const,
      destinationModules: businessType === 'pharmacy_owner' 
        ? ['inventory', 'pharmacy', 'store', 'marketplace'] as const
        : ['inventory', 'pharmacy'] as const,
      isMedicalItem: true,
      requiresSpecialHandling: true,
      pharmacySettings: {
        requiresPrescription: true,
        controlledSubstance: false,
        dosageForm: 'injection' as const,
        strength: "300,000 IU/ml",
        activeIngredient: "Penicillin G Procaine",
        storageRequirements: "Refrigerate 2-8°C",
        withdrawalPeriod: 14,
      },
      syncStatus: {
        inventory: true,
        pharmacy: true,
        store: businessType === 'pharmacy_owner',
        marketplace: businessType === 'pharmacy_owner',
      },
      lastSyncDate: new Date(),
      suggestedMarkup: 18.75,
      profitMargin: businessType === 'pharmacy_owner' ? 50 : 0,
    },
    {
      id: "2",
      productName: "Horse Vitamins Premium",
      warehouse: "Feed Storage Warehouse",
      classification: "vitamin",
      entryDate: new Date("2024-01-10"),
      supplier: "Equine Nutrition Co",
      quantitiesPurchased: 100,
      unitOfMeasure: "bottles",
      alertThreshold: 20,
      purchasePrice: 25.00,
      listForSale: businessType !== 'stable_owner',
      sellingPrice: businessType !== 'stable_owner' ? 37.50 : undefined,
      businessType,
      usageIntent: businessType === 'stable_owner' ? 'personal_use' as const : 'for_sale' as const,
      destinationModules: businessType === 'stable_owner' 
        ? ['inventory', 'pharmacy'] as const
        : ['inventory', 'pharmacy', 'store', 'marketplace'] as const,
      isMedicalItem: true,
      requiresSpecialHandling: false,
      pharmacySettings: {
        requiresPrescription: false,
        controlledSubstance: false,
        dosageForm: 'liquid' as const,
        strength: "Multi-vitamin complex",
        storageRequirements: "Room temperature",
      },
      syncStatus: {
        inventory: true,
        pharmacy: true,
        store: businessType !== 'stable_owner',
        marketplace: businessType !== 'stable_owner',
      },
      lastSyncDate: new Date(),
      suggestedMarkup: 37.50,
      profitMargin: businessType !== 'stable_owner' ? 50 : 0,
    },
    {
      id: "3",
      productName: "Premium Horse Feed",
      warehouse: "Feed Storage Warehouse",
      classification: "feed",
      entryDate: new Date("2024-01-05"),
      supplier: "Quality Feed Suppliers",
      quantitiesPurchased: 200,
      unitOfMeasure: "bags",
      alertThreshold: 50,
      purchasePrice: 15.00,
      listForSale: businessType === 'pharmacy_owner' || businessType === 'mixed_business',
      sellingPrice: businessType === 'pharmacy_owner' || businessType === 'mixed_business' ? 18.75 : undefined,
      businessType,
      usageIntent: businessType === 'stable_owner' ? 'personal_use' as const : 'for_sale' as const,
      destinationModules: businessType === 'stable_owner' 
        ? ['inventory'] as const
        : ['inventory', 'store', 'marketplace'] as const,
      isMedicalItem: false,
      requiresSpecialHandling: false,
      syncStatus: {
        inventory: true,
        pharmacy: false,
        store: businessType !== 'stable_owner',
        marketplace: businessType !== 'stable_owner',
      },
      lastSyncDate: new Date(),
      suggestedMarkup: 18.75,
      profitMargin: businessType !== 'stable_owner' ? 25 : 0,
    }
  ];

  return baseItems;
};

const InventoryPharmacyIntegrationDemo = () => {
  const [selectedBusinessType, setSelectedBusinessType] = useState<BusinessType>('stable_owner');
  const [items, setItems] = useState<EnhancedInventoryItem[]>(() => getSampleData('stable_owner'));
  const [activeScenario, setActiveScenario] = useState('overview');

  const handleBusinessTypeChange = (type: BusinessType) => {
    setSelectedBusinessType(type);
    setItems(getSampleData(type));
  };

  const businessScenarios = [
    {
      id: 'stable_owner',
      title: 'Stable Owner',
      description: 'I own a stable and use medications for my horses',
      icon: <Heart className="h-5 w-5" />,
      features: [
        'Personal use medications tracked in pharmacy module',
        'Medical items not automatically listed for sale',
        'Focus on compliance and inventory tracking',
        'Option to sell surplus medications'
      ]
    },
    {
      id: 'pharmacy_owner',
      title: 'Pharmacy Owner',
      description: 'I run a pharmacy and sell medications',
      icon: <Pill className="h-5 w-5" />,
      features: [
        'All items automatically listed for sale',
        'Required selling prices for all medications',
        'Full compliance tracking and reporting',
        'Integration with store and marketplace'
      ]
    },
    {
      id: 'mixed_business',
      title: 'Mixed Business',
      description: 'I have both stable and pharmacy operations',
      icon: <Building2 className="h-5 w-5" />,
      features: [
        'Flexible usage intent per item',
        'Some items for personal use, some for sale',
        'Full module integration capabilities',
        'Comprehensive business management'
      ]
    }
  ];

  const getScenarioStats = (type: BusinessType) => {
    const scenarioItems = getSampleData(type);
    return {
      totalItems: scenarioItems.length,
      forSale: scenarioItems.filter(item => item.listForSale).length,
      medical: scenarioItems.filter(item => item.isMedicalItem).length,
      modules: Math.max(...scenarioItems.map(item => item.destinationModules.length))
    };
  };

  return (
    <BusinessContextProvider>
      <div className="space-y-6">
        {/* Header */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-6 w-6" />
              Inventory-Pharmacy Integration Demo
            </CardTitle>
            <CardDescription>
              Explore how the inventory system adapts to different business types and automatically 
              syncs items across relevant modules.
            </CardDescription>
          </CardHeader>
        </Card>

        <Tabs value={activeScenario} onValueChange={setActiveScenario}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="overview">Business Scenarios</TabsTrigger>
            <TabsTrigger value="dashboard">Live Dashboard</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Business Type Selector */}
            <Card>
              <CardHeader>
                <CardTitle>Select Your Business Type</CardTitle>
                <CardDescription>
                  See how the system adapts to different business models
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {businessScenarios.map((scenario) => {
                    const stats = getScenarioStats(scenario.id as BusinessType);
                    const isSelected = selectedBusinessType === scenario.id;
                    
                    return (
                      <Card 
                        key={scenario.id} 
                        className={`cursor-pointer transition-all hover:shadow-md ${
                          isSelected ? 'ring-2 ring-primary' : ''
                        }`}
                        onClick={() => handleBusinessTypeChange(scenario.id as BusinessType)}
                      >
                        <CardHeader className="pb-3">
                          <div className="flex items-center gap-2">
                            {scenario.icon}
                            <CardTitle className="text-lg">{scenario.title}</CardTitle>
                          </div>
                          <CardDescription className="text-sm">
                            {scenario.description}
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            <div className="text-center p-2 bg-muted rounded">
                              <div className="font-semibold">{stats.totalItems}</div>
                              <div className="text-xs text-muted-foreground">Items</div>
                            </div>
                            <div className="text-center p-2 bg-muted rounded">
                              <div className="font-semibold">{stats.forSale}</div>
                              <div className="text-xs text-muted-foreground">For Sale</div>
                            </div>
                            <div className="text-center p-2 bg-muted rounded">
                              <div className="font-semibold">{stats.medical}</div>
                              <div className="text-xs text-muted-foreground">Medical</div>
                            </div>
                            <div className="text-center p-2 bg-muted rounded">
                              <div className="font-semibold">{stats.modules}</div>
                              <div className="text-xs text-muted-foreground">Max Modules</div>
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            {scenario.features.map((feature, index) => (
                              <div key={index} className="flex items-center gap-2 text-xs">
                                <CheckCircle className="h-3 w-3 text-green-600 flex-shrink-0" />
                                <span>{feature}</span>
                              </div>
                            ))}
                          </div>
                          
                          {isSelected && (
                            <Badge className="w-full justify-center">
                              Currently Selected
                            </Badge>
                          )}
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Integration Flow */}
            <Card>
              <CardHeader>
                <CardTitle>Integration Flow for {selectedBusinessType.replace('_', ' ').toUpperCase()}</CardTitle>
                <CardDescription>
                  How items flow through the system based on your business type
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center space-x-4 p-6">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-2">
                      <Package className="h-6 w-6 text-blue-600" />
                    </div>
                    <p className="text-sm font-medium">Inventory</p>
                    <p className="text-xs text-muted-foreground">Always included</p>
                  </div>
                  
                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                  
                  <div className="text-center">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${
                      items.some(item => item.isMedicalItem) 
                        ? 'bg-green-100' 
                        : 'bg-gray-100'
                    }`}>
                      <Pill className={`h-6 w-6 ${
                        items.some(item => item.isMedicalItem) 
                          ? 'text-green-600' 
                          : 'text-gray-400'
                      }`} />
                    </div>
                    <p className="text-sm font-medium">Pharmacy</p>
                    <p className="text-xs text-muted-foreground">
                      {items.some(item => item.isMedicalItem) ? 'Medical items' : 'Not used'}
                    </p>
                  </div>
                  
                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                  
                  <div className="text-center">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${
                      items.some(item => item.listForSale) 
                        ? 'bg-purple-100' 
                        : 'bg-gray-100'
                    }`}>
                      <Store className={`h-6 w-6 ${
                        items.some(item => item.listForSale) 
                          ? 'text-purple-600' 
                          : 'text-gray-400'
                      }`} />
                    </div>
                    <p className="text-sm font-medium">Store</p>
                    <p className="text-xs text-muted-foreground">
                      {items.some(item => item.listForSale) ? 'Items for sale' : 'Not used'}
                    </p>
                  </div>
                  
                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                  
                  <div className="text-center">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${
                      items.some(item => item.listForSale) 
                        ? 'bg-orange-100' 
                        : 'bg-gray-100'
                    }`}>
                      <Globe className={`h-6 w-6 ${
                        items.some(item => item.listForSale) 
                          ? 'text-orange-600' 
                          : 'text-gray-400'
                      }`} />
                    </div>
                    <p className="text-sm font-medium">Marketplace</p>
                    <p className="text-xs text-muted-foreground">
                      {items.some(item => item.listForSale) ? 'Public sales' : 'Not used'}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Sample Items Preview */}
            <Card>
              <CardHeader>
                <CardTitle>Sample Items for {selectedBusinessType.replace('_', ' ').toUpperCase()}</CardTitle>
                <CardDescription>
                  See how different items are categorized and synced
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-semibold">{item.productName}</h4>
                          <p className="text-sm text-muted-foreground">{item.classification}</p>
                        </div>
                        <div className="flex gap-2">
                          <Badge variant={item.isMedicalItem ? "default" : "secondary"}>
                            {item.isMedicalItem ? "Medical" : "Non-Medical"}
                          </Badge>
                          <Badge variant={item.listForSale ? "default" : "outline"}>
                            {item.listForSale ? "For Sale" : "Personal Use"}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 text-sm">
                        <span className="text-muted-foreground">Syncs to:</span>
                        {item.destinationModules.map((module) => (
                          <Badge key={module} variant="outline" className="text-xs">
                            {module}
                          </Badge>
                        ))}
                      </div>
                      
                      {item.listForSale && (
                        <div className="mt-2 text-sm">
                          <span className="text-muted-foreground">Price: </span>
                          <span className="font-medium">${item.purchasePrice} → ${item.sellingPrice}</span>
                          <span className="text-green-600 ml-2">({item.profitMargin}% margin)</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="dashboard">
            <UnifiedInventoryDashboard
              items={items}
              onAddItem={(item) => setItems(prev => [...prev, item])}
              onUpdateItem={(item) => setItems(prev => 
                prev.map(i => i.id === item.id ? item : i)
              )}
              onDeleteItem={(id) => setItems(prev => 
                prev.filter(i => i.id !== id)
              )}
            />
          </TabsContent>
        </Tabs>
      </div>
    </BusinessContextProvider>
  );
};

export default InventoryPharmacyIntegrationDemo; 