// Analytics tracking utility
// For production, integrate with services like Mixpanel, Amplitude, or PostHog

type AnalyticsEvent = {
    name: string;
    timestamp: Date;
    userId?: number;
    properties?: Record<string, unknown>;
};

// In-memory event store (replace with actual analytics service in production)
const events: AnalyticsEvent[] = [];
const MAX_EVENTS = 10000;

export function trackEvent(
    name: string,
    properties?: Record<string, unknown>,
    userId?: number
): void {
    // Keep events bounded
    if (events.length >= MAX_EVENTS) {
        events.splice(0, 1000); // Remove oldest 1000 events
    }

    events.push({
        name,
        timestamp: new Date(),
        userId,
        properties
    });

    // In production, send to analytics service:
    // await fetch('https://api.mixpanel.com/track', { ... });

    // Log for development
    if (process.env.NODE_ENV === 'development') {
        console.log(`[Analytics] ${name}`, properties);
    }
}

// Common events
export const Events = {
    // Auth
    USER_SIGNED_UP: 'user_signed_up',
    USER_LOGGED_IN: 'user_logged_in',
    USER_LOGGED_OUT: 'user_logged_out',

    // Trading
    TRADE_EXECUTED: 'trade_executed',
    STOCK_VIEWED: 'stock_viewed',

    // Learning
    LESSON_STARTED: 'lesson_started',
    LESSON_COMPLETED: 'lesson_completed',
    QUIZ_STARTED: 'quiz_started',
    QUIZ_COMPLETED: 'quiz_completed',
    QUIZ_PASSED: 'quiz_passed',

    // Challenges
    CHALLENGE_STARTED: 'challenge_started',
    CHALLENGE_COMPLETED: 'challenge_completed',

    // Engagement
    PAGE_VIEWED: 'page_viewed',
    FEATURE_USED: 'feature_used'
};

// Track page view (call from components)
export function trackPageView(page: string, userId?: number): void {
    trackEvent(Events.PAGE_VIEWED, { page }, userId);
}

// Get event counts for dashboard/admin
export function getEventCounts(): Record<string, number> {
    const counts: Record<string, number> = {};
    for (const event of events) {
        counts[event.name] = (counts[event.name] || 0) + 1;
    }
    return counts;
}

// Get recent events
export function getRecentEvents(limit = 100): AnalyticsEvent[] {
    return events.slice(-limit);
}
