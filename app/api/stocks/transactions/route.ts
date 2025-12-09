import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-change-in-production";

export async function GET(request: Request) {
  try {
    const authHeader = request.headers.get("authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const token = authHeader.substring(7);
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: number };

    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get("limit") || "50");

    const transactions = await prisma.stockTransaction.findMany({
      where: { userId: decoded.userId },
      orderBy: { timestamp: "desc" },
      take: limit
    });

    return NextResponse.json(transactions);
  } catch (error) {
    console.error("Transactions error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
