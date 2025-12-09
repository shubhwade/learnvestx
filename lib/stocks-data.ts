// Predefined Indian stocks with realistic base prices
export const INDIAN_STOCKS = [
    { symbol: "RELIANCE", name: "Reliance Industries", sector: "Oil & Gas", basePrice: 2450 },
    { symbol: "TCS", name: "Tata Consultancy Services", sector: "IT", basePrice: 3650 },
    { symbol: "INFY", name: "Infosys", sector: "IT", basePrice: 1520 },
    { symbol: "HDFCBANK", name: "HDFC Bank", sector: "Banking", basePrice: 1680 },
    { symbol: "ICICIBANK", name: "ICICI Bank", sector: "Banking", basePrice: 1050 },
    { symbol: "KOTAKBANK", name: "Kotak Mahindra Bank", sector: "Banking", basePrice: 1780 },
    { symbol: "SBIN", name: "State Bank of India", sector: "Banking", basePrice: 620 },
    { symbol: "BHARTIARTL", name: "Bharti Airtel", sector: "Telecom", basePrice: 1150 },
    { symbol: "ITC", name: "ITC Limited", sector: "FMCG", basePrice: 455 },
    { symbol: "HINDUNILVR", name: "Hindustan Unilever", sector: "FMCG", basePrice: 2520 },
    { symbol: "LT", name: "Larsen & Toubro", sector: "Infrastructure", basePrice: 3280 },
    { symbol: "AXISBANK", name: "Axis Bank", sector: "Banking", basePrice: 1120 },
    { symbol: "WIPRO", name: "Wipro", sector: "IT", basePrice: 480 },
    { symbol: "HCLTECH", name: "HCL Technologies", sector: "IT", basePrice: 1420 },
    { symbol: "ASIANPAINT", name: "Asian Paints", sector: "Consumer Goods", basePrice: 2850 },
    { symbol: "MARUTI", name: "Maruti Suzuki", sector: "Automobile", basePrice: 10500 },
    { symbol: "TATAMOTORS", name: "Tata Motors", sector: "Automobile", basePrice: 780 },
    { symbol: "BAJFINANCE", name: "Bajaj Finance", sector: "Financial Services", basePrice: 6800 },
    { symbol: "TITAN", name: "Titan Company", sector: "Consumer Goods", basePrice: 3150 },
    { symbol: "ADANIENT", name: "Adani Enterprises", sector: "Conglomerate", basePrice: 2650 },
    { symbol: "SUNPHARMA", name: "Sun Pharma", sector: "Pharma", basePrice: 1180 },
    { symbol: "TATASTEEL", name: "Tata Steel", sector: "Metals", basePrice: 135 },
    { symbol: "ONGC", name: "ONGC", sector: "Oil & Gas", basePrice: 265 },
    { symbol: "NTPC", name: "NTPC", sector: "Power", basePrice: 320 }
] as const;

export type IndianStock = typeof INDIAN_STOCKS[number];

// Get stock by symbol (case-insensitive)
export function getStock(symbol: string): IndianStock | undefined {
    return INDIAN_STOCKS.find(s => s.symbol.toLowerCase() === symbol.toLowerCase());
}

// Get realistic price with small random variance
export function getStockPrice(symbol: string): number {
    const stock = getStock(symbol);
    if (!stock) return 0;

    // Add ±2% variance from base price for realism
    const variance = (Math.random() - 0.5) * 0.04;
    return stock.basePrice * (1 + variance);
}

// Get stock quote with all details
export function getStockQuote(symbol: string) {
    const stock = getStock(symbol);
    if (!stock) return null;

    const currentPrice = getStockPrice(symbol);
    const change = currentPrice - stock.basePrice;
    const changePercent = (change / stock.basePrice) * 100;

    return {
        symbol: stock.symbol,
        name: stock.name,
        sector: stock.sector,
        price: currentPrice,
        basePrice: stock.basePrice,
        change,
        changePercent
    };
}

// Get all stocks grouped by sector
export function getStocksBySector() {
    const grouped: Record<string, IndianStock[]> = {};
    for (const stock of INDIAN_STOCKS) {
        if (!grouped[stock.sector]) {
            grouped[stock.sector] = [];
        }
        grouped[stock.sector].push(stock);
    }
    return grouped;
}
