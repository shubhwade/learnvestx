"use client";

import { useEffect, useState, useCallback } from "react";
import { useAuth } from "@/lib/auth-context";
import { api } from "@/lib/api";
import { getAllStockPrices, getStockInfo, formatCurrency } from "@/lib/stocks";
import Link from "next/link";
import {
  TrendingUp,
  TrendingDown,
  Search,
  Wallet,
  PieChart,
  ArrowRight,
  RefreshCw
} from "lucide-react";
import { BrokerComparisonBanner } from "@/components/monetization/AffiliateBanner";

type Holding = {
  stockSymbol: string;
  quantity: number;
  avgPrice: string | number;
};

type Transaction = {
  id: number;
  stockSymbol: string;
  type: "BUY" | "SELL";
  quantity: number;
  price: string | number;
  timestamp: string;
};

type StockPrice = {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
};

export default function StockSimulatorPage() {
  const { user } = useAuth();
  const [holdings, setHoldings] = useState<Holding[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [stockPrices, setStockPrices] = useState<StockPrice[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());

  // Fetch stock prices (runs every second)
  const updatePrices = useCallback(() => {
    const prices = getAllStockPrices();
    setStockPrices(prices);
    setLastUpdate(new Date());
  }, []);

  useEffect(() => {
    // Initial fetch
    updatePrices();

    // Set up interval for real-time updates
    const interval = setInterval(updatePrices, 1000);

    // Cleanup
    return () => clearInterval(interval);
  }, [updatePrices]);

  useEffect(() => {
    if (user) {
      Promise.all([api.stocks.holdings(), api.stocks.transactions(10)])
        .then(([h, t]) => {
          setHoldings(h);
          setTransactions(t);
        })
        .catch(console.error)
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [user]);

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin" />
      </div>
    );
  }

  const portfolioValue = Number(user.portfolioValue) || 0;
  const virtualBalance = Number(user.virtualBalance) || 100000;
  const totalValue = portfolioValue + virtualBalance;
  const pnl = totalValue - 100000;
  const pnlPercent = (pnl / 100000) * 100;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold">Stock Simulator</h1>
          <p className="text-white/50 mt-2">Virtual trading with real market data</p>
        </div>
        <Link href="/dashboard/stocks/search">
          <button className="px-6 py-3 bg-white text-black font-medium rounded-lg hover:bg-white/90 transition-colors flex items-center gap-2">
            <Search className="w-4 h-4" />
            Search & Trade
          </button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:gap-6 grid-cols-2 lg:grid-cols-4">
        {/* Total Value */}
        <div className="col-span-2 p-6 rounded-xl border border-white/10 bg-gradient-to-br from-blue-500/10 to-transparent">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-white/50">Total Value</span>
            <PieChart className="w-5 h-5 text-blue-400" />
          </div>
          <p className="text-2xl font-bold text-white">₹{totalValue.toLocaleString()}</p>
          <div className={`flex items-center gap-1 mt-2 text-sm ${pnl >= 0 ? 'text-green-400' : 'text-red-400'}`}>
            {pnl >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
            <span>{pnl >= 0 ? '+' : ''}₹{pnl.toLocaleString()} ({pnlPercent.toFixed(2)}%)</span>
          </div>
        </div>

        {/* Available Cash */}
        <div className="p-6 rounded-xl border border-white/10 bg-white/5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-white/50">Available Cash</span>
            <Wallet className="w-5 h-5 text-green-400" />
          </div>
          <p className="text-2xl font-bold text-white">₹{virtualBalance.toLocaleString()}</p>
          <p className="text-sm text-white/40 mt-2">Ready to invest</p>
        </div>

        {/* Portfolio */}
        <div className="p-6 rounded-xl border border-white/10 bg-white/5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-white/50">Portfolio</span>
            <TrendingUp className="w-5 h-5 text-purple-400" />
          </div>
          <p className="text-2xl font-bold text-white">₹{portfolioValue.toLocaleString()}</p>
          <p className="text-sm text-white/40 mt-2">{holdings.length} stocks</p>
        </div>
      </div>

      {/* Popular Stocks - Real-time */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-semibold">Live Market</h2>
            <span className="flex items-center gap-1 text-xs text-green-400 bg-green-500/20 px-2 py-1 rounded-full">
              <RefreshCw className="w-3 h-3 animate-spin" />
              Live
            </span>
          </div>
          <Link href="/dashboard/stocks/search" className="text-sm text-white/50 hover:text-white flex items-center gap-1">
            Trade <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid gap-3 grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {stockPrices.slice(0, 10).map((stock) => {
            const isUp = stock.changePercent >= 0;
            const stockInfo = getStockInfo(stock.symbol);

            return (
              <Link key={stock.symbol} href={`/dashboard/stocks/search?symbol=${stock.symbol}`}>
                <div className="p-4 rounded-xl border border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10 transition-all cursor-pointer">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-semibold text-white text-sm">{stock.symbol}</p>
                    {isUp ? (
                      <TrendingUp className="w-4 h-4 text-green-400" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-red-400" />
                    )}
                  </div>
                  <p className="text-xs text-white/40 mb-2 truncate">{stockInfo?.name}</p>
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-white text-sm">₹{stock.price.toLocaleString()}</p>
                    <span className={`text-xs font-medium ${isUp ? 'text-green-400' : 'text-red-400'}`}>
                      {isUp ? '+' : ''}{stock.changePercent.toFixed(2)}%
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Holdings */}
      {holdings.length > 0 ? (
        <div className="rounded-xl border border-white/10 overflow-hidden">
          <div className="p-6 border-b border-white/10 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold">Your Holdings</h2>
              <p className="text-sm text-white/40 mt-1">{holdings.length} stocks in portfolio</p>
            </div>
            <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-xs">Live</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-white/5">
                <tr className="text-left text-white/50">
                  <th className="px-6 py-4 font-medium">Symbol</th>
                  <th className="px-6 py-4 font-medium text-right">Qty</th>
                  <th className="px-6 py-4 font-medium text-right">Avg Price</th>
                  <th className="px-6 py-4 font-medium text-right">Value</th>
                  <th className="px-6 py-4 font-medium text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {holdings.map((h) => {
                  const avgPrice = Number(h.avgPrice);
                  const value = avgPrice * h.quantity;
                  return (
                    <tr key={h.stockSymbol} className="border-t border-white/5 hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4 font-semibold text-white">{h.stockSymbol}</td>
                      <td className="px-6 py-4 text-right text-white/60">{h.quantity}</td>
                      <td className="px-6 py-4 text-right text-white/60">₹{avgPrice.toFixed(2)}</td>
                      <td className="px-6 py-4 text-right font-medium text-white">₹{value.toLocaleString()}</td>
                      <td className="px-6 py-4 text-right">
                        <Link href={`/dashboard/stocks/search?symbol=${h.stockSymbol}`}>
                          <button className="px-3 py-1 text-xs bg-white/10 hover:bg-white/20 rounded-lg transition-colors">
                            Trade
                          </button>
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : !loading && (
        <div className="p-12 rounded-xl border border-white/10 text-center">
          <TrendingUp className="w-12 h-12 mx-auto text-white/20 mb-4" />
          <h3 className="text-lg font-semibold mb-2">No holdings yet</h3>
          <p className="text-white/50 mb-6">Start your investment journey with ₹{virtualBalance.toLocaleString()} virtual cash</p>
          <Link href="/dashboard/stocks/search">
            <button className="px-6 py-3 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition-colors">
              Start Trading
            </button>
          </Link>
        </div>
      )}

      {/* Transactions */}
      {transactions.length > 0 && (
        <div className="rounded-xl border border-white/10 overflow-hidden">
          <div className="p-6 border-b border-white/10">
            <h2 className="text-xl font-semibold">Recent Transactions</h2>
            <p className="text-sm text-white/40 mt-1">{transactions.length} trades</p>
          </div>
          <div className="divide-y divide-white/5">
            {transactions.slice(0, 5).map((tx) => (
              <div key={tx.id} className="px-6 py-4 flex items-center justify-between hover:bg-white/5 transition-colors">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${tx.type === 'BUY' ? 'bg-green-500/20' : 'bg-red-500/20'
                    }`}>
                    {tx.type === 'BUY' ? (
                      <TrendingUp className="w-5 h-5 text-green-400" />
                    ) : (
                      <TrendingDown className="w-5 h-5 text-red-400" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-white">{tx.stockSymbol}</p>
                    <p className="text-sm text-white/40">
                      <span className={tx.type === 'BUY' ? 'text-green-400' : 'text-red-400'}>{tx.type}</span>
                      {' '}• {tx.quantity} shares
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-white">₹{(Number(tx.price) * tx.quantity).toLocaleString()}</p>
                  <p className="text-sm text-white/40">{new Date(tx.timestamp).toLocaleDateString()}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* Affiliate Banner - Monetization */}
      <BrokerComparisonBanner />
    </div>
  );
}
