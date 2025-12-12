"use client";

import { useMemo } from "react";
import { Activity, Sparkles, TrendingUp, AlertTriangle } from "lucide-react";
import { useAuth } from "@/lib/auth-context";

type RiskLevel = 'Low' | 'Moderate' | 'High';

function calculateHealthScore(portfolioValue: number, cashBalance: number): { score: number; riskLevel: RiskLevel; verdict: string } {
    const total = portfolioValue + cashBalance;
    const cashPercent = (cashBalance / total) * 100;
    const investedPercent = 100 - cashPercent;

    let score = 50; // Start at neutral
    let riskLevel: RiskLevel = 'Moderate';
    let verdict = '';

    // Adjust score based on cash allocation
    if (cashPercent > 80) {
        score = 40;
        verdict = "Too much cash sitting idle. Consider investing for growth.";
        riskLevel = 'Low';
    } else if (cashPercent > 60) {
        score = 55;
        verdict = "Conservative approach. Good for safety, but might miss opportunities.";
        riskLevel = 'Low';
    } else if (cashPercent >= 20 && cashPercent <= 40) {
        score = 85;
        verdict = "Well-balanced portfolio! Great mix of investments and liquidity.";
        riskLevel = 'Moderate';
    } else if (cashPercent >= 10 && cashPercent < 20) {
        score = 70;
        verdict = "Good investment ratio. Keep some emergency cash though.";
        riskLevel = 'Moderate';
    } else if (cashPercent < 10) {
        score = 55;
        verdict = "Highly invested. Consider keeping more cash for opportunities.";
        riskLevel = 'High';
    } else {
        score = 65;
        verdict = "Decent allocation. Room for optimization.";
        riskLevel = 'Moderate';
    }

    // Bonus for growing portfolio
    if (portfolioValue > 100000) {
        score = Math.min(100, score + 5);
    }

    return { score, riskLevel, verdict };
}

export function PortfolioHealth() {
    const { user } = useAuth();

    const healthData = useMemo(() => {
        if (!user) return { score: 50, riskLevel: 'Moderate' as RiskLevel, verdict: 'Loading...' };
        return calculateHealthScore(
            Number(user.portfolioValue) || 0,
            Number(user.virtualBalance) || 100000
        );
    }, [user]);

    const getScoreColor = (score: number) => {
        if (score >= 80) return 'text-green-400';
        if (score >= 50) return 'text-yellow-400';
        return 'text-red-400';
    };

    const getRiskColor = (risk: RiskLevel) => {
        if (risk === 'Low') return 'text-green-400 border-green-500/30 bg-green-500/10';
        if (risk === 'Moderate') return 'text-yellow-400 border-yellow-500/30 bg-yellow-500/10';
        return 'text-red-400 border-red-500/30 bg-red-500/10';
    };

    if (!user) return null;

    return (
        <div className="p-6 rounded-xl border border-white/10 bg-white/5 h-full">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <Activity className="w-5 h-5 text-purple-400" />
                    <span className="text-sm text-white/50">Portfolio Health</span>
                </div>
                <span className="text-[10px] bg-purple-500/20 text-purple-400 px-2 py-0.5 rounded-full border border-purple-500/20 flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> AI
                </span>
            </div>

            <div className="flex items-center gap-4 mb-3">
                <p className={`text-4xl font-bold ${getScoreColor(healthData.score)}`}>{healthData.score}</p>
                <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getRiskColor(healthData.riskLevel)}`}>
                    {healthData.riskLevel} Risk
                </span>
            </div>

            <p className="text-sm text-white/60 leading-relaxed">
                {healthData.verdict}
            </p>
        </div>
    );
}
