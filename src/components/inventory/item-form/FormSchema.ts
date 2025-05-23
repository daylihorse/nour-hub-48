
import { z } from "zod";

// Form schema
export const formSchema = z.object({
  productName: z.string().min(1, "Product name is required"),
  warehouse: z.string().min(1, "Warehouse selection is required"),
  classification: z.string().min(1, "Classification is required"),
  entryDate: z.date(),
  expiryDate: z.date().optional(),
  serialNumber: z.string().optional(),
  batchNumber: z.string().optional(),
  supplier: z.string().min(1, "Supplier is required"),
  group: z.string().optional(),
  additionalNotes: z.string().optional(),
  quantitiesPurchased: z.number().min(1, "Quantity is required"),
  unitOfMeasure: z.string().min(1, "Unit of measure is required"),
  unitContains: z.string().optional(),
  alertThreshold: z.number().min(1, "Alert threshold is required"),
  purchasePrice: z.number().min(0, "Purchase price is required"),
  listForSale: z.boolean().default(false),
  sellingPrice: z.number().optional(),
  images: z.array(z.string()).optional(),
});

export type FormValues = z.infer<typeof formSchema>;

// Demo data
export const warehouseOptions = [
  { label: "Medicine Warehouses", value: "medicine" },
  { label: "Horse Saddle Warehouse", value: "saddle" },
  { label: "Food Storage Warehouse", value: "food" },
  { label: "Cleaning Supplies Warehouse", value: "cleaning" },
];

export const classificationOptions = [
  { label: "Cleaning Tools", value: "cleaning" },
  { label: "Farrier Tools", value: "farrier" },
  { label: "Feed Materials", value: "feed" },
  { label: "Horse Training Tools", value: "training" },
  { label: "Laboratory Equipments", value: "lab" },
  { label: "Medical Supplies", value: "medical" },
  { label: "Products for Sale", value: "sale" },
  { label: "Veterinary Products", value: "vet" },
];

export const supplierOptions = [
  { label: "Arabian Horse Pharmacy", value: "arabian" },
  { label: "Al-Sharq Pharmacy for Horse Supplies", value: "alsharq" },
  { label: "Al-Russaifi Stores for Herbal Products", value: "alrussaifi" },
];

export const unitOptions = [
  { label: "Piece (Pcs)", value: "piece" },
  { label: "Gram (g)", value: "gram" },
  { label: "Milligram (mg)", value: "milligram" },
  { label: "Kilogram (Kg)", value: "kilogram" },
  { label: "Liter (L)", value: "liter" },
  { label: "Milliliter (mL)", value: "milliliter" },
  { label: "Bag / Tie", value: "bag" },
  { label: "Pack / Set", value: "pack" },
  { label: "Centimeters", value: "cm" },
  { label: "Cubic Centimeters", value: "cc" },
  { label: "Pound", value: "pound" },
  { label: "Gallons", value: "gallon" },
  { label: "Tablets", value: "tablet" },
];

export interface InventoryItemFormProps {
  onSave: (data: FormValues & { images?: string[] }) => void;
  onCancel: () => void;
}
