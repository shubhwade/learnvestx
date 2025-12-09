"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, TrendingUp, BookOpen, Trophy, Zap, Users, BarChart3, Lock } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-hero py-20 sm:py-32 lg:py-40">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left Content */}
            <div className="space-y-6 z-10">
              <div className="space-y-4">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
                  Learn Finance
                  <span className="block text-finsim-accent">by Simulating</span>
                </h1>
                <p className="text-lg sm:text-xl text-white/80 max-w-lg">
                  Trade stocks, run SIP simulations, and master financial concepts with a risk-free virtual portfolio.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button variant="secondary" size="lg" asChild>
                  <Link href="/signup" className="gap-2">
                    Get Started <ArrowRight size={20} />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link href="/login">Login to Dashboard</Link>
                </Button>
              </div>

              {/* Trust Badges */}
              <div className="flex gap-8 pt-8 border-t border-white/10">
                <div>
                  <p className="text-2xl font-bold text-white">10K+</p>
                  <p className="text-sm text-white/60">Active Traders</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">500M+</p>
                  <p className="text-sm text-white/60">Virtual Capital</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">99%</p>
                  <p className="text-sm text-white/60">Success Rate</p>
                </div>
              </div>
            </div>

            {/* Right Content - Dashboard Preview */}
            <div className="hidden lg:block relative h-96">
              <div className="absolute inset-0 bg-gradient-to-br from-finsim-accent/20 to-transparent rounded-2xl blur-3xl"></div>
              <Card className="relative h-full p-6 bg-white/95 backdrop-blur shadow-2xl">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-finsim-primary">Portfolio Value</h3>
                    <span className="text-finsim-accent font-bold">+8.24%</span>
                  </div>
                  <div className="text-3xl font-bold text-finsim-primary">₹5,24,380</div>
                  <div className="h-40 bg-gradient-to-r from-finsim-primary/10 to-finsim-accent/10 rounded-lg flex items-end justify-around p-4">
                    {[40, 60, 45, 80, 55, 70, 50].map((height, i) => (
                      <div
                        key={i}
                        className="w-2 bg-gradient-to-t from-finsim-accent to-finsim-primary rounded-sm"
                        style={{ height: `${height}%` }}
                      ></div>
                    ))}
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="bg-slate-100 p-2 rounded">
                      <p className="text-slate-600">Holdings</p>
                      <p className="font-bold text-finsim-primary">12</p>
                    </div>
                    <div className="bg-slate-100 p-2 rounded">
                      <p className="text-slate-600">P&L</p>
                      <p className="font-bold text-finsim-accent">+₹41,208</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 sm:py-32 bg-finsim-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-finsim-primary mb-4">
              Everything You Need to Learn Finance
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Comprehensive tools designed to help you master investing through practical experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Feature Cards */}
            {[
              {
                icon: TrendingUp,
                title: "Stock Trading",
                desc: "Buy and sell stocks with real-time market data using virtual capital"
              },
              {
                icon: BarChart3,
                title: "SIP Simulator",
                desc: "Simulate Systematic Investment Plans and visualize long-term growth"
              },
              {
                icon: BookOpen,
                title: "Interactive Lessons",
                desc: "Learn fundamental and advanced finance concepts from experts"
              },
              {
                icon: Trophy,
                title: "Challenges & Rewards",
                desc: "Compete with others and earn certificates for your achievements"
              },
              {
                icon: Zap,
                title: "Real-Time Data",
                desc: "Access live market data and historical trends for analysis"
              },
              {
                icon: Users,
                title: "Community",
                desc: "Join a community of learners and share strategies on leaderboards"
              },
              {
                icon: Lock,
                title: "Risk-Free Learning",
                desc: "Practice trading without real money - pure education and simulation"
              },
              {
                icon: BarChart3,
                title: "Advanced Analytics",
                desc: "Track your performance with detailed portfolios and P&L analysis"
              }
            ].map((feature, i) => {
              const Icon = feature.icon;
              return (
                <Card key={i} className="p-6 hover:shadow-xl transition-all duration-300 group">
                  <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-finsim-primary/20 to-finsim-accent/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Icon className="h-6 w-6 text-finsim-primary" />
                  </div>
                  <h3 className="text-lg font-bold text-finsim-primary mb-2">{feature.title}</h3>
                  <p className="text-sm text-slate-600">{feature.desc}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 sm:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-finsim-primary mb-4">
              Get Started in 4 Steps
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              From signup to trading - it takes just a few minutes to begin your financial journey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: 1, title: "Sign Up", desc: "Create a free account with email" },
              { step: 2, title: "Get Virtual Capital", desc: "Receive ₹10 lakh to start trading" },
              { step: 3, title: "Learn & Trade", desc: "Complete lessons and simulate trades" },
              { step: 4, title: "Earn & Compete", desc: "Climb leaderboards and win prizes" }
            ].map((item, i) => (
              <div key={i} className="relative">
                <div className="flex flex-col items-center text-center">
                  <div className="h-16 w-16 rounded-full bg-gradient-to-br from-finsim-primary to-finsim-hover text-white flex items-center justify-center font-bold text-2xl mb-4">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-bold text-finsim-primary mb-2">{item.title}</h3>
                  <p className="text-sm text-slate-600">{item.desc}</p>
                </div>
                {i < 3 && (
                  <div className="hidden lg:block absolute top-8 -right-3 text-2xl text-finsim-accent">
                    →
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 sm:py-32 bg-hero">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Ready to Master Finance?
          </h2>
          <p className="text-lg sm:text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Join thousands of learners who are mastering financial concepts through hands-on simulation.
          </p>
          <Button variant="secondary" size="lg" asChild>
            <Link href="/signup" className="gap-2">
              Get Started Now <ArrowRight size={20} />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-finsim-border bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-bold text-finsim-primary mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-slate-600">
                <li><Link href="#" className="hover:text-finsim-primary">Trading</Link></li>
                <li><Link href="#" className="hover:text-finsim-primary">Learning</Link></li>
                <li><Link href="#" className="hover:text-finsim-primary">Community</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-finsim-primary mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-slate-600">
                <li><Link href="#" className="hover:text-finsim-primary">About</Link></li>
                <li><Link href="#" className="hover:text-finsim-primary">Blog</Link></li>
                <li><Link href="#" className="hover:text-finsim-primary">Careers</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-finsim-primary mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-slate-600">
                <li><Link href="#" className="hover:text-finsim-primary">Privacy</Link></li>
                <li><Link href="#" className="hover:text-finsim-primary">Terms</Link></li>
                <li><Link href="#" className="hover:text-finsim-primary">Security</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-finsim-primary mb-4">Connect</h4>
              <ul className="space-y-2 text-sm text-slate-600">
                <li><Link href="#" className="hover:text-finsim-primary">Twitter</Link></li>
                <li><Link href="#" className="hover:text-finsim-primary">LinkedIn</Link></li>
                <li><Link href="#" className="hover:text-finsim-primary">Discord</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-finsim-border pt-8 flex flex-col sm:flex-row items-center justify-between text-sm text-slate-600">
            <p>&copy; 2024 FinSim Academy. All rights reserved.</p>
            <p>Simulating Finance, Building Futures</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
