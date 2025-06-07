
import { Document } from "../types/documentTypes";

export const mockDocuments: Document[] = [
  {
    id: "doc1",
    name: "Breeding Certificate - Thunder Storm.pdf",
    type: "certificate",
    size: "2.3 MB",
    uploadDate: new Date("2024-01-15"),
    category: "Certificates",
    tags: ["breeding", "certificate", "thunder-storm"]
  },
  {
    id: "doc2",
    name: "Veterinary Report - Mare Health Check.pdf",
    type: "medical",
    size: "1.8 MB",
    uploadDate: new Date("2024-01-12"),
    category: "Medical Records",
    tags: ["veterinary", "health", "mare"]
  },
  {
    id: "doc3",
    name: "Breeding Contract - Desert Rose.pdf",
    type: "legal",
    size: "956 KB",
    uploadDate: new Date("2024-01-10"),
    category: "Legal Documents",
    tags: ["contract", "breeding", "desert-rose"]
  },
  {
    id: "doc4",
    name: "Stallion Photo - Golden Arrow.jpg",
    type: "photo",
    size: "4.2 MB",
    uploadDate: new Date("2024-01-08"),
    category: "Photos",
    tags: ["photo", "stallion", "golden-arrow"]
  },
];
