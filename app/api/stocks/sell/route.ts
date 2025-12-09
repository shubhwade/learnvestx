import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyAuth } from "@/lib/auth";

export const dynamic = 'force-dynamic';

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

        // Check if user has enough holdings
        const holding = await prisma.holding.findUnique({
            where: {
                userId_stockSymbol: {
                    userId,
                    stockSymbol: symbol.toUpperCase(),
                },
            },
        });

        if (!holding || holding.quantity < quantity) {
            return NextResponse.json({ error: "Insufficient holdings" }, { status: 400 });
        }

        const totalProceeds = Number(price) * quantity;

        // Execute sell transaction
        await prisma.$transaction(async (tx) => {
            // Create transaction record
            await tx.stockTransaction.create({
                data: {
                    userId,
                    stockSymbol: symbol.toUpperCase(),
                    price,
                    quantity,
                    type: "SELL",
                },
            });

            // Update holding
            if (holding.quantity === quantity) {
                // Sell all - delete holding
                await tx.holding.delete({
                    where: {
                        userId_stockSymbol: {
                            userId,
                            stockSymbol: symbol.toUpperCase(),
                        },
                    },
                });
            } else {
                // Partial sell - update quantity
                await tx.holding.update({
                    where: {
                        userId_stockSymbol: {
                            userId,
                            stockSymbol: symbol.toUpperCase(),
                        },
                    },
                    data: {
                        quantity: {
                            decrement: quantity,
                        },
                    },
                });
            }

            // Add proceeds to balance
            await tx.user.update({
                where: { id: userId },
                data: {
                    virtualBalance: {
                        increment: totalProceeds,
                    },
                },
            });
        });

        return NextResponse.json({ success: true, message: "Stock sold successfully" });
    } catch (error) {
        console.error("Sell stock error:", error);
        return NextResponse.json({ error: "Failed to sell stock" }, { status: 500 });
    }
}
