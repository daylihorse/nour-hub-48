
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Shield,
  FileText,
  AlertTriangle,
  CheckCircle,
  Clock,
  TrendingUp,
  Download,
  Eye
} from "lucide-react";
import OptimizedStatsGrid from "@/components/operations/shared/ui/OptimizedStatsGrid";
import OptimizedMetricCard from "@/components/operations/shared/ui/OptimizedMetricCard";

const ComplianceDashboard = () => {
  const complianceMetrics = {
    overallScore: 85,
    deaCompliance: 92,
    stateCompliance: 88,
    fdaCompliance: 78,
    auditsPassed: 15,
    auditsTotal: 17,
    controlledSubstances: 8,
    violationsCount: 2
  };

  const recentAudits = [
    {
      id: "AUD001",
      type: "DEA Controlled Substances",
      date: "2024-01-10",
      status: "passed",
      score: 95,
      violations: 0,
      recommendations: 2
    },
    {
      id: "AUD002",
      type: "State Pharmacy License",
      date: "2024-01-05",
      status: "passed",
      score: 88,
      violations: 1,
      recommendations: 3
    },
    {
      id: "AUD003",
      type: "FDA Facility Inspection",
      date: "2023-12-20",
      status: "conditional",
      score: 75,
      violations: 2,
      recommendations: 5
    }
  ];

  const upcomingRequirements = [
    {
      id: "REQ001",
      title: "DEA Registration Renewal",
      dueDate: "2024-03-15",
      status: "pending",
      priority: "high",
      daysLeft: 45
    },
    {
      id: "REQ002",
      title: "Controlled Substance Inventory Audit",
      dueDate: "2024-02-28",
      status: "in_progress",
      priority: "medium",
      daysLeft: 28
    },
    {
      id: "REQ003",
      title: "State Pharmacy License Renewal",
      dueDate: "2024-06-30",
      status: "not_started",
      priority: "low",
      daysLeft: 120
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "passed": return "text-green-600";
      case "conditional": return "text-orange-600";
      case "failed": return "text-red-600";
      default: return "text-gray-600";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-red-500";
      case "medium": return "bg-orange-500";
      case "low": return "bg-green-500";
      default: return "bg-gray-500";
    }
  };

  const getComplianceColor = (score: number) => {
    if (score >= 90) return "text-green-600";
    if (score >= 80) return "text-orange-600";
    return "text-red-600";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Shield className="h-6 w-6 text-blue-500" />
            Compliance Dashboard
          </h2>
          <p className="text-muted-foreground">Monitor regulatory compliance and audit status</p>
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

      {/* Compliance Metrics */}
      <OptimizedStatsGrid columns={4}>
        <OptimizedMetricCard
          label="Overall Compliance Score"
          value={`${complianceMetrics.overallScore}%`}
          icon={Shield}
          iconColor={getComplianceColor(complianceMetrics.overallScore)}
        />
        <OptimizedMetricCard
          label="DEA Compliance"
          value={`${complianceMetrics.deaCompliance}%`}
          icon={CheckCircle}
          iconColor={getComplianceColor(complianceMetrics.deaCompliance)}
        />
        <OptimizedMetricCard
          label="State Compliance"
          value={`${complianceMetrics.stateCompliance}%`}
          icon={FileText}
          iconColor={getComplianceColor(complianceMetrics.stateCompliance)}
        />
        <OptimizedMetricCard
          label="FDA Compliance"
          value={`${complianceMetrics.fdaCompliance}%`}
          icon={TrendingUp}
          iconColor={getComplianceColor(complianceMetrics.fdaCompliance)}
        />
      </OptimizedStatsGrid>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Audits */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Recent Audits
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentAudits.map((audit) => (
                <div key={audit.id} className="p-3 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-medium text-sm">{audit.type}</p>
                    <Badge className={getStatusColor(audit.status)} variant="outline">
                      {audit.status}
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Score:</span>
                      <span className={`font-medium ${getComplianceColor(audit.score)}`}>
                        {audit.score}%
                      </span>
                    </div>
                    <Progress value={audit.score} className="h-2" />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Date: {audit.date}</span>
                      <span>
                        {audit.violations} violations, {audit.recommendations} recommendations
                      </span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="w-full mt-2">
                    <Eye className="h-3 w-3 mr-1" />
                    View Details
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Requirements */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Upcoming Requirements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingRequirements.map((req) => (
                <div key={req.id} className="p-3 border rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-medium text-sm">{req.title}</p>
                      <p className="text-xs text-muted-foreground">Due: {req.dueDate}</p>
                    </div>
                    <Badge className={`${getPriorityColor(req.priority)} text-white`}>
                      {req.priority}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="capitalize">
                      {req.status.replace('_', ' ')}
                    </Badge>
                    <span className="text-sm font-medium">
                      {req.daysLeft} days left
                    </span>
                  </div>
                  <Button variant="outline" size="sm" className="w-full mt-2">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Start Process
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Compliance Alerts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-orange-500" />
            Active Compliance Issues
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="p-3 border rounded-lg border-orange-200 bg-orange-50">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="h-4 w-4 text-orange-600" />
                <Badge className="bg-orange-500 text-white">Medium Priority</Badge>
              </div>
              <p className="font-medium text-sm">Controlled Substance Documentation</p>
              <p className="text-sm text-muted-foreground">
                Missing destruction certificates for expired controlled substances
              </p>
              <Button size="sm" className="mt-2">
                Resolve Issue
              </Button>
            </div>

            <div className="p-3 border rounded-lg border-red-200 bg-red-50">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="h-4 w-4 text-red-600" />
                <Badge className="bg-red-500 text-white">High Priority</Badge>
              </div>
              <p className="font-medium text-sm">FDA Facility Registration</p>
              <p className="text-sm text-muted-foreground">
                Annual facility registration expires in 15 days
              </p>
              <Button size="sm" className="mt-2">
                Renew Registration
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ComplianceDashboard;
