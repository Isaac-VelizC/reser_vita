import * as React from "react";
import { cn } from "@/lib/utils";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  startIcon?: React.ElementType;
  endIcon?: React.ElementType;
  error?: string;
  helperText?: string;
  variant?: "default" | "success" | "warning" | "error";
  size?: "sm" | "md" | "lg";
  withJoin?: boolean;
  joinText?: string;
  fullWidth?: boolean;
  label?: string;
};

const variantStyles = {
  default: "border-input focus:ring-primary/30 focus:border-primary",
  success: "border-success text-success focus:ring-success/30 focus:border-success",
  warning: "border-warning text-warning focus:ring-warning/30 focus:border-warning",
  error: "border-destructive text-destructive focus:ring-destructive/30 focus:border-destructive",
};

const sizeStyles = {
  sm: "h-8 text-sm px-2 gap-1",
  md: "h-10 text-sm px-3 gap-2",
  lg: "h-12 text-base px-4 gap-3",
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type = "text",
      startIcon: StartIcon,
      endIcon: EndIcon,
      error,
      helperText,
      variant = "default",
      size = "md",
      withJoin = false,
      joinText,
      fullWidth = true,
      label,
      ...props
    },
    ref
  ) => {
    const colorVariant = error ? "error" : variant;

    return (
      <div className={cn("flex flex-col space-y-1", fullWidth && "w-full")}>
        {label && (
          <label className="text-sm font-medium text-foreground/80">{label}</label>
        )}

        <div
          className={cn(
            "flex items-center border rounded-lg transition-all duration-200 bg-background focus-within:ring-2",
            variantStyles[colorVariant],
            sizeStyles[size as keyof typeof sizeStyles],
            withJoin && "rounded-r-none",
            props.disabled && "opacity-50 cursor-not-allowed",
            className
          )}
        >
          {/* Ícono inicial */}
          {StartIcon && <StartIcon className="h-4 w-4 opacity-70 shrink-0" />}

          {/* Input principal */}
          <input
            ref={ref}
            type={type}
            {...props}
            className={cn(
              "w-full bg-transparent outline-none text-foreground placeholder:text-muted-foreground/70",
              "focus:outline-none disabled:opacity-70"
            )}
          />

          {/* Ícono final */}
          {EndIcon && <EndIcon className="h-4 w-4 opacity-70 shrink-0" />}

          {/* Join opcional */}
          {withJoin && joinText && (
            <span className="border-l bg-muted/40 px-3 py-1 text-sm rounded-r-md text-muted-foreground">
              {joinText}
            </span>
          )}
        </div>

        {/* Texto de error o ayuda */}
        {error ? (
          <p className="text-xs text-destructive mt-1">{error}</p>
        ) : helperText ? (
          <p className="text-xs text-muted-foreground mt-1">{helperText}</p>
        ) : null}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
