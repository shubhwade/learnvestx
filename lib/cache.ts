// Simple in-memory cache with TTL support
// For production, replace with Redis

type CacheEntry<T> = {
    data: T;
    expiresAt: number;
};

class MemoryCache {
    private cache = new Map<string, CacheEntry<unknown>>();
    private maxSize = 1000; // Max entries to prevent memory issues

    get<T>(key: string): T | null {
        const entry = this.cache.get(key);

        if (!entry) return null;

        if (entry.expiresAt < Date.now()) {
            this.cache.delete(key);
            return null;
        }

        return entry.data as T;
    }

    set<T>(key: string, data: T, ttlMs: number = 60000): void {
        // Cleanup if cache is too large
        if (this.cache.size >= this.maxSize) {
            this.cleanup();
        }

        this.cache.set(key, {
            data,
            expiresAt: Date.now() + ttlMs
        });
    }

    delete(key: string): void {
        this.cache.delete(key);
    }

    clear(): void {
        this.cache.clear();
    }

    private cleanup(): void {
        const now = Date.now();
        let deleted = 0;

        for (const [key, entry] of this.cache.entries()) {
            if (entry.expiresAt < now || deleted < 100) {
                this.cache.delete(key);
                deleted++;
            }
            if (deleted >= 100) break;
        }
    }
}

// Singleton cache instance
export const cache = new MemoryCache();

// Cache TTL configurations (in milliseconds)
export const cacheTTL = {
    stockPrices: 1000,        // 1 second for stock prices
    leaderboard: 30000,       // 30 seconds for leaderboard
    lessons: 300000,          // 5 minutes for lesson list
    lessonContent: 3600000,   // 1 hour for lesson content
    quizList: 300000,         // 5 minutes for quiz list
    userProfile: 60000,       // 1 minute for user data
    challenges: 60000         // 1 minute for challenges
};

// Helper to get or set cache
export async function getOrSet<T>(
    key: string,
    ttlMs: number,
    fetchFn: () => Promise<T>
): Promise<T> {
    const cached = cache.get<T>(key);
    if (cached !== null) {
        return cached;
    }

    const data = await fetchFn();
    cache.set(key, data, ttlMs);
    return data;
}
