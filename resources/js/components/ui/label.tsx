import * as React from "react";

import { cn } from "@/lib/utils";

type LabelProps = {
  text: string;
  required?: boolean;
  auxiliaryText?: string | number;
  className?: string;
  htmlFor?: string;
} & React.LabelHTMLAttributes<HTMLLabelElement>;

const Label: React.FC<LabelProps> = ({
  text,
  required = false,
  auxiliaryText,
  className = "",
  htmlFor,
  ...props
}) => {
  return (
    <label
    htmlFor={htmlFor}
      className={cn(
        "label text-sm select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className
      )}
      {...props}
    >
      <span className="label-text leading-none font-medium">
        {text} {required && <span className="text-danger text-xs">*</span>}
      </span>
      {auxiliaryText !== undefined && (
        <span className="label-text-alt">{auxiliaryText}</span>
      )}
    </label>
  );
};

export { Label };

