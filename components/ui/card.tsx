import { cn } from "@/lib/utils";
import React from "react";

type CardProps = React.HTMLAttributes<HTMLDivElement>;

export function Card({ className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-lg border border-white/10 bg-black p-6",
        className
      )}
      {...props}
    />
  );
}

export function CardHeader({ className, ...props }: CardProps) {
  return (
    <div className={cn("pb-4 flex flex-col space-y-1.5", className)} {...props} />
  );
}

export function CardTitle({ className, ...props }: CardProps) {
  return <h3 className={cn("text-lg font-bold text-white", className)} {...props} />;
}

export function CardContent({ className, ...props }: CardProps) {
  return <div className={cn("text-sm text-muted", className)} {...props} />;
}
