import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type") || "portfolio";

    let users;
    if (type === "portfolio") {
      users = await prisma.user.findMany({
        orderBy: { portfolioValue: "desc" },
        take: 10,
        select: { id: true, name: true, email: true, portfolioValue: true }
      });
    } else if (type === "points") {
      users = await prisma.user.findMany({
        orderBy: { totalPoints: "desc" },
        take: 10,
        select: { id: true, name: true, email: true, totalPoints: true }
      });
    } else {
      // challenges completed
      const allUsers = await prisma.user.findMany({
        take: 50,
        select: {
          id: true,
          name: true,
          email: true
        }
      });

      users = await Promise.all(
        allUsers.map(async (u) => {
          const completed = await prisma.challengeProgress.count({
            where: { userId: u.id, status: "COMPLETED" }
          });
          return { ...u, challengeCount: completed };
        })
      );
      users = users.sort((a, b) => b.challengeCount - a.challengeCount).slice(0, 10);
    }

    return NextResponse.json(users.map((u, idx) => ({ rank: idx + 1, ...u })));
  } catch (error) {
    console.error("Leaderboard error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
