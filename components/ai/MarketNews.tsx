"use client";

import { useEffect, useState } from "react";
import { Newspaper, TrendingUp, TrendingDown, Sparkles } from "lucide-react";

type Headline = {
    id: number;
    text: string;
    sentiment: 'positive' | 'negative' | 'neutral';
    relatedStock: string;
};

// Pool of headlines to randomly select from
const NEWS_POOL: Headline[] = [
    { id: 1, text: "Reliance announces 5G network expansion across 200 cities", sentiment: "positive", relatedStock: "RELIANCE" },
    { id: 2, text: "TCS bags $500M deal from European banking giant", sentiment: "positive", relatedStock: "TCS" },
    { id: 3, text: "HDFC Bank reports strong Q3 results, NPA down", sentiment: "positive", relatedStock: "HDFCBANK" },
    { id: 4, text: "Infosys raises FY24 revenue guidance after stellar quarter", sentiment: "positive", relatedStock: "INFY" },
    { id: 5, text: "IT sector faces headwinds amid global tech slowdown", sentiment: "negative", relatedStock: "TCS" },
    { id: 6, text: "RBI holds rates steady, markets react positively", sentiment: "positive", relatedStock: "SBIN" },
    { id: 7, text: "Auto stocks surge on festive season demand outlook", sentiment: "positive", relatedStock: "MARUTI" },
    { id: 8, text: "Profit booking seen in banking stocks after rally", sentiment: "negative", relatedStock: "ICICIBANK" },
    { id: 9, text: "Metal stocks under pressure on China demand concerns", sentiment: "negative", relatedStock: "TATASTEEL" },
    { id: 10, text: "Pharma sector gains on US FDA clearances", sentiment: "positive", relatedStock: "WIPRO" },
    { id: 11, text: "Oil prices rise, energy stocks follow suit", sentiment: "positive", relatedStock: "RELIANCE" },
    { id: 12, text: "FIIs turn net buyers, boost market sentiment", sentiment: "positive", relatedStock: "NIFTY50" },
];

function getRandomNews(): Headline[] {
    const shuffled = [...NEWS_POOL].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 3).map((h, i) => ({ ...h, id: i + 1 }));
}

export function MarketNews() {
    const [headlines, setHeadlines] = useState<Headline[]>([]);

    useEffect(() => {
        setHeadlines(getRandomNews());
    }, []);

    return (
        <div className="p-6 rounded-xl border border-white/10 bg-white/5">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <Newspaper className="w-5 h-5 text-blue-400" />
                    <span className="text-sm text-white/50">Market News</span>
                </div>
                <span className="text-[10px] bg-purple-500/20 text-purple-400 px-2 py-0.5 rounded-full border border-purple-500/20 flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> AI
                </span>
            </div>

            <div className="space-y-3">
                {headlines.map((news) => (
                    <div key={news.id} className="flex items-start gap-3 group">
                        <div className={`mt-1.5 w-2 h-2 rounded-full shrink-0 ${news.sentiment === 'positive' ? 'bg-green-400' :
                                news.sentiment === 'negative' ? 'bg-red-400' : 'bg-gray-400'
                            }`} />
                        <div className="flex-1">
                            <p className="text-sm text-white/80 leading-relaxed">
                                {news.text}
                            </p>
                            <div className="flex items-center gap-1 mt-1">
                                <span className="text-xs text-white/40">{news.relatedStock}</span>
                                {news.sentiment === 'positive' && <TrendingUp className="w-3 h-3 text-green-400" />}
                                {news.sentiment === 'negative' && <TrendingDown className="w-3 h-3 text-red-400" />}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
