import { PrismaClient } from "@prisma/client";
import { ALL_LESSONS } from "./lessons-data";
import { ALL_QUIZZES } from "./quiz-data";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Note: No demo users created - app is fresh for new signups

  // Clear existing lessons and quizzes for fresh seed
  // Delete in correct order to respect foreign keys
  await prisma.completedLesson.deleteMany({});
  await prisma.quizOption.deleteMany({});
  await prisma.quizQuestion.deleteMany({});
  await prisma.quiz.deleteMany({});
  await prisma.lesson.deleteMany({});

  console.log("🗑️  Cleared old lessons and quizzes");

  // Create lessons
  for (const lesson of ALL_LESSONS) {
    await prisma.lesson.create({
      data: {
        title: lesson.title,
        category: lesson.category,
        content: lesson.content,
        infographicURL: lesson.infographicURL
      }
    });
  }

  console.log(`✅ Created ${ALL_LESSONS.length} lessons`);

  // Create quizzes with questions and options
  for (const quizData of ALL_QUIZZES) {
    const quiz = await prisma.quiz.create({
      data: {
        title: quizData.title,
        passingScore: quizData.passingScore
      }
    });

    for (const questionData of quizData.questions) {
      await prisma.quizQuestion.create({
        data: {
          quizId: quiz.id,
          prompt: questionData.prompt,
          explanation: questionData.explanation,
          options: {
            create: questionData.options.map(opt => ({
              text: opt.text,
              isCorrect: opt.isCorrect
            }))
          }
        }
      });
    }
  }

  console.log(`✅ Created ${ALL_QUIZZES.length} quizzes with questions`);

  // Create challenges
  const challenges = [
    {
      title: "First Trade",
      goalDescription: "Complete your first stock purchase",
      rewardPoints: 50,
      difficulty: "EASY",
      durationDays: null
    },
    {
      title: "Portfolio Builder",
      goalDescription: "Hold at least 5 different stocks",
      rewardPoints: 100,
      difficulty: "MEDIUM",
      durationDays: 30
    },
    {
      title: "Consistent Investor",
      goalDescription: "Complete 10 trades",
      rewardPoints: 150,
      difficulty: "MEDIUM",
      durationDays: 30
    },
    {
      title: "Knowledge Seeker",
      goalDescription: "Complete 5 lessons",
      rewardPoints: 100,
      difficulty: "EASY",
      durationDays: null
    },
    {
      title: "Quiz Master",
      goalDescription: "Pass all beginner quizzes",
      rewardPoints: 200,
      difficulty: "MEDIUM",
      durationDays: null
    },
    {
      title: "Profit Maker",
      goalDescription: "Achieve 10% portfolio growth",
      rewardPoints: 300,
      difficulty: "HARD",
      durationDays: 60
    }
  ];

  for (const challenge of challenges) {
    await prisma.challenge.upsert({
      where: { id: challenges.indexOf(challenge) + 1 },
      update: {},
      create: {
        title: challenge.title,
        goalDescription: challenge.goalDescription,
        rewardPoints: challenge.rewardPoints,
        difficulty: challenge.difficulty as any,
        durationDays: challenge.durationDays
      }
    });
  }

  console.log("✅ Created challenges");

  console.log("\n🎉 Database seeded successfully!");
  console.log(`   - ${ALL_LESSONS.length} lessons created`);
  console.log(`   - ${ALL_QUIZZES.length} quizzes created`);
  console.log(`   - ${challenges.length} challenges created`);
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
