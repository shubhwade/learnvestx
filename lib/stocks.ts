// Real-time stock price service with caching
// Uses simulated prices that update every second for demo purposes

type StockPrice = {
    symbol: string;
    price: number;
    change: number;
    changePercent: number;
    high: number;
    low: number;
    open: number;
    volume: number;
    lastUpdated: Date;
};

// Base prices for Indian stocks (simulated)
const BASE_PRICES: Record<string, { price: number; name: string }> = {
    "RELIANCE": { price: 2450, name: "Reliance Industries" },
    "TCS": { price: 3650, name: "Tata Consultancy Services" },
    "INFY": { price: 1520, name: "Infosys" },
    "HDFCBANK": { price: 1680, name: "HDFC Bank" },
    "ICICIBANK": { price: 1050, name: "ICICI Bank" },
    "SBIN": { price: 620, name: "State Bank of India" },
    "WIPRO": { price: 450, name: "Wipro Limited" },
    "BHARTIARTL": { price: 1320, name: "Bharti Airtel" },
    "TATASTEEL": { price: 135, name: "Tata Steel" },
    "KOTAKBANK": { price: 1780, name: "Kotak Mahindra Bank" },
    "LT": { price: 3200, name: "Larsen & Toubro" },
    "MARUTI": { price: 10800, name: "Maruti Suzuki" },
    "ASIANPAINT": { price: 2850, name: "Asian Paints" },
    "TITAN": { price: 3150, name: "Titan Company" },
    "BAJFINANCE": { price: 6800, name: "Bajaj Finance" }
};

// Cache for stock prices
const priceCache = new Map<string, StockPrice>();
const cacheTimeout = 1000; // 1 second cache

// Generate realistic price movement
function generatePriceMovement(basePrice: number, seed: number): number {
    // Random walk with mean reversion
    const volatility = 0.002; // 0.2% volatility per update
    const random = Math.sin(seed * 12.9898) * 43758.5453;
    const normalRandom = (random - Math.floor(random)) * 2 - 1;
    return basePrice * (1 + normalRandom * volatility);
}

export function getStockPrice(symbol: string): StockPrice | null {
    const upperSymbol = symbol.toUpperCase();
    const base = BASE_PRICES[upperSymbol];

    if (!base) return null;

    // Check cache
    const cached = priceCache.get(upperSymbol);
    const now = Date.now();

    if (cached && (now - cached.lastUpdated.getTime()) < cacheTimeout) {
        return cached;
    }

    // Generate new price
    const seed = now / 1000;
    const currentPrice = generatePriceMovement(base.price, seed + upperSymbol.charCodeAt(0));
    const openPrice = base.price * (1 + (Math.sin(seed / 100) * 0.01));
    const change = currentPrice - openPrice;
    const changePercent = (change / openPrice) * 100;

    const stockPrice: StockPrice = {
        symbol: upperSymbol,
        price: Math.round(currentPrice * 100) / 100,
        change: Math.round(change * 100) / 100,
        changePercent: Math.round(changePercent * 100) / 100,
        high: Math.round(Math.max(currentPrice, openPrice) * 1.005 * 100) / 100,
        low: Math.round(Math.min(currentPrice, openPrice) * 0.995 * 100) / 100,
        open: Math.round(openPrice * 100) / 100,
        volume: Math.floor(1000000 + Math.random() * 5000000),
        lastUpdated: new Date()
    };

    priceCache.set(upperSymbol, stockPrice);
    return stockPrice;
}

export function getAllStockPrices(): StockPrice[] {
    return Object.keys(BASE_PRICES).map(symbol => getStockPrice(symbol)!);
}

export function getStockInfo(symbol: string): { name: string; basePrice: number } | null {
    const base = BASE_PRICES[symbol.toUpperCase()];
    return base ? { name: base.name, basePrice: base.price } : null;
}

export function searchStocks(query: string): { symbol: string; name: string; price: number }[] {
    const q = query.toLowerCase();
    return Object.entries(BASE_PRICES)
        .filter(([symbol, info]) =>
            symbol.toLowerCase().includes(q) ||
            info.name.toLowerCase().includes(q)
        )
        .map(([symbol, info]) => ({
            symbol,
            name: info.name,
            price: getStockPrice(symbol)?.price || info.price
        }));
}

// Format helpers
export function formatCurrency(value: number): string {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(value);
}

export function formatNumber(value: number): string {
    return new Intl.NumberFormat('en-IN').format(value);
}

export function formatVolume(volume: number): string {
    if (volume >= 10000000) return `${(volume / 10000000).toFixed(2)} Cr`;
    if (volume >= 100000) return `${(volume / 100000).toFixed(2)} L`;
    if (volume >= 1000) return `${(volume / 1000).toFixed(1)} K`;
    return volume.toString();
}
