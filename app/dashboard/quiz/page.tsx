"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { api } from "@/lib/api";
import { BookOpen, CheckCircle2, Trophy, Clock, ArrowRight, Star } from "lucide-react";

type Quiz = {
  id: number;
  title: string;
  category: string;
  passingScore: number;
  questionCount?: number;
  completed?: boolean;
  passed?: boolean;
  lastScore?: number;
};

export default function QuizzesListPage() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const fetchQuizzes = async () => {
    try {
      const data = await api.quiz.list();
      setQuizzes(data);
    } catch (err) {
      console.error("Failed to fetch quizzes:", err);
    } finally {
      setLoading(false);
    }
  };

  const categoryConfig: Record<string, { color: string; bgColor: string }> = {
    BEGINNER: { color: "text-green-400", bgColor: "bg-green-500/10" },
    INTERMEDIATE: { color: "text-blue-400", bgColor: "bg-blue-500/10" },
    ADVANCED: { color: "text-purple-400", bgColor: "bg-purple-500/10" }
  };

  if (loading) {
    return (
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <div className="h-10 w-48 bg-white/10 rounded-lg animate-pulse" />
            <div className="h-5 w-64 bg-white/5 rounded mt-2 animate-pulse" />
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-48 rounded-xl bg-white/5 border border-white/10 animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-white">Quizzes</h1>
          <p className="text-white/50 mt-2">Test your financial knowledge and earn certificates</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10">
          <Trophy className="w-5 h-5 text-yellow-400" />
          <span className="text-white/70 text-sm">
            {quizzes.filter(q => q.passed).length}/{quizzes.length} Passed
          </span>
        </div>
      </div>

      {/* Quiz Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {quizzes.map((quiz) => {
          const config = categoryConfig[quiz.category] || categoryConfig.BEGINNER;

          return (
            <Link key={quiz.id} href={`/dashboard/quiz/${quiz.id}`}>
              <div className={`group h-full p-6 rounded-xl border transition-all cursor-pointer ${quiz.passed
                  ? 'bg-green-500/5 border-green-500/30 hover:bg-green-500/10'
                  : 'bg-white/5 border-white/10 hover:border-white/20 hover:bg-white/10'
                }`}>
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <BookOpen className={`w-5 h-5 ${config.color}`} />
                    {quiz.passed && (
                      <span className="flex items-center gap-1 text-xs font-medium text-green-400 bg-green-500/20 px-2 py-0.5 rounded-full">
                        <CheckCircle2 className="w-3 h-3" />
                        Passed
                      </span>
                    )}
                  </div>
                  <span className={`text-xs font-medium ${config.color} ${config.bgColor} px-2 py-1 rounded`}>
                    {quiz.category}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-white/90">
                  {quiz.title}
                </h3>

                {/* Info */}
                <div className="flex items-center gap-4 text-sm text-white/40 mb-4">
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    ~10 min
                  </span>
                  <span>Pass: {quiz.passingScore} correct</span>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  {quiz.lastScore !== undefined ? (
                    <span className="text-sm text-white/50">
                      Last: {quiz.lastScore} correct
                    </span>
                  ) : (
                    <span className="text-sm text-white/50">Not attempted</span>
                  )}

                  <span className="flex items-center gap-1 text-sm text-white group-hover:text-white transition-colors">
                    {quiz.passed ? 'Retake' : 'Start Quiz'}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>

                {/* Reward Badge */}
                <div className="mt-4 flex items-center gap-1 text-xs text-yellow-400">
                  <Star className="w-3 h-3" />
                  <span>+100 points on pass</span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Empty State */}
      {quizzes.length === 0 && (
        <div className="text-center py-20 rounded-xl bg-white/5 border border-white/10">
          <BookOpen className="w-16 h-16 mx-auto text-white/20 mb-4" />
          <h3 className="text-xl font-semibold text-white/60 mb-2">No quizzes available</h3>
          <p className="text-white/40">Check back soon for new quizzes!</p>
        </div>
      )}
    </div>
  );
}
