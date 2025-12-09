"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { api } from "@/lib/api";
import Link from "next/link";
import { Search, TrendingUp, TrendingDown, ArrowLeft, Wallet } from "lucide-react";

type Stock = {
  symbol: string;
  name: string;
  sector: string;
  price: number;
};

type Quote = {
  symbol: string;
  name: string;
  sector: string;
  price: string;
  change: string;
  changePercent: string;
};

export default function StockSearchTradePage() {
  const { user, refreshUser } = useAuth();
  const router = useRouter();
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSymbol, setSelectedSymbol] = useState<string | null>(null);
  const [quote, setQuote] = useState<Quote | null>(null);
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(false);
  const [trading, setTrading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Load all stocks on mount
  useEffect(() => {
    fetch("/api/stocks/quote?list=true")
      .then(res => res.json())
      .then(data => setStocks(data.stocks || []))
      .catch(console.error);
  }, []);

  // Fetch quote when stock selected
  useEffect(() => {
    if (selectedSymbol) {
      fetchQuote(selectedSymbol);
    }
  }, [selectedSymbol]);

  const fetchQuote = async (symbol: string) => {
    setLoading(true);
    setError("");
    try {
      const data = await api.stocks.quote(symbol);
      setQuote(data);
    } catch (err: any) {
      setError(err.message || "Failed to fetch quote");
      setQuote(null);
    } finally {
      setLoading(false);
    }
  };

  const handleTrade = async (type: "BUY" | "SELL") => {
    if (!quote || !user) return;

    setTrading(true);
    setError("");
    setSuccess("");

    try {
      await api.stocks.trade(selectedSymbol!, type, qty, parseFloat(quote.price));
      setSuccess(`Successfully ${type === "BUY" ? "bought" : "sold"} ${qty} shares of ${selectedSymbol} at ₹${quote.price}`);
      refreshUser();
      setQty(1);
      setTimeout(() => setSuccess(""), 5000);
    } catch (err: any) {
      setError(err.message || "Trade failed");
    } finally {
      setTrading(false);
    }
  };

  const filteredStocks = stocks.filter(s =>
    s.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const price = quote ? parseFloat(quote.price) : 0;
  const total = qty * price;
  const canBuy = user && total <= Number(user.virtualBalance);

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <p className="text-white/60 mb-4">Please log in to trade stocks</p>
          <Link href="/login">
            <button className="px-6 py-3 bg-white text-black font-medium rounded-lg">Login</button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/stocks" className="p-2 hover:bg-white/10 rounded-lg transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold">Search & Trade</h1>
            <p className="text-white/50 mt-1">Select a stock to buy or sell</p>
          </div>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 rounded-lg border border-white/10 bg-white/5">
          <Wallet className="w-4 h-4 text-green-400" />
          <span className="text-sm text-white/60">Balance:</span>
          <span className="font-bold text-white">₹{Number(user.virtualBalance).toLocaleString()}</span>
        </div>
      </div>

      {/* Alerts */}
      {error && (
        <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400">
          {error}
        </div>
      )}
      {success && (
        <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400">
          {success}
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-[1fr_400px]">
        {/* Stock Browser */}
        <div className="rounded-xl border border-white/10 overflow-hidden">
          <div className="p-4 border-b border-white/10">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
              <input
                type="text"
                placeholder="Search stocks... (RELIANCE, TCS, INFY)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/30 focus:outline-none focus:border-white/30"
              />
            </div>
          </div>
          <div className="max-h-[500px] overflow-y-auto">
            {filteredStocks.map((stock) => (
              <button
                key={stock.symbol}
                onClick={() => setSelectedSymbol(stock.symbol)}
                className={`w-full px-4 py-3 flex items-center justify-between border-b border-white/5 transition-colors ${selectedSymbol === stock.symbol ? 'bg-blue-500/20' : 'hover:bg-white/5'
                  }`}
              >
                <div className="text-left">
                  <p className="font-semibold text-white">{stock.symbol}</p>
                  <p className="text-sm text-white/40">{stock.name}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-white">₹{stock.price.toLocaleString()}</p>
                  <p className="text-xs text-white/40">{stock.sector}</p>
                </div>
              </button>
            ))}
            {filteredStocks.length === 0 && (
              <div className="p-8 text-center text-white/40">
                No stocks found matching "{searchQuery}"
              </div>
            )}
          </div>
        </div>

        {/* Trade Panel */}
        <div className="rounded-xl border border-white/10 overflow-hidden h-fit">
          {selectedSymbol && quote ? (
            <>
              {/* Quote Header */}
              <div className="p-6 border-b border-white/10 bg-white/5">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-white">{quote.symbol}</h2>
                    <p className="text-sm text-white/50">{quote.name}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-white">₹{parseFloat(quote.price).toLocaleString()}</p>
                    <p className={`text-sm flex items-center gap-1 justify-end ${parseFloat(quote.changePercent) >= 0 ? 'text-green-400' : 'text-red-400'
                      }`}>
                      {parseFloat(quote.changePercent) >= 0 ? (
                        <TrendingUp className="w-4 h-4" />
                      ) : (
                        <TrendingDown className="w-4 h-4" />
                      )}
                      {parseFloat(quote.changePercent) >= 0 ? '+' : ''}{quote.changePercent}%
                    </p>
                  </div>
                </div>
                <p className="text-xs text-white/30 mt-2">{quote.sector}</p>
              </div>

              {/* Trade Form */}
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm text-white/50 mb-2">Quantity</label>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setQty(Math.max(1, qty - 1))}
                      className="w-10 h-10 flex items-center justify-center rounded-lg border border-white/20 hover:bg-white/10"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      min={1}
                      value={qty}
                      onChange={(e) => setQty(Math.max(1, Number(e.target.value)))}
                      className="flex-1 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-center text-white text-lg font-bold focus:outline-none focus:border-white/30"
                    />
                    <button
                      onClick={() => setQty(qty + 1)}
                      className="w-10 h-10 flex items-center justify-center rounded-lg border border-white/20 hover:bg-white/10"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Total */}
                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <div className="flex items-center justify-between">
                    <span className="text-white/60">Total Value</span>
                    <span className="text-xl font-bold text-white">₹{total.toLocaleString()}</span>
                  </div>
                </div>

                {/* Insufficient Balance Warning */}
                {!canBuy && total > 0 && (
                  <p className="text-sm text-red-400">Insufficient balance for this purchase</p>
                )}

                {/* Trade Buttons */}
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => handleTrade("BUY")}
                    disabled={!canBuy || trading}
                    className="py-3 bg-green-500 text-white font-medium rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {trading ? "Processing..." : "Buy"}
                  </button>
                  <button
                    onClick={() => handleTrade("SELL")}
                    disabled={trading}
                    className="py-3 bg-white/10 text-white font-medium rounded-lg hover:bg-white/20 transition-colors border border-white/20"
                  >
                    {trading ? "Processing..." : "Sell"}
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="p-12 text-center">
              <Search className="w-12 h-12 mx-auto text-white/20 mb-4" />
              <p className="text-white/40">Select a stock from the list to trade</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
