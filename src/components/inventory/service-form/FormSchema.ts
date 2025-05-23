
import { z } from "zod";

// Form schema
export const formSchema = z.object({
  serviceName: z.string().min(1, "Service name is required"),
  classification: z.string().min(1, "Classification is required"),
  approvalDate: z.date(),
  addExpiryDate: z.boolean().default(false),
  expiryDate: z.date().optional(),
  supplier: z.string().min(1, "Supplier is required"),
  group: z.string().optional(),
  additionalNotes: z.string().optional(),
  serviceOffers: z.number().min(1, "Quantity is required"),
  alertThreshold: z.number().min(1, "Alert threshold is required"),
  purchasePrice: z.number().min(0, "Purchase price is required"),
  listForSale: z.boolean().default(false),
  sellingPrice: z.number().optional(),
  images: z.array(z.string()).optional(),
});

export type FormValues = z.infer<typeof formSchema>;

// Demo data
export const classificationOptions = [
  { label: "Ultrasound Scanning of Mares", value: "ultrasound" },
  { label: "Scope", value: "scope" },
  { label: "Wound Stitching", value: "stitching" },
  { label: "Horse Training", value: "training" },
];

export const supplierOptions = [
  { label: "Arabian Horse Pharmacy", value: "arabian" },
  { label: "Al-Sharq Pharmacy for Horse Supplies", value: "alsharq" },
  { label: "Veterinary Clinic", value: "vet" },
];

export interface InventoryServiceFormProps {
  onSave: (data: FormValues & { images?: string[] }) => void;
  onCancel: () => void;
}
