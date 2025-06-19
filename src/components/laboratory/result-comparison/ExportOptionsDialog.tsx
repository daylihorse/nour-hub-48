
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  FileText, 
  Download, 
  Mail, 
  Printer, 
  FileSpreadsheet, 
  Image, 
  Calendar,
  Users,
  CheckCircle,
  Clock
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ExportOptionsDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const ExportOptionsDialog = ({ isOpen, onClose }: ExportOptionsDialogProps) => {
  const { toast } = useToast();
  const [selectedFormat, setSelectedFormat] = useState("pdf");
  const [selectedTimeRange, setSelectedTimeRange] = useState("6months");
  const [selectedHorses, setSelectedHorses] = useState<string[]>([]);
  const [includeCharts, setIncludeCharts] = useState(true);
  const [includeTrends, setIncludeTrends] = useState(true);
  const [includeRecommendations, setIncludeRecommendations] = useState(true);
  const [reportTitle, setReportTitle] = useState("");
  const [reportNotes, setReportNotes] = useState("");
  const [emailRecipients, setEmailRecipients] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  // Mock data for horses
  const availableHorses = [
    { id: "H001", name: "Thunder", testCount: 24 },
    { id: "H002", name: "Bella", testCount: 18 },
    { id: "H003", name: "Shadow", testCount: 31 },
    { id: "H004", name: "Lightning", testCount: 15 },
    { id: "H005", name: "Grace", testCount: 22 },
  ];

  const exportFormats = [
    { 
      value: "pdf", 
      label: "PDF Report", 
      icon: FileText, 
      description: "Comprehensive formatted report with charts and analysis",
      color: "bg-red-100 text-red-600"
    },
    { 
      value: "excel", 
      label: "Excel Spreadsheet", 
      icon: FileSpreadsheet, 
      description: "Raw data with formulas and pivot tables for analysis",
      color: "bg-green-100 text-green-600"
    },
    { 
      value: "csv", 
      label: "CSV Data", 
      icon: FileText, 
      description: "Raw data export for external analysis tools",
      color: "bg-blue-100 text-blue-600"
    },
    { 
      value: "images", 
      label: "Chart Images", 
      icon: Image, 
      description: "High-resolution charts and graphs as PNG/SVG files",
      color: "bg-purple-100 text-purple-600"
    }
  ];

  const handleHorseToggle = (horseId: string) => {
    setSelectedHorses(prev => 
      prev.includes(horseId) 
        ? prev.filter(id => id !== horseId)
        : [...prev, horseId]
    );
  };

  const handleSelectAllHorses = () => {
    setSelectedHorses(selectedHorses.length === availableHorses.length ? [] : availableHorses.map(h => h.id));
  };

  const handleGenerateReport = async () => {
    if (selectedHorses.length === 0) {
      toast({
        title: "No Horses Selected",
        description: "Please select at least one horse to generate a report.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    
    // Simulate report generation
    setTimeout(() => {
      setIsGenerating(false);
      toast({
        title: "Report Generated Successfully",
        description: `${selectedFormat.toUpperCase()} report for ${selectedHorses.length} horse(s) has been generated and downloaded.`,
      });
      onClose();
    }, 3000);
  };

  const handleEmailReport = () => {
    if (!emailRecipients.trim()) {
      toast({
        title: "No Recipients",
        description: "Please enter email recipients to send the report.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Report Scheduled for Email",
      description: "The report will be generated and sent to the specified recipients.",
    });
  };

  const handlePrintReport = () => {
    toast({
      title: "Print Job Queued",
      description: "The report has been sent to your default printer.",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Download className="h-5 w-5 text-purple-600" />
            Export Options & Report Generation
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Export Format Selection */}
          <Card>
            <CardHeader>
              <CardTitle>Export Format</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {exportFormats.map((format) => {
                  const Icon = format.icon;
                  return (
                    <div
                      key={format.value}
                      className={`p-4 border rounded-lg cursor-pointer transition-all ${
                        selectedFormat === format.value 
                          ? "border-purple-500 bg-purple-50" 
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                      onClick={() => setSelectedFormat(format.value)}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${format.color}`}>
                          <Icon className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold">{format.label}</h4>
                          <p className="text-sm text-muted-foreground">{format.description}</p>
                        </div>
                        {selectedFormat === format.value && (
                          <CheckCircle className="h-5 w-5 text-purple-600" />
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Horse Selection */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Select Horses</CardTitle>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={handleSelectAllHorses}
                  >
                    {selectedHorses.length === availableHorses.length ? "Deselect All" : "Select All"}
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {availableHorses.map((horse) => (
                    <div key={horse.id} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Checkbox
                          checked={selectedHorses.includes(horse.id)}
                          onCheckedChange={() => handleHorseToggle(horse.id)}
                        />
                        <div>
                          <p className="font-medium">{horse.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {horse.testCount} test results
                          </p>
                        </div>
                      </div>
                      <Badge variant="outline">{horse.testCount}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Report Options */}
            <Card>
              <CardHeader>
                <CardTitle>Report Options</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="timeRange">Time Range</Label>
                    <Select value={selectedTimeRange} onValueChange={setSelectedTimeRange}>
                      <SelectTrigger>
                        <Calendar className="h-4 w-4 mr-2" />
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1month">Last Month</SelectItem>
                        <SelectItem value="3months">Last 3 Months</SelectItem>
                        <SelectItem value="6months">Last 6 Months</SelectItem>
                        <SelectItem value="1year">Last Year</SelectItem>
                        <SelectItem value="all">All Time</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        checked={includeCharts}
                        onCheckedChange={(checked) => setIncludeCharts(checked === true)}
                      />
                      <Label>Include Charts and Graphs</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        checked={includeTrends}
                        onCheckedChange={(checked) => setIncludeTrends(checked === true)}
                      />
                      <Label>Include Trend Analysis</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        checked={includeRecommendations}
                        onCheckedChange={(checked) => setIncludeRecommendations(checked === true)}
                      />
                      <Label>Include Recommendations</Label>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Report Customization */}
          <Card>
            <CardHeader>
              <CardTitle>Report Customization</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="reportTitle">Report Title</Label>
                  <Input
                    id="reportTitle"
                    placeholder="Laboratory Analysis Report"
                    value={reportTitle}
                    onChange={(e) => setReportTitle(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="emailRecipients">Email Recipients (optional)</Label>
                  <Input
                    id="emailRecipients"
                    placeholder="email1@example.com, email2@example.com"
                    value={emailRecipients}
                    onChange={(e) => setEmailRecipients(e.target.value)}
                  />
                </div>
              </div>
              <div className="mt-4">
                <Label htmlFor="reportNotes">Additional Notes</Label>
                <Textarea
                  id="reportNotes"
                  placeholder="Add any special notes or observations to include in the report..."
                  value={reportNotes}
                  onChange={(e) => setReportNotes(e.target.value)}
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Export Templates</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button variant="outline" className="h-auto p-4">
                  <div className="text-center">
                    <FileText className="h-6 w-6 mx-auto mb-2 text-blue-600" />
                    <p className="font-medium">Weekly Summary</p>
                    <p className="text-xs text-muted-foreground">Last 7 days, all horses</p>
                  </div>
                </Button>
                <Button variant="outline" className="h-auto p-4">
                  <div className="text-center">
                    <Users className="h-6 w-6 mx-auto mb-2 text-green-600" />
                    <p className="font-medium">Monthly Report</p>
                    <p className="text-xs text-muted-foreground">Complete analysis package</p>
                  </div>
                </Button>
                <Button variant="outline" className="h-auto p-4">
                  <div className="text-center">
                    <Clock className="h-6 w-6 mx-auto mb-2 text-purple-600" />
                    <p className="font-medium">Trending Issues</p>
                    <p className="text-xs text-muted-foreground">Abnormal results only</p>
                  </div>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="outline" onClick={handlePrintReport}>
              <Printer className="h-4 w-4 mr-2" />
              Print
            </Button>
            <Button variant="outline" onClick={handleEmailReport}>
              <Mail className="h-4 w-4 mr-2" />
              Email
            </Button>
            <Button 
              onClick={handleGenerateReport}
              disabled={isGenerating}
              className="bg-purple-600 hover:bg-purple-700"
            >
              {isGenerating ? (
                <>
                  <Clock className="h-4 w-4 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Download className="h-4 w-4 mr-2" />
                  Generate Report
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ExportOptionsDialog;
