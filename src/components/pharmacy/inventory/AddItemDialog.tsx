import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { InventoryItem } from './types';
import { toast } from "sonner";

interface AddItemDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (item: Omit<InventoryItem, 'id'>) => void;
  initialData?: InventoryItem | null;
  mode?: 'add' | 'edit';
}

const AddItemDialog = ({ open, onOpenChange, onSave, initialData, mode = 'add' }: AddItemDialogProps) => {
  const [formData, setFormData] = useState({
    name: "",
    genericName: "",
    brandName: "",
    category: "",
    dosageForm: "",
    strength: "",
    unit: "",
    currentStock: 0,
    minimumStock: 0,
    maximumStock: 0,
    expiryDate: "",
    batchNumber: "",
    supplier: "",
    unitCost: 0,
    sellingPrice: 0,
    location: "",
    requiresPrescription: false,
    controlledSubstance: false,
    storageRequirements: "",
  });

  // Initialize form with data when editing
  useEffect(() => {
    if (initialData && mode === 'edit') {
      setFormData({
        name: initialData.name,
        genericName: initialData.genericName,
        brandName: initialData.brandName || "",
        category: initialData.category,
        dosageForm: initialData.dosageForm,
        strength: initialData.strength,
        unit: initialData.unit,
        currentStock: initialData.currentStock,
        minimumStock: initialData.minimumStock,
        maximumStock: initialData.maximumStock,
        expiryDate: initialData.expiryDate,
        batchNumber: initialData.batchNumber,
        supplier: initialData.supplier,
        unitCost: initialData.unitCost,
        sellingPrice: initialData.sellingPrice,
        location: initialData.location,
        requiresPrescription: initialData.requiresPrescription,
        controlledSubstance: initialData.controlledSubstance,
        storageRequirements: initialData.storageRequirements,
      });
    } else if (mode === 'add') {
      // Reset form for add mode
      setFormData({
        name: "",
        genericName: "",
        brandName: "",
        category: "",
        dosageForm: "",
        strength: "",
        unit: "",
        currentStock: 0,
        minimumStock: 0,
        maximumStock: 0,
        expiryDate: "",
        batchNumber: "",
        supplier: "",
        unitCost: 0,
        sellingPrice: 0,
        location: "",
        requiresPrescription: false,
        controlledSubstance: false,
        storageRequirements: "",
      });
    }
  }, [initialData, mode, open]);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    // Basic validation
    if (!formData.name || !formData.genericName || !formData.category) {
      toast.error("Please fill in all required fields");
      return;
    }

    onSave(formData as Omit<InventoryItem, 'id'>);
    toast.success(mode === 'edit' ? "Medication updated successfully" : "Medication added successfully");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{mode === 'edit' ? 'Edit Medication' : 'Add New Medication'}</DialogTitle>
          <DialogDescription>
            {mode === 'edit' ? 'Update medication information.' : 'Add a new medication to your pharmacy inventory.'}
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Basic Information</h3>
            
            <div className="space-y-2">
              <Label htmlFor="name">Medication Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="e.g., Penicillin Injectable"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="genericName">Generic Name *</Label>
              <Input
                id="genericName"
                value={formData.genericName}
                onChange={(e) => handleInputChange('genericName', e.target.value)}
                placeholder="e.g., Penicillin G Procaine"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="brandName">Brand Name</Label>
              <Input
                id="brandName"
                value={formData.brandName}
                onChange={(e) => handleInputChange('brandName', e.target.value)}
                placeholder="e.g., Pen-G"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="antibiotic">Antibiotic</SelectItem>
                  <SelectItem value="anti_inflammatory">Anti-inflammatory</SelectItem>
                  <SelectItem value="sedative">Sedative</SelectItem>
                  <SelectItem value="vitamin">Vitamin</SelectItem>
                  <SelectItem value="vaccine">Vaccine</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-2">
                <Label htmlFor="dosageForm">Dosage Form</Label>
                <Select value={formData.dosageForm} onValueChange={(value) => handleInputChange('dosageForm', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Form" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="injection">Injection</SelectItem>
                    <SelectItem value="liquid">Liquid</SelectItem>
                    <SelectItem value="powder">Powder</SelectItem>
                    <SelectItem value="ointment">Ointment</SelectItem>
                    <SelectItem value="tablet">Tablet</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="unit">Unit</Label>
                <Input
                  id="unit"
                  value={formData.unit}
                  onChange={(e) => handleInputChange('unit', e.target.value)}
                  placeholder="e.g., mg/ml"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="strength">Strength</Label>
              <Input
                id="strength"
                value={formData.strength}
                onChange={(e) => handleInputChange('strength', e.target.value)}
                placeholder="e.g., 300,000"
              />
            </div>
          </div>

          {/* Stock & Pricing */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Stock & Pricing</h3>
            
            <div className="grid grid-cols-3 gap-2">
              <div className="space-y-2">
                <Label htmlFor="currentStock">Current Stock</Label>
                <Input
                  id="currentStock"
                  type="number"
                  value={formData.currentStock}
                  onChange={(e) => handleInputChange('currentStock', parseInt(e.target.value) || 0)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="minimumStock">Min Stock</Label>
                <Input
                  id="minimumStock"
                  type="number"
                  value={formData.minimumStock}
                  onChange={(e) => handleInputChange('minimumStock', parseInt(e.target.value) || 0)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="maximumStock">Max Stock</Label>
                <Input
                  id="maximumStock"
                  type="number"
                  value={formData.maximumStock}
                  onChange={(e) => handleInputChange('maximumStock', parseInt(e.target.value) || 0)}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-2">
                <Label htmlFor="unitCost">Unit Cost ($)</Label>
                <Input
                  id="unitCost"
                  type="number"
                  step="0.01"
                  value={formData.unitCost}
                  onChange={(e) => handleInputChange('unitCost', parseFloat(e.target.value) || 0)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sellingPrice">Selling Price ($)</Label>
                <Input
                  id="sellingPrice"
                  type="number"
                  step="0.01"
                  value={formData.sellingPrice}
                  onChange={(e) => handleInputChange('sellingPrice', parseFloat(e.target.value) || 0)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="expiryDate">Expiry Date</Label>
              <Input
                id="expiryDate"
                type="date"
                value={formData.expiryDate}
                onChange={(e) => handleInputChange('expiryDate', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="batchNumber">Batch Number</Label>
              <Input
                id="batchNumber"
                value={formData.batchNumber}
                onChange={(e) => handleInputChange('batchNumber', e.target.value)}
                placeholder="e.g., PEN2024001"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="supplier">Supplier</Label>
              <Input
                id="supplier"
                value={formData.supplier}
                onChange={(e) => handleInputChange('supplier', e.target.value)}
                placeholder="e.g., VetMed Pharmaceuticals"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Storage Location</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                placeholder="e.g., Cold Storage A-1"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="storageRequirements">Storage Requirements</Label>
              <Textarea
                id="storageRequirements"
                value={formData.storageRequirements}
                onChange={(e) => handleInputChange('storageRequirements', e.target.value)}
                placeholder="e.g., Refrigerate 2-8°C"
              />
            </div>

            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="requiresPrescription"
                  checked={formData.requiresPrescription}
                  onCheckedChange={(checked) => handleInputChange('requiresPrescription', checked)}
                />
                <Label htmlFor="requiresPrescription">Requires Prescription</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="controlledSubstance"
                  checked={formData.controlledSubstance}
                  onCheckedChange={(checked) => handleInputChange('controlledSubstance', checked)}
                />
                <Label htmlFor="controlledSubstance">Controlled Substance</Label>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>
            {mode === 'edit' ? 'Update Medication' : 'Add Medication'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddItemDialog; 