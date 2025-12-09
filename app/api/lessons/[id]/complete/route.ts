import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { checkAndUpdateChallenges } from "@/lib/challenges";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function POST(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        // Get auth token - check Authorization header first, then cookies
        const authHeader = request.headers.get("Authorization");
        let token = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : null;

        if (!token) {
            const cookieStore = await cookies();
            token = cookieStore.get("accessToken")?.value || null;
        }

        if (!token) {
            return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: number };
        const { id } = await params;
        const lessonId = parseInt(id);

        if (isNaN(lessonId)) {
            return NextResponse.json({ error: "Invalid lesson ID" }, { status: 400 });
        }

        // Check if lesson exists
        const lesson = await prisma.lesson.findUnique({
            where: { id: lessonId }
        });

        if (!lesson) {
            return NextResponse.json({ error: "Lesson not found" }, { status: 404 });
        }

        // Check if already completed
        const existingCompletion = await prisma.completedLesson.findUnique({
            where: {
                userId_lessonId: {
                    userId: decoded.userId,
                    lessonId: lessonId
                }
            }
        });

        if (existingCompletion) {
            return NextResponse.json({
                message: "Lesson already completed",
                completedAt: existingCompletion.completedAt
            });
        }

        // Mark as complete
        const completion = await prisma.completedLesson.create({
            data: {
                userId: decoded.userId,
                lessonId: lessonId
            }
        });

        // Award points to user (10 points per lesson)
        await prisma.user.update({
            where: { id: decoded.userId },
            data: {
                totalPoints: { increment: 10 }
            }
        });

        // Auto-update challenge progress
        await checkAndUpdateChallenges(decoded.userId, "KNOWLEDGE_SEEKER");

        return NextResponse.json({
            success: true,
            message: "Lesson marked as complete",
            completedAt: completion.completedAt,
            pointsEarned: 10
        });
    } catch (error: any) {
        console.error("Error marking lesson complete:", error);

        if (error.name === "JsonWebTokenError") {
            return NextResponse.json({ error: "Invalid token" }, { status: 401 });
        }

        return NextResponse.json({ error: "Failed to mark lesson complete" }, { status: 500 });
    }
}
