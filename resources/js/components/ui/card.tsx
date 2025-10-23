import * as React from "react"
import { cn } from "@/lib/utils"

// --- Root ---
function Card({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card"
      className={cn(
        "group relative flex flex-col gap-4 overflow-hidden rounded-xl border border-border/60 bg-card text-card-foreground shadow-md transition-all duration-300 ease-in-out hover:shadow-lg hover:border-border/80 dark:hover:border-border/50",
        "focus-within:ring-2 focus-within:ring-primary/40 focus-within:ring-offset-2",
        className
      )}
      {...props}
    />
  )
}

// --- Header ---
function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "flex flex-col gap-2 px-4 pt-4",
        className
      )}
      {...props}
    />
  )
}

// --- Title ---
function CardTitle({ className, ...props }: React.ComponentProps<"h3">) {
  return (
    <h3
      data-slot="card-title"
      className={cn(
        "text-lg font-semibold leading-tight tracking-tight text-foreground transition-colors",
        className
      )}
      {...props}
    />
  )
}

// --- Description ---
function CardDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="card-description"
      className={cn(
        "text-sm text-muted-foreground leading-relaxed",
        className
      )}
      {...props}
    />
  )
}

// --- Content ---
function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("flex flex-col px-4 py-4 gap-3", className)}
      {...props}
    />
  )
}

// --- Footer ---
function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn(
        "flex items-center justify-end gap-3 px-4 pb-5 border-t border-border/40 bg-muted/5",
        className
      )}
      {...props}
    />
  )
}

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
