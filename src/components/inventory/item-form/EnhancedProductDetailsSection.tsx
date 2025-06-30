
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  EnhancedFormValues, 
  businessTypeOptions, 
  usageIntentOptions,
  dosageFormOptions,
  administrationRouteOptions,
  storageRequirementOptions
} from "./EnhancedFormSchema";

interface EnhancedProductDetailsSectionProps {
  form: UseFormReturn<EnhancedFormValues>;
}

const EnhancedProductDetailsSection = ({ form }: EnhancedProductDetailsSectionProps) => {
  const watchedBusinessType = form.watch("businessType");
  const watchedUsageIntent = form.watch("usageIntent");
  const watchedIsMedical = form.watch("isMedicalItem");
  const watchedListForSale = form.watch("listForSale");

  // Determine which modules should be available based on business type
  const getAvailableModules = () => {
    const modules = [
      { value: 'inventory', label: 'Inventory Management', always: true },
    ];
    
    if (watchedBusinessType === 'pharmacy_owner' || watchedBusinessType === 'mixed_business') {
      modules.push({ value: 'pharmacy', label: 'Pharmacy System', always: false });
    }
    
    if (watchedListForSale) {
      modules.push({ value: 'store', label: 'Online Store', always: false });
      modules.push({ value: 'marketplace', label: 'Marketplace', always: false });
    }
    
    return modules;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Enhanced Product Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Business Configuration */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Business Configuration</h3>
          
          <div className="grid md:grid-cols-2 gap-4">
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
                      {businessTypeOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          <div>
                            <div className="font-medium">{option.label}</div>
                            <div className="text-sm text-muted-foreground">{option.description}</div>
                          </div>
                        </SelectItem>
                      ))}
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
                        <SelectValue placeholder="Select usage intent" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {usageIntentOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          <div>
                            <div className="font-medium">{option.label}</div>
                            <div className="text-sm text-muted-foreground">{option.description}</div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Module Selection */}
          <FormField
            control={form.control}
            name="destinationModules"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Destination Modules</FormLabel>
                <FormControl>
                  <div className="flex flex-wrap gap-2">
                    {getAvailableModules().map((module) => {
                      const isSelected = field.value.includes(module.value as any);
                      const isRequired = module.always;
                      
                      return (
                        <Badge
                          key={module.value}
                          variant={isSelected ? "default" : "outline"}
                          className={`cursor-pointer ${isRequired ? "opacity-50" : ""}`}
                          onClick={() => {
                            if (isRequired) return;
                            
                            const newValue = isSelected
                              ? field.value.filter(v => v !== module.value)
                              : [...field.value, module.value as any];
                            field.onChange(newValue);
                          }}
                        >
                          {module.label}
                          {isRequired && " (Required)"}
                        </Badge>
                      );
                    })}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Separator />

        {/* Pharmacy Settings */}
        {(watchedBusinessType === 'pharmacy_owner' || watchedBusinessType === 'mixed_business' || watchedIsMedical) && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Pharmacy Settings</h3>
            
            <div className="grid md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="pharmacySettings.requiresPrescription"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between">
                    <FormLabel>Requires Prescription</FormLabel>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="pharmacySettings.controlledSubstance"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between">
                    <FormLabel>Controlled Substance</FormLabel>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="pharmacySettings.dosageForm"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Dosage Form</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select dosage form" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {dosageFormOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
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
                      <Input placeholder="e.g., 50mg/ml" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="pharmacySettings.activeIngredient"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Active Ingredient</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Flunixin Meglumine" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="pharmacySettings.administrationRoute"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Administration Route</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select route" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {administrationRouteOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="pharmacySettings.doseCalculationNotes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Dose Calculation Notes</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Special dosing instructions or calculations..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        )}

        {/* Sales Configuration */}
        {watchedListForSale && (
          <>
            <Separator />
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Sales Configuration</h3>
              
              <div className="grid md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="salesConfiguration.markupPercentage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Markup Percentage</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="40"
                          {...field}
                          onChange={(e) => field.onChange(Number(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

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
                          onChange={(e) => field.onChange(Number(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="salesConfiguration.availableForOnlineOrders"
                  render={({ field }) => (
                    <FormItem className="flex items-center justify-between">
                      <FormLabel>Available for Online Orders</FormLabel>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="salesConfiguration.requiresConsultation"
                  render={({ field }) => (
                    <FormItem className="flex items-center justify-between">
                      <FormLabel>Requires Consultation</FormLabel>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default EnhancedProductDetailsSection;
