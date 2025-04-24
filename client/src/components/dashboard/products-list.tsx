import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { cn, formatCurrency } from "@/lib/utils";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Product } from "@shared/schema";
import { productImages } from "@/lib/data";

interface ProductsListProps {
  className?: string;
  limit?: number;
}

export function ProductsList({ className, limit = 4 }: ProductsListProps) {
  const { data: products, isLoading, error } = useQuery<Product[]>({
    queryKey: ['/api/products'],
  });

  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="px-6 py-4 border-b border-border">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-medium">Top Products</CardTitle>
          <Button variant="link" size="sm" asChild>
            <Link href="/products" className="text-sm font-medium">View All</Link>
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y divide-border">
          {isLoading ? (
            Array(limit).fill(0).map((_, i) => (
              <div key={i} className="p-6">
                <div className="flex items-center">
                  <div className="h-16 w-16 bg-muted animate-pulse rounded-md"></div>
                  <div className="ml-4 flex-1 space-y-2">
                    <div className="h-4 bg-muted animate-pulse rounded w-1/2"></div>
                    <div className="h-3 bg-muted animate-pulse rounded w-3/4"></div>
                    <div className="h-3 bg-muted animate-pulse rounded w-1/4"></div>
                  </div>
                </div>
              </div>
            ))
          ) : error ? (
            <div className="p-6 text-center text-muted-foreground">
              Failed to load products
            </div>
          ) : !products || products.length === 0 ? (
            <div className="p-6 text-center text-muted-foreground">
              No products found
            </div>
          ) : (
            products.slice(0, limit).map((product, index) => (
              <div key={product.id} className="p-6 flex items-center">
                <div className="flex-shrink-0 h-16 w-16 bg-muted rounded-md overflow-hidden">
                  <Avatar className="h-full w-full rounded-md">
                    <AvatarImage 
                      src={product.image || productImages[index % productImages.length]} 
                      alt={product.name} 
                      className="object-cover h-full w-full"
                    />
                    <AvatarFallback className="rounded-md">{product.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                </div>
                <div className="ml-4 flex-1">
                  <h4 className="text-sm font-medium">{product.name}</h4>
                  <p className="text-sm text-muted-foreground">{product.description || 'No description'}</p>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-sm font-medium">{formatCurrency(Number(product.price))}</span>
                    <span className="text-sm text-muted-foreground">{product.inventory || 0} in stock</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
