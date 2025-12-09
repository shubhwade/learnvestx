import { cn } from "@/lib/utils";
import React from "react";

type BadgeProps = React.HTMLAttributes<HTMLSpanElement> & {
  variant?: "default" | "outline";
};

export function Badge({ className, variant = "default", ...props }: BadgeProps) {
  const base =
    variant === "default"
      ? "bg-[#00C26F]/15 text-[#0A2342] border border-[#00C26F]/30"
      : "border border-slate-200 text-slate-600";
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold",
        base,
        className
      )}
      {...props}
    />
  );
}
