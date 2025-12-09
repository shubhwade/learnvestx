// Simple in-memory rate limiter for API protection
// For production, use Redis-based rate limiting

type RateLimitEntry = {
    count: number;
    resetAt: number;
};

const rateLimitStore = new Map<string, RateLimitEntry>();

export type RateLimitConfig = {
    maxRequests: number;   // Max requests per window
    windowMs: number;      // Time window in milliseconds
};

const defaultConfig: RateLimitConfig = {
    maxRequests: 100,      // 100 requests
    windowMs: 60 * 1000    // per minute
};

export function checkRateLimit(
    key: string,
    config: RateLimitConfig = defaultConfig
): { allowed: boolean; remaining: number; resetIn: number } {
    const now = Date.now();
    const entry = rateLimitStore.get(key);

    // Clean up expired entries periodically
    if (rateLimitStore.size > 10000) {
        for (const [k, v] of rateLimitStore.entries()) {
            if (v.resetAt < now) {
                rateLimitStore.delete(k);
            }
        }
    }

    if (!entry || entry.resetAt < now) {
        // New window
        rateLimitStore.set(key, {
            count: 1,
            resetAt: now + config.windowMs
        });
        return {
            allowed: true,
            remaining: config.maxRequests - 1,
            resetIn: config.windowMs
        };
    }

    if (entry.count >= config.maxRequests) {
        return {
            allowed: false,
            remaining: 0,
            resetIn: entry.resetAt - now
        };
    }

    entry.count++;
    return {
        allowed: true,
        remaining: config.maxRequests - entry.count,
        resetIn: entry.resetAt - now
    };
}

// Helper to get client IP from request
export function getClientIP(request: Request): string {
    const forwarded = request.headers.get('x-forwarded-for');
    if (forwarded) {
        return forwarded.split(',')[0].trim();
    }
    return 'unknown';
}

// Rate limit configurations for different endpoints
export const rateLimits = {
    auth: { maxRequests: 10, windowMs: 60 * 1000 },      // 10/min for login/signup
    trade: { maxRequests: 30, windowMs: 60 * 1000 },     // 30/min for trading
    api: { maxRequests: 100, windowMs: 60 * 1000 },      // 100/min for general API
    leaderboard: { maxRequests: 20, windowMs: 60 * 1000 } // 20/min for leaderboard
};
