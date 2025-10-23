import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const separatorVariants = cva(
  "shrink-0 bg-base-300 transition-colors duration-200",
  {
    variants: {
      orientation: {
        horizontal: "w-full h-px",
        vertical: "h-full w-px",
      },
      variant: {
        default: "bg-base-300",
        muted: "bg-base-200",
        strong: "bg-base-content/40",
        primary: "bg-primary/40",
      },
      thickness: {
        sm: "",
        md: "data-[orientation=horizontal]:h-[2px] data-[orientation=vertical]:w-[2px]",
        lg: "data-[orientation=horizontal]:h-[3px] data-[orientation=vertical]:w-[3px]",
      },
    },
    defaultVariants: {
      orientation: "horizontal",
      variant: "default",
      thickness: "sm",
    },
  }
);

interface SeparatorProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof separatorVariants> {
  decorative?: boolean;
}

const Separator = React.forwardRef<HTMLDivElement, SeparatorProps>(
  (
    { className, orientation, variant, thickness, decorative = true, ...props },
    ref
  ) => {
    return (
      <div
        ref={ref}
        role={decorative ? "presentation" : "separator"}
        aria-orientation={orientation ?? undefined}
        data-slot="separator-root"
        className={cn(
          separatorVariants({ orientation, variant, thickness }),
          className
        )}
        {...props}
      />
    );
  }
);

Separator.displayName = "Separator";

export { Separator, separatorVariants };
