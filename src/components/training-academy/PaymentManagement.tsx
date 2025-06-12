
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DollarSign, CreditCard, Calendar, TrendingUp, AlertCircle, CheckCircle } from "lucide-react";

const PaymentManagement = () => {
  const payments = [
    {
      id: "PAY001",
      studentName: "Alice Cooper",
      lessonType: "Private Lesson",
      amount: 85,
      date: "2024-01-15",
      method: "Credit Card",
      status: "completed",
      invoiceId: "INV-001"
    },
    {
      id: "PAY002",
      studentName: "John Smith",
      lessonType: "Group Lesson Package (4 lessons)",
      amount: 160,
      date: "2024-01-14",
      method: "Bank Transfer",
      status: "pending",
      invoiceId: "INV-002"
    },
    {
      id: "PAY003",
      studentName: "Mary Johnson",
      lessonType: "Trial Lesson",
      amount: 60,
      date: "2024-01-14",
      method: "Cash",
      status: "completed",
      invoiceId: "INV-003"
    },
    {
      id: "PAY004",
      studentName: "David Brown",
      lessonType: "Advanced Training (Monthly)",
      amount: 480,
      date: "2024-01-13",
      method: "Credit Card",
      status: "failed",
      invoiceId: "INV-004"
    }
  ];

  const monthlyStats = {
    totalRevenue: 5240,
    completedPayments: 18,
    pendingPayments: 3,
    failedPayments: 1,
    averageAmount: 78
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-100 text-green-800">Completed</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      case 'failed':
        return <Badge className="bg-red-100 text-red-800">Failed</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case 'failed':
        return <AlertCircle className="h-4 w-4 text-red-600" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Payment Management</h2>
        <p className="text-muted-foreground">
          Track payments, invoices, and financial transactions for lessons
        </p>
      </div>

      {/* Monthly Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-green-500" />
              <div>
                <p className="text-xs text-muted-foreground">Total Revenue</p>
                <p className="text-lg font-bold">${monthlyStats.totalRevenue.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <div>
                <p className="text-xs text-muted-foreground">Completed</p>
                <p className="text-lg font-bold">{monthlyStats.completedPayments}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-yellow-500" />
              <div>
                <p className="text-xs text-muted-foreground">Pending</p>
                <p className="text-lg font-bold">{monthlyStats.pendingPayments}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-red-500" />
              <div>
                <p className="text-xs text-muted-foreground">Failed</p>
                <p className="text-lg font-bold">{monthlyStats.failedPayments}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-blue-500" />
              <div>
                <p className="text-xs text-muted-foreground">Avg Amount</p>
                <p className="text-lg font-bold">${monthlyStats.averageAmount}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Payments */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Recent Payments
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {payments.map((payment) => (
              <div key={payment.id} className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="font-semibold">{payment.studentName}</h4>
                      {getStatusBadge(payment.status)}
                      <Badge variant="outline">{payment.id}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-1">
                      {payment.lessonType}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {payment.date}
                      </div>
                      <div className="flex items-center gap-1">
                        <CreditCard className="h-3 w-3" />
                        {payment.method}
                      </div>
                      <div className="flex items-center gap-1">
                        {getStatusIcon(payment.status)}
                        Invoice: {payment.invoiceId}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-green-600">${payment.amount}</p>
                    <div className="flex gap-2 mt-2">
                      <Button size="sm" variant="outline">
                        View Invoice
                      </Button>
                      {payment.status === 'failed' && (
                        <Button size="sm">
                          Retry Payment
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button className="h-20 flex flex-col gap-2">
              <DollarSign className="h-6 w-6" />
              <span>Generate Invoice</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col gap-2">
              <CreditCard className="h-6 w-6" />
              <span>Process Payment</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col gap-2">
              <Calendar className="h-6 w-6" />
              <span>Payment Schedule</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col gap-2">
              <TrendingUp className="h-6 w-6" />
              <span>Financial Reports</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentManagement;
