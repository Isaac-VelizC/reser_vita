import * as React from "react"
import { cn } from "@/lib/utils"
import { BadgeColor } from "@/types"

// Tipos de variantes y colores
type BadgeVariant = "soft" | "outline" | "dashed" | "solid" | "empty"

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant
  color?: BadgeColor
  icon?: React.ElementType;
}

// Configuración de estilos por color base
const colorMap: Record<BadgeColor, string> = {
  primary: "text-primary bg-primary/10 border-primary",
  secondary: "text-secondary bg-secondary/10 border-secondary",
  accent: "text-accent bg-accent/10 border-accent",
  neutral: "text-neutral bg-neutral/10 border-neutral",
  info: "text-info bg-info/10 border-info",
  success: "text-success bg-success/10 border-success",
  warning: "text-warning bg-warning/10 border-warning",
  error: "text-danger bg-danger/10 border-danger",
}

// Variantes visuales del badge
const variantMap: Record<BadgeVariant, string> = {
  solid: "text-white border-transparent",
  soft: "border-transparent",
  outline: "bg-transparent",
  dashed: "bg-transparent border border-dashed",
  empty: "w-2 h-2 p-0 rounded-full",
}

function Badge({
  className,
  variant = "soft",
  color = "neutral",
  icon: Icon,
  children,
  ...props
}: BadgeProps) {
  // Calculamos las clases finales
  const baseColor = colorMap[color]
  const variantClass = variantMap[variant]

  // Caso especial: badge vacío
  if (variant === "empty") {
    return (
      <span
        data-slot="badge"
        className={cn(
          "inline-flex shrink-0 items-center justify-center border rounded-full",
          variantClass,
          baseColor,
          className
        )}
        {...props}
      />
    )
  }

  return (
    <span
      data-slot="badge"
      className={cn(
        "inline-flex items-center gap-1.5 uppercase whitespace-nowrap rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors duration-200",
        "select-none",
        baseColor,
        variantClass,
        variant === "solid" && {
          primary: "bg-primary text-white",
          secondary: "bg-secondary text-white",
          accent: "bg-accent text-white",
          neutral: "bg-neutral text-white",
          info: "bg-info text-white",
          success: "bg-success text-white",
          warning: "bg-warning text-white",
          error: "bg-destructive text-white",
        }[color],
        className
      )}
      {...props}
    >
      {Icon && <Icon  className="w-3 h-3" />}
      {children}
    </span>
  )
}

export { Badge }
