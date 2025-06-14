
export interface PharmacyItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  requiresPrescription: boolean;
  controlledSubstance: boolean;
  dosageForm: string;
  stock: number;
}
