import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import { Loader2, Save, X, Sync, CheckCircle, AlertCircle } from "lucide-react";
import { enhancedFormSchema, EnhancedFormValues } from "./item-form/EnhancedFormSchema";
import BasicInfoSection from "./item-form/BasicInfoSection";
import EnhancedProductDetailsSection from "./item-form/EnhancedProductDetailsSection";
import ImageUploadSection from "./item-form/ImageUploadSection";
import { InventoryPharmacySyncService } from "@/services/inventory-pharmacy-sync";
import { EnhancedInventoryItem, ModuleSyncResult } from "@/types/inventory-integration";

interface EnhancedInventoryItemFormProps {
  onSave: (item: EnhancedInventoryItem) => void;
  onCancel: () => void;
  initialData?: Partial<EnhancedInventoryItem>;
  businessType?: string;
}

const EnhancedInventoryItemForm = ({ 
  onSave, 
  onCancel, 
  initialData,
  businessType = 'stable_owner'
}: EnhancedInventoryItemFormProps) => {
  const [selectedImages, setSelectedImages] = useState<string[]>(initialData?.images || []);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [syncResults, setSyncResults] = useState<ModuleSyncResult[]>([]);
  const [showSyncResults, setShowSyncResults] = useState(false);

  // Initialize the form with smart defaults
  const form = useForm<EnhancedFormValues>({
    resolver: zodResolver(enhancedFormSchema),
    defaultValues: {
      productName: initialData?.productName || "",
      warehouse: initialData?.warehouse || "",
      classification: initialData?.classification || "",
      entryDate: initialData?.entryDate || new Date(),
      supplier: initialData?.supplier || "",
      quantitiesPurchased: initialData?.quantitiesPurchased || 1,
      unitOfMeasure: initialData?.unitOfMeasure || "",
      alertThreshold: initialData?.alertThreshold || 1,
      purchasePrice: initialData?.purchasePrice || 0,
      listForSale: initialData?.listForSale || false,
      sellingPrice: initialData?.sellingPrice || undefined,
      
      // Enhanced fields
      businessType: (initialData?.businessType || businessType) as any,
      usageIntent: initialData?.usageIntent || 'personal_use',
      destinationModules: initialData?.destinationModules || ['inventory'],
      isMedicalItem: initialData?.isMedicalItem || false,
      requiresSpecialHandling: initialData?.requiresSpecialHandling || false,
      
      // Pharmacy settings
      pharmacySettings: initialData?.pharmacySettings || {
        requiresPrescription: false,
        controlledSubstance: false,
      },
      
      // Sales configuration
      salesConfiguration: initialData?.salesConfiguration || {
        availableForOnlineOrders: true,
        requiresConsultation: false,
      },
    },
  });

  // Watch for changes to auto-update computed fields
  const watchedValues = form.watch();
  
  React.useEffect(() => {
    const classification = watchedValues.classification || "";
    const isMedical = InventoryPharmacySyncService.isMedicalItem(classification);
    
    // Update computed fields
    form.setValue("isMedicalItem", isMedical);
    
    // Apply smart defaults when classification changes
    if (classification) {
      const smartDefaults = InventoryPharmacySyncService.getSmartDefaults(
        watchedValues.businessType as any,
        classification
      );
      
      // Only update if not manually set
      if (!form.formState.dirtyFields.listForSale) {
        form.setValue("listForSale", smartDefaults.listForSale);
      }
      if (!form.formState.dirtyFields.usageIntent) {
        form.setValue("usageIntent", smartDefaults.usageIntent);
      }
    }
  }, [watchedValues.classification, watchedValues.businessType, form]);

  // Form submission handler
  const onSubmit = async (values: EnhancedFormValues) => {
    setIsSubmitting(true);
    setShowSyncResults(false);
    
    try {
      // Create enhanced inventory item
      const enhancedItem: EnhancedInventoryItem = {
        id: initialData?.id || `item_${Date.now()}`,
        ...values,
        images: selectedImages,
        syncStatus: {
          inventory: false,
          pharmacy: false,
          store: false,
          marketplace: false,
        },
        suggestedMarkup: InventoryPharmacySyncService.calculateSuggestedMarkup(
          values.purchasePrice,
          values.classification,
          values.businessType
        ),
        profitMargin: values.sellingPrice && values.purchasePrice > 0 
          ? Math.round(((values.sellingPrice - values.purchasePrice) / values.purchasePrice) * 100)
          : 0,
      };

      // Validate item before sync
      const validation = InventoryPharmacySyncService.validateItemForSync(enhancedItem);
      
      if (!validation.isValid) {
        toast({
          title: "Validation Error",
          description: validation.errors.join(", "),
          variant: "destructive",
        });
        return;
      }

      // Sync across modules
      const syncResults = await InventoryPharmacySyncService.syncItemAcrossModules(enhancedItem);
      setSyncResults(syncResults);
      setShowSyncResults(true);

      // Check if all syncs were successful
      const allSuccessful = syncResults.every(result => result.success);
      
      if (allSuccessful) {
        toast({
          title: "Item Saved Successfully",
          description: `Item synced to ${syncResults.length} module(s)`,
        });
        onSave(enhancedItem);
      } else {
        const failedModules = syncResults.filter(r => !r.success).map(r => r.module);
        toast({
          title: "Partial Sync Success",
          description: `Failed to sync to: ${failedModules.join(", ")}`,
          variant: "destructive",
        });
      }

    } catch (error) {
      console.error("Error saving item:", error);
      toast({
        title: "Error",
        description: "Failed to save item. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getSyncStatusIcon = (success: boolean) => {
    return success ? (
      <CheckCircle className="h-4 w-4 text-green-600" />
    ) : (
      <AlertCircle className="h-4 w-4 text-red-600" />
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle>
            {initialData ? "Edit Inventory Item" : "Add New Inventory Item"}
          </CardTitle>
          <CardDescription>
            This item will be automatically synced across relevant modules based on your business settings.
          </CardDescription>
        </CardHeader>
      </Card>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Basic Information */}
          <BasicInfoSection form={form} />
          
          {/* Enhanced Product Details */}
          <EnhancedProductDetailsSection form={form} />
          
          {/* Image Upload */}
          <ImageUploadSection 
            selectedImages={selectedImages}
            setSelectedImages={setSelectedImages}
          />

          {/* Sync Results */}
          {showSyncResults && syncResults.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sync className="h-5 w-5" />
                  Module Sync Results
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {syncResults.map((result) => (
                    <div key={result.module} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <div className="flex items-center gap-2">
                        {getSyncStatusIcon(result.success)}
                        <span className="font-medium capitalize">{result.module}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={result.success ? "default" : "destructive"}>
                          {result.success ? "Synced" : "Failed"}
                        </Badge>
                        {result.error && (
                          <span className="text-sm text-muted-foreground">{result.error}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Form Actions */}
          <div className="flex justify-between items-center pt-6 border-t">
            <Button 
              type="button" 
              variant="outline" 
              onClick={onCancel}
              disabled={isSubmitting}
            >
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
            
            <div className="flex gap-2">
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="min-w-[120px]"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Save & Sync
                  </>
                )}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default EnhancedInventoryItemForm; 