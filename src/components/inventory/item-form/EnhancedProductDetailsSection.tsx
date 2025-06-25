import { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { 
  AlertCircle, 
  Building2, 
  ShoppingCart, 
  Pill, 
  Store, 
  Globe,
  Calculator,
  Shield,
  Clock,
  Thermometer
} from "lucide-react";
import { cn } from "@/lib/utils";
import { InventoryPharmacySyncService } from "@/services/inventory-pharmacy-sync";
import { BusinessType, UsageIntent, DestinationModule } from "@/types/inventory-integration";

interface EnhancedProductDetailsSectionProps {
  form: UseFormReturn<any>;
}

const EnhancedProductDetailsSection = ({ form }: EnhancedProductDetailsSectionProps) => {
  const [syncPreview, setSyncPreview] = useState<DestinationModule[]>([]);
  
  // Watch form values for real-time updates
  const businessType = form.watch("businessType") || "stable_owner";
  const classification = form.watch("classification") || "";
  const listForSale = form.watch("listForSale") || false;
  const usageIntent = form.watch("usageIntent") || "personal_use";
  const purchasePrice = form.watch("purchasePrice") || 0;
  const sellingPrice = form.watch("sellingPrice") || 0;
  
  // Determine if item is medical
  const isMedicalItem = InventoryPharmacySyncService.isMedicalItem(classification);
  
  // Update sync preview when relevant fields change
  React.useEffect(() => {
    const destinationModules = InventoryPharmacySyncService.determineDestinationModules(
      businessType as BusinessType,
      classification,
      listForSale,
      usageIntent as UsageIntent,
      isMedicalItem
    );
    setSyncPreview(destinationModules);
    form.setValue("destinationModules", destinationModules);
    form.setValue("isMedicalItem", isMedicalItem);
  }, [businessType, classification, listForSale, usageIntent, isMedicalItem, form]);
  
  // Calculate suggested markup
  const suggestedMarkup = React.useMemo(() => {
    if (purchasePrice > 0) {
      return InventoryPharmacySyncService.calculateSuggestedMarkup(
        purchasePrice,
        classification,
        businessType as BusinessType
      );
    }
    return 0;
  }, [purchasePrice, classification, businessType]);

  // Calculate profit margin
  const profitMargin = React.useMemo(() => {
    if (purchasePrice > 0 && sellingPrice > 0) {
      return Math.round(((sellingPrice - purchasePrice) / purchasePrice) * 100);
    }
    return 0;
  }, [purchasePrice, sellingPrice]);

  const getModuleIcon = (module: DestinationModule) => {
    switch (module) {
      case 'inventory': return <Building2 className="h-4 w-4" />;
      case 'pharmacy': return <Pill className="h-4 w-4" />;
      case 'store': return <Store className="h-4 w-4" />;
      case 'marketplace': return <Globe className="h-4 w-4" />;
    }
  };

  const getModuleColor = (module: DestinationModule) => {
    switch (module) {
      case 'inventory': return 'bg-blue-100 text-blue-800';
      case 'pharmacy': return 'bg-green-100 text-green-800';
      case 'store': return 'bg-purple-100 text-purple-800';
      case 'marketplace': return 'bg-orange-100 text-orange-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Business Context Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5" />
            Business Context
          </CardTitle>
          <CardDescription>
            Configure how this item will be used in your business
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="businessType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Business Type</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select business type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="stable_owner">Stable Owner</SelectItem>
                      <SelectItem value="pharmacy_owner">Pharmacy Owner</SelectItem>
                      <SelectItem value="mixed_business">Mixed Business</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="usageIntent"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Usage Intent</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="How will you use this item?" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="personal_use">Personal Use Only</SelectItem>
                      <SelectItem value="for_sale">For Sale Only</SelectItem>
                      <SelectItem value="both">Both Personal & Sale</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    {usageIntent === 'personal_use' && "Item will be used for your own horses/facility"}
                    {usageIntent === 'for_sale' && "Item will be sold to customers"}
                    {usageIntent === 'both' && "Item will be used for both personal use and sales"}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Module Sync Preview */}
          <div className="bg-muted p-4 rounded-lg">
            <h4 className="font-medium mb-2 flex items-center gap-2">
              <ShoppingCart className="h-4 w-4" />
              Will be added to these modules:
            </h4>
            <div className="flex flex-wrap gap-2">
              {syncPreview.map((module) => (
                <Badge
                  key={module}
                  variant="secondary"
                  className={cn("flex items-center gap-1", getModuleColor(module))}
                >
                  {getModuleIcon(module)}
                  {module.charAt(0).toUpperCase() + module.slice(1)}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Pharmacy Settings (only for medical items) */}
      {isMedicalItem && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Pill className="h-5 w-5" />
              Pharmacy Information
            </CardTitle>
            <CardDescription>
              Medical and pharmaceutical item settings
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="pharmacySettings.requiresPrescription"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel>Requires Prescription</FormLabel>
                      <FormDescription>
                        Does this medication require a prescription?
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="pharmacySettings.controlledSubstance"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="flex items-center gap-2">
                        <Shield className="h-4 w-4" />
                        Controlled Substance
                      </FormLabel>
                      <FormDescription>
                        Requires special tracking and compliance
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="pharmacySettings.dosageForm"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Dosage Form</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select form" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="tablet">Tablet</SelectItem>
                        <SelectItem value="injection">Injection</SelectItem>
                        <SelectItem value="liquid">Liquid/Oral</SelectItem>
                        <SelectItem value="powder">Powder</SelectItem>
                        <SelectItem value="ointment">Ointment</SelectItem>
                        <SelectItem value="paste">Paste</SelectItem>
                        <SelectItem value="capsule">Capsule</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="pharmacySettings.strength"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Strength</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., 500mg, 10ml" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="pharmacySettings.activeIngredient"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Active Ingredient</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Penicillin G" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="pharmacySettings.storageRequirements"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Thermometer className="h-4 w-4" />
                      Storage Requirements
                    </FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select storage requirements" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="room_temperature">Room Temperature</SelectItem>
                        <SelectItem value="refrigerate">Refrigerate (2-8°C)</SelectItem>
                        <SelectItem value="freeze">Freeze (-20°C)</SelectItem>
                        <SelectItem value="protect_light">Protect from Light</SelectItem>
                        <SelectItem value="controlled_temp">Controlled Temperature</SelectItem>
                        <SelectItem value="dry_storage">Dry Storage</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="pharmacySettings.withdrawalPeriod"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      Withdrawal Period (Days)
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="e.g., 14"
                        {...field}
                        onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                      />
                    </FormControl>
                    <FormDescription>
                      Days before animal can be used for food production
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Sales Configuration */}
      {(listForSale || businessType === 'pharmacy_owner') && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="h-5 w-5" />
              Sales Configuration
            </CardTitle>
            <CardDescription>
              Pricing and sales settings
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="purchasePrice"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Purchase Price</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        {...field}
                        onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="sellingPrice"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Selling Price
                      {businessType === 'pharmacy_owner' && <span className="text-red-500"> *</span>}
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.01"
                        placeholder={`Suggested: $${suggestedMarkup.toFixed(2)}`}
                        {...field}
                        onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex flex-col justify-center">
                <FormLabel>Profit Margin</FormLabel>
                <div className="text-2xl font-bold text-green-600">
                  {profitMargin > 0 ? `${profitMargin}%` : 'N/A'}
                </div>
                <p className="text-sm text-muted-foreground">
                  Suggested: {Math.round(((suggestedMarkup - purchasePrice) / purchasePrice) * 100) || 0}%
                </p>
              </div>
            </div>

            {suggestedMarkup > 0 && (
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Calculator className="h-4 w-4 text-blue-600" />
                  <span className="font-medium text-blue-900">Pricing Suggestion</span>
                </div>
                <p className="text-sm text-blue-700">
                  Based on your business type and item classification, we suggest a selling price of{' '}
                  <strong>${suggestedMarkup.toFixed(2)}</strong>
                </p>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="mt-2"
                  onClick={() => form.setValue("sellingPrice", suggestedMarkup)}
                >
                  Use Suggested Price
                </Button>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="salesConfiguration.minimumOrderQuantity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Minimum Order Quantity</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="1"
                        {...field}
                        onChange={(e) => field.onChange(parseInt(e.target.value) || 1)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="salesConfiguration.requiresConsultation"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel>Requires Consultation</FormLabel>
                      <FormDescription>
                        Customer must consult before purchase
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Validation Warnings */}
      {businessType === 'pharmacy_owner' && listForSale && !sellingPrice && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-center gap-2">
            <AlertCircle className="h-4 w-4 text-yellow-600" />
            <span className="font-medium text-yellow-900">Selling Price Required</span>
          </div>
          <p className="text-sm text-yellow-700 mt-1">
            As a pharmacy owner, you must set a selling price for items marked for sale.
          </p>
        </div>
      )}
    </div>
  );
};

export default EnhancedProductDetailsSection; 