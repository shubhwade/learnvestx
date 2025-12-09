import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyAuth } from "@/lib/auth";

export async function POST(request: Request) {
    try {
        const userId = await verifyAuth(request);
        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await request.json();
        const { symbol, quantity, price } = body;

        if (!symbol || !quantity || !price || quantity <= 0 || price <= 0) {
            return NextResponse.json({ error: "Invalid input" }, { status: 400 });
        }

        const totalCost = Number(price) * quantity;

        // Get user's current balance
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: { virtualBalance: true },
        });

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        const currentBalance = Number(user.virtualBalance);

        if (currentBalance < totalCost) {
            return NextResponse.json({ error: "Insufficient balance" }, { status: 400 });
        }

        // Execute buy transaction
        await prisma.$transaction(async (tx) => {
            // Create transaction record
            await tx.stockTransaction.create({
                data: {
                    userId,
                    stockSymbol: symbol.toUpperCase(),
                    price,
                    quantity,
                    type: "BUY",
                },
            });

            // Update or create holding
            const existingHolding = await tx.holding.findUnique({
                where: {
                    userId_stockSymbol: {
                        userId,
                        stockSymbol: symbol.toUpperCase(),
                    },
                },
            });

            if (existingHolding) {
                const totalQuantity = existingHolding.quantity + quantity;
                const newAvgPrice =
                    (Number(existingHolding.avgPrice) * existingHolding.quantity + totalCost) /
                    totalQuantity;

                await tx.holding.update({
                    where: {
                        userId_stockSymbol: {
                            userId,
                            stockSymbol: symbol.toUpperCase(),
                        },
                    },
                    data: {
                        quantity: totalQuantity,
                        avgPrice: newAvgPrice,
                    },
                });
            } else {
                await tx.holding.create({
                    data: {
                        userId,
                        stockSymbol: symbol.toUpperCase(),
                        quantity,
                        avgPrice: price,
                    },
                });
            }

            // Deduct balance
            await tx.user.update({
                where: { id: userId },
                data: {
                    virtualBalance: {
                        decrement: totalCost,
                    },
                },
            });
        });

        return NextResponse.json({ success: true, message: "Stock purchased successfully" });
    } catch (error) {
        console.error("Buy stock error:", error);
        return NextResponse.json({ error: "Failed to buy stock" }, { status: 500 });
    }
}
