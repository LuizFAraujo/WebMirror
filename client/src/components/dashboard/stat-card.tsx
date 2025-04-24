import { Card, CardContent } from "@/components/ui/card";
import { cn, formatCurrency, formatNumber } from "@/lib/utils";
import { ArrowUp, ArrowDown } from "lucide-react";

interface StatCardProps {
  title: string;
  value: number;
  change: number;
  changeType: "increase" | "decrease";
  comparison: string;
  isPercentage?: boolean;
  className?: string;
}

export function StatCard({
  title,
  value,
  change,
  changeType,
  comparison,
  isPercentage = false,
  className,
}: StatCardProps) {
  const formattedValue = isPercentage 
    ? `${value}%` 
    : typeof value === 'number' && value > 1000 
      ? formatNumber(value) 
      : formatCurrency(value);

  return (
    <Card className={cn("stat-card", className)}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-muted-foreground">{title}</h3>
          <span className={cn(
            "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
            changeType === "increase" 
              ? "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300" 
              : "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-300"
          )}>
            {changeType === "increase" ? (
              <ArrowUp className="h-3 w-3 mr-1" />
            ) : (
              <ArrowDown className="h-3 w-3 mr-1" />
            )}
            {change}%
          </span>
        </div>
        <div className="flex items-center">
          <span className="text-3xl font-bold">{formattedValue}</span>
        </div>
        <div className="mt-4 flex items-center text-sm text-muted-foreground">
          <span>{comparison}</span>
        </div>
      </CardContent>
    </Card>
  );
}
