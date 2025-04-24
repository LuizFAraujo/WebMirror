import { useState } from "react";
import { MainLayout } from "@/components/layout/main-layout";
import { Breadcrumbs } from "@/components/ui/breadcrumb";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Order, OrderItem } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from "@/components/ui/pagination";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { 
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { 
  MoreHorizontal, 
  Search, 
  Eye, 
  Edit,
  FileText,
  Truck,
  XCircle,
  CheckCircle
} from "lucide-react";
import { cn, getStatusColor, formatCurrency, formatDateTime } from "@/lib/utils";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { userAvatars } from "@/lib/data";

// Mocked user data for demonstration
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

export default function OrdersPage() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isStatusDialogOpen, setIsStatusDialogOpen] = useState(false);
  const pageSize = 10;

  const { data: orders, isLoading } = useQuery<Order[]>({
    queryKey: ['/api/orders'],
  });

  const { isLoading: isLoadingItems } = useQuery<OrderItem[]>({
    queryKey: ['/api/orders', selectedOrder?.id, 'items'],
    enabled: !!selectedOrder,
    onSuccess: (data) => {
      setOrderItems(data);
    }
  });

  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: number, status: string }) => {
      const res = await apiRequest("PATCH", `/api/orders/${id}/status`, { status });
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/orders'] });
      setIsStatusDialogOpen(false);
      toast({
        title: "Order updated",
        description: "The order status has been updated successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to update order status: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  // Filter orders based on search query and status
  const filteredOrders = orders?.filter(order => {
    const matchesSearch = 
      `#ORD-${order.id.toString().padStart(4, '0')}`.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || order.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  }) || [];

  // Paginate orders
  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  // Calculate total pages
  const totalPages = Math.ceil(filteredOrders.length / pageSize);

  // Generate page numbers array
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const handleViewOrderDetails = (order: Order) => {
    setSelectedOrder(order);
    setIsDetailsOpen(true);
  };

  const handleStatusUpdate = (order: Order) => {
    setSelectedOrder(order);
    setIsStatusDialogOpen(true);
  };

  const getProductForOrderItem = (productId: number) => {
    return ProductMap[productId % 5 + 1];
  };

  const getUserForOrder = (userId: number) => {
    const user = MockUsers[userId] || MockUsers[(userId % 5) + 1];
    return user;
  };

  return (
    <MainLayout>
      <div className="mb-6">
        <Breadcrumbs 
          segments={[
            { name: "Home", href: "/" },
            { name: "Orders" }
          ]}
        />
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <h1 className="text-2xl font-bold mb-4 sm:mb-0">Orders</h1>
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <div className="relative w-full sm:w-auto">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search order ID..."
              className="pl-8 w-full sm:w-[200px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select 
            value={statusFilter} 
            onValueChange={setStatusFilter}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="processing">Processing</SelectItem>
              <SelectItem value="shipped">Shipped</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>All Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                Array(pageSize).fill(0).map((_, i) => (
                  <TableRow key={i}>
                    <TableCell colSpan={6}>
                      <div className="h-10 bg-muted animate-pulse rounded"></div>
                    </TableCell>
                  </TableRow>
                ))
              ) : paginatedOrders.length > 0 ? (
                paginatedOrders.map((order) => {
                  const user = getUserForOrder(order.userId || 1);
                  return (
                    <TableRow key={order.id} className="hover:bg-muted/50">
                      <TableCell className="font-medium">
                        #{order.id.toString().padStart(4, '0')}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={user.avatar} alt={user.name} />
                            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-medium">{user.name}</p>
                            <p className="text-xs text-muted-foreground">{user.email}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{formatDateTime(order.createdAt)}</TableCell>
                      <TableCell>{formatCurrency(Number(order.total))}</TableCell>
                      <TableCell>
                        <Badge className={cn("font-medium", getStatusColor(order.status))}>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Open menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => handleViewOrderDetails(order)}>
                              <Eye className="h-4 w-4 mr-2" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleStatusUpdate(order)}>
                              <Edit className="h-4 w-4 mr-2" />
                              Update Status
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem asChild>
                              <a href="#" className="flex items-center">
                                <FileText className="h-4 w-4 mr-2" />
                                Generate Invoice
                              </a>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    No orders found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>

          {filteredOrders.length > pageSize && (
            <Pagination className="mt-4">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious 
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
                
                {pageNumbers.map(number => (
                  <PaginationItem key={number}>
                    <PaginationLink
                      isActive={currentPage === number}
                      onClick={() => setCurrentPage(number)}
                    >
                      {number}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                
                <PaginationItem>
                  <PaginationNext 
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </CardContent>
      </Card>

      {/* Status Update Dialog */}
      <Dialog open={isStatusDialogOpen} onOpenChange={setIsStatusDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Update Order Status</DialogTitle>
            <DialogDescription>
              Change the status for order #{selectedOrder?.id.toString().padStart(4, '0')}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Select Status</h3>
              <div className="grid grid-cols-1 gap-2">
                <Button 
                  variant="outline" 
                  className={cn(
                    "justify-start",
                    selectedOrder?.status === "pending" && "border-primary"
                  )}
                  onClick={() => updateStatusMutation.mutate({ 
                    id: selectedOrder?.id || 0, 
                    status: "pending" 
                  })}
                >
                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-orange-500 mr-2"></div>
                    <span>Pending</span>
                  </div>
                </Button>
                <Button 
                  variant="outline" 
                  className={cn(
                    "justify-start",
                    selectedOrder?.status === "processing" && "border-primary"
                  )}
                  onClick={() => updateStatusMutation.mutate({ 
                    id: selectedOrder?.id || 0, 
                    status: "processing" 
                  })}
                >
                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-yellow-500 mr-2"></div>
                    <span>Processing</span>
                  </div>
                </Button>
                <Button 
                  variant="outline" 
                  className={cn(
                    "justify-start",
                    selectedOrder?.status === "shipped" && "border-primary"
                  )}
                  onClick={() => updateStatusMutation.mutate({ 
                    id: selectedOrder?.id || 0, 
                    status: "shipped" 
                  })}
                >
                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                    <span>Shipped</span>
                  </div>
                </Button>
                <Button 
                  variant="outline" 
                  className={cn(
                    "justify-start",
                    selectedOrder?.status === "completed" && "border-primary"
                  )}
                  onClick={() => updateStatusMutation.mutate({ 
                    id: selectedOrder?.id || 0, 
                    status: "completed" 
                  })}
                >
                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                    <span>Completed</span>
                  </div>
                </Button>
                <Button 
                  variant="outline" 
                  className={cn(
                    "justify-start",
                    selectedOrder?.status === "cancelled" && "border-primary"
                  )}
                  onClick={() => updateStatusMutation.mutate({ 
                    id: selectedOrder?.id || 0, 
                    status: "cancelled" 
                  })}
                >
                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-red-500 mr-2"></div>
                    <span>Cancelled</span>
                  </div>
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Order Details Slide-over */}
      <Sheet open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <SheetContent className="sm:max-w-xl w-full">
          <SheetHeader>
            <SheetTitle>Order Details</SheetTitle>
            <SheetDescription>
              Details for order #{selectedOrder?.id.toString().padStart(4, '0')}
            </SheetDescription>
          </SheetHeader>
          <div className="mt-6 space-y-6">
            {selectedOrder && (
              <>
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-medium">
                      Order #{selectedOrder.id.toString().padStart(4, '0')}
                    </h3>
                    <p className="text-sm text-muted-foreground">{formatDateTime(selectedOrder.createdAt)}</p>
                  </div>
                  <Badge className={cn("font-medium", getStatusColor(selectedOrder.status))}>
                    {selectedOrder.status.charAt(0).toUpperCase() + selectedOrder.status.slice(1)}
                  </Badge>
                </div>

                <div className="border-t border-border pt-4">
                  <h4 className="font-medium mb-2">Customer Information</h4>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={getUserForOrder(selectedOrder.userId || 1).avatar} />
                      <AvatarFallback>{getUserForOrder(selectedOrder.userId || 1).name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{getUserForOrder(selectedOrder.userId || 1).name}</p>
                      <p className="text-sm text-muted-foreground">{getUserForOrder(selectedOrder.userId || 1).email}</p>
                    </div>
                  </div>
                </div>

                <div className="border-t border-border pt-4">
                  <h4 className="font-medium mb-2">Order Items</h4>
                  {isLoadingItems ? (
                    <div className="space-y-2">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="h-12 bg-muted animate-pulse rounded"></div>
                      ))}
                    </div>
                  ) : orderItems.length > 0 ? (
                    <div className="space-y-3">
                      {orderItems.map((item) => (
                        <div key={item.id} className="flex justify-between items-center">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-muted rounded flex items-center justify-center">
                              <FileText className="h-5 w-5 text-muted-foreground" />
                            </div>
                            <div>
                              <p className="font-medium">{getProductForOrderItem(item.productId)}</p>
                              <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                            </div>
                          </div>
                          <p className="font-medium">{formatCurrency(Number(item.price) * item.quantity)}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground">No items found for this order</p>
                  )}
                </div>

                <div className="border-t border-border pt-4">
                  <h4 className="font-medium mb-2">Order Summary</h4>
                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <p className="text-muted-foreground">Subtotal</p>
                      <p>{formatCurrency(Number(selectedOrder.total) * 0.85)}</p>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-muted-foreground">Tax</p>
                      <p>{formatCurrency(Number(selectedOrder.total) * 0.15)}</p>
                    </div>
                    <div className="flex justify-between font-medium pt-2 border-t border-border">
                      <p>Total</p>
                      <p>{formatCurrency(Number(selectedOrder.total))}</p>
                    </div>
                  </div>
                </div>

                <div className="border-t border-border pt-4">
                  <h4 className="font-medium mb-2">Order Timeline</h4>
                  <div className="space-y-3">
                    <div className="flex gap-3">
                      <div className="flex flex-col items-center">
                        <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center text-green-600 dark:text-green-300">
                          <CheckCircle className="h-4 w-4" />
                        </div>
                        <div className="w-px h-full bg-border"></div>
                      </div>
                      <div>
                        <p className="font-medium">Order placed</p>
                        <p className="text-sm text-muted-foreground">{formatDateTime(selectedOrder.createdAt)}</p>
                      </div>
                    </div>
                    
                    {selectedOrder.status !== 'pending' && (
                      <div className="flex gap-3">
                        <div className="flex flex-col items-center">
                          <div className="w-8 h-8 rounded-full bg-yellow-100 dark:bg-yellow-900 flex items-center justify-center text-yellow-600 dark:text-yellow-300">
                            <CheckCircle className="h-4 w-4" />
                          </div>
                          <div className="w-px h-full bg-border"></div>
                        </div>
                        <div>
                          <p className="font-medium">Processing</p>
                          <p className="text-sm text-muted-foreground">{formatDateTime(new Date(selectedOrder.createdAt).getTime() + 3600000)}</p>
                        </div>
                      </div>
                    )}
                    
                    {(selectedOrder.status === 'shipped' || selectedOrder.status === 'completed') && (
                      <div className="flex gap-3">
                        <div className="flex flex-col items-center">
                          <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-300">
                            <Truck className="h-4 w-4" />
                          </div>
                          <div className="w-px h-full bg-border"></div>
                        </div>
                        <div>
                          <p className="font-medium">Shipped</p>
                          <p className="text-sm text-muted-foreground">{formatDateTime(new Date(selectedOrder.createdAt).getTime() + 86400000)}</p>
                        </div>
                      </div>
                    )}
                    
                    {selectedOrder.status === 'completed' && (
                      <div className="flex gap-3">
                        <div className="flex flex-col items-center">
                          <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center text-green-600 dark:text-green-300">
                            <CheckCircle className="h-4 w-4" />
                          </div>
                        </div>
                        <div>
                          <p className="font-medium">Delivered</p>
                          <p className="text-sm text-muted-foreground">{formatDateTime(new Date(selectedOrder.createdAt).getTime() + 172800000)}</p>
                        </div>
                      </div>
                    )}
                    
                    {selectedOrder.status === 'cancelled' && (
                      <div className="flex gap-3">
                        <div className="flex flex-col items-center">
                          <div className="w-8 h-8 rounded-full bg-red-100 dark:bg-red-900 flex items-center justify-center text-red-600 dark:text-red-300">
                            <XCircle className="h-4 w-4" />
                          </div>
                        </div>
                        <div>
                          <p className="font-medium">Cancelled</p>
                          <p className="text-sm text-muted-foreground">{formatDateTime(new Date(selectedOrder.createdAt).getTime() + 14400000)}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button variant="outline" onClick={() => setIsDetailsOpen(false)}>
                    Close
                  </Button>
                  <Button>
                    <FileText className="h-4 w-4 mr-2" />
                    Generate Invoice
                  </Button>
                </div>
              </>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </MainLayout>
  );
}
