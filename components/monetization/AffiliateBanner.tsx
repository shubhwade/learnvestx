"use client";

import { ExternalLink } from "lucide-react";

// Affiliate links - Replace with your actual referral links!
const AFFILIATES = {
    zerodha: {
        name: "Zerodha",
        tagline: "India's #1 Stock Broker",
        description: "Open a free Demat account. Trade stocks, mutual funds & more.",
        url: "https://zerodha.com/?ref=YOUR_REFERRAL_CODE", // Replace YOUR_REFERRAL_CODE
        cta: "Open Free Account",
        color: "from-blue-600 to-blue-700"
    },
    groww: {
        name: "Groww",
        tagline: "Start investing with just ₹100",
        description: "Stocks, Mutual Funds, Gold & more. Zero brokerage on delivery.",
        url: "https://groww.in/p/YOUR_REFERRAL_CODE", // Replace YOUR_REFERRAL_CODE
        cta: "Start Investing",
        color: "from-green-600 to-green-700"
    },
    upstox: {
        name: "Upstox",
        tagline: "Trade at ₹20 flat",
        description: "Open a free Demat account. Get free AMC for first year.",
        url: "https://upstox.com/open-account/?f=YOUR_CODE", // Replace YOUR_CODE
        cta: "Open Account",
        color: "from-purple-600 to-purple-700"
    },
    angelone: {
        name: "Angel One",
        tagline: "Smart investing made easy",
        description: "Free Demat account + Free AMC. Start with just ₹0.",
        url: "https://www.angelone.in/open-demat-account?ref=YOUR_CODE", // Replace YOUR_CODE
        cta: "Get Started Free",
        color: "from-orange-600 to-orange-700"
    }
};

type AffiliateBannerProps = {
    broker?: keyof typeof AFFILIATES;
    variant?: "full" | "compact";
};

export function AffiliateBanner({ broker = "zerodha", variant = "full" }: AffiliateBannerProps) {
    const affiliate = AFFILIATES[broker];

    if (variant === "compact") {
        return (
            <a
                href={affiliate.url}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className={`block p-4 rounded-xl bg-gradient-to-r ${affiliate.color} hover:opacity-90 transition-opacity`}
            >
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-white font-semibold">{affiliate.name}</p>
                        <p className="text-white/80 text-sm">{affiliate.tagline}</p>
                    </div>
                    <span className="text-white text-sm flex items-center gap-1">
                        {affiliate.cta} <ExternalLink className="w-4 h-4" />
                    </span>
                </div>
            </a>
        );
    }

    return (
        <a
            href={affiliate.url}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className={`block p-6 rounded-xl bg-gradient-to-r ${affiliate.color} hover:opacity-90 transition-opacity`}
        >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs text-white/60 bg-white/20 px-2 py-0.5 rounded">Sponsored</span>
                    </div>
                    <p className="text-xl font-bold text-white">{affiliate.name}</p>
                    <p className="text-white/90 font-medium">{affiliate.tagline}</p>
                    <p className="text-white/70 text-sm mt-1">{affiliate.description}</p>
                </div>
                <button className="px-6 py-3 bg-white text-black font-medium rounded-lg hover:bg-white/90 transition-colors flex items-center gap-2 whitespace-nowrap">
                    {affiliate.cta} <ExternalLink className="w-4 h-4" />
                </button>
            </div>
        </a>
    );
}

// Multiple brokers banner for comparison
export function BrokerComparisonBanner() {
    return (
        <div className="p-6 rounded-xl bg-white/5 border border-white/10">
            <h3 className="text-lg font-semibold text-white mb-1">Ready to Trade for Real?</h3>
            <p className="text-white/50 text-sm mb-4">Open a free Demat account with top brokers</p>

            <div className="grid gap-3 sm:grid-cols-2">
                {Object.entries(AFFILIATES).slice(0, 4).map(([key, affiliate]) => (
                    <a
                        key={key}
                        href={affiliate.url}
                        target="_blank"
                        rel="noopener noreferrer sponsored"
                        className="p-3 rounded-lg bg-white/5 border border-white/10 hover:border-white/20 transition-colors flex items-center justify-between"
                    >
                        <div>
                            <p className="text-white font-medium text-sm">{affiliate.name}</p>
                            <p className="text-white/40 text-xs">{affiliate.tagline}</p>
                        </div>
                        <ExternalLink className="w-4 h-4 text-white/40" />
                    </a>
                ))}
            </div>
        </div>
    );
}
