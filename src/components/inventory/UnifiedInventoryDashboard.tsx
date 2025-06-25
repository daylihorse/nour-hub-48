import { useState, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Building2, 
  Package, 
  Pill, 
  Store, 
  Globe, 
  Search, 
  Filter,
  Plus,
  Sync,
  CheckCircle,
  AlertCircle,
  Settings,
  BarChart3
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useBusinessContext } from "@/contexts/BusinessContextProvider";
import { EnhancedInventoryItem, DestinationModule, InventoryFilter } from "@/types/inventory-integration";
import EnhancedInventoryItemForm from "./EnhancedInventoryItemForm";

interface UnifiedInventoryDashboardProps {
  items: EnhancedInventoryItem[];
  onAddItem: (item: EnhancedInventoryItem) => void;
  onUpdateItem: (item: EnhancedInventoryItem) => void;
  onDeleteItem: (id: string) => void;
}

const UnifiedInventoryDashboard = ({ 
  items, 
  onAddItem, 
  onUpdateItem, 
  onDeleteItem 
}: UnifiedInventoryDashboardProps) => {
  const { businessContext, updateBusinessContext } = useBusinessContext();
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingItem, setEditingItem] = useState<EnhancedInventoryItem | null>(null);
  const [activeTab, setActiveTab] = useState<'all' | 'personal' | 'for_sale' | 'medical'>('all');
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState<InventoryFilter>({});

  // Filter items based on active tab and filters
  const filteredItems = useMemo(() => {
    let filtered = items;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.classification.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.supplier.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply tab filter
    switch (activeTab) {
      case 'personal':
        filtered = filtered.filter(item => 
          item.usageIntent === 'personal_use' || item.usageIntent === 'both'
        );
        break;
      case 'for_sale':
        filtered = filtered.filter(item => 
          item.usageIntent === 'for_sale' || item.usageIntent === 'both'
        );
        break;
      case 'medical':
        filtered = filtered.filter(item => item.isMedicalItem);
        break;
    }

    // Apply additional filters
    if (filters.destinationModule) {
      filtered = filtered.filter(item => 
        item.destinationModules.includes(filters.destinationModule!)
      );
    }

    if (filters.requiresPrescription !== undefined) {
      filtered = filtered.filter(item => 
        item.pharmacySettings?.requiresPrescription === filters.requiresPrescription
      );
    }

    if (filters.controlledSubstance !== undefined) {
      filtered = filtered.filter(item => 
        item.pharmacySettings?.controlledSubstance === filters.controlledSubstance
      );
    }

    return filtered;
  }, [items, searchTerm, activeTab, filters]);

  // Calculate statistics
  const stats = useMemo(() => {
    const totalItems = items.length;
    const medicalItems = items.filter(item => item.isMedicalItem).length;
    const forSaleItems = items.filter(item => item.listForSale).length;
    const syncedItems = items.filter(item => 
      Object.values(item.syncStatus).some(status => status)
    ).length;

    return {
      totalItems,
      medicalItems,
      forSaleItems,
      syncedItems,
      syncPercentage: totalItems > 0 ? Math.round((syncedItems / totalItems) * 100) : 0
    };
  }, [items]);

  const getModuleIcon = (module: DestinationModule) => {
    switch (module) {
      case 'inventory': return <Building2 className="h-3 w-3" />;
      case 'pharmacy': return <Pill className="h-3 w-3" />;
      case 'store': return <Store className="h-3 w-3" />;
      case 'marketplace': return <Globe className="h-3 w-3" />;
    }
  };

  const getModuleColor = (module: DestinationModule, isActive: boolean) => {
    const baseColors = {
      inventory: 'bg-blue-100 text-blue-800',
      pharmacy: 'bg-green-100 text-green-800',
      store: 'bg-purple-100 text-purple-800',
      marketplace: 'bg-orange-100 text-orange-800',
    };
    
    const inactiveColors = {
      inventory: 'bg-gray-100 text-gray-500',
      pharmacy: 'bg-gray-100 text-gray-500',
      store: 'bg-gray-100 text-gray-500',
      marketplace: 'bg-gray-100 text-gray-500',
    };

    return isActive ? baseColors[module] : inactiveColors[module];
  };

  const getSyncStatusIcon = (item: EnhancedInventoryItem) => {
    const syncedModules = Object.entries(item.syncStatus).filter(([_, status]) => status);
    const totalModules = item.destinationModules.length;
    const syncedCount = syncedModules.length;

    if (syncedCount === totalModules) {
      return <CheckCircle className="h-4 w-4 text-green-600" />;
    } else if (syncedCount > 0) {
      return <AlertCircle className="h-4 w-4 text-yellow-600" />;
    } else {
      return <AlertCircle className="h-4 w-4 text-red-600" />;
    }
  };

  if (showAddForm || editingItem) {
    return (
      <EnhancedInventoryItemForm
        onSave={(item) => {
          if (editingItem) {
            onUpdateItem(item);
            setEditingItem(null);
          } else {
            onAddItem(item);
            setShowAddForm(false);
          }
        }}
        onCancel={() => {
          setShowAddForm(false);
          setEditingItem(null);
        }}
        initialData={editingItem || undefined}
        businessType={businessContext.businessType}
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with Business Context */}
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold">Unified Inventory Management</h2>
          <p className="text-muted-foreground">
            Manage inventory across all modules with automatic synchronization
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="flex items-center gap-1">
            <Building2 className="h-3 w-3" />
            {businessContext.businessType.replace('_', ' ').toUpperCase()}
          </Badge>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => {/* Open business settings */}}
          >
            <Settings className="h-4 w-4 mr-2" />
            Business Settings
          </Button>
          <Button onClick={() => setShowAddForm(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Item
          </Button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Items</p>
                <div className="text-2xl font-bold">{stats.totalItems}</div>
              </div>
              <Package className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Medical Items</p>
                <div className="text-2xl font-bold">{stats.medicalItems}</div>
              </div>
              <Pill className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">For Sale</p>
                <div className="text-2xl font-bold">{stats.forSaleItems}</div>
              </div>
              <Store className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Sync Status</p>
                <div className="text-2xl font-bold">{stats.syncPercentage}%</div>
              </div>
              <Sync className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search items..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filters.destinationModule || 'all'} onValueChange={(value) => 
              setFilters(prev => ({ ...prev, destinationModule: value === 'all' ? undefined : value as DestinationModule }))
            }>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Module" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Modules</SelectItem>
                <SelectItem value="inventory">Inventory</SelectItem>
                <SelectItem value="pharmacy">Pharmacy</SelectItem>
                <SelectItem value="store">Store</SelectItem>
                <SelectItem value="marketplace">Marketplace</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Items Tabs */}
      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as any)}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">All Items</TabsTrigger>
          <TabsTrigger value="personal">Personal Use</TabsTrigger>
          <TabsTrigger value="for_sale">For Sale</TabsTrigger>
          <TabsTrigger value="medical">Medical</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-6">
          <div className="grid gap-4">
            {filteredItems.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No items found</h3>
                  <p className="text-muted-foreground mb-4">
                    {searchTerm ? "No items match your search criteria." : "Start by adding your first inventory item."}
                  </p>
                  <Button onClick={() => setShowAddForm(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add First Item
                  </Button>
                </CardContent>
              </Card>
            ) : (
              filteredItems.map((item) => (
                <Card key={item.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-lg font-semibold">{item.productName}</h3>
                          {getSyncStatusIcon(item)}
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          {item.classification} • {item.supplier}
                        </p>
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="outline">
                            {item.usageIntent.replace('_', ' ')}
                          </Badge>
                          {item.isMedicalItem && (
                            <Badge variant="outline" className="bg-green-50 text-green-700">
                              Medical
                            </Badge>
                          )}
                          {item.listForSale && (
                            <Badge variant="outline" className="bg-blue-50 text-blue-700">
                              For Sale
                            </Badge>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">Stock</p>
                        <p className="text-lg font-semibold">{item.quantitiesPurchased}</p>
                        <p className="text-xs text-muted-foreground">{item.unitOfMeasure}</p>
                      </div>
                    </div>

                    {/* Module Sync Status */}
                    <div className="mb-4">
                      <p className="text-sm font-medium mb-2">Synced to:</p>
                      <div className="flex flex-wrap gap-2">
                        {item.destinationModules.map((module) => (
                          <Badge
                            key={module}
                            variant="secondary"
                            className={cn(
                              "flex items-center gap-1 text-xs",
                              getModuleColor(module, item.syncStatus[module])
                            )}
                          >
                            {getModuleIcon(module)}
                            {module.charAt(0).toUpperCase() + module.slice(1)}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Pricing Information */}
                    {item.listForSale && (
                      <div className="bg-muted p-3 rounded-lg mb-4">
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div>
                            <p className="text-muted-foreground">Purchase Price</p>
                            <p className="font-semibold">${item.purchasePrice.toFixed(2)}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Selling Price</p>
                            <p className="font-semibold">${(item.sellingPrice || 0).toFixed(2)}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Profit Margin</p>
                            <p className="font-semibold">{item.profitMargin || 0}%</p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex justify-between items-center">
                      <div className="text-xs text-muted-foreground">
                        {item.lastSyncDate && (
                          <>Last synced: {item.lastSyncDate.toLocaleDateString()}</>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setEditingItem(item)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {/* Trigger re-sync */}}
                        >
                          <Sync className="h-3 w-3 mr-1" />
                          Re-sync
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UnifiedInventoryDashboard; 