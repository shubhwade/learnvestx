'use client';

import Link from 'next/link';
import Image from 'next/image';
import Hero3DScene from '@/components/hero/Hero3DScene';
import { ArrowRight, TrendingUp, Calculator, BookOpen, Trophy } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold">
            LearnVestX
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <Link href="#features" className="text-sm text-white/60 hover:text-white transition-colors">
              Features
            </Link>
            <Link href="#how-it-works" className="text-sm text-white/60 hover:text-white transition-colors">
              How It Works
            </Link>
            <Link href="/dashboard/lessons" className="text-sm text-white/60 hover:text-white transition-colors">
              Lessons
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <button className="text-sm text-white/60 hover:text-white transition-colors">
                Login
              </button>
            </Link>
            <Link href="/signup">
              <button className="px-6 py-2 bg-white text-black text-sm font-medium rounded-lg hover:bg-white/90 transition-colors">
                Get Started
              </button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto h-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[600px]">
            {/* Left: Content */}
            <div className="max-w-2xl">
              <h1 className="text-7xl md:text-8xl font-bold leading-none mb-8">
                Learn investing
                <br />
                by doing.
              </h1>
              <p className="text-2xl text-white/60 mb-12">
                Practice stock trading, SIPs, and portfolio management with ₹1,00,000 virtual capital. Zero risk, real learning.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/signup">
                  <button className="px-8 py-4 bg-white text-black font-medium rounded-lg hover:bg-white/90 transition-colors flex items-center gap-2">
                    Start Simulating
                    <ArrowRight size={20} />
                  </button>
                </Link>
                <Link href="/dashboard/lessons">
                  <button className="px-8 py-4 border border-white/20 font-medium rounded-lg hover:border-white/40 transition-colors">
                    Browse Lessons
                  </button>
                </Link>
              </div>
            </div>

            {/* Right: 3D Scene */}
            <div className="w-full h-[500px] lg:h-[600px] relative">
              <Hero3DScene />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-12 px-6 border-y border-white/10">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <div className="text-4xl font-bold mb-2">₹1L</div>
            <div className="text-sm text-white/60">Virtual Capital</div>
          </div>
          <div>
            <div className="text-4xl font-bold mb-2">30+</div>
            <div className="text-sm text-white/60">Lessons</div>
          </div>
          <div>
            <div className="text-4xl font-bold mb-2">100%</div>
            <div className="text-sm text-white/60">Risk-Free</div>
          </div>
          <div>
            <div className="text-4xl font-bold mb-2">Free</div>
            <div className="text-sm text-white/60">Forever</div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl font-bold mb-20">Features</h2>

          <div className="space-y-32">
            {/* Feature 1 */}
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                <div className="inline-flex items-center gap-2 mb-6">
                  <TrendingUp size={24} />
                  <span className="text-sm text-white/60">Stock Trading</span>
                </div>
                <h3 className="text-4xl font-bold mb-6">
                  Trade stocks with
                  <br />
                  virtual money
                </h3>
                <p className="text-xl text-white/60 mb-8">
                  Buy and sell stocks using real market data. Track your portfolio, analyze performance, and learn trading strategies without any financial risk.
                </p>
                <Link href="/dashboard/stocks">
                  <button className="text-white/60 hover:text-white transition-colors flex items-center gap-2">
                    Try Stock Simulator
                    <ArrowRight size={16} />
                  </button>
                </Link>
              </div>
              <div className="relative h-96 rounded-2xl border border-white/10 overflow-hidden bg-black">
                <Image
                  src="/stock-trading.png"
                  alt="Stock Trading Interface"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>

            {/* Feature 2 */}
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div className="order-2 md:order-1 relative h-96 rounded-2xl border border-white/10 overflow-hidden bg-black">
                <Image
                  src="/sip-calculator.png"
                  alt="SIP Calculator Interface"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="order-1 md:order-2">
                <div className="inline-flex items-center gap-2 mb-6">
                  <Calculator size={24} />
                  <span className="text-sm text-white/60">SIP Calculator</span>
                </div>
                <h3 className="text-4xl font-bold mb-6">
                  Calculate SIP
                  <br />
                  returns instantly
                </h3>
                <p className="text-xl text-white/60 mb-8">
                  Simulate systematic investment plans with real compound interest calculations. Visualize your wealth growth over time.
                </p>
                <Link href="/dashboard/sip">
                  <button className="text-white/60 hover:text-white transition-colors flex items-center gap-2">
                    Try SIP Calculator
                    <ArrowRight size={16} />
                  </button>
                </Link>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                <div className="inline-flex items-center gap-2 mb-6">
                  <BookOpen size={24} />
                  <span className="text-sm text-white/60">Lessons</span>
                </div>
                <h3 className="text-4xl font-bold mb-6">
                  Learn from
                  <br />
                  expert content
                </h3>
                <p className="text-xl text-white/60 mb-8">
                  30+ lessons covering everything from basics to advanced strategies. Learn at your own pace with clear explanations and real examples.
                </p>
                <Link href="/dashboard/lessons">
                  <button className="text-white/60 hover:text-white transition-colors flex items-center gap-2">
                    Browse Lessons
                    <ArrowRight size={16} />
                  </button>
                </Link>
              </div>
              <div className="relative h-96 rounded-2xl border border-white/10 overflow-hidden bg-black">
                <Image
                  src="/lessons-library.png"
                  alt="Lessons Library Interface"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Feature 4 */}
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div className="order-2 md:order-1 relative h-96 rounded-2xl border border-white/10 overflow-hidden bg-black">
                <Image
                  src="/challenges-certificates.png"
                  alt="Challenges and Certificates Interface"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="order-1 md:order-2">
                <div className="inline-flex items-center gap-2 mb-6">
                  <Trophy size={24} />
                  <span className="text-sm text-white/60">Challenges</span>
                </div>
                <h3 className="text-4xl font-bold mb-6">
                  Earn certificates
                  <br />
                  and rewards
                </h3>
                <p className="text-xl text-white/60 mb-8">
                  Complete challenges, take quizzes, and earn certificates. Prove your investing knowledge with shareable credentials.
                </p>
                <Link href="/dashboard/challenges">
                  <button className="text-white/60 hover:text-white transition-colors flex items-center gap-2">
                    View Challenges
                    <ArrowRight size={16} />
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-32 px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl font-bold mb-20">How it works</h2>

          <div className="grid md:grid-cols-3 gap-16">
            <div>
              <div className="text-6xl font-bold text-white/20 mb-6">01</div>
              <h3 className="text-2xl font-bold mb-4">Sign up free</h3>
              <p className="text-lg text-white/60">
                Create your account and get ₹1,00,000 virtual capital to start trading immediately.
              </p>
            </div>
            <div>
              <div className="text-6xl font-bold text-white/20 mb-6">02</div>
              <h3 className="text-2xl font-bold mb-4">Start learning</h3>
              <p className="text-lg text-white/60">
                Trade stocks, calculate SIPs, complete lessons, and take on challenges.
              </p>
            </div>
            <div>
              <div className="text-6xl font-bold text-white/20 mb-6">03</div>
              <h3 className="text-2xl font-bold mb-4">Get certified</h3>
              <p className="text-lg text-white/60">
                Pass quizzes and earn certificates to prove your investing knowledge.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-6xl md:text-7xl font-bold mb-8">
            Start learning today
          </h2>
          <p className="text-2xl text-white/60 mb-12">
            Join thousands mastering investing with zero risk
          </p>
          <Link href="/signup">
            <button className="px-12 py-5 bg-white text-black text-lg font-medium rounded-lg hover:bg-white/90 transition-colors">
              Get Started Free
            </button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="text-2xl font-bold mb-4">LearnVestX</div>
              <p className="text-sm text-white/60">
                Learn investing by doing, risk-free.
              </p>
            </div>
            <div>
              <div className="text-sm font-medium mb-4">Product</div>
              <div className="space-y-2 text-sm text-white/60">
                <Link href="/dashboard/stocks" className="block hover:text-white transition-colors">Stock Simulator</Link>
                <Link href="/dashboard/sip" className="block hover:text-white transition-colors">SIP Calculator</Link>
                <Link href="/dashboard/lessons" className="block hover:text-white transition-colors">Lessons</Link>
                <Link href="/dashboard/challenges" className="block hover:text-white transition-colors">Challenges</Link>
              </div>
            </div>
            <div>
              <div className="text-sm font-medium mb-4">Company</div>
              <div className="space-y-2 text-sm text-white/60">
                <Link href="/about" className="block hover:text-white transition-colors">About</Link>
                <Link href="/blog" className="block hover:text-white transition-colors">Blog</Link>
                <Link href="/contact" className="block hover:text-white transition-colors">Contact</Link>
              </div>
            </div>
            <div>
              <div className="text-sm font-medium mb-4">Legal</div>
              <div className="space-y-2 text-sm text-white/60">
                <Link href="/privacy" className="block hover:text-white transition-colors">Privacy</Link>
                <Link href="/terms" className="block hover:text-white transition-colors">Terms</Link>
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-white/10 text-sm text-white/40 text-center">
            © 2024 LearnVestX. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
