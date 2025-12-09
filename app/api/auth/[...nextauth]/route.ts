import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export const authOptions = {
    providers: [
        // Google OAuth
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
        // Keep email/password as backup
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    return null;
                }

                const user = await prisma.user.findUnique({
                    where: { email: credentials.email }
                });

                if (!user) return null;

                const isValid = await bcrypt.compare(credentials.password, user.passwordHash);
                if (!isValid) return null;

                return {
                    id: String(user.id),
                    email: user.email,
                    name: user.name,
                };
            }
        })
    ],
    callbacks: {
        async signIn({ user, account }: { user: any; account: any }) {
            if (account?.provider === "google") {
                // Check if user exists, if not create them
                const existingUser = await prisma.user.findUnique({
                    where: { email: user.email! }
                });

                if (!existingUser) {
                    // Create new user with Google account
                    await prisma.user.create({
                        data: {
                            email: user.email!,
                            name: user.name || "User",
                            passwordHash: "", // No password for OAuth users
                            virtualBalance: 100000,
                            totalPoints: 0,
                        }
                    });
                }
            }
            return true;
        },
        async jwt({ token, user }: { token: any; user: any }) {
            if (user) {
                // Get the database user ID
                const dbUser = await prisma.user.findUnique({
                    where: { email: user.email! }
                });
                if (dbUser) {
                    token.userId = dbUser.id;
                    token.totalPoints = dbUser.totalPoints;
                    token.virtualBalance = Number(dbUser.virtualBalance);
                    token.portfolioValue = Number(dbUser.portfolioValue);
                }
            }
            return token;
        },
        async session({ session, token }: { session: any; token: any }) {
            if (session.user) {
                session.user.id = token.userId;
                session.user.totalPoints = token.totalPoints;
                session.user.virtualBalance = token.virtualBalance;
                session.user.portfolioValue = token.portfolioValue;
            }
            return session;
        }
    },
    pages: {
        signIn: "/login",
        error: "/login",
    },
    session: {
        strategy: "jwt" as const,
        maxAge: 30 * 24 * 60 * 60, // 30 days
    },
    secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
