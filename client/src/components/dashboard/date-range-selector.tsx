import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type DateRange = "today" | "week" | "month";

interface DateRangeSelectorProps {
  onChange?: (range: DateRange) => void;
  className?: string;
}

export function DateRangeSelector({ onChange, className }: DateRangeSelectorProps) {
  const [selectedRange, setSelectedRange] = useState<DateRange>("month");

  const handleRangeChange = (range: DateRange) => {
    setSelectedRange(range);
    if (onChange) {
      onChange(range);
    }
  };

  return (
    <div className={cn("inline-flex items-center rounded-md shadow-sm", className)}>
      <Button
        variant={selectedRange === "today" ? "default" : "outline"}
        size="sm"
        className={cn(
          "rounded-l-md",
          selectedRange === "today" 
            ? "bg-primary text-primary-foreground hover:bg-primary/90" 
            : "bg-background text-foreground hover:bg-muted"
        )}
        onClick={() => handleRangeChange("today")}
      >
        Today
      </Button>
      <Button
        variant={selectedRange === "week" ? "default" : "outline"}
        size="sm"
        className={cn(
          "rounded-none border-x-0",
          selectedRange === "week" 
            ? "bg-primary text-primary-foreground hover:bg-primary/90" 
            : "bg-background text-foreground hover:bg-muted"
        )}
        onClick={() => handleRangeChange("week")}
      >
        This Week
      </Button>
      <Button
        variant={selectedRange === "month" ? "default" : "outline"}
        size="sm"
        className={cn(
          "rounded-r-md",
          selectedRange === "month" 
            ? "bg-primary text-primary-foreground hover:bg-primary/90" 
            : "bg-background text-foreground hover:bg-muted"
        )}
        onClick={() => handleRangeChange("month")}
      >
        This Month
      </Button>
    </div>
  );
}
