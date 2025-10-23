import * as React from "react";
import { cn } from "@/lib/utils";

type ProgressProps = {
  value: number; // porcentaje 0–100
  max?: number;
  label?: string;
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "secondary" | "accent" | "info" | "success" | "warning" | "error" | "neutral";
  showValue?: boolean;
  className?: string;
};

const variantColors: Record<NonNullable<ProgressProps["variant"]>, string> = {
  primary: "bg-primary",
  secondary: "bg-secondary",
  accent: "bg-accent",
  info: "bg-info",
  success: "bg-success",
  warning: "bg-warning",
  error: "bg-destructive",
  neutral: "bg-muted",
};

const sizeHeights: Record<NonNullable<ProgressProps["size"]>, string> = {
  sm: "h-2",
  md: "h-3",
  lg: "h-4",
};

const Progress = ({
  value,
  max = 100,
  label,
  variant = "primary",
  size = "md",
  showValue = false,
  className,
}: ProgressProps) => {
  const percent = Math.min(Math.max(value, 0), max);

  return (
    <div className="flex flex-col gap-1.5 w-full">
      {/* Etiqueta opcional */}
      {label && (
        <div className="flex justify-between text-xs font-medium text-muted-foreground">
          <span>{label}</span>
          {showValue && <span>{percent}%</span>}
        </div>
      )}

      {/* Contenedor del progress */}
      <div
        className={cn(
          "relative w-full overflow-hidden rounded-full bg-muted/30",
          sizeHeights[size],
          className
        )}
      >
        <div
          className={cn(
            "absolute left-0 top-0 h-full rounded-full transition-all duration-500 ease-out",
            variantColors[variant]
          )}
          style={{ width: `${percent}%` }}
        ></div>
      </div>
    </div>
  );
};

export { Progress };
