import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, FileText, Beaker, Search, Filter, ClipboardCheck, Microscope } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

import ResultTemplatesList from "./ResultTemplatesList";
import ServiceTemplatesList from "./ServiceTemplatesList";
import QCTemplatesList from "./QCTemplatesList";
import CreateResultTemplateWizard from "./CreateResultTemplateWizard";
import CreateServiceTemplateWizard from "./CreateServiceTemplateWizard";
import CreateQCTemplateWizard from "./CreateQCTemplateWizard";
import TemplateStats from "./TemplateStats";
import { useTemplateManagement } from "./hooks/useTemplateManagement";

const EnhancedTemplateManagement = () => {
  const [activeTab, setActiveTab] = useState("result-templates");
  const [showResultWizard, setShowResultWizard] = useState(false);
  const [showServiceWizard, setShowServiceWizard] = useState(false);
  const [showQCWizard, setShowQCWizard] = useState(false);

  const {
    searchTerm,
    categoryFilter,
    sampleTypeFilter,
    methodologyFilter,
    categories,
    sampleTypes,
    methodologies,
    setSearchTerm,
    setCategoryFilter,
    setSampleTypeFilter,
    setMethodologyFilter,
    clearFilters,
    templates,
    loading
  } = useTemplateManagement();

  const getTabIcon = (tabValue: string) => {
    switch (tabValue) {
      case "result-templates": return <Beaker className="h-4 w-4" />;
      case "service-templates": return <FileText className="h-4 w-4" />;
      case "qc-templates": return <ClipboardCheck className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Microscope className="h-6 w-6" />
            Laboratory Template Management
          </h2>
          <p className="text-muted-foreground">Create and manage result, service, and QC templates</p>
        </div>
        <div className="flex gap-2">
          <Button
            onClick={() => setShowResultWizard(true)}
            className="flex items-center gap-2 bg-primary hover:bg-primary/90"
          >
            <Plus className="h-4 w-4" />
            New Result Template
          </Button>
          <Button
            variant="outline"
            onClick={() => setShowServiceWizard(true)}
            className="flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            New Service Template
          </Button>
          <Button
            variant="outline"
            onClick={() => setShowQCWizard(true)}
            className="flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            New QC Template
          </Button>
        </div>
      </div>

      {/* Statistics */}
      <TemplateStats />

      {/* Search and Filter Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Advanced Search & Filters
            </div>
            <Badge variant="secondary" className="text-xs">
              {templates.length} templates found
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search templates..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors"
            >
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            <select
              value={sampleTypeFilter}
              onChange={(e) => setSampleTypeFilter(e.target.value)}
              className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors"
            >
              <option value="">All Sample Types</option>
              {sampleTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
            <div className="flex gap-2">
              <select
                value={methodologyFilter}
                onChange={(e) => setMethodologyFilter(e.target.value)}
                className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors"
              >
                <option value="">All Methodologies</option>
                {methodologies.map(methodology => (
                  <option key={methodology} value={methodology}>{methodology}</option>
                ))}
              </select>
              <Button variant="outline" size="sm" onClick={clearFilters}>
                <Filter className="h-4 w-4 mr-2" />
                Clear
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Templates Library */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Templates Library
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="result-templates" className="flex items-center gap-2">
                {getTabIcon("result-templates")}
                Result Templates
                <Badge variant="secondary" className="ml-1 text-xs">18</Badge>
              </TabsTrigger>
              <TabsTrigger value="service-templates" className="flex items-center gap-2">
                {getTabIcon("service-templates")}
                Service Templates
                <Badge variant="secondary" className="ml-1 text-xs">6</Badge>
              </TabsTrigger>
              <TabsTrigger value="qc-templates" className="flex items-center gap-2">
                {getTabIcon("qc-templates")}
                QC Templates
                <Badge variant="secondary" className="ml-1 text-xs">4</Badge>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="result-templates" className="mt-6">
              <ResultTemplatesList searchTerm={searchTerm} />
            </TabsContent>

            <TabsContent value="service-templates" className="mt-6">
              <ServiceTemplatesList searchTerm={searchTerm} />
            </TabsContent>

            <TabsContent value="qc-templates" className="mt-6">
              <QCTemplatesList searchTerm={searchTerm} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Wizards */}
      <CreateResultTemplateWizard
        isOpen={showResultWizard}
        onClose={() => setShowResultWizard(false)}
      />

      <CreateServiceTemplateWizard
        isOpen={showServiceWizard}
        onClose={() => setShowServiceWizard(false)}
      />

      <CreateQCTemplateWizard
        isOpen={showQCWizard}
        onClose={() => setShowQCWizard(false)}
      />
    </div>
  );
};

export default EnhancedTemplateManagement;