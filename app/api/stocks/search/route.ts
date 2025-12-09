import { NextResponse } from "next/server";

// Mock stock data - In production, use real API like Alpha Vantage or Yahoo Finance
const MOCK_STOCKS = [
    { symbol: "AAPL", name: "Apple Inc.", price: 178.50, change: 2.34, changePercent: 1.33 },
    { symbol: "GOOGL", name: "Alphabet Inc.", price: 140.25, change: -1.20, changePercent: -0.85 },
    { symbol: "MSFT", name: "Microsoft Corporation", price: 378.90, change: 5.60, changePercent: 1.50 },
    { symbol: "TSLA", name: "Tesla, Inc.", price: 242.80, change: -3.45, changePercent: -1.40 },
    { symbol: "AMZN", name: "Amazon.com Inc.", price: 151.20, change: 0.80, changePercent: 0.53 },
    { symbol: "NVDA", name: "NVIDIA Corporation", price: 495.30, change: 12.50, changePercent: 2.59 },
    { symbol: "META", name: "Meta Platforms Inc.", price: 352.40, change: 4.20, changePercent: 1.21 },
    { symbol: "NFLX", name: "Netflix Inc.", price: 445.60, change: -2.10, changePercent: -0.47 },
    { symbol: "TCS", name: "Tata Consultancy Services", price: 3650.50, change: 15.30, changePercent: 0.42 },
    { symbol: "RELIANCE", name: "Reliance Industries", price: 2450.75, change: -8.25, changePercent: -0.34 },
    { symbol: "INFY", name: "Infosys Limited", price: 1420.80, change: 6.50, changePercent: 0.46 },
    { symbol: "HDFC", name: "HDFC Bank", price: 1580.25, change: 3.75, changePercent: 0.24 },
];

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const query = searchParams.get("q")?.toLowerCase() || "";

        if (!query) {
            return NextResponse.json(MOCK_STOCKS.slice(0, 10));
        }

        const results = MOCK_STOCKS.filter(
            (stock) =>
                stock.symbol.toLowerCase().includes(query) ||
                stock.name.toLowerCase().includes(query)
        );

        return NextResponse.json(results);
    } catch (error) {
        console.error("Stock search error:", error);
        return NextResponse.json({ error: "Failed to search stocks" }, { status: 500 });
    }
}
