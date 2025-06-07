
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { FileText, Upload, Search, Filter } from "lucide-react";
import { usePagination } from "@/hooks/usePagination";
import DocumentCardActions from "@/components/shared/DocumentCardActions";
import DocumentPagination from "@/components/shared/DocumentPagination";

interface Document {
  id: string;
  name: string;
  type: string;
  category: string;
  uploadDate: string;
  size: string;
  status: 'active' | 'archived';
}

const LaboratoryDocumentManager = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [itemsPerPage, setItemsPerPage] = useState(9);

  // Mock documents data
  const documents: Document[] = [
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

  const categories = [
    { value: "all", label: "All Documents" },
    { value: "protocols", label: "Protocols" },
    { value: "equipment", label: "Equipment" },
    { value: "quality", label: "Quality Control" },
    { value: "templates", label: "Templates" },
    { value: "reports", label: "Reports" }
  ];

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || doc.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const {
    currentPage,
    totalPages,
    paginatedItems: paginatedDocuments,
    goToPage,
  } = usePagination({
    items: filteredDocuments,
    itemsPerPage,
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">Laboratory Documents</h2>
          <p className="text-muted-foreground">Manage lab protocols, reports, and documentation</p>
        </div>
        <Button className="flex items-center gap-2">
          <Upload className="h-4 w-4" />
          Upload Document
        </Button>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search documents..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 border rounded-md"
              >
                {categories.map(cat => (
                  <option key={cat.value} value={cat.value}>{cat.label}</option>
                ))}
              </select>
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                More Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Documents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedDocuments.map((doc) => (
          <Card key={doc.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <FileText className="h-8 w-8 text-green-600" />
                <Badge variant={doc.status === 'active' ? 'default' : 'secondary'}>
                  {doc.status}
                </Badge>
              </div>
              <CardTitle className="text-lg">{doc.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex justify-between">
                  <span>Type:</span>
                  <span>{doc.type}</span>
                </div>
                <div className="flex justify-between">
                  <span>Category:</span>
                  <span className="capitalize">{doc.category}</span>
                </div>
                <div className="flex justify-between">
                  <span>Size:</span>
                  <span>{doc.size}</span>
                </div>
                <div className="flex justify-between">
                  <span>Uploaded:</span>
                  <span>{doc.uploadDate}</span>
                </div>
              </div>
              <DocumentCardActions documentId={doc.id} documentName={doc.name} />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      <DocumentPagination
        currentPage={currentPage}
        totalPages={totalPages}
        itemsPerPage={itemsPerPage}
        totalItems={filteredDocuments.length}
        onPageChange={goToPage}
        onItemsPerPageChange={setItemsPerPage}
      />
    </div>
  );
};

export default LaboratoryDocumentManager;
