
type MovementType = "arrival" | "departure";
type TransportMethod = "trailer" | "van" | "walking" | "other";
type MovementStatus = "scheduled" | "in-progress" | "completed" | "cancelled";

interface Movement {
  id: string;
  horseName: string;
  type: MovementType;
  date: Date;
  time: string;
  transportMethod: TransportMethod;
  origin: string;
  destination: string;
  handler: string;
  status: MovementStatus;
  healthCertificate: boolean;
  notes?: string;
}
