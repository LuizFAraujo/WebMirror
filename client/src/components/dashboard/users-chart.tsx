import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { 
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";
import { useTheme } from "@/hooks/use-theme";
import { formatNumber } from "@/lib/utils";

interface UsersChartProps {
  data: {
    name: string;
    data: number[];
    color: string;
  }[];
  labels: string[];
  className?: string;
}

export function UsersChart({ data, labels, className }: UsersChartProps) {
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
          <h3 className="text-lg font-medium">User Analytics</h3>
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
            <BarChart
              data={chartData}
              margin={{
                top: 5,
                right: 5,
                left: 5,
                bottom: 5,
              }}
            >
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
                axisLine={false}
                tickLine={false}
                stroke={theme === 'dark' ? "#9ca3af" : "#6b7280"}
              />
              <Tooltip 
                formatter={(value: number) => [formatNumber(value), ""]}
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
                <Bar
                  key={i}
                  dataKey={dataset.name}
                  fill={dataset.color}
                  radius={[4, 4, 0, 0]}
                  barSize={30}
                />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
