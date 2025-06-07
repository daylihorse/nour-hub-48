
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { FileText, Upload, Search, Filter, Download, Eye } from "lucide-react";

interface Document {
  id: string;
  name: string;
  type: string;
  category: string;
  uploadDate: string;
  size: string;
  status: 'active' | 'archived';
}

const ClinicDocumentManager = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Mock documents data
  const documents: Document[] = [
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

  const categories = [
    { value: "all", label: "All Documents" },
    { value: "protocols", label: "Protocols" },
    { value: "procedures", label: "Procedures" },
    { value: "emergency", label: "Emergency" },
    { value: "reports", label: "Reports" }
  ];

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || doc.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">Document Management</h2>
          <p className="text-muted-foreground">Manage clinic documents and protocols</p>
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
        {filteredDocuments.map((doc) => (
          <Card key={doc.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <FileText className="h-8 w-8 text-blue-600" />
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
              <div className="flex gap-2 mt-4">
                <Button variant="outline" size="sm" className="flex-1">
                  <Eye className="h-4 w-4 mr-1" />
                  View
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <Download className="h-4 w-4 mr-1" />
                  Download
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ClinicDocumentManager;
