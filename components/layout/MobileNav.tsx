"use client";

import { cn } from "@/lib/utils";
import {
  Home,
  LineChart,
  BookOpen,
  Trophy,
  User
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const mobileNav = [
  { href: "/dashboard", label: "Home", icon: Home },
  { href: "/dashboard/stocks", label: "Trade", icon: LineChart },
  { href: "/dashboard/lessons", label: "Learn", icon: BookOpen },
  { href: "/dashboard/challenges", label: "Compete", icon: Trophy },
  { href: "/dashboard/profile", label: "Profile", icon: User }
];

export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-20 flex items-center justify-around bg-black border-t border-white/10 px-4 py-3 lg:hidden">
      {mobileNav.map((item) => {
        const active = pathname === item.href || pathname.startsWith(item.href + '/');
        const Icon = item.icon;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex flex-col items-center justify-center px-3 py-2 text-xs font-medium transition-colors",
              active ? "text-white" : "text-muted"
            )}
          >
            <Icon className="h-5 w-5 mb-1" />
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
