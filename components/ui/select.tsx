import { cn } from "@/lib/utils";
import React from "react";

type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement>;

export function Select({ className, children, ...props }: SelectProps) {
  return (
    <select
      className={cn(
        "h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-800 shadow-inner shadow-slate-100 focus:border-[#0A2342] focus:outline-none focus:ring-2 focus:ring-[#0A2342]/20",
        className
      )}
      {...props}
    >
      {children}
    </select>
  );
}
