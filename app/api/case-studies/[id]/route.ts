import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const caseStudy = await prisma.caseStudy.findUnique({
      where: { id: parseInt(params.id) }
    });

    if (!caseStudy) {
      return NextResponse.json({ error: "Case study not found" }, { status: 404 });
    }

    return NextResponse.json(caseStudy);
  } catch (error) {
    console.error("Case study detail error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
