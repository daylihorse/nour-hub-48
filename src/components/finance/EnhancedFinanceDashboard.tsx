
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { DollarSign, TrendingUp, TrendingDown, FileText, Users, AlertTriangle, Building } from "lucide-react";
import { useFinancialAccounts } from "@/hooks/useFinancialAccounts";
import { useInvoices } from "@/hooks/useInvoices";
import { useClients } from "@/hooks/useClients";

const EnhancedFinanceDashboard = () => {
  const { accounts } = useFinancialAccounts();
  const { invoices } = useInvoices();
  const { clients } = useClients();

  // Calculate key metrics
  const totalAssets = accounts
    .filter(acc => acc.account_type === 'asset')
    .reduce((sum, acc) => sum + acc.balance, 0);

  const totalLiabilities = accounts
    .filter(acc => acc.account_type === 'liability')
    .reduce((sum, acc) => sum + acc.balance, 0);

  const totalRevenue = accounts
    .filter(acc => acc.account_type === 'revenue')
    .reduce((sum, acc) => sum + acc.balance, 0);

  const totalExpenses = accounts
    .filter(acc => acc.account_type === 'expense')
    .reduce((sum, acc) => sum + acc.balance, 0);

  const outstandingInvoices = invoices
    .filter(inv => inv.status !== 'paid' && inv.status !== 'cancelled')
    .reduce((sum, inv) => sum + (inv.total_amount - inv.paid_amount), 0);

  const overdueInvoices = invoices.filter(inv => 
    inv.status === 'overdue' || 
    (inv.status !== 'paid' && new Date(inv.due_date) < new Date())
  );

  // Sample data for charts
  const accountTypeData = [
    { type: 'Assets', amount: totalAssets, color: '#8884d8' },
    { type: 'Liabilities', amount: totalLiabilities, color: '#82ca9d' },
    { type: 'Revenue', amount: totalRevenue, color: '#ffc658' },
    { type: 'Expenses', amount: totalExpenses, color: '#ff7300' },
  ];

  const monthlyData = [
    { month: 'Jan', revenue: 45000, expenses: 25000 },
    { month: 'Feb', revenue: 52000, expenses: 28000 },
    { month: 'Mar', revenue: 48000, expenses: 26000 },
    { month: 'Apr', revenue: 61000, expenses: 32000 },
    { month: 'May', revenue: 55000, expenses: 30000 },
    { month: 'Jun', revenue: 67000, expenses: 35000 },
  ];

  const keyMetrics = [
    {
      title: "Total Assets",
      value: `$${totalAssets.toLocaleString()}`,
      change: "+5.2%",
      trend: "up",
      icon: Building,
      color: "text-blue-600"
    },
    {
      title: "Net Income",
      value: `$${(totalRevenue - totalExpenses).toLocaleString()}`,
      change: "+12.5%",
      trend: "up",
      icon: TrendingUp,
      color: "text-green-600"
    },
    {
      title: "Outstanding Invoices",
      value: `$${outstandingInvoices.toLocaleString()}`,
      change: `${overdueInvoices.length} overdue`,
      trend: overdueInvoices.length > 0 ? "down" : "up",
      icon: FileText,
      color: overdueInvoices.length > 0 ? "text-red-600" : "text-blue-600"
    },
    {
      title: "Active Clients",
      value: clients.filter(c => c.status === 'active').length.toString(),
      change: "+3 this month",
      trend: "up",
      icon: Users,
      color: "text-purple-600"
    }
  ];

  const chartConfig = {
    revenue: { color: "#8884d8" },
    expenses: { color: "#82ca9d" },
  };

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {keyMetrics.map((metric) => (
          <Card key={metric.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
              <metric.icon className={`h-4 w-4 ${metric.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <p className={`text-xs ${metric.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                {metric.change} from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue vs Expenses Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Revenue vs Expenses</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <BarChart data={monthlyData}>
                <XAxis dataKey="month" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="revenue" fill="var(--color-revenue)" name="Revenue" />
                <Bar dataKey="expenses" fill="var(--color-expenses)" name="Expenses" />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Account Type Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Account Balance Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{}} className="h-[300px]">
              <PieChart>
                <Pie
                  data={accountTypeData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="amount"
                  label={({ type, amount }) => `${type}: $${amount.toLocaleString()}`}
                >
                  {accountTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <ChartTooltip content={<ChartTooltipContent />} />
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Recent Financial Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Financial Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {invoices.slice(0, 5).map((invoice) => (
                <div key={invoice.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium">Invoice #{invoice.invoice_number}</p>
                    <p className="text-xs text-muted-foreground">
                      Due: {new Date(invoice.due_date).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold">${invoice.total_amount.toLocaleString()}</p>
                    <p className={`text-xs ${
                      invoice.status === 'paid' ? 'text-green-600' : 
                      invoice.status === 'overdue' ? 'text-red-600' : 'text-orange-600'
                    }`}>
                      {invoice.status.toUpperCase()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Financial Alerts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-orange-500" />
              Financial Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {overdueInvoices.length > 0 && (
                <div className="flex items-center gap-3 p-3 bg-red-50 rounded-lg">
                  <FileText className="h-4 w-4 text-red-500" />
                  <div>
                    <p className="text-sm font-medium">Overdue Invoices</p>
                    <p className="text-xs text-muted-foreground">
                      {overdueInvoices.length} invoice(s) overdue
                    </p>
                  </div>
                </div>
              )}
              
              {totalAssets < totalLiabilities && (
                <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg">
                  <TrendingDown className="h-4 w-4 text-orange-500" />
                  <div>
                    <p className="text-sm font-medium">Asset Warning</p>
                    <p className="text-xs text-muted-foreground">
                      Liabilities exceed assets
                    </p>
                  </div>
                </div>
              )}

              {accounts.filter(acc => !acc.is_active).length > 0 && (
                <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg">
                  <Building className="h-4 w-4 text-yellow-500" />
                  <div>
                    <p className="text-sm font-medium">Inactive Accounts</p>
                    <p className="text-xs text-muted-foreground">
                      {accounts.filter(acc => !acc.is_active).length} account(s) inactive
                    </p>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EnhancedFinanceDashboard;
