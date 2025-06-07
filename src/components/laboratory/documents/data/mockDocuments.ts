
import { LaboratoryDocument } from "../types/documentTypes";

export const mockLaboratoryDocuments: LaboratoryDocument[] = [
  {
    id: "1",
    name: "Test Protocol Standards",
    type: "PDF",
    category: "protocols",
    uploadDate: "2024-01-15",
    size: "1.8 MB",
    status: "active"
  },
  {
    id: "2",
    name: "Equipment Calibration Log",
    type: "XLS",
    category: "equipment",
    uploadDate: "2024-01-12",
    size: "856 KB",
    status: "active"
  },
  {
    id: "3",
    name: "Quality Control Report",
    type: "PDF",
    category: "quality",
    uploadDate: "2024-01-10",
    size: "2.1 MB",
    status: "active"
  },
  {
    id: "4",
    name: "Sample Analysis Template",
    type: "DOC",
    category: "templates",
    uploadDate: "2024-01-08",
    size: "945 KB",
    status: "active"
  }
];
