"use client";

import { useMemo, useState, useEffect } from "react";
import { useAuth } from "@/lib/auth-context";
import { api } from "@/lib/api";
import Link from "next/link";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { TrendingUp, History, Calculator, ArrowRight } from "lucide-react";

function simulateSIP(amount: number, months: number, expected: number) {
  const r = expected / 100;
  const fv = amount * (((1 + r / 12) ** months - 1) / (r / 12));
  const series = Array.from({ length: months }, (_, i) => {
    const m = i + 1;
    const value = amount * (((1 + r / 12) ** m - 1) / (r / 12));
    return { month: m, value };
  });
  return { fv, series };
}

export default function SIPPage() {
  const { user } = useAuth();
  const [amount, setAmount] = useState(5000);
  const [months, setMonths] = useState(60);
  const [expected, setExpected] = useState(12);
  const [fundName, setFundName] = useState("");
  const [saving, setSaving] = useState(false);
  const [savedSimulations, setSavedSimulations] = useState<any[]>([]);
  const [loadingHistory, setLoadingHistory] = useState(true);

  const { fv, series } = useMemo(() => simulateSIP(amount, months, expected), [
    amount,
    months,
    expected
  ]);
  const invested = amount * months;
  const profit = fv - invested;

  useEffect(() => {
    if (user) {
      loadHistory();
    }
  }, [user]);

  const loadHistory = async () => {
    try {
      const data = await api.sip.list();
      setSavedSimulations(data);
    } catch (err) {
      console.error("Failed to load history:", err);
    } finally {
      setLoadingHistory(false);
    }
  };

  const handleSave = async () => {
    if (!user || !fundName.trim()) return;

    setSaving(true);
    try {
      await api.sip.simulate(fundName, amount, months, expected);
      setFundName("");
      loadHistory(); // Refresh list
    } catch (err) {
      console.error("Failed to save:", err);
    } finally {
      setSaving(false);
    }
  };

  const loadSimulation = (sim: any) => {
    setFundName(sim.fundName);
    setAmount(sim.sipAmount);
    setMonths(sim.durationMonths);
    setExpected(sim.expectedReturn);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold">SIP Calculator</h1>
          <p className="text-white/50 mt-2">Plan your wealth creation journey</p>
        </div>
        {!user && (
          <Link href="/login">
            <button className="px-6 py-3 bg-white text-black font-medium rounded-lg hover:bg-white/90 transition-colors">
              Login to Save
            </button>
          </Link>
        )}
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr]">
        {/* Calculator */}
        <div className="space-y-6">
          <div className="p-6 rounded-xl border border-white/10 bg-white/5">
            <div className="flex items-center gap-2 mb-6">
              <Calculator className="w-5 h-5 text-blue-400" />
              <h2 className="text-xl font-semibold">Configuration</h2>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label className="block text-sm text-white/50 mb-2">Fund Name (Optional)</label>
                <input
                  value={fundName}
                  onChange={(e) => setFundName(e.target.value)}
                  placeholder="e.g., Nifty 50 Index Fund"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/20 focus:outline-none focus:border-blue-500/50 transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm text-white/50 mb-2">Monthly Investment (₹)</label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white font-bold focus:outline-none focus:border-blue-500/50 transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm text-white/50 mb-2">Duration (Months)</label>
                <div className="flex items-center gap-2">
                  <input
                    type="range"
                    min="12"
                    max="360"
                    step="12"
                    value={months}
                    onChange={(e) => setMonths(Number(e.target.value))}
                    className="flex-1"
                  />
                  <span className="w-16 text-right font-medium text-white">{months}m</span>
                </div>
              </div>
              <div>
                <label className="block text-sm text-white/50 mb-2">Expected Return (% p.a)</label>
                <div className="flex items-center gap-2">
                  <input
                    type="range"
                    min="5"
                    max="30"
                    step="0.5"
                    value={expected}
                    onChange={(e) => setExpected(Number(e.target.value))}
                    className="flex-1"
                  />
                  <span className="w-16 text-right font-medium text-white">{expected}%</span>
                </div>
              </div>
            </div>

            {/* Chart */}
            <div className="mt-8 h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={series}>
                  <XAxis
                    dataKey="month"
                    stroke="rgba(255,255,255,0.2)"
                    tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 12 }}
                    tickFormatter={(v) => `${(v / 12).toFixed(0)}y`}
                  />
                  <YAxis
                    stroke="rgba(255,255,255,0.2)"
                    tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 12 }}
                    tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`}
                  />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#111', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                    labelStyle={{ color: 'rgba(255,255,255,0.5)' }}
                    itemStyle={{ color: '#fff' }}
                    formatter={(v: number) => [`₹${v.toFixed(0)}`, 'Value']}
                    labelFormatter={(v) => `Month ${v}`}
                  />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#3B82F6"
                    strokeWidth={3}
                    dot={false}
                    activeDot={{ r: 6, fill: '#3B82F6', stroke: '#fff', strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Helper Text */}
          <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-200 text-sm flex items-start gap-3">
            <TrendingUp className="w-5 h-5 shrink-0" />
            <p>
              Investing <strong>₹{amount.toLocaleString()}</strong> monthly for <strong>{months / 12} years</strong> at <strong>{expected}%</strong> return could grow your wealth significantly due to the power of compounding.
            </p>
          </div>
        </div>

        {/* Results & History */}
        <div className="space-y-6">
          {/* Results Card */}
          <div className="p-6 rounded-xl border border-white/10 bg-gradient-to-br from-green-500/10 to-transparent">
            <h2 className="text-xl font-semibold mb-6">Projection</h2>
            <div className="space-y-6">
              <div>
                <p className="text-sm text-white/50 mb-1">Total Investment</p>
                <p className="text-2xl font-bold text-white">₹{invested.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-white/50 mb-1">Estimated Returns</p>
                <p className="text-2xl font-bold text-green-400">₹{profit.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
              </div>
              <div className="pt-4 border-t border-white/10">
                <p className="text-sm text-white/50 mb-1">Maturity Value</p>
                <p className="text-4xl font-bold text-white">₹{fv.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
              </div>
            </div>

            {user && (
              <button
                onClick={handleSave}
                disabled={saving || !fundName.trim()}
                className="w-full mt-8 py-3 bg-white text-black font-medium rounded-lg hover:bg-white/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saving ? "Saving..." : "Save Projection"}
              </button>
            )}
          </div>

          {/* History List */}
          {user && (
            <div className="rounded-xl border border-white/10 overflow-hidden">
              <div className="p-4 border-b border-white/10 flex items-center gap-2 bg-white/5">
                <History className="w-4 h-4 text-white/40" />
                <h3 className="font-medium">Saved Simulations</h3>
              </div>
              <div className="max-h-[300px] overflow-y-auto">
                {savedSimulations.length > 0 ? (
                  savedSimulations.map((sim, i) => (
                    <div
                      key={sim.id || i}
                      onClick={() => loadSimulation(sim)}
                      className="p-4 border-b border-white/5 hover:bg-white/5 cursor-pointer transition-colors group"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <p className="font-medium text-white">{sim.fundName}</p>
                        <ArrowRight className="w-4 h-4 text-white/20 group-hover:text-white/60 transition-colors" />
                      </div>
                      <p className="text-xs text-white/40">
                        ₹{sim.sipAmount}/m • {sim.durationMonths}m • {sim.expectedReturn}%
                      </p>
                    </div>
                  ))
                ) : (
                  <div className="p-8 text-center text-white/30 text-sm">
                    No saved simulations yet
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
