"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import {
  ArrowRight,
  TrendingUp,
  TrendingDown,
  Wallet,
  Trophy,
  BookOpen,
  Target,
  PieChart,
  BarChart3,
  Activity,
  Zap,
  Sparkles
} from "lucide-react";
// import { MarketNews } from "@/components/ai/MarketNews";
// import { PortfolioHealth } from "@/components/ai/PortfolioHealth";

type DashboardData = {
  user: {
    id: number;
    email: string;
    name: string | null;
    totalPoints: number;
    memberSince: string;
  };
  portfolio: {
    startingBalance: number;
    totalValue: number;
    availableCash: number;
    investedValue: number;
    currentValue: number;
    pnl: number;
    pnlPercent: number;
    holdingsCount: number;
  };
  holdings: {
    symbol: string;
    quantity: number;
    avgPrice: number;
    currentPrice: number;
    value: number;
    investedValue: number;
    pnl: number;
    pnlPercent: number;
  }[];
  recentTransactions: {
    id: number;
    symbol: string;
    type: string;
    quantity: number;
    price: number;
    total: number;
    timestamp: string;
  }[];
  stats: {
    lessonsCompleted: number;
    challengesCompleted: number;
  };
};

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  }).format(value);
}

function formatNumber(value: number): string {
  return new Intl.NumberFormat('en-IN').format(value);
}

// Skeleton loader component
function Skeleton({ className }: { className?: string }) {
  return (
    <div className={`animate-pulse bg-white/10 rounded ${className || ''}`} />
  );
}

export default function DashboardPage() {
  const { user } = useAuth();
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;

    const token = localStorage.getItem('accessToken');
    if (!token) return;

    fetch('/api/dashboard', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(res => {
        if (!res.ok) throw new Error('Failed to load dashboard');
        return res.json();
      })
      .then(setData)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [user]);

  // Auth handled by layout - show spinner while user loads
  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin" />
      </div>
    );
  }

  // Loading state
  if (loading) {
    return (
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <Skeleton className="h-4 w-32 mb-2" />
            <Skeleton className="h-10 w-48" />
          </div>
          <Skeleton className="h-10 w-32" />
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="p-6 rounded-xl border border-white/10 bg-white/5">
              <Skeleton className="h-4 w-24 mb-4" />
              <Skeleton className="h-8 w-32 mb-2" />
              <Skeleton className="h-4 w-16" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center space-y-4">
          <p className="text-red-400">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!data) return null;

  const { portfolio, holdings, recentTransactions, stats } = data;
  const isNewUser = holdings.length === 0 && recentTransactions.length === 0;

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <p className="text-sm text-white/50">
            Welcome back{data.user.name ? `, ${data.user.name}` : ""}
          </p>
          <h1 className="text-4xl font-bold mt-2">Dashboard</h1>
        </div>
        <div className="flex gap-3">
          <Link href="/dashboard/stocks">
            <button className="px-6 py-3 bg-white text-black font-medium rounded-lg hover:bg-white/90 transition-colors flex items-center gap-2">
              Start Trading <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
          <Link href="/dashboard/ai">
            <button className="px-6 py-3 bg-white/10 border border-white/20 text-white font-medium rounded-lg hover:bg-white/20 transition-all flex items-center gap-2">
              <Sparkles className="w-4 h-4" /> AI Features
            </button>
          </Link>
        </div>
      </div>

      {/* AI Market News */}
      {/* <MarketNews /> */}

      {/* Stats Grid - 6 cards (3 up, 3 down) */}
      <div className="grid gap-4 md:gap-6 grid-cols-2 lg:grid-cols-3">
        {/* Total Portfolio Value */}
        <div className="p-6 rounded-xl border border-white/10 bg-gradient-to-br from-blue-500/10 to-transparent">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-white/50">Total Portfolio</span>
            <PieChart className="w-5 h-5 text-blue-400" />
          </div>
          <p className="text-2xl font-bold text-white">{formatCurrency(portfolio.totalValue)}</p>
          <div className={`flex items-center gap-1 mt-2 text-sm ${portfolio.pnl >= 0 ? 'text-green-400' : 'text-red-400'}`}>
            {portfolio.pnl >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
            <span>{portfolio.pnl >= 0 ? '+' : ''}{formatCurrency(portfolio.pnl)} ({portfolio.pnlPercent}%)</span>
          </div>
        </div>

        {/* Available Cash */}
        <div className="p-6 rounded-xl border border-white/10 bg-white/5">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-white/50">Available Cash</span>
            <Wallet className="w-5 h-5 text-green-400" />
          </div>
          <p className="text-2xl font-bold text-white">{formatCurrency(portfolio.availableCash)}</p>
          <p className="text-sm text-white/40 mt-2">Ready to invest</p>
        </div>

        {/* Invested Value */}
        <div className="p-6 rounded-xl border border-white/10 bg-white/5">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-white/50">Invested</span>
            <BarChart3 className="w-5 h-5 text-purple-400" />
          </div>
          <p className="text-2xl font-bold text-white">{formatCurrency(portfolio.investedValue)}</p>
          <p className="text-sm text-white/40 mt-2">{portfolio.holdingsCount} stocks</p>
        </div>

        {/* Total Points */}
        <div className="p-6 rounded-xl border border-white/10 bg-white/5">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-white/50">Points</span>
            <Trophy className="w-5 h-5 text-yellow-400" />
          </div>
          <p className="text-2xl font-bold text-white">{formatNumber(data.user.totalPoints)}</p>
          <p className="text-sm text-white/40 mt-2">From challenges</p>
        </div>

        {/* Lessons Completed */}
        <div className="p-6 rounded-xl border border-white/10 bg-white/5">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-white/50">Lessons</span>
            <BookOpen className="w-5 h-5 text-blue-400" />
          </div>
          <p className="text-2xl font-bold text-white">{stats.lessonsCompleted}</p>
          <p className="text-sm text-white/40 mt-2">Completed</p>
        </div>

        {/* Challenges */}
        <div className="p-6 rounded-xl border border-white/10 bg-white/5">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-white/50">Challenges</span>
            <Target className="w-5 h-5 text-orange-400" />
          </div>
          <p className="text-2xl font-bold text-white">{stats.challengesCompleted}</p>
          <p className="text-sm text-white/40 mt-2">Completed</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
          <Link href="/dashboard/stocks" className="group">
            <div className="p-5 rounded-xl border border-white/10 bg-white/5 hover:border-blue-500/50 hover:bg-blue-500/10 transition-all">
              <TrendingUp className="w-6 h-6 text-blue-400 mb-3" />
              <h3 className="font-medium">Trade Stocks</h3>
              <p className="text-sm text-white/40 mt-1">Buy & sell</p>
            </div>
          </Link>
          <Link href="/dashboard/sip" className="group">
            <div className="p-5 rounded-xl border border-white/10 bg-white/5 hover:border-green-500/50 hover:bg-green-500/10 transition-all">
              <Activity className="w-6 h-6 text-green-400 mb-3" />
              <h3 className="font-medium">SIP Calculator</h3>
              <p className="text-sm text-white/40 mt-1">Plan investments</p>
            </div>
          </Link>
          <Link href="/dashboard/lessons" className="group">
            <div className="p-5 rounded-xl border border-white/10 bg-white/5 hover:border-purple-500/50 hover:bg-purple-500/10 transition-all">
              <BookOpen className="w-6 h-6 text-purple-400 mb-3" />
              <h3 className="font-medium">Learn</h3>
              <p className="text-sm text-white/40 mt-1">Take lessons</p>
            </div>
          </Link>
          <Link href="/dashboard/challenges" className="group">
            <div className="p-5 rounded-xl border border-white/10 bg-white/5 hover:border-orange-500/50 hover:bg-orange-500/10 transition-all">
              <Zap className="w-6 h-6 text-orange-400 mb-3" />
              <h3 className="font-medium">Challenges</h3>
              <p className="text-sm text-white/40 mt-1">Earn points</p>
            </div>
          </Link>
        </div>
      </div>

      {/* New User Welcome / Holdings */}
      {isNewUser ? (
        <div className="p-8 rounded-xl border border-white/10 bg-gradient-to-br from-blue-500/5 to-green-500/5 text-center">
          <div className="w-16 h-16 mx-auto bg-white/10 rounded-full flex items-center justify-center mb-6">
            <TrendingUp className="w-8 h-8 text-blue-400" />
          </div>
          <h3 className="text-2xl font-bold mb-2">Start Your Investment Journey</h3>
          <p className="text-white/60 mb-6 max-w-md mx-auto">
            You have {formatCurrency(portfolio.availableCash)} virtual cash ready to invest.
            Start by exploring stocks or learn the basics first.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/dashboard/stocks">
              <button className="px-6 py-3 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition-colors">
                Explore Stocks
              </button>
            </Link>
            <Link href="/dashboard/lessons">
              <button className="px-6 py-3 border border-white/20 text-white font-medium rounded-lg hover:bg-white/10 transition-colors">
                Start Learning
              </button>
            </Link>
          </div>
        </div>
      ) : (
        <>
          {/* Holdings Table */}
          {holdings.length > 0 && (
            <div className="rounded-xl border border-white/10 overflow-hidden">
              <div className="p-6 border-b border-white/10">
                <h2 className="text-xl font-semibold">Your Holdings</h2>
                <p className="text-sm text-white/40 mt-1">{holdings.length} stocks in portfolio</p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-white/5">
                    <tr className="text-left text-white/50">
                      <th className="px-6 py-4 font-medium">Symbol</th>
                      <th className="px-6 py-4 font-medium text-right">Qty</th>
                      <th className="px-6 py-4 font-medium text-right">Avg Price</th>
                      <th className="px-6 py-4 font-medium text-right">Current</th>
                      <th className="px-6 py-4 font-medium text-right">Value</th>
                      <th className="px-6 py-4 font-medium text-right">P&L</th>
                    </tr>
                  </thead>
                  <tbody>
                    {holdings.map((h) => (
                      <tr key={h.symbol} className="border-t border-white/5 hover:bg-white/5 transition-colors">
                        <td className="px-6 py-4 font-semibold">{h.symbol}</td>
                        <td className="px-6 py-4 text-right text-white/60">{h.quantity}</td>
                        <td className="px-6 py-4 text-right text-white/60">{formatCurrency(h.avgPrice)}</td>
                        <td className="px-6 py-4 text-right">{formatCurrency(h.currentPrice)}</td>
                        <td className="px-6 py-4 text-right font-medium">{formatCurrency(h.value)}</td>
                        <td className={`px-6 py-4 text-right font-semibold ${h.pnl >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                          {h.pnl >= 0 ? '+' : ''}{formatCurrency(h.pnl)} ({h.pnlPercent.toFixed(2)}%)
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Recent Transactions */}
          {recentTransactions.length > 0 && (
            <div className="rounded-xl border border-white/10 overflow-hidden">
              <div className="p-6 border-b border-white/10">
                <h2 className="text-xl font-semibold">Recent Activity</h2>
                <p className="text-sm text-white/40 mt-1">Latest transactions</p>
              </div>
              <div className="divide-y divide-white/5">
                {recentTransactions.slice(0, 5).map((tx) => (
                  <div key={tx.id} className="px-6 py-4 flex items-center justify-between hover:bg-white/5 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${tx.type === 'BUY' ? 'bg-green-500/20' : 'bg-red-500/20'
                        }`}>
                        {tx.type === 'BUY' ? (
                          <TrendingUp className={`w-5 h-5 text-green-400`} />
                        ) : (
                          <TrendingDown className={`w-5 h-5 text-red-400`} />
                        )}
                      </div>
                      <div>
                        <p className="font-medium">{tx.symbol}</p>
                        <p className="text-sm text-white/40">
                          <span className={tx.type === 'BUY' ? 'text-green-400' : 'text-red-400'}>{tx.type}</span>
                          {' '}• {tx.quantity} shares
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{formatCurrency(tx.total)}</p>
                      <p className="text-sm text-white/40">{new Date(tx.timestamp).toLocaleDateString()}</p>
                    </div>
                  </div>
                ))}
              </div>
              {recentTransactions.length > 5 && (
                <Link href="/dashboard/portfolio" className="block p-4 text-center text-sm text-white/60 hover:text-white hover:bg-white/5 transition-colors border-t border-white/5">
                  View all transactions
                </Link>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}
