
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LaboratoryDocumentHeader from "./documents/components/LaboratoryDocumentHeader";
import LaboratoryDocumentFilters from "./documents/components/LaboratoryDocumentFilters";
import LaboratoryDocumentGrid from "./documents/components/LaboratoryDocumentGrid";
import DocumentPagination from "@/components/shared/DocumentPagination";
import DocumentPaginationControls from "@/components/shared/DocumentPaginationControls";
import { mockLaboratoryDocuments } from "./documents/data/mockDocuments";
import { useLaboratoryDocumentManagement } from "./documents/hooks/useLaboratoryDocumentManagement";

const LaboratoryDocumentManager = () => {
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
  } = useLaboratoryDocumentManagement(mockLaboratoryDocuments);

  const {
    currentPage,
    totalPages,
    paginatedItems: paginatedDocuments,
    goToPage,
  } = pagination;

  return (
    <div className="space-y-6">
      <LaboratoryDocumentHeader />

      <LaboratoryDocumentFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        itemsPerPage={itemsPerPage}
        onItemsPerPageChange={setItemsPerPage}
      />

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="flex justify-between items-center">
          <TabsList>
            <TabsTrigger value="grid">Grid View</TabsTrigger>
          </TabsList>
          
          {activeTab === "grid" && (
            <DocumentPaginationControls
              cardsPerRow={cardsPerRow}
              onCardsPerRowChange={setCardsPerRow}
            />
          )}
        </div>

        <TabsContent value="grid" className="mt-6 space-y-6">
          <LaboratoryDocumentGrid documents={paginatedDocuments} cardsPerRow={cardsPerRow} />

          <DocumentPagination
            currentPage={currentPage}
            totalPages={totalPages}
            itemsPerPage={itemsPerPage}
            totalItems={filteredDocuments.length}
            onPageChange={goToPage}
            onItemsPerPageChange={setItemsPerPage}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LaboratoryDocumentManager;
