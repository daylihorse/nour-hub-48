
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Shield,
  Search,
  AlertTriangle,
  FileText,
  Clock,
  CheckCircle,
  Download,
  Eye
} from "lucide-react";

const DEATracking = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const controlledSubstances = [
    {
      id: "CS001",
      name: "Morphine Sulfate",
      schedule: "II",
      deaNumber: "BM1234567",
      currentStock: 50,
      initialInventory: 100,
      dispensed: 35,
      returned: 5,
      destroyed: 10,
      lastAudit: "2024-01-10",
      status: "compliant",
      alerts: []
    },
    {
      id: "CS002", 
      name: "Tramadol",
      schedule: "IV",
      deaNumber: "BT7891234",
      currentStock: 25,
      initialInventory: 75,
      dispensed: 40,
      returned: 2,
      destroyed: 12,
      lastAudit: "2024-01-05",
      status: "discrepancy",
      alerts: ["Inventory mismatch detected"]
    },
    {
      id: "CS003",
      name: "Ketamine",
      schedule: "III", 
      deaNumber: "BK5556789",
      currentStock: 15,
      initialInventory: 30,
      dispensed: 12,
      returned: 0,
      destroyed: 3,
      lastAudit: "2024-01-12",
      status: "audit_due",
      alerts: ["Audit overdue"]
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "compliant": return "bg-green-500";
      case "discrepancy": return "bg-red-500";
      case "audit_due": return "bg-orange-500";
      default: return "bg-gray-500";
    }
  };

  const getScheduleColor = (schedule: string) => {
    switch (schedule) {
      case "I": return "text-red-600";
      case "II": return "text-orange-600";
      case "III": return "text-yellow-600";
      case "IV": return "text-blue-600";
      case "V": return "text-green-600";
      default: return "text-gray-600";
    }
  };

  const filteredSubstances = controlledSubstances.filter(substance => {
    const matchesSearch = substance.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         substance.deaNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || substance.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Shield className="h-6 w-6 text-red-500" />
            DEA Controlled Substances Tracking
          </h2>
          <p className="text-muted-foreground">Monitor and audit controlled substance inventory</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
          <Button>
            <FileText className="h-4 w-4 mr-2" />
            Generate Audit
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex gap-4 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search controlled substances..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Compliance Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="compliant">Compliant</SelectItem>
                <SelectItem value="discrepancy">Discrepancy</SelectItem>
                <SelectItem value="audit_due">Audit Due</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Controlled Substances List */}
      <div className="space-y-4">
        {filteredSubstances.map((substance) => (
          <Card key={substance.id} className="border-l-4 border-l-red-500">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg flex items-center gap-2">
                    {substance.name}
                    <Badge className={`${getScheduleColor(substance.schedule)} border-current`} variant="outline">
                      Schedule {substance.schedule}
                    </Badge>
                  </CardTitle>
                  <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                    <span>DEA #: {substance.deaNumber}</span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      Last Audit: {substance.lastAudit}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <Badge className={`${getStatusColor(substance.status)} text-white mb-2`}>
                    {substance.status.replace('_', ' ')}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Inventory Tracking */}
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                  <div className="text-center p-3 bg-muted rounded-lg">
                    <div className="text-lg font-bold text-blue-600">{substance.currentStock}</div>
                    <p className="text-xs text-muted-foreground">Current Stock</p>
                  </div>
                  <div className="text-center p-3 bg-muted rounded-lg">
                    <div className="text-lg font-bold text-green-600">{substance.initialInventory}</div>
                    <p className="text-xs text-muted-foreground">Initial Inventory</p>
                  </div>
                  <div className="text-center p-3 bg-muted rounded-lg">
                    <div className="text-lg font-bold text-orange-600">{substance.dispensed}</div>
                    <p className="text-xs text-muted-foreground">Dispensed</p>
                  </div>
                  <div className="text-center p-3 bg-muted rounded-lg">
                    <div className="text-lg font-bold text-purple-600">{substance.returned}</div>
                    <p className="text-xs text-muted-foreground">Returned</p>
                  </div>
                  <div className="text-center p-3 bg-muted rounded-lg">
                    <div className="text-lg font-bold text-red-600">{substance.destroyed}</div>
                    <p className="text-xs text-muted-foreground">Destroyed</p>
                  </div>
                </div>

                {/* Alerts */}
                {substance.alerts.length > 0 && (
                  <div>
                    <p className="text-sm font-medium mb-2 flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-red-500" />
                      Compliance Alerts
                    </p>
                    <div className="space-y-1">
                      {substance.alerts.map((alert, index) => (
                        <Badge key={index} variant="outline" className="mr-2 text-red-700 border-red-300">
                          {alert}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex gap-2 pt-2">
                  <Button variant="outline" size="sm">
                    <Eye className="h-3 w-3 mr-1" />
                    View Audit Trail
                  </Button>
                  <Button variant="outline" size="sm">
                    <FileText className="h-3 w-3 mr-1" />
                    Transaction Log
                  </Button>
                  {substance.status === "audit_due" && (
                    <Button size="sm">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Conduct Audit
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredSubstances.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <Shield className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No controlled substances found matching your filters.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default DEATracking;
