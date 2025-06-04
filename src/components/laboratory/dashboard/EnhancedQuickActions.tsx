
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { Plus, Search, FileText, Settings } from "lucide-react";
import EnhancedAddSampleDialog from "../sample-management/EnhancedAddSampleDialog";

const EnhancedQuickActions = () => {
  const [isAddSampleDialogOpen, setIsAddSampleDialogOpen] = useState(false);

  const handleSearchTests = () => {
    // Navigate to test results with search focus
    console.log("Navigating to search tests");
    // This would typically use router navigation
  };

  const handleGenerateReport = () => {
    // Open report generation dialog/page
    console.log("Opening report generation");
  };

  const handleEquipmentCheck = () => {
    // Navigate to equipment management
    console.log("Navigating to equipment check");
  };

  const actions = [
    {
      title: "New Sample",
      icon: Plus,
      color: "bg-blue-500 hover:bg-blue-600",
      action: () => setIsAddSampleDialogOpen(true)
    },
    {
      title: "Search Tests",
      icon: Search,
      color: "bg-green-500 hover:bg-green-600",
      action: handleSearchTests
    },
    {
      title: "Generate Report",
      icon: FileText,
      color: "bg-purple-500 hover:bg-purple-600",
      action: handleGenerateReport
    },
    {
      title: "Equipment Check",
      icon: Settings,
      color: "bg-orange-500 hover:bg-orange-600",
      action: handleEquipmentCheck
    }
  ];

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3">
            {actions.map((action) => {
              const Icon = action.icon;
              return (
                <Button
                  key={action.title}
                  variant="outline"
                  className="h-auto p-4 flex flex-col items-center gap-2 hover:bg-gray-50"
                  onClick={action.action}
                >
                  <div className={`p-2 rounded-lg ${action.color} text-white`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <p className="text-sm font-medium">{action.title}</p>
                </Button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <Dialog open={isAddSampleDialogOpen} onOpenChange={setIsAddSampleDialogOpen}>
        <EnhancedAddSampleDialog 
          isOpen={isAddSampleDialogOpen} 
          setIsOpen={setIsAddSampleDialogOpen} 
        />
      </Dialog>
    </>
  );
};

export default EnhancedQuickActions;
