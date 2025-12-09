import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const caseStudies = await prisma.caseStudy.findMany({
      orderBy: { createdAt: "desc" }
    });

    return NextResponse.json(caseStudies);
  } catch (error) {
    console.error("Case studies error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
