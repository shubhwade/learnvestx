"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-finsim-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/images/logo.png"
              alt="LearnVestX"
              width={160}
              height={40}
              className="h-10 w-auto object-contain"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="#features" className="text-sm text-slate-600 hover:text-finsim-primary transition">
              Features
            </Link>
            <Link href="#how-it-works" className="text-sm text-slate-600 hover:text-finsim-primary transition">
              How it Works
            </Link>
            <Link href="#" className="text-sm text-slate-600 hover:text-finsim-primary transition">
              Pricing
            </Link>
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <Link href="/login" className="text-sm font-semibold text-finsim-primary hover:text-finsim-hover transition">
              Login
            </Link>
            <Link href="/signup" className="px-6 py-3 bg-finsim-primary text-white rounded-lg font-semibold hover:bg-finsim-hover transition-all duration-300">
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 border-t border-finsim-border">
            <div className="flex flex-col gap-2 py-4">
              <Link href="#features" className="text-sm text-slate-600 hover:text-finsim-primary px-4 py-2">
                Features
              </Link>
              <Link href="#how-it-works" className="text-sm text-slate-600 hover:text-finsim-primary px-4 py-2">
                How it Works
              </Link>
              <Link href="#" className="text-sm text-slate-600 hover:text-finsim-primary px-4 py-2">
                Pricing
              </Link>
              <div className="px-4 pt-4 space-y-2 border-t border-finsim-border">
                <Link href="/login" className="block px-6 py-3 border-2 border-finsim-primary text-finsim-primary rounded-lg font-semibold text-center hover:bg-finsim-primary hover:text-white transition-all">
                  Login
                </Link>
                <Link href="/signup" className="block px-6 py-3 bg-finsim-primary text-white rounded-lg font-semibold text-center hover:bg-finsim-hover transition-all">
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
