import { prisma } from "@/lib/prisma";

async function main() {
    console.log("🔍 Finding test users...");

    const testUsers = await prisma.user.findMany({
        where: {
            OR: [
                { email: { contains: "test" } },
                { email: { contains: "example.com" } }
            ]
        }
    });

    console.log(`Found ${testUsers.length} test users to delete.`);

    if (testUsers.length > 0) {
        for (const user of testUsers) {
            console.log(`- Deleting: ${user.email} (${user.id})`);
        }

        const deleted = await prisma.user.deleteMany({
            where: {
                OR: [
                    { email: { contains: "test" } },
                    { email: { contains: "example.com" } }
                ]
            }
        });

        console.log(`✅ Successfully deleted ${deleted.count} users.`);
    } else {
        console.log("No test users found.");
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
