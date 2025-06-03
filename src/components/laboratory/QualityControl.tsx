
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, BarChart, Bar, ResponsiveContainer } from "recharts";
import { TrendingUp, Target, AlertTriangle, CheckCircle, Award, FileText } from "lucide-react";

const QualityControl = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("month");

  // Mock quality metrics data
  const qualityTrends = [
    { month: "Jan", accuracy: 98.5, precision: 97.2, turnaround: 22.5, contamination: 1.2 },
    { month: "Feb", accuracy: 98.8, precision: 97.8, turnaround: 21.8, contamination: 0.9 },
    { month: "Mar", accuracy: 99.1, precision: 98.1, turnaround: 20.5, contamination: 0.8 },
    { month: "Apr", accuracy: 98.7, precision: 97.9, turnaround: 21.2, contamination: 1.1 },
    { month: "May", accuracy: 99.2, precision: 98.5, turnaround: 19.8, contamination: 0.7 },
    { month: "Jun", accuracy: 99.0, precision: 98.3, turnaround: 20.1, contamination: 0.8 },
  ];

  const qualityChecks = [
    {
      id: "QC001",
      date: "2024-06-01",
      checkType: "Accuracy Control",
      parameter: "Blood Glucose",
      expectedValue: "100 mg/dL",
      measuredValue: "99.2 mg/dL",
      variance: "0.8%",
      status: "passed",
      technician: "Lab Tech A"
    },
    {
      id: "QC002",
      date: "2024-06-02",
      checkType: "Precision Control",
      parameter: "Hemoglobin",
      expectedValue: "15.0 g/dL",
      measuredValue: "15.3 g/dL",
      variance: "2.0%",
      status: "passed",
      technician: "Lab Tech B"
    },
    {
      id: "QC003",
      date: "2024-06-03",
      checkType: "Contamination Check",
      parameter: "Sample Integrity",
      expectedValue: "Negative",
      measuredValue: "Trace Positive",
      variance: "N/A",
      status: "failed",
      technician: "Lab Tech C"
    }
  ];

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

  const chartConfig = {
    accuracy: { color: "#82ca9d" },
    precision: { color: "#8884d8" },
    turnaround: { color: "#ffc658" },
    contamination: { color: "#ff7300" },
  };

  return (
    <div className="space-y-6">
      {/* Quality Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Target className="h-4 w-4 text-green-500" />
              <div>
                <p className="text-sm text-muted-foreground">Overall Accuracy</p>
                <p className="text-2xl font-bold">99.0%</p>
                <p className="text-xs text-green-600">+0.3% from last month</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-blue-500" />
              <div>
                <p className="text-sm text-muted-foreground">Precision Rate</p>
                <p className="text-2xl font-bold">98.3%</p>
                <p className="text-xs text-blue-600">+0.2% from last month</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Award className="h-4 w-4 text-purple-500" />
              <div>
                <p className="text-sm text-muted-foreground">Compliance Score</p>
                <p className="text-2xl font-bold">98%</p>
                <p className="text-xs text-purple-600">Last audit result</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-orange-500" />
              <div>
                <p className="text-sm text-muted-foreground">Failed Checks</p>
                <p className="text-2xl font-bold">2</p>
                <p className="text-xs text-orange-600">This month</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quality Trends Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Quality Metrics Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <LineChart data={qualityTrends}>
                <XAxis dataKey="month" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line dataKey="accuracy" stroke="var(--color-accuracy)" name="Accuracy %" strokeWidth={2} />
                <Line dataKey="precision" stroke="var(--color-precision)" name="Precision %" strokeWidth={2} />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Performance Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <BarChart data={qualityTrends}>
                <XAxis dataKey="month" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="turnaround" fill="var(--color-turnaround)" name="Avg Turnaround (hrs)" />
                <Bar dataKey="contamination" fill="var(--color-contamination)" name="Contamination %" />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Quality Control Checks */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-500" />
            Recent Quality Control Checks
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>QC ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Check Type</TableHead>
                <TableHead>Parameter</TableHead>
                <TableHead>Expected</TableHead>
                <TableHead>Measured</TableHead>
                <TableHead>Variance</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Technician</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {qualityChecks.map((check) => (
                <TableRow key={check.id}>
                  <TableCell className="font-medium">{check.id}</TableCell>
                  <TableCell>{check.date}</TableCell>
                  <TableCell>{check.checkType}</TableCell>
                  <TableCell>{check.parameter}</TableCell>
                  <TableCell>{check.expectedValue}</TableCell>
                  <TableCell>{check.measuredValue}</TableCell>
                  <TableCell>{check.variance}</TableCell>
                  <TableCell>{getStatusBadge(check.status)}</TableCell>
                  <TableCell>{check.technician}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Compliance Audits */}
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

      {/* Action Items */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-orange-500" />
            Quality Action Items
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
              <div>
                <p className="font-medium">Address Contamination Issue</p>
                <p className="text-sm text-muted-foreground">Failed QC check QC003 requires immediate attention</p>
              </div>
              <div className="flex gap-2">
                <Badge variant="destructive">High Priority</Badge>
                <Button size="sm">Assign</Button>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
              <div>
                <p className="font-medium">Equipment Calibration Review</p>
                <p className="text-sm text-muted-foreground">Precision variance trending upward - review needed</p>
              </div>
              <div className="flex gap-2">
                <Badge variant="default">Medium Priority</Badge>
                <Button size="sm">Schedule</Button>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <div>
                <p className="font-medium">Update SOPs</p>
                <p className="text-sm text-muted-foreground">Annual review of standard operating procedures due</p>
              </div>
              <div className="flex gap-2">
                <Badge variant="outline">Low Priority</Badge>
                <Button size="sm">Plan</Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QualityControl;
