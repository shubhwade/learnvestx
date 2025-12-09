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

    const certificates = await prisma.certificate.findMany({
      where: { userId: decoded.userId },
      orderBy: { dateIssued: "desc" }
    });

    return NextResponse.json(certificates);
  } catch (error) {
    console.error("Certificates error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
