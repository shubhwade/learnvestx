import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { devErrorResponse, logError } from "@/lib/error";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");

    // Get user ID from auth token if available
    let userId: number | null = null;

    // Check Authorization header first
    const authHeader = request.headers.get("Authorization");
    let token = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : null;

    // Fall back to cookies
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

    // Get lessons
    const lessons = await prisma.lesson.findMany({
      where: category ? { category: category as any } : undefined,
      orderBy: { createdAt: "asc" }
    });

    // Get user's completed lessons if logged in
    let completedLessonIds: number[] = [];
    if (userId) {
      const completedLessons = await prisma.completedLesson.findMany({
        where: { userId },
        select: { lessonId: true }
      });
      completedLessonIds = completedLessons.map(cl => cl.lessonId);
    }

    // Add completion status to each lesson
    const lessonsWithStatus = lessons.map(lesson => ({
      ...lesson,
      completed: completedLessonIds.includes(lesson.id)
    }));

    return NextResponse.json(lessonsWithStatus);
  } catch (error) {
    logError("Lessons", error);
    return NextResponse.json(devErrorResponse("Internal server error", error), { status: 500 });
  }
}
