import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { checkAndUpdateChallenges } from "@/lib/challenges";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-change-in-production";

export async function POST(request: Request) {
  try {
    const authHeader = request.headers.get("authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const token = authHeader.substring(7);
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: number };

    const { symbol, type, quantity, price } = await request.json();

    if (!symbol || !type || !quantity || !price) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({ where: { id: decoded.userId } });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const totalCost = price * quantity;

    if (type === "BUY") {
      if (user.virtualBalance.toNumber && user.virtualBalance.toNumber() < totalCost || !user.virtualBalance.toNumber && user.virtualBalance < totalCost) {
        return NextResponse.json({ error: "Insufficient balance" }, { status: 400 });
      }

      const existingHolding = await prisma.holding.findUnique({
        where: { userId_stockSymbol: { userId: user.id, stockSymbol: symbol } }
      });

      let newAvgPrice = price;
      if (existingHolding) {
        const totalCostOld = Number(existingHolding.avgPrice) * existingHolding.quantity;
        const totalCostNew = price * quantity;
        newAvgPrice = (totalCostOld + totalCostNew) / (existingHolding.quantity + quantity);
      }

      await prisma.$transaction([
        prisma.user.update({
          where: { id: user.id },
          data: { virtualBalance: { decrement: totalCost } }
        }),
        prisma.stockTransaction.create({
          data: {
            userId: user.id,
            stockSymbol: symbol,
            price,
            quantity,
            type: "BUY"
          }
        }),
        prisma.holding.upsert({
          where: { userId_stockSymbol: { userId: user.id, stockSymbol: symbol } },
          create: {
            userId: user.id,
            stockSymbol: symbol,
            quantity,
            avgPrice: price
          },
          update: {
            quantity: { increment: quantity },
            avgPrice: { set: newAvgPrice }
          }
        })
      ]);

      // Recalculate portfolio value
      const holdings = await prisma.holding.findMany({ where: { userId: user.id } });
      let portfolioValue = 0;
      for (const h of holdings) {
        const currentPrice = Number(h.avgPrice) * (0.98 + Math.random() * 0.08);
        portfolioValue += currentPrice * h.quantity;
      }
      await prisma.user.update({
        where: { id: user.id },
        data: { portfolioValue }
      });
    } else if (type === "SELL") {
      const holding = await prisma.holding.findUnique({
        where: { userId_stockSymbol: { userId: user.id, stockSymbol: symbol } }
      });

      if (!holding || holding.quantity < quantity) {
        return NextResponse.json({ error: "Insufficient holdings" }, { status: 400 });
      }

      await prisma.$transaction([
        prisma.user.update({
          where: { id: user.id },
          data: { virtualBalance: { increment: totalCost } }
        }),
        prisma.stockTransaction.create({
          data: {
            userId: user.id,
            stockSymbol: symbol,
            price,
            quantity,
            type: "SELL"
          }
        }),
        holding.quantity === quantity
          ? prisma.holding.delete({
            where: { userId_stockSymbol: { userId: user.id, stockSymbol: symbol } }
          })
          : prisma.holding.update({
            where: { userId_stockSymbol: { userId: user.id, stockSymbol: symbol } },
            data: { quantity: { decrement: quantity } }
          })
      ]);

      // Recalculate portfolio value
      const holdings = await prisma.holding.findMany({ where: { userId: user.id } });
      let portfolioValue = 0;
      for (const h of holdings) {
        const currentPrice = Number(h.avgPrice) * (0.98 + Math.random() * 0.08);
        portfolioValue += currentPrice * h.quantity;
      }
      await prisma.user.update({
        where: { id: user.id },
        data: { portfolioValue }
      });
    }

    // Auto-update trading-related challenges
    await checkAndUpdateChallenges(decoded.userId);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Trade error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
