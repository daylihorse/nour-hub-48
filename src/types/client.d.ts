
export type ClientType = 
  | "Horse Owner" 
  | "Veterinarian" 
  | "Supplier" 
  | "Trainer" 
  | "Staff" 
  | "Other";

export type ClientStatus = "Active" | "Inactive";

export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  address?: string;
  type: ClientType;
  status: ClientStatus;
  lastInteraction?: string; // ISO date string
  createdAt: string; // ISO date string
  notes?: ClientNote[];
  communication?: CommunicationLog[];
  files?: ClientFile[];
  tasks?: ClientTask[];
}

export interface HorseOwner extends Client {
  type: "Horse Owner";
  horsesOwned: number;
  linkedHorses?: string[]; // Array of horse IDs
  stableAssignment?: string;
  billingInfo?: BillingInfo;
}

export interface ClientNote {
  id: string;
  content: string;
  createdAt: string; // ISO date string
  createdBy: string;
}

export interface CommunicationLog {
  id: string;
  type: "call" | "email" | "message" | "meeting";
  description: string;
  date: string; // ISO date string
  contactPerson?: string;
}

export interface ClientFile {
  id: string;
  name: string;
  type: string; // MIME type
  size: number; // in bytes
  uploadDate: string; // ISO date string
  url: string;
}

export interface ClientTask {
  id: string;
  title: string;
  description?: string;
  dueDate?: string; // ISO date string
  status: "pending" | "in-progress" | "completed";
  assignedTo?: string;
  priority: "low" | "medium" | "high";
}

export interface BillingInfo {
  outstanding: number;
  lastPaymentDate?: string; // ISO date string
  lastPaymentAmount?: number;
  paymentMethod?: string;
}
