import Link from "next/link";

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-black text-white">
            {/* Header */}
            <header className="border-b border-white/10 py-4 px-6">
                <div className="max-w-4xl mx-auto flex items-center justify-between">
                    <Link href="/" className="text-xl font-bold">LearnVestX</Link>
                    <Link href="/login" className="px-4 py-2 bg-white text-black rounded-lg font-medium text-sm">
                        Get Started
                    </Link>
                </div>
            </header>

            {/* Content */}
            <main className="max-w-4xl mx-auto py-16 px-6">
                <h1 className="text-4xl font-bold mb-8">About LearnVestX</h1>

                <div className="space-y-8 text-white/70">
                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-4">Our Mission</h2>
                        <p className="leading-relaxed">
                            LearnVestX is on a mission to democratize financial education in India. We believe everyone
                            deserves access to quality investment education without risking their hard-earned money.
                            Our platform provides a risk-free environment to learn, practice, and master investing.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-4">What We Offer</h2>
                        <ul className="space-y-3 list-disc list-inside">
                            <li>Virtual stock trading with ₹1,00,000 simulated money</li>
                            <li>SIP calculator to plan your investments</li>
                            <li>30+ lessons covering beginner to advanced topics</li>
                            <li>Quizzes and certificates to validate your knowledge</li>
                            <li>Challenges to keep you motivated</li>
                            <li>Leaderboard to compete with other learners</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-4">Why Choose Us?</h2>
                        <p className="leading-relaxed">
                            Unlike traditional courses that only teach theory, LearnVestX provides a hands-on
                            learning experience. Practice trading with real market conditions, make mistakes
                            without consequences, and build confidence before investing real money.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-4">Our Team</h2>
                        <p className="leading-relaxed">
                            Built by finance enthusiasts and technologists who understand the challenges
                            faced by new investors in India. We're committed to making financial literacy
                            accessible to everyone.
                        </p>
                    </section>
                </div>

                <div className="mt-12">
                    <Link href="/signup" className="px-6 py-3 bg-white text-black font-medium rounded-lg inline-block">
                        Start Learning Free →
                    </Link>
                </div>
            </main>
        </div>
    );
}
