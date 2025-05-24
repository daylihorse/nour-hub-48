
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, FileText, PieChart, BarChart3 } from "lucide-react";

const FinancialReports = () => {
  const reports = [
    {
      title: "Sales Report",
      description: "Detailed sales analysis with customer breakdown",
      icon: BarChart3,
      color: "text-blue-600"
    },
    {
      title: "Purchase Report",
      description: "Purchase analysis and supplier performance",
      icon: FileText,
      color: "text-green-600"
    },
    {
      title: "Profit & Loss",
      description: "Monthly P&L statement with comparisons",
      icon: PieChart,
      color: "text-purple-600"
    },
    {
      title: "Inventory Report",
      description: "Stock levels, turnover, and valuation",
      icon: BarChart3,
      color: "text-orange-600"
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Financial Reports</h2>
        <p className="text-muted-foreground">Generate and download detailed financial reports</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {reports.map((report) => (
          <Card key={report.title}>
            <CardHeader>
              <div className="flex items-center gap-3">
                <report.icon className={`h-6 w-6 ${report.color}`} />
                <div>
                  <CardTitle className="text-lg">{report.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">{report.description}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <FileText className="h-4 w-4 mr-2" />
                  View
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Download PDF
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export Excel
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default FinancialReports;
