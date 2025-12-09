import { NextResponse } from "next/server";

// Mock stock quote data
const MOCK_STOCKS: Record<string, any> = {
    AAPL: { symbol: "AAPL", name: "Apple Inc.", price: 178.50, change: 2.34, changePercent: 1.33, high: 180.20, low: 176.80, volume: 52000000, marketCap: "2.8T" },
    GOOGL: { symbol: "GOOGL", name: "Alphabet Inc.", price: 140.25, change: -1.20, changePercent: -0.85, high: 142.10, low: 139.50, volume: 28000000, marketCap: "1.7T" },
    MSFT: { symbol: "MSFT", name: "Microsoft Corporation", price: 378.90, change: 5.60, changePercent: 1.50, high: 380.50, low: 375.20, volume: 35000000, marketCap: "2.9T" },
    TSLA: { symbol: "TSLA", name: "Tesla, Inc.", price: 242.80, change: -3.45, changePercent: -1.40, high: 248.50, low: 241.20, volume: 95000000, marketCap: "770B" },
    AMZN: { symbol: "AMZN", name: "Amazon.com Inc.", price: 151.20, change: 0.80, changePercent: 0.53, high: 152.80, low: 150.10, volume: 42000000, marketCap: "1.6T" },
    NVDA: { symbol: "NVDA", name: "NVIDIA Corporation", price: 495.30, change: 12.50, changePercent: 2.59, high: 498.20, low: 485.60, volume: 68000000, marketCap: "1.2T" },
    META: { symbol: "META", name: "Meta Platforms Inc.", price: 352.40, change: 4.20, changePercent: 1.21, high: 355.80, low: 349.20, volume: 31000000, marketCap: "900B" },
    NFLX: { symbol: "NFLX", name: "Netflix Inc.", price: 445.60, change: -2.10, changePercent: -0.47, high: 450.20, low: 443.80, volume: 18000000, marketCap: "195B" },
    TCS: { symbol: "TCS", name: "Tata Consultancy Services", price: 3650.50, change: 15.30, changePercent: 0.42, high: 3680.20, low: 3620.80, volume: 2500000, marketCap: "13.3T INR" },
    RELIANCE: { symbol: "RELIANCE", name: "Reliance Industries", price: 2450.75, change: -8.25, changePercent: -0.34, high: 2475.50, low: 2440.20, volume: 8500000, marketCap: "16.5T INR" },
    INFY: { symbol: "INFY", name: "Infosys Limited", price: 1420.80, change: 6.50, changePercent: 0.46, high: 1435.20, low: 1410.50, volume: 4200000, marketCap: "5.9T INR" },
    HDFC: { symbol: "HDFC", name: "HDFC Bank", price: 1580.25, change: 3.75, changePercent: 0.24, high: 1595.80, low: 1572.40, volume: 6800000, marketCap: "12.1T INR" },
};

export async function GET(
    request: Request,
    { params }: { params: { symbol: string } }
) {
    try {
        const symbol = params.symbol.toUpperCase();
        const stock = MOCK_STOCKS[symbol];

        if (!stock) {
            return NextResponse.json({ error: "Stock not found" }, { status: 404 });
        }

        return NextResponse.json(stock);
    } catch (error) {
        console.error("Stock quote error:", error);
        return NextResponse.json({ error: "Failed to fetch stock quote" }, { status: 500 });
    }
}
