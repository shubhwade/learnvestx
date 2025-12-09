import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-change-in-production";

function calculateFV(amount: number, months: number, expectedReturn: number) {
  const r = expectedReturn / 100;
  return amount * (((1 + r / 12) ** months - 1) / (r / 12));
}

export async function POST(request: Request) {
  try {
    const authHeader = request.headers.get("authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const token = authHeader.substring(7);
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: number };

    const { fundName, sipAmount, durationMonths, expectedReturn } = await request.json();

    if (!fundName || !sipAmount || !durationMonths || !expectedReturn) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const fv = calculateFV(sipAmount, durationMonths, expectedReturn);
    const totalInvested = sipAmount * durationMonths;
    const profit = fv - totalInvested;

    const series = Array.from({ length: durationMonths }, (_, i) => {
      const month = i + 1;
      return { month, value: calculateFV(sipAmount, month, expectedReturn) };
    });

    const simulation = await prisma.sIPSimulation.create({
      data: {
        userId: decoded.userId,
        fundName,
        sipAmount,
        durationMonths,
        expectedReturn,
        simulatedResult: { fv, totalInvested, profit, series }
      }
    });

    return NextResponse.json({
      id: simulation.id,
      fv,
      totalInvested,
      profit,
      series
    });
  } catch (error) {
    console.error("SIP simulate error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
