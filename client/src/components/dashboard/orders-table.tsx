import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn, getStatusColor, formatCurrency, formatDateTime } from "@/lib/utils";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Order, User } from "@shared/schema";
import { userAvatars } from "@/lib/data";

interface OrdersTableProps {
  className?: string;
  limit?: number;
}

// Mocked user data for demonstration since we don't have actual user data
const MockUsers: Record<number, { name: string, email: string, avatar: string }> = {
  1: { name: "Sara Wilson", email: "sara@example.com", avatar: userAvatars[0] },
  2: { name: "Michael Roberts", email: "michael@example.com", avatar: userAvatars[1] },
  3: { name: "Emily Davis", email: "emily@example.com", avatar: userAvatars[2] },
  4: { name: "James Brown", email: "james@example.com", avatar: userAvatars[3] },
  5: { name: "Alex Johnson", email: "alex@example.com", avatar: userAvatars[4] }
};

// Sample product data
const ProductMap: Record<number, string> = {
  1: "Wireless Earbuds",
  2: "Smartwatch",
  3: "Laptop Pro",
  4: "Phone Case",
  5: "Bluetooth Speaker"
};

export function OrdersTable({ className, limit = 4 }: OrdersTableProps) {
  const { data: orders, isLoading, error } = useQuery<Order[]>({
    queryKey: ['/api/orders'],
  });

  const getProductForOrder = (orderId: number) => {
    return ProductMap[orderId % 5 + 1];
  };

  const getUserForOrder = (userId: number) => {
    const user = MockUsers[userId] || MockUsers[(userId % 5) + 1];
    return user;
  };

  return (
    <Card className={cn("table-container", className)}>
      <CardHeader className="px-6 py-4 border-b border-border">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-medium">Recent Orders</CardTitle>
          <Button variant="link" size="sm" asChild>
            <Link href="/orders" className="text-sm font-medium">View All</Link>
          </Button>
        </div>
      </CardHeader>
      <div className="overflow-x-auto">
        <table className="w-full whitespace-nowrap">
          <thead>
            <tr className="bg-muted/50 text-left">
              <th className="px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Order ID</th>
              <th className="px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Customer</th>
              <th className="px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Product</th>
              <th className="px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Amount</th>
              <th className="px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {isLoading ? (
              Array(limit).fill(0).map((_, i) => (
                <tr key={i}>
                  <td colSpan={6} className="px-6 py-4">
                    <div className="h-6 bg-muted animate-pulse rounded"></div>
                  </td>
                </tr>
              ))
            ) : error ? (
              <tr>
                <td colSpan={6} className="px-6 py-4 text-center text-muted-foreground">
                  Failed to load orders
                </td>
              </tr>
            ) : !orders || orders.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-4 text-center text-muted-foreground">
                  No orders found
                </td>
              </tr>
            ) : (
              orders.slice(0, limit).map((order) => {
                const user = getUserForOrder(order.userId || 1);
                const product = getProductForOrder(order.id);
                return (
                  <tr key={order.id} className="hover:bg-muted/50">
                    <td className="px-6 py-4 text-sm">#ORD-{order.id.toString().padStart(4, '0')}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="h-8 w-8 flex-shrink-0">
                          <Avatar>
                            <AvatarImage src={user.avatar} alt={user.name} />
                            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium">{user.name}</div>
                          <div className="text-sm text-muted-foreground">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">{product}</td>
                    <td className="px-6 py-4 text-sm">{formatCurrency(Number(order.total))}</td>
                    <td className="px-6 py-4">
                      <Badge className={cn("font-medium", getStatusColor(order.status))}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">
                      {formatDateTime(order.createdAt)}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
