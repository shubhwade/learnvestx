import { NextResponse } from "next/server";
import { getStock, getStockQuote, INDIAN_STOCKS } from "@/lib/stocks-data";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const symbol = searchParams.get("symbol")?.toUpperCase();
    const listAll = searchParams.get("list") === "true";

    // Return all stocks if list=true
    if (listAll) {
      return NextResponse.json({
        stocks: INDIAN_STOCKS.map(s => ({
          symbol: s.symbol,
          name: s.name,
          sector: s.sector,
          price: s.basePrice
        }))
      });
    }

    if (!symbol) {
      return NextResponse.json({ error: "Symbol required" }, { status: 400 });
    }

    // Get quote from predefined data
    const quote = getStockQuote(symbol);

    if (!quote) {
      return NextResponse.json({
        error: `Stock ${symbol} not found. Try: RELIANCE, TCS, INFY, HDFCBANK, etc.`
      }, { status: 404 });
    }

    return NextResponse.json({
      symbol: quote.symbol,
      name: quote.name,
      sector: quote.sector,
      price: quote.price.toFixed(2),
      change: quote.change.toFixed(2),
      changePercent: quote.changePercent.toFixed(2)
    });
  } catch (error) {
    console.error("Quote error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
