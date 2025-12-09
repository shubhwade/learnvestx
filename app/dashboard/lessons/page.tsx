"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import Link from "next/link";
import { BookOpen, TrendingUp, Award, Clock, CheckCircle2 } from "lucide-react";

type Lesson = {
  id: number;
  title: string;
  category: "BEGINNER" | "INTERMEDIATE" | "ADVANCED";
  content: string;
  completed?: boolean;
};

export default function LessonsPage() {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("");

  useEffect(() => {
    fetchLessons();
  }, [filter]);

  const fetchLessons = async () => {
    try {
      const data = await api.lessons.list(filter || undefined);
      // Sort: Beginner first, then Intermediate, then Advanced
      const sortedData = [...data].sort((a: Lesson, b: Lesson) => {
        const order = { BEGINNER: 1, INTERMEDIATE: 2, ADVANCED: 3 };
        return order[a.category] - order[b.category];
      });
      setLessons(sortedData);
    } catch (err) {
      console.error("Failed to fetch lessons:", err);
    } finally {
      setLoading(false);
    }
  };

  const categoryConfig: Record<string, {
    icon: any;
    color: string;
    bgColor: string;
    duration: string;
  }> = {
    BEGINNER: {
      icon: BookOpen,
      color: "text-green-400",
      bgColor: "bg-green-500/10",
      duration: "15 min"
    },
    INTERMEDIATE: {
      icon: TrendingUp,
      color: "text-blue-400",
      bgColor: "bg-blue-500/10",
      duration: "30 min"
    },
    ADVANCED: {
      icon: Award,
      color: "text-purple-400",
      bgColor: "bg-purple-500/10",
      duration: "60 min"
    }
  };

  const groupedLessons = {
    BEGINNER: lessons.filter(l => l.category === "BEGINNER"),
    INTERMEDIATE: lessons.filter(l => l.category === "INTERMEDIATE"),
    ADVANCED: lessons.filter(l => l.category === "ADVANCED")
  };

  const getPreviewText = (content: string) => {
    const lines = content.split('\n').filter(line => !line.startsWith('#') && line.trim().length > 0);
    const text = lines.slice(0, 2).join(' ').replace(/\*\*/g, '').replace(/\*/g, '');
    return text.substring(0, 100) + (text.length > 100 ? '...' : '');
  };

  if (loading) {
    return (
      <div className="space-y-8">
        <div className="text-center py-20">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-white/20 border-t-white"></div>
          <p className="mt-4 text-white/50">Loading lessons...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold text-white">Lessons Library</h1>
          <p className="text-white/50 mt-2">Learn the fundamentals of investing</p>
        </div>

        {/* Filter Buttons */}
        <div className="flex gap-2">
          <button
            onClick={() => setFilter("")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filter === "" ? "bg-white text-black" : "bg-white/10 text-white/60 hover:text-white"
              }`}
          >
            All
          </button>
          {(["BEGINNER", "INTERMEDIATE", "ADVANCED"] as const).map((cat) => {
            const config = categoryConfig[cat];
            return (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filter === cat
                  ? `${config.bgColor} ${config.color}`
                  : "bg-white/10 text-white/60 hover:text-white"
                  }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Lessons by Category */}
      {(["BEGINNER", "INTERMEDIATE", "ADVANCED"] as const).map((category) => {
        const categoryLessons = filter ? lessons.filter(l => l.category === category) : groupedLessons[category];
        if (filter && filter !== category) return null;
        if (categoryLessons.length === 0) return null;

        const config = categoryConfig[category];
        const Icon = config.icon;

        return (
          <section key={category} className="space-y-4">
            {/* Section Header */}
            <div className="flex items-center gap-3 py-2">
              <Icon className={`w-6 h-6 ${config.color}`} />
              <h2 className={`text-xl font-bold ${config.color}`}>{category}</h2>
              <span className="text-white/30 text-sm">• {config.duration} each</span>
            </div>

            {/* Lesson Cards Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {categoryLessons.map((lesson) => (
                <Link key={lesson.id} href={`/dashboard/lessons/${lesson.id}`}>
                  <div className={`group h-full p-6 rounded-xl border transition-all cursor-pointer ${lesson.completed
                      ? 'bg-green-500/5 border-green-500/30 hover:bg-green-500/10'
                      : 'bg-white/5 border-white/10 hover:border-white/20 hover:bg-white/10'
                    }`}>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Icon className={`w-5 h-5 ${config.color}`} />
                        {lesson.completed && (
                          <span className="flex items-center gap-1 text-xs font-medium text-green-400 bg-green-500/20 px-2 py-0.5 rounded-full">
                            <CheckCircle2 className="w-3 h-3" />
                            Completed
                          </span>
                        )}
                      </div>
                      <span className={`text-xs font-medium ${config.color}`}>
                        {config.duration}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-white/90">
                      {lesson.title}
                    </h3>
                    <p className="text-white/40 text-sm line-clamp-2">
                      {getPreviewText(lesson.content)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        );
      })}

      {/* Empty State */}
      {lessons.length === 0 && (
        <div className="text-center py-20 rounded-xl bg-white/5 border border-white/10">
          <BookOpen className="w-16 h-16 mx-auto text-white/20 mb-4" />
          <h3 className="text-xl font-semibold text-white/60 mb-2">No lessons available</h3>
          <p className="text-white/40">Check back soon for new content!</p>
        </div>
      )}
    </div>
  );
}
