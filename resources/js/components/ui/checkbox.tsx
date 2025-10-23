import * as React from "react";
import { CheckIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type CheckboxProps = React.InputHTMLAttributes<HTMLInputElement> & {
  className?: string;
};

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, ...props }, ref) => {
    return (
      <label
        className={cn(
          "inline-flex items-center cursor-pointer select-none relative", // relative para posicionar el icono
          className
        )}
      >
        <input
          type="checkbox"
          ref={ref}
          className={cn(
            "peer appearance-none w-4 h-4 rounded border transition-colors",
            "border-gray-400 dark:border-gray-600",
            "bg-white dark:bg-transparent",
            "checked:bg-primary dark:checked:bg-primary checked:border-primary dark:checked:border-primary",
            "focus:outline-none focus:ring-2 focus:ring-primary",
            "disabled:cursor-not-allowed disabled:opacity-50"
          )}
          {...props}
        />
        <span
          aria-hidden="true"
          className="absolute left-0 top-0 flex items-center justify-center w-4 h-4 text-white pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity"
        >
          <CheckIcon className="w-4 h-4" />
        </span>
      </label>
    );
  }
);

Checkbox.displayName = "Checkbox";

export { Checkbox };
