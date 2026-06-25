import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

export function StatsCard({ title, value, icon: Icon, trend, className }: StatsCardProps) {
  return (
    <div className={cn("p-6 bg-card rounded-xl border border-border shadow-sm", className)}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
        <div className="p-2 bg-primary/10 rounded-lg">
          <Icon className="w-4 h-4 text-primary" />
        </div>
      </div>
      <div className="flex items-baseline gap-2">
        <h2 className="text-3xl font-bold">{value}</h2>
        {trend && (
          <span className={cn("text-xs font-medium", trend.isPositive ? "text-emerald-500" : "text-rose-500")}>
            {trend.isPositive ? "+" : ""}{trend.value}%
          </span>
        )}
      </div>
    </div>
  );
}
