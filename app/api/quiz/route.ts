import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    // Get user ID if authenticated
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
      } catch { }
    }

    if (id) {
      const quiz = await prisma.quiz.findUnique({
        where: { id: parseInt(id) },
        include: {
          questions: {
            include: { options: true },
            orderBy: { id: "asc" }
          }
        }
      });

      if (!quiz) {
        return NextResponse.json({ error: "Quiz not found" }, { status: 404 });
      }

      return NextResponse.json(quiz);
    }

    // Get all quizzes with question count
    const quizzes = await prisma.quiz.findMany({
      orderBy: { createdAt: "asc" },
      include: {
        _count: { select: { questions: true } }
      }
    });

    // Get user's quiz attempts if logged in
    let userAttempts: Map<number, { passed: boolean; lastScore: number }> = new Map();
    if (userId) {
      const attempts = await prisma.quizAttempt.findMany({
        where: { userId },
        orderBy: { createdAt: "desc" }
      });

      // Group by quizId and get best attempt
      attempts.forEach(attempt => {
        if (!userAttempts.has(attempt.quizId) || attempt.passed) {
          userAttempts.set(attempt.quizId, {
            passed: attempt.passed,
            lastScore: attempt.score
          });
        }
      });
    }

    // Enrich quizzes with completion data
    const enrichedQuizzes = quizzes.map(quiz => ({
      id: quiz.id,
      title: quiz.title,
      category: quiz.category,
      passingScore: quiz.passingScore,
      questionCount: quiz._count.questions,
      completed: userAttempts.has(quiz.id),
      passed: userAttempts.get(quiz.id)?.passed || false,
      lastScore: userAttempts.get(quiz.id)?.lastScore
    }));

    return NextResponse.json(enrichedQuizzes);
  } catch (error) {
    console.error("Quiz error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
