import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { checkAndUpdateChallenges } from "@/lib/challenges";
import jwt from "jsonwebtoken";

export const dynamic = 'force-dynamic';

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-change-in-production";

export async function POST(request: Request) {
  try {
    const authHeader = request.headers.get("authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const token = authHeader.substring(7);
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: number };

    const { quizId, answers } = await request.json();

    const quiz = await prisma.quiz.findUnique({
      where: { id: quizId },
      include: {
        questions: {
          include: { options: true }
        }
      }
    });

    if (!quiz) {
      return NextResponse.json({ error: "Quiz not found" }, { status: 404 });
    }

    let score = 0;
    quiz.questions.forEach((q) => {
      const correctOption = q.options.find((opt) => opt.isCorrect);
      if (correctOption && answers[q.id] === correctOption.id) {
        score++;
      }
    });

    const passed = score >= quiz.passingScore;

    const attempt = await prisma.quizAttempt.create({
      data: {
        userId: decoded.userId,
        quizId,
        score,
        passed
      }
    });

    if (passed) {
      await prisma.user.update({
        where: { id: decoded.userId },
        data: { totalPoints: { increment: 100 } }
      });

      const cert = await prisma.certificate.create({
        data: {
          userId: decoded.userId,
          quizAttemptId: attempt.id,
          certificateId: `FIN-${Date.now()}`,
          name: quiz.title,
          title: "FinSim Academy Certified Beginner Investor"
        }
      });

      // Auto-update Quiz Master challenge
      await checkAndUpdateChallenges(decoded.userId, "QUIZ_MASTER");

      return NextResponse.json({ score, passed: true, certificateId: cert.certificateId });
    }

    return NextResponse.json({ score, passed: false });
  } catch (error) {
    console.error("Quiz submit error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
