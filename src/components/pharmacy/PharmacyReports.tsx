
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart3, FileText } from "lucide-react";

const PharmacyReports = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Pharmacy Reports</h2>
        <p className="text-muted-foreground">Generate comprehensive pharmacy and compliance reports</p>
      </div>

      <Card>
        <CardContent className="text-center py-12">
          <BarChart3 className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">Reporting & Analytics</h3>
          <p className="text-muted-foreground mb-4">
            This feature will include inventory reports, sales analytics, compliance reports, and financial summaries.
          </p>
          <div className="flex gap-2 justify-center">
            <Button variant="outline">
              <FileText className="h-4 w-4 mr-2" />
              Sample Report
            </Button>
            <Button variant="outline">
              Configure Reports
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PharmacyReports;
