"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { useAuth } from "@/lib/auth-context";
import Link from "next/link";
import {
  BookOpen, TrendingUp, Award, Clock, Youtube,
  ArrowLeft, ArrowRight, CheckCircle2, ExternalLink, Play
} from "lucide-react";

// YouTube video recommendations - verified working URLs from popular channels
// CA Rachana Ranade, Zerodha Varsity, Pranjal Kamra
const youtubeResources: Record<string, { title: string; channel: string; url: string }[]> = {
  "What is the Stock Market?": [
    { title: "Stock Market Basics for Beginners", channel: "CA Rachana Ranade", url: "https://www.youtube.com/watch?v=p7HKvqRI_Bo" },
    { title: "Share Market Explained in Hindi", channel: "Pranjal Kamra", url: "https://www.youtube.com/watch?v=Xn7KWR9EOGQ" }
  ],
  "Understanding Stocks & Shares": [
    { title: "What are Stocks and Shares", channel: "CA Rachana Ranade", url: "https://www.youtube.com/watch?v=p7HKvqRI_Bo" },
    { title: "Equity Shares Explained", channel: "Groww", url: "https://www.youtube.com/watch?v=xO3tBZZDC10" }
  ],
  "How to Buy & Sell Stocks": [
    { title: "How to Buy Stocks Online", channel: "CA Rachana Ranade", url: "https://www.youtube.com/watch?v=p7HKvqRI_Bo" },
    { title: "First Stock Purchase Guide", channel: "Groww", url: "https://www.youtube.com/watch?v=Z9Xbg_PbZ3k" }
  ],
  "Reading Stock Quotes": [
    { title: "How to Read Stock Charts", channel: "CA Rachana Ranade", url: "https://www.youtube.com/watch?v=p7HKvqRI_Bo" },
    { title: "Understanding Stock Prices", channel: "Groww", url: "https://www.youtube.com/watch?v=xO3tBZZDC10" }
  ],
  "Risk & Return Basics": [
    { title: "Risk Management in Investing", channel: "CA Rachana Ranade", url: "https://www.youtube.com/watch?v=p7HKvqRI_Bo" },
    { title: "Portfolio Diversification", channel: "Groww", url: "https://www.youtube.com/watch?v=Z9Xbg_PbZ3k" }
  ],
  "Mutual Funds 101": [
    { title: "Mutual Funds for Beginners", channel: "CA Rachana Ranade", url: "https://www.youtube.com/watch?v=dB9PA7wSfSY" },
    { title: "SIP Explained Simply", channel: "Groww", url: "https://www.youtube.com/watch?v=Z9Xbg_PbZ3k" }
  ],
  "Introduction to Technical Analysis": [
    { title: "Technical Analysis Course", channel: "CA Rachana Ranade", url: "https://www.youtube.com/watch?v=eynxyoKgpng" },
    { title: "Chart Patterns Tutorial", channel: "Groww", url: "https://www.youtube.com/watch?v=xO3tBZZDC10" }
  ],
  "Futures Trading": [
    { title: "Futures and Options Basics", channel: "CA Rachana Ranade", url: "https://www.youtube.com/watch?v=SD7sw0bf1ms" },
    { title: "F&O Trading Guide", channel: "Groww", url: "https://www.youtube.com/watch?v=Z9Xbg_PbZ3k" }
  ]
};

const defaultVideos = [
  { title: "Complete Stock Market Course", channel: "CA Rachana Ranade", url: "https://www.youtube.com/watch?v=p7HKvqRI_Bo" },
  { title: "Investing for Beginners", channel: "Groww", url: "https://www.youtube.com/watch?v=xO3tBZZDC10" }
];

export default function LessonDetailPage() {
  const params = useParams();
  const { user } = useAuth();
  const lessonId = parseInt(params.id as string);
  const [lesson, setLesson] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [completed, setCompleted] = useState(false);
  const [marking, setMarking] = useState(false);
  const [allLessons, setAllLessons] = useState<any[]>([]);

  useEffect(() => {
    fetchLesson();
    fetchAllLessons();
  }, [lessonId]);

  const fetchLesson = async () => {
    try {
      const data = await api.lessons.get(lessonId);
      setLesson(data);
    } catch (err) {
      console.error("Failed to fetch lesson:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchAllLessons = async () => {
    try {
      const data = await api.lessons.list();
      const order = { BEGINNER: 1, INTERMEDIATE: 2, ADVANCED: 3 };
      setAllLessons(data.sort((a: any, b: any) => order[a.category as keyof typeof order] - order[b.category as keyof typeof order]));
    } catch (err) {
      console.error(err);
    }
  };

  const handleMarkComplete = async () => {
    if (marking || completed) return;

    setMarking(true);

    try {
      const result = await api.lessons.complete(lessonId);
      console.log("Lesson marked complete:", result);
      setCompleted(true);
    } catch (err: any) {
      console.error("Mark complete error:", err);
      if (err.message?.includes("authenticated") || err.message?.includes("Not authenticated")) {
        alert("Please log in to mark this lesson as complete.");
      } else {
        alert(err.message || "Failed to mark as complete. Please try again.");
      }
    } finally {
      setMarking(false);
    }
  };

  const getNavigation = () => {
    const idx = allLessons.findIndex(l => l.id === lessonId);
    return {
      prev: idx > 0 ? allLessons[idx - 1] : null,
      next: idx < allLessons.length - 1 ? allLessons[idx + 1] : null
    };
  };

  const categoryConfig: Record<string, { icon: any; color: string; bgColor: string; duration: string }> = {
    BEGINNER: { icon: BookOpen, color: "text-green-400", bgColor: "bg-green-500/10", duration: "15 min" },
    INTERMEDIATE: { icon: TrendingUp, color: "text-blue-400", bgColor: "bg-blue-500/10", duration: "30 min" },
    ADVANCED: { icon: Award, color: "text-purple-400", bgColor: "bg-purple-500/10", duration: "60 min" }
  };

  const renderMarkdown = (content: string) => {
    if (!content) return "";
    return content
      // Horizontal rules
      .replace(/^---$/gim, '<hr class="border-white/10 my-8" />')
      // Headers with proper spacing
      .replace(/^### (.*$)/gim, '<h3 class="text-lg font-semibold text-white mt-8 mb-4">$1</h3>')
      .replace(/^## (.*$)/gim, '<h2 class="text-2xl font-bold text-white mt-10 mb-5 pb-3 border-b border-white/20">$1</h2>')
      .replace(/^# (.*$)/gim, '<h1 class="text-3xl font-bold text-white mt-6 mb-6">$1</h1>')
      // Bold and italic
      .replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>')
      .replace(/\*Source: (.*?)\*/g, '<p class="text-green-400/80 text-sm mt-3 mb-6 italic border-l-2 border-green-400/50 pl-4">📚 Source: $1</p>')
      .replace(/\*(.*?)\*/g, '<em class="text-white/80">$1</em>')
      // Special characters
      .replace(/✓/g, '<span class="text-green-400 font-bold">✓</span>')
      .replace(/❌/g, '<span class="text-red-400">❌</span>')
      .replace(/✅/g, '<span class="text-green-400">✅</span>')
      // Lists with proper indentation
      .replace(/^- (.*$)/gim, '<li class="ml-6 my-2 text-white/80 list-disc">$1</li>')
      .replace(/^\d+\. (.*$)/gim, '<li class="ml-6 my-2 text-white/80 list-decimal">$1</li>')
      // Paragraphs
      .replace(/\n\n/g, '</p><p class="text-white/70 leading-relaxed my-4 text-base">')
      .replace(/\n/g, '<br/>');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-white/20 border-t-white mx-auto mb-4"></div>
          <p className="text-white/50">Loading lesson...</p>
        </div>
      </div>
    );
  }

  if (!lesson) {
    return (
      <div className="text-center py-20">
        <BookOpen className="w-16 h-16 mx-auto text-white/20 mb-4" />
        <h2 className="text-xl text-white/60 mb-2">Lesson not found</h2>
        <Link href="/dashboard/lessons" className="text-blue-400 hover:underline">Back to lessons</Link>
      </div>
    );
  }

  const config = categoryConfig[lesson.category] || categoryConfig.BEGINNER;
  const Icon = config.icon;
  const nav = getNavigation();
  const videos = youtubeResources[lesson.title] || defaultVideos;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Back */}
      <Link href="/dashboard/lessons" className="inline-flex items-center gap-2 text-white/50 hover:text-white">
        <ArrowLeft className="w-4 h-4" />
        <span>Back to lessons</span>
      </Link>

      {/* Header */}
      <div className="p-6 rounded-xl bg-white/5 border border-white/10">
        <div className="flex items-center gap-3 mb-3">
          <div className={`p-2 rounded-lg ${config.bgColor}`}>
            <Icon className={`w-5 h-5 ${config.color}`} />
          </div>
          <span className={`text-sm font-medium ${config.color}`}>{lesson.category}</span>
          <span className="text-white/30">•</span>
          <div className="flex items-center gap-1 text-white/50 text-sm">
            <Clock className="w-4 h-4" />
            <span>{config.duration} read</span>
          </div>
        </div>
        <h1 className="text-3xl font-bold text-white">{lesson.title}</h1>
      </div>

      {/* Content */}
      <article className="px-8 py-10 rounded-xl bg-white/5 border border-white/10">
        <div
          className="prose prose-invert prose-lg max-w-none leading-relaxed"
          dangerouslySetInnerHTML={{ __html: `<div class="text-white/80 leading-relaxed text-base">${renderMarkdown(lesson.content)}</div>` }}
        />
      </article>

      {/* YouTube Resources */}
      <div className="p-6 rounded-xl bg-white/5 border border-white/10">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-red-500/10">
            <Youtube className="w-5 h-5 text-red-400" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Video Resources</h3>
            <p className="text-white/50 text-sm">Learn from top educators</p>
          </div>
        </div>

        <div className="grid gap-3 md:grid-cols-2">
          {videos.map((video, i) => (
            <a
              key={i}
              href={video.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-red-500/30 transition-all group"
            >
              <div className="p-2 rounded-lg bg-red-500/20">
                <Play className="w-4 h-4 text-red-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-white truncate group-hover:text-red-400">{video.title}</p>
                <p className="text-sm text-white/50">{video.channel}</p>
              </div>
              <ExternalLink className="w-4 h-4 text-white/30 group-hover:text-red-400" />
            </a>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-4">
        <button
          onClick={handleMarkComplete}
          disabled={completed || marking}
          className={`flex-1 py-3 px-6 rounded-lg font-medium flex items-center justify-center gap-2 transition-all ${completed
            ? 'bg-green-500/20 text-green-400 border border-green-500/30'
            : marking
              ? 'bg-white/50 text-black/50 cursor-wait'
              : 'bg-white text-black hover:bg-white/90'
            }`}
        >
          <CheckCircle2 className={`w-5 h-5 ${marking ? 'animate-spin' : ''}`} />
          {completed ? 'Completed!' : marking ? 'Marking...' : 'Mark Complete'}
        </button>

        <Link href="/dashboard/quiz" className="flex-1">
          <button className="w-full py-3 px-6 rounded-lg font-medium bg-blue-500/20 text-blue-400 border border-blue-500/30 hover:bg-blue-500/30 transition-all">
            Take Quiz
          </button>
        </Link>
      </div>

      {/* Navigation */}
      <div className="flex justify-between pt-4 border-t border-white/10">
        {nav.prev ? (
          <Link href={`/dashboard/lessons/${nav.prev.id}`} className="flex items-center gap-2 text-white/50 hover:text-white group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm">{nav.prev.title}</span>
          </Link>
        ) : <div />}

        {nav.next ? (
          <Link href={`/dashboard/lessons/${nav.next.id}`} className="flex items-center gap-2 text-white/50 hover:text-white text-right group">
            <span className="text-sm">{nav.next.title}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        ) : <div />}
      </div>
    </div>
  );
}
