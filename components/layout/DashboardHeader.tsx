"use client";

import { Button } from "@/components/ui/button";
import { Bell, LogOut, Settings, User } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export function DashboardHeader() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    // TODO: Implement logout
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <header className="border-b border-finsim-border bg-white px-6 py-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-finsim-primary">Dashboard</h1>
        <div className="flex items-center gap-4">
          {/* Notification Bell */}
          <button className="relative p-2 text-slate-600 hover:text-finsim-primary transition">
            <Bell size={20} />
            <span className="absolute top-1 right-1 h-2 w-2 bg-finsim-accent rounded-full"></span>
          </button>

          {/* Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-100 transition"
            >
              <div className="h-8 w-8 rounded-full bg-finsim-primary text-white flex items-center justify-center font-bold text-sm">
                U
              </div>
              <span className="hidden sm:inline text-sm font-semibold text-slate-700">User</span>
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-finsim-border">
                <Link
                  href="/dashboard/profile"
                  className="flex items-center gap-3 px-4 py-3 text-sm text-slate-700 hover:bg-slate-100 transition border-b border-finsim-border"
                >
                  <User size={16} /> Profile Settings
                </Link>
                <button
                  className="flex items-center gap-3 w-full px-4 py-3 text-sm text-slate-700 hover:bg-slate-100 transition"
                  onClick={handleLogout}
                >
                  <LogOut size={16} /> Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
