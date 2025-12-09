import { cn } from "@/lib/utils";
import React from "react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> { }

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        "w-full px-0 py-3 bg-transparent border-0 border-b border-white/20 text-white text-base placeholder:text-muted-dark focus:outline-none focus:border-accent transition-colors",
        className
      )}
      {...props}
    />
  )
);
Input.displayName = "Input";
