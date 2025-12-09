"use client";

import { useEffect } from "react";

// Google AdSense Component
// Replace YOUR_ADSENSE_CLIENT_ID with your actual AdSense publisher ID (ca-pub-XXXXXXXXXXXXXXXX)

type AdSenseProps = {
    slot: string;  // Ad slot ID from AdSense dashboard
    format?: "auto" | "rectangle" | "horizontal" | "vertical";
    style?: React.CSSProperties;
};

export function AdSense({ slot, format = "auto", style }: AdSenseProps) {
    useEffect(() => {
        try {
            // @ts-ignore - AdSense is loaded via script
            (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (err) {
            console.error("AdSense error:", err);
        }
    }, []);

    return (
        <ins
            className="adsbygoogle"
            style={{ display: "block", ...style }}
            data-ad-client="ca-pub-YOUR_ADSENSE_CLIENT_ID" // TODO: Replace with your ID
            data-ad-slot={slot}
            data-ad-format={format}
            data-full-width-responsive="true"
        />
    );
}

// Placeholder ad for development (shows where ads will appear)
export function AdPlaceholder({ label = "Advertisement" }: { label?: string }) {
    if (process.env.NODE_ENV === "production") {
        return null; // Don't show in production
    }

    return (
        <div className="p-4 rounded-lg bg-white/5 border border-dashed border-white/20 text-center">
            <p className="text-xs text-white/30">{label}</p>
            <p className="text-xs text-white/20">Ad will appear here</p>
        </div>
    );
}
