import { prisma } from "./prisma";

type ChallengeType = "FIRST_TRADE" | "PORTFOLIO_BUILDER" | "CONSISTENT_INVESTOR" | "KNOWLEDGE_SEEKER" | "QUIZ_MASTER" | "PROFIT_MAKER";

// Check and update challenge progress for a user
export async function checkAndUpdateChallenges(userId: number, type?: ChallengeType) {
    try {
        // Get all challenges
        const challenges = await prisma.challenge.findMany();

        // Get user stats
        const user = await prisma.user.findUnique({
            where: { id: userId },
            include: {
                stockTransactions: true,
                holdings: true,
                completedLessons: true,
                quizAttempts: { where: { passed: true } }
            }
        });

        if (!user) return;

        for (const challenge of challenges) {
            const title = challenge.title.toLowerCase();
            let targetProgress = 0;
            let shouldCheck = true;

            // Filter by type if specified
            if (type) {
                if (type === "FIRST_TRADE" && !title.includes("first trade")) shouldCheck = false;
                if (type === "PORTFOLIO_BUILDER" && !title.includes("portfolio")) shouldCheck = false;
                if (type === "CONSISTENT_INVESTOR" && !title.includes("consistent")) shouldCheck = false;
                if (type === "KNOWLEDGE_SEEKER" && !title.includes("knowledge")) shouldCheck = false;
                if (type === "QUIZ_MASTER" && !title.includes("quiz")) shouldCheck = false;
                if (type === "PROFIT_MAKER" && !title.includes("profit")) shouldCheck = false;
            }

            if (!shouldCheck) continue;

            // Calculate progress based on challenge type
            if (title.includes("first trade")) {
                targetProgress = user.stockTransactions.length >= 1 ? 100 : 0;
            } else if (title.includes("portfolio")) {
                targetProgress = Math.min((user.holdings.length / 5) * 100, 100);
            } else if (title.includes("consistent")) {
                targetProgress = Math.min((user.stockTransactions.length / 10) * 100, 100);
            } else if (title.includes("knowledge")) {
                targetProgress = Math.min((user.completedLessons.length / 5) * 100, 100);
            } else if (title.includes("quiz")) {
                targetProgress = Math.min((user.quizAttempts.length / 3) * 100, 100);
            } else if (title.includes("profit")) {
                const growth = ((Number(user.portfolioValue) - 100000) / 100000) * 100;
                targetProgress = Math.min(Math.max(growth, 0), 100);
            }

            // Get or create progress record
            const existingProgress = await prisma.challengeProgress.findUnique({
                where: {
                    userId_challengeId: {
                        userId: userId,
                        challengeId: challenge.id
                    }
                }
            });

            // Auto-start challenge if not started and has progress
            if (!existingProgress && targetProgress > 0) {
                await prisma.challengeProgress.create({
                    data: {
                        userId: userId,
                        challengeId: challenge.id,
                        status: targetProgress >= 100 ? "COMPLETED" : "IN_PROGRESS",
                        progress: Math.floor(targetProgress),
                        startedAt: new Date(),
                        completedAt: targetProgress >= 100 ? new Date() : null
                    }
                });

                // Award points if completed
                if (targetProgress >= 100) {
                    await prisma.user.update({
                        where: { id: userId },
                        data: { totalPoints: { increment: challenge.rewardPoints } }
                    });
                }
            } else if (existingProgress && existingProgress.status !== "COMPLETED") {
                // Update existing progress
                const isNowComplete = targetProgress >= 100;

                await prisma.challengeProgress.update({
                    where: {
                        userId_challengeId: {
                            userId: userId,
                            challengeId: challenge.id
                        }
                    },
                    data: {
                        progress: Math.floor(targetProgress),
                        status: isNowComplete ? "COMPLETED" : "IN_PROGRESS",
                        completedAt: isNowComplete ? new Date() : null
                    }
                });

                // Award points if just completed
                if (isNowComplete && existingProgress.status !== "COMPLETED") {
                    await prisma.user.update({
                        where: { id: userId },
                        data: { totalPoints: { increment: challenge.rewardPoints } }
                    });
                }
            }
        }
    } catch (error) {
        console.error("Error checking challenges:", error);
    }
}
