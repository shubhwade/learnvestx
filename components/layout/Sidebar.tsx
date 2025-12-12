"use client";

import { cn } from "@/lib/utils";
import {
  Home,
  LineChart,
  BadgeDollarSign,
  BookOpen,
  Trophy,
  User,
  GraduationCap,
  Medal,
  HelpCircle,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: Home },
  { href: "/dashboard/stocks", label: "Stock Trading", icon: LineChart },
  { href: "/dashboard/sip", label: "SIP Simulator", icon: BadgeDollarSign },
  { href: "/dashboard/lessons", label: "Lessons", icon: BookOpen },
  { href: "/dashboard/quiz", label: "Quizzes", icon: HelpCircle },
  { href: "/dashboard/challenges", label: "Challenges", icon: Trophy },
  { href: "/dashboard/leaderboard", label: "Leaderboard", icon: Medal },
  { href: "/dashboard/certificates", label: "Certificates", icon: GraduationCap },
  { href: "/dashboard/profile", label: "Profile", icon: User }
];

type SidebarProps = {
  className?: string;
};

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "hidden lg:flex lg:w-64 lg:flex-col border-r border-white/10 bg-black p-6",
        className
      )}
    >
      <Link href="/" className="mb-8 block">
        <Image
          src="/images/logo.png"
          alt="LearnVestX"
          width={180}
          height={40}
          className="h-10 w-auto object-contain bg-black"
          priority
        />
      </Link>

      <nav className="space-y-1 flex-1">
        {navItems.map((item) => {
          // Dashboard should only be active on exact match, other items can match sub-paths
          const active = item.href === "/dashboard"
            ? pathname === "/dashboard"
            : pathname === item.href || pathname.startsWith(item.href + '/');
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                active
                  ? "bg-white text-black"
                  : "text-muted hover:text-white hover:bg-white/5"
              )}
            >
              <Icon className="h-5 w-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
