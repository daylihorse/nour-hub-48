
import { createContext, useContext, ReactNode } from "react";

interface Stallion {
  id: string;
  horseId: string;
  horseName: string;
  status: string;
  age: number;
  breed: string;
  totalMares: number;
  successfulBreedings: number;
  livefoals: number;
  successRate: number;
  studFee: number;
  nextAvailable: string;
  bookings: number;
}

interface StallionContextValue {
  stallions: Stallion[];
  error: string | null;
  clearError: () => void;
}

const StallionContext = createContext<StallionContextValue | undefined>(undefined);

export const useStallionContext = () => {
  const context = useContext(StallionContext);
  if (!context) {
    throw new Error("useStallionContext must be used within a StallionProvider");
  }
  return context;
};

interface StallionProviderProps {
  children: ReactNode;
}

export const StallionProvider = ({ children }: StallionProviderProps) => {
  // Mock data for stallions
  const stallions: Stallion[] = [
    {
      id: "1",
      horseId: "stallion-001",
      horseName: "Thunder Storm",
      status: "active",
      age: 8,
      breed: "Arabian",
      totalMares: 24,
      successfulBreedings: 22,
      livefoals: 20,
      successRate: 91.3,
      studFee: 15000,
      nextAvailable: "Next Week",
      bookings: 3
    },
    {
      id: "2",
      horseId: "stallion-002",
      horseName: "Desert Prince",
      status: "active",
      age: 10,
      breed: "Arabian",
      totalMares: 18,
      successfulBreedings: 17,
      livefoals: 16,
      successRate: 94.4,
      studFee: 25000,
      nextAvailable: "Available",
      bookings: 1
    },
    {
      id: "3",
      horseId: "stallion-003",
      horseName: "Royal Legacy",
      status: "active",
      age: 12,
      breed: "Arabian",
      totalMares: 31,
      successfulBreedings: 28,
      livefoals: 27,
      successRate: 90.3,
      studFee: 20000,
      nextAvailable: "2 Weeks",
      bookings: 5
    },
    {
      id: "4",
      horseId: "stallion-004",
      horseName: "Golden Majesty",
      status: "retired",
      age: 18,
      breed: "Arabian",
      totalMares: 156,
      successfulBreedings: 142,
      livefoals: 138,
      successRate: 91.0,
      studFee: 0,
      nextAvailable: "Retired",
      bookings: 0
    },
    {
      id: "5",
      horseId: "stallion-005",
      horseName: "Midnight Shadow",
      status: "unavailable",
      age: 9,
      breed: "Arabian",
      totalMares: 12,
      successfulBreedings: 10,
      livefoals: 9,
      successRate: 83.3,
      studFee: 18000,
      nextAvailable: "Under Treatment",
      bookings: 0
    },
    {
      id: "6",
      horseId: "stallion-006",
      horseName: "Silver Flame",
      status: "active",
      age: 7,
      breed: "Arabian",
      totalMares: 15,
      successfulBreedings: 14,
      livefoals: 13,
      successRate: 93.3,
      studFee: 22000,
      nextAvailable: "Available",
      bookings: 2
    }
  ];

  const value = {
    stallions,
    error: null,
    clearError: () => {}
  };

  return (
    <StallionContext.Provider value={value}>
      {children}
    </StallionContext.Provider>
  );
};
