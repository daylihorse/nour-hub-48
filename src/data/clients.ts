
import { Client, HorseOwner } from "@/types/client";
import { v4 as uuidv4 } from "uuid";

export const mockClients: (Client | HorseOwner)[] = [
  {
    id: uuidv4(),
    name: "John Smith",
    email: "john.smith@example.com",
    phone: "(555) 123-4567",
    address: "123 Main St, Horsetown, HT 12345",
    type: "Horse Owner",
    status: "Active",
    lastInteraction: new Date(2023, 4, 15).toISOString(),
    createdAt: new Date(2022, 1, 10).toISOString(),
    horsesOwned: 3,
    linkedHorses: ["horse-001", "horse-002", "horse-003"],
    stableAssignment: "Block A, Stalls 1-3",
    billingInfo: {
      outstanding: 1200.50,
      lastPaymentDate: new Date(2023, 4, 1).toISOString(),
      lastPaymentAmount: 500,
      paymentMethod: "Credit Card"
    },
    notes: [
      {
        id: uuidv4(),
        content: "John prefers to be contacted in the afternoons.",
        createdAt: new Date(2023, 3, 12).toISOString(),
        createdBy: "staff-001"
      }
    ],
    communication: [
      {
        id: uuidv4(),
        type: "call",
        description: "Discussed upcoming vet appointment for Thunderbolt",
        date: new Date(2023, 4, 15).toISOString(),
        contactPerson: "John"
      }
    ]
  },
  {
    id: uuidv4(),
    name: "Dr. Emily Johnson",
    email: "emily.johnson@vetclinic.com",
    phone: "(555) 987-6543",
    address: "456 Vet Way, Horsetown, HT 12346",
    type: "Veterinarian",
    status: "Active",
    lastInteraction: new Date(2023, 5, 20).toISOString(),
    createdAt: new Date(2021, 6, 15).toISOString(),
    notes: [
      {
        id: uuidv4(),
        content: "Specialist in equine dental care and hoof health.",
        createdAt: new Date(2022, 2, 5).toISOString(),
        createdBy: "staff-002"
      }
    ]
  },
  {
    id: uuidv4(),
    name: "Sarah Williams",
    email: "sarah.williams@example.com",
    phone: "(555) 456-7890",
    address: "789 Oak Rd, Horsetown, HT 12347",
    type: "Horse Owner",
    status: "Active",
    lastInteraction: new Date(2023, 5, 10).toISOString(),
    createdAt: new Date(2022, 3, 20).toISOString(),
    horsesOwned: 2,
    linkedHorses: ["horse-004", "horse-005"],
    stableAssignment: "Block B, Stalls 4-5",
    billingInfo: {
      outstanding: 750.25,
      lastPaymentDate: new Date(2023, 5, 5).toISOString(),
      lastPaymentAmount: 1000,
      paymentMethod: "Bank Transfer"
    }
  },
  {
    id: uuidv4(),
    name: "Mike Anderson",
    email: "mike.anderson@feedsupplies.com",
    phone: "(555) 234-5678",
    address: "101 Supply Blvd, Horsetown, HT 12348",
    type: "Supplier",
    status: "Active",
    lastInteraction: new Date(2023, 5, 25).toISOString(),
    createdAt: new Date(2021, 8, 5).toISOString()
  },
  {
    id: uuidv4(),
    name: "David Brown",
    email: "david.brown@example.com",
    phone: "(555) 345-6789",
    address: "202 Pine St, Horsetown, HT 12349",
    type: "Horse Owner",
    status: "Inactive",
    lastInteraction: new Date(2023, 2, 15).toISOString(),
    createdAt: new Date(2022, 1, 10).toISOString(),
    horsesOwned: 1,
    linkedHorses: ["horse-006"],
    stableAssignment: "Block C, Stall 6",
    billingInfo: {
      outstanding: 350,
      lastPaymentDate: new Date(2023, 1, 15).toISOString(),
      lastPaymentAmount: 400,
      paymentMethod: "Cash"
    }
  },
  {
    id: uuidv4(),
    name: "Robert Wilson",
    email: "robert.wilson@trainerelite.com",
    phone: "(555) 567-8901",
    address: "303 Training Loop, Horsetown, HT 12350",
    type: "Trainer",
    status: "Active",
    lastInteraction: new Date(2023, 5, 22).toISOString(),
    createdAt: new Date(2021, 10, 12).toISOString()
  },
  {
    id: uuidv4(),
    name: "Lisa Martinez",
    email: "lisa.martinez@example.com",
    phone: "(555) 678-9012",
    address: "404 Maple Ave, Horsetown, HT 12351",
    type: "Horse Owner",
    status: "Active",
    lastInteraction: new Date(2023, 5, 18).toISOString(),
    createdAt: new Date(2022, 2, 28).toISOString(),
    horsesOwned: 4,
    linkedHorses: ["horse-007", "horse-008", "horse-009", "horse-010"],
    stableAssignment: "Block D, Stalls 7-10",
    billingInfo: {
      outstanding: 2100.75,
      lastPaymentDate: new Date(2023, 5, 1).toISOString(),
      lastPaymentAmount: 1500,
      paymentMethod: "Credit Card"
    }
  }
];

export function getClientById(id: string): Client | HorseOwner | undefined {
  return mockClients.find(client => client.id === id);
}

export function getHorseOwners(): HorseOwner[] {
  return mockClients.filter(client => client.type === "Horse Owner") as HorseOwner[];
}
