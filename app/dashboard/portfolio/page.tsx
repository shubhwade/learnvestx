"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { api } from "@/lib/api";
import Link from "next/link";
import { TrendingUp, TrendingDown } from "lucide-react";

export default function PortfolioPage() {
  const { user } = useAuth();
  const [holdings, setHoldings] = useState<any[]>([]);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      Promise.all([api.stocks.holdings(), api.stocks.transactions(20)])
        .then(([h, t]) => {
          setHoldings(h);
          setTransactions(t);
        })
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [user]);

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <p className="text-sm text-white/50">Positions and history</p>
        <h1 className="text-4xl font-bold mt-2">Portfolio</h1>
      </div>

      {/* Holdings */}
      <div className="rounded-xl border border-white/10 overflow-hidden">
        <div className="p-6 border-b border-white/10">
          <h2 className="text-xl font-semibold">Holdings</h2>
          <p className="text-sm text-white/40 mt-1">{holdings.length} stocks</p>
        </div>
        {holdings.length > 0 ? (
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
                {holdings.map((h) => {
                  const avgPrice = Number(h.avgPrice);
                  const currentPrice = avgPrice; // Same as avg for now
                  const value = currentPrice * h.quantity;
                  const pnl = (currentPrice - avgPrice) * h.quantity;
                  const pct = avgPrice > 0 ? ((currentPrice - avgPrice) / avgPrice) * 100 : 0;
                  return (
                    <tr key={h.stockSymbol} className="border-t border-white/5 hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4 font-semibold text-white">{h.stockSymbol}</td>
                      <td className="px-6 py-4 text-right text-white/60">{h.quantity}</td>
                      <td className="px-6 py-4 text-right text-white/60">₹{avgPrice.toFixed(2)}</td>
                      <td className="px-6 py-4 text-right text-white">₹{currentPrice.toFixed(2)}</td>
                      <td className="px-6 py-4 text-right font-medium text-white">₹{value.toFixed(2)}</td>
                      <td className={`px-6 py-4 text-right font-semibold ${pnl >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {pnl >= 0 ? '+' : ''}₹{pnl.toFixed(2)} ({pct.toFixed(2)}%)
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-12 text-center text-white/40">
            No holdings yet. <Link href="/dashboard/stocks" className="text-blue-400 hover:underline">Start trading</Link>
          </div>
        )}
      </div>

      {/* Transactions */}
      <div className="rounded-xl border border-white/10 overflow-hidden">
        <div className="p-6 border-b border-white/10">
          <h2 className="text-xl font-semibold">Transaction History</h2>
          <p className="text-sm text-white/40 mt-1">{transactions.length} transactions</p>
        </div>
        {transactions.length > 0 ? (
          <div className="divide-y divide-white/5">
            {transactions.map((tx) => (
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
                  <p className="font-medium text-white">₹{(Number(tx.price) * tx.quantity).toFixed(2)}</p>
                  <p className="text-sm text-white/40">{new Date(tx.timestamp).toLocaleDateString()}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-12 text-center text-white/40">
            No transactions yet. <Link href="/dashboard/stocks" className="text-blue-400 hover:underline">Start trading</Link>
          </div>
        )}
      </div>
    </div>
  );
}
