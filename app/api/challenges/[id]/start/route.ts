import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
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

        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: number };
        const { id } = await params;
        const challengeId = parseInt(id);

        if (isNaN(challengeId)) {
            return NextResponse.json({ error: "Invalid challenge ID" }, { status: 400 });
        }

        // Check if challenge exists
        const challenge = await prisma.challenge.findUnique({
            where: { id: challengeId }
        });

        if (!challenge) {
            return NextResponse.json({ error: "Challenge not found" }, { status: 404 });
        }

        // Check if already started
        const existingProgress = await prisma.challengeProgress.findUnique({
            where: {
                userId_challengeId: {
                    userId: decoded.userId,
                    challengeId: challengeId
                }
            }
        });

        if (existingProgress) {
            return NextResponse.json({
                message: "Challenge already started",
                progress: existingProgress
            });
        }

        // Start the challenge
        const progress = await prisma.challengeProgress.create({
            data: {
                userId: decoded.userId,
                challengeId: challengeId,
                status: "IN_PROGRESS",
                progress: 0,
                startedAt: new Date()
            }
        });

        return NextResponse.json({
            success: true,
            message: "Challenge started!",
            progress
        });
    } catch (error: any) {
        console.error("Error starting challenge:", error);

        if (error.name === "JsonWebTokenError") {
            return NextResponse.json({ error: "Invalid token" }, { status: 401 });
        }

        return NextResponse.json({ error: "Failed to start challenge" }, { status: 500 });
    }
}
