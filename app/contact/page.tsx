"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, MessageSquare, Send } from "lucide-react";

export default function ContactPage() {
    const [formData, setFormData] = useState({ name: "", email: "", message: "" });
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // In production, send to your backend or email service
        console.log("Contact form submitted:", formData);
        setSubmitted(true);
    };

    return (
        <div className="min-h-screen bg-black text-white">
            <header className="border-b border-white/10 py-4 px-6">
                <div className="max-w-4xl mx-auto flex items-center justify-between">
                    <Link href="/" className="text-xl font-bold">LearnVestX</Link>
                </div>
            </header>

            <main className="max-w-4xl mx-auto py-16 px-6">
                <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
                <p className="text-white/60 mb-12">Have questions or feedback? We'd love to hear from you.</p>

                <div className="grid md:grid-cols-2 gap-12">
                    {/* Contact Info */}
                    <div className="space-y-6">
                        <div className="p-6 rounded-xl bg-white/5 border border-white/10">
                            <Mail className="w-6 h-6 text-white/60 mb-3" />
                            <h3 className="font-semibold mb-1">Email</h3>
                            <p className="text-white/60 text-sm">learnvestx@gmail.com</p>
                        </div>
                        <div className="p-6 rounded-xl bg-white/5 border border-white/10">
                            <MessageSquare className="w-6 h-6 text-white/60 mb-3" />
                            <h3 className="font-semibold mb-1">Social</h3>
                            <p className="text-white/60 text-sm">@learnvestx on Twitter/X</p>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="p-6 rounded-xl bg-white/5 border border-white/10">
                        {submitted ? (
                            <div className="text-center py-8">
                                <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Send className="w-6 h-6 text-green-400" />
                                </div>
                                <h3 className="font-semibold mb-2">Message Sent!</h3>
                                <p className="text-white/60 text-sm">We'll get back to you soon.</p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm text-white/60 mb-1">Name</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full p-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-white/30"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-white/60 mb-1">Email</label>
                                    <input
                                        type="email"
                                        required
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="w-full p-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-white/30"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-white/60 mb-1">Message</label>
                                    <textarea
                                        required
                                        rows={4}
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        className="w-full p-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-white/30 resize-none"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="w-full py-3 bg-white text-black font-medium rounded-lg hover:bg-white/90 transition-colors"
                                >
                                    Send Message
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}
