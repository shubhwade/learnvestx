import Link from "next/link";

export default function TermsPage() {
    return (
        <div className="min-h-screen bg-black text-white">
            <header className="border-b border-white/10 py-4 px-6">
                <div className="max-w-4xl mx-auto flex items-center justify-between">
                    <Link href="/" className="text-xl font-bold">LearnVestX</Link>
                </div>
            </header>

            <main className="max-w-4xl mx-auto py-16 px-6">
                <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
                <p className="text-white/50 mb-8">Last updated: December 2024</p>

                <div className="space-y-8 text-white/70">
                    <section>
                        <h2 className="text-xl font-semibold text-white mb-3">1. Acceptance of Terms</h2>
                        <p className="leading-relaxed">
                            By accessing and using LearnVestX, you agree to be bound by these Terms of Service.
                            If you do not agree, please do not use our platform.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-white mb-3">2. Educational Purpose</h2>
                        <p className="leading-relaxed">
                            LearnVestX is an educational platform only. All trading on our platform uses
                            simulated/virtual money and does not involve real financial transactions.
                            We do not provide financial advice.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-white mb-3">3. User Accounts</h2>
                        <p className="leading-relaxed">
                            You are responsible for maintaining the confidentiality of your account credentials.
                            You must provide accurate information when creating an account.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-white mb-3">4. Prohibited Activities</h2>
                        <p className="leading-relaxed">
                            You may not abuse the platform, attempt to hack or manipulate the system,
                            or use automated scripts to interact with our services.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-white mb-3">5. Disclaimer</h2>
                        <p className="leading-relaxed">
                            LearnVestX is for educational purposes only. Past simulated performance does
                            not guarantee future real-world results. Always consult a financial advisor
                            before making real investment decisions.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-white mb-3">6. Changes to Terms</h2>
                        <p className="leading-relaxed">
                            We reserve the right to modify these terms at any time. Continued use of the
                            platform constitutes acceptance of updated terms.
                        </p>
                    </section>
                </div>
            </main>
        </div>
    );
}
