"use client";

import { cn } from "@/lib/utils";
import React from "react";

type Tab = { id: string; label: string };

type TabsProps = {
  tabs: Tab[];
  value: string;
  onChange: (id: string) => void;
  className?: string;
};

export function Tabs({ tabs, value, onChange, className }: TabsProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-2xl border border-slate-200 bg-white p-1 shadow-sm",
        className
      )}
    >
      {tabs.map((tab) => {
        const active = tab.id === value;
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={cn(
              "px-4 py-2 text-sm font-semibold rounded-xl transition",
              active
                ? "bg-[#0A2342] text-white shadow-md"
                : "text-slate-600 hover:text-[#0A2342]"
            )}
            type="button"
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
