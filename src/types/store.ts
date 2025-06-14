
export interface StoreProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  department: 'inventory' | 'laboratory' | 'clinic' | 'marketplace' | 'academy';
  stock: number;
  images: string[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface StoreService {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  department: 'inventory' | 'laboratory' | 'clinic' | 'marketplace' | 'academy';
  duration?: number; // in minutes
  isActive: boolean;
  availability: {
    monday: boolean;
    tuesday: boolean;
    wednesday: boolean;
    thursday: boolean;
    friday: boolean;
    saturday: boolean;
    sunday: boolean;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface CartItem {
  id: string;
  type: 'product' | 'service';
  item: StoreProduct | StoreService;
  quantity: number;
  totalPrice: number;
}

export interface SplitPayment {
  method: 'cash' | 'card' | 'bank_transfer' | 'futures_debt';
  amount: number;
}

export interface Sale {
  id: string;
  items: CartItem[];
  subtotal: number;
  tax: number;
  total: number;
  paymentMethod?: 'cash' | 'card' | 'bank_transfer' | 'futures_debt'; // For single payments
  splitPayments?: SplitPayment[]; // For split payments
  clientId?: string; // Reference to client ID
  customerName?: string; // Fallback for walk-in customers
  customerContact?: string; // Fallback for walk-in customers
  saleDate: Date;
  department: string;
}

export interface POSState {
  cart: CartItem[];
  clientId?: string; // Reference to selected client
  customer?: {
    name: string;
    contact: string;
  };
  paymentMethod: 'cash' | 'card' | 'bank_transfer' | 'futures_debt';
  discount: number;
  useSplitPayment?: boolean;
  splitPayments?: SplitPayment[];
}
