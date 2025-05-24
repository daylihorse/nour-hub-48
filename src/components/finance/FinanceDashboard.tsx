
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, PieChart, Pie, Cell, LineChart, Line, ResponsiveContainer } from "recharts";
import { DollarSign, TrendingUp, TrendingDown, ShoppingCart, Package, Users, AlertTriangle } from "lucide-react";

const FinanceDashboard = () => {
  // Sample data for charts
  const monthlyRevenue = [
    { month: "Jan", revenue: 45000, expenses: 25000 },
    { month: "Feb", revenue: 52000, expenses: 28000 },
    { month: "Mar", revenue: 48000, expenses: 26000 },
    { month: "Apr", revenue: 61000, expenses: 32000 },
    { month: "May", revenue: 55000, expenses: 30000 },
    { month: "Jun", revenue: 67000, expenses: 35000 },
  ];

  const expenseBreakdown = [
    { name: "Feed & Supplies", value: 35000, color: "#8884d8" },
    { name: "Veterinary", value: 15000, color: "#82ca9d" },
    { name: "Staff Salaries", value: 25000, color: "#ffc658" },
    { name: "Maintenance", value: 8000, color: "#ff7300" },
    { name: "Other", value: 5000, color: "#0088fe" },
  ];

  const inventoryValue = [
    { category: "Feed Materials", value: 15000 },
    { category: "Medical Supplies", value: 8000 },
    { category: "Equipment", value: 12000 },
    { category: "Services", value: 5000 },
  ];

  const keyMetrics = [
    {
      title: "Total Revenue",
      value: "$67,000",
      change: "+12.5%",
      trend: "up",
      icon: DollarSign,
      color: "text-green-600"
    },
    {
      title: "Total Expenses",
      value: "$35,000",
      change: "+8.2%",
      trend: "up",
      icon: TrendingUp,
      color: "text-red-600"
    },
    {
      title: "Net Profit",
      value: "$32,000",
      change: "+18.3%",
      trend: "up",
      icon: TrendingUp,
      color: "text-green-600"
    },
    {
      title: "Inventory Value",
      value: "$40,000",
      change: "-2.1%",
      trend: "down",
      icon: Package,
      color: "text-blue-600"
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
              <BarChart data={monthlyRevenue}>
                <XAxis dataKey="month" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="revenue" fill="var(--color-revenue)" name="Revenue" />
                <Bar dataKey="expenses" fill="var(--color-expenses)" name="Expenses" />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Expense Breakdown Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Expense Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{}} className="h-[300px]">
              <PieChart>
                <Pie
                  data={expenseBreakdown}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, value }) => `${name}: $${value.toLocaleString()}`}
                >
                  {expenseBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <ChartTooltip content={<ChartTooltipContent />} />
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Inventory Value by Category */}
        <Card>
          <CardHeader>
            <CardTitle>Inventory Value by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{}} className="h-[300px]">
              <BarChart data={inventoryValue}>
                <XAxis dataKey="category" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="value" fill="#8884d8" />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Recent Alerts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-orange-500" />
              Recent Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg">
                <Package className="h-4 w-4 text-orange-500" />
                <div>
                  <p className="text-sm font-medium">Low Stock Alert</p>
                  <p className="text-xs text-muted-foreground">Chia Seeds: Only 2 units remaining</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-red-50 rounded-lg">
                <DollarSign className="h-4 w-4 text-red-500" />
                <div>
                  <p className="text-sm font-medium">Overdue Payment</p>
                  <p className="text-xs text-muted-foreground">Invoice #1234 - $2,500 overdue by 15 days</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                <Users className="h-4 w-4 text-blue-500" />
                <div>
                  <p className="text-sm font-medium">New Customer</p>
                  <p className="text-xs text-muted-foreground">3 new customers registered this week</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FinanceDashboard;
