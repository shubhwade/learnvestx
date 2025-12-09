import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function GET(request: Request) {
  try {
    // Get user ID from auth token if available
    let userId: number | null = null;

    const authHeader = request.headers.get("Authorization");
    let token = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : null;

    if (!token) {
      const cookieStore = await cookies();
      token = cookieStore.get("accessToken")?.value || null;
    }

    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: number };
        userId = decoded.userId;
      } catch {
        // Token invalid, continue without user
      }
    }

    // Get all challenges with user's progress
    const challenges = await prisma.challenge.findMany({
      orderBy: [
        { difficulty: "asc" },
        { rewardPoints: "asc" }
      ],
      include: userId ? {
        progress: {
          where: { userId },
          take: 1
        }
      } : undefined
    });

    // Calculate real-time progress for each challenge based on user's actions
    let enrichedChallenges = challenges;

    if (userId) {
      // Get user stats for automatic progress calculation
      const user = await prisma.user.findUnique({
        where: { id: userId },
        include: {
          stockTransactions: true,
          holdings: true,
          completedLessons: true,
          quizAttempts: { where: { passed: true } }
        }
      });

      if (user) {
        enrichedChallenges = challenges.map(challenge => {
          const challengeWithProgress = challenge as typeof challenge & { progress?: any[] };
          const existingProgress = challengeWithProgress.progress?.[0];
          let autoProgress = existingProgress?.progress || 0;

          // Calculate progress based on challenge title/goal
          const title = challenge.title.toLowerCase();

          if (title.includes("first trade")) {
            autoProgress = user.stockTransactions.length >= 1 ? 100 : 0;
          } else if (title.includes("portfolio builder") || title.includes("5 different stocks")) {
            autoProgress = Math.min((user.holdings.length / 5) * 100, 100);
          } else if (title.includes("10 trades") || title.includes("consistent investor")) {
            autoProgress = Math.min((user.stockTransactions.length / 10) * 100, 100);
          } else if (title.includes("5 lessons") || title.includes("knowledge seeker")) {
            autoProgress = Math.min((user.completedLessons.length / 5) * 100, 100);
          } else if (title.includes("quiz") || title.includes("quiz master")) {
            autoProgress = Math.min((user.quizAttempts.length / 3) * 100, 100);
          } else if (title.includes("profit") || title.includes("portfolio growth")) {
            const growth = ((Number(user.portfolioValue) - 100000) / 100000) * 100;
            autoProgress = Math.min(Math.max(growth, 0), 100);
          }

          return {
            ...challenge,
            autoProgress: Math.floor(autoProgress),
            userProgress: existingProgress || null
          };
        });
      }
    }

    return NextResponse.json(enrichedChallenges);
  } catch (error) {
    console.error("Challenges error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
