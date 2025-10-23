import React from "react"
import { cn } from "@/lib/utils"

type CardStatsProps = {
  title: string
  value: number | string
  icon: React.ElementType
  color?: "primary" | "secondary" | "accent" | "info" | "success" | "warning" | "error"
}

const colorMap: Record<
  NonNullable<CardStatsProps["color"]>,
  { bg: string; text: string; iconBg: string }
> = {
  primary: { bg: "bg-primary/10", text: "text-primary", iconBg: "bg-primary/20" },
  secondary: { bg: "bg-secondary/10", text: "text-secondary", iconBg: "bg-secondary/20" },
  accent: { bg: "bg-accent/10", text: "text-accent", iconBg: "bg-accent/20" },
  info: { bg: "bg-info/10", text: "text-info", iconBg: "bg-info/20" },
  success: { bg: "bg-success/10", text: "text-success", iconBg: "bg-success/20" },
  warning: { bg: "bg-warning/10", text: "text-warning", iconBg: "bg-warning/20" },
  error: { bg: "bg-destructive/10", text: "text-destructive", iconBg: "bg-destructive/20" },
}

export const CardStats = ({ title, value, icon: Icon, color = "primary" }: CardStatsProps) => {
  const colors = colorMap[color]

  return (
    <div
      className={cn(
        "flex items-center gap-4 rounded-xl p-4 shadow-md transition-transform hover:scale-[1.02] bg-white",
        colors.bg
      )}
    >
      <div
        className={cn(
          "flex h-12 w-12 items-center justify-center rounded-full text-white",
          colors.iconBg
        )}
      >
        <Icon className="h-6 w-6" />
      </div>
      <div className="flex flex-col">
        <span className={cn("text-lg font-bold", colors.text)}>{value}</span>
        <span className="text-xs text-gray-500 uppercase">{title}</span>
      </div>
    </div>
  )
}

export default CardStats
