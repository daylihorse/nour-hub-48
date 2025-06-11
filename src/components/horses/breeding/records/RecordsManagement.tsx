
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, FileText, BarChart3, Settings } from "lucide-react";
import RecordsListView from "./RecordsListView";
import RecordsDashboard from "./RecordsDashboard";
import RecordDetailView from "./RecordDetailView";
import { RecordsProvider } from "./RecordsProvider";
import { BaseRecord } from "@/types/breeding/unified-records";

const RecordsManagement = () => {
  const [selectedRecord, setSelectedRecord] = useState<BaseRecord | null>(null);
  const [showRecordDetail, setShowRecordDetail] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");

  const handleViewRecord = (record: BaseRecord) => {
    setSelectedRecord(record);
    setShowRecordDetail(true);
  };

  const handleEditRecord = (record: BaseRecord) => {
    // TODO: Open edit dialog based on record type
    console.log('Edit record:', record);
  };

  const handleDeleteRecord = (recordId: string) => {
    // TODO: Implement delete confirmation
    console.log('Delete record:', recordId);
  };

  return (
    <RecordsProvider>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Records Management</h1>
            <p className="text-muted-foreground">
              Comprehensive management of all breeding and medical records
            </p>
          </div>
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add Record
          </Button>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="records" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              All Records
            </TabsTrigger>
            <TabsTrigger value="medical" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Medical Records
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            <RecordsDashboard />
          </TabsContent>

          <TabsContent value="records" className="space-y-6">
            <RecordsListView 
              showFilters={true} 
              showStats={true}
            />
          </TabsContent>

          <TabsContent value="medical" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Medical Records Filter</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  View only medical-related records including veterinary checkups, 
                  ultrasounds, medications, and health assessments.
                </p>
                {/* TODO: Implement medical-specific filtering */}
                <RecordsListView 
                  showFilters={true} 
                  showStats={false}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Records Management Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">Default Settings</h3>
                  <p className="text-muted-foreground">
                    Configure default settings for record management, 
                    notifications, and data retention policies.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">Export Options</h3>
                  <p className="text-muted-foreground">
                    Export records in various formats for reporting and backup purposes.
                  </p>
                  <div className="flex gap-2">
                    <Button variant="outline">Export to CSV</Button>
                    <Button variant="outline">Export to PDF</Button>
                    <Button variant="outline">Generate Report</Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">Data Management</h3>
                  <p className="text-muted-foreground">
                    Manage data retention, archiving, and cleanup policies.
                  </p>
                  <div className="flex gap-2">
                    <Button variant="outline">Archive Old Records</Button>
                    <Button variant="outline">Cleanup Duplicates</Button>
                    <Button variant="destructive">Delete All Cancelled</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Record Detail Modal */}
        <RecordDetailView
          record={selectedRecord}
          open={showRecordDetail}
          onOpenChange={setShowRecordDetail}
          onEdit={handleEditRecord}
          onDelete={handleDeleteRecord}
        />
      </div>
    </RecordsProvider>
  );
};

export default RecordsManagement;
