
export type ClientType = 
  | "horse_owner" 
  | "veterinarian" 
  | "supplier" 
  | "trainer" 
  | "staff" 
  | "other";

export type ClientStatus = "active" | "inactive";

// UI display types for backward compatibility
export type ClientTypeDisplay = 
  | "Horse Owner" 
  | "Veterinarian" 
  | "Supplier" 
  | "Trainer" 
  | "Staff" 
  | "Other";

export type ClientStatusDisplay = "Active" | "Inactive";

export interface Client {
  id: string;
  tenant_id: string;
  client_number?: string;
  name: string;
  email?: string;
  phone?: string;
  address?: any; // JSON field
  client_type: ClientType;
  status: ClientStatus;
  billing_address?: any; // JSON field
  payment_terms?: string;
  credit_limit?: number;
  tax_id?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
  created_by?: string;
  // Computed fields for UI compatibility
  type?: ClientTypeDisplay; // For backward compatibility
  statusDisplay?: ClientStatusDisplay; // For backward compatibility
  lastInteraction?: string;
  clientNotes?: ClientNote[];
  communication?: CommunicationLog[];
  files?: ClientFile[];
  tasks?: ClientTask[];
}

export interface HorseOwner extends Client {
  client_type: "horse_owner";
  horsesOwned: number;
  linkedHorses?: string[];
  stableAssignment?: string;
  billingInfo?: BillingInfo;
}

export interface ClientNote {
  id: string;
  client_id: string;
  tenant_id: string;
  content: string;
  priority: "low" | "medium" | "high";
  category: string;
  is_private?: boolean;
  created_at: string;
  updated_at: string;
  created_by?: string;
}

export interface CommunicationLog {
  id: string;
  type: "call" | "email" | "message" | "meeting";
  description: string;
  date: string;
  contactPerson?: string;
}

export interface ClientFile {
  id: string;
  client_id: string;
  tenant_id: string;
  name: string;
  file_type: string;
  file_size?: number;
  file_url: string;
  upload_date: string;
  created_by?: string;
}

export interface ClientTask {
  id: string;
  client_id: string;
  tenant_id: string;
  title: string;
  description?: string;
  status: "pending" | "in_progress" | "completed";
  priority: "low" | "medium" | "high";
  due_date?: string;
  assigned_to?: string;
  created_at: string;
  updated_at: string;
  created_by?: string;
}

export interface BillingInfo {
  outstanding: number;
  lastPaymentDate?: string;
  lastPaymentAmount?: number;
  paymentMethod?: string;
}
