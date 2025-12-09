import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import jwt from "jsonwebtoken";
import { devErrorResponse, logError } from "@/lib/error";

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
      where: { userId: decoded.userId },
      orderBy: { stockSymbol: "asc" }
    });

    return NextResponse.json(holdings);
  } catch (error) {
    logError("Holdings", error);
    return NextResponse.json(devErrorResponse("Internal server error", error), { status: 500 });
  }
}
