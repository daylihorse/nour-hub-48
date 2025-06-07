
import { ClinicDocument } from "../types/documentTypes";

export const mockClinicDocuments: ClinicDocument[] = [
  {
    id: "1",
    name: "Medical Protocol Guidelines",
    type: "PDF",
    category: "protocols",
    uploadDate: "2024-01-15",
    size: "2.4 MB",
    status: "active"
  },
  {
    id: "2", 
    name: "Surgery Checklist",
    type: "DOC",
    category: "procedures",
    uploadDate: "2024-01-10",
    size: "1.1 MB",
    status: "active"
  },
  {
    id: "3",
    name: "Emergency Response Plan",
    type: "PDF",
    category: "emergency",
    uploadDate: "2024-01-08",
    size: "3.2 MB",
    status: "active"
  }
];
