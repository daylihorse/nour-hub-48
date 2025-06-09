
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";
import { PurchaseOrder } from "@/types/operations";
import { getOrderStatusColor } from "@/utils/operationsUtils";
import StatusBadge from "../../shared/ui/StatusBadge";

interface PurchaseOrdersTableProps {
  orders: PurchaseOrder[];
}

const PurchaseOrdersTable = ({ orders }: PurchaseOrdersTableProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Order ID</TableHead>
          <TableHead>Supplier</TableHead>
          <TableHead>Items</TableHead>
          <TableHead>Total Amount</TableHead>
          <TableHead>Order Date</TableHead>
          <TableHead>Expected Delivery</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.map((order) => (
          <TableRow key={order.id}>
            <TableCell className="font-medium">{order.id}</TableCell>
            <TableCell>{order.supplierName}</TableCell>
            <TableCell>{order.items.length} item(s)</TableCell>
            <TableCell>${order.totalAmount.toFixed(2)}</TableCell>
            <TableCell>{order.orderDate.toLocaleDateString()}</TableCell>
            <TableCell>
              {order.expectedDelivery?.toLocaleDateString() || 'TBD'}
            </TableCell>
            <TableCell>
              <StatusBadge 
                status={order.status}
                className={getOrderStatusColor(order.status)}
              />
            </TableCell>
            <TableCell>
              <div className="flex gap-1">
                <Button size="sm" variant="outline">
                  <FileText className="w-3 h-3" />
                </Button>
                {order.status === 'delivered' && (
                  <Button size="sm" variant="outline">
                    Mark Paid
                  </Button>
                )}
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default PurchaseOrdersTable;
