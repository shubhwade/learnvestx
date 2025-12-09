import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import jwt from "jsonwebtoken";
import { devErrorResponse, logError } from "@/lib/error";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-change-in-production";

export async function GET(request: Request) {
    try {
        // Get auth token
        const authHeader = request.headers.get("authorization");
        if (!authHeader?.startsWith("Bearer ")) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, JWT_SECRET) as { userId: number };

        // Fetch all dashboard data in parallel
        const [user, holdings, transactions, lessonsCount, challengesCount] = await Promise.all([
            prisma.user.findUnique({
                where: { id: decoded.userId },
                select: {
                    id: true,
                    email: true,
                    name: true,
                    totalPoints: true,
                    virtualBalance: true,
                    portfolioValue: true,
                    createdAt: true
                }
            }),
            prisma.holding.findMany({
                where: { userId: decoded.userId }
            }),
            prisma.stockTransaction.findMany({
                where: { userId: decoded.userId },
                orderBy: { timestamp: "desc" },
                take: 10
            }),
            prisma.completedLesson.count({
                where: { userId: decoded.userId }
            }),
            prisma.challengeProgress.count({
                where: { userId: decoded.userId, status: "COMPLETED" }
            })
        ]);

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        // Calculate portfolio metrics
        const STARTING_BALANCE = 100000; // ₹1,00,000

        // Calculate holdings value (using avg price as current price for now)
        // In production, you'd fetch real-time prices
        const holdingsWithValue = holdings.map(h => {
            const avgPrice = Number(h.avgPrice);
            const currentPrice = avgPrice; // Same as avg for now
            const value = currentPrice * h.quantity;
            const investedValue = avgPrice * h.quantity;
            const pnl = value - investedValue;
            const pnlPercent = investedValue > 0 ? (pnl / investedValue) * 100 : 0;

            return {
                symbol: h.stockSymbol,
                quantity: h.quantity,
                avgPrice: avgPrice,
                currentPrice: currentPrice,
                value: value,
                investedValue: investedValue,
                pnl: pnl,
                pnlPercent: pnlPercent
            };
        });

        // Calculate totals
        const totalInvestedValue = holdingsWithValue.reduce((sum, h) => sum + h.investedValue, 0);
        const totalCurrentValue = holdingsWithValue.reduce((sum, h) => sum + h.value, 0);
        const availableCash = Number(user.virtualBalance);
        const totalPortfolioValue = totalCurrentValue + availableCash;
        const totalPnL = totalPortfolioValue - STARTING_BALANCE;
        const totalPnLPercent = (totalPnL / STARTING_BALANCE) * 100;

        // Format transactions
        const recentTransactions = transactions.map(tx => ({
            id: tx.id,
            symbol: tx.stockSymbol,
            type: tx.type,
            quantity: tx.quantity,
            price: Number(tx.price),
            total: Number(tx.price) * tx.quantity,
            timestamp: tx.timestamp.toISOString()
        }));

        return NextResponse.json({
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                totalPoints: user.totalPoints,
                memberSince: user.createdAt.toISOString()
            },
            portfolio: {
                startingBalance: STARTING_BALANCE,
                totalValue: totalPortfolioValue,
                availableCash: availableCash,
                investedValue: totalInvestedValue,
                currentValue: totalCurrentValue,
                pnl: totalPnL,
                pnlPercent: Number(totalPnLPercent.toFixed(2)),
                holdingsCount: holdings.length
            },
            holdings: holdingsWithValue,
            recentTransactions: recentTransactions,
            stats: {
                lessonsCompleted: lessonsCount,
                challengesCompleted: challengesCount
            }
        });
    } catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
            return NextResponse.json({ error: "Invalid token" }, { status: 401 });
        }
        logError("Dashboard API", error);
        return NextResponse.json(devErrorResponse("Internal server error", error), { status: 500 });
    }
}
