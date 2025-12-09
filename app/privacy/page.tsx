import Link from "next/link";

export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-black text-white">
            <header className="border-b border-white/10 py-4 px-6">
                <div className="max-w-4xl mx-auto flex items-center justify-between">
                    <Link href="/" className="text-xl font-bold">LearnVestX</Link>
                </div>
            </header>

            <main className="max-w-4xl mx-auto py-16 px-6">
                <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
                <p className="text-white/50 mb-8">Last updated: December 2024</p>

                <div className="space-y-8 text-white/70">
                    <section>
                        <h2 className="text-xl font-semibold text-white mb-3">1. Information We Collect</h2>
                        <p className="leading-relaxed">
                            We collect information you provide directly, including your email address, name,
                            and any data you enter while using our platform such as simulated trades and quiz responses.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-white mb-3">2. How We Use Your Information</h2>
                        <p className="leading-relaxed">
                            We use your information to provide and improve our services, track your learning
                            progress, and communicate with you about updates and new features.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-white mb-3">3. Data Security</h2>
                        <p className="leading-relaxed">
                            We implement industry-standard security measures to protect your personal data.
                            Passwords are encrypted and we use secure HTTPS connections.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-white mb-3">4. Third-Party Services</h2>
                        <p className="leading-relaxed">
                            We may use third-party analytics and advertising services. These services have
                            their own privacy policies governing the use of your information.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-white mb-3">5. Your Rights</h2>
                        <p className="leading-relaxed">
                            You can request access to, correction of, or deletion of your personal data
                            at any time by contacting us.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-white mb-3">6. Contact Us</h2>
                        <p className="leading-relaxed">
                            If you have questions about this Privacy Policy, please contact us at
                            learnvestx@gmail.com
                        </p>
                    </section>
                </div>
            </main>
        </div>
    );
}
