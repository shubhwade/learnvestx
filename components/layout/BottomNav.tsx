"use client";

import { cn } from "@/lib/utils";
import {
  BadgeDollarSign,
  BarChart3,
  BookOpen,
  BriefcaseBusiness,
  ChartSpline,
  Home,
  LineChart,
  Medal,
  Trophy,
  User,
  GraduationCap,
  Layers
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/dashboard", label: "Home", icon: Home },
  { href: "/dashboard/stocks", label: "Trade", icon: LineChart },
  { href: "/dashboard/sip", label: "SIP", icon: BadgeDollarSign },
  { href: "/dashboard/lessons", label: "Learn", icon: BookOpen },
  { href: "/dashboard/profile", label: "Profile", icon: User }
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 border-t border-finsim-border bg-white flex items-center justify-around">
      {navItems.map((item) => {
        const active = pathname.startsWith(item.href);
        const Icon = item.icon;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex-1 flex flex-col items-center justify-center py-3 text-xs font-semibold transition-colors",
              active
                ? "text-finsim-primary border-t-2 border-finsim-primary"
                : "text-slate-500 hover:text-finsim-primary"
            )}
          >
            <Icon size={20} />
            <span className="mt-1">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
