
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { storeService } from "@/services/storeService";
import { BarChart3, DollarSign, ShoppingCart, TrendingUp } from "lucide-react";

interface StoreSalesReportProps {
  department: string;
}

const StoreSalesReport = ({ department }: StoreSalesReportProps) => {
  const sales = storeService.getSales(department);
  const stats = storeService.getSalesStats(department);

  const recentSales = sales.slice(-10).reverse();

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats.totalSales.toFixed(2)}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Sales</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats.monthlySales.toFixed(2)}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Transactions</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalTransactions}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Transactions</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.monthlyTransactions}</div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Sales */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Sales</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentSales.map((sale) => (
              <div key={sale.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-medium">Sale #{sale.id.slice(-6)}</span>
                    <Badge variant="outline">{sale.paymentMethod}</Badge>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {sale.items.length} item(s) • {sale.saleDate.toLocaleDateString()}
                  </div>
                  {sale.customerName && (
                    <div className="text-sm text-muted-foreground">
                      Customer: {sale.customerName}
                    </div>
                  )}
                </div>
                <div className="text-right">
                  <div className="font-bold">${sale.total.toFixed(2)}</div>
                  <div className="text-sm text-muted-foreground">
                    {sale.saleDate.toLocaleTimeString()}
                  </div>
                </div>
              </div>
            ))}
            {recentSales.length === 0 && (
              <div className="text-center py-8">
                <ShoppingCart className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">No sales recorded yet.</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StoreSalesReport;
