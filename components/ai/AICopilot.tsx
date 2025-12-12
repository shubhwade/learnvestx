"use client";

import { useState, useRef, useEffect, FormEvent } from "react";
import { Bot, Send, ChevronDown, Sparkles, Minimize2 } from "lucide-react";
import { useAuth } from "@/lib/auth-context";

type Message = {
    id: string;
    role: "user" | "assistant";
    content: string;
};

// Smart responses based on user input
function generateResponse(input: string, userName: string, portfolioValue: number, cashBalance: number): string {
    const lowerInput = input.toLowerCase();

    if (lowerInput.includes("portfolio") || lowerInput.includes("how am i doing")) {
        return `Great question, ${userName}! Your portfolio is currently worth **₹${portfolioValue.toLocaleString('en-IN')}** with **₹${cashBalance.toLocaleString('en-IN')}** in cash. ${portfolioValue > 100000 ? "You're doing well! Keep diversifying." : "Consider investing some of that cash to grow your wealth."}`;
    }

    if (lowerInput.includes("reliance")) {
        return "**Reliance Industries** is a strong blue-chip stock. It's part of the Nifty 50 and has diverse business segments including retail, telecom (Jio), and energy. Consider it a long-term hold if you believe in India's growth story.";
    }

    if (lowerInput.includes("tcs") || lowerInput.includes("infosys") || lowerInput.includes("it")) {
        return "**IT stocks** like TCS and Infosys are well-established. They benefit from global digital transformation but can be affected by US recession fears. They're generally stable dividend-paying stocks.";
    }

    if (lowerInput.includes("sell")) {
        return "Before selling, ask yourself: Has the reason you bought changed? Is there a better opportunity elsewhere? Remember, frequent trading often leads to lower returns due to fees and taxes. *This is a simulation, so experiment freely!*";
    }

    if (lowerInput.includes("buy")) {
        return "Before buying, research the company's fundamentals. Look at P/E ratio, debt levels, and growth prospects. In this simulator, you can practice without real risk - perfect for learning!";
    }

    if (lowerInput.includes("p/e") || lowerInput.includes("pe ratio")) {
        return "**P/E Ratio** (Price-to-Earnings) shows how much investors pay per rupee of earnings. A P/E of 20 means you pay ₹20 for every ₹1 of company profit. Lower P/E = potentially undervalued, Higher P/E = growth expected.";
    }

    if (lowerInput.includes("sip") || lowerInput.includes("mutual fund")) {
        return "**SIP** (Systematic Investment Plan) lets you invest a fixed amount regularly. It averages out market volatility through rupee-cost averaging. Even ₹500/month can grow significantly over 10-20 years!";
    }

    if (lowerInput.includes("diversify") || lowerInput.includes("diversification")) {
        return "**Diversification** means spreading investments across different sectors and asset types. Don't put all eggs in one basket! Try mixing IT, Banking, FMCG, and some cash. This reduces overall risk.";
    }

    if (lowerInput.includes("hello") || lowerInput.includes("hi") || lowerInput.includes("hey")) {
        return `Hello ${userName}! 👋 I'm Dr. Finance, your AI trading assistant. Ask me about stocks, your portfolio, or investment concepts!`;
    }

    return `That's a great question! In general, successful investing requires patience, research, and diversification. Since this is a simulator, feel free to experiment with different strategies. Try asking me about specific stocks like Reliance or TCS, or concepts like P/E ratio and SIP.`;
}

export function AICopilot() {
    const { user } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    // Initialize with welcome message
    useEffect(() => {
        if (user && messages.length === 0) {
            setMessages([{
                id: "welcome",
                role: "assistant",
                content: `Hello ${user.name || "Trader"}! I'm **Dr. Finance**, your AI Copilot.\n\nI can analyze your portfolio, explain stock market concepts, or give you trading tips.\n\n*Ask me: "How is my portfolio looking?" or "What is a P/E ratio?"*`
            }]);
        }
    }, [user, messages.length]);

    // Auto-scroll to bottom
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (!input.trim() || !user) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            role: "user",
            content: input
        };

        setMessages(prev => [...prev, userMessage]);
        setInput("");
        setIsTyping(true);

        // Simulate AI thinking time
        setTimeout(() => {
            const response = generateResponse(
                input,
                user.name || "Trader",
                Number(user.portfolioValue) || 100000,
                Number(user.virtualBalance) || 100000
            );

            const assistantMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: "assistant",
                content: response
            };

            setMessages(prev => [...prev, assistantMessage]);
            setIsTyping(false);
        }, 800 + Math.random() * 700);
    };

    if (!user) return null;

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-none">
            {/* Chat Window */}
            {isOpen && (
                <div className="mb-4 w-[350px] sm:w-[400px] h-[500px] bg-gray-900 border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden pointer-events-auto">
                    {/* Header */}
                    <div className="p-4 bg-gray-800/50 border-b border-white/10 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-purple-600 flex items-center justify-center">
                                <Bot className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-white">Dr. Finance</h3>
                                <p className="text-xs text-green-400 flex items-center gap-1">
                                    <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                                    Online
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="p-1.5 hover:bg-white/10 rounded-lg text-white/60 hover:text-white"
                        >
                            <Minimize2 className="w-4 h-4" />
                        </button>
                    </div>

                    {/* Messages */}
                    <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
                        {messages.map((m) => (
                            <div
                                key={m.id}
                                className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                            >
                                <div
                                    className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${m.role === "user"
                                            ? "bg-blue-600 text-white rounded-tr-none"
                                            : "bg-white/10 text-gray-100 rounded-tl-none border border-white/5"
                                        }`}
                                >
                                    {m.content.split('\n').map((line, i) => (
                                        <p key={i} className="mb-1 last:mb-0">
                                            {line.split('**').map((part, idx) =>
                                                idx % 2 === 1 ? <strong key={idx}>{part}</strong> :
                                                    part.split('*').map((p, pIdx) =>
                                                        pIdx % 2 === 1 ? <em key={pIdx}>{p}</em> : p
                                                    )
                                            )}
                                        </p>
                                    ))}
                                </div>
                            </div>
                        ))}
                        {isTyping && (
                            <div className="flex justify-start">
                                <div className="bg-white/10 px-4 py-3 rounded-2xl rounded-tl-none flex items-center gap-2">
                                    <span className="w-2 h-2 bg-white/40 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                                    <span className="w-2 h-2 bg-white/40 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                                    <span className="w-2 h-2 bg-white/40 rounded-full animate-bounce"></span>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Input */}
                    <form onSubmit={handleSubmit} className="p-4 bg-gray-800/30 border-t border-white/10">
                        <div className="relative flex items-center">
                            <input
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Ask about your portfolio..."
                                className="w-full bg-gray-900/50 border border-white/10 text-white text-sm rounded-xl pl-4 pr-12 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 placeholder:text-white/30"
                            />
                            <button
                                type="submit"
                                disabled={isTyping || !input.trim()}
                                className="absolute right-2 p-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg disabled:opacity-50 transition-colors"
                            >
                                <Send className="w-4 h-4" />
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="pointer-events-auto group relative flex items-center justify-center w-14 h-14 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full shadow-lg hover:scale-110 active:scale-95 transition-all duration-300"
            >
                {isOpen ? <ChevronDown className="w-7 h-7" /> : <Sparkles className="w-6 h-6" />}
                {!isOpen && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold flex items-center justify-center rounded-full border-2 border-gray-900">
                        1
                    </span>
                )}
            </button>
        </div>
    );
}
