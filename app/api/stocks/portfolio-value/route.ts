import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import jwt from "jsonwebtoken";

export const dynamic = 'force-dynamic';

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-change-in-production";

export async function GET(request: Request) {
  try {
    const authHeader = request.headers.get("authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const token = authHeader.substring(7);
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: number };

    const holdings = await prisma.holding.findMany({
      where: { userId: decoded.userId }
    });

    // Calculate portfolio value (using mock current prices - replace with real API)
    let portfolioValue = 0;
    for (const holding of holdings) {
      const avgPrice = Number(holding.avgPrice);
      const currentPrice = avgPrice * (0.98 + Math.random() * 0.08); // Mock: ±4% variation
      portfolioValue += currentPrice * holding.quantity;
    }

    // Update user's portfolio value
    await prisma.user.update({
      where: { id: decoded.userId },
      data: { portfolioValue }
    });

    return NextResponse.json({ portfolioValue });
  } catch (error) {
    console.error("Portfolio value error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
