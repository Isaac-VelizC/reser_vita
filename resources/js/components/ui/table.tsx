import * as React from "react";
import { cn } from "@/lib/utils";

// --- Root ---  border border-border bg-background shadow-sm
function Table({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLTableElement>) {
  return (
    <div className="w-full overflow-x-auto rounded-xl">
      <table
        className={cn(
          "w-full text-sm text-left text-foreground border-collapse",
          className
        )}
        {...props}
      >
        {children}
      </table>
    </div>
  );
}

// --- Header ---
function TableHeader({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLTableSectionElement>) {
  return (
    <thead
      className={cn(
        "bg-gray-200 dark:bg-black/50 text-sm tracking-wide font-bold text-gray-950 dark:text-gray-300 select-none",
        className
      )}
      {...props}
    >
      {children}
    </thead>
  );
}

// --- Body ---
function TableBody({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLTableSectionElement>) {
  return (
    <tbody
      className={cn("divide-y divide-border text-sm", className)}
      {...props}
    >
      {children}
    </tbody>
  );
}

// --- Row ---
function TableRow({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLTableRowElement>) {
  return (
    <tr
      className={cn(
        "hover:bg-muted/5 transition-colors cursor-default even:bg-primary/5",
        className
      )}
      {...props}
    >
      {children}
    </tr>
  );
}

// --- Head Cell ---
function TableHead({
  className,
  children,
  ...props
}: React.ThHTMLAttributes<HTMLTableCellElement>) {
  return (
    <th
      scope="col"
      className={cn(
        "px-4 py-3 font-semibold text-left border-b border-border whitespace-nowrap",
        className
      )}
      {...props}
    >
      {children}
    </th>
  );
}

// --- Data Cell ---
function TableCell({
  className,
  children,
  ...props
}: React.TdHTMLAttributes<HTMLTableCellElement>) {
  return (
    <td
      className={cn("px-4 py-3 align-middle text-sm truncate", className)}
      {...props}
    >
      {children}
    </td>
  );
}

// --- Footer ---
function TableFooter({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLTableSectionElement>) {
  return (
    <tfoot
      className={cn(
        "bg-muted/50 border-t border-border text-sm font-medium",
        className
      )}
      {...props}
    >
      {children}
    </tfoot>
  );
}

export {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  TableFooter,
};
