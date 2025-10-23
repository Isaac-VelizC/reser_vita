import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonBase = [
  "inline-flex items-center justify-center gap-2 font-medium transition-all",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
  "disabled:opacity-50 disabled:cursor-not-allowed select-none",
].join(" ")

const buttonVariants = cva(buttonBase, {
  variants: {
    variant: {
      solid: "",      // classes applied via color compoundVariants
      soft: "",       // semi-transparent bg
      outline: "",    // border + transparent bg
      ghost: "",      // no bg, color text + hover-bg
      link: "underline",
    },
    color: {
      primary: "",
      secondary: "",
      accent: "",
      neutral: "",
      info: "",
      success: "",
      warning: "",
      error: "",
    },
    size: {
      sm: "h-8 px-3 text-sm",
      md: "h-10 px-4 text-sm",
      lg: "h-12 px-6 text-base",
      icon: "h-9 w-9 p-0",
    },
    radius: {
      sm: "rounded-md",
      md: "rounded-lg",
      lg: "rounded-xl",
      full: "rounded-full",
    },
  },
  compoundVariants: [
    // SOLID variants (strong bg + white text)
    { variant: "solid", color: "primary", class: "bg-primary text-white" },
    { variant: "solid", color: "success", class: "bg-success text-white" },
    { variant: "solid", color: "error", class: "bg-destructive text-white" },
    { variant: "solid", color: "warning", class: "bg-warning text-white" },
    { variant: "solid", color: "info", class: "bg-info text-white" },
    { variant: "solid", color: "neutral", class: "bg-neutral text-foreground" },
    { variant: "solid", color: "secondary", class: "bg-secondary text-white" },
    { variant: "solid", color: "accent", class: "bg-accent text-white" },

    // SOFT variants (soft bg, colored text)
    { variant: "soft", color: "primary", class: "bg-primary/10 text-primary" },
    { variant: "soft", color: "success", class: "bg-success/10 text-success" },
    { variant: "soft", color: "error", class: "bg-destructive/10 text-destructive" },
    { variant: "soft", color: "warning", class: "bg-warning/10 text-warning" },
    { variant: "soft", color: "info", class: "bg-info/10 text-info" },
    { variant: "soft", color: "neutral", class: "bg-neutral/10 text-foreground" },
    { variant: "soft", color: "secondary", class: "bg-secondary/10 text-secondary" },
    { variant: "soft", color: "accent", class: "bg-accent/10 text-accent" },

    // OUTLINE variants (transparent bg + colored border + colored text)
    {
      variant: "outline",
      color: "primary",
      class: "bg-transparent border border-primary text-primary hover:bg-primary/10",
    },
    {
      variant: "outline",
      color: "success",
      class: "bg-transparent border border-success text-success hover:bg-success/10",
    },
    {
      variant: "outline",
      color: "error",
      class: "bg-transparent border border-destructive text-destructive hover:bg-destructive/10",
    },
    {
      variant: "outline",
      color: "warning",
      class: "bg-transparent border border-warning text-warning hover:bg-warning/10",
    },
    {
      variant: "outline",
      color: "info",
      class: "bg-transparent border border-info text-info hover:bg-info/10",
    },
    {
      variant: "outline",
      color: "neutral",
      class: "bg-transparent border border-neutral text-foreground hover:bg-neutral/5",
    },
    {
      variant: "outline",
      color: "secondary",
      class: "bg-transparent border border-secondary text-secondary hover:bg-secondary/10",
    },
    {
      variant: "outline",
      color: "accent",
      class: "bg-transparent border border-accent text-accent hover:bg-accent/10",
    },

    // GHOST variants (no border, text colored, subtle hover bg)
    {
      variant: "ghost",
      color: "primary",
      class: "bg-transparent text-primary hover:bg-primary/8",
    },
    {
      variant: "ghost",
      color: "success",
      class: "bg-transparent text-success hover:bg-success/8",
    },
    {
      variant: "ghost",
      color: "error",
      class: "bg-transparent text-destructive hover:bg-destructive/8",
    },
    {
      variant: "ghost",
      color: "warning",
      class: "bg-transparent text-warning hover:bg-warning/8",
    },
    {
      variant: "ghost",
      color: "info",
      class: "bg-transparent text-info hover:bg-info/8",
    },
    {
      variant: "ghost",
      color: "neutral",
      class: "bg-transparent text-foreground hover:bg-neutral/5",
    },
    {
      variant: "ghost",
      color: "secondary",
      class: "bg-transparent text-secondary hover:bg-secondary/8",
    },
    {
      variant: "ghost",
      color: "accent",
      class: "bg-transparent text-accent hover:bg-accent/8",
    },
  ],
  defaultVariants: {
    variant: "solid",
    color: "primary",
    size: "md",
    radius: "md",
  },
})

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    startIcon?: React.ReactNode
    endIcon?: React.ReactNode
    isLoading?: boolean
  }

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, color, size, radius, startIcon, endIcon, isLoading, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, color, size, radius }), className, "cursor-pointer")}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {isLoading ? (
          <span className="animate-spin h-4 w-4 border-[2px] border-current border-t-transparent rounded-full" />
        ) : (
          <>
            {startIcon && <span className="mr-2 inline-flex items-center">{startIcon}</span>}
            {children}
            {endIcon && <span className="ml-2 inline-flex items-center">{endIcon}</span>}
          </>
        )}
      </button>
    )
  }
)

Button.displayName = "Button"

export { Button, buttonVariants }
