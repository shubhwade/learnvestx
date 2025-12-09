import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function POST(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        // Get auth token
        const authHeader = request.headers.get("Authorization");
        let token = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : null;

        if (!token) {
            const cookieStore = await cookies();
            token = cookieStore.get("accessToken")?.value || null;
        }

        if (!token) {
            return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: number };
        const { id } = await params;
        const challengeId = parseInt(id);

        if (isNaN(challengeId)) {
            return NextResponse.json({ error: "Invalid challenge ID" }, { status: 400 });
        }

        const body = await request.json();
        const { progress: newProgress } = body;

        // Get user's challenge progress
        const existingProgress = await prisma.challengeProgress.findUnique({
            where: {
                userId_challengeId: {
                    userId: decoded.userId,
                    challengeId: challengeId
                }
            },
            include: { challenge: true }
        });

        if (!existingProgress) {
            return NextResponse.json({ error: "Challenge not started" }, { status: 400 });
        }

        if (existingProgress.status === "COMPLETED") {
            return NextResponse.json({ message: "Challenge already completed", progress: existingProgress });
        }

        // Check if progress reaches 100%
        const isNowComplete = newProgress >= 100;

        // Update progress
        const updatedProgress = await prisma.challengeProgress.update({
            where: {
                userId_challengeId: {
                    userId: decoded.userId,
                    challengeId: challengeId
                }
            },
            data: {
                progress: Math.min(newProgress, 100),
                status: isNowComplete ? "COMPLETED" : "IN_PROGRESS",
                completedAt: isNowComplete ? new Date() : null
            }
        });

        // Award points if completed
        if (isNowComplete) {
            await prisma.user.update({
                where: { id: decoded.userId },
                data: {
                    totalPoints: { increment: existingProgress.challenge.rewardPoints }
                }
            });
        }

        return NextResponse.json({
            success: true,
            progress: updatedProgress,
            completed: isNowComplete,
            pointsEarned: isNowComplete ? existingProgress.challenge.rewardPoints : 0
        });
    } catch (error: any) {
        console.error("Error updating challenge progress:", error);

        if (error.name === "JsonWebTokenError") {
            return NextResponse.json({ error: "Invalid token" }, { status: 401 });
        }

        return NextResponse.json({ error: "Failed to update progress" }, { status: 500 });
    }
}
