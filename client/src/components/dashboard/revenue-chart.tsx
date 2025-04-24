import { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { 
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";
import { formatCurrency } from "@/lib/utils";
import { useTheme } from "@/hooks/use-theme";

interface RevenueChartProps {
  data: {
    name: string;
    data: number[];
    color: string;
  }[];
  labels: string[];
  className?: string;
}

export function RevenueChart({ data, labels, className }: RevenueChartProps) {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  // Format data for Recharts
  const chartData = labels.map((label, index) => {
    const item: Record<string, any> = { name: label };
    data.forEach(dataset => {
      item[dataset.name] = dataset.data[index];
    });
    return item;
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="h-80 animate-pulse bg-muted rounded-md"></div>;
  }

  return (
    <Card className={className}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-medium">Revenue Overview</h3>
          <div className="inline-flex items-center space-x-2">
            {data.map((dataset, i) => (
              <span key={i} className="inline-flex items-center">
                <span className="w-3 h-3 rounded-full mr-1" style={{ backgroundColor: dataset.color }}></span>
                <span className="text-xs text-muted-foreground">{dataset.name}</span>
              </span>
            ))}
          </div>
        </div>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={chartData}
              margin={{
                top: 5,
                right: 5,
                left: 5,
                bottom: 5,
              }}
            >
              <defs>
                {data.map((dataset, i) => (
                  <linearGradient key={i} id={`color${dataset.name}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={dataset.color} stopOpacity={0.2} />
                    <stop offset="95%" stopColor={dataset.color} stopOpacity={0} />
                  </linearGradient>
                ))}
              </defs>
              <CartesianGrid 
                strokeDasharray="3 3" 
                vertical={false} 
                stroke={theme === 'dark' ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.05)"} 
              />
              <XAxis 
                dataKey="name" 
                tick={{ fontSize: 12 }} 
                axisLine={false} 
                tickLine={false} 
                stroke={theme === 'dark' ? "#9ca3af" : "#6b7280"} 
              />
              <YAxis 
                tick={{ fontSize: 12 }} 
                tickFormatter={(value) => `$${value / 1000}k`}
                axisLine={false}
                tickLine={false}
                stroke={theme === 'dark' ? "#9ca3af" : "#6b7280"}
              />
              <Tooltip 
                formatter={(value: number) => [formatCurrency(value), ""]}
                contentStyle={{
                  backgroundColor: theme === 'dark' ? 'hsl(var(--popover))' : 'white',
                  borderColor: theme === 'dark' ? 'hsl(var(--border))' : '#e2e8f0',
                  borderRadius: '8px',
                  fontSize: '12px',
                  color: theme === 'dark' ? 'hsl(var(--popover-foreground))' : 'inherit'
                }}
              />
              <Legend />
              {data.map((dataset, i) => (
                <Area
                  key={i}
                  type="monotone"
                  dataKey={dataset.name}
                  stroke={dataset.color}
                  fillOpacity={1}
                  fill={`url(#color${dataset.name})`}
                  strokeWidth={2}
                />
              ))}
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
