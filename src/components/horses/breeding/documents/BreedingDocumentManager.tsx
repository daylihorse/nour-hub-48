
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Upload, FileText, Download, Eye, Trash2, Search, FolderOpen } from "lucide-react";

interface Document {
  id: string;
  name: string;
  type: 'certificate' | 'medical' | 'legal' | 'photo' | 'other';
  size: string;
  uploadDate: Date;
  category: string;
  tags: string[];
  url?: string;
}

const BreedingDocumentManager = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Mock documents data
  const documents: Document[] = [
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

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'certificate': return 'bg-blue-100 text-blue-700';
      case 'medical': return 'bg-red-100 text-red-700';
      case 'legal': return 'bg-purple-100 text-purple-700';
      case 'photo': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'certificate': return '📜';
      case 'medical': return '🏥';
      case 'legal': return '📋';
      case 'photo': return '📸';
      default: return '📄';
    }
  };

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = searchTerm === "" || 
      doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === "all" || doc.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ["all", ...new Set(documents.map(doc => doc.category))];

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FolderOpen className="h-6 w-6 text-blue-600" />
              <div>
                <CardTitle>Document Management</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Store and organize breeding-related documents
                </p>
              </div>
            </div>
            <Button className="flex items-center gap-2">
              <Upload className="h-4 w-4" />
              Upload Document
            </Button>
          </div>
        </CardHeader>
      </Card>

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
            <div className="flex gap-2 flex-wrap">
              {categories.map(category => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category === "all" ? "All Categories" : category}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Document Tabs */}
      <Tabs defaultValue="grid" className="w-full">
        <TabsList>
          <TabsTrigger value="grid">Grid View</TabsTrigger>
          <TabsTrigger value="list">List View</TabsTrigger>
          <TabsTrigger value="categories">By Category</TabsTrigger>
        </TabsList>

        <TabsContent value="grid" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredDocuments.map((doc) => (
              <Card key={doc.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="text-2xl">{getTypeIcon(doc.type)}</div>
                      <Badge className={getTypeColor(doc.type)}>
                        {doc.type}
                      </Badge>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-sm leading-tight mb-1">
                        {doc.name}
                      </h4>
                      <p className="text-xs text-muted-foreground">
                        {doc.size} • {doc.uploadDate.toLocaleDateString()}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {doc.tags.slice(0, 2).map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                      {doc.tags.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{doc.tags.length - 2} more
                        </Badge>
                      )}
                    </div>

                    <div className="flex gap-1">
                      <Button size="sm" variant="outline" className="flex-1">
                        <Eye className="h-3 w-3 mr-1" />
                        View
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1">
                        <Download className="h-3 w-3 mr-1" />
                        Download
                      </Button>
                      <Button size="sm" variant="outline">
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="list" className="mt-6">
          <Card>
            <CardContent className="p-0">
              <div className="divide-y">
                {filteredDocuments.map((doc) => (
                  <div key={doc.id} className="p-4 hover:bg-muted/50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="text-xl">{getTypeIcon(doc.type)}</div>
                        <div>
                          <h4 className="font-medium">{doc.name}</h4>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Badge className={`${getTypeColor(doc.type)} text-xs`}>
                              {doc.type}
                            </Badge>
                            <span>{doc.size}</span>
                            <span>•</span>
                            <span>{doc.uploadDate.toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="categories" className="mt-6">
          <div className="space-y-6">
            {categories.filter(cat => cat !== "all").map(category => {
              const categoryDocs = documents.filter(doc => doc.category === category);
              return (
                <Card key={category}>
                  <CardHeader>
                    <CardTitle className="text-lg">{category}</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {categoryDocs.length} document{categoryDocs.length !== 1 ? 's' : ''}
                    </p>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {categoryDocs.map((doc) => (
                        <div key={doc.id} className="flex items-center gap-3 p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                          <div className="text-lg">{getTypeIcon(doc.type)}</div>
                          <div className="flex-1 min-w-0">
                            <h5 className="font-medium text-sm truncate">{doc.name}</h5>
                            <p className="text-xs text-muted-foreground">{doc.size}</p>
                          </div>
                          <div className="flex gap-1">
                            <Button size="sm" variant="outline">
                              <Eye className="h-3 w-3" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Download className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BreedingDocumentManager;
