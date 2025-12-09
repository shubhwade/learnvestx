import Link from "next/link";

const BLOG_POSTS = [
    {
        id: 1,
        title: "Getting Started with Stock Investing in India",
        excerpt: "A beginner's guide to understanding the Indian stock market and making your first investment.",
        date: "December 2024",
        category: "Beginner"
    },
    {
        id: 2,
        title: "SIP vs Lump Sum: Which is Better?",
        excerpt: "Compare the benefits of systematic investment plans with one-time lump sum investments.",
        date: "December 2024",
        category: "Strategy"
    },
    {
        id: 3,
        title: "Top 5 Mistakes New Investors Make",
        excerpt: "Learn from common mistakes so you don't have to make them yourself.",
        date: "November 2024",
        category: "Tips"
    },
    {
        id: 4,
        title: "Understanding P/E Ratio",
        excerpt: "What is Price-to-Earnings ratio and why it matters for stock valuation.",
        date: "November 2024",
        category: "Fundamentals"
    }
];

export default function BlogPage() {
    return (
        <div className="min-h-screen bg-black text-white">
            <header className="border-b border-white/10 py-4 px-6">
                <div className="max-w-4xl mx-auto flex items-center justify-between">
                    <Link href="/" className="text-xl font-bold">LearnVestX</Link>
                    <Link href="/signup" className="px-4 py-2 bg-white text-black rounded-lg font-medium text-sm">
                        Get Started
                    </Link>
                </div>
            </header>

            <main className="max-w-4xl mx-auto py-16 px-6">
                <h1 className="text-4xl font-bold mb-4">Blog</h1>
                <p className="text-white/60 mb-12">Insights, tips, and guides for smart investing.</p>

                <div className="space-y-6">
                    {BLOG_POSTS.map((post) => (
                        <article
                            key={post.id}
                            className="p-6 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-colors"
                        >
                            <div className="flex items-center gap-3 mb-3">
                                <span className="text-xs text-white/40 bg-white/10 px-2 py-1 rounded">{post.category}</span>
                                <span className="text-xs text-white/40">{post.date}</span>
                            </div>
                            <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                            <p className="text-white/60 text-sm mb-4">{post.excerpt}</p>
                            <span className="text-sm text-white/50 hover:text-white cursor-pointer">
                                Read more →
                            </span>
                        </article>
                    ))}
                </div>

                <div className="mt-12 p-6 rounded-xl bg-white/5 border border-white/10 text-center">
                    <h3 className="font-semibold mb-2">Want to learn more?</h3>
                    <p className="text-white/60 text-sm mb-4">Our lessons cover everything from basics to advanced strategies.</p>
                    <Link href="/dashboard/lessons" className="px-4 py-2 bg-white text-black rounded-lg font-medium text-sm inline-block">
                        Browse Lessons
                    </Link>
                </div>
            </main>
        </div>
    );
}
