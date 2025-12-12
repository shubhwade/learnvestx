"use client";

import { useState, useRef, useEffect, FormEvent } from "react";
import { Bot, Send, Sparkles, Newspaper, TrendingUp, TrendingDown, Activity, ArrowLeft, Loader2 } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import Link from "next/link";

// ===== TYPES =====
type Message = { id: string; role: "user" | "assistant"; content: string };
type Headline = { id: number; text: string; sentiment: 'positive' | 'negative' | 'neutral'; relatedStock: string };
type RiskLevel = 'Low' | 'Moderate' | 'High';

type Holding = {
    symbol: string;
    quantity: number;
    avgPrice: number;
    currentPrice: number;
    value: number;
    pnl: number;
    pnlPercent: number;
};

type DashboardData = {
    portfolio: {
        totalValue: number;
        availableCash: number;
        investedValue: number;
        pnl: number;
        pnlPercent: number;
    };
    holdings: Holding[];
    recentTransactions: { type: string; symbol: string; quantity: number; price: number; createdAt: string }[];
};

// ===== SMART RESPONSES (Uses real data) =====
function generateResponse(input: string, userName: string, data: DashboardData | null): string {
    const lowerInput = input.toLowerCase();

    if (!data) {
        return "I'm still loading your portfolio data. Please try again in a moment!";
    }

    const { portfolio, holdings, recentTransactions } = data;

    // Portfolio questions
    if (lowerInput.includes("portfolio") || lowerInput.includes("how am i doing")) {
        const status = portfolio.pnl >= 0 ? "in profit" : "at a loss";
        return `Your portfolio is worth **₹${portfolio.totalValue.toLocaleString('en-IN')}** (${status} by ₹${Math.abs(portfolio.pnl).toLocaleString('en-IN')} / ${portfolio.pnlPercent}%).\n\nYou have **${holdings.length} stocks** and **₹${portfolio.availableCash.toLocaleString('en-IN')}** in cash.`;
    }

    // Holdings analysis
    if (lowerInput.includes("holdings") || lowerInput.includes("stocks") || lowerInput.includes("what do i own")) {
        if (holdings.length === 0) {
            return "You don't own any stocks yet! Go to the Simulator to start trading.";
        }
        const holdingsList = holdings.map(h =>
            `• **${h.symbol}**: ${h.quantity} shares @ ₹${h.currentPrice.toFixed(2)} (${h.pnl >= 0 ? '+' : ''}${h.pnlPercent.toFixed(1)}%)`
        ).join('\n');
        return `Here are your current holdings:\n\n${holdingsList}`;
    }

    // Specific stock check
    const stockMatch = holdings.find(h => lowerInput.includes(h.symbol.toLowerCase()));
    if (stockMatch) {
        const status = stockMatch.pnl >= 0 ? "up" : "down";
        return `You own **${stockMatch.quantity} shares of ${stockMatch.symbol}** bought at ₹${stockMatch.avgPrice.toFixed(2)}.\n\nCurrent price: ₹${stockMatch.currentPrice.toFixed(2)} (${status} ${Math.abs(stockMatch.pnlPercent).toFixed(1)}%)\nTotal value: ₹${stockMatch.value.toLocaleString('en-IN')}\nP&L: ${stockMatch.pnl >= 0 ? '+' : ''}₹${stockMatch.pnl.toFixed(2)}`;
    }

    // Recent activity
    if (lowerInput.includes("recent") || lowerInput.includes("transaction") || lowerInput.includes("activity")) {
        if (recentTransactions.length === 0) {
            return "No recent transactions. Start trading to see your activity here!";
        }
        const txList = recentTransactions.slice(0, 3).map(tx =>
            `• ${tx.type} ${tx.quantity} ${tx.symbol} @ ₹${tx.price.toFixed(2)}`
        ).join('\n');
        return `Your recent transactions:\n\n${txList}`;
    }

    // Sell advice
    if (lowerInput.includes("sell")) {
        if (holdings.length === 0) {
            return "You don't have any holdings to sell!";
        }
        const profitableHoldings = holdings.filter(h => h.pnl > 0);
        if (profitableHoldings.length > 0) {
            const bestPerformer = profitableHoldings.reduce((a, b) => a.pnlPercent > b.pnlPercent ? a : b);
            return `Your best performer is **${bestPerformer.symbol}** (up ${bestPerformer.pnlPercent.toFixed(1)}%). You could consider booking profits, but remember: "Let your winners run!" is a common strategy.`;
        }
        return "All your holdings are currently at a loss. Selling now would lock in losses. Consider holding if you believe in the stocks long-term.";
    }

    // Buy advice
    if (lowerInput.includes("buy")) {
        const cashPercent = (portfolio.availableCash / portfolio.totalValue) * 100;
        if (cashPercent < 10) {
            return `You only have ${cashPercent.toFixed(0)}% cash left. Consider keeping some cash for opportunities!`;
        }
        return `You have ₹${portfolio.availableCash.toLocaleString('en-IN')} available to invest. Look for stocks with good fundamentals. Visit the Simulator to browse available stocks!`;
    }

    // General concepts
    if (lowerInput.includes("p/e") || lowerInput.includes("pe ratio")) {
        return "**P/E Ratio** shows how much investors pay per rupee of earnings. Lower P/E might mean undervalued, higher P/E suggests growth expectations.";
    }
    if (lowerInput.includes("sip")) {
        return "**SIP** is Systematic Investment Plan - invest a fixed amount regularly to average out market volatility.";
    }
    if (lowerInput.includes("diversify") || lowerInput.includes("diversification")) {
        return "**Diversification** means spreading investments across sectors to reduce risk. Check if your holdings are concentrated in one sector!";
    }

    // Default
    return `I understand you're asking about "${input}". Try asking about your portfolio, specific stocks you own (like "${holdings[0]?.symbol || 'TCS'}"), or investment concepts like P/E ratio!`;
}

// ===== NEWS GENERATION (Based on actual holdings) =====
function generateNewsForHoldings(holdings: Holding[]): Headline[] {
    if (holdings.length === 0) {
        return [
            { id: 1, text: "Markets open steady amid mixed global cues", sentiment: "neutral", relatedStock: "NIFTY50" },
            { id: 2, text: "IT sector sees renewed interest from FIIs", sentiment: "positive", relatedStock: "TCS" },
            { id: 3, text: "Banking stocks consolidate after recent rally", sentiment: "neutral", relatedStock: "HDFCBANK" },
        ];
    }

    return holdings.slice(0, 3).map((h, i) => {
        const isPositive = h.pnl >= 0;
        const newsTemplates = isPositive ? [
            `${h.symbol} rallies ${h.pnlPercent.toFixed(1)}% on strong buying interest`,
            `${h.symbol} surges as investors show confidence`,
            `${h.symbol} gains momentum, up ${h.pnlPercent.toFixed(1)}% today`,
        ] : [
            `${h.symbol} falls ${Math.abs(h.pnlPercent).toFixed(1)}% amid profit booking`,
            `${h.symbol} under pressure, down ${Math.abs(h.pnlPercent).toFixed(1)}%`,
            `${h.symbol} sees selling pressure, investors cautious`,
        ];

        return {
            id: i + 1,
            text: newsTemplates[i % newsTemplates.length],
            sentiment: isPositive ? 'positive' : 'negative',
            relatedStock: h.symbol
        } as Headline;
    });
}

// ===== HEALTH CALCULATION (Based on real portfolio) =====
function calculateHealth(data: DashboardData | null): { score: number; riskLevel: RiskLevel; verdict: string } {
    if (!data) {
        return { score: 50, riskLevel: 'Moderate', verdict: "Loading your portfolio..." };
    }

    const { portfolio, holdings } = data;
    const cashPercent = (portfolio.availableCash / portfolio.totalValue) * 100;
    const numStocks = holdings.length;

    let score = 50;
    let verdict = "";

    // Cash allocation scoring
    if (cashPercent > 80) {
        score = 35;
        verdict = "Too much idle cash! Your money isn't working for you.";
    } else if (cashPercent > 60) {
        score = 50;
        verdict = "Very conservative. Consider investing more for growth.";
    } else if (cashPercent >= 15 && cashPercent <= 35) {
        score = 85;
        verdict = "Great balance between investments and liquidity!";
    } else if (cashPercent < 10) {
        score = 55;
        verdict = "Low cash reserves. Keep some for opportunities.";
    } else {
        score = 70;
        verdict = "Decent allocation. Room to optimize.";
    }

    // Diversification bonus/penalty
    if (numStocks === 0) {
        score = Math.min(score, 30);
        verdict = "No investments yet! Start trading to build your portfolio.";
    } else if (numStocks === 1) {
        score = Math.min(score, 45);
        verdict += " Only 1 stock - very risky! Diversify.";
    } else if (numStocks >= 5) {
        score = Math.min(100, score + 10);
        verdict = "Well diversified with " + numStocks + " stocks. " + verdict;
    }

    // Risk level
    let riskLevel: RiskLevel = 'Moderate';
    if (score >= 75) riskLevel = 'Low';
    else if (score < 50) riskLevel = 'High';

    return { score, riskLevel, verdict };
}

// ===== MAIN PAGE =====
export default function AIFeaturesPage() {
    const { user } = useAuth();

    // Real data state
    const [data, setData] = useState<DashboardData | null>(null);
    const [dataLoading, setDataLoading] = useState(true);

    // Chat state
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    // Fetch real dashboard data
    useEffect(() => {
        if (!user) return;

        const token = localStorage.getItem('accessToken');
        if (!token) return;

        fetch('/api/dashboard', {
            headers: { 'Authorization': `Bearer ${token}` }
        })
            .then(res => res.json())
            .then(setData)
            .catch(console.error)
            .finally(() => setDataLoading(false));
    }, [user]);

    // Initialize welcome message
    useEffect(() => {
        if (user && messages.length === 0) {
            setMessages([{
                id: "welcome",
                role: "assistant",
                content: `Hello ${user.name || "Trader"}! I'm **Dr. Finance**, your AI assistant.\n\nI have access to your **real portfolio data**. Ask me:\n• "How is my portfolio doing?"\n• "What stocks do I own?"\n• "Should I sell any stock?"`
            }]);
        }
    }, [user, messages.length]);

    // Auto-scroll
    useEffect(() => {
        if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }, [messages]);

    // Handle chat submit
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (!input.trim() || !user) return;

        setMessages(prev => [...prev, { id: Date.now().toString(), role: "user", content: input }]);
        setInput("");
        setIsTyping(true);

        setTimeout(() => {
            const response = generateResponse(input, user.name || "Trader", data);
            setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), role: "assistant", content: response }]);
            setIsTyping(false);
        }, 800);
    };

    // Generate news based on real holdings
    const headlines = data ? generateNewsForHoldings(data.holdings) : [];

    // Calculate health based on real data
    const healthData = calculateHealth(data);

    const getScoreColor = (s: number) => s >= 75 ? 'text-green-400' : s >= 50 ? 'text-yellow-400' : 'text-red-400';

    if (!user) return null;

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center gap-4">
                <Link href="/dashboard" className="p-2 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 transition">
                    <ArrowLeft className="w-5 h-5" />
                </Link>
                <div>
                    <h1 className="text-3xl font-bold flex items-center gap-2">
                        <Sparkles className="w-7 h-7 text-purple-400" /> AI Features
                    </h1>
                    <p className="text-white/50 text-sm">Connected to your real portfolio</p>
                </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
                {/* Dr. Finance Chatbot */}
                <div className="lg:row-span-2 flex flex-col h-[500px] rounded-xl border border-white/10 bg-white/5 overflow-hidden">
                    <div className="p-4 border-b border-white/10 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
                            <Bot className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="font-semibold">Dr. Finance</h3>
                            <p className="text-xs text-green-400 flex items-center gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                                {dataLoading ? "Loading data..." : `Connected (${data?.holdings.length || 0} stocks)`}
                            </p>
                        </div>
                    </div>

                    <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
                        {messages.map((m) => (
                            <div key={m.id} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                                <div className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm ${m.role === "user" ? "bg-blue-600 rounded-tr-none" : "bg-white/10 rounded-tl-none border border-white/5"
                                    }`}>
                                    {m.content.split('\n').map((line, i) => (
                                        <p key={i} className="mb-1 last:mb-0">
                                            {line.split('**').map((part, idx) => idx % 2 === 1 ? <strong key={idx}>{part}</strong> : part)}
                                        </p>
                                    ))}
                                </div>
                            </div>
                        ))}
                        {isTyping && (
                            <div className="flex gap-2 bg-white/10 w-fit px-4 py-3 rounded-2xl rounded-tl-none">
                                <span className="w-2 h-2 bg-white/40 rounded-full animate-bounce [animation-delay:-0.3s]" />
                                <span className="w-2 h-2 bg-white/40 rounded-full animate-bounce [animation-delay:-0.15s]" />
                                <span className="w-2 h-2 bg-white/40 rounded-full animate-bounce" />
                            </div>
                        )}
                    </div>

                    <form onSubmit={handleSubmit} className="p-4 border-t border-white/10 bg-white/5">
                        <div className="relative flex items-center">
                            <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask about your portfolio..."
                                className="w-full bg-white/5 border border-white/10 text-white text-sm rounded-xl pl-4 pr-12 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 placeholder:text-white/30" />
                            <button type="submit" disabled={isTyping || !input.trim()}
                                className="absolute right-2 p-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg disabled:opacity-50 transition">
                                <Send className="w-4 h-4" />
                            </button>
                        </div>
                    </form>
                </div>

                {/* Market News - Based on actual holdings */}
                <div className="p-6 rounded-xl border border-white/10 bg-white/5">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                            <Newspaper className="w-5 h-5 text-blue-400" />
                            <span className="text-sm text-white/50">Your Stock News</span>
                        </div>
                        {dataLoading ? (
                            <Loader2 className="w-4 h-4 animate-spin text-white/30" />
                        ) : (
                            <span className="text-[10px] bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded-full border border-blue-500/20">
                                Live
                            </span>
                        )}
                    </div>
                    <div className="space-y-3">
                        {headlines.length > 0 ? headlines.map((news) => (
                            <div key={news.id} className="flex items-start gap-3">
                                <div className={`mt-1.5 w-2 h-2 rounded-full shrink-0 ${news.sentiment === 'positive' ? 'bg-green-400' : news.sentiment === 'negative' ? 'bg-red-400' : 'bg-gray-400'}`} />
                                <div>
                                    <p className="text-sm text-white/80">{news.text}</p>
                                    <div className="flex items-center gap-1 mt-1">
                                        <span className="text-xs text-white/40">{news.relatedStock}</span>
                                        {news.sentiment === 'positive' && <TrendingUp className="w-3 h-3 text-green-400" />}
                                        {news.sentiment === 'negative' && <TrendingDown className="w-3 h-3 text-red-400" />}
                                    </div>
                                </div>
                            </div>
                        )) : (
                            <p className="text-sm text-white/40">Start trading to see personalized news!</p>
                        )}
                    </div>
                </div>

                {/* Portfolio Health - Based on real data */}
                <div className="p-6 rounded-xl border border-white/10 bg-white/5">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                            <Activity className="w-5 h-5 text-purple-400" />
                            <span className="text-sm text-white/50">Portfolio Health</span>
                        </div>
                        {dataLoading ? (
                            <Loader2 className="w-4 h-4 animate-spin text-white/30" />
                        ) : (
                            <span className="text-[10px] bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full border border-green-500/20">
                                Analyzed
                            </span>
                        )}
                    </div>
                    <div className="flex items-center gap-6">
                        <div className={`text-5xl font-bold ${getScoreColor(healthData.score)}`}>{healthData.score}</div>
                        <div>
                            <span className={`px-3 py-1 rounded-full text-xs font-medium border ${healthData.riskLevel === 'Low' ? 'border-green-500/30 text-green-400 bg-green-500/10' :
                                    healthData.riskLevel === 'Moderate' ? 'border-yellow-500/30 text-yellow-400 bg-yellow-500/10' :
                                        'border-red-500/30 text-red-400 bg-red-500/10'
                                }`}>{healthData.riskLevel} Risk</span>
                            <p className="text-sm text-white/60 mt-2">{healthData.verdict}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
