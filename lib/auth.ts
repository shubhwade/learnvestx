import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-change-in-production";

export async function verifyAuth(request: Request): Promise<number | null> {
    try {
        // Get token from Authorization header or cookie
        const authHeader = request.headers.get("authorization");
        const token = authHeader?.replace("Bearer ", "");

        if (!token) {
            return null;
        }

        const decoded = jwt.verify(token, JWT_SECRET) as { userId: number };
        return decoded.userId;
    } catch (error) {
        console.error("Auth verification error:", error);
        return null;
    }
}
