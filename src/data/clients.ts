import { Client, HorseOwner } from "@/types/client";

export const mockClients: (Client | HorseOwner)[] = [
  {
    id: "client-001",
    tenant_id: "tenant-001",
    name: "John Smith",
    email: "john.smith@example.com",
    phone: "(555) 123-4567",
    address: "123 Main St, Horsetown, HT 12345",
    client_type: "horse_owner",
    status: "active",
    type: "Horse Owner",
    statusDisplay: "Active",
    lastInteraction: new Date(2023, 4, 15).toISOString(),
    created_at: new Date(2022, 1, 10).toISOString(),
    updated_at: new Date(2023, 4, 15).toISOString(),
    horsesOwned: 3,
    linkedHorses: ["horse-001", "horse-002", "horse-003"],
    stableAssignment: "Block A, Stalls 1-3",
    billingInfo: {
      outstanding: 1200.50,
      lastPaymentDate: new Date(2023, 4, 1).toISOString(),
      lastPaymentAmount: 500,
      paymentMethod: "Credit Card"
    },
    clientNotes: [
      {
        id: "note-001",
        client_id: "client-001",
        tenant_id: "tenant-001",
        content: "John prefers to be contacted in the afternoons.",
        priority: "medium",
        category: "communication",
        created_at: new Date(2023, 3, 12).toISOString(),
        updated_at: new Date(2023, 3, 12).toISOString(),
        created_by: "staff-001"
      }
    ],
    communication: [
      {
        id: "comm-001",
        type: "call",
        description: "Discussed upcoming vet appointment for Thunderbolt",
        date: new Date(2023, 4, 15).toISOString(),
        contactPerson: "John"
      }
    ],
    files: [],
    tasks: []
  },
  {
    id: "client-002",
    tenant_id: "tenant-001",
    name: "Dr. Emily Johnson",
    email: "emily.johnson@vetclinic.com",
    phone: "(555) 987-6543",
    address: "456 Vet Way, Horsetown, HT 12346",
    client_type: "veterinarian",
    status: "active",
    type: "Veterinarian",
    statusDisplay: "Active",
    lastInteraction: new Date(2023, 5, 20).toISOString(),
    created_at: new Date(2021, 6, 15).toISOString(),
    updated_at: new Date(2023, 5, 20).toISOString(),
    clientNotes: [
      {
        id: "note-002",
        client_id: "client-002",
        tenant_id: "tenant-001",
        content: "Specialist in equine dental care and hoof health.",
        priority: "medium",
        category: "professional",
        created_at: new Date(2022, 2, 5).toISOString(),
        updated_at: new Date(2022, 2, 5).toISOString(),
        created_by: "staff-002"
      }
    ],
    communication: [],
    files: [],
    tasks: []
  },
  {
    id: "client-003",
    tenant_id: "tenant-001",
    name: "Sarah Williams",
    email: "sarah.williams@example.com",
    phone: "(555) 456-7890",
    address: "789 Oak Rd, Horsetown, HT 12347",
    client_type: "horse_owner",
    status: "active",
    type: "Horse Owner",
    statusDisplay: "Active",
    lastInteraction: new Date(2023, 5, 10).toISOString(),
    created_at: new Date(2022, 3, 20).toISOString(),
    updated_at: new Date(2023, 5, 10).toISOString(),
    horsesOwned: 2,
    linkedHorses: ["horse-004", "horse-005"],
    stableAssignment: "Block B, Stalls 4-5",
    billingInfo: {
      outstanding: 750.25,
      lastPaymentDate: new Date(2023, 5, 5).toISOString(),
      lastPaymentAmount: 1000,
      paymentMethod: "Bank Transfer"
    },
    clientNotes: [],
    communication: [],
    files: [],
    tasks: []
  },
  {
    id: "client-004",
    tenant_id: "tenant-001",
    name: "Mike Anderson",
    email: "mike.anderson@feedsupplies.com",
    phone: "(555) 234-5678",
    address: "101 Supply Blvd, Horsetown, HT 12348",
    client_type: "supplier",
    status: "active",
    type: "Supplier",
    statusDisplay: "Active",
    lastInteraction: new Date(2023, 5, 25).toISOString(),
    created_at: new Date(2021, 8, 5).toISOString(),
    updated_at: new Date(2023, 5, 25).toISOString(),
    clientNotes: [],
    communication: [],
    files: [],
    tasks: []
  },
  {
    id: "client-005",
    tenant_id: "tenant-001",
    name: "David Brown",
    email: "david.brown@example.com",
    phone: "(555) 345-6789",
    address: "202 Pine St, Horsetown, HT 12349",
    client_type: "horse_owner",
    status: "inactive",
    type: "Horse Owner",
    statusDisplay: "Inactive",
    lastInteraction: new Date(2023, 2, 15).toISOString(),
    created_at: new Date(2022, 1, 10).toISOString(),
    updated_at: new Date(2023, 2, 15).toISOString(),
    horsesOwned: 1,
    linkedHorses: ["horse-006"],
    stableAssignment: "Block C, Stall 6",
    billingInfo: {
      outstanding: 350,
      lastPaymentDate: new Date(2023, 1, 15).toISOString(),
      lastPaymentAmount: 400,
      paymentMethod: "Cash"
    },
    clientNotes: [],
    communication: [],
    files: [],
    tasks: []
  },
  {
    id: "client-006",
    tenant_id: "tenant-001",
    name: "Robert Wilson",
    email: "robert.wilson@trainerelite.com",
    phone: "(555) 567-8901",
    address: "303 Training Loop, Horsetown, HT 12350",
    client_type: "trainer",
    status: "active",
    type: "Trainer",
    statusDisplay: "Active",
    lastInteraction: new Date(2023, 5, 22).toISOString(),
    created_at: new Date(2021, 10, 12).toISOString(),
    updated_at: new Date(2023, 5, 22).toISOString(),
    clientNotes: [],
    communication: [],
    files: [],
    tasks: []
  },
  {
    id: "client-007",
    tenant_id: "tenant-001",
    name: "Lisa Martinez",
    email: "lisa.martinez@example.com",
    phone: "(555) 678-9012",
    address: "404 Maple Ave, Horsetown, HT 12351",
    client_type: "horse_owner",
    status: "active",
    type: "Horse Owner",
    statusDisplay: "Active",
    lastInteraction: new Date(2023, 5, 18).toISOString(),
    created_at: new Date(2022, 2, 28).toISOString(),
    updated_at: new Date(2023, 5, 18).toISOString(),
    horsesOwned: 4,
    linkedHorses: ["horse-007", "horse-008", "horse-009", "horse-010"],
    stableAssignment: "Block D, Stalls 7-10",
    billingInfo: {
      outstanding: 2100.75,
      lastPaymentDate: new Date(2023, 5, 1).toISOString(),
      lastPaymentAmount: 1500,
      paymentMethod: "Credit Card"
    },
    clientNotes: [],
    communication: [],
    files: [],
    tasks: []
  }
];

export function getClientById(id: string): Client | HorseOwner | undefined {
  return mockClients.find(client => client.id === id);
}

export function getHorseOwners(): HorseOwner[] {
  return mockClients.filter(client => client.type === "Horse Owner") as HorseOwner[];
}

export function getAllClients(): (Client | HorseOwner)[] {
  return mockClients;
}
