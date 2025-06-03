
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, CheckCircle, AlertTriangle } from "lucide-react";

const ComplianceAudits = () => {
  const complianceAudits = [
    {
      date: "2024-05-15",
      auditor: "External QA Team",
      type: "Annual Compliance",
      scope: "Full Laboratory",
      score: "98%",
      findings: 2,
      status: "passed"
    },
    {
      date: "2024-03-20",
      auditor: "Internal QA",
      type: "Equipment Validation",
      scope: "Centrifuge Systems",
      score: "100%",
      findings: 0,
      status: "passed"
    },
    {
      date: "2024-01-10",
      auditor: "Regulatory Body",
      type: "Certification Review",
      scope: "Safety Protocols",
      score: "96%",
      findings: 3,
      status: "passed"
    }
  ];

  const getStatusBadge = (status: string) => {
    const statusMap = {
      passed: { variant: "secondary", icon: CheckCircle, color: "green" },
      failed: { variant: "destructive", icon: AlertTriangle, color: "red" },
      warning: { variant: "default", icon: AlertTriangle, color: "yellow" }
    };
    
    const config = statusMap[status as keyof typeof statusMap] || statusMap.passed;
    const Icon = config.icon;
    
    return (
      <Badge variant={config.variant as any} className="flex items-center gap-1">
        <Icon className="h-3 w-3" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-blue-500" />
          Compliance Audits
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {complianceAudits.map((audit, index) => (
            <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <div>
                    <p className="font-medium">{audit.type}</p>
                    <p className="text-sm text-muted-foreground">
                      {audit.date} • {audit.auditor} • {audit.scope}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="font-bold text-lg">{audit.score}</p>
                  <p className="text-sm text-muted-foreground">{audit.findings} findings</p>
                </div>
                {getStatusBadge(audit.status)}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ComplianceAudits;
