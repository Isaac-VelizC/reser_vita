import { Trend } from "@/interfaces/Dashboard";
import { formatPrice } from "@/lib/utils";
import React from "react";
import { Card } from "../ui/card";

interface KpiCardProps {
  icon: React.ElementType;
  gradientFrom: string;
  gradientTo: string;
  value: number | string;
  change: number | string;
  trend?: Trend;
  description: string;
  formatValue?: boolean;
}

const KpiCard: React.FC<KpiCardProps> = ({
  icon: Icon,
  gradientFrom,
  gradientTo,
  value,
  change,
  trend = "none",
  description,
  formatValue,
}) => {
  const displayValue = formatValue ? formatPrice(Number(value)) : value;

  const trendColor =
    trend === "up"
      ? "text-green-500"
      : trend === "down"
      ? "text-red-500"
      : trend === "warning"
      ? "text-yellow-500"
      : "text-gray-700 dark:text-gray-300";

  return (
    <Card
      className={`p-4 transition-all hover:shadow-lg hover:scale-[1.02]`}
    >
      <div>
        <div className="flex items-center justify-between mb-2">
          {/* Icon with gradient */}
          <div
            className={`p-2 rounded-xl bg-gradient-to-tr ${gradientFrom} ${gradientTo} text-white shadow-md`}
          >
            <Icon className="w-4 h-4" />
          </div>

          {/* Change indicator */}
          <span
            className={`text-sm font-semibold ${trendColor} bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-xl`}
          >
            {change}
          </span>
        </div>

        <div className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          {displayValue}
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {description}
        </p>
      </div>
    </Card>
  );
};

export default KpiCard;
