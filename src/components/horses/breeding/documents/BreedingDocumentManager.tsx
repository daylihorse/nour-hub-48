
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DocumentHeader from "./components/DocumentHeader";
import DocumentFilters from "./components/DocumentFilters";
import DocumentGrid from "./components/DocumentGrid";
import DocumentList from "./components/DocumentList";
import DocumentCategories from "./components/DocumentCategories";
import DocumentPagination from "@/components/shared/DocumentPagination";
import DocumentPaginationControls from "@/components/shared/DocumentPaginationControls";
import { useDocumentManagement } from "./hooks/useDocumentManagement";
import { mockDocuments } from "./data/mockDocuments";

const BreedingDocumentManager = () => {
  const [activeTab, setActiveTab] = useState("grid");
  const [cardsPerRow, setCardsPerRow] = useState(3);

  const {
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    itemsPerPage,
    setItemsPerPage,
    filteredDocuments,
    pagination,
  } = useDocumentManagement(mockDocuments);

  const {
    currentPage,
    totalPages,
    paginatedItems: paginatedDocuments,
    goToPage,
  } = pagination;

  return (
    <div className="space-y-6">
      <DocumentHeader />

      <DocumentFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        documents={mockDocuments}
      />

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="flex justify-between items-center">
          <TabsList>
            <TabsTrigger value="grid">Grid View</TabsTrigger>
            <TabsTrigger value="list">List View</TabsTrigger>
            <TabsTrigger value="categories">By Category</TabsTrigger>
          </TabsList>
          
          {activeTab === "grid" && (
            <DocumentPaginationControls
              cardsPerRow={cardsPerRow}
              onCardsPerRowChange={setCardsPerRow}
            />
          )}
        </div>

        <TabsContent value="grid" className="mt-6 space-y-6">
          <DocumentGrid documents={paginatedDocuments} cardsPerRow={cardsPerRow} />

          <DocumentPagination
            currentPage={currentPage}
            totalPages={totalPages}
            itemsPerPage={itemsPerPage}
            totalItems={filteredDocuments.length}
            onPageChange={goToPage}
            onItemsPerPageChange={setItemsPerPage}
          />
        </TabsContent>

        <TabsContent value="list" className="mt-6 space-y-6">
          <DocumentList documents={paginatedDocuments} />

          <DocumentPagination
            currentPage={currentPage}
            totalPages={totalPages}
            itemsPerPage={itemsPerPage}
            totalItems={filteredDocuments.length}
            onPageChange={goToPage}
            onItemsPerPageChange={setItemsPerPage}
          />
        </TabsContent>

        <TabsContent value="categories" className="mt-6">
          <DocumentCategories documents={filteredDocuments} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BreedingDocumentManager;
