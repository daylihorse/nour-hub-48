
import { useState, useMemo } from "react";
import { usePagination } from "@/hooks/usePagination";
import { Document } from "../types/documentTypes";

export const useDocumentManagement = (documents: Document[]) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [itemsPerPage, setItemsPerPage] = useState(9);

  const filteredDocuments = useMemo(() => {
    return documents.filter(doc => {
      const matchesSearch = searchTerm === "" || 
        doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesCategory = selectedCategory === "all" || doc.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [documents, searchTerm, selectedCategory]);

  const pagination = usePagination({
    items: filteredDocuments,
    itemsPerPage,
  });

  return {
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    itemsPerPage,
    setItemsPerPage,
    filteredDocuments,
    pagination,
  };
};
