
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, LineChart, Line } from "recharts";
import { DollarSign, TrendingUp, TrendingDown, Building, CreditCard } from "lucide-react";

const AccountManagement = () => {
  // Sample financial data
  const monthlyData = [
    { month: "Jan", revenue: 45000, expenses: 25000, profit: 20000 },
    { month: "Feb", revenue: 52000, expenses: 28000, profit: 24000 },
    { month: "Mar", revenue: 48000, expenses: 26000, profit: 22000 },
    { month: "Apr", revenue: 61000, expenses: 32000, profit: 29000 },
    { month: "May", revenue: 55000, expenses: 30000, profit: 25000 },
    { month: "Jun", revenue: 67000, expenses: 35000, profit: 32000 },
  ];

  const assets = [
    { name: "Cash & Bank", value: 85000, type: "Current Asset" },
    { name: "Inventory", value: 40000, type: "Current Asset" },
    { name: "Equipment", value: 120000, type: "Fixed Asset" },
    { name: "Property", value: 500000, type: "Fixed Asset" },
  ];

  const liabilities = [
    { name: "Accounts Payable", value: 15000, type: "Current Liability" },
    { name: "Equipment Loan", value: 45000, type: "Long-term Liability" },
    { name: "Mortgage", value: 200000, type: "Long-term Liability" },
  ];

  const totalAssets = assets.reduce((sum, asset) => sum + asset.value, 0);
  const totalLiabilities = liabilities.reduce((sum, liability) => sum + liability.value, 0);
  const equity = totalAssets - totalLiabilities;

  const chartConfig = {
    revenue: { color: "#8884d8" },
    expenses: { color: "#82ca9d" },
    profit: { color: "#ffc658" },
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Account Management</h2>
        <p className="text-muted-foreground">Financial statements, balance sheet, and account analysis</p>
      </div>

      {/* Balance Sheet Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Assets</CardTitle>
            <Building className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalAssets.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Current + Fixed Assets</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Liabilities</CardTitle>
            <CreditCard className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalLiabilities.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Current + Long-term</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Owner's Equity</CardTitle>
            <DollarSign className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${equity.toLocaleString()}</div>
            <p className="text-xs text-green-600">+8.5% from last month</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Profit & Loss Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Profit & Loss Statement</CardTitle>
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

        {/* Profit Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Profit Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <LineChart data={monthlyData}>
                <XAxis dataKey="month" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line 
                  type="monotone" 
                  dataKey="profit" 
                  stroke="var(--color-profit)" 
                  strokeWidth={3}
                  name="Net Profit"
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Assets Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Assets Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {assets.map((asset) => (
                <div key={asset.name} className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">{asset.name}</p>
                    <p className="text-sm text-muted-foreground">{asset.type}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">${asset.value.toLocaleString()}</p>
                    <p className="text-sm text-muted-foreground">
                      {((asset.value / totalAssets) * 100).toFixed(1)}%
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Liabilities Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Liabilities Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {liabilities.map((liability) => (
                <div key={liability.name} className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">{liability.name}</p>
                    <p className="text-sm text-muted-foreground">{liability.type}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">${liability.value.toLocaleString()}</p>
                    <p className="text-sm text-muted-foreground">
                      {((liability.value / totalLiabilities) * 100).toFixed(1)}%
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AccountManagement;
